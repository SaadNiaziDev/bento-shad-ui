---
title: Sidebar
description: App navigation with a brand, grouped items, counts and a footer.
group: Navigation
---

```html preview
<nav
    class="bk-sidebar"
    aria-label="App"
    style="width: 240px"
>
    <div class="bk-sidebar-brand">Tripline</div>
    <a
        class="bk-sidebar-item"
        href="#"
        aria-current="page"
    >
        <svg
            class="bk-icon"
            aria-hidden="true"
        >
            <use href="#i-home" />
        </svg>
        Home
    </a>
    <a
        class="bk-sidebar-item"
        href="#"
    >
        <svg
            class="bk-icon"
            aria-hidden="true"
        >
            <use href="#i-plane" />
        </svg>
        Trips
        <span
            class="bk-badge"
            data-variant="secondary"
        >
            4
        </span>
    </a>
    <a
        class="bk-sidebar-item"
        href="#"
    >
        <svg
            class="bk-icon"
            aria-hidden="true"
        >
            <use href="#i-inbox" />
        </svg>
        Inbox
        <span
            class="bk-badge"
            data-variant="brand"
        >
            2
        </span>
    </a>
    <div class="bk-sidebar-label">Workspace</div>
    <a
        class="bk-sidebar-item"
        href="#"
    >
        <svg
            class="bk-icon"
            aria-hidden="true"
        >
            <use href="#i-sliders" />
        </svg>
        Settings
    </a>
    <div class="bk-sidebar-footer">
        <span
            class="bk-avatar"
            data-size="sm"
            data-status="online"
        >
            MK
        </span>
        <div class="bk-list-item-text">
            <span>Maya Kim</span>
            <span>Plus plan</span>
        </div>
    </div>
</nav>
```

## Usage

```tsx
import {
    Sidebar,
    SidebarBrand,
    SidebarItem,
    SidebarLabel,
    SidebarFooter,
    Badge,
} from 'bento-shad-ui/react';

<Sidebar aria-label="App">
    <SidebarBrand>Tripline</SidebarBrand>
    <SidebarItem
        href="/"
        icon={<Home />}
        current
    >
        Home
    </SidebarItem>
    <SidebarItem
        href="/inbox"
        icon={<Inbox />}
        badge={<Badge variant="brand">2</Badge>}
    >
        Inbox
    </SidebarItem>
    <SidebarLabel>Workspace</SidebarLabel>
    <SidebarItem
        asChild
        icon={<Settings />}
    >
        <Link href="/settings">Settings</Link>
    </SidebarItem>
    <SidebarFooter>…</SidebarFooter>
</Sidebar>;
```

The sidebar uses the `--sidebar-*` tokens, so it can be themed separately from the page. In a bento layout, give it `rows` so it runs down the grid (see the dashboard recipe in [Layout](../layout.md)).

## API

<!-- props: SidebarItemProps -->

`Sidebar`, `SidebarBrand`, `SidebarLabel` and `SidebarFooter` render a `nav` and `div`s.

## Accessibility

- Label the `nav`, and mark the current page with `current`.
- Badges are read as part of the link ("Inbox 2"). Add hidden text if the number needs context ("2 unread").
