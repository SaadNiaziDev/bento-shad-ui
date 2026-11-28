---
title: Timeline
description: A vertical list of events with markers, times and optional icons, for activity and history.
group: Data display
---

```html preview
<ol
    class="bk-timeline"
    style="max-width: 380px"
>
    <li
        class="bk-timeline-item"
        data-tone="success"
    >
        <span
            class="bk-timeline-marker"
            aria-hidden="true"
        >
            <svg
                class="bk-icon"
                aria-hidden="true"
            >
                <use href="#i-check" />
            </svg>
        </span>
        <div class="bk-timeline-content">
            <div class="bk-timeline-head">
                <p class="bk-timeline-title">Booking confirmed</p>
                <time
                    class="bk-timeline-time"
                    datetime="2026-03-02T09:30"
                >
                    2 Mar, 09:30
                </time>
            </div>
            <p class="bk-timeline-description">Hotel Lisboa Plaza, 4 nights.</p>
        </div>
    </li>
    <li class="bk-timeline-item">
        <span
            class="bk-timeline-marker"
            aria-hidden="true"
        ></span>
        <div class="bk-timeline-content">
            <div class="bk-timeline-head">
                <p class="bk-timeline-title">Mira joined the trip</p>
                <time
                    class="bk-timeline-time"
                    datetime="2026-03-03T14:05"
                >
                    3 Mar, 14:05
                </time>
            </div>
        </div>
    </li>
    <li
        class="bk-timeline-item"
        data-tone="warning"
    >
        <span
            class="bk-timeline-marker"
            aria-hidden="true"
        >
            <svg
                class="bk-icon"
                aria-hidden="true"
            >
                <use href="#i-clock" />
            </svg>
        </span>
        <div class="bk-timeline-content">
            <div class="bk-timeline-head">
                <p class="bk-timeline-title">Flight time changed</p>
                <time
                    class="bk-timeline-time"
                    datetime="2026-03-05T18:40"
                >
                    5 Mar, 18:40
                </time>
            </div>
            <p class="bk-timeline-description">
                TP 1351 now departs at 07:55 instead of 07:20.
            </p>
        </div>
    </li>
</ol>
```

## Usage

```tsx
import { Timeline, TimelineItem } from 'bento-shad-ui/react';
import { Check } from 'lucide-react';

<Timeline>
    <TimelineItem
        title="Booking confirmed"
        time="2 Mar, 09:30"
        dateTime="2026-03-02T09:30"
        tone="success"
        icon={<Check />}
    >
        Hotel Lisboa Plaza, 4 nights.
    </TimelineItem>
    <TimelineItem
        title="Mira joined the trip"
        time="3 Mar, 14:05"
    />
</Timeline>;
```

Items without an icon get a dot. `tone` takes `brand`, `success`, `warning`, `destructive` or `info`; use it for the events that matter, not on every item.

## API

<!-- props: TimelineItemProps -->

`Timeline` is an `<ol>` and accepts its attributes.

## Accessibility

- The timeline is an ordered list, and each time is a `<time>` with a machine-readable `datetime`.
- Markers and icons are decorative. A tone colours the marker only, so put anything important, such as "cancelled", in the title.
