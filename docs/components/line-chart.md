---
title: Line chart
description: Lines over shared labels, with a value readout under the pointer or the arrow keys and a hidden data table.
group: Data display
---

```html preview
<figure
    class="bk-line-chart"
    style="width: 100%; max-width: 520px; --h: 200px; --y-chars: 5"
>
    <div class="bk-line-chart-body">
        <div
            class="bk-line-chart-y"
            aria-hidden="true"
        >
            <span style="--y: 0%">0</span>
            <span style="--y: 25%">500</span>
            <span style="--y: 50%">1,000</span>
            <span style="--y: 75%">1,500</span>
            <span style="--y: 100%">2,000</span>
        </div>
        <div
            class="bk-line-chart-plot"
            role="img"
            aria-label="Bookings per month, first half of 2026"
        >
            <span
                class="bk-line-chart-gridline"
                style="--y: 0%"
            ></span>
            <span
                class="bk-line-chart-gridline"
                style="--y: 25%"
            ></span>
            <span
                class="bk-line-chart-gridline"
                style="--y: 50%"
            ></span>
            <span
                class="bk-line-chart-gridline"
                style="--y: 75%"
            ></span>
            <span
                class="bk-line-chart-gridline"
                style="--y: 100%"
            ></span>
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
            >
                <path
                    class="bk-line-chart-line"
                    d="M0 59 L20 53.4 L40 54.95 L60 35.5 L80 33.5 L100 24"
                    style="--c: var(--chart-1)"
                ></path>
                <path
                    class="bk-line-chart-line"
                    d="M0 98 L20 97.4 L40 98.45 L60 96.8 L80 96.5 L100 97.1"
                    style="--c: var(--chart-2)"
                ></path>
            </svg>
        </div>
        <div
            class="bk-line-chart-x"
            aria-hidden="true"
        >
            <span
                style="--x: 0%"
                data-edge="start"
            >
                Jan
            </span>
            <span style="--x: 20%">Feb</span>
            <span style="--x: 40%">Mar</span>
            <span style="--x: 60%">Apr</span>
            <span style="--x: 80%">May</span>
            <span
                style="--x: 100%"
                data-edge="end"
            >
                Jun
            </span>
        </div>
    </div>
    <div class="bk-legend">
        <span style="--c: var(--chart-1)">Bookings</span>
        <span style="--c: var(--chart-2)">Cancellations</span>
    </div>
    <table class="bk-sr-only">
        <caption>Bookings per month, first half of 2026</caption>
        <thead>
            <tr>
                <td></td>
                <th scope="col">Bookings</th>
                <th scope="col">Cancellations</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">Jan</th>
                <td>820</td>
                <td>40</td>
            </tr>
            <tr>
                <th scope="row">Feb</th>
                <td>932</td>
                <td>52</td>
            </tr>
            <tr>
                <th scope="row">Mar</th>
                <td>901</td>
                <td>31</td>
            </tr>
            <tr>
                <th scope="row">Apr</th>
                <td>1,290</td>
                <td>64</td>
            </tr>
            <tr>
                <th scope="row">May</th>
                <td>1,330</td>
                <td>70</td>
            </tr>
            <tr>
                <th scope="row">Jun</th>
                <td>1,520</td>
                <td>58</td>
            </tr>
        </tbody>
    </table>
</figure>
```

This preview is the markup `LineChart` renders on the server, without the Tab stop that only React makes work. It shows without JavaScript, but the value readout needs React: in an app, rest the pointer on the chart or focus it and press ← and →.

## Usage

```tsx
import { LineChart } from 'bento-shad-ui/react';

<LineChart
    label="Bookings per month, first half of 2026"
    labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
    series={[
        { label: 'Bookings', data: [820, 932, 901, 1290, 1330, 1520] },
        { label: 'Cancellations', data: [40, 52, 31, 64, 70, 58] },
    ]}
/>;
```

Lines are straight between points, and the scale starts at 0 for positive data, so changes aren't exaggerated. Lines take `--chart-1` to `--chart-5` in order; set `color` on a series to change one. A `null` value leaves a gap instead of a misleading straight line.

### HTML

`LineChart` is a React component, but it renders on the server: `renderToStaticMarkup` (or your framework's server rendering) gives HTML that shows the chart with `bento.css` and no script. To draw lines yourself, `niceScale(low, high)` and `linePath(values, scale)` are exported from `bento-shad-ui`.

## Examples

### Area

```tsx
<LineChart
    label="Revenue per week"
    area
    height={140}
    labels={['W1', 'W2', 'W3', 'W4', 'W5', 'W6']}
    series={[{ label: 'Revenue', data: [12.4, 15.1, 14.2, 18.9, 21.3, 24.8] }]}
    formatValue={(v) => `€${v.toFixed(1)}k`}
/>;
```

`formatValue` is used on the axis, in the readout and in the data table, so numbers read the same everywhere.

For a single trend inside a stat, a [Sparkline](stat.md) is lighter. For comparing a few totals, use a [Bar chart](bar-chart.md).

## API

<!-- props: LineChartProps -->

## Accessibility

- A visually hidden table, captioned with `label`, holds every value. Screen readers can read it like any table.
- The plot can be focused. ← and → move the readout (Home and End jump to the ends) and announce the values, for example "Mar: Bookings 901, Cancellations 31".
- Series are named in the legend and the readout, not only by colour. The chart colours have not been checked for colour-blind contrast, so with several series, label them clearly or use `color` to pick colours you have checked.
- The pointer readout ignores touch scrolling (`touch-action: pan-y`), so the page still scrolls over the chart on phones.
