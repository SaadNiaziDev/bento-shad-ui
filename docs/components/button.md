---
title: Button
description: Triggers an action. Seven variants, seven sizes, icon, loading and disabled states, and asChild for links.
group: Actions
---

```html preview
<div class="bk-row">
    <button
        class="bk-button"
        type="button"
    >
        Book trip
    </button>
    <button
        class="bk-button"
        data-variant="brand"
        type="button"
    >
        Upgrade
    </button>
    <button
        class="bk-button"
        data-variant="outline"
        type="button"
    >
        <svg
            class="bk-icon"
            aria-hidden="true"
        >
            <use href="#i-plus" />
        </svg>
        Add trip
    </button>
</div>
```

## Usage

```tsx
import { Button } from 'bento-shad-ui/react';
import Link from 'next/link';

<Button onClick={book}>Book trip</Button>
<Button variant="outline" size="sm">
    <Plus />
    Add trip
</Button>
<Button asChild variant="link">
    <Link href="/terms">View terms</Link>
</Button>
```

```html
<button
    class="bk-button"
    type="button"
>
    Book trip
</button>
<button
    class="bk-button"
    data-variant="outline"
    data-size="sm"
>
    …
</button>
<a
    class="bk-button"
    data-variant="link"
    href="/terms"
>
    View terms
</a>
```

## Examples

### Variants

```html preview
<div class="bk-row">
    <button
        class="bk-button"
        type="button"
    >
        Default
    </button>
    <button
        class="bk-button"
        data-variant="brand"
        type="button"
    >
        Brand
    </button>
    <button
        class="bk-button"
        data-variant="secondary"
        type="button"
    >
        Secondary
    </button>
    <button
        class="bk-button"
        data-variant="outline"
        type="button"
    >
        Outline
    </button>
    <button
        class="bk-button"
        data-variant="ghost"
        type="button"
    >
        Ghost
    </button>
    <button
        class="bk-button"
        data-variant="destructive"
        type="button"
    >
        Delete
    </button>
    <button
        class="bk-button"
        data-variant="link"
        type="button"
    >
        Link
    </button>
</div>
```

### Sizes

```html preview
<div class="bk-row">
    <button
        class="bk-button"
        data-size="xs"
        type="button"
    >
        Extra small
    </button>
    <button
        class="bk-button"
        data-size="sm"
        type="button"
    >
        Small
    </button>
    <button
        class="bk-button"
        type="button"
    >
        Default
    </button>
    <button
        class="bk-button"
        data-size="lg"
        type="button"
    >
        Large
    </button>
    <button
        class="bk-button"
        data-variant="outline"
        data-size="icon-sm"
        type="button"
        aria-label="Edit"
    >
        <svg
            class="bk-icon"
            aria-hidden="true"
        >
            <use href="#i-pencil" />
        </svg>
    </button>
    <button
        class="bk-button"
        data-variant="outline"
        data-size="icon"
        type="button"
        aria-label="Download"
    >
        <svg
            class="bk-icon"
            aria-hidden="true"
        >
            <use href="#i-download" />
        </svg>
    </button>
    <button
        class="bk-button"
        data-size="icon-lg"
        type="button"
        aria-label="Add"
    >
        <svg
            class="bk-icon"
            data-size="lg"
            aria-hidden="true"
        >
            <use href="#i-plus" />
        </svg>
    </button>
</div>
```

### Loading and disabled

```html preview
<div class="bk-row">
    <button
        class="bk-button"
        data-loading
        disabled
        aria-busy="true"
        type="button"
    >
        <span
            class="bk-spinner"
            data-size="sm"
            aria-hidden="true"
        ></span>
        Saving
    </button>
    <button
        class="bk-button"
        data-variant="outline"
        disabled
        type="button"
    >
        Disabled
    </button>
</div>
```

```tsx
<Button loading>Saving</Button>;
```

### Full width

```html preview full
<button
    class="bk-button"
    data-block
    data-size="lg"
    type="button"
>
    Create account
</button>
```

## API

<!-- props: ButtonProps -->

### HTML

| Attribute | Values |
|---|---|
| `data-variant` | `brand` `secondary` `outline` `ghost` `destructive` `link` (omit for default) |
| `data-size` | `xs` `sm` `lg` `icon` `icon-sm` `icon-lg` (omit for default) |
| `data-loading` | Dims the button and blocks clicks. Add a `.bk-spinner` and `disabled` |
| `data-block` | Full width |

## Accessibility

- Icon-only buttons need `aria-label`. A tooltip doesn't count as a name.
- `loading` sets `disabled` and `aria-busy`. Keep the label (for example "Saving") so the state is announced.
- Use `asChild` with a link for navigation. Buttons perform actions; links go places.
- The default `type` is `button`, so a button inside a form doesn't submit it by accident. Set `type="submit"` when it should.
