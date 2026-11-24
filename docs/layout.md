# Layout: the bento grid

## Structure

```html
<div class="bk-bento">
    <!-- container: the grid measures this element's width -->
    <div class="bk-bento-grid">
        <!-- the grid -->
        <article class="bk-tile">…</article>
    </div>
</div>
```

React: `<BentoGrid>` renders both elements. shadcn: `<BentoGrid>` from `bento-grid.tsx`, or `<div class="@container"><div class="bento-grid">`.

## Columns

Columns follow the **container's** width (container queries), not the viewport. A grid inside a 400px sidebar behaves like a phone layout even on a desktop.

| Container width | Columns |
|---|---|
| more than 900px | 4 (or `data-cols="3"` / `"6"`) |
| 561–900px | 2 |
| 560px or less | 1. Grids with `data-cols="2"` keep 2 down to 300px, for app home screens |

When columns drop, spans reset so a tile never overflows: `span-3` and `span-4` become full width at 2 columns, and every span becomes 1 at 1 column.

## Spans

| HTML class | React prop | Effect |
|---|---|---|
| `bk-span-2`, `bk-span-3`, `bk-span-4` | `span={2|3|4}` | Columns |
| `bk-span-full` | `span="full"` | Full row at every width |
| `bk-row-2`, `bk-row-3` | `rows={2|3}` | Rows |

The grid uses `grid-auto-flow: dense`, so later small tiles fill gaps left by large ones.

## Tones

`data-tone` (`tone` prop): `muted`, `peach`, `sky`, `mint`, `lilac`, `butter`, `inverse`, `brand`. Each tone also adjusts the tokens inside the tile, so a `Button`, `Input` or `Badge` placed in it stays readable.

## Tile anatomy

```html
<article class="bk-tile">
    <header class="bk-tile-header">
        <div>
            <h3 class="bk-tile-title">Bookings</h3>
            <p class="bk-tile-description">This week · 330 total</p>
        </div>
        <span
            class="bk-badge"
            data-variant="secondary"
        >
            Week
        </span>
    </header>
    …content…
    <footer class="bk-tile-footer">…</footer>
    <!-- pinned to the bottom -->
</article>
```

Other tile options: `data-interactive` (lifts on hover, for links), `data-center` (centres content), `.bk-tile-media` (an image that bleeds to the tile's top edges), `.bk-eyebrow` (small uppercase label).

## Rules

1. **One idea per tile.** If a tile needs a second heading, split it.
2. **Size by importance.** The main thing gets 2×2; supporting facts get 1×1.
3. **Fill every row.** At 4 columns, choose spans that add up to 4 per row. Check at 2 columns too.
4. **Tint sparingly.** At most one toned tile in four, and one `inverse` tile per view.
5. **Same padding everywhere.** Change a tile's size, not its padding. Adjust `--tile-pad` for the whole grid if needed.
6. **Flat tiles, floating overlays.** Tiles have borders and no shadow; shadows belong to menus, dialogs and toasts.
7. **Content sets the height.** Don't give tiles fixed heights; use `rows` for tall tiles.

## Layout recipes

**Dashboard (4 columns, 3 rows).**
Sidebar `rows=3` · three stat tiles · chart `span=2` · activity `rows=2` · table `span=2`.

**Landing feature section (8 cells).**
Hero feature `span=2 rows=2 tone=inverse` · two 1×1 toned features · one `span=2` feature.

**Mobile home screen.**
`<BentoGrid cols={2}>` with `span=2` for the hero and progress tiles and 1×1 for small stats. Stays 2 columns on phones.

**Settings page.**
Not every page needs a bento grid. Use `Card` (header, content, footer) in a single column for forms longer than a few fields.

## Page container

`.bk-container` gives a centred column, 1240px max (set `--container` to change it), with safe-area-aware 16px side padding.
