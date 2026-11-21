---
title: Dropdown menu
description: A menu of actions under a button, on the native popover API, with checkbox items, shortcuts and keyboard navigation.
group: Overlays
---

```html preview
<button class="bk-button" data-variant="outline" type="button" popovertarget="dm-account">Maya Kim<svg class="bk-icon" aria-hidden="true"><use href="#i-chevron-down"/></svg></button>
<div class="bk-menu" id="dm-account" popover role="menu">
  <div class="bk-menu-label">My account</div>
  <button class="bk-menu-item" role="menuitem" type="button"><svg class="bk-icon" aria-hidden="true"><use href="#i-user"/></svg>Profile<span class="bk-menu-shortcut">⇧⌘P</span></button>
  <button class="bk-menu-item" role="menuitem" type="button"><svg class="bk-icon" aria-hidden="true"><use href="#i-wallet"/></svg>Billing</button>
  <hr class="bk-menu-separator">
  <button class="bk-menu-item" role="menuitemcheckbox" aria-checked="true" type="button">Email updates</button>
  <hr class="bk-menu-separator">
  <button class="bk-menu-item" role="menuitem" data-variant="destructive" type="button"><svg class="bk-icon" aria-hidden="true"><use href="#i-logout"/></svg>Log out</button>
</div>
```

## Usage

```tsx
import { DropdownMenu, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator, Button } from 'bento-shad-ui/react';

<DropdownMenu trigger={<Button variant="outline">Maya Kim</Button>} align="end">
  <DropdownMenuLabel>My account</DropdownMenuLabel>
  <DropdownMenuItem icon={<User />} shortcut="⇧⌘P" onSelect={openProfile}>Profile</DropdownMenuItem>
  <DropdownMenuCheckboxItem checked={emails} onCheckedChange={setEmails}>Email updates</DropdownMenuCheckboxItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem variant="destructive" onSelect={logout}>Log out</DropdownMenuItem>
</DropdownMenu>
```

The menu opens under its trigger, lines up with `align` (`start`, `center`, `end`) and flips above when there's no room below. Choosing an item closes it unless the item has `keepOpen`.

## API

### DropdownMenu

<!-- props: DropdownMenuProps -->

### DropdownMenuItem

<!-- props: DropdownMenuItemProps -->

### DropdownMenuCheckboxItem

<!-- props: DropdownMenuCheckboxItemProps -->

`DropdownMenuLabel` and `DropdownMenuSeparator` render a label and a divider.

## Accessibility

- Focus moves to the first item when the menu opens. ↑/↓, Home and End move between items; Esc and outside clicks close it.
- Items use `role="menuitem"` or `menuitemcheckbox` with `aria-checked`. The trigger gets `aria-haspopup="menu"`.
