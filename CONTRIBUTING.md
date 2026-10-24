# Contributing

Thanks for taking an interest in Phantasma.

## Set up

```bash
npm ci
npm run check
```

`npm run check` builds the CSS and JavaScript, then runs `gscan`, the translation check, the static accessibility check, the unit tests, ESLint and Prettier. It must pass before a pull request.

Use `npm install` when intentionally updating dependencies so `package-lock.json` stays in sync.
`npm run zip` creates the installable theme archive with Node.js; it does not require a system ZIP utility.

To see the theme running, link the folder into a local Ghost install (`ln -s "$PWD" /path/to/ghost/content/themes/phantasma`) and restart Ghost. The `demo/` folder seeds a complete demo site: see [demo/README.md](demo/README.md).

## This theme is generated

Phantasma is generated from [ghost-theme-starter](https://github.com/adrianoamalfi/ghost-theme-starter). Files owned by the starter (core, modules) are updated with `npm run starter:sync`; the look lives in `assets/css/skin/` and the files marked "yours to edit". Prefer changing the starter for anything that other themes would want.

## Pull requests

Open a pull request against `main` and describe the change, the behaviour affected, and how you tested it. The CI workflow runs on pull requests and checks theme compatibility, translations, static accessibility, unit tests, lint and format, generated documentation, and the installable theme ZIP. The `main` branch ruleset requires this check before merge.

Keep pull requests focused. Include screenshots for visual changes and update `CHANGELOG.md` under `Unreleased` for user-visible changes. Do not include secrets, member data, or production content.

Repository maintainers can import [`.github/rulesets/main-branch.json`](.github/rulesets/main-branch.json) from **Settings → Rules → Rulesets → New branch ruleset → Import a ruleset**. It targets the default branch, requires a pull request and the `CI / check` status check, and blocks force-pushes and branch deletion.

## Releases

Releases use Semantic Versioning. Update `package.json` and `package-lock.json` to the same version, move the corresponding `Unreleased` changelog entries into a dated version heading, then push a matching `vX.Y.Z` tag. The Release workflow verifies the tag/version match, reruns CI and ZIP validation, and publishes `phantasma.zip` to a GitHub Release. Do not create the release manually.

## Guidelines

- **Every string** goes through `{{t "..."}}` and exists in all files in `locales/`.
- **Accessibility.** Check pages you change with axe-core, in light and dark and with a few different accents. New colour pairs must reach WCAG AA. `GHOST_URL=... npm run check:rendered` does this against a running Ghost.
- If you add or change a setting, run `npm run docs` so the README and the documentation site match `package.json`.
- A page must work without JavaScript, except for the documented enhancements.

## Reporting bugs

Open an issue with the Ghost version, the theme version, your settings and, if possible, the page URL and a screenshot.
