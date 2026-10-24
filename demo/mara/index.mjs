// Demo "Mara Voss": the entry point the seeder loads. Photographs come from Wikimedia Commons; captions carry the real
// exposure data from the files' EXIF and the photographer's credit.
import { readFileSync } from 'node:fs';
import { PHOTOS } from './photos.mjs';

export { SERIES, PHOTOS, EXTRA } from './photos.mjs';
export { SITE, AUTHOR, NAV, NAV_SECONDARY, THEME_SETTINGS, ROUTES, journal, pages } from './content.mjs';

export const SOURCES = JSON.parse(readFileSync(new URL('./sources.json', import.meta.url), 'utf8'));
export const JOURNAL_TAG = { name: 'Journal', slug: 'journal', description: 'Notes on technique, editing and printing.', cover: 'A19' };

const byKey = Object.fromEntries(PHOTOS.map((p) => [p.key, p]));
const rat = (v) => {
    if (v == null || v === '' || v === 'undefined') return null;
    const [n, d] = String(v).split('/').map(Number);
    return d ? n / d : n;
};
const fmtTime = (v) => {
    const [n, d] = String(v).split('/').map(Number);
    if (!d) return null;
    const x = n / d;
    if (x >= 1) return `${+x.toFixed(1)} s`;
    if (n === 1) return `1/${d} s`;
    return `${+x.toFixed(1)} s`;
};
const ARTIST = {
    'Original: Gswito Derivative work: W.carter': 'Gswito and W.carter',
    'Maxime Raynal from France': 'Maxime Raynal',
    'Julian Herzog (Website)': 'Julian Herzog',
    GlacierNPS: 'Glacier National Park / NPS',
};
const who = (p) => p.credit || ARTIST[SOURCES[p.key].artist] || SOURCES[p.key].artist;

export const credit = (p) => `Photo: ${who(p)}, ${SOURCES[p.key].lic}`;
export function exposure(p) {
    const s = SOURCES[p.key];
    if (p.exposure) return `${p.cam ? p.cam + ' · ' : ''}${p.exposure}`;
    const parts = [p.cam];
    const fl = rat(s.fl);
    const f = rat(s.f);
    const t = s.t && s.t !== 'undefined' ? fmtTime(s.t) : null;
    const iso = s.iso && s.iso !== 'undefined' ? s.iso : null;
    if (fl) parts.push(`${Math.round(fl)} mm`);
    if (f) parts.push(`f/${+f.toFixed(1)}`);
    if (t) parts.push(t);
    if (iso) parts.push(`ISO ${iso}`);
    return parts.filter(Boolean).join(' · ');
}
export const caption = (p) => `${exposure(p)}<br>${credit(p)} · <a href="${SOURCES[p.key].page}">Wikimedia Commons</a>`;
export const photoHtml = (p) =>
    `<p>${p.note}</p><p><em>${[p.place, (SOURCES[p.key].date || '').match(/\d{4}/)?.[0]].filter(Boolean).join(' · ')}</em></p>`;
// Used by the journal articles: `g(key)` is the credit line of a photograph
export const g = (key) => credit(byKey[key] || { key });
export const coverAlt = (key) => byKey[key]?.alt || SOURCES[key].desc;
export const coverCaption = (key) => `${credit({ key })} · <a href="${SOURCES[key].page}">Wikimedia Commons</a>`;
export const journalCaption = (key) => `${exposure(byKey[key])}<br>${credit(byKey[key])}`;
