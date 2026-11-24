# Typography

Two faces from one family: **Red Hat Display** for headings and display text, **Red Hat Text** for everything else. Both are free under the SIL Open Font License. The library has no monospace font, by design: code, numbers and keyboard keys use Red Hat Text with tabular figures.

## Scale

```html preview full
<div
    class="bk-stack"
    style="--gap: 14px"
>
    <div
        class="bk-display"
        style="font-size: 3rem"
    >
        Plan less, go more
    </div>
    <div class="bk-h1">Four nights in Lisbon</div>
    <div class="bk-h2">Day two: Alfama</div>
    <div class="bk-h3">Getting around</div>
    <div class="bk-h4">Tram 28 timetable</div>
    <p class="bk-lead">Everything for the trip, in one place.</p>
    <p class="bk-p">
        Tram 28 leaves Martim Moniz every 12 minutes. Buy a transit card at the
        kiosk first, because drivers don't sell tickets.
    </p>
    <div class="bk-large">Total €640 for 2 travellers</div>
    <div class="bk-small">Updated 2 hours ago</div>
    <div class="bk-muted">Prices include taxes and fees.</div>
    <div class="bk-eyebrow">Itinerary · Day 2</div>
    <div><code class="bk-code">TP 1351 · 08:40 → 10:05</code></div>
</div>
```

| Class | Size / weight | Font | Use |
|---|---|---|---|
| `bk-display` | 40–68px fluid / 800 | Display | Hero headline, once per page |
| `bk-h1` | 40px / 800 | Display | Page title |
| `bk-h2` | 30px / 700 | Display | Section title |
| `bk-h3` | 24px / 700 | Display | Sub-section, big tile title |
| `bk-h4` | 20px / 600 | Display | Small heading |
| `bk-lead` | 20px / 400, muted | Text | Intro paragraph |
| `bk-p` | 16px / 400, 1.75 line height | Text | Body copy, 68 characters max |
| `bk-large` | 18px / 600 | Text | Emphasised value |
| `bk-small` | 14px / 500 | Text | Labels, short notes |
| `bk-muted` | 14px, muted colour | Text | Secondary text |
| `bk-caption` | 12px, muted colour | Text | Captions, footnotes |
| `bk-eyebrow` | 11px / 700, uppercase, tracked | Text | Label above a title |
| `bk-num` | 32px / 700, tabular | Text | Big numbers |
| `bk-code` | 0.9em / 600, tabular, chip | Text | Inline code |
| `bk-codeblock` | 13px, tabular, block | Text | Preformatted code |

Headings tighten their letter spacing as they grow (−0.015em at h4 to −0.045em at display) and use `text-wrap: balance`, so short titles don't leave a single word on the last line.

## Loading the fonts

See [Installation](installation.md#fonts) for Google Fonts, `next/font` and Flutter. To change faces, override two tokens:

```css
:root {
    --font-sans: 'Your Text Face', ui-sans-serif, system-ui, sans-serif;
    --font-heading: 'Your Display Face', ui-sans-serif, system-ui, sans-serif;
}
```

## Guidelines

- One `bk-display` per page, at most. Most pages start at `bk-h1`.
- Keep body text at 16px and lines under about 70 characters.
- Use `bk-num` and tabular figures wherever numbers line up in columns.
- Don't fake headings with bold body text; screen readers navigate by real `h1`–`h4` elements.
