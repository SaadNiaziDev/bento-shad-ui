<div align="center">

<img src="https://raw.githubusercontent.com/SaadNiaziDev/bento-shad-ui/main/site/assets/favicon.svg" width="40" height="40" alt="">

# bento-shad-ui

**Bento layouts. Familiar components. Your own product.**

A UI library for React and plain HTML, with shadcn-style tokens,<br>
light and dark themes, and an orange accent you can make your own.

[![npm](https://img.shields.io/npm/v/bento-shad-ui?color=d9531c)](https://www.npmjs.com/package/bento-shad-ui)
[![CI](https://github.com/SaadNiaziDev/bento-shad-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/SaadNiaziDev/bento-shad-ui/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/npm/l/bento-shad-ui)](https://github.com/SaadNiaziDev/bento-shad-ui/blob/main/LICENSE)

[**Documentation →**](https://saadniazidev.github.io/bento-shad-ui/) · [Components](https://saadniazidev.github.io/bento-shad-ui/docs/components/) · [Examples](https://saadniazidev.github.io/bento-shad-ui/docs/examples/)

</div>

## Built to compose

- **Responsive layouts:** container-aware bento grids, cards, metrics and tables.
- **Everyday controls:** forms, tabs, menus, dialogs, toasts and command palettes.
- **Consistent themes:** semantic tokens, tested text contrast and reduced-motion support.
- **Small setup:** plain CSS, an SSR-safe vanilla core and typed React components. React is optional; Tailwind is not required.
- **Room for character:** eight original pencil illustrations, each with six moods.

One token source also generates a [shadcn/ui + Tailwind v4 theme](https://saadniazidev.github.io/bento-shad-ui/docs/shadcn/) and a [Flutter theme](https://saadniazidev.github.io/bento-shad-ui/docs/flutter/).

## Get started

```bash
npm install bento-shad-ui
```

```tsx
import 'bento-shad-ui/bento.css';
import { BentoGrid, Tile, Stat } from 'bento-shad-ui/react';

export function Overview() {
    return (
        <BentoGrid>
            <Tile span={2}>
                <Stat label="Monthly revenue" value="$24,680" />
            </Tile>
            <Tile>
                <Stat label="Active projects" value="12" />
            </Tile>
        </BentoGrid>
    );
}
```

Load Red Hat Display and Red Hat Text, or set your own font tokens. Follow the [React / Next.js guide](https://saadniazidev.github.io/bento-shad-ui/docs/react/) or [HTML / CDN guide](https://saadniazidev.github.io/bento-shad-ui/docs/html/) for complete setup.

## Learn from working examples

Component pages include live previews, readable HTML, React usage and API details. Try [cards](https://saadniazidev.github.io/bento-shad-ui/docs/components/card/), [form validation](https://saadniazidev.github.io/bento-shad-ui/docs/components/field/) and [toast actions](https://saadniazidev.github.io/bento-shad-ui/docs/components/toast/). Examples use local data; connect your own backend.

[Theming](https://saadniazidev.github.io/bento-shad-ui/docs/theming/) · [Accessibility](https://saadniazidev.github.io/bento-shad-ui/docs/accessibility/) · [Illustrations](https://saadniazidev.github.io/bento-shad-ui/docs/components/characters/)

## Agent-readable, human-first

The package ships `llms.txt` and `llms-full.txt`; docs pages also have Markdown versions. Ask your coding agent to read `node_modules/bento-shad-ui/llms-full.txt` before building. [Agent guide →](https://saadniazidev.github.io/bento-shad-ui/docs/ai-agents/)

Targets modern browsers. Application labels, validation, focus flows and keyboard behavior still need testing in your product.

## Contribute

Run `npm install`, `npm run check`, then `npm run docs:serve` for the local documentation. See [CONTRIBUTING.md](https://github.com/SaadNiaziDev/bento-shad-ui/blob/main/CONTRIBUTING.md) and the [changelog](https://github.com/SaadNiaziDev/bento-shad-ui/blob/main/CHANGELOG.md).

MIT © Saad Ali Khan. Original illustrations: MIT. Red Hat fonts: SIL OFL 1.1.
