---
title: Badge
description: A small label for status, counts and categories. Eight variants and an optional dot.
group: Data display
---

```html preview
<div class="bk-row" style="--gap: 6px">
  <span class="bk-badge">Default</span>
  <span class="bk-badge" data-variant="brand">New</span>
  <span class="bk-badge" data-variant="secondary">Draft</span>
  <span class="bk-badge" data-variant="outline">3 nights</span>
  <span class="bk-badge" data-variant="success" data-dot>Paid</span>
  <span class="bk-badge" data-variant="warning" data-dot>Pending</span>
  <span class="bk-badge" data-variant="info">Info</span>
  <span class="bk-badge" data-variant="destructive">Overdue</span>
</div>
```

## Usage

```tsx
import { Badge } from 'bento-shad-ui/react';

<Badge variant="success" dot>Paid</Badge>
```

```html
<span class="bk-badge" data-variant="success" data-dot>Paid</span>
```

## API

<!-- props: BadgeProps -->

## Accessibility

- The text carries the meaning; colour only reinforces it. Write "Paid", not just a green dot.
- Success, warning and info text are tested at 4.5:1 or more on cards in both themes.
