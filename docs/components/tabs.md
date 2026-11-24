---
title: Tabs
description: Switch between views in one place. Pill and underline styles, with full keyboard support.
group: Navigation
---

```html preview
<div
    data-bk-tabs
    style="width: 340px"
>
    <div
        class="bk-tabs-list"
        role="tablist"
        aria-label="Itinerary view"
    >
        <button
            class="bk-tabs-trigger"
            role="tab"
            type="button"
            aria-controls="tb-day"
        >
            Day
        </button>
        <button
            class="bk-tabs-trigger"
            role="tab"
            type="button"
            aria-controls="tb-week"
            aria-selected="true"
        >
            Week
        </button>
        <button
            class="bk-tabs-trigger"
            role="tab"
            type="button"
            aria-controls="tb-month"
        >
            Month
        </button>
    </div>
    <div
        class="bk-tabs-content"
        role="tabpanel"
        id="tb-day"
        hidden
    >
        <span class="bk-num">3</span>
        <span class="bk-muted">activities today</span>
    </div>
    <div
        class="bk-tabs-content"
        role="tabpanel"
        id="tb-week"
    >
        <span class="bk-num">7</span>
        <span class="bk-muted">activities this week</span>
    </div>
    <div
        class="bk-tabs-content"
        role="tabpanel"
        id="tb-month"
        hidden
    >
        <span class="bk-num">22</span>
        <span class="bk-muted">activities in March</span>
    </div>
</div>
```

## Usage

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'bento-shad-ui/react';

<Tabs defaultValue="week">
    <TabsList aria-label="Itinerary view">
        <TabsTrigger value="day">Day</TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
    </TabsList>
    <TabsContent value="day">…</TabsContent>
    <TabsContent value="week">…</TabsContent>
</Tabs>;
```

## Examples

### Underline style

```html preview
<div
    data-bk-tabs
    style="width: 340px"
>
    <div
        class="bk-tabs-list"
        data-variant="line"
        role="tablist"
        aria-label="Trip sections"
    >
        <button
            class="bk-tabs-trigger"
            role="tab"
            type="button"
            aria-controls="tl-a"
            aria-selected="true"
        >
            Itinerary
        </button>
        <button
            class="bk-tabs-trigger"
            role="tab"
            type="button"
            aria-controls="tl-b"
        >
            Bookings
        </button>
        <button
            class="bk-tabs-trigger"
            role="tab"
            type="button"
            aria-controls="tl-c"
        >
            Notes
        </button>
    </div>
    <div
        class="bk-tabs-content bk-muted"
        role="tabpanel"
        id="tl-a"
    >
        4 days, 11 stops.
    </div>
    <div
        class="bk-tabs-content bk-muted"
        role="tabpanel"
        id="tl-b"
        hidden
    >
        2 flights, 1 hotel.
    </div>
    <div
        class="bk-tabs-content bk-muted"
        role="tabpanel"
        id="tl-c"
        hidden
    >
        3 notes from 2 people.
    </div>
</div>
```

```tsx

<TabsList variant="line">…</TabsList>
<TabsList full>…</TabsList> {/* triggers fill the width */}
```

## API

### Tabs

<!-- props: TabsProps -->

### TabsList

<!-- props: TabsListProps -->

### TabsTrigger

<!-- props: TabsTriggerProps -->

### TabsContent

<!-- props: TabsContentProps -->

### HTML

Wrap the list and panels in `[data-bk-tabs]`. Each `role="tab"` button points at its panel with `aria-controls`; the script handles selection and keys.

## Accessibility

- ←/→ move between tabs and select them, Home and End jump to the ends. Only the selected tab is in the Tab order.
- Tabs and panels are linked with `aria-controls` and `aria-labelledby`.
