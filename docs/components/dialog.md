---
title: Dialog
description: A modal window on the native dialog element, with focus trapping, Esc to close and an alert variant for confirmations.
group: Overlays
---

```html preview
<div class="bk-row">
  <button class="bk-button" data-variant="outline" type="button" data-bk-open="dg-edit">Edit profile</button>
  <button class="bk-button" data-variant="destructive" type="button" data-bk-open="dg-delete">Delete trip</button>
</div>
<dialog class="bk-dialog" id="dg-edit" aria-labelledby="dg-edit-t">
  <button class="bk-button bk-dialog-close" data-variant="ghost" data-size="icon-sm" type="button" data-bk-close aria-label="Close"><svg class="bk-icon" aria-hidden="true"><use href="#i-x"/></svg></button>
  <div class="bk-dialog-header"><h2 class="bk-dialog-title" id="dg-edit-t">Edit profile</h2><p class="bk-dialog-description">Your name shows on shared trips.</p></div>
  <div class="bk-dialog-body"><div class="bk-field"><label class="bk-label" for="dg-name">Name</label><input class="bk-input" id="dg-name" value="Maya Kim" autofocus></div></div>
  <div class="bk-dialog-footer"><button class="bk-button" data-variant="outline" type="button" data-bk-close>Cancel</button><button class="bk-button" type="button" data-bk-close data-bk-toast='{"title":"Profile saved","variant":"success"}'>Save</button></div>
</dialog>
<dialog class="bk-dialog" data-variant="alert" id="dg-delete" role="alertdialog" aria-labelledby="dg-delete-t" aria-describedby="dg-delete-d">
  <span class="bk-dialog-icon"><svg class="bk-icon" data-size="lg" aria-hidden="true"><use href="#i-trash"/></svg></span>
  <div class="bk-dialog-header"><h2 class="bk-dialog-title" id="dg-delete-t">Delete "Lisbon, 4 nights"?</h2><p class="bk-dialog-description" id="dg-delete-d">The plan and notes are removed for all 6 travellers. This can't be undone.</p></div>
  <div class="bk-dialog-footer"><button class="bk-button" data-variant="outline" type="button" data-bk-close autofocus>Keep trip</button><button class="bk-button" data-variant="destructive" type="button" data-bk-close="delete">Delete trip</button></div>
</dialog>
```

## Usage

```tsx
import { Dialog, Button, Field, Input } from 'bento-shad-ui/react';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Edit profile</Button>
<Dialog
  open={open}
  onOpenChange={setOpen}
  title="Edit profile"
  description="Your name shows on shared trips."
  footer={<><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={save}>Save</Button></>}
>
  <Field label="Name"><Input defaultValue="Maya Kim" autoFocus /></Field>
</Dialog>
```

### Confirmation

```tsx
<Dialog
  variant="alert"
  icon={<Trash2 />}
  open={confirming}
  onOpenChange={setConfirming}
  title={`Delete "${trip.name}"?`}
  description="The plan and notes are removed for all travellers. This can't be undone."
  footer={<><Button variant="outline" onClick={() => setConfirming(false)}>Keep trip</Button><Button variant="destructive" onClick={remove}>Delete trip</Button></>}
/>
```

Alert dialogs are narrower, hide the × button and ignore backdrop clicks, so the choice is deliberate.

### HTML

Any button with `data-bk-open="id"` opens `<dialog id="id">`. `data-bk-close` inside closes it, and `data-bk-close="value"` sets the dialog's `returnValue`. Clicking the backdrop closes default dialogs.

## API

<!-- props: DialogProps -->

## Accessibility

- The native `<dialog>` traps focus, makes the page behind inert and closes with Esc. Focus returns to the button that opened it.
- `title` and `description` are wired to `aria-labelledby` and `aria-describedby`.
- Put `autoFocus` on the first field, or on the safe button in a confirmation.
