# Getting started

bento-shad-ui is a UI library for interfaces laid out as bento grids: rounded tiles of different sizes, one idea per tile. The components follow shadcn/ui anatomy and token names, so the library fits next to shadcn and Tailwind, and it also works on a plain HTML page and in Flutter.

## One token file, five ways to use it

Every colour, radius and font lives in `src/tokens.json`. The build turns it into:

| Layer | Import | Use it when |
|---|---|---|
| CSS | `bento-shad-ui/bento.css` | Any website or web app. Classes start with `bk-`. |
| Core (TypeScript) | `bento-shad-ui` or the CDN script | You want theme switching, tabs, dialogs, menus, toasts and the command palette to work from HTML attributes. |
| React | `bento-shad-ui/react` | React 18/19, Next.js, Vite. Typed components with no Tailwind needed. |
| shadcn theme + registry | `bento-shad-ui/shadcn-theme.css`, `npx shadcn add …/r/bento-theme.json` | You already use shadcn/ui and Tailwind v4 and want this look plus `BentoGrid`/`BentoTile`. |
| Flutter | `dist/flutter/bento_theme.dart` | Flutter apps: `ThemeData` for light and dark plus every token as a `ThemeExtension`. |

You can mix layers: for example a Next.js marketing site on `bento-shad-ui/react` and a Flutter app on `bento_theme.dart` share the same colours.

## Quick start: plain HTML

```html
<!doctype html>
<html
    lang="en"
    data-theme="system"
>
    <head>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
        />
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@500;600;700;800&family=Red+Hat+Text:wght@400;500;600;700&display=swap"
        />
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bento-shad-ui@0.2.2/dist/bento.min.css"
        />
        <script
            src="https://cdn.jsdelivr.net/npm/bento-shad-ui@0.2.2/dist/bento.iife.min.js"
            defer
        ></script>
    </head>
    <body class="bk">
        <main class="bk-container">
            <div class="bk-bento">
                <div class="bk-bento-grid">
                    <article
                        class="bk-tile bk-span-2 bk-row-2"
                        data-tone="inverse"
                    >
                        <h1 class="bk-h1">Hello</h1>
                        <button
                            class="bk-button"
                            data-variant="brand"
                            data-bk-toast='{"title":"It works"}'
                        >
                            Try me
                        </button>
                    </article>
                    <article
                        class="bk-tile"
                        data-tone="peach"
                    >
                        One idea
                    </article>
                    <article class="bk-tile">Another idea</article>
                </div>
            </div>
        </main>
    </body>
</html>
```

## Quick start: React / Next.js

```bash
npm install bento-shad-ui
```

```tsx
import 'bento-shad-ui/bento.css';
import { BentoGrid, Tile, TileTitle, Button, toast } from 'bento-shad-ui/react';

export default function Page() {
    return (
        <BentoGrid>
            <Tile
                span={2}
                rows={2}
                tone="inverse"
            >
                <TileTitle>Hello</TileTitle>
                <Button
                    variant="brand"
                    onClick={() => toast({ title: 'It works' })}
                >
                    Try me
                </Button>
            </Tile>
            <Tile tone="peach">One idea</Tile>
            <Tile>Another idea</Tile>
        </BentoGrid>
    );
}
```

Add `className="bk"` to `<body>` (or wrap your app in an element with it) so base typography and colours apply.

## Core ideas

- **Tokens** are CSS variables with shadcn's names (`--background`, `--primary`, `--muted-foreground`…) plus bento extras (`--brand`, `--success`, `--inverse`, `--tint-peach`…). Components use nothing else, so changing a token restyles everything.
- **Tiles** are the unit of layout. A tile spans 1–4 columns and 1–3 rows. Grids follow their container's width (container queries), so the same markup works in a sidebar, a modal or a full page.
- **Tones** (`data-tone` / `tone`) colour a tile and adjust the tokens inside it, so buttons and inputs in a peach or inverse tile still look right.
- **Variants** are attributes in HTML (`data-variant="outline"`, `data-size="sm"`) and props in React (`variant="outline" size="sm"`).
- **Dark mode** is `class="dark"` or `data-theme="dark"` on `<html>`; `data-theme="system"` follows the OS.
- **No monospace font.** The library uses Red Hat Display for headings and Red Hat Text for everything else, including code and keyboard keys.

## Versioning

The library follows semantic versioning. Class names, data attributes, token names and React props are the public API. Until 1.0, minor versions (0.x.0) may include breaking changes and say so in `CHANGELOG.md`; patch versions never do. npm ranges like `^0.2.2` only accept patch releases while the version is below 1.0, so updates never surprise you. Pin exact versions in CDN URLs.

## Next

- [Installation](installation.md): every install method, fonts, updating
- [HTML](html.md), [React](react.md), [shadcn/ui](shadcn.md), [Flutter](flutter.md)
- [Theming](theming.md), [Layout](layout.md), [Components](components.md)
- [JavaScript API](javascript-api.md), [Accessibility](accessibility.md), [Using with AI agents](ai-agents.md)
