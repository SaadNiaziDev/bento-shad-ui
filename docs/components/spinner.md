---
title: Spinner
description: A small loading indicator that takes the current text colour.
group: Feedback
---

```html preview
<div
    class="bk-row"
    style="--gap: 20px"
>
    <span
        class="bk-spinner"
        data-size="sm"
        role="status"
        aria-label="Loading"
    ></span>
    <span
        class="bk-spinner"
        role="status"
        aria-label="Loading"
    ></span>
    <span
        class="bk-spinner"
        data-size="lg"
        role="status"
        aria-label="Loading"
        style="color: var(--brand)"
    ></span>
    <span class="bk-row bk-muted">
        <span
            class="bk-spinner"
            data-size="sm"
            aria-hidden="true"
        ></span>
        Checking availability
    </span>
</div>
```

## Usage

```tsx
import { Spinner } from 'bento-shad-ui/react';

<Spinner />
<Spinner size="lg" label="Loading trips" />
<span>
    <Spinner size="sm" label="" /> Checking availability
</span>
```

Inside a button, use `<Button loading>` instead.

## API

<!-- props: SpinnerProps -->

## Accessibility

- With a `label`, the spinner is a `status` that screen readers announce. Next to visible text, pass `label=""` to hide it from them.
