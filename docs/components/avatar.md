---
title: Avatar
description: A person's photo or initials, with sizes, a status dot and overlapping groups.
group: Data display
---

```html preview
<div class="bk-row" style="--gap: 16px">
  <span class="bk-avatar" data-size="sm">MK</span>
  <span class="bk-avatar" data-status="online">JR</span>
  <span class="bk-avatar" data-size="lg" data-status="busy">AS</span>
  <span class="bk-avatar" data-size="xl" data-shape="square">LT</span>
  <span class="bk-avatar-group">
    <span class="bk-avatar" style="background: var(--tint-peach); color: var(--tint-peach-foreground)">MK</span>
    <span class="bk-avatar" style="background: var(--tint-sky); color: var(--tint-sky-foreground)">JR</span>
    <span class="bk-avatar" style="background: var(--tint-mint); color: var(--tint-mint-foreground)">AS</span>
    <span class="bk-avatar">+3</span>
  </span>
</div>
```

## Usage

```tsx
import { Avatar, AvatarGroup } from 'bento-shad-ui/react';

<Avatar src={user.photo} alt={user.name} fallback="MK" size="lg" status="online" />
<AvatarGroup>
  <Avatar fallback="MK" />
  <Avatar fallback="JR" />
  <Avatar fallback="+3" />
</AvatarGroup>
```

If the image fails to load, `fallback` is shown instead.

## API

<!-- props: AvatarProps -->

## Accessibility

- Give photos `alt` text with the person's name, unless the name is already written next to the avatar (then use `alt=""`).
- The status dot is visual only. Say the status in text nearby if it matters.
