# Theming

## Tokens

All tokens are CSS custom properties on `:root`, redefined for dark mode. The names match shadcn/ui; the bento extras are marked ★.

### Colour

| Token | Used for |
|---|---|
| `--background` / `--foreground` | Page background and default text |
| `--card` / `--card-foreground` | Tiles and cards |
| `--popover` / `--popover-foreground` | Menus, popovers, dialogs, toasts |
| `--primary` / `--primary-foreground` | Default buttons, checked controls, active nav |
| `--secondary` / `--secondary-foreground` | Secondary buttons and badges |
| `--muted` / `--muted-foreground` | Subtle fills (tab list, skeleton) and secondary text |
| `--accent` / `--accent-foreground` | Hover fills for ghost/outline buttons and menu items |
| `--destructive` / `--destructive-foreground` ★ | Delete buttons and error states. The foreground token is an extra: white on light red fails contrast in dark mode, so dark mode uses dark text |
| `--border` | Tile and divider lines |
| `--input` | Form control borders, at least 3:1 against card and background |
| `--ring` | Focus ring, at least 3:1 against card and background |
| `--chart-1` … `--chart-5` | Data series |
| `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring` | Sidebar |
| `--brand` / `--brand-foreground` ★ | The one accent colour: brand buttons, highlights, rings |
| `--success`, `--warning`, `--info` ★ | Status text and soft badge/alert fills |
| `--inverse` / `--inverse-foreground` ★ | The contrast tile (dark in light mode, light in dark mode) |
| `--tint-peach`, `--tint-sky`, `--tint-mint`, `--tint-lilac`, `--tint-butter` (+ `-foreground`) ★ | Tile tones |

### Size, type, depth

| Token | Default |
|---|---|
| `--radius` | `1rem`; `--radius-sm/md/lg/xl/2xl` are 0.6×, 0.8×, 1×, 1.4×, 1.8× |
| `--radius-pill` | `999px` (buttons, badges, tabs) |
| `--tile-radius` ★ | `1.625rem` |
| `--tile-gap` ★ | `12px` |
| `--tile-pad` ★ | `20px` |
| `--font-sans` | Red Hat Text |
| `--font-heading` ★ | Red Hat Display |
| `--shadow-xs/sm/md/lg` | Shadows; tiles have none, overlays use `lg` |

There is deliberately no `--font-mono`. Code and keyboard keys use the sans font with tabular figures.

## Dark mode

| On `<html>` | Result |
|---|---|
| nothing, or `data-theme="light"` | Light |
| `class="dark"` or `data-theme="dark"` | Dark |
| `data-theme="system"` | Follows the OS, live |

`setTheme('light' | 'dark' | 'system')` (core or React) sets both `data-theme` and the `dark` class, saves the choice in `localStorage` under `bk-theme`, and fires `bk:theme`. To avoid a flash of the wrong theme, put the theme script in `<head>`: `<ThemeScript />` in React, or the `themeScript` string from the core elsewhere.

## Rebrand without forking

Override tokens in your own CSS, loaded after the kit:

```css
:root {
  --brand: oklch(0.62 0.19 255);         /* blue */
  --brand-foreground: oklch(0.99 0 0);
  --ring: oklch(0.52 0.19 255);
  --radius: 0.75rem;
  --tile-radius: 1.25rem;
}
.dark, [data-theme="dark"] {
  --brand: oklch(0.7 0.16 255);
  --brand-foreground: oklch(0.15 0 0);
}
@media (prefers-color-scheme: dark) {
  [data-theme="system"] { --brand: oklch(0.7 0.16 255); --brand-foreground: oklch(0.15 0 0); }
}
```

Keep text pairs at 4.5:1 or more and `--ring` / `--input` at 3:1 or more against `--card` and `--background`.

## Rebrand everywhere (fork)

To change the brand for CSS, shadcn and Flutter at once:

1. Fork the repo and edit `src/tokens.json` (hex values; the build converts them to OKLCH).
2. Run `npm run build`, then `npm test`. The tests fail if a light/dark pair falls below WCAG contrast.
3. Commit, tag (`v0.1.0-yourbrand.1`) and install your fork's tag.

## Scoped themes

- **Tones** (`data-tone="peach|sky|mint|lilac|butter|muted|inverse|brand"`) recolour a tile and re-point `--foreground`, `--muted-foreground`, `--border`, `--secondary`, `--accent` (and for `inverse`/`brand`, `--primary` and `--card`) inside it, so nested components stay readable.
- **Dark island**: `class="dark"` on any element switches its subtree to dark tokens, e.g. a dark hero on a light page.
- **Inverse surface** outside a tile: `class="bk-surface-inverse"`.

## Fonts

Change fonts by overriding the two variables:

```css
:root {
  --font-sans: "Your Text Face", ui-sans-serif, system-ui, sans-serif;
  --font-heading: "Your Display Face", ui-sans-serif, system-ui, sans-serif;
}
```

The defaults were chosen to avoid the faces most AI-generated UIs reach for (Inter, Geist, Plus Jakarta Sans, Space Grotesk, Poppins, DM Sans).
