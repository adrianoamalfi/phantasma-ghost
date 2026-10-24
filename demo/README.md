# Phantasma demo content

A complete, realistic demo site for the theme: **Mara Voss**, a fictional landscape and documentary photographer.

- 36 photographs in 6 series (White Season, Still Water, Salt & Stone, After Dark, Quiet Rooms, Wild Hours), each with alt text,
  a one-line excerpt, a short note and a caption with the real exposure data from the file's EXIF and the photographer's credit.
- 5 featured photographs for the Slideshow hero, 1 members-only and 1 paid photograph (to show the gated cards and the upgrade panel).
- A Journal with 6 articles (one members-only), and the pages About, Contact, Series, Prints and Archive.
- Navigation, social links, the Sidebar header, theme settings and the routes that keep the Journal out of the photograph feed.

The photographs are free-licensed works from [Wikimedia Commons](https://commons.wikimedia.org/) (CC0, public domain, CC BY or CC BY-SA),
credited under every image and listed in `sources.json`. **Mara Voss is fictional**; the About page says so.
Prices on the Prints page are illustrative.

## Load it into a Ghost site

1. In Ghost Admin create a **custom integration** (Settings → Advanced → Integrations) and copy its Admin API key.
2. Upload and activate the theme, then:

```bash
GHOST_URL=https://your-site.example \
GHOST_ADMIN_API_KEY=<id>:<secret> \
GHOST_STAFF_EMAIL=you@example.com GHOST_STAFF_PASSWORD=... \
node demo/seed.mjs --reset
```

- `--reset` removes every post, page and tag first (use it on a new site).
- Ghost does not let API keys change settings, the theme or routes. The staff login is used only for those steps
  (site title, navigation, theme activation and settings, routes). Without it the script creates the content and prints what
  to set by hand; `--configure-only` repeats just those steps.
- Images are downloaded once into `demo/.cache` (git-ignored) and uploaded to your site. Downloads are polite (sequential, identified).

## Files

- `photos.mjs`: which photograph belongs to which series, and the words around it.
- `content.mjs`: journal articles, pages, site and theme settings, navigation, routes.
- `sources.json`: the Commons file, author, licence and EXIF behind every photograph.
- `seed.mjs`: the seeder.
