---
title: Bar chart
description: A to-scale bar chart drawn with CSS, plus a meter for parts of a whole and a legend.
group: Data display
---

```html preview full
<div class="bk-chart" role="img" aria-label="Bookings per day: Mon 32, Tue 45, Wed 28, Thu 52, Fri 61, Sat 74, Sun 38">
  <div class="bk-bars">
    <div class="bk-bar" data-muted style="--v: 40%" data-value="32"></div>
    <div class="bk-bar" data-muted style="--v: 56.25%" data-value="45"></div>
    <div class="bk-bar" data-muted style="--v: 35%" data-value="28"></div>
    <div class="bk-bar" data-muted style="--v: 65%" data-value="52"></div>
    <div class="bk-bar" data-muted style="--v: 76.25%" data-value="61"></div>
    <div class="bk-bar" style="--v: 92.5%" data-value="74" data-show></div>
    <div class="bk-bar" data-muted style="--v: 47.5%" data-value="38"></div>
  </div>
  <div class="bk-bar-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
</div>
```

The scale tops out at 80, and gridlines mark 20, 40 and 60. Hover a bar to see its value.

## Usage

```tsx
import { BarChart } from 'bento-shad-ui/react';

<BarChart
  data={[{ label: 'Mon', value: 32 }, { label: 'Tue', value: 45 }, { label: 'Sat', value: 74 }]}
  max={80}
  formatValue={(v) => `${v} bookings`}
/>
```

`BarChart` computes each bar's height from `max` (or the largest value), emphasises the highest bar and writes an `aria-label` listing every value. `barHeights(data, max)` returns the percentages if you need them.

## Meter and legend

```html preview
<div class="bk-stack" style="width: 320px">
  <div class="bk-meter" role="img" aria-label="Stay 46%, travel 22%, food 12%, unspent 20%">
    <span style="--v: 46%; --c: var(--chart-1)"></span><span style="--v: 22%; --c: var(--chart-2)"></span><span style="--v: 12%; --c: var(--chart-3)"></span>
  </div>
  <div class="bk-legend"><span style="--c: var(--chart-1)">Stay 46%</span><span style="--c: var(--chart-2)">Travel 22%</span><span style="--c: var(--chart-3)">Food 12%</span><span style="--c: var(--muted)">Unspent 20%</span></div>
</div>
```

```tsx
import { Meter, Legend } from 'bento-shad-ui/react';

const parts = [
  { label: 'Stay', value: 46, color: 'var(--chart-1)' },
  { label: 'Travel', value: 22, color: 'var(--chart-2)' },
];
<Meter segments={parts} />
<Legend items={parts.map((p) => ({ label: `${p.label} ${p.value}%`, color: p.color }))} />
```

## API

### BarChart

<!-- props: BarChartProps -->

### Meter

<!-- props: MeterProps -->

For line, area or stacked charts, use a chart library (Recharts, Chart.js) with the `--chart-1` to `--chart-5` tokens so colours match both themes.

## Accessibility

- Charts render as `role="img"` with a text summary. Keep the summary specific: the values, not "a chart".
- Don't rely on colour alone to tell series apart; label them in a legend or in text.
