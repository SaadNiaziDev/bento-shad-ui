---
title: Popover
description: A floating panel anchored to a button, for a small form or extra details.
group: Overlays
---

```html preview
<button class="bk-button" data-variant="outline" type="button" popovertarget="pv-invite"><svg class="bk-icon" aria-hidden="true"><use href="#i-plus"/></svg>Invite</button>
<div class="bk-popover" id="pv-invite" popover role="dialog" aria-label="Invite to trip">
  <div class="bk-stack">
    <div><div class="bk-tile-title">Invite to trip</div><p class="bk-tile-description">They can view and edit the plan.</p></div>
    <input class="bk-input" type="email" placeholder="friend@example.com" aria-label="Email address">
    <button class="bk-button" data-size="sm" type="button" popovertarget="pv-invite" popovertargetaction="hide" data-bk-toast='{"title":"Invite sent","variant":"success"}'>Send invite</button>
  </div>
</div>
```

## Usage

```tsx
import { Popover, closePopover, Field, Input, Button } from 'bento-shad-ui/react';

<Popover trigger={<Button variant="outline">Invite</Button>} aria-label="Invite to trip">
  <Field label="Email"><Input type="email" /></Field>
  <Button size="sm" onClick={(e) => { send(); closePopover(e); }}>Send invite</Button>
</Popover>
```

## API

<!-- props: PopoverProps -->

`closePopover(event)` closes the popover that contains the element the event came from.

## Accessibility

- Esc and clicks outside close it. Focus moves to the first field when it opens.
- Give it an `aria-label` that says what the panel is for.
- For text-only hints, use a [Tooltip](tooltip.md). For a blocking choice, use a [Dialog](dialog.md).
