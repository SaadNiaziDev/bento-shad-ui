---
title: Media
description: An aspect-ratio box for images and video, with an optional caption chip.
group: Layout
---

```html preview
<div class="bk-media" style="--ratio: 16 / 10; width: 340px; background: linear-gradient(var(--tint-sky), var(--card))">
  <span class="bk-media-caption">Alfama, Lisbon</span>
</div>
```

## Usage

```tsx
import { Media } from 'bento-shad-ui/react';

<Media ratio="4 / 3" caption="Alfama, Lisbon">
  <img src="/alfama.jpg" alt="Rooftops of Alfama at sunset" />
</Media>
```

```html
<div class="bk-media" style="--ratio: 4 / 3">
  <img src="/alfama.jpg" alt="Rooftops of Alfama at sunset">
  <span class="bk-media-caption">Alfama, Lisbon</span>
</div>
```

The image or video fills the box with `object-fit: cover`. Inside a tile, `TileMedia` (`.bk-tile-media`) makes it bleed to the tile's top edges.

## API

<!-- props: MediaProps -->

## Accessibility

- Write `alt` text that says what the image shows. Use `alt=""` for decorative images.
