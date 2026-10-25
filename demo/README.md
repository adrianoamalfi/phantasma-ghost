# Phantasma demo content

Two complete demo sites for the theme, each a folder here, loaded with the same seeder:

| Demo | Folder | Look |
| --- | --- | --- |
| **Mara Voss** (fictional): landscapes and light | `demo/mara/` | Sidebar rail, slideshow hero, justified rows, a Journal, gated photographs, Prints |
| **Adriano Amalfi**: urban photography | `demo/street/` | Top header, personal hero with a portrait, masonry feed, yellow accent |

```bash
GHOST_URL=https://your-site.example \
GHOST_ADMIN_API_KEY=<id>:<secret> \
GHOST_STAFF_EMAIL=you@example.com GHOST_STAFF_PASSWORD=... \
node demo/seed.mjs --demo mara --reset      # or --demo street
```

## What each demo contains

- **mara**: 36 photographs in 6 series with alt text, an excerpt, a note and a caption with the real exposure data from the file's EXIF and the photographer's credit; 5 featured photographs for the slideshow, one members-only and one paid photograph; a Journal with 6 articles (one members-only); pages About, Contact, Series, Prints, Archive. Photographs: free-licensed works from [Wikimedia Commons](https://commons.wikimedia.org/) (CC0, public domain, CC BY, CC BY-SA), credited under every image and listed in `mara/sources.json`. Mara Voss is fictional; prices on the Prints page are illustrative.
- **street**: 13 photographs in 3 series (Rome, Away, After Dark), pages About, Contact, Series, Archive. The photographs are the author's own, taken from his site when the demo is built, and carry "&copy; Adriano Amalfi, all rights reserved": they are shown for this demo only and may not be reused. The portrait is `street/avatar.jpg`. The email address is a placeholder.

The photographs are never committed: they are downloaded into `demo/.cache` (git-ignored) and uploaded to your site.

## Options

- `--reset` removes every post, page and tag first (use it on a new site).
- Ghost does not let API keys change settings, the theme or routes. The staff login is used only for those steps (site title, navigation, theme activation and settings, routes). Without it the script creates the content and prints what to set by hand; `--configure-only` repeats just those steps. Settings a demo does not name go back to the theme's defaults, so one demo never leaks into the next.
- `bootstrap.mjs` prepares a brand-new, empty Ghost (owner, integration) and seeds one or more demos: `node demo/bootstrap.mjs --demos mara,street --static`. With `--static` it also writes the static copies under `docs/` (`docs/demo`, `docs/demo-street`) for GitHub Pages; the Pages workflow does this.

## Files

- `<demo>/index.mjs`: the entry point the seeder loads (captions, credits, helpers).
- `<demo>/photos.mjs`: which photograph belongs to which series, and the words around it.
- `<demo>/content.mjs`: pages, site and theme settings, navigation, routes.
- `<demo>/sources.json`: where each photograph comes from.
- `seed.mjs`, `bootstrap.mjs`: the scripts.
