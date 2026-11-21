---
title: Button group
description: Buttons joined into one control, including the split-button pattern.
group: Actions
---

```html preview
<div class="bk-row" style="--gap: 16px">
  <div class="bk-button-group" role="group" aria-label="Range">
    <button class="bk-button" data-variant="outline" data-size="sm" type="button">Day</button>
    <button class="bk-button" data-variant="outline" data-size="sm" type="button">Week</button>
    <button class="bk-button" data-variant="outline" data-size="sm" type="button">Month</button>
  </div>
  <div class="bk-button-group">
    <button class="bk-button" data-size="sm" type="button">Save draft</button>
    <button class="bk-button" data-size="icon-sm" type="button" aria-label="More save options"><svg class="bk-icon" aria-hidden="true"><use href="#i-chevron-down"/></svg></button>
  </div>
</div>
```

## Usage

```tsx
import { ButtonGroup, Button } from 'bento-shad-ui/react';

<ButtonGroup aria-label="Range">
  <Button variant="outline" size="sm">Day</Button>
  <Button variant="outline" size="sm">Week</Button>
  <Button variant="outline" size="sm">Month</Button>
</ButtonGroup>
```

For a split button, put a `DropdownMenu` trigger in the second slot. For a choice that stays selected, use a [Toggle group](toggle.md) instead.

## API

`ButtonGroup` renders `<div role="group" class="bk-button-group">` and accepts all `div` attributes. Give it an `aria-label`.

## Accessibility

- `role="group"` plus `aria-label` tells screen readers the buttons belong together.
- Each button still needs its own visible text or `aria-label`.
