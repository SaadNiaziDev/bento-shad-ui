# JavaScript API (core)

`import { … } from 'bento-shad-ui'` (ESM), or `window.BentoUI` from the script-tag build. Written in TypeScript; types ship in `dist/types`. Every function is safe to import during server rendering and does nothing there.

## Starting

```ts
start(options?: { observe?: boolean; restoreTheme?: boolean }): void
```

Attaches the delegated listeners (once), restores the saved theme, runs `init(document)` when the DOM is ready, and by default watches for added nodes. `import 'bento-shad-ui/auto'` and the script-tag build call it for you.

```ts
init(root?: ParentNode): void
```

Sets up widgets that need per-element work (tabs, command palettes, calendars, slider fills, `data-indeterminate` checkboxes) inside `root`. Safe to call repeatedly; each element is set up once. Call it after inserting HTML if you started with `observe: false`.

## Theme

```ts
type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

setTheme(theme: Theme, options?: { persist?: boolean }): void   // sets data-theme + .dark, saves, fires bk:theme
getTheme(): Theme                                                // from <html data-theme>
resolveTheme(theme?: Theme): ResolvedTheme                       // 'system' → OS setting
getStoredTheme(): Theme | null                                   // localStorage 'bk-theme'
onThemeChange(listener: (d: { theme: Theme; resolved: ResolvedTheme }) => void): () => void
isTheme(value: unknown): value is Theme
themeScript: string          // inline <head> script that prevents a dark-mode flash
THEME_STORAGE_KEY = 'bk-theme'
THEME_EVENT = 'bk:theme'
```

## Toast

```ts
interface ToastOptions {
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'destructive';
  duration?: number;            // ms, default 4500; Infinity keeps it open
  action?: { label: string; onClick?: () => void };
}
toast(input: string | ToastOptions): () => void   // returns dismiss()
```

## Popovers

```ts
enablePopoverPlacement(): void                              // idempotent; start() calls it
placePopover(popover: HTMLElement, anchor?: HTMLElement): void
```

Kit popovers (`.bk-menu[popover]`, `.bk-popover[popover]`) are placed under the button whose `popovertarget` points at them, aligned by `data-align="start|center|end"`, flipped above when there's no room, and kept in place on scroll and resize.

## Other

```ts
openCommand(dialog?: HTMLDialogElement | null): void   // toggles a command dialog (default: dialog.bk-command[data-bk-hotkey])
fillSlider(range: HTMLInputElement): void              // updates --val and <output for>
version: string
```

## Events

| Event | Target | `detail` |
|---|---|---|
| `bk:theme` | `document` | `{ theme, resolved }` |
| `bk:change` | `[data-bk-tabs]` | `{ tab }`: the selected tab element |
| `bk:change` | `.bk-calendar` | `{ start, end }`: day-of-month numbers |

All events bubble.

## Data attributes

| Attribute | On | Effect |
|---|---|---|
| `data-bk-theme-set` | button | `light` / `dark` / `system` |
| `data-bk-open` | button | id of a `<dialog>` to open |
| `data-bk-close` | inside a dialog | closes it; the value becomes `returnValue` |
| `data-bk-toast` | button | JSON `ToastOptions` or plain title text |
| `data-bk-copy` / `data-bk-copy-target` | button | text, or a selector whose text is copied |
| `data-bk-tabs` | wrapper | enables tabs |
| `data-bk-hotkey` | `dialog.bk-command` | ⌘K / Ctrl+K toggles it |
| `data-keep-open` | `.bk-menu-item` | don't close the menu on click |
| `data-indeterminate` | `.bk-checkbox` | sets `indeterminate` on init |
| `data-prefix` / `data-suffix` | `.bk-slider` | text around the `<output>` value |
| `data-bk-react` | any | marks React-managed elements; the core ignores them |

## Script-tag build

`dist/bento.iife.min.js` defines `window.BentoUI` with every export above and calls `start()` immediately.

```html
<script
    src="…/bento.iife.min.js"
    defer
></script>
<script>
    addEventListener('DOMContentLoaded', () => BentoUI.toast('Ready'));
</script>
```
