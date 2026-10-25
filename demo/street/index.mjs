// Demo "Adriano Amalfi": urban photography. The photographs are the author's own and are downloaded from his site when
// the demo is built; the portrait is committed next to this file (demo/street/avatar.jpg).
import { readFileSync } from 'node:fs';

export { SERIES, PHOTOS, EXTRA } from './photos.mjs';
export { SITE, AUTHOR, NAV, NAV_SECONDARY, THEME_SETTINGS, ROUTES, pages } from './content.mjs';

export const SOURCES = JSON.parse(readFileSync(new URL('./sources.json', import.meta.url), 'utf8'));

const COPYRIGHT = '&copy; Adriano Amalfi, all rights reserved';
export const caption = (p) => `${p.place}<br>${COPYRIGHT}`;
export const photoHtml = (p) => `<p>${p.note}</p>`;
export const coverAlt = () => 'Portrait of Adriano Amalfi';
export const coverCaption = () => COPYRIGHT;
