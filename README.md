# Phantasma

Theme page: [adrianoamalfi.com/phantasma](https://adrianoamalfi.com/phantasma/) · Documentation and static demo: [adrianoamalfi.github.io/phantasma-ghost](https://adrianoamalfi.github.io/phantasma-ghost/)

[![CI](https://github.com/adrianoamalfi/phantasma-ghost/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/adrianoamalfi/phantasma-ghost/actions/workflows/ci.yml)
[![Latest release](https://img.shields.io/github/v/release/adrianoamalfi/phantasma-ghost)](https://github.com/adrianoamalfi/phantasma-ghost/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> **[Browse the documentation and the static demo](https://adrianoamalfi.github.io/phantasma-ghost/)**: every page and layout, light and dark, desktop and mobile, with screenshots.

A Ghost 6 theme for photographers: a light table and a contact sheet. The photograph is the interface, set on a neutral grey (dark by default, no tint so colours read true) with a safelight-red accent for what is selected. Titles in condensed Archivo, the data of a frame in JetBrains Mono, numbered frames, no rounded corners, a fixed left rail on desktop. Generated from [ghost-theme-starter](https://github.com/adrianoamalfi/ghost-theme-starter) with the `phantasma` skin.

## What you get

- **Sidebar header** (default, `header_style`): from 64rem a fixed left rail with your name, one line about the studio (the site description), the menu, a **Get in touch** button (`contact_email`), `rail_info` (address, city, VAT), social links and the search / colour controls. Below that it is a top bar. The other header styles still work.
- **Home**: a hero (`post_hero_style`: **Slideshow** of up to five featured photographs with pause control, **Cover**, Poster, Editorial, Split or **Personal**), a strip of your series (tags with a cover image), then the portfolio feed. Feed styles: **Rows** (justified, in order), **Masonry**, **Uniform** or **Single column**. Every frame is numbered (01, 02…) in a strip under it; a featured photograph has its number circled.
- **Photo template** (post): the photograph first, large and uncropped (click to open the lightbox), then title, series and any further images or galleries. Previous / next photograph as thumbnails within the series, and the **← →** keys follow them. With `contact_email` set, a **Request a print** button opens an email with the photograph's title in the subject.
- **Series pages**: a tag with a feature image opens with that image as a full-bleed cover with its name, description and count, then the photographs.
- **Series index template** (page): every tag as a cover tile with its number of photographs.
- **About template** (page): portrait beside text.
- **Contact template** (page): your text beside a card with the email, a print request button and your social links.
- **Lightbox**: opens at the largest size the image offers, with a counter, preloads the neighbours and has arrows, swipe and Esc.
- Also from the starter: archive, portfolio, newsletter, membership, landing, essay and note templates; lightbox for images and galleries; share row; related photographs; infinite scroll; colour switch (System, Light, Dark; Dark is the default); subscribe band; social links (Ghost's own accounts plus GitHub, email and one custom link).

## Setting up the site

1. **Publish each photograph as a post** and set the **feature image** and its **alt text** (the alt text is the photograph's description for screen readers; leave it empty only for purely decorative images). Optionally pick the **Photo** template for a single-photo page.
2. **Series**: use tags. Give each tag a feature image (Ghost Admin → Tags) to use it as the series cover. Create a page, choose the **Series** template, and link it from the navigation.
3. **About** and **Contact**: create a page for each, choose the template, set the portrait as the About page's feature image.
4. **Design settings** (Ghost Admin → Settings → Design): `contact_email` (print requests and the Contact page), accent colour (used sparingly, always contrast-safe), `header_style` (Centered by default), `post_hero_style`, `grid_style`, hero text for the Personal style, social accounts, subscribe copy, related photographs.

Reading time and author are hidden by default (a photograph does not need them); turn them on with `show_reading_time` / `show_author_meta`.

## Premium (members-only) photographs

Ghost serves a post's feature image to everyone, even when the post is gated, so a photograph cannot be truly protected by the theme. What Phantasma does: cards and the photo page of a gated post load only a 30px stand-in (blurred), never the full-size file, and the upgrade panel is shown after the preview. What it cannot do: hide the image URL from someone who looks for it, or the `og:image` Ghost adds for sharing. For photographs that must stay private, use a low-resolution or watermarked feature image and keep the original inside the gated content.

## Frame data

Write the exposure line in the feature image's **caption** (for example `35mm · f/2.8 · 1/250 · ISO 400`); it is set in mono under the photograph.

## Install

1. Get `phantasma.zip` from the [Releases](https://github.com/adrianoamalfi/phantasma-ghost/releases) page, or build it with `npm run zip`.
2. In Ghost Admin go to **Settings → Design → Change theme → Upload theme** and activate **Phantasma**.
3. Set the Design settings below. Requires Ghost 6.

## Design settings

<!-- settings:start -->

### General

| Key | Setting | Values | Notes |
| --- | --- | --- | --- |
| `show_related_posts` | Related photographs | On / Off (default: on) | Show related posts after the article. |
| `header_style` | Header layout | Inline / Stacked / Centered / Sidebar (default: Sidebar) | Inline, Stacked (brand above menu), Centered (menu | brand | actions) or Sidebar (fixed left rail) |
| `social_github` | GitHub | Text | GitHub username. Shown as an icon next to the Ghost social accounts. |
| `social_huggingface` | Hugging Face | Text | Hugging Face username. Shown as an icon next to the Ghost social accounts. |
| `social_email` | Public email | Text | Public contact email. Shown as a mail icon next to the social accounts. |
| `social_custom_url` | Extra profile link | Text | Full URL of one extra profile (Medium, Telegram, Scholar…). Shown with a globe icon. |
| `contact_email` | Contact email | Text | Email for print requests and the Contact page (leave empty to hide the buttons) |
| `rail_info` | Studio details (left rail) | Text | Studio details in the left rail: address, city, VAT number (header Sidebar) |

### Homepage

| Key | Setting | Values | Notes |
| --- | --- | --- | --- |
| `post_hero_style` | Home hero | Poster / Editorial / Split / Cover / Slideshow / Personal (default: Slideshow) | Hero: Poster, Editorial, Split, Cover or Slideshow (featured photos), Personal (the author) |
| `personal_hero_headline` | Personal hero: headline | Text | Personal hero: headline (defaults to the site title) |
| `personal_hero_text` | Personal hero: line | Text | Personal hero: short line under the headline (defaults to the site description) |
| `personal_hero_portrait` | Personal hero: portrait | Image | Personal hero: optional portrait |
| `grid_style` | Photo feed layout | Rows / Masonry / Uniform / Single column (default: Rows) | Rows keeps order and fills each row; Masonry columns; Uniform even frames; Single column |
| `cta_headline` | Subscribe headline | Text | Subscribe section: headline |
| `cta_text` | Subscribe line | Text | Subscribe section: supporting line |
| `show_featured_slider` | Featured slider | On / Off (default: off) | Show the other featured posts as a swipeable row under the hero |

### Post

| Key | Setting | Values | Notes |
| --- | --- | --- | --- |
| `show_reading_time` | Reading time | On / Off (default: off) |  |
| `show_author_meta` | Author on photographs and cards | Name and photo / Name only / Hidden (default: Hidden) | Author on posts and cards |

<!-- settings:end -->

## Demo content

`demo/` holds a complete demo site (36 photographs in 6 series, a Journal, pages) and a seeder that loads it into any Ghost site: see [demo/README.md](demo/README.md). `npm run screenshots` regenerates the documentation images; the static demo (`npm run demo:static`) is built by the Pages workflow and is never committed, because it contains the photographs.

## Development

```bash
npm install
npm run dev          # watch CSS/JS
npm run check        # build + gscan + i18n + a11y + unit tests + lint + prettier
npm run zip          # dist/phantasma.zip
npm run docs         # regenerate the settings tables in README and docs
npm run starter:sync -- --dry-run   # pull improvements from ghost-theme-starter
```

The look lives in `assets/css/skin/` (tokens and rules). Everything else is starter-owned and updated with `starter:sync`; see `.starter.json`. `npm run check` builds, then runs gscan, the translation and accessibility checks, unit tests, ESLint and Prettier. `GHOST_URL=http://localhost:2368 npm run check:rendered` runs axe-core and a layout-shift budget against a running Ghost, in light and dark. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Credits

Designed and built by [Adriano Amalfi](https://adrianoamalfi.com). Fonts: [Archivo](https://github.com/Omnibus-Type/Archivo) and [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono), SIL Open Font License 1.1 (see `assets/fonts/`). Demo photographs: Wikimedia Commons contributors, credited in the demo and listed in `demo/sources.json`. Built with Ghost 6. Released under the [MIT License](LICENSE).
