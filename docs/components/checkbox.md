---
title: Checkbox
description: Native checkbox with checked, unchecked and indeterminate states, with optional label and description.
group: Forms
---

```html preview
<div
    class="bk-stack"
    style="width: 300px"
>
    <label class="bk-option">
        <input
            class="bk-checkbox"
            type="checkbox"
            data-indeterminate
        />
        <span class="bk-option-text"><span>All extras</span></span>
    </label>
    <label class="bk-option">
        <input
            class="bk-checkbox"
            type="checkbox"
            checked
        />
        <span class="bk-option-text">
            <span>Window seat</span>
            <span>Free on flights over 2 hours</span>
        </span>
    </label>
    <label class="bk-option">
        <input
            class="bk-checkbox"
            type="checkbox"
        />
        <span class="bk-option-text">
            <span>Extra checked bag</span>
            <span>€35 each way</span>
        </span>
    </label>
</div>
```

## Usage

```tsx
import { Checkbox } from 'bento-shad-ui/react';

<Checkbox
    label="Window seat"
    description="Free on flights over 2 hours"
    defaultChecked
/>
<Checkbox
    label="All extras"
    indeterminate={some && !all}
    checked={all}
    onCheckedChange={setAll}
/>
<Checkbox aria-label="Select row" />
```

With `label`, the checkbox is wrapped in a clickable `<label class="bk-option">` row. Without it, you get the bare input.

## API

<!-- props: CheckboxProps -->

### HTML

| Class or attribute | Use |
|---|---|
| `bk-checkbox` | The input |
| `bk-option` / `bk-option-text` | Label row; first span is the label, second the description |
| `data-indeterminate` | The script sets `indeterminate` on load |

## Accessibility

- Space toggles. The whole label row is clickable.
- `indeterminate` is announced as "mixed".
