#!/usr/bin/env node
/* Regenerates the settings tables in README.md and docs/index.html from package.json, between the
   <!-- settings:start --> and <!-- settings:end --> markers, so the documentation cannot drift. */
import { readFileSync, writeFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const settings = pkg.config.custom;
const labels = {
    header_style: 'Header layout',
    post_hero_style: 'Home hero',
    personal_hero_headline: 'Personal hero: headline',
    personal_hero_text: 'Personal hero: line',
    personal_hero_portrait: 'Personal hero: portrait',
    grid_style: 'Photo feed layout',
    show_featured_slider: 'Featured slider',
    show_author_meta: 'Author on photographs and cards',
    show_reading_time: 'Reading time',
    show_related_posts: 'Related photographs',
    cta_headline: 'Subscribe headline',
    cta_text: 'Subscribe line',
    contact_email: 'Contact email',
    rail_info: 'Studio details (left rail)',
    social_github: 'GitHub',
    social_huggingface: 'Hugging Face',
    social_email: 'Public email',
    social_custom_url: 'Extra profile link',
};
const humanize = (key) => labels[key] || key.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());
const groups = { General: [], Homepage: [], Post: [] };
const groupName = { homepage: 'Homepage', post: 'Post' };
for (const [key, s] of Object.entries(settings)) {
    const values =
        s.type === 'select'
            ? `${s.options.join(' / ')} (default: ${s.default})`
            : s.type === 'boolean'
              ? `On / Off (default: ${s.default ? 'on' : 'off'})`
              : s.type === 'color'
                ? `Colour (default: ${s.default})`
                : s.type === 'image'
                  ? 'Image'
                  : 'Text';
    groups[groupName[s.group] || 'General'].push({ key, label: humanize(key), values, note: s.description || '' });
}
const nonEmpty = Object.entries(groups).filter(([, rows]) => rows.length);

const markdown = nonEmpty
    .map(
        ([g, rows]) =>
            `\n### ${g}\n\n| Key | Setting | Values | Notes |\n| --- | --- | --- | --- |\n` +
            rows.map((r) => `| \`${r.key}\` | ${r.label} | ${r.values} | ${r.note} |`).join('\n') +
            '\n',
    )
    .join('');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const html = nonEmpty
    .map(
        ([g, rows]) =>
            `<h3>${g}</h3>\n<div class="table-wrap"><table>\n<thead><tr><th>Key</th><th>Setting</th><th>Values</th><th>Notes</th></tr></thead>\n<tbody>\n` +
            rows
                .map(
                    (r) =>
                        `<tr><td><code>${r.key}</code></td><td>${esc(r.label)}</td><td>${esc(r.values)}</td><td>${esc(r.note)}</td></tr>`,
                )
                .join('\n') +
            '\n</tbody></table></div>',
    )
    .join('\n');

const inject = (file, body) => {
    const src = readFileSync(file, 'utf8');
    const re = /(<!-- settings:start -->)[\s\S]*?(<!-- settings:end -->)/;
    if (!re.test(src)) throw new Error(`${file}: settings markers not found`);
    writeFileSync(file, src.replace(re, `$1\n${body}\n$2`));
    console.log('updated', file);
};
inject('README.md', markdown);
inject('docs/index.html', html);
