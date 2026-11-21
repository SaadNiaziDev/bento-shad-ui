---
title: Sheet
description: A panel that slides in from the side, or from the bottom on phones, for filters, details and share menus.
group: Overlays
---

```html preview
<div class="bk-row">
  <button class="bk-button" data-variant="outline" type="button" data-bk-open="sh-filters"><svg class="bk-icon" aria-hidden="true"><use href="#i-filter"/></svg>Filters</button>
  <button class="bk-button" data-variant="outline" type="button" data-bk-open="sh-share"><svg class="bk-icon" aria-hidden="true"><use href="#i-users"/></svg>Share (bottom)</button>
</div>
<dialog class="bk-sheet" id="sh-filters" aria-labelledby="sh-filters-t">
  <button class="bk-button bk-dialog-close" data-variant="ghost" data-size="icon-sm" type="button" data-bk-close aria-label="Close"><svg class="bk-icon" aria-hidden="true"><use href="#i-x"/></svg></button>
  <div class="bk-dialog-header"><h2 class="bk-dialog-title" id="sh-filters-t">Filters</h2><p class="bk-dialog-description">142 stays match.</p></div>
  <div class="bk-dialog-body">
    <label class="bk-option"><input class="bk-checkbox" type="checkbox" checked><span>Free cancellation</span></label>
    <label class="bk-option"><input class="bk-checkbox" type="checkbox"><span>Breakfast included</span></label>
  </div>
  <div class="bk-dialog-footer"><button class="bk-button" type="button" data-bk-close>Show 142 stays</button></div>
</dialog>
<dialog class="bk-sheet" data-side="bottom" id="sh-share" aria-labelledby="sh-share-t">
  <div class="bk-sheet-handle" aria-hidden="true"></div>
  <div class="bk-dialog-header"><h2 class="bk-dialog-title" id="sh-share-t">Share trip</h2><p class="bk-dialog-description">People with the link can view the plan.</p></div>
  <div class="bk-dialog-body"><label class="bk-switch-row"><span>Allow editing</span><input class="bk-switch" type="checkbox" role="switch"></label></div>
</dialog>
```

## Usage

```tsx
import { Sheet, Button } from 'bento-shad-ui/react';

<Sheet open={open} onOpenChange={setOpen} title="Filters" description="142 stays match." footer={<Button onClick={() => setOpen(false)}>Show 142 stays</Button>}>
  …
</Sheet>

<Sheet side="bottom" open={sharing} onOpenChange={setSharing} title="Share trip">…</Sheet>
```

## API

<!-- props: SheetProps -->

## Accessibility

- Same as [Dialog](dialog.md): focus trap, Esc to close, inert background, focus returns to the trigger.
- Bottom sheets add a drag handle for looks only. Close them with the backdrop, Esc or a button.
