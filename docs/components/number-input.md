---
title: Number input
description: A native number field with − and + buttons, for quantities, guests and other small counts.
group: Forms
---

```html preview
<div
    class="bk-field"
    style="width: 180px"
>
    <label
        class="bk-label"
        for="ni-guests"
    >
        Guests
    </label>
    <div class="bk-number">
        <button
            class="bk-number-step"
            data-direction="down"
            tabindex="-1"
            aria-label="Fewer guests"
        ></button>
        <input
            class="bk-number-input"
            type="number"
            id="ni-guests"
            name="guests"
            value="2"
            min="1"
            max="8"
        />
        <button
            class="bk-number-step"
            data-direction="up"
            tabindex="-1"
            aria-label="More guests"
        ></button>
    </div>
</div>
```

The field is a native `<input type="number">`, so ↑ and ↓ step it, `min`, `max` and `step` work, and the form receives the number. The buttons stop at the limits, and a typed value outside them is pulled back when you leave the field.

## Usage

```tsx
import { Field, NumberInput } from 'bento-shad-ui/react';

const [guests, setGuests] = useState<number | null>(2);

<Field label="Guests">
    <NumberInput
        value={guests}
        onValueChange={setGuests}
        min={1}
        max={8}
    />
</Field>;
```

`onValueChange` gets `null` when the field is emptied, so you can tell "no value" from 0.

### HTML

```html
<div class="bk-number">
    <button
        class="bk-number-step"
        data-direction="down"
        tabindex="-1"
        aria-label="Decrease"
    ></button>
    <input
        class="bk-number-input"
        type="number"
        name="quantity"
        value="1"
        min="0"
    />
    <button
        class="bk-number-step"
        data-direction="up"
        tabindex="-1"
        aria-label="Increase"
    ></button>
</div>
```

The buttons fire `input` and `change` on the field, like typing does.

## Examples

### Decimal steps

```html preview
<div
    class="bk-field"
    style="width: 200px"
>
    <label
        class="bk-label"
        for="ni-weight"
    >
        Luggage weight (kg)
    </label>
    <div class="bk-number">
        <button
            class="bk-number-step"
            data-direction="down"
            tabindex="-1"
            aria-label="Decrease weight"
        ></button>
        <input
            class="bk-number-input"
            type="number"
            id="ni-weight"
            value="18.5"
            min="0"
            max="32"
            step="0.5"
        />
        <button
            class="bk-number-step"
            data-direction="up"
            tabindex="-1"
            aria-label="Increase weight"
        ></button>
    </div>
</div>
```

Put the unit in the label rather than inside the field, so it is read with the value.

## API

<!-- props: NumberInputProps -->

## Accessibility

- The field keeps its native role (spinbutton), so screen readers announce the value and its limits.
- The − and + buttons are left out of the Tab order because ↑ and ↓ do the same from the field. They need an accessible name, and are disabled at the limits.
- The browser also changes a focused number field when it's scrolled with a mouse wheel or trackpad. Use a plain text field with `inputmode="numeric"` for values that aren't quantities, such as card or phone numbers.
