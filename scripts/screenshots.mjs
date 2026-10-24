#!/usr/bin/env node
/* Captures the documentation screenshots from a running Ghost site seeded with the demo content (see demo/README.md).
   Uses puppeteer-core with a local Chrome (set CHROME to override).

   Usage:
     GHOST_URL=http://localhost:2368 node scripts/screenshots.mjs [--out docs/screenshots] [--only name,name] [--demo street] */
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import puppeteer from 'puppeteer-core';
import { chromePath } from './chrome.mjs';

const args = Object.fromEntries(
    process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith('--') ? a.concat([[v.slice(2), all[i + 1]]]) : a), []),
);
const BASE = (process.env.GHOST_URL || 'http://localhost:2368').replace(/\/$/, '');
const OUT = args.out || 'docs/screenshots';
const ONLY = args.only ? args.only.split(',') : null;

// Shot fields: name, path, w, h, dpr, scheme (light|dark), js (run before capture), scroll (selector to bring to the top),
// clip (selector to crop to, with pad px), full (full page), wait (ms).
const desktop = { w: 1440, h: 900, dpr: 1 };
const phone = { w: 390, h: 844, dpr: 2 };
const layout = (cls) =>
    `document.querySelector('.gh-feed--photos').className = 'gh-feed gh-feed--photos gh-feed--${cls}'`;
const STREET = [
    { name: 'street-home', path: '/', ...desktop, scheme: 'dark' },
    { name: 'street-feed', path: '/', ...desktop, scheme: 'dark', scroll: '.gh-feed--photos', offset: 60 },
    { name: 'street-photo', path: '/castel-santangelo/', ...desktop, scheme: 'dark' },
    { name: 'street-about', path: '/about/', ...desktop, scheme: 'dark' },
    { name: 'street-series', path: '/tag/after-dark/', ...desktop, scheme: 'dark' },
    { name: 'street-mobile', path: '/', ...phone, scheme: 'dark' },
];
const SHOTS =
    args.demo === 'street'
        ? STREET
        : [
              { name: 'home-dark', path: '/', ...desktop, scheme: 'dark' },
              { name: 'home-light', path: '/', ...desktop, scheme: 'light' },
              { name: 'series-strip', path: '/', ...desktop, scheme: 'dark', clip: '.gh-series-strip', pad: 24 },
              { name: 'feed-rows', path: '/', ...desktop, scheme: 'dark', scroll: '.gh-feed--photos', offset: 60 },
              {
                  name: 'feed-masonry',
                  path: '/',
                  ...desktop,
                  scheme: 'dark',
                  js: layout('masonry'),
                  scroll: '.gh-feed--photos',
                  offset: 60,
              },
              {
                  name: 'feed-uniform',
                  path: '/',
                  ...desktop,
                  scheme: 'dark',
                  js: layout('uniform'),
                  scroll: '.gh-feed--photos',
                  offset: 60,
              },
              { name: 'feed-locked', path: '/', ...desktop, scheme: 'dark', scroll: '.gh-photo--locked', offset: 200 },
              { name: 'rail', path: '/', w: 1440, h: 640, dpr: 2, scheme: 'dark', clip: '.gh-hdr--rail', pad: 0 },
              { name: 'series-index', path: '/series/', ...desktop, scheme: 'dark' },
              { name: 'series-page', path: '/tag/white-season/', ...desktop, scheme: 'dark', full: true },
              { name: 'photo', path: '/rubjerg-at-dusk/', ...desktop, scheme: 'dark' },
              { name: 'photo-light', path: '/rubjerg-at-dusk/', ...desktop, scheme: 'light' },
              {
                  name: 'photo-details',
                  path: '/rubjerg-at-dusk/',
                  ...desktop,
                  scheme: 'dark',
                  scroll: '.gh-photo-head',
                  offset: 80,
              },
              {
                  name: 'photo-nav',
                  path: '/rubjerg-at-dusk/',
                  ...desktop,
                  scheme: 'dark',
                  scroll: '.gh-photo-nav',
                  offset: 200,
              },
              {
                  name: 'lightbox',
                  path: '/rubjerg-at-dusk/',
                  ...desktop,
                  scheme: 'dark',
                  js: "document.querySelector('.gh-photo-hero img').click()",
                  wait: 1200,
              },
              {
                  name: 'gated',
                  path: '/star-trails-at-la-hague/',
                  ...desktop,
                  scheme: 'dark',
                  scroll: '.gh-post-upgrade',
                  offset: 260,
              },
              { name: 'journal', path: '/journal/', ...desktop, scheme: 'dark' },
              {
                  name: 'journal-post',
                  path: '/journal/intentional-camera-movement/',
                  ...desktop,
                  scheme: 'dark',
                  full: true,
              },
              { name: 'about', path: '/about/', ...desktop, scheme: 'dark' },
              { name: 'contact', path: '/contact/', ...desktop, scheme: 'dark' },
              { name: 'prints', path: '/prints/', ...desktop, scheme: 'dark', full: true },
              { name: 'archive', path: '/archive/', ...desktop, scheme: 'dark' },
              {
                  name: 'footer',
                  path: '/',
                  w: 1440,
                  h: 400,
                  dpr: 2,
                  scheme: 'dark',
                  clip: '.gh-footer',
                  pad: 0,
                  scroll: '.gh-footer',
                  offset: 0,
              },
              { name: 'mobile-home', path: '/', ...phone, scheme: 'dark' },
              {
                  name: 'mobile-menu',
                  path: '/',
                  ...phone,
                  scheme: 'dark',
                  js: "document.getElementById('gh-burger').click()",
                  wait: 500,
              },
              { name: 'mobile-photo', path: '/rubjerg-at-dusk/', ...phone, scheme: 'dark' },
              { name: 'mobile-series', path: '/', ...phone, scheme: 'dark', scroll: '.gh-series-strip', offset: 80 },
          ];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });
const browser = await puppeteer.launch({ executablePath: chromePath(), headless: true, args: ['--no-sandbox'] });
try {
    for (const shot of SHOTS) {
        if (ONLY && !ONLY.includes(shot.name)) continue;
        const page = await browser.newPage();
        await page.setViewport({
            width: shot.w,
            height: shot.h,
            deviceScaleFactor: shot.dpr,
            isMobile: shot.w < 600,
            hasTouch: shot.w < 600,
        });
        await page.evaluateOnNewDocument((v) => {
            try {
                localStorage.setItem('gh-scheme', v);
            } catch {
                /* storage unavailable */
            }
        }, shot.scheme);
        await page.goto(BASE + shot.path, { waitUntil: 'networkidle2', timeout: 60000 });
        // load every lazy image, then go back to the top
        await page.evaluate(async () => {
            const limit = Math.min(document.body.scrollHeight, 9000);
            for (let y = 0; y < limit; y += 600) {
                scrollTo(0, y);
                await new Promise((r) => setTimeout(r, 90));
            }
            await Promise.all(
                [...document.images].map((i) =>
                    Promise.race([i.decode().catch(() => {}), new Promise((r) => setTimeout(r, 4000))]),
                ),
            );
            scrollTo(0, 0);
        });
        if (shot.js) await page.evaluate(shot.js);
        if (shot.scroll) {
            await page.evaluate(
                (sel, off) => {
                    const el = document.querySelector(sel);
                    if (el) scrollTo(0, el.getBoundingClientRect().top + scrollY - off);
                },
                shot.scroll,
                shot.offset ?? 0,
            );
        }
        await sleep(shot.wait ?? 700);
        const file = join(OUT, `${shot.name}.webp`);
        const opts = { path: file, type: 'webp', quality: 82 };
        if (shot.clip) {
            const box = await page.evaluate((sel) => {
                const r = document.querySelector(sel)?.getBoundingClientRect();
                return r && { x: r.x, y: r.y + scrollY, width: r.width, height: r.height };
            }, shot.clip);
            if (!box) throw new Error(`${shot.name}: ${shot.clip} not found`);
            const pad = shot.pad ?? 0;
            await page.screenshot({
                ...opts,
                captureBeyondViewport: true,
                clip: {
                    x: Math.max(0, box.x - pad),
                    y: Math.max(0, box.y - pad),
                    width: box.width + 2 * pad,
                    height: box.height + 2 * pad,
                },
            });
        } else {
            await page.screenshot({ ...opts, fullPage: !!shot.full });
        }
        console.log('captured', shot.name);
        await page.close();
    }
} finally {
    await browser.close();
}
