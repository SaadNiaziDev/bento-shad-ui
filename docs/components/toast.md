---
title: Toast
description: A short, temporary message in the corner of the screen, called from code with no provider needed.
group: Feedback
---

```html preview
<div class="bk-row">
  <button class="bk-button" data-variant="outline" type="button" data-bk-toast='{"title":"Trip saved","description":"Lisbon, 12–16 March","variant":"success"}'>Success</button>
  <button class="bk-button" data-variant="outline" type="button" data-bk-toast='{"title":"Payment failed","description":"Your card was declined.","variant":"destructive"}'>Error</button>
  <button class="bk-button" data-variant="ghost" type="button" data-bk-toast='{"title":"Link copied"}'>Default</button>
</div>
```

## Usage

```ts
import { toast } from 'bento-shad-ui/react'; // or 'bento-shad-ui', or window.BentoUI.toast

toast('Link copied');

toast({ title: 'Trip saved', description: 'Lisbon, 12–16 March', variant: 'success' });

const dismiss = toast({
  title: 'Payment failed',
  variant: 'destructive',
  action: { label: 'Retry', onClick: retry },
  duration: 8000,
});
dismiss(); // close early
```

```html
<button class="bk-button" data-bk-toast='{"title":"Saved","variant":"success"}'>Save</button>
```

Toasts stack in the bottom-right corner, pause while hovered and close after 4.5 seconds. `duration: Infinity` keeps one open until it's dismissed.

## API

| Option | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | required | The message |
| `description` | `string` | – | Second line |
| `variant` | `'default' \| 'success' \| 'destructive'` | `'default'` | Icon and colour |
| `duration` | `number` | `4500` | Milliseconds; `Infinity` keeps it open |
| `action` | `{ label: string; onClick?: () => void }` | – | One button; clicking it also closes the toast |

`toast()` returns a function that closes the toast. On the server it does nothing.

## Accessibility

- The container is a polite live region; destructive toasts use `role="alert"`.
- Toasts disappear. Don't make a toast the only place for important information or the only way to undo something.
