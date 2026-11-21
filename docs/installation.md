# Installation

Requirements: a current browser (Chrome, Edge, Safari, Firefox from 2024 on). For npm installs, Node 18+. For React, React 18 or 19.

## 1. npm

```bash
npm install bento-shad-ui
# pnpm add bento-shad-ui
# yarn add bento-shad-ui
# bun add bento-shad-ui
```

[bento-shad-ui on npm](https://www.npmjs.com/package/bento-shad-ui). Releases are published from GitHub Actions with npm provenance, so each version links to the commit it was built from.

What you can import:

| Import | What it is |
|---|---|
| `bento-shad-ui/bento.css` | Tokens + all component styles (`bento.min.css` for the minified file) |
| `bento-shad-ui/tokens.css` | Tokens only (CSS variables for light and dark) |
| `bento-shad-ui` | Typed vanilla core: `start`, `init`, `toast`, `setTheme`, `themeScript`… (ESM, SSR-safe) |
| `bento-shad-ui/auto` | Same as above, and starts the behaviours on import |
| `bento-shad-ui/react` | React components (ESM, marked `"use client"`) |
| `bento-shad-ui/shadcn-theme.css` | `globals.css` for shadcn/ui on Tailwind v4 |
| `bento-shad-ui/tokens.json` | Raw tokens for other tools |
| `bento-shad-ui/flutter/bento_theme.dart` | Flutter theme (copy it into `lib/`) |
| `bento-shad-ui/llms-full.txt` | All docs in one file for AI agents |

The package is ESM-only. Bundlers (Next.js, Vite, webpack 5, esbuild) handle it with no config.

To install an unreleased commit, or your own fork, install from GitHub instead: `npm install github:SaadNiaziDev/bento-shad-ui#main`.

## 2. CDN (no build step)

jsDelivr and unpkg serve every npm version. Pin the exact version in production:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bento-shad-ui@0.2.1/dist/bento.min.css">
<script src="https://cdn.jsdelivr.net/npm/bento-shad-ui@0.2.1/dist/bento.iife.min.js" defer></script>
```

`https://unpkg.com/bento-shad-ui@0.2.1/dist/bento.min.css` works the same way. The script exposes `window.BentoUI` (`BentoUI.toast(...)`, `BentoUI.setTheme('dark')`) and starts itself.

As an ES module without a bundler:

```html
<script type="module">
  import { start, toast } from 'https://cdn.jsdelivr.net/npm/bento-shad-ui@0.2.1/dist/index.js';
  start();
</script>
```

## 3. shadcn/ui registry

In a project that already ran `npx shadcn@latest init`:

```bash
# 1. theme: colours, fonts, radius, tile sizes, light + dark. --overwrite is required
npx shadcn@latest add https://raw.githubusercontent.com/SaadNiaziDev/bento-shad-ui/v0.2.1/r/bento-theme.json --overwrite
# 2. BentoGrid + BentoTile component and the bento-grid / bento-tile utilities
npx shadcn@latest add https://raw.githubusercontent.com/SaadNiaziDev/bento-shad-ui/v0.2.1/r/bento-grid.json
```

Without `--overwrite`, shadcn only adds the new tokens (`--brand`, `--tint-*`…) and keeps its own values for existing ones (`--primary`, `--radius`, `--font-sans`), leaving you with half of each theme.

Or copy `dist/shadcn-theme.css` over `app/globals.css`. See [shadcn.md](shadcn.md).

## 4. Flutter

Copy `dist/flutter/bento_theme.dart` into `lib/` (from `node_modules/bento-shad-ui/dist/flutter/` or from the CDN):

```bash
curl -o lib/bento_theme.dart https://cdn.jsdelivr.net/npm/bento-shad-ui@0.2.1/dist/flutter/bento_theme.dart
```

See [flutter.md](flutter.md).

## Fonts

The library expects **Red Hat Display** (headings) and **Red Hat Text** (body). Both are free under the SIL Open Font License. There is no monospace font.

Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@500;600;700;800&family=Red+Hat+Text:wght@400;500;600;700&display=swap">
```

Next.js (`next/font`, self-hosted, no layout shift):

```tsx
// app/layout.tsx
import { Red_Hat_Display, Red_Hat_Text } from 'next/font/google';
const text = Red_Hat_Text({ subsets: ['latin'], variable: '--font-rh-text' });
const display = Red_Hat_Display({ subsets: ['latin'], variable: '--font-rh-display' });
// <html className={`${text.variable} ${display.variable}`}> …
```

```css
/* globals.css, after bento.css */
:root {
  --font-sans: var(--font-rh-text), ui-sans-serif, system-ui, sans-serif;
  --font-heading: var(--font-rh-display), ui-sans-serif, system-ui, sans-serif;
}
```

If the fonts fail to load, the system UI font is used; nothing breaks.

## Updating

```bash
npm install bento-shad-ui@latest
npm outdated bento-shad-ui   # what you have vs. the newest version
```

Read the [changelog](https://github.com/SaadNiaziDev/bento-shad-ui/blob/main/CHANGELOG.md) first: until 1.0, a minor version (0.x.0) can contain breaking changes. For CDN links, change the version in the URL.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Components have no styles | Import `bento-shad-ui/bento.css` once, and add `class="bk"` to `<body>`. |
| `ERR_REQUIRE_ESM` | The package is ESM-only. Use `import`, or set `"type": "module"`. |
| Dark mode flashes on load | Add the theme script to `<head>`: `<ThemeScript />` in React, `themeScript` string elsewhere. See [theming.md](theming.md). |
| Menus or popovers don't open | They use the native `popover` attribute (browsers since 2024). Update the browser. |
| Next.js: "functions cannot be passed to Client Components" | Event-handler props (`onClick`, `onValueChange`) need a component marked `"use client"`. |
| Grid stays at one column | `.bk-bento-grid` must sit inside `.bk-bento` (React's `BentoGrid` does this for you). |
