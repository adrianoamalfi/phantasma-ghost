#!/usr/bin/env node
/*
 * Prepares a brand-new, empty Ghost site (a local dev install or a CI container) for the demo: waits for it to answer,
 * creates the owner account and a custom integration, then runs the seeder with the new keys, once per demo.
 *
 *   GHOST_URL=http://localhost:2368 node demo/bootstrap.mjs [--demos mara,street] [--static] [--base-path /phantasma-ghost]
 *
 * With --static each demo is also crawled into a static copy under docs/ (mara in docs/demo, the others in
 * docs/demo-<name>) for GitHub Pages; the path prefix comes from --base-path or from GITHUB_REPOSITORY.
 *
 * The owner password is random and printed nowhere; the site is meant to be thrown away. Never run this against a site
 * you care about: it refuses to continue if the site is already set up.
 */
import { randomBytes } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = (process.env.GHOST_URL || 'http://localhost:2368').replace(/\/$/, '');
const API = `${BASE}/ghost/api/admin`;
const here = dirname(fileURLToPath(import.meta.url));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForGhost() {
    for (let i = 0; i < 120; i++) {
        try {
            const r = await fetch(`${API}/site/`);
            if (r.ok) return;
        } catch {
            /* not up yet */
        }
        await sleep(2000);
    }
    throw new Error(`Ghost did not answer at ${BASE}`);
}

async function json(r) {
    const text = await r.text();
    if (!r.ok) throw new Error(`${r.url} → ${r.status} ${text.slice(0, 200)}`);
    return text ? JSON.parse(text) : {};
}

await waitForGhost();
const status = await json(await fetch(`${API}/authentication/setup/`));
if (status.setup?.[0]?.status) throw new Error('This site is already set up. Use demo/seed.mjs with your own integration key instead.');

const email = 'demo@maravoss.example';
const password = `${randomBytes(12).toString('base64url')}Aa1!`;
await json(
    await fetch(`${API}/authentication/setup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ setup: [{ name: 'Mara Voss', email, password, blogTitle: 'Mara Voss' }] }),
    }),
);
const session = await fetch(`${API}/session/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: BASE },
    body: JSON.stringify({ username: email, password }),
});
if (!session.ok) throw new Error(`login failed: ${session.status}`);
const cookie = (session.headers.getSetCookie?.() || []).map((c) => c.split(';')[0]).join('; ');
const integration = (
    await json(
        await fetch(`${API}/integrations/?include=api_keys`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Origin: BASE, Cookie: cookie },
            body: JSON.stringify({ integrations: [{ name: 'Demo seeder' }] }),
        }),
    )
).integrations[0];
// for an admin key Ghost returns the whole "id:secret" in `secret`
const adminKey = integration.api_keys.find((k) => k.type === 'admin');
const key = adminKey.secret.includes(':') ? adminKey.secret : `${adminKey.id}:${adminKey.secret}`;
if (process.env.GITHUB_ENV) {
    // keep the throw-away credentials out of the public workflow log
    for (const v of [key, password]) console.log(`::add-mask::${v}`);
     appendFileSync(process.env.GITHUB_ENV, `GHOST_ADMIN_API_KEY=${key}\nGHOST_STAFF_EMAIL=${email}\nGHOST_STAFF_PASSWORD=${password}\n`);
}

const env = { ...process.env, GHOST_URL: BASE, GHOST_ADMIN_API_KEY: key, GHOST_STAFF_EMAIL: email, GHOST_STAFF_PASSWORD: password };
const arg = (name, fallback) => (process.argv.includes(`--${name}`) ? process.argv[process.argv.indexOf(`--${name}`) + 1] : fallback);
const demos = arg('demos', 'mara').split(',');
const basePath = arg('base-path', process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '/phantasma-ghost');
const docs = join(here, '..', 'docs');
const run = (script, args) => {
    const r = spawnSync('node', [join(here, script), ...args], { stdio: 'inherit', env });
    if (r.status !== 0) process.exit(r.status ?? 1);
};
for (const name of demos) {
    run('seed.mjs', ['--demo', name, '--reset']);
    if (process.argv.includes('--static')) {
        const dir = name === 'mara' ? 'demo' : `demo-${name}`;
        run(join('..', 'scripts', 'static-demo.mjs'), ['--out', join(docs, dir), '--public', `${basePath}/${dir}`]);
    }
}
