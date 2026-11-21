# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/). Until 1.0.0, minor versions may contain breaking changes; they are listed under **Breaking**.

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

[0.1.2]: https://github.com/SaadNiaziDev/bento-shad-ui/releases/tag/v0.1.2
[0.1.1]: https://github.com/SaadNiaziDev/bento-shad-ui/releases/tag/v0.1.1
[0.1.0]: https://github.com/SaadNiaziDev/bento-shad-ui/releases/tag/v0.1.0
