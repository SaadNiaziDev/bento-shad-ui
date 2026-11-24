---
title: Breadcrumb
description: Shows where the current page sits in the hierarchy, with links back up.
group: Navigation
---

```html preview
<nav aria-label="Breadcrumb">
    <ol class="bk-breadcrumb">
        <li><a href="#">Trips</a></li>
        <li><a href="#">Lisbon</a></li>
        <li><span aria-current="page">Day 2</span></li>
    </ol>
</nav>
```

## Usage

```tsx
import { Breadcrumb } from 'bento-shad-ui/react';
import Link from 'next/link';

<Breadcrumb
    items={[
        { label: 'Trips', href: '/trips' },
        { label: 'Lisbon', href: '/trips/lisbon' },
        { label: 'Day 2' },
    ]}
    linkAs={Link}
/>;
```

## API

<!-- props: BreadcrumbProps -->

## Accessibility

- A `nav` labelled "Breadcrumb" holding an ordered list; the last item has `aria-current="page"`.
- The separators are drawn by CSS, so screen readers don't read them.
