---
title: Tooltip
description: A short text label shown on hover and keyboard focus. Pure CSS, no script needed.
group: Actions
---

```html preview
<div class="bk-row">
  <button class="bk-button" data-variant="outline" data-size="icon" type="button" aria-label="Copy link" data-bk-tooltip="Copy link"><svg class="bk-icon" aria-hidden="true"><use href="#i-link"/></svg></button>
  <button class="bk-button" data-variant="outline" data-size="icon" type="button" aria-label="Add to favourites" data-bk-tooltip="Add to favourites"><svg class="bk-icon" aria-hidden="true"><use href="#i-heart"/></svg></button>
  <button class="bk-button" data-variant="outline" data-size="icon" type="button" aria-label="Delete" data-bk-tooltip="Delete" data-bk-tooltip-side="bottom"><svg class="bk-icon" aria-hidden="true"><use href="#i-trash"/></svg></button>
</div>
```

## Usage

```tsx
import { Tooltip, Button } from 'bento-shad-ui/react';

<Tooltip content="Copy link">
  <Button variant="outline" size="icon" aria-label="Copy link"><Link2 /></Button>
</Tooltip>
```

```html
<button class="bk-button" aria-label="Copy link" data-bk-tooltip="Copy link" data-bk-tooltip-side="bottom">…</button>
```

## API

<!-- props: TooltipProps -->

## Accessibility

- The tooltip is drawn by CSS from the attribute, so screen readers don't read it. Always give the element an accessible name (`aria-label` or visible text).
- It appears on keyboard focus (`:focus-visible`) as well as hover.
- Plain text only. For links or buttons inside a floating panel, use a [Popover](popover.md).
