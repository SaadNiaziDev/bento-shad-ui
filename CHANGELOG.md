# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/). Until 1.0.0, minor versions may contain breaking changes; they are listed under **Breaking**.

## [0.2.1] - 2026-11-21

First release on npm.

### Added

- Published to npm as [`bento-shad-ui`](https://www.npmjs.com/package/bento-shad-ui): `npm install bento-shad-ui` (pnpm, yarn and bun too).
- `.github/workflows/publish.yml`: publishing a GitHub release puts the version on npm through trusted publishing, with provenance.

### Changed

- Install commands in the docs, README and `llms.txt` use npm instead of `github:SaadNiaziDev/bento-shad-ui#tag`. Installing from GitHub still works, for unreleased commits and forks.
- CDN links use jsDelivr's npm route (`cdn.jsdelivr.net/npm/bento-shad-ui@0.2.1/…`); unpkg works as well.
- README rewritten for npmjs.com: absolute image and link URLs, npm badges, a characters section and a table of every import path.

## [0.2.0] - 2026-11-21

### Added

- **Pencil characters**: eight original hand-drawn characters, four people (Mira, Theo, Zara, Kofi) and four animals (Pip the owl, Dumpling the cat, Biscuit the dachshund, Moss the turtle). Each has six moods: neutral, happy, surprised, sad, thinking, sleepy.
  - Graphite lines in `currentColor` (re-coloured with `--pencil`), hatching, and coloured-pencil fills from the tint tokens, so they follow the theme and dark mode.
  - `bento-shad-ui/illustrations`: `renderCharacter(id, mood, options)`, `characters`, `moods`, typed and SSR-safe.
  - React: `<PencilCharacter character mood size label />`, re-exported from `bento-shad-ui/react`.
  - HTML: `dist/illustrations.iife.min.js` draws every `[data-bk-character]` and redraws when `data-mood` changes.
  - 48 standalone SVGs with plain colours in `dist/illustrations/` (for `<img>`, Figma, Flutter via `flutter_svg`) plus `index.json`.
- `Empty` gets an `illustration` slot; CSS `.bk-illustration` and `.bk-empty-illustration`.
- Docs: Characters page with a live mood switcher, Biscuit on the 404 page, the cast on the home page.

## [0.1.2] - 2026-11-21

### Added

- Documentation website at https://saadniazidev.github.io/bento-shad-ui/: a landing page, sidebar navigation, a page per component with live previews and Preview/HTML tabs, syntax-highlighted code with copy buttons, props tables generated from the TypeScript types, ⌘K search, "On this page" contents, previous/next links, Edit on GitHub, Copy page as Markdown, light/dark, sitemap and 404.
- 47 component pages and a Typography guide in `docs/`. `llms-full.txt` now includes every component page.
- JSDoc descriptions for every React prop, so editors show them on hover.
- `npm run docs` and `npm run docs:serve`. CI builds the site; Pages deploys it.

### Fixed

- `code`, `kbd`, `pre` and `samp` inside `.bk` no longer fall back to the browser's monospace font.

### Changed

- The live kit moved from `index.html` to `site/kit.html` and is served at `/kit/`.

## [0.1.1] - 2026-11-21

### Fixed

- Docs: the shadcn theme must be installed with `npx shadcn@latest add …/bento-theme.json --overwrite`. Without the flag, shadcn keeps its own `--primary`, `--radius` and `--font-sans`, leaving a half-applied theme. Verified on a fresh Next.js 15 + Tailwind v4 app.
- Docs: `llms-full.txt` is about 75 KB, not 60 KB.

## [0.1.0] - 2026-11-21

First public release.

### Added

- Design tokens (`src/tokens.json`): shadcn/ui colour names plus `brand`, `destructive-foreground`, `success`, `warning`, `info`, `inverse` and five tile tints; light and dark; OKLCH output.
- Fonts: Red Hat Display (headings) and Red Hat Text (body). No monospace font.
- `bento.css`: bento grid with container queries, tiles with spans, rows and tones, and 47 components.
- Vanilla core in TypeScript (`bento-shad-ui`, `bento-shad-ui/auto`, `bento.iife.js`): theme switching with flash-free `themeScript`, toasts, popover placement, tabs, command palette, calendar, OTP, slider, dropzone, dialogs via data attributes. SSR-safe.
- React components (`bento-shad-ui/react`): typed, ref-forwarding, controlled or uncontrolled, `asChild` for router links, `"use client"` bundle.
- shadcn/ui: `shadcn-theme.css` for Tailwind v4 and registry items `bento-theme` and `bento-grid`.
- Flutter: `bento_theme.dart` with `ThemeData` for both modes and a `BentoColors` theme extension.
- Docs for HTML, React, shadcn, Flutter, theming, layout, components, JS API, accessibility and AI agents; `llms.txt` and `llms-full.txt`.
- Tests: token parity, WCAG contrast, build output, React rendering and pure helpers. CI and GitHub Pages workflows.

[0.2.1]: https://github.com/SaadNiaziDev/bento-shad-ui/releases/tag/v0.2.1
[0.2.0]: https://github.com/SaadNiaziDev/bento-shad-ui/releases/tag/v0.2.0
[0.1.2]: https://github.com/SaadNiaziDev/bento-shad-ui/releases/tag/v0.1.2
[0.1.1]: https://github.com/SaadNiaziDev/bento-shad-ui/releases/tag/v0.1.1
[0.1.0]: https://github.com/SaadNiaziDev/bento-shad-ui/releases/tag/v0.1.0
