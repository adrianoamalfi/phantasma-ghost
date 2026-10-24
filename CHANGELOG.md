# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- A second demo site, "Adriano Amalfi" (urban photography): top header, personal hero with a portrait, masonry feed and a yellow accent, built next to the first at `/demo-street/`. The seeder now takes `--demo mara|street` and resets unnamed theme settings to their defaults between demos.

## [0.1.0] - 2026-10-24

### Added
- First release: a Ghost 6 theme for photographers, generated from [ghost-theme-starter](https://github.com/adrianoamalfi/ghost-theme-starter) with the `phantasma` skin.
- Look: a light table and a contact sheet. Neutral grey ground (dark by default), safelight-red accent, condensed Archivo titles, JetBrains Mono for frame data, numbered frames, selection marks and cross-document view transitions.
- Sidebar header: a fixed left rail from 64rem with the wordmark, description, vertical menu, a "Get in touch" button, studio details, social links and controls; a top bar below that. Inline, Stacked and Centered headers remain available.
- Home: Slideshow (with pause control), Cover, Poster, Editorial, Split or Personal hero; a strip of series; the feed as justified Rows, Masonry, Uniform or Single column.
- Series pages with a full-bleed cover, a Series index template, a Photo template with previous/next thumbnails and arrow-key navigation, About and Contact templates, a lightbox at the largest available size.
- Members-only and paid photographs ship only a 30px stand-in; Ghost's built-in upgrade box is replaced by a themed, translated panel.
- Demo content (`demo/`): "Mara Voss", 36 photographs in 6 series from Wikimedia Commons with credits and real EXIF captions, a Journal, pages and a seeder for any Ghost site.
- GitHub Pages documentation with screenshots and a static, browsable demo built by a Pages workflow (the photographs are never committed); CI, release and rendered workflows, issue and pull request templates, Dependabot and a branch ruleset.
