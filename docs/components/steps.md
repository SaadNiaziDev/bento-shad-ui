---
title: Steps
description: Shows progress through a fixed sequence such as checkout or onboarding, in a row or a column.
group: Navigation
---

```html preview full
<ol class="bk-steps">
    <li
        class="bk-step"
        data-status="complete"
    >
        <span
            class="bk-step-marker"
            aria-hidden="true"
        ></span>
        <span class="bk-step-text">
            <span class="bk-step-title">
                <span class="bk-sr-only">Completed:</span>
                Trip details
            </span>
            <span class="bk-step-description">Lisbon, 12–16 March</span>
        </span>
    </li>
    <li
        class="bk-step"
        data-status="current"
        aria-current="step"
    >
        <span
            class="bk-step-marker"
            aria-hidden="true"
        ></span>
        <span class="bk-step-text">
            <span class="bk-step-title">Travellers</span>
            <span class="bk-step-description">Names as on passports</span>
        </span>
    </li>
    <li
        class="bk-step"
        data-status="upcoming"
    >
        <span
            class="bk-step-marker"
            aria-hidden="true"
        ></span>
        <span class="bk-step-text">
            <span class="bk-step-title">Payment</span>
        </span>
    </li>
</ol>
```

Steps show where someone is; they don't move them. Put Back and Continue buttons below.

## Usage

```tsx
import { Steps } from 'bento-shad-ui/react';

<Steps
    current={1}
    steps={[
        { title: 'Trip details', description: 'Lisbon, 12–16 March' },
        { title: 'Travellers', description: 'Names as on passports' },
        { title: 'Payment' },
    ]}
/>;
```

`current` counts from 0. Steps before it show a check mark, and `current={steps.length}` marks them all done.

### HTML

Set `data-status` to `complete`, `current` or `upcoming` on each `.bk-step`, and `aria-current="step"` on the current one. The numbers come from a CSS counter.

## Examples

### Vertical

Use `data-orientation="vertical"` (`orientation="vertical"` in React) in narrow spaces or when steps have longer descriptions.

```html preview
<ol
    class="bk-steps"
    data-orientation="vertical"
    style="max-width: 320px"
>
    <li
        class="bk-step"
        data-status="complete"
    >
        <span
            class="bk-step-marker"
            aria-hidden="true"
        ></span>
        <span class="bk-step-text">
            <span class="bk-step-title">
                <span class="bk-sr-only">Completed:</span>
                Create workspace
            </span>
            <span class="bk-step-description">Name it and pick a region.</span>
        </span>
    </li>
    <li
        class="bk-step"
        data-status="current"
        aria-current="step"
    >
        <span
            class="bk-step-marker"
            aria-hidden="true"
        ></span>
        <span class="bk-step-text">
            <span class="bk-step-title">Invite your team</span>
            <span class="bk-step-description">
                Add people by email. You can skip this.
            </span>
        </span>
    </li>
    <li
        class="bk-step"
        data-status="upcoming"
    >
        <span
            class="bk-step-marker"
            aria-hidden="true"
        ></span>
        <span class="bk-step-text">
            <span class="bk-step-title">Connect a calendar</span>
        </span>
    </li>
</ol>
```

## API

<!-- props: StepsProps -->

## Accessibility

- The list is an `<ol>`, so screen readers announce the number of steps and each position.
- The current step has `aria-current="step"`. Finished steps start with visually hidden "Completed:" text, because the check mark is decorative.
- Upcoming steps are not just greyed: they keep their number, and the current step is marked with a ring as well as colour.
