---
title: Card
description: shadcn/ui card anatomy (header, action, content, footer) for content outside a bento grid, such as forms and settings.
group: Layout
---

```html preview
<div
    class="bk-card"
    style="width: 340px"
>
    <div class="bk-card-header">
        <h3 class="bk-card-title">Lisbon, 4 nights</h3>
        <div class="bk-card-action">
            <span
                class="bk-badge"
                data-variant="success"
                data-dot
            >
                Booked
            </span>
        </div>
        <p class="bk-card-description">12–16 March · 2 travellers</p>
    </div>
    <div class="bk-card-content">
        <p
            class="bk-muted"
            style="margin: 0"
        >
            Hotel Chiado, breakfast included, free cancellation until 10 March.
        </p>
    </div>
    <div class="bk-card-footer">
        <span class="bk-large">€640</span>
        <button
            class="bk-button"
            data-size="sm"
            type="button"
        >
            View plan
        </button>
    </div>
</div>
```

## Usage

```tsx
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardAction,
    CardContent,
    CardFooter,
    Badge,
    Button,
} from 'bento-shad-ui/react';

<Card>
    <CardHeader>
        <CardTitle>Lisbon, 4 nights</CardTitle>
        <CardAction>
            <Badge
                variant="success"
                dot
            >
                Booked
            </Badge>
        </CardAction>
        <CardDescription>12–16 March · 2 travellers</CardDescription>
    </CardHeader>
    <CardContent>…</CardContent>
    <CardFooter>
        <span>€640</span>
        <Button size="sm">View plan</Button>
    </CardFooter>
</Card>;
```

## When to use Card or Tile

- **Tile** is a cell of a bento grid: large radius, no shadow, sized by the grid.
- **Card** stands on its own: forms, settings sections, a detail panel next to a list. It has a light shadow and inner padding per section.

## Examples

### Project summary

Keep the status next to the title, with one primary action in the footer.

```html preview
<article
    class="bk-card"
    style="width: 100%; max-width: 400px"
>
    <div class="bk-card-header">
        <h3 class="bk-card-title">Website refresh</h3>
        <div class="bk-card-action">
            <span
                class="bk-badge"
                data-variant="outline"
            >
                In progress
            </span>
        </div>
        <p class="bk-card-description">Studio North · Design team</p>
    </div>
    <div class="bk-card-content bk-stack">
        <div class="bk-row bk-between">
            <span class="bk-small">Milestones</span>
            <span class="bk-caption">3 of 4 complete</span>
        </div>
        <div
            class="bk-progress"
            role="progressbar"
            aria-label="Project milestones"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
        >
            <span style="--v: 75%"></span>
        </div>
        <div
            class="bk-avatar-group"
            aria-label="Team members: Sam, Alex, Noor"
        >
            <span class="bk-avatar">SK</span>
            <span class="bk-avatar">AL</span>
            <span class="bk-avatar">NK</span>
        </div>
    </div>
    <div class="bk-card-footer">
        <span class="bk-caption">Due December 12</span>
        <button
            class="bk-button"
            data-size="sm"
            type="button"
            data-bk-toast='{"title":"Project preview","description":"Connect your project navigation here."}'
        >
            View project
        </button>
    </div>
</article>
```

### Account preferences

A form card groups related fields. This preview demonstrates local feedback; save and validate values in your application before showing success.

```html preview
<section
    class="bk-card"
    style="width: 100%; max-width: 420px"
    aria-labelledby="card-preferences-title"
>
    <div class="bk-card-header">
        <h3
            class="bk-card-title"
            id="card-preferences-title"
        >
            Account preferences
        </h3>
        <p class="bk-card-description">Make this workspace feel like yours.</p>
    </div>
    <div class="bk-card-content bk-form">
        <div class="bk-field">
            <label
                class="bk-label"
                for="card-display-name"
            >
                Display name
            </label>
            <input
                class="bk-input"
                id="card-display-name"
                value="Sam Khan"
                autocomplete="name"
            />
        </div>
        <div class="bk-field">
            <label
                class="bk-label"
                for="card-language"
            >
                Language
            </label>
            <select
                class="bk-select"
                id="card-language"
            >
                <option>English</option>
                <option>Urdu</option>
                <option>French</option>
            </select>
        </div>
        <label class="bk-switch-row">
            <span>Weekly digest</span>
            <input
                class="bk-switch"
                type="checkbox"
                role="switch"
                checked
            />
        </label>
    </div>
    <div class="bk-card-footer">
        <button
            class="bk-button"
            type="button"
            data-bk-toast='{"title":"Preferences preview","description":"No account data was saved."}'
        >
            Preview save
        </button>
    </div>
</section>
```

### Subscription card

Use a badge for context and readable billing terms near the price.

```html preview
<article
    class="bk-card"
    style="width: 100%; max-width: 360px"
>
    <div class="bk-card-header">
        <h3 class="bk-card-title">Team</h3>
        <div class="bk-card-action">
            <span
                class="bk-badge"
                data-variant="outline"
            >
                Popular
            </span>
        </div>
        <p class="bk-card-description">
            For small teams doing meaningful work.
        </p>
    </div>
    <div class="bk-card-content bk-stack">
        <div class="bk-stat">
            <span class="bk-stat-value">$24</span>
            <span class="bk-stat-label">
                Per member / month, billed monthly
            </span>
        </div>
        <ul>
            <li>Unlimited projects</li>
            <li>Shared workspaces</li>
            <li>Priority support</li>
        </ul>
    </div>
    <div class="bk-card-footer">
        <button
            class="bk-button"
            data-variant="brand"
            data-block
            type="button"
            data-bk-toast='{"title":"Plan preview","description":"Connect your billing flow here."}'
        >
            Explore Team
        </button>
    </div>
</article>
```

### Notification card

A compact card works well for a single update, with supporting actions that wrap on small screens.

```html preview
<article
    class="bk-card"
    style="width: 100%; max-width: 420px"
>
    <div class="bk-card-header">
        <h3 class="bk-card-title">Your export is ready</h3>
        <p class="bk-card-description">November activity · CSV · 42 KB</p>
    </div>
    <div class="bk-card-content">
        <p
            class="bk-muted"
            style="margin: 0"
        >
            The example export includes project activity and team contributions.
        </p>
    </div>
    <div class="bk-card-footer">
        <span class="bk-caption">Prepared just now</span>
        <button
            class="bk-button"
            data-variant="outline"
            data-size="sm"
            type="button"
            data-bk-toast='{"title":"Export preview","description":"Connect a generated file to this action."}'
        >
            Preview export
        </button>
    </div>
</article>
```

### Empty card

An empty state can sit inside the same card shell as its eventual content.

```html preview
<section
    class="bk-card"
    style="width: 100%; max-width: 440px"
    aria-labelledby="card-files-title"
>
    <div class="bk-card-header">
        <h3
            class="bk-card-title"
            id="card-files-title"
        >
            Project files
        </h3>
        <p class="bk-card-description">
            Everything your team shares, in one place.
        </p>
    </div>
    <div class="bk-card-content">
        <div class="bk-empty">
            <span class="bk-empty-icon">
                <svg
                    class="bk-icon"
                    aria-hidden="true"
                >
                    <use href="#i-plus" />
                </svg>
            </span>
            <h4 class="bk-empty-title">No files yet</h4>
            <p class="bk-empty-description">
                Add a brief, reference or draft to get started.
            </p>
            <div class="bk-empty-actions">
                <label
                    class="bk-button"
                    data-variant="outline"
                >
                    Choose a file
                    <input
                        class="bk-sr-only"
                        type="file"
                        aria-label="Choose a project file"
                    />
                </label>
            </div>
        </div>
    </div>
</section>
```

The file picker is local only; selecting a file does not upload it.

### Long content in a narrow card

Names and contact addresses should remain readable when they are longer than the demo data. Resize this preview: the title wraps, the contact address breaks only when necessary, and footer actions can wrap onto their own line. Try it in both themes.

```html preview
<article
    class="bk-card"
    style="width: 100%; max-width: 320px"
>
    <div class="bk-card-header">
        <h3 class="bk-card-title">
            Northwind International Research &amp; Development
        </h3>
        <p class="bk-card-description">
            أمينة عبد الرحمن · Workspace administrator
        </p>
    </div>
    <div class="bk-card-content">
        <p class="bk-card-description">
            amina.abdulrahman@northwind-research.example.com
        </p>
    </div>
    <div class="bk-card-footer">
        <span class="bk-caption">1 pending invitation</span>
        <button
            class="bk-button"
            data-variant="outline"
            type="button"
            data-bk-toast='{"title":"Invitation preview","description":"No invitation was sent."}'
        >
            Preview invitation reminder
        </button>
    </div>
</article>
```

## API

Every part renders one element and accepts that element's attributes:

| Part | Element | Class |
|---|---|---|
| `Card` | `div` | `bk-card` |
| `CardHeader` | `div` | `bk-card-header` |
| `CardTitle` | `h3` | `bk-card-title` |
| `CardDescription` | `p` | `bk-card-description` |
| `CardAction` | `div` | `bk-card-action` (top right of the header) |
| `CardContent` | `div` | `bk-card-content` |
| `CardFooter` | `div` | `bk-card-footer` |

## Accessibility

- `CardTitle` is an `h3`. If the page outline needs another level, use a heading with the class instead: `<h2 className="bk-card-title">`.
