---
title: Empty state
description: What to show when there's nothing yet. Say what will appear here and how to add the first item.
group: Feedback
---

```html preview full
<div class="bk-empty">
    <span class="bk-empty-icon">
        <svg
            class="bk-icon"
            data-size="lg"
            aria-hidden="true"
        >
            <use href="#i-plane" />
        </svg>
    </span>
    <h4 class="bk-empty-title">No trips yet</h4>
    <p class="bk-empty-description">
        Trips you plan or get invited to show up here. Start with a city and
        dates.
    </p>
    <div class="bk-empty-actions">
        <button
            class="bk-button"
            type="button"
        >
            <svg
                class="bk-icon"
                aria-hidden="true"
            >
                <use href="#i-plus" />
            </svg>
            Plan a trip
        </button>
        <button
            class="bk-button"
            data-variant="outline"
            type="button"
        >
            Import booking
        </button>
    </div>
</div>
```

### With a character

```html preview full
<div class="bk-empty">
    <div class="bk-empty-illustration">
        <span
            class="bk-illustration"
            data-bk-character="pip"
            data-mood="thinking"
        ></span>
    </div>
    <h4 class="bk-empty-title">No results for "Lisbn"</h4>
    <p class="bk-empty-description">
        Check the spelling, or search for a country instead of a city.
    </p>
    <div class="bk-empty-actions">
        <button
            class="bk-button"
            data-variant="outline"
            type="button"
        >
            Clear search
        </button>
    </div>
</div>
```

See [Characters](characters.md) for the whole cast.

## Usage

```tsx
import { Empty, Button } from 'bento-shad-ui/react';
import { Plane, Plus } from 'lucide-react';

<Empty
    icon={<Plane />}
    title="No trips yet"
    description="Trips you plan or get invited to show up here. Start with a city and dates."
    actions={
        <Button>
            <Plus />
            Plan a trip
        </Button>
    }
/>

<Empty
    illustration={<PencilCharacter character="pip" mood="thinking" />}
    title='No results for "Lisbn"'
    description="Check the spelling, or search for a country instead of a city."
/>
```

## Examples

### No search results

Explain how someone can recover. Connect the button to your filter state in a real application.

```html preview full
<div class="bk-empty">
    <span class="bk-empty-icon">
        <svg
            class="bk-icon"
            aria-hidden="true"
        >
            <use href="#i-search" />
        </svg>
    </span>
    <h4 class="bk-empty-title">No matching projects</h4>
    <p class="bk-empty-description">
        Try a shorter name or remove a filter to see more projects.
    </p>
    <div class="bk-empty-actions">
        <button
            class="bk-button"
            data-variant="outline"
            type="button"
            data-bk-toast='{"title":"Filter preview","description":"Reset your application filters here."}'
        >
            Preview filter reset
        </button>
    </div>
</div>
```

### All caught up

An empty state can confirm a good outcome without adding an unnecessary action.

```html preview full
<div class="bk-empty">
    <span class="bk-empty-icon">
        <svg
            class="bk-icon"
            aria-hidden="true"
        >
            <use href="#i-check-circle" />
        </svg>
    </span>
    <h4 class="bk-empty-title">You’re all caught up</h4>
    <p class="bk-empty-description">
        New notifications will appear here when your team shares an update.
    </p>
</div>
```

## API

<!-- props: EmptyProps -->

## Writing it

- Title: what's missing ("No trips yet"), not "Nothing here".
- Description: what will show up here and how to get there.
- One primary action. Use a second outline button only for a real alternative.
