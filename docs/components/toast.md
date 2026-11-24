---
title: Toast
description: A short, temporary message in the corner of the screen, called from code with no provider needed.
group: Feedback
---

```html preview
<div class="bk-row">
    <button
        class="bk-button"
        data-variant="outline"
        type="button"
        data-bk-toast='{"title":"Trip saved","description":"Lisbon, 12–16 March","variant":"success"}'
    >
        Success
    </button>
    <button
        class="bk-button"
        data-variant="outline"
        type="button"
        data-bk-toast='{"title":"Payment failed","description":"Your card was declined.","variant":"destructive"}'
    >
        Error
    </button>
    <button
        class="bk-button"
        data-variant="ghost"
        type="button"
        data-bk-toast='{"title":"Link copied"}'
    >
        Default
    </button>
</div>
```

## Usage

```ts
import { toast } from 'bento-shad-ui/react'; // or 'bento-shad-ui', or window.BentoUI.toast

toast('Link copied');

toast({
    title: 'Trip saved',
    description: 'Lisbon, 12–16 March',
    variant: 'success',
});

const dismiss = toast({
    title: 'Payment failed',
    variant: 'destructive',
    action: { label: 'Retry', onClick: retry },
    duration: 8000,
});
dismiss(); // close early
```

```html
<button
    class="bk-button"
    data-bk-toast='{"title":"Saved","variant":"success"}'
>
    Save
</button>
```

Toasts stack in the bottom-right corner, pause while hovered, while a control inside has keyboard focus, or while the tab is hidden. They close after 4.5 seconds of unpaused time. `duration: Infinity` keeps one open until it's dismissed.

## Examples

### Archive with Undo

Try archiving the file, then choose Undo in the toast. The file is removed from this preview and restored in its original position if you undo. Nothing is sent to a server. A real application should confirm the archive operation before showing success and offer recovery if the request fails.

```html preview full
<div
    id="archive-example"
    class="bk-stack"
>
    <div
        class="bk-row bk-between"
        data-file
    >
        <div>
            <strong>Brand guidelines.pdf</strong>
            <p class="bk-caption">Updated today · 2.4 MB</p>
        </div>
        <button
            class="bk-button"
            data-variant="outline"
            type="button"
            data-archive
        >
            Archive
        </button>
    </div>
    <p
        class="bk-muted"
        role="status"
        data-archive-status
    >
        No changes in this preview.
    </p>
</div>
```

The same code below powers this preview. Load the vanilla core script before it, or import `toast` from the package in a bundled application.

```js demo
const example = document.querySelector('#archive-example');
const row = example.querySelector('[data-file]');
const status = example.querySelector('[data-archive-status]');

example.querySelector('[data-archive]').addEventListener('click', () => {
    row.hidden = true;
    status.textContent = 'File archived in this preview.';

    window.BentoUI.toast({
        title: 'File archived',
        description: 'Brand guidelines.pdf',
        duration: 8000,
        action: {
            label: 'Undo',
            onClick: () => {
                row.hidden = false;
                status.textContent = 'File restored.';
            },
        },
    });
});
```

### Persistent connection notice

Use a persistent message when the condition is still active. Close it when connectivity returns; important connection information should also be available inline.

```html preview
<button
    class="bk-button"
    data-variant="outline"
    type="button"
    id="offline-notice-example"
>
    Preview connection notice
</button>
```

```js demo
const button = document.querySelector('#offline-notice-example');
let dismissPrevious;

button.addEventListener('click', () => {
    dismissPrevious?.();
    const dismissOfflineNotice = window.BentoUI.toast({
        title: 'You’re offline',
        description: 'Changes will sync when your connection returns.',
        duration: Infinity,
    });

    // Call when your application confirms that connectivity is restored.
    window.addEventListener('online', dismissOfflineNotice, { once: true });
    dismissPrevious = () => {
        window.removeEventListener('online', dismissOfflineNotice);
        dismissOfflineNotice();
    };
});
```

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
