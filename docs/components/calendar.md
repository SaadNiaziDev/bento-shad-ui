---
title: Calendar
description: Month calendar for picking one day or a range, with keyboard navigation and localised names.
group: Forms
---

```html preview
<div
    class="bk-calendar"
    data-mode="range"
    aria-label="March 2026"
>
    <div class="bk-calendar-head">
        <button
            class="bk-button"
            data-variant="ghost"
            data-size="icon-sm"
            type="button"
            aria-label="Previous month"
        >
            <svg
                class="bk-icon"
                aria-hidden="true"
            >
                <use href="#i-chevron-left" />
            </svg>
        </button>
        <span class="bk-calendar-title">March 2026</span>
        <button
            class="bk-button"
            data-variant="ghost"
            data-size="icon-sm"
            type="button"
            aria-label="Next month"
        >
            <svg
                class="bk-icon"
                aria-hidden="true"
            >
                <use href="#i-chevron-right" />
            </svg>
        </button>
    </div>
    <div class="bk-calendar-grid">
        <span class="bk-calendar-weekday">Mo</span>
        <span class="bk-calendar-weekday">Tu</span>
        <span class="bk-calendar-weekday">We</span>
        <span class="bk-calendar-weekday">Th</span>
        <span class="bk-calendar-weekday">Fr</span>
        <span class="bk-calendar-weekday">Sa</span>
        <span class="bk-calendar-weekday">Su</span>
        <button
            class="bk-calendar-day"
            data-outside
            tabindex="-1"
        >
            23
        </button>
        <button
            class="bk-calendar-day"
            data-outside
            tabindex="-1"
        >
            24
        </button>
        <button
            class="bk-calendar-day"
            data-outside
            tabindex="-1"
        >
            25
        </button>
        <button
            class="bk-calendar-day"
            data-outside
            tabindex="-1"
        >
            26
        </button>
        <button
            class="bk-calendar-day"
            data-outside
            tabindex="-1"
        >
            27
        </button>
        <button
            class="bk-calendar-day"
            data-outside
            tabindex="-1"
        >
            28
        </button>
        <button class="bk-calendar-day">1</button>
        <button class="bk-calendar-day">2</button>
        <button class="bk-calendar-day">3</button>
        <button class="bk-calendar-day">4</button>
        <button class="bk-calendar-day">5</button>
        <button class="bk-calendar-day">6</button>
        <button class="bk-calendar-day">7</button>
        <button class="bk-calendar-day">8</button>
        <button
            class="bk-calendar-day"
            data-today
        >
            9
        </button>
        <button class="bk-calendar-day">10</button>
        <button class="bk-calendar-day">11</button>
        <button
            class="bk-calendar-day"
            data-range="start"
            aria-selected="true"
        >
            12
        </button>
        <button
            class="bk-calendar-day"
            data-range="middle"
        >
            13
        </button>
        <button
            class="bk-calendar-day"
            data-range="middle"
        >
            14
        </button>
        <button
            class="bk-calendar-day"
            data-range="middle"
        >
            15
        </button>
        <button
            class="bk-calendar-day"
            data-range="end"
            aria-selected="true"
        >
            16
        </button>
        <button class="bk-calendar-day">17</button>
        <button class="bk-calendar-day">18</button>
        <button class="bk-calendar-day">19</button>
        <button class="bk-calendar-day">20</button>
        <button class="bk-calendar-day">21</button>
        <button class="bk-calendar-day">22</button>
        <button class="bk-calendar-day">23</button>
        <button class="bk-calendar-day">24</button>
        <button class="bk-calendar-day">25</button>
        <button class="bk-calendar-day">26</button>
        <button class="bk-calendar-day">27</button>
        <button class="bk-calendar-day">28</button>
        <button class="bk-calendar-day">29</button>
        <button class="bk-calendar-day">30</button>
        <button class="bk-calendar-day">31</button>
        <button
            class="bk-calendar-day"
            data-outside
            tabindex="-1"
        >
            1
        </button>
        <button
            class="bk-calendar-day"
            data-outside
            tabindex="-1"
        >
            2
        </button>
        <button
            class="bk-calendar-day"
            data-outside
            tabindex="-1"
        >
            3
        </button>
        <button
            class="bk-calendar-day"
            data-outside
            tabindex="-1"
        >
            4
        </button>
        <button
            class="bk-calendar-day"
            data-outside
            tabindex="-1"
        >
            5
        </button>
    </div>
</div>
```

Click two days to pick a range. The HTML version is static markup that the script makes selectable; the React component also builds the month and moves between months.

## Usage

```tsx
import { Calendar, type DateRange } from 'bento-shad-ui/react';

const [range, setRange] = useState<DateRange | null>(null);

<Calendar mode="range" value={range} onValueChange={setRange} />

<Calendar
    defaultValue={new Date()}
    isDisabled={(d) => d < startOfToday}
    weekStartsOn={0}
    locale="pt-PT"
/>
```

Helpers for building your own views: `getMonthGrid(year, month, weekStartsOn)` returns the 42 days of a month (6 weeks, with outside days), `toDateKey(date)` gives `YYYY-MM-DD` in local time, and `isSameDay(a, b)` compares dates.

## API

<!-- props: CalendarProps -->

In HTML, `data-mode="range"` enables range picking and the calendar fires `bk:change` with `{ start, end }` day numbers.

## Accessibility

- Arrow keys move by day (←/→) and week (↑/↓); Enter or Space picks.
- Each day has a full label ("Thursday 12 March 2026") and `aria-pressed` when selected.
- The month title is a live region, so month changes are announced.
