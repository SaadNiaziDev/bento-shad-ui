---
title: Navbar
description: A floating pill navigation bar with brand, links and actions. Links scroll sideways on narrow screens.
group: Navigation
---

```html preview full
<nav
    class="bk-navbar"
    aria-label="Main"
>
    <a
        class="bk-navbar-brand"
        href="#"
    >
        Tripline
    </a>
    <div class="bk-navbar-links">
        <a
            class="bk-navbar-link"
            href="#"
            aria-current="page"
        >
            Trips
        </a>
        <a
            class="bk-navbar-link"
            href="#"
        >
            Explore
        </a>
        <a
            class="bk-navbar-link"
            href="#"
        >
            Saved
        </a>
    </div>
    <div class="bk-navbar-actions">
        <button
            class="bk-button"
            data-variant="ghost"
            data-size="icon-sm"
            type="button"
            aria-label="Notifications"
        >
            <svg
                class="bk-icon"
                aria-hidden="true"
            >
                <use href="#i-bell" />
            </svg>
        </button>
        <button
            class="bk-button"
            data-size="sm"
            type="button"
        >
            <svg
                class="bk-icon"
                aria-hidden="true"
            >
                <use href="#i-plus" />
            </svg>
            New trip
        </button>
    </div>
</nav>
```

## Usage

```tsx
import {
    Navbar,
    NavbarBrand,
    NavbarLinks,
    NavbarLink,
    NavbarActions,
    Button,
} from 'bento-shad-ui/react';
import Link from 'next/link';

<Navbar aria-label="Main">
    <NavbarBrand asChild>
        <Link href="/">Tripline</Link>
    </NavbarBrand>
    <NavbarLinks>
        <NavbarLink
            asChild
            current={pathname === '/trips'}
        >
            <Link href="/trips">Trips</Link>
        </NavbarLink>
        <NavbarLink
            asChild
            current={pathname === '/explore'}
        >
            <Link href="/explore">Explore</Link>
        </NavbarLink>
    </NavbarLinks>
    <NavbarActions>
        <Button size="sm">New trip</Button>
    </NavbarActions>
</Navbar>;
```

## API

### NavbarLink and NavbarBrand

<!-- props: LinkLikeProps -->

`Navbar`, `NavbarLinks` and `NavbarActions` render a `nav` and two `div`s.

## Accessibility

- Give the `nav` an `aria-label`, and mark the current page with `current` (`aria-current="page"`).
- On phones, consider moving primary destinations to a [Bottom nav](bottom-nav.md).
