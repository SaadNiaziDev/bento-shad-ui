---
title: Input
description: Single-line text input. Supports every native type, with focus, invalid and disabled states.
group: Forms
---

```html preview
<div
    class="bk-stack"
    style="width: 300px"
>
    <input
        class="bk-input"
        type="email"
        placeholder="you@example.com"
        aria-label="Email"
    />
    <input
        class="bk-input"
        value="SUMMER"
        aria-invalid="true"
        aria-label="Promo code"
    />
    <input
        class="bk-input"
        value="Read only, disabled"
        disabled
        aria-label="Disabled example"
    />
</div>
```

## Usage

```tsx
import { Input, Field } from 'bento-shad-ui/react';

<Field label="Email">
    <Input type="email" name="email" />
</Field>
<Input invalid aria-label="Promo code" />
```

```html
<input
    class="bk-input"
    type="email"
    aria-label="Email"
/>
```

## API

<!-- props: InputProps -->

The input is 40px tall with a 3px focus ring in `--ring`. Its border uses `--input`, which is tested to reach 3:1 contrast against the card and the page.

## Accessibility

- Pair it with a label: `Field`, `<label for>`, or `aria-label`.
- Use the right `type` and `autocomplete` (`email`, `tel`, `one-time-code`…) so phones show the right keyboard and autofill works.
- Use `aria-invalid` (or `invalid`) together with a visible error message, never colour alone.
