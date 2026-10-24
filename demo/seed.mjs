#!/usr/bin/env node
/*
 * Seeds a Ghost site with one of the Phantasma demos (demo/<name>/): series of photographs, pages, navigation, theme
 * settings and routes. Demos: mara (Wikimedia Commons photographs, with a journal) and street (an urban photographer).
 * Works against any Ghost 5/6 through its Admin API.
 *
 *   GHOST_URL=http://localhost:2368 GHOST_ADMIN_API_KEY=<id>:<secret> node demo/seed.mjs [--demo mara|street] [--reset] [--theme phantasma]
 *
 * Content (posts, pages, tags, images) goes through the integration key. Ghost does not let API keys change settings, the
 * theme or routes, so those steps need a staff login: also set GHOST_STAFF_EMAIL and GHOST_STAFF_PASSWORD, or run them by
 * hand (the script prints what it would set). --configure-only skips the content and only does those steps.
 * --reset deletes every post, page and tag first (use it on a fresh site). Photographs are downloaded once into
 * demo/.cache and uploaded to the site. Nothing in this script is specific to one machine.
 */
import { createHmac } from 'node:crypto';
import { mkdirSync, existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const arg = (name, fallback) => (process.argv.includes(`--${name}`) ? process.argv[process.argv.indexOf(`--${name}`) + 1] : fallback);
const DEMO = arg('demo', 'mara');
if (!existsSync(join(here, DEMO, 'index.mjs'))) {
    console.error(`Unknown demo "${DEMO}". Available: ${readdirSync(here).filter((d) => existsSync(join(here, d, 'index.mjs'))).join(', ')}`);
    process.exit(1);
}
const demo = await import(`./${DEMO}/index.mjs`);
const { SERIES, PHOTOS, EXTRA, SOURCES, SITE, AUTHOR, NAV, NAV_SECONDARY, THEME_SETTINGS, ROUTES } = demo;
const CACHE = join(here, '.cache', DEMO);
const BASE = (process.env.GHOST_URL || '').replace(/\/$/, '');
const KEY = process.env.GHOST_ADMIN_API_KEY || '';
const THEME = arg('theme', 'phantasma');
const RESET = process.argv.includes('--reset');
const CONFIGURE_ONLY = process.argv.includes('--configure-only');
const STAFF = { email: process.env.GHOST_STAFF_EMAIL, password: process.env.GHOST_STAFF_PASSWORD };
if (!BASE || !KEY.includes(':')) {
    console.error('Set GHOST_URL and GHOST_ADMIN_API_KEY (id:secret of a custom integration).');
    process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b64 = (o) => Buffer.from(typeof o === 'string' ? o : JSON.stringify(o)).toString('base64url');
function token() {
    const [id, secret] = KEY.split(':');
    const now = Math.floor(Date.now() / 1000);
    const head = b64({ alg: 'HS256', typ: 'JWT', kid: id });
    const body = b64({ iat: now, exp: now + 300, aud: '/admin/' });
    const sig = createHmac('sha256', Buffer.from(secret, 'hex')).update(`${head}.${body}`).digest('base64url');
    return `${head}.${body}.${sig}`;
}
async function api(path, { method = 'GET', body, form } = {}) {
    const headers = { Authorization: `Ghost ${token()}`, 'Accept-Version': 'v5.0' };
    let payload;
    if (form) payload = form;
    else if (body) { headers['Content-Type'] = 'application/json'; payload = JSON.stringify(body); }
    const res = await fetch(`${BASE}/ghost/api/admin/${path}`, { method, headers, body: payload });
    const text = await res.text();
    if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${text.slice(0, 400)}`);
    return text ? JSON.parse(text) : {};
}

let cookie = '';
async function staff(path, { method = 'GET', body, form } = {}) {
    if (!cookie) {
        const r = await fetch(`${BASE}/ghost/api/admin/session/`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: BASE }, body: JSON.stringify({ username: STAFF.email, password: STAFF.password }) });
        if (!r.ok) throw new Error(`staff login failed: ${r.status}`);
        cookie = (r.headers.getSetCookie?.() || []).map((c) => c.split(';')[0]).join('; ');
    }
    const headers = { Cookie: cookie, Origin: BASE, 'Accept-Version': 'v5.0' };
    let payload;
    if (form) payload = form;
    else if (body) { headers['Content-Type'] = 'application/json'; payload = JSON.stringify(body); }
    const res = await fetch(`${BASE}/ghost/api/admin/${path}`, { method, headers, body: payload });
    const text = await res.text();
    if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${text.slice(0, 300)}`);
    return text ? JSON.parse(text) : {};
}

const byKey = Object.fromEntries(PHOTOS.map((p) => [p.key, p]));

// ---- download once, upload once
mkdirSync(CACHE, { recursive: true });
const EXT = (name) => name.split('?')[0].split('.').pop().toLowerCase().replace('jpeg', 'jpg');
const MIME = { jpg: 'image/jpeg', webp: 'image/webp', png: 'image/png', avif: 'image/avif' };
async function download(key) {
    const src = SOURCES[key];
    if (src.file) return join(here, DEMO, src.file); // committed next to the demo (for example the portrait)
    const file = join(CACHE, `${key}.${EXT(src.url || src.thumb)}`);
    if (existsSync(file)) return file;
    for (let a = 0; a < 6; a++) {
        const res = await fetch(src.url || src.thumb, { headers: { 'User-Agent': 'phantasma-theme-demo/1.0 (demo content seeder)' } });
        if (res.ok && (res.headers.get('content-type') || '').startsWith('image/')) {
            writeFileSync(file, Buffer.from(await res.arrayBuffer()));
            await sleep(900);
            return file;
        }
        await sleep(4000 * (a + 1));
    }
    throw new Error(`could not download ${key}`);
}
const uploaded = {};
async function upload(key) {
    if (uploaded[key]) return uploaded[key];
    const file = await download(key);
    const slug = byKey[key]?.slug || key.toLowerCase();
    const ext = EXT(file);
    const form = new FormData();
    form.append('file', new Blob([readFileSync(file)], { type: MIME[ext] || 'image/jpeg' }), `${slug}.${ext}`);
    form.append('purpose', 'image');
    const r = await api('images/upload/', { method: 'POST', form });
    uploaded[key] = r.images[0].url;
    return uploaded[key];
}

async function main() {
    const site = await api('site/');
    console.log(`Seeding ${site.site.title} (${BASE}), theme ${THEME}`);

    if (RESET && !CONFIGURE_ONLY) {
        for (const kind of ['posts', 'pages']) {
            const r = await api(`${kind}/?limit=all&fields=id`);
            for (const x of r[kind]) await api(`${kind}/${x.id}/`, { method: 'DELETE' });
        }
        const t = await api('tags/?limit=all&fields=id');
        for (const x of t.tags) await api(`tags/${x.id}/`, { method: 'DELETE' });
        console.log('reset: posts, pages and tags removed');
    }

    const img = (k) => uploaded[k];
    if (!CONFIGURE_ONLY) {
        // photographs
        const keys = [...new Set([...PHOTOS.map((p) => p.key), ...SERIES.map((s) => s.cover), EXTRA.about, EXTRA.avatar])];
        for (const k of keys) { process.stdout.write(`  image ${k} `); await upload(k); console.log('ok'); }
    
        // series (tags)
        for (const s of SERIES) {
            await api('tags/', { method: 'POST', body: { tags: [{ name: s.name, slug: s.slug, description: s.description, feature_image: img(s.cover), visibility: 'public' }] } });
        }
        const jt = demo.JOURNAL_TAG;
        if (jt) await api('tags/', { method: 'POST', body: { tags: [{ name: jt.name, slug: jt.slug, description: jt.description, feature_image: img(jt.cover) }] } });
        console.log('tags created');

        // photographs as posts: interleave the series so the home feed alternates
        const by = Object.fromEntries(SERIES.map((s) => [s.slug, PHOTOS.filter((p) => p.series === s.slug)]));
        const order = [];
        for (let i = 0; i < Math.max(...Object.values(by).map((l) => l.length)); i++) for (const s of SERIES) if (by[s.slug][i]) order.push(by[s.slug][i]);
        const start = Date.parse('2026-10-20T08:00:00Z');
        let n = 0;
        for (const p of order) {
            const when = new Date(start - n * 3.2 * 86400000).toISOString();
            n++;
            const serie = SERIES.find((x) => x.slug === p.series);
            const html = demo.photoHtml(p);
            await api('posts/?source=html', { method: 'POST', body: { posts: [{
                title: p.title, slug: p.slug, html, status: 'published', published_at: when,
                featured: !!p.featured, visibility: p.visibility || 'public', custom_template: 'custom-photo',
                tags: [{ name: serie.name }], feature_image: img(p.key), feature_image_alt: p.alt, feature_image_caption: demo.caption(p),
                custom_excerpt: p.excerpt,
            }] } });
        }
        console.log(`${order.length} photographs published`);

        // journal
        for (const j of demo.journal?.({ img, g: demo.g }) ?? []) {
            await api('posts/?source=html', { method: 'POST', body: { posts: [{
                title: j.title, slug: j.slug, html: j.html, status: 'published', published_at: j.date, featured: false,
                visibility: j.visibility || 'public', tags: [{ name: demo.JOURNAL_TAG.name }],
                feature_image: img(j.cover), feature_image_alt: byKey[j.cover].alt, feature_image_caption: demo.journalCaption(j.cover), custom_excerpt: j.excerpt,
            }] } });
        }
        if (demo.journal) console.log('journal published');

        // pages
        for (const pg of demo.pages({ img })) {
            await api('pages/?source=html', { method: 'POST', body: { pages: [{
                title: pg.title, slug: pg.slug, html: pg.html, status: 'published', custom_template: pg.template, custom_excerpt: pg.excerpt,
                ...(pg.cover ? { feature_image: img(pg.cover), feature_image_alt: demo.coverAlt(pg.cover), feature_image_caption: demo.coverCaption(pg.cover) } : {}),
            }] } });
        }
        console.log('pages published');
    }

    // site settings, navigation, author, theme, routes
    if (!STAFF.email || !STAFF.password) {
        console.log('Content done. Settings, theme and routes need a staff login: set GHOST_STAFF_EMAIL and GHOST_STAFF_PASSWORD and run again with --configure-only.');
        console.log(JSON.stringify({ SITE, NAV, NAV_SECONDARY, THEME_SETTINGS }, null, 2));
        return;
    }
    const settings = Object.entries({ ...SITE, navigation: JSON.stringify(NAV), secondary_navigation: JSON.stringify(NAV_SECONDARY) }).map(([key, value]) => ({ key, value }));
    await staff('settings/', { method: 'PUT', body: { settings } });
    try {
        const me = (await staff('users/me/')).users[0];
        await staff(`users/${me.id}/`, { method: 'PUT', body: { users: [{ ...AUTHOR, profile_image: await upload(EXTRA.avatar) }] } });
    } catch (e) { console.log('author profile not updated (integration keys cannot edit users):', e.message.slice(0, 80)); }
    await staff(`themes/${THEME}/activate/`, { method: 'PUT' });
    const cts = (await staff('custom_theme_settings/')).custom_theme_settings;
    const resolved = {};
    for (const [k, v] of Object.entries(THEME_SETTINGS)) resolved[k] = v && typeof v === 'object' && v.upload ? await upload(v.upload) : v;
    // every setting the demo does not name goes back to the theme's default, so one demo never leaks into the next
    const next = cts.map((x) => {
        const v = x.key in resolved ? resolved[x.key] : x.default;
        return { key: x.key, value: x.type === 'boolean' ? v === true || v === 'true' : x.type === 'image' ? v || null : (v ?? '') };
    });
    await staff('custom_theme_settings/', { method: 'PUT', body: { custom_theme_settings: next } });
    const form = new FormData();
    form.append('routes', new Blob([ROUTES], { type: 'application/x-yaml' }), 'routes.yaml');
    await staff('settings/routes/yaml/', { method: 'POST', form });
    console.log('settings, navigation, theme and routes applied. Done.');
}
main().catch((e) => { console.error(e.message); process.exit(1); });
