#!/usr/bin/env node
/*
 * Seeds a Ghost site with the Phantasma demo: six series of photographs (from Wikimedia Commons, credited), journal
 * articles, pages, navigation, theme settings and routes. Works against any Ghost 5/6 through its Admin API.
 *
 *   GHOST_URL=http://localhost:2368 GHOST_ADMIN_API_KEY=<id>:<secret> node demo/seed.mjs [--reset] [--theme phantasma]
 *
 * Content (posts, pages, tags, images) goes through the integration key. Ghost does not let API keys change settings, the
 * theme or routes, so those steps need a staff login: also set GHOST_STAFF_EMAIL and GHOST_STAFF_PASSWORD, or run them by
 * hand (the script prints what it would set). --configure-only skips the content and only does those steps.
 * --reset deletes every post, page and tag first (use it on a fresh site). Photographs are downloaded once into
 * demo/.cache and uploaded to the site. Nothing in this script is specific to one machine.
 */
import { createHmac } from 'node:crypto';
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SERIES, PHOTOS, EXTRA } from './photos.mjs';
import { SITE, AUTHOR, NAV, NAV_SECONDARY, THEME_SETTINGS, ROUTES, journal, pages } from './content.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const SOURCES = JSON.parse(readFileSync(join(here, 'sources.json'), 'utf8'));
const CACHE = join(here, '.cache');
const BASE = (process.env.GHOST_URL || '').replace(/\/$/, '');
const KEY = process.env.GHOST_ADMIN_API_KEY || '';
const THEME = process.argv.includes('--theme') ? process.argv[process.argv.indexOf('--theme') + 1] : 'phantasma';
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

// ---- credits and exposure lines, from the files' own metadata
const rat = (v) => { if (v == null || v === '' || v === 'undefined') return null; const [n, d] = String(v).split('/').map(Number); return d ? n / d : n; };
const fmtTime = (v) => { const [n, d] = String(v).split('/').map(Number); if (!d) return null; const x = n / d; if (x >= 1) return `${+x.toFixed(1)} s`; if (n === 1) return `1/${d} s`; return `${+x.toFixed(1)} s`; };
const ARTIST = { 'Original: Gswito Derivative work: W.carter': 'Gswito and W.carter', 'Maxime Raynal from France': 'Maxime Raynal', 'Julian Herzog (Website)': 'Julian Herzog', GlacierNPS: 'Glacier National Park / NPS' };
const who = (p) => p.credit || ARTIST[SOURCES[p.key].artist] || SOURCES[p.key].artist;
const credit = (p) => `Photo: ${who(p)}, ${SOURCES[p.key].lic}`;
function exposure(p) {
    const s = SOURCES[p.key];
    if (p.exposure) return `${p.cam ? p.cam + ' · ' : ''}${p.exposure}`;
    const parts = [p.cam];
    const fl = rat(s.fl); const f = rat(s.f); const t = s.t && s.t !== 'undefined' ? fmtTime(s.t) : null; const iso = s.iso && s.iso !== 'undefined' ? s.iso : null;
    if (fl) parts.push(`${Math.round(fl)} mm`);
    if (f) parts.push(`f/${+f.toFixed(1)}`);
    if (t) parts.push(t);
    if (iso) parts.push(`ISO ${iso}`);
    return parts.filter(Boolean).join(' · ');
}
const caption = (p) => `${exposure(p)}<br>${credit(p)} · <a href="${SOURCES[p.key].page}">Wikimedia Commons</a>`;
const byKey = Object.fromEntries(PHOTOS.map((p) => [p.key, p]));
const g = (key) => credit(byKey[key] || { key }) ;

// ---- download once, upload once
mkdirSync(CACHE, { recursive: true });
async function download(key) {
    const file = join(CACHE, `${key}.jpg`);
    if (existsSync(file)) return file;
    for (let a = 0; a < 6; a++) {
        const res = await fetch(SOURCES[key].thumb, { headers: { 'User-Agent': 'phantasma-theme-demo/1.0 (demo content seeder)' } });
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
    const slug = (byKey[key]?.slug || key.toLowerCase());
    const form = new FormData();
    form.append('file', new Blob([readFileSync(file)], { type: 'image/jpeg' }), `${slug}.jpg`);
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
        await api('tags/', { method: 'POST', body: { tags: [{ name: 'Journal', slug: 'journal', description: 'Notes on technique, editing and printing.', feature_image: img('A19') }] } });
        console.log('tags created');

        // photographs as posts: interleave the series so the home feed alternates
        const by = Object.fromEntries(SERIES.map((s) => [s.slug, PHOTOS.filter((p) => p.series === s.slug)]));
        const order = [];
        for (let i = 0; i < 6; i++) for (const s of SERIES) if (by[s.slug][i]) order.push(by[s.slug][i]);
        const start = Date.parse('2026-10-20T08:00:00Z');
        let n = 0;
        for (const p of order) {
            const s = SOURCES[p.key];
            const when = new Date(start - n * 3.2 * 86400000).toISOString();
            n++;
            const serie = SERIES.find((x) => x.slug === p.series);
            const html = `<p>${p.note}</p><p><em>${[p.place, (s.date || '').match(/\d{4}/)?.[0]].filter(Boolean).join(' · ')}</em></p>`;
            await api('posts/?source=html', { method: 'POST', body: { posts: [{
                title: p.title, slug: p.slug, html, status: 'published', published_at: when,
                featured: !!p.featured, visibility: p.visibility || 'public', custom_template: 'custom-photo',
                tags: [{ name: serie.name }], feature_image: img(p.key), feature_image_alt: p.alt, feature_image_caption: caption(p),
                custom_excerpt: p.excerpt,
            }] } });
        }
        console.log(`${order.length} photographs published`);

        // journal
        for (const j of journal({ img, g })) {
            await api('posts/?source=html', { method: 'POST', body: { posts: [{
                title: j.title, slug: j.slug, html: j.html, status: 'published', published_at: j.date, featured: false,
                visibility: j.visibility || 'public', tags: [{ name: 'Journal' }],
                feature_image: img(j.cover), feature_image_alt: byKey[j.cover].alt, feature_image_caption: `${exposure(byKey[j.cover])}<br>${credit(byKey[j.cover])}`, custom_excerpt: j.excerpt,
            }] } });
        }
        console.log('journal published');

        // pages
        for (const pg of pages({ img })) {
            await api('pages/?source=html', { method: 'POST', body: { pages: [{
                title: pg.title, slug: pg.slug, html: pg.html, status: 'published', custom_template: pg.template, custom_excerpt: pg.excerpt,
                ...(pg.cover ? { feature_image: img(pg.cover), feature_image_alt: byKey[pg.cover]?.alt || SOURCES[pg.cover].desc, feature_image_caption: `${credit({ key: pg.cover })} · <a href="${SOURCES[pg.cover].page}">Wikimedia Commons</a>` } : {}),
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
    const next = cts.filter((x) => x.key in THEME_SETTINGS).map((x) => ({ key: x.key, value: x.type === 'boolean' ? THEME_SETTINGS[x.key] === 'true' : THEME_SETTINGS[x.key] }));
    await staff('custom_theme_settings/', { method: 'PUT', body: { custom_theme_settings: next } });
    const form = new FormData();
    form.append('routes', new Blob([ROUTES], { type: 'application/x-yaml' }), 'routes.yaml');
    await staff('settings/routes/yaml/', { method: 'POST', form });
    console.log('settings, navigation, theme and routes applied. Done.');
}
main().catch((e) => { console.error(e.message); process.exit(1); });
