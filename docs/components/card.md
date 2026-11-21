---
title: Card
description: shadcn/ui card anatomy (header, action, content, footer) for content outside a bento grid, such as forms and settings.
group: Layout
---

```html preview
<div class="bk-card" style="width: 340px">
  <div class="bk-card-header">
    <h3 class="bk-card-title">Lisbon, 4 nights</h3>
    <div class="bk-card-action"><span class="bk-badge" data-variant="success" data-dot>Booked</span></div>
    <p class="bk-card-description">12–16 March · 2 travellers</p>
  </div>
  <div class="bk-card-content"><p class="bk-muted" style="margin:0">Hotel Chiado, breakfast included, free cancellation until 10 March.</p></div>
  <div class="bk-card-footer"><span class="bk-large">€640</span><button class="bk-button" data-size="sm" type="button">View plan</button></div>
</div>
```

## Usage

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter, Badge, Button } from 'bento-shad-ui/react';

<Card>
  <CardHeader>
    <CardTitle>Lisbon, 4 nights</CardTitle>
    <CardAction><Badge variant="success" dot>Booked</Badge></CardAction>
    <CardDescription>12–16 March · 2 travellers</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter><span>€640</span><Button size="sm">View plan</Button></CardFooter>
</Card>
```

## When to use Card or Tile

- **Tile** is a cell of a bento grid: large radius, no shadow, sized by the grid.
- **Card** stands on its own: forms, settings sections, a detail panel next to a list. It has a light shadow and inner padding per section.

## API

Every part renders one element and accepts that element's attributes:

| Part | Element | Class |
|---|---|---|
| `Card` | `div` | `bk-card` |
| `CardHeader` | `div` | `bk-card-header` |
| `CardTitle` | `h3` | `bk-card-title` |
| `CardDescription` | `p` | `bk-card-description` |
| `CardAction` | `div` | `bk-card-action` (top right of the header) |
| `CardContent` | `div` | `bk-card-content` |
| `CardFooter` | `div` | `bk-card-footer` |

## Accessibility

- `CardTitle` is an `h3`. If the page outline needs another level, use a heading with the class instead: `<h2 className="bk-card-title">`.
