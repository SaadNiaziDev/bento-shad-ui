---
title: Hover card
description: A preview card that opens while a pointer rests on a link or the link has keyboard focus.
group: Overlays
---

```html preview
<p style="margin: 0">
    Trip organised by
    <a
        href="#mira"
        data-bk-hovercard="hc-mira"
    >
        Mira Okafor
    </a>
</p>
<div
    class="bk-hovercard"
    id="hc-mira"
    popover="manual"
>
    <div
        class="bk-row"
        style="--gap: 12px"
    >
        <span class="bk-avatar">MO</span>
        <div>
            <strong>Mira Okafor</strong>
            <div style="font-size: 13px; color: var(--muted-foreground)">
                Design lead · Lisbon
            </div>
        </div>
    </div>
    <p style="margin: 10px 0 0; font-size: 13.5px">
        Organising 3 trips this year.
    </p>
</div>
```

Rest the pointer on the name, or Tab to it. The card opens after half a second so it doesn't flash while the pointer passes over, and stays open while the pointer moves into it. Esc closes it.

A hover card is a shortcut for people with a mouse or keyboard. Touch screens skip it (a tap follows the link), and screen readers don't announce it. Everything in the card must also be on the page the link leads to.

## Usage

```tsx
import { Avatar, HoverCard } from 'bento-shad-ui/react';

<HoverCard trigger={<a href="/people/mira">Mira Okafor</a>}>
    <Avatar fallback="MO" />
    <strong>Mira Okafor</strong>
    <p>Design lead · Lisbon</p>
</HoverCard>;
```

### HTML

Point `data-bk-hovercard` on the trigger at the id of a `.bk-hovercard` with `popover="manual"`. `data-open-delay` and `data-close-delay` on the trigger change the timing, in milliseconds.

```html
<a
    href="/people/mira"
    data-bk-hovercard="hc-mira"
>
    Mira Okafor
</a>
<div
    class="bk-hovercard"
    id="hc-mira"
    popover="manual"
>
    …
</div>
```

`data-align="center"` or `"end"` on the card lines it up with the middle or right edge of the trigger.

## API

<!-- props: HoverCardProps -->

## Accessibility

- Keyboard focus opens the card at once; Esc closes it without moving focus. It meets WCAG 1.4.13: it can be dismissed, the pointer can move over it, and it stays until the pointer or focus leaves.
- The card isn't connected to the trigger for screen readers on purpose: reading a whole card on every focus is noise. Keep the trigger meaningful on its own, such as a person's name that links to their profile.
- Avoid buttons and forms inside a hover card. They're hard to reach, and the card closes when focus moves on. Use a [Popover](popover.md) for anything interactive.
