#!/usr/bin/env node
/* Turns a running Ghost site seeded with the demo content into a static, browsable copy under docs/demo/, for GitHub Pages.
   It crawls the site, saves every page and asset, rewrites URLs to the published path and removes what needs a server
   (Ghost's Portal and search scripts, the members forms stay inert).

   Usage:
     GHOST_URL=http://localhost:2368 node scripts/static-demo.mjs [--out docs/demo] [--public /phantasma-ghost/demo] [--images copy|commons]

   docs/demo is not committed: the Pages workflow builds it (see .github/workflows/pages.yml). */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { readFileSync } from 'node:fs';
import { dirname, join, posix } from 'node:path';
import { PHOTOS, EXTRA } from '../demo/photos.mjs';

const args = Object.fromEntries(
    process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith('--') ? a.concat([[v.slice(2), all[i + 1]]]) : a), []),
);
const IMAGES = args.images || 'copy'; // copy: save the photographs next to the pages; commons: load them from Wikimedia Commons
const SRC = (process.env.GHOST_URL || 'http://localhost:2368').replace(/\/$/, '');
const OUT = args.out || 'docs/demo';
const PUBLIC = (args.public || '/phantasma-ghost/demo').replace(/\/$/, '');
const SKIP_PAGES = /^\/(ghost|rss|sitemap|members|webmentions|robots|favicon|author)(\/|\.|$)|\/(rss|amp)\/$/;
const MAX_PAGE = 2; // feed pagination beyond this adds nothing to a demo

const origin = new URL(SRC).origin;

// The demo photographs are not copied into the repository: the static pages load them from Wikimedia Commons, which
// serves thumbnails at standard widths and is where they come from (credits are in every caption).
const SOURCES = JSON.parse(readFileSync(new URL('../demo/sources.json', import.meta.url), 'utf8'));
const keyBySlug = Object.fromEntries([
    ...PHOTOS.map((p) => [p.slug, p.key]),
    ['d1', EXTRA.avatar],
    ['d2', EXTRA.about],
]);
const WIDTHS = [330, 500, 960, 1280, 1920]; // the standard thumbnail widths Wikimedia serves
const unmapped = new Set();
function commonsUrl(path) {
    const m = path.match(
        /^\/content\/images\/(?:size\/w(\d+)\/)?(?:format\/\w+\/)?\d{4}\/\d{2}\/(.+?)(?:-\d+)?\.(?:jpe?g|png|webp)$/,
    );
    const key = m && keyBySlug[m[2]];
    if (!key) {
        unmapped.add(path);
        return null;
    }
    const want = Number(m[1]) || 1920;
    const width = WIDTHS.find((w) => w >= want) || 1920;
    return SOURCES[key].thumb
        .replace('thumb.wikimedia.org', 'upload.wikimedia.org')
        .split('?')[0]
        .replace(/\/\d+px-/, `/${width}px-`);
}
const toPublic = (u) => `${PUBLIC}${u.startsWith('/') ? u : `/${u}`}`;
const seen = new Set();
const pages = [];
const assets = new Set();

function local(u, base) {
    try {
        const url = new URL(u, base);
        return url.origin === origin ? url : null;
    } catch {
        return null;
    }
}

function rewrite(text) {
    text = text
        .replace(
            /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g,
            (m, a, b, c) => a + b.replace(/\\\//g, '/') + c,
        )
        .replace(/(?:https?:\/\/localhost:\d+)?(\/content\/images\/[^\s"')<]+?\.(?:jpe?g|png|webp))/g, (m, p) =>
            IMAGES === 'commons' ? commonsUrl(p) || m : m,
        );
    // root-relative attribute values (before the origin is replaced, so nothing is prefixed twice)
    let out = text.replace(
        /\b(href|src|action|poster|data-src)="\/(?!\/)([^"]*)"/g,
        (m, a, p) => `${a}="${toPublic(`/${p}`)}"`,
    );
    // srcset
    out = out.replace(/\bsrcset="([^"]*)"/g, (m, v) => {
        const fixed = v
            .split(',')
            .map((part) => {
                const t = part.trim();
                const [u, ...d] = t.split(/\s+/);
                const abs = u.startsWith('/') && !u.startsWith('//') ? toPublic(u) : u;
                return [abs, ...d].join(' ');
            })
            .join(', ');
        return `srcset="${fixed}"`;
    });
    // inline css url(/...)
    out = out.replace(/url\((["']?)\/(?!\/)([^)"']*)\1\)/g, (m, q, p) => `url(${q}${toPublic(`/${p}`)}${q})`);
    return out.split(origin).join(PUBLIC);
}

function collect(html) {
    const found = [];
    for (const m of html.matchAll(/\b(?:href|src|poster)="([^"#]*)"/g)) found.push(m[1]);
    for (const m of html.matchAll(/\bsrcset="([^"]*)"/g))
        for (const part of m[1].split(',')) found.push(part.trim().split(/\s+/)[0]);
    for (const m of html.matchAll(/url\((["']?)([^)"']+)\1\)/g)) found.push(m[2]);
    return found.map((u) => local(u, origin + current)).filter(Boolean);
}

function clean(html) {
    return html
        .replace(
            /<script[^>]*(?:portal|sodo-search|announcement-bar|comments-ui|data-ghost|ghost-members|cdn\.jsdelivr\.net\/ghost)[^>]*><\/script>/g,
            '',
        )
        .replace(/<link[^>]*(?:portal|sodo-search|announcement)[^>]*>/g, '')
        .replace(/<style[^>]*id="gh-members[^>]*>[\s\S]*?<\/style>/g, '')
        .replace(/<meta name="generator"[^>]*>/g, '')
        .replace(/href="[^"]*\/page\/3\/"/g, 'href="#"')
        .replace(
            /<\/body>/,
            `<style>[data-ghost-search]{display:none!important}.demo-badge{position:fixed;z-index:200;right:12px;bottom:12px;padding:.5rem .8rem;font:600 12px/1 ui-monospace,monospace;background:#fff;color:#111;text-decoration:none;box-shadow:0 2px 12px #0006}.demo-badge:hover{background:#ff4d2e}</style><a class="demo-badge" href="https://adrianoamalfi.github.io/phantasma-ghost/">Static demo · Documentation</a></body>`,
        );
}

async function get(url) {
    for (let i = 0; i < 4; i++) {
        try {
            const r = await fetch(url);
            if (r.ok || r.status === 404) return r;
        } catch {
            /* retry */
        }
        await new Promise((r) => setTimeout(r, 500 * (i + 1)));
    }
    throw new Error(`could not fetch ${url}`);
}

rmSync(OUT, { recursive: true, force: true });
let current = '/';
const queue = ['/'];
while (queue.length) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    seen.add(path);
    current = path;
    const r = await get(origin + path);
    if (!r.ok || !(r.headers.get('content-type') || '').includes('text/html')) continue;
    const html = await r.text();
    const file = join(OUT, path.endsWith('/') ? path : `${path}/`, 'index.html');
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, rewrite(clean(html)));
    pages.push(path);
    for (const u of collect(html)) {
        const p = u.pathname;
        const ext = posix.extname(p);
        if (ext && ext !== '.html') {
            if (IMAGES === 'copy' || !p.startsWith('/content/images/')) assets.add(p + u.search);
        } else if (!SKIP_PAGES.test(p) && !/\/page\/(\d+)\//.test(p)) {
            queue.push(p.endsWith('/') ? p : `${p}/`);
        } else {
            const n = p.match(/\/page\/(\d+)\//);
            if (n && +n[1] <= MAX_PAGE && !SKIP_PAGES.test(p)) queue.push(p);
        }
    }
}
console.log(`${pages.length} pages`);

// assets, following url() inside the stylesheets
const done = new Set();
let bytes = 0;
const pending = [...assets];
while (pending.length) {
    const a = pending.shift();
    const clean = a.split('?')[0];
    if (done.has(clean)) continue;
    done.add(clean);
    const r = await get(origin + a);
    if (!r.ok) {
        console.warn('missing', a);
        continue;
    }
    const buf = Buffer.from(await r.arrayBuffer());
    const file = join(OUT, decodeURIComponent(clean));
    mkdirSync(dirname(file), { recursive: true });
    if (clean.endsWith('.css')) {
        const css = buf.toString('utf8');
        for (const m of css.matchAll(/url\((["']?)([^)"']+)\1\)/g)) {
            const u = local(m[2], origin + a);
            if (u && posix.extname(u.pathname)) pending.push(u.pathname + u.search);
        }
        writeFileSync(file, rewrite(css));
        bytes += css.length;
    } else {
        writeFileSync(file, buf);
        bytes += buf.length;
    }
}
writeFileSync(join(OUT, '.nojekyll'), '');
if (unmapped.size) console.warn('images not mapped to Commons:', [...unmapped].slice(0, 5));
console.log(`${done.size} assets, ${(bytes / 1048576).toFixed(1)} MB → ${OUT} (public path ${PUBLIC}/)`);
