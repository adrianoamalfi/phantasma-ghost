// Everything the "Adriano Amalfi" demo says. All text is English and kept simple: it describes what is in the pictures
// and nothing about the person beyond the name. The email address is a placeholder.

const tagline = 'Urban photography: stations, bridges, squares and the places in between.';

export const SITE = {
    title: 'Adriano Amalfi',
    description: tagline,
    accent_color: '#ffcc00',
    timezone: 'Europe/Rome',
    locale: 'en',
    facebook: '',
    twitter: '',
    meta_title: 'Adriano Amalfi, urban photography',
    meta_description: 'Urban photography: stations, bridges, squares and the places in between.',
};

export const AUTHOR = {
    name: 'Adriano Amalfi',
    slug: 'adriano',
    bio: 'Urban photography.',
    location: '',
};

export const NAV = [
    { label: 'Home', url: '/' },
    { label: 'Series', url: '/series/' },
    { label: 'About', url: '/about/' },
    { label: 'Contact', url: '/contact/' },
];
export const NAV_SECONDARY = [
    { label: 'Archive', url: '/archive/' },
    { label: 'RSS', url: '/rss/' },
];

// A different look from the first demo: masonry feed, a top header, a personal hero with the portrait, a yellow accent
export const THEME_SETTINGS = {
    header_style: 'Centered',
    post_hero_style: 'Personal',
    personal_hero_headline: 'Adriano Amalfi',
    personal_hero_text: tagline,
    personal_hero_portrait: { upload: 'AVATAR' },
    grid_style: 'Masonry',
    contact_email: 'hello@adrianoamalfi.example',
    social_email: 'hello@adrianoamalfi.example',
    rail_info: '',
    show_featured_slider: 'false',
    show_related_posts: 'true',
    show_author_meta: 'Hidden',
    show_reading_time: 'false',
    cta_headline: 'New photographs, by email',
    cta_text: 'An occasional email when a new series is published.',
};

// The default routes: every post at the root (this demo has no journal)
export const ROUTES = `routes:

collections:
  /:
    permalink: /{slug}/
    template: index

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/
`;

const callout = (emoji, text) =>
    `<div class="kg-card kg-callout-card kg-callout-card-grey"><div class="kg-callout-emoji">${emoji}</div><div class="kg-callout-text">${text}</div></div>`;
const button = (href, label) =>
    `<div class="kg-card kg-button-card kg-align-left"><a href="${href}" class="kg-btn kg-btn-accent">${label}</a></div>`;

export function pages() {
    return [
        {
            title: 'About',
            slug: 'about',
            template: 'custom-about',
            cover: 'AVATAR',
            excerpt: tagline,
            html: `<p>I photograph cities: their stations, bridges, squares and buildings, often at the edges of the day. This site is a small selection, grouped into three series: <a href="/tag/rome/">Rome</a>, <a href="/tag/away/">Away</a> and <a href="/tag/after-dark/">After Dark</a>.</p>
<p>Every photograph here is &copy; Adriano Amalfi, all rights reserved.</p>
${callout('ℹ️', '<strong>About this demo.</strong> This is a demonstration site for the Phantasma theme, set up with a masonry feed, a top header and a personal hero. The theme is open source; the photographs are not, and may not be reused without permission.')}
${button('/series/', 'Browse the series')}`,
        },
        {
            title: 'Contact',
            slug: 'contact',
            template: 'custom-contact',
            excerpt: 'Prints and licensing: write a line about what you have in mind.',
            html: `<p>If you would like a print, or to use a photograph, write a line about what you have in mind and where it would be seen.</p>
${callout('ℹ️', 'This is a demo: the email address shown on this page is a placeholder.')}`,
        },
        {
            title: 'Series',
            slug: 'series',
            template: 'custom-series',
            excerpt: 'Three series, each a short walk through a city.',
            html: '<p>Each series is a small set of photographs.</p>',
        },
        {
            title: 'Archive',
            slug: 'archive',
            template: 'custom-archive',
            excerpt: 'Every photograph, newest first.',
            html: '<p>All photographs, grouped by year.</p>',
        },
    ];
}
