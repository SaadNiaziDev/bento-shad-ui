---
title: Bottom nav
description: A mobile tab bar for three to five primary destinations.
group: Navigation
---

```html preview
<nav class="bk-bottom-nav" aria-label="Tabs" style="width: 340px">
  <a class="bk-bottom-nav-item" href="#" aria-current="page"><svg class="bk-icon" aria-hidden="true"><use href="#i-home"/></svg>Home</a>
  <a class="bk-bottom-nav-item" href="#"><svg class="bk-icon" aria-hidden="true"><use href="#i-search"/></svg>Explore</a>
  <a class="bk-bottom-nav-item" href="#"><svg class="bk-icon" aria-hidden="true"><use href="#i-plane"/></svg>Trips</a>
  <a class="bk-bottom-nav-item" href="#"><svg class="bk-icon" aria-hidden="true"><use href="#i-user"/></svg>Profile</a>
</nav>
```

## Usage

```tsx
import { BottomNav, BottomNavItem } from 'bento-shad-ui/react';

<BottomNav aria-label="Tabs">
  <BottomNavItem href="/" icon={<Home />} current>Home</BottomNavItem>
  <BottomNavItem href="/trips" icon={<Plane />}>Trips</BottomNavItem>
</BottomNav>
```

Fix it to the bottom of the screen in your layout, with `env(safe-area-inset-bottom)` padding for phones with a home indicator.

## API

<!-- props: BottomNavItemProps -->

## Accessibility

- Every item has a visible label, not just an icon.
- The current destination has `aria-current="page"`.
