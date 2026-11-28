# Using with plain HTML

Works with any server or static site: plain HTML, PHP, Rails, Django, Laravel, htmx, Astro, Eleventy.

## Page setup

```html
<!doctype html>
<html
    lang="en"
    data-theme="system"
>
    <head>
        <meta charset="utf-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <!-- 1. no dark-mode flash: copy the string exported as `themeScript`, or this line -->
        <script>
            (function () {
                try {
                    var r = document.documentElement,
                        t = null;
                    try {
                        t = localStorage.getItem('bk-theme');
                    } catch (e) {}
                    if (t !== 'light' && t !== 'dark' && t !== 'system')
                        t = r.getAttribute('data-theme') || 'system';
                    var d =
                        t === 'dark' ||
                        (t === 'system' &&
                            window.matchMedia &&
                            matchMedia('(prefers-color-scheme: dark)').matches);
                    r.setAttribute('data-theme', t);
                    r.classList.toggle('dark', d);
                } catch (e) {}
            })();
        </script>
        <!-- 2. fonts -->
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@500;600;700;800&family=Red+Hat+Text:wght@400;500;600;700&display=swap"
        />
        <!-- 3. styles and behaviours -->
        <link
            rel="stylesheet"
            href="/vendor/bento-shad-ui/bento.min.css"
        />
        <script
            src="/vendor/bento-shad-ui/bento.iife.min.js"
            defer
        ></script>
    </head>
    <body class="bk">
        …
    </body>
</html>
```

`class="bk"` on `<body>` sets the font, base size, colours and focus rings. Without it, components still render, but plain text around them uses browser defaults.

## Layout

```html
<main class="bk-container">
    <div class="bk-bento">
        <!-- the box the grid measures -->
        <div class="bk-bento-grid">
            <!-- 4 / 2 / 1 columns -->
            <article class="bk-tile bk-span-2 bk-row-2">…</article>
            <article
                class="bk-tile"
                data-tone="peach"
            >
                …
            </article>
            <article class="bk-tile">…</article>
            <article class="bk-tile bk-span-2">…</article>
        </div>
    </div>
</main>
```

See [layout.md](layout.md) for spans, rows, tones and rules.

## Components

Every component is markup plus classes. Variants are data attributes:

```html
<button
    class="bk-button"
    data-variant="outline"
    data-size="sm"
>
    Share
</button>
<span
    class="bk-badge"
    data-variant="success"
    data-dot
>
    Paid
</span>
<div
    class="bk-alert"
    data-variant="destructive"
    role="alert"
>
    …
</div>
```

The full catalogue with markup is in [components.md](components.md). The live kit (`index.html`) has a **Code** button on every tile.

## Behaviours (optional script)

Without JavaScript, everything renders and these still work: buttons, inputs, native selects, checkboxes, radios, switches, sliders, accordions (`<details>`) and tooltips (CSS). The script adds the following, driven by attributes:

| Attribute / class | What happens |
|---|---|
| `data-bk-theme-set="light\|dark\|system"` | Click sets the theme and remembers it |
| `data-bk-open="id"` on a button | Opens `<dialog id="id">` (dialog, sheet, command) |
| `data-bk-close` inside a dialog | Closes it. `data-bk-close="value"` sets `returnValue` |
| `popovertarget="id"` + `.bk-menu[popover]` / `.bk-popover[popover]` | Places the menu under its button and flips it when there's no room |
| `data-bk-toast='{"title":"Saved","variant":"success"}'` | Shows a toast on click |
| `data-bk-copy="text"` or `data-bk-copy-target="#selector"` | Copies to the clipboard and confirms with a toast |
| `[data-bk-tabs]` with `role="tab"` + `aria-controls` | Tabs with arrow-key navigation |
| `.bk-toggle` (in `.bk-toggle-group[data-type="single"]` for one-of) | Flips `aria-pressed` |
| `.bk-slider` + `<output for="id">` | Keeps the fill and the readout in sync (`data-prefix`, `data-suffix`) |
| `.bk-otp` | Digits only, auto-advance, backspace, paste |
| `.bk-calendar[data-mode="single\|range"]` | Day selection; fires `bk:change` with `{ start, end }` |
| `dialog.bk-command[data-bk-hotkey]` | ⌘K / Ctrl+K opens it; typing filters `.bk-command-item`s |
| `.bk-combobox` (`data-multiple`, `data-name`) | Filters `.bk-combobox-option`s as you type, keyboard picking, chips; fires `bk:change` with `{ value, values }` |
| `.bk-tags` (`data-name`, `data-max`) | Enter or a comma adds a tag, Backspace removes; fires `bk:change` with `{ values }` |
| `[data-bk-dismiss]` inside `.bk-tip` | Hides the tip |
| `.bk-dropzone` | Drag-over state and selected file names |

Content added later (fetch, htmx swaps, Turbo) is set up automatically through a `MutationObserver`. To control it yourself, load the ES module and call `start({ observe: false })`, then `init(newElement)` after each swap.

### Calling it from your own code

```js
BentoUI.toast({
    title: 'Trip saved',
    description: 'Lisbon, 12–16 March',
    variant: 'success',
});
BentoUI.setTheme('dark');
document.addEventListener('bk:theme', (e) => console.log(e.detail)); // { theme, resolved }
```

Full API: [javascript-api.md](javascript-api.md).

## Self-hosting the files

Copy from `node_modules/bento-shad-ui/dist/` (or the GitHub release) into your static folder:

- `bento.min.css` (and `bento.css` for readable source)
- `bento.iife.min.js`

There are no other assets: icons are inline SVG you provide, and fonts come from Google Fonts or your own copy.

## Icons

The kit doesn't ship an icon set. Any 24×24 stroke icon works; Lucide matches best. Give inline SVGs `class="bk-icon"` (16px, `data-size="sm|lg|xl"` for 14/20/24px). SVGs placed directly inside buttons, menu items, sidebar items and similar are sized automatically.
