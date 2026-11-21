---
title: Bento grid
description: The layout at the heart of the library. Tiles span columns and rows; the grid follows its container's width, not the viewport.
group: Layout
---

```html preview full
<div class="bk-bento">
  <div class="bk-bento-grid">
    <article class="bk-tile bk-span-2 bk-row-2" data-tone="inverse">
      <span class="bk-eyebrow">Next trip</span>
      <h3 class="bk-h3">Lisbon in 12 days</h3>
      <p class="bk-muted" style="margin:0">4 nights · 2 travellers · Chiado</p>
    </article>
    <article class="bk-tile" data-tone="peach"><span class="bk-eyebrow">Budget</span><span class="bk-num">€640</span></article>
    <article class="bk-tile"><span class="bk-eyebrow">Weather</span><span class="bk-num">18°</span></article>
    <article class="bk-tile bk-span-2" data-tone="sky"><span class="bk-eyebrow">Packing list</span><div class="bk-progress" role="progressbar" aria-label="Packing list" aria-valuenow="68" aria-valuemin="0" aria-valuemax="100"><span style="--v: 68%"></span></div></article>
  </div>
</div>
```

## Usage

```tsx
import { BentoGrid, Tile, TileHeader, TileTitle, TileDescription, TileFooter, Eyebrow } from 'bento-shad-ui/react';

<BentoGrid>
  <Tile span={2} rows={2} tone="inverse">
    <Eyebrow>Next trip</Eyebrow>
    <TileTitle>Lisbon in 12 days</TileTitle>
  </Tile>
  <Tile tone="peach">…</Tile>
  <Tile>…</Tile>
  <Tile span={2}>…</Tile>
</BentoGrid>
```

```html
<div class="bk-bento">
  <div class="bk-bento-grid">
    <article class="bk-tile bk-span-2 bk-row-2" data-tone="inverse">…</article>
    <article class="bk-tile" data-tone="peach">…</article>
  </div>
</div>
```

The outer `.bk-bento` is the box the grid measures (a container query container). `BentoGrid` renders both elements for you.

## Examples

### Tile anatomy

```html preview full
<div class="bk-bento"><div class="bk-bento-grid" data-cols="2">
  <article class="bk-tile">
    <header class="bk-tile-header">
      <div><h3 class="bk-tile-title">Bookings</h3><p class="bk-tile-description">This week · 330 total</p></div>
      <span class="bk-badge" data-variant="secondary">Week</span>
    </header>
    <p class="bk-muted" style="margin:0">Content goes here.</p>
    <footer class="bk-tile-footer"><span class="bk-muted">Updated 2m ago</span><button class="bk-button" data-size="xs" type="button">Open</button></footer>
  </article>
  <a class="bk-tile" data-interactive data-tone="mint" href="#tile-anatomy"><h3 class="bk-tile-title">Clickable tile</h3><p class="bk-tile-description" style="margin:0">data-interactive lifts it on hover.</p></a>
</div></div>
```

### Tones

```html preview full
<div class="bk-bento"><div class="bk-bento-grid">
  <div class="bk-tile" data-tone="muted">muted</div>
  <div class="bk-tile" data-tone="peach">peach</div>
  <div class="bk-tile" data-tone="sky">sky</div>
  <div class="bk-tile" data-tone="mint">mint</div>
  <div class="bk-tile" data-tone="lilac">lilac</div>
  <div class="bk-tile" data-tone="butter">butter</div>
  <div class="bk-tile" data-tone="inverse">inverse</div>
  <div class="bk-tile" data-tone="brand">brand</div>
</div></div>
```

Components placed inside a toned tile pick up matching colours, so buttons, inputs and badges stay readable.

## API

### BentoGrid

<!-- props: BentoGridProps -->

### Tile

<!-- props: TileProps -->

Parts: `TileHeader`, `TileTitle` (h3), `TileDescription`, `TileFooter` (pinned to the bottom), `TileMedia` (bleeds to the top edge), `Eyebrow`. Each renders one element with its class and accepts that element's attributes.

### HTML

| Class or attribute | Effect |
|---|---|
| `bk-bento` | Container the grid measures |
| `bk-bento-grid` | The grid. `data-cols="2"`, `"3"`, `"6"` change the full-width column count |
| `bk-tile` | A tile |
| `bk-span-2`, `bk-span-3`, `bk-span-4`, `bk-span-full` | Column span |
| `bk-row-2`, `bk-row-3` | Row span |
| `data-tone` | `muted` `peach` `sky` `mint` `lilac` `butter` `inverse` `brand` |
| `data-interactive`, `data-center` | Hover lift; centred content |

Columns: 4 above 900px of container width, 2 down to 560px, 1 below. `data-cols="2"` keeps 2 columns down to 300px. See [Layout](../layout.md) for the rules.

## Accessibility

- Tiles are layout only. Use real headings inside (`TileTitle` is an `h3`) so screen-reader users can jump between them.
- Visual order follows source order except where dense packing fills gaps. Keep the reading order sensible in the markup.
- A clickable tile should be one link (`asChild` with an `<a>`), not a `div` with a click handler.
