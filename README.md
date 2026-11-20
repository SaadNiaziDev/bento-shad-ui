# bento-shad-ui

A bento-grid UI library with shadcn/ui anatomy. One token file produces framework-free CSS, a typed vanilla core, React components, a shadcn/Tailwind v4 theme and a Flutter theme, in light and dark.

**[Live kit →](https://saadniazidev.github.io/bento-shad-ui/)** · [Docs](docs/getting-started.md) · [Components](docs/components.md) · [llms.txt](llms.txt)

- **47 components**: buttons, forms, calendar, OTP, tables, stats, charts, dialogs, sheets, menus, command palette, navbar, sidebar, bottom nav.
- **Bento layout**: tiles that span 1–4 columns and 1–3 rows; the grid follows its container's width with container queries, so the same markup works in a sidebar, a modal or a full page.
- **shadcn-compatible tokens**: the same variable names (`--primary`, `--muted-foreground`…) plus brand, status, inverse and five tile tints. Colours are written in OKLCH.
- **Accessible**: WCAG AA contrast checked by tests, visible focus rings, keyboard support, native `<dialog>` / `popover` / `<details>`, reduced-motion support.
- **Typed**: TypeScript source, declaration files for the core and every React component.
- **SSR-safe**: no `window` access at import time; React bundle marked `"use client"`.
- **No AI-default fonts**: Red Hat Display and Red Hat Text, with no monospace font anywhere.

## Install

```bash
npm install github:SaadNiaziDev/bento-shad-ui#v0.1.1
```

| Stack | Use |
|---|---|
| Any HTML page | `bento-shad-ui/bento.css` + `bento-shad-ui/auto`, or the CDN files below |
| React / Next.js / Vite | `import 'bento-shad-ui/bento.css'` and `import { … } from 'bento-shad-ui/react'` |
| shadcn/ui + Tailwind v4 | `npx shadcn@latest add …/r/bento-theme.json --overwrite`, then `…/r/bento-grid.json` (full URLs in [shadcn.md](docs/shadcn.md)) |
| Flutter | copy `dist/flutter/bento_theme.dart` |

CDN, no build step:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/SaadNiaziDev/bento-shad-ui@v0.1.1/dist/bento.min.css">
<script src="https://cdn.jsdelivr.net/gh/SaadNiaziDev/bento-shad-ui@v0.1.1/dist/bento.iife.min.js" defer></script>
```

Fonts: [Red Hat Display and Red Hat Text](https://fonts.google.com/?query=red+hat) (SIL OFL). See [installation.md](docs/installation.md) for `next/font` and Flutter.

## Use

HTML:

```html
<body class="bk">
  <div class="bk-bento">
    <div class="bk-bento-grid">
      <article class="bk-tile bk-span-2 bk-row-2" data-tone="inverse">
        <h2 class="bk-h2">Plan together</h2>
        <button class="bk-button" data-variant="brand" data-bk-toast='{"title":"Invite sent"}'>Invite</button>
      </article>
      <article class="bk-tile" data-tone="peach">Offline maps</article>
      <article class="bk-tile">Price alerts</article>
    </div>
  </div>
</body>
```

React:

```tsx
import 'bento-shad-ui/bento.css';
import { BentoGrid, Tile, TileTitle, Button, Stat, toast } from 'bento-shad-ui/react';

export function Overview() {
  return (
    <BentoGrid>
      <Tile span={2} rows={2} tone="inverse">
        <TileTitle>Plan together</TileTitle>
        <Button variant="brand" onClick={() => toast({ title: 'Invite sent', variant: 'success' })}>Invite</Button>
      </Tile>
      <Tile tone="peach"><Stat label="Bookings" value="1,284" delta="+12.4%" trend="up" /></Tile>
      <Tile>Price alerts</Tile>
    </BentoGrid>
  );
}
```

## Guides

| Guide | |
|---|---|
| [Getting started](docs/getting-started.md) | Concepts, which layer to use |
| [Installation](docs/installation.md) | npm, CDN, shadcn registry, Flutter, fonts, troubleshooting |
| [HTML](docs/html.md) · [React](docs/react.md) · [shadcn/ui](docs/shadcn.md) · [Flutter](docs/flutter.md) | Per-stack setup |
| [Theming](docs/theming.md) | Tokens, dark mode, rebranding |
| [Layout](docs/layout.md) | Bento grid, spans, tones, rules |
| [Components](docs/components.md) | Every component, HTML and React |
| [JavaScript API](docs/javascript-api.md) | Core functions, events, data attributes |
| [Accessibility](docs/accessibility.md) | What's built in, what's on you |
| [AI agents](docs/ai-agents.md) | `llms.txt`, `llms-full.txt`, a snippet for your CLAUDE.md |

## What's in the package

```
dist/
  bento.css, bento.min.css        tokens + components
  tokens.css, tokens.json         tokens only
  index.js, auto.js               vanilla core (ESM)
  bento.iife.js, .min.js          script-tag build (window.BentoUI)
  react.js                        React components (ESM, "use client")
  types/                          TypeScript declarations
  shadcn-theme.css                globals.css for shadcn/ui + Tailwind v4
  flutter/bento_theme.dart        Flutter ThemeData + ThemeExtension
r/                                shadcn registry items
docs/                             guides
llms.txt, llms-full.txt           docs for AI agents
```

## Develop

```bash
npm install
npm run check     # typecheck, build, test
open index.html   # the live kit, reading dist/
```

Source lives in `src/`: `tokens.json`, `css/components.css`, `core/*.ts`, `react/*.tsx`. Never edit `dist/`, `r/` or `llms-full.txt` by hand. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT © Saad Ali Khan. Red Hat fonts: SIL Open Font License 1.1.
