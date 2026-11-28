---
title: Tip
description: A pencil character with a speech bubble, for onboarding hints, advice in empty states and short announcements.
group: Feedback
---

```html preview
<div
    class="bk-tip"
    role="note"
    style="max-width: 420px"
>
    <span
        class="bk-illustration"
        data-bk-character="pip"
        data-mood="thinking"
    ></span>
    <div class="bk-tip-bubble">
        <p class="bk-tip-title">Search by country</p>
        <p class="bk-tip-text">
            Type “Portugal” to see every city there, or press ⌘K from any page.
        </p>
    </div>
</div>
```

A tip puts a short piece of advice in a character's voice. The drawing is decorative: the bubble carries the meaning, so the tip reads the same without the picture.

## Usage

```tsx
import { Button, Tip } from 'bento-shad-ui/react';

<Tip
    character="pip"
    mood="thinking"
    title="Search by country"
>
    Type “Portugal” to see every city there, or press ⌘K from any page.
</Tip>;

function SharedTripsTip() {
    const [show, setShow] = useState(true);
    if (!show) return null;
    return (
        <Tip
            character="mira"
            mood="happy"
            tone="peach"
            title="Shared trips are here"
            onDismiss={() => setShow(false)}
            actions={<Button size="sm">Invite someone</Button>}
        >
            Plan together: everyone you invite can add places and vote on dates.
        </Tip>
    );
}
```

### HTML

```html
<div
    class="bk-tip"
    role="note"
>
    <span
        class="bk-illustration"
        data-bk-character="pip"
        data-mood="thinking"
    ></span>
    <div class="bk-tip-bubble">
        <p class="bk-tip-title">Search by country</p>
        <p class="bk-tip-text">Type “Portugal” to see every city there.</p>
    </div>
</div>
```

Load `dist/illustrations.iife.min.js` to draw the character (see [Characters](characters.md)). `data-side="end"` puts the character on the right; `data-tone` takes `peach`, `sky`, `mint`, `lilac` or `butter`. A button with `data-bk-dismiss` inside a tip hides it.

## Examples

### Announcement with actions

Use a tint and an action for something new. Let people dismiss it, and remember that choice in your application.

```html preview
<div
    class="bk-tip"
    role="note"
    data-tone="peach"
    style="max-width: 460px"
>
    <span
        class="bk-illustration"
        data-bk-character="mira"
        data-mood="happy"
    ></span>
    <div class="bk-tip-bubble">
        <p class="bk-tip-title">Shared trips are here</p>
        <p class="bk-tip-text">
            Plan together: everyone you invite can add places and vote on dates.
        </p>
        <div class="bk-tip-actions">
            <button
                class="bk-button"
                data-size="sm"
                type="button"
                data-bk-toast='{"title":"Invite link copied","variant":"success"}'
            >
                Invite someone
            </button>
            <button
                class="bk-button"
                data-variant="ghost"
                data-size="sm"
                type="button"
                data-bk-dismiss
            >
                Not now
            </button>
        </div>
        <button
            class="bk-button bk-tip-close"
            data-variant="ghost"
            data-size="icon-sm"
            type="button"
            aria-label="Dismiss"
            data-bk-dismiss
        >
            <svg
                class="bk-icon"
                aria-hidden="true"
            >
                <use href="#i-x" />
            </svg>
        </button>
    </div>
</div>
```

### Character on the right

Put the character on the side the content flows towards, for example next to a form it explains.

```html preview
<div
    class="bk-tip"
    role="note"
    data-side="end"
    data-tone="sky"
    style="max-width: 420px"
>
    <span
        class="bk-illustration"
        data-bk-character="moss"
        data-mood="sleepy"
    ></span>
    <div class="bk-tip-bubble">
        <p class="bk-tip-title">No rush</p>
        <p class="bk-tip-text">
            Your draft saves as you type. Come back to it any time this week.
        </p>
    </div>
</div>
```

### In a tile

A tip fits a bento tile as an onboarding step or a gentle nudge on a dashboard.

```html preview full
<div class="bk-bento">
    <div class="bk-bento-grid">
        <article class="bk-tile bk-span-2">
            <div class="bk-tile-header">
                <h3 class="bk-tile-title">Getting started</h3>
                <span
                    class="bk-badge"
                    data-variant="secondary"
                >
                    2 of 4
                </span>
            </div>
            <div
                class="bk-tip"
                role="note"
                data-tone="mint"
            >
                <span
                    class="bk-illustration"
                    data-bk-character="biscuit"
                    data-mood="happy"
                ></span>
                <div class="bk-tip-bubble">
                    <p class="bk-tip-title">Add your first stop</p>
                    <p class="bk-tip-text">
                        Pick a city and dates. You can reorder stops later by
                        dragging.
                    </p>
                    <div class="bk-tip-actions">
                        <button
                            class="bk-button"
                            data-size="sm"
                            type="button"
                        >
                            Add a stop
                        </button>
                    </div>
                </div>
            </div>
        </article>
    </div>
</div>
```

## Which character for which tip

| Moment | Character and mood |
|---|---|
| A hint or a better way to do something | Pip, `thinking` |
| Something new, or a success | Mira, `happy` |
| Saved work, waiting, no hurry | Moss, `sleepy` |
| A friendly first step | Biscuit, `happy` |
| A gentle warning | Dumpling, `surprised` |

## API

<!-- props: TipProps -->

## Accessibility

- The tip has `role="note"`: supporting content, not an alert. For something urgent, use an [Alert](alert.md).
- The character is hidden from screen readers. Never put information only in the drawing or the mood.
- The × button needs an accessible name; React's defaults to "Dismiss". Dismissing removes the tip from the page, so move focus somewhere sensible if the button had it.
- Tinted bubbles use the tint's own text colour, which passes 4.5:1 in both themes.
