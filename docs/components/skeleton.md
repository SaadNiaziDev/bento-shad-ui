---
title: Skeleton
description: A pulsing placeholder that holds the layout while content loads.
group: Feedback
---

```html preview
<div
    class="bk-stack"
    style="width: 300px"
    aria-busy="true"
    aria-label="Loading booking"
>
    <div
        class="bk-row"
        style="flex-wrap: nowrap; --gap: 10px"
    >
        <span
            class="bk-skeleton"
            style="width: 40px; height: 40px; border-radius: 50%"
        ></span>
        <div
            class="bk-stack bk-grow"
            style="--gap: 6px"
        >
            <span
                class="bk-skeleton"
                style="height: 12px; width: 70%"
            ></span>
            <span
                class="bk-skeleton"
                style="height: 12px; width: 45%"
            ></span>
        </div>
    </div>
    <span
        class="bk-skeleton"
        style="height: 72px; border-radius: var(--radius-xl)"
    ></span>
</div>
```

## Usage

```tsx
import { Skeleton } from 'bento-shad-ui/react';

<div
    aria-busy="true"
    aria-label="Loading booking"
>
    <Skeleton
        width={40}
        height={40}
        circle
    />
    <Skeleton width="70%" />
    <Skeleton height={72} />
</div>;
```

## API

<!-- props: SkeletonProps -->

## Accessibility

- Skeletons are `aria-hidden`. Put `aria-busy="true"` and a label on the region that's loading.
- Shape skeletons like the real content, so the page doesn't jump when it arrives.
- The pulse stops when the user prefers reduced motion.
