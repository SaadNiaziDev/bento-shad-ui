---
title: Stack and Row
description: Small flex helpers for vertical and horizontal spacing inside tiles and cards.
group: Layout
---

```html preview
<div class="bk-stack" style="--gap: 10px; width: 280px">
  <div class="bk-row bk-between"><span class="bk-label">Total</span><span class="bk-large">€640</span></div>
  <div class="bk-row" style="--gap: 6px"><span class="bk-badge">Booked</span><span class="bk-badge" data-variant="outline">4 nights</span></div>
  <button class="bk-button" data-block type="button">View plan</button>
</div>
```

## Usage

```tsx
import { Stack, Row } from 'bento-shad-ui/react';

<Stack gap={10}>
  <Row between><span>Total</span><span>€640</span></Row>
  <Row gap={6}>…</Row>
</Stack>
```

## API

### Stack

<!-- props: StackProps -->

### Row

<!-- props: RowProps -->

### HTML

| Class | Effect |
|---|---|
| `bk-stack` | Column, gap `var(--gap, 12px)` |
| `bk-row` | Wrapping row, centred, gap `var(--gap, 8px)` |
| `bk-between` | Push children to both ends |
| `bk-grow` | Take the remaining space (`flex: 1`, `min-width: 0`) |
| `bk-container` | Centred page column, 1240px max (`--container`), safe-area padding |
| `bk-truncate` | One line with an ellipsis |
| `bk-sr-only` | Hidden visually, read by screen readers |
