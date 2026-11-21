# Using with shadcn/ui and Tailwind v4

If a project already uses shadcn/ui, keep its components and add the bento theme and grid. You get shadcn components in this colour system, the Red Hat fonts and the `BentoGrid` / `BentoTile` layout.

## Option A: registry (recommended)

```bash
npx shadcn@latest add https://raw.githubusercontent.com/SaadNiaziDev/bento-shad-ui/v0.2.1/r/bento-theme.json --overwrite
npx shadcn@latest add https://raw.githubusercontent.com/SaadNiaziDev/bento-shad-ui/v0.2.1/r/bento-grid.json
```

- `bento-theme` writes the tokens into your CSS file (`:root`, `.dark`, `@theme inline`): every shadcn colour, the radius, the Red Hat fonts, and new tokens such as `--color-brand` and `--color-tint-peach` so `bg-brand` or `text-tint-sky-foreground` work. **Use `--overwrite`.** Without it, shadcn keeps its own values for tokens that already exist (`--primary`, `--radius`, `--font-sans`) and only adds the new ones.
- `bento-grid` adds `components/ui/bento-grid.tsx`, the `bento-grid` and `bento-tile` utilities and the `class-variance-authority` dependency.

Both commands were tested on a fresh Next.js 15 + Tailwind v4 app, followed by a production build.

## Option B: theme file

Replace `app/globals.css` (or your Tailwind entry CSS) with `node_modules/bento-shad-ui/dist/shadcn-theme.css`, or copy its `@theme inline`, `:root`, `.dark`, `@layer base` and `@utility` blocks into your file. It needs `tailwindcss` v4 and `tw-animate-css` (both installed by `shadcn init`).

## Fonts

```tsx
// app/layout.tsx
import { Red_Hat_Display, Red_Hat_Text } from 'next/font/google';
const text = Red_Hat_Text({ subsets: ['latin'], variable: '--font-rh-text' });
const display = Red_Hat_Display({ subsets: ['latin'], variable: '--font-rh-display' });
// <html className={`${text.variable} ${display.variable}`}>
```

The theme sets `--font-sans` and `--font-heading` to the Red Hat family names, which works with a Google Fonts `<link>`. With `next/font`, point them at its variables instead:

```css
/* in globals.css, inside @theme inline: point the font tokens at next/font */
@theme inline {
  --font-sans: var(--font-rh-text), ui-sans-serif, system-ui, sans-serif;
  --font-heading: var(--font-rh-display), ui-sans-serif, system-ui, sans-serif;
}
```

Headings (`h1`–`h4`) use `--font-heading` through the base layer. Use `font-heading` on anything else.

## BentoGrid and BentoTile

```tsx
import { BentoGrid, BentoTile, BentoTileHeader, BentoTileTitle, BentoTileDescription } from '@/components/ui/bento-grid';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export function Features() {
  return (
    <BentoGrid>
      <BentoTile span={2} rows={2} className="dark bg-background text-foreground border-transparent">
        <BentoTileTitle className="text-2xl">Plan together</BentoTileTitle>
        <Button>Invite people</Button>
      </BentoTile>
      <BentoTile tone="peach">
        <BentoTileTitle>Offline maps</BentoTileTitle>
        <BentoTileDescription>Download a city before you fly.</BentoTileDescription>
      </BentoTile>
      <BentoTile tone="sky">
        <BentoTileHeader>
          <BentoTileTitle>Price alerts</BentoTileTitle>
          <Switch defaultChecked />
        </BentoTileHeader>
      </BentoTile>
      <BentoTile span={2}>…</BentoTile>
    </BentoGrid>
  );
}
```

| Prop | Values | Notes |
|---|---|---|
| `span` | `1` `2` `3` `4` `"full"` | Columns from the 2-column breakpoint (`@xl`) up |
| `rows` | `1` `2` `3` | Rows from `@xl` up |
| `tone` | `default` `muted` `peach` `sky` `mint` `lilac` `butter` `inverse` `brand` | Background + text colour |
| `interactive` | `true` | Lift on hover, for clickable tiles |

Breakpoints come from the grid's own width: 1 column, then 2 from `@xl` (36rem), then 4 from `@4xl` (56rem).

**Dark island.** The `inverse` and `brand` tones only change the tile's own colours. shadcn components inside keep the page's tokens. To make a tile, and every component in it, use dark tokens, add the `dark` class: `className="dark bg-background text-foreground"`. Because of `@custom-variant dark (&:is(.dark *))`, everything inside switches.

## Using `bento-shad-ui/react` as well

You can, but you rarely need to: shadcn already covers most components. Useful additions from the React package that shadcn lacks: `Stat`, `Sparkline`, `BarChart`, `Meter`, `Ring`, `Empty`, `BottomNav`, `ChoiceCard`, `InputOTP`. If you import them, also import `bento-shad-ui/bento.css`. The tokens are identical, so both sets match.
