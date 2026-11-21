---
title: Toggle
description: A button that stays pressed. Toggle groups make segmented controls with one or many choices.
group: Actions
---

```html preview
<div class="bk-row" style="--gap: 16px">
  <div class="bk-row" style="--gap: 4px">
    <button class="bk-toggle" data-variant="outline" type="button" aria-pressed="true" aria-label="Bold"><svg class="bk-icon" aria-hidden="true"><use href="#i-bold"/></svg></button>
    <button class="bk-toggle" data-variant="outline" type="button" aria-pressed="false" aria-label="Italic"><svg class="bk-icon" aria-hidden="true"><use href="#i-italic"/></svg></button>
    <button class="bk-toggle" data-variant="outline" type="button" aria-pressed="false" aria-label="Underline"><svg class="bk-icon" aria-hidden="true"><use href="#i-underline"/></svg></button>
  </div>
  <div class="bk-toggle-group" data-type="single" role="group" aria-label="Alignment">
    <button class="bk-toggle" type="button" aria-pressed="true" aria-label="Align left"><svg class="bk-icon" aria-hidden="true"><use href="#i-align-left"/></svg></button>
    <button class="bk-toggle" type="button" aria-pressed="false" aria-label="Align center"><svg class="bk-icon" aria-hidden="true"><use href="#i-align-center"/></svg></button>
    <button class="bk-toggle" type="button" aria-pressed="false" aria-label="Align right"><svg class="bk-icon" aria-hidden="true"><use href="#i-align-right"/></svg></button>
  </div>
</div>
```

## Usage

```tsx
import { Toggle, ToggleGroup } from 'bento-shad-ui/react';

<Toggle variant="outline" aria-label="Bold" pressed={bold} onPressedChange={setBold}><Bold /></Toggle>

<ToggleGroup type="single" defaultValue="left" aria-label="Alignment">
  <Toggle value="left" aria-label="Align left"><AlignLeft /></Toggle>
  <Toggle value="center" aria-label="Align center"><AlignCenter /></Toggle>
</ToggleGroup>

<ToggleGroup type="multiple" value={styles} onValueChange={setStyles} aria-label="Text style">…</ToggleGroup>
```

In HTML, the script flips `aria-pressed` on click. `data-type="single"` keeps exactly one pressed.

## API

### Toggle

<!-- props: ToggleProps -->

### ToggleGroup

<!-- props: ToggleGroupProps -->

## Accessibility

- State is exposed with `aria-pressed`, which screen readers announce as "pressed" or "not pressed".
- Icon-only toggles need `aria-label`; the group needs `aria-label` too.
