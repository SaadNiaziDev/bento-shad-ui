---
title: Stat
description: A key number with its label, a change versus a previous period, and an optional sparkline.
group: Data display
---

```html preview
<div
    class="bk-tile"
    style="width: 300px"
>
    <div class="bk-stat">
        <span class="bk-stat-label">Bookings this month</span>
        <span class="bk-stat-value">1,284</span>
        <span
            class="bk-stat-delta"
            data-trend="up"
        >
            +12.4% vs February
        </span>
    </div>
    <svg
        class="bk-spark"
        viewBox="0 0 100 32"
        preserveAspectRatio="none"
        role="img"
        aria-label="Bookings rose from 12 to 31 a day over the week"
    >
        <polygon
            points="0,30 16.67,21.16 33.33,25.58 50,15.26 66.67,19.68 83.33,7.89 100,2 100,32 0,32"
        />
        <polyline
            points="0,30 16.67,21.16 33.33,25.58 50,15.26 66.67,19.68 83.33,7.89 100,2"
        />
        <circle
            cx="100"
            cy="2"
            r="2.5"
        />
    </svg>
</div>
```

## Usage

```tsx
import { Stat, Sparkline } from 'bento-shad-ui/react';

<Stat
    label="Bookings this month"
    value="1,284"
    delta="+12.4% vs February"
    trend="up"
    icon={<Calendar />}
/>
<Sparkline
    data={[12, 18, 15, 22, 19, 27, 31]}
    label="Bookings rose from 12 to 31 a day over the week"
/>
```

`Sparkline` scales the line to the data's own minimum and maximum. `sparklinePoints(data, width, height, padding)` returns the coordinates if you draw your own.

## Examples

### A balanced metric row

A bento grid stacks the metrics automatically when its container becomes narrow. Include the direction and comparison period in the text, not only the colour.

```html preview full
<div class="bk-bento">
    <div class="bk-bento-grid">
        <article class="bk-tile bk-span-2">
            <div class="bk-stat">
                <span class="bk-stat-label">Monthly revenue</span>
                <span class="bk-stat-value">$24,680</span>
                <span
                    class="bk-stat-delta"
                    data-trend="up"
                >
                    +18.6% vs last month
                </span>
            </div>
        </article>
        <article class="bk-tile bk-span-2">
            <div class="bk-stat">
                <span class="bk-stat-label">Cancelled subscriptions</span>
                <span class="bk-stat-value">18</span>
                <span
                    class="bk-stat-delta"
                    data-trend="down"
                >
                    −6 vs last month
                </span>
            </div>
        </article>
    </div>
</div>
```

### A quiet summary

Omit the trend when a comparison would not be meaningful.

```html preview
<article
    class="bk-card"
    style="width: 100%; max-width: 340px"
>
    <div class="bk-card-content">
        <div class="bk-stat">
            <span class="bk-stat-label">Available storage</span>
            <span class="bk-stat-value">84 GB</span>
            <span class="bk-caption">Of 100 GB on your current plan</span>
        </div>
    </div>
</article>
```

## API

### Stat

<!-- props: StatProps -->

### Sparkline

<!-- props: SparklineProps -->

## Accessibility

- `trend` only changes colour; write the direction in `delta` ("+12.4%", "−3 pts").
- `Sparkline` requires `label`: describe what the line shows, because the shape alone is invisible to screen readers.
