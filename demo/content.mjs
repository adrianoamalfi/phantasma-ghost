// Everything the demo says: journal articles, pages, site and theme settings, routes. All text is English.
// Photographs come from photos.mjs; `img(key)` and `src(key)` are filled in by seed.mjs once the files are uploaded.

export const SITE = {
    title: 'Mara Voss',
    description: 'Landscape and documentary photography: quiet places, long light.',
    accent_color: '#ff4d2e',
    timezone: 'Europe/London',
    locale: 'en',
    facebook: '',
    twitter: '',
    meta_title: 'Mara Voss, landscape and documentary photographer',
    meta_description: 'Series of landscape, coastal, night and architectural photographs, with prints available.',
};

export const AUTHOR = {
    name: 'Mara Voss',
    bio: 'Landscape and documentary photographer based in Bristol. Quiet places, long light.',
    location: 'Bristol, United Kingdom',
};

export const NAV = [
    { label: 'Home', url: '/' },
    { label: 'Series', url: '/series/' },
    { label: 'Journal', url: '/journal/' },
    { label: 'Prints', url: '/prints/' },
    { label: 'About', url: '/about/' },
    { label: 'Contact', url: '/contact/' },
];
export const NAV_SECONDARY = [
    { label: 'Archive', url: '/archive/' },
    { label: 'RSS', url: '/rss/' },
];

export const THEME_SETTINGS = {
    header_style: 'Sidebar',
    post_hero_style: 'Slideshow',
    grid_style: 'Rows',
    contact_email: 'hello@maravoss.example',
    social_email: 'hello@maravoss.example',
    rail_info: 'Studio 14, 22 Mill Lane, Bristol BS1. Visits by appointment.',
    show_featured_slider: 'false',
    show_related_posts: 'true',
    show_author_meta: 'Hidden',
    show_reading_time: 'false',
    cta_headline: 'Join the Print Club',
    cta_text: 'One email a month: new work, notes from behind the frames, and first access to limited prints.',
};

// Journal posts live under /journal/, photographs at the root; the home feed lists photographs only.
export const ROUTES = `routes:

collections:
  /journal/:
    permalink: /journal/{slug}/
    filter: tag:journal
    template: index
  /:
    permalink: /{slug}/
    filter: tag:-journal
    template: index

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/
`;

const fig = (url, alt, caption, width = 'wide') =>
    `<figure class="kg-card kg-image-card kg-width-${width} kg-card-hascaption"><img src="${url}" alt="${alt}" loading="lazy"><figcaption>${caption}</figcaption></figure>`;

const gallery = (items) =>
    `<figure class="kg-card kg-gallery-card kg-width-wide"><div class="kg-gallery-container">${items
        .map(
            (g) =>
                `<div class="kg-gallery-row">${g
                    .map((i) => `<div class="kg-gallery-image"><img src="${i.url}" alt="${i.alt}" width="${i.w}" height="${i.h}" loading="lazy"></div>`)
                    .join('')}</div>`,
        )
        .join('')}</div></figure>`;

const callout = (emoji, text) =>
    `<div class="kg-card kg-callout-card kg-callout-card-grey"><div class="kg-callout-emoji">${emoji}</div><div class="kg-callout-text">${text}</div></div>`;

const button = (href, label) =>
    `<div class="kg-card kg-button-card kg-align-left"><a href="${href}" class="kg-btn kg-btn-accent">${label}</a></div>`;

export function journal({ img, g }) {
    return [
        {
            title: 'How I Sequence a Series',
            slug: 'how-i-sequence-a-series',
            date: '2026-10-02T09:00:00.000Z',
            featured: false,
            cover: 'A3',
            excerpt: 'Six photographs are not a folder, they are an argument. How I choose the order.',
            html: `<p>A series is not a folder of good pictures. It is an argument, and the order of the photographs is the order of the argument. I sequence on a table with small prints, not on a screen, because a screen invites you to keep the strongest image first and the rest as filler.</p>
<h2>Start with a quiet frame</h2>
<p>The first photograph sets the tone, and it rarely needs to be the best one. In <em>White Season</em> I open with a wide, calm view of a snowy forest and let the viewer settle before anything dramatic happens.</p>
${fig(img('A4'), 'A bare tree against an orange winter sunrise', 'A warm frame after a cool one keeps the sequence moving. ' + g('A4'))}
<h2>Alternate scale and rhythm</h2>
<p>Wide, then close. Busy, then empty. Warm, then cool. A sequence that repeats one kind of picture reads like a catalogue; one that alternates reads like a walk.</p>
<blockquote>The photograph after the strong one matters more than the strong one.</blockquote>
<h2>My checklist before I lock the order</h2>
<ul>
<li>Does each frame add something the previous one did not?</li>
<li>Would the series survive losing its single best picture?</li>
<li>Do the first and last frames answer each other?</li>
<li>Is there at least one photograph I would be sorry to cut but cut anyway?</li>
</ul>
${fig(img('A23'), 'A small chapel on a snowy hill', 'The closing frame: small, warm, and quiet. ' + g('A23'))}
<p>You can see the result on the <a href="/tag/white-season/">White Season</a> page.</p>`,
        },
        {
            title: 'Intentional Camera Movement, Step by Step',
            slug: 'intentional-camera-movement',
            date: '2026-09-14T09:00:00.000Z',
            featured: false,
            cover: 'A19',
            excerpt: 'A slow shutter, a steady sweep, and a forest becomes a painting.',
            html: `<p>Intentional camera movement, or ICM, is the opposite of sharp. You move the camera on purpose during a slow exposure and let the scene smear into colour and line. The trick is that the movement must be controlled, otherwise you get a blur and not a picture.</p>
<h2>The recipe</h2>
<ol>
<li>Pick a scene with strong verticals: tree trunks, poles, reeds.</li>
<li>Set a slow shutter, between 1/4 s and 1 s. In bright light, close the aperture or add a neutral density filter.</li>
<li>Press the shutter, then sweep the camera smoothly in the same direction as the lines.</li>
<li>Stop moving after the shutter closes, not before.</li>
<li>Delete most of what you shot. Keep the two or three that feel inevitable.</li>
</ol>
${callout('💡', 'Start at a shutter speed that feels too fast. You can always go slower, but you cannot recover a frame where the movement was timid.')}
<p>The photograph at the top of this page was made on a snowy trail in Sweden: 1/6 s at f/29, sweeping up. The camera was a modest entry-level body, which is the point: ICM costs nothing but attention.</p>`,
        },
        {
            title: 'Reading the Histogram Before the Photograph',
            slug: 'reading-the-histogram',
            date: '2026-08-22T09:00:00.000Z',
            featured: false,
            cover: 'B14',
            excerpt: 'Three shapes to recognise in the field, and what each one asks you to do.',
            html: `<p>The picture on the back of the camera lies. It is brighter or darker than the file, depending on the room you are in. The histogram does not lie, and learning to read it takes about ten minutes.</p>
<h2>Three shapes worth knowing</h2>
<ul>
<li><strong>A hump pushed against the left edge.</strong> The shadows are clipping. Open up, or accept a silhouette.</li>
<li><strong>A hump pushed against the right edge.</strong> The highlights are clipping. Close down; highlights do not come back.</li>
<li><strong>A hump in the middle with room on both sides.</strong> Safe, flexible, and often a little dull. It is where you edit from.</li>
</ul>
${fig(img('B9'), 'Chalk cliffs at low tide', 'White chalk is a histogram test: expose to the right, but not past it. ' + g('B9'))}
<h2>Expose to the right, carefully</h2>
<p>Raw files carry more information in the bright half of the histogram. Pushing the exposure until the right edge just touches, without clipping, gives you cleaner shadows after editing. It works on white cliffs, snow and fog alike.</p>
<hr>
<p>If you only change one habit this month, check the histogram instead of the preview.</p>`,
        },
        {
            title: 'Why I Still Print',
            slug: 'why-i-still-print',
            date: '2026-07-30T09:00:00.000Z',
            featured: false,
            cover: 'D10',
            excerpt: 'A photograph on a wall is a different photograph. Notes on paper, size and patience.',
            html: `<p>A photograph on a screen is a message. A photograph on a wall is a place. I print to find out which of my pictures can survive being looked at for a year.</p>
${gallery([[{ url: img('B4'), alt: 'Lighthouse at dusk', w: 6720, h: 4480 }, { url: img('B34'), alt: 'Black and white lighthouse', w: 3747, h: 2810 }], [{ url: img('B9'), alt: 'Chalk cliffs', w: 6574, h: 3000 }]])}
<h2>What paper changes</h2>
<p>Matte cotton rag softens contrast and makes quiet pictures feel quieter. Glossy paper makes colour pop and punishes noise. Neither is better; they are different voices.</p>
<blockquote>If a print is still interesting after a month on the wall, it was worth taking.</blockquote>
<h2>Sizes</h2>
<p>Small prints reward close looking. Large prints reward standing back. I rarely print in between.</p>
${button('/prints/', 'See the prints')}`,
        },
        {
            title: 'Notes on Winter Light',
            slug: 'notes-on-winter-light',
            date: '2026-02-11T09:00:00.000Z',
            featured: false,
            cover: 'A23',
            excerpt: 'Low sun, long shadows, and why snow is the most forgiving subject in photography.',
            html: `<p>Winter gives you a sun that never climbs high, which means the light is soft for longer and warm for longer. If you only photograph in summer, you are missing half of what light can do.</p>
${gallery([[{ url: img('A7'), alt: 'Pink ridges at sunrise', w: 5472, h: 3648 }, { url: img('A3'), alt: 'Spruce forest in snow', w: 4927, h: 2510 }], [{ url: img('A4'), alt: 'Tree against orange sunrise', w: 5354, h: 3569 }]])}
<h2>Three things snow does</h2>
<p>It reflects light into the shadows, so contrast drops. It simplifies the ground, so subjects separate easily. And it records the weather: every footprint, every drift, every hour of the day.</p>
<blockquote>Snow is a free reflector the size of a landscape.</blockquote>
<p>Overexpose a little to keep it white, keep your battery warm, and bring a thicker pair of gloves than you think you need.</p>`,
        },
        {
            title: 'Behind the Frames: Editing White Season',
            slug: 'behind-the-frames-editing-white-season',
            date: '2026-09-28T09:00:00.000Z',
            featured: false,
            cover: 'A7',
            visibility: 'members',
            excerpt: 'For members: how forty winter frames became six photographs.',
            html: `<p>Every series starts as too many pictures. White Season began with forty-one frames from four winters, and ended with six. This note walks through the cuts.</p>
<p>The first pass is fast and unkind: anything out of focus, anything with a distracting edge, anything I have already seen a hundred times goes. That leaves about twenty.</p>
<!--members-only-->
<h2>The second pass</h2>
<p>I print the twenty at postcard size and lay them on a table. Pairs that do the same job are the first to go. If two photographs say the same thing, only the better one stays.</p>
${fig(img('A16'), 'Snow-covered cemetery in fog', 'This one stayed because it is the quietest frame in the set. ' + g('A16'))}
<h2>The last cut</h2>
<p>The final six are not my six best photographs. They are the six that work together. Two strong landscapes did not make it because the series already had a strong landscape.</p>
${callout('🎞', 'Members get a note like this every month. Join the Print Club to read the rest of the archive.')}`,
        },
    ];
}

export function pages({ img }) {
    return [
        {
            title: 'About',
            slug: 'about',
            template: 'custom-about',
            cover: 'D2',
            excerpt: 'Landscape and documentary photographer, based in Bristol. I make quiet pictures of quiet places.',
            html: `<p>I photograph places at the edges of the day: fog on a lake, a lighthouse after sunset, a stairwell nobody uses. My pictures are slow on purpose. I would rather make six that belong together than sixty that do not.</p>
<h2>How I work</h2>
<p>Most of my work is made on foot, with a tripod and one or two lenses. I plan around weather rather than around locations, and I edit on paper before I publish anything. Each series on this site is a closed set: when it is done, it is done.</p>
<h2>Prints and commissions</h2>
<p>Prints are made on archival cotton paper in small editions. I take a small number of commissions each year for editorial and architectural work. If you have a project in mind, write to me on the <a href="/contact/">contact page</a>.</p>
${callout('ℹ️', '<strong>About this demo.</strong> This is a demonstration site for the Phantasma theme. Mara Voss is a fictional photographer; the photographs are free-licensed works by photographers on Wikimedia Commons, credited under every image.')}
${button('/series/', 'Browse the series')}`,
        },
        {
            title: 'Contact',
            slug: 'contact',
            template: 'custom-contact',
            excerpt: 'Prints, licensing and commissions. I answer every message within three working days.',
            html: `<p>Whether you want a print, a licence for editorial use, or a conversation about a commission, write to me. A line about what you have in mind and where it will be seen is all I need to start.</p>
<h2>Prints</h2>
<p>Every photograph on this site can be printed. Tell me the title, the size and the paper, and I will reply with a quote and a delivery date. Limited editions are numbered and signed.</p>
<h2>Licensing and commissions</h2>
<p>Editorial licences are usually quoted per use. For commissions, a short brief and a rough deadline help me tell you honestly whether it is a good fit.</p>
<h2>Studio visits</h2>
<p>The studio is in Bristol and visits are by appointment. It is the best place to see prints in person.</p>`,
        },
        {
            title: 'Series',
            slug: 'series',
            template: 'custom-series',
            excerpt: 'Six series, each a short walk through one kind of light.',
            html: `<p>Each series is a closed set of photographs, edited and sequenced together.</p>`,
        },
        {
            title: 'Archive',
            slug: 'archive',
            template: 'custom-archive',
            excerpt: 'Every photograph, newest first.',
            html: `<p>All photographs, grouped by year.</p>`,
        },
        {
            title: 'Prints',
            slug: 'prints',
            template: 'custom-landing',
            excerpt: 'Archival prints, made to order.',
            html: `<h1>Prints, made slowly</h1>
<p>Every photograph on this site is available as an archival pigment print on cotton rag paper. They are made to order in small editions, signed and numbered, and shipped flat in a protective box.</p>
${gallery([[{ url: img('B4'), alt: 'Lighthouse at dusk', w: 6720, h: 4480 }, { url: img('E39'), alt: 'Dead tree in Deadvlei', w: 8078, h: 5399 }, { url: img('A47'), alt: 'Fog on a lake', w: 7000, h: 4667 }]])}
<h2>Sizes and editions</h2>
<ul>
<li><strong>Small, 30 × 20 cm.</strong> Open edition. From €85.</li>
<li><strong>Medium, 60 × 40 cm.</strong> Edition of 50. From €240.</li>
<li><strong>Large, 120 × 80 cm.</strong> Edition of 15. From €780.</li>
</ul>
<p><em>Prices are illustrative: this is a demonstration site.</em></p>
<h2>Join the Print Club</h2>
<p>Members get first access to new editions, a monthly note from behind the frames, and photographs that are not published anywhere else.</p>
${button('#/portal/signup', 'Join the Print Club')}
${button('/contact/', 'Request a print')}`,
        },
    ];
}
