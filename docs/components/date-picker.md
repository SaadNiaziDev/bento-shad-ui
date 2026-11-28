---
title: Date picker
description: A field that opens a calendar to pick a date or a range. In plain HTML, a styled native date input.
group: Forms
---

```html preview
<div
    class="bk-field"
    style="width: 280px"
>
    <label
        class="bk-label"
        for="dp-departure"
    >
        Departure
    </label>
    <input
        class="bk-input"
        type="date"
        id="dp-departure"
        name="departure"
        value="2026-03-12"
        min="2026-01-01"
    />
</div>
```

This preview is the HTML version: a native date input with the kit's field styles. The browser supplies the calendar, the keyboard handling and the date format for the reader's language. The React `DatePicker` below opens the kit's own [Calendar](calendar.md) instead. This site doesn't run React, so it has no live preview here.

## Usage

```tsx
import { DatePicker, Field, type DateRange } from 'bento-shad-ui/react';

const [departure, setDeparture] = useState<Date | null>(null);

<Field label="Departure">
    <DatePicker
        value={departure}
        onValueChange={setDeparture}
        clearable
    />
</Field>;

const [trip, setTrip] = useState<DateRange | null>(null);

<Field label="Trip dates">
    <DatePicker
        mode="range"
        value={trip}
        onValueChange={setTrip}
        placeholder="Pick dates"
    />
</Field>;
```

The button shows the date in the reader's locale ("12 Mar 2026", or "12–16 Mar 2026" for a range). Picking a day closes the panel and returns focus to the button; in a range, the panel closes after the end day.

### HTML

```html
<input
    class="bk-input"
    type="date"
    name="departure"
    min="2026-01-01"
/>
```

`min`, `max` and `required` work as usual, and the form receives `YYYY-MM-DD`. For a range, use two inputs. The browser doesn't link them, so set the second one's `min` from the first in your own script if you need to.

## Examples

### Unavailable days

`isDisabled` greys out days that can't be booked, here weekends and the past. They stay reachable with the arrow keys and are announced as unavailable.

```tsx
const startOfToday = new Date(new Date().setHours(0, 0, 0, 0));

<DatePicker
    value={day}
    onValueChange={setDay}
    isDisabled={(d) => d < startOfToday || d.getDay() === 0 || d.getDay() === 6}
/>;
```

### Sending it with a form

`name` adds a hidden input with the date as `YYYY-MM-DD` in local time. A range sends two inputs with that name: the start, then the end.

```tsx
<form action="/bookings">
    <DatePicker
        mode="range"
        name="stay"
        defaultValue={{
            from: new Date(2026, 2, 12),
            to: new Date(2026, 2, 16),
        }}
    />
</form>;
// submits stay=2026-03-12&stay=2026-03-16
```

### A range in HTML

```html preview
<div
    class="bk-form-row"
    style="width: 100%; max-width: 420px"
>
    <div class="bk-field">
        <label
            class="bk-label"
            for="dp-in"
        >
            Check-in
        </label>
        <input
            class="bk-input"
            type="date"
            id="dp-in"
            value="2026-03-12"
        />
    </div>
    <div class="bk-field">
        <label
            class="bk-label"
            for="dp-out"
        >
            Check-out
        </label>
        <input
            class="bk-input"
            type="date"
            id="dp-out"
            value="2026-03-16"
            min="2026-03-12"
        />
    </div>
</div>
```

## API

<!-- props: DatePickerProps -->

`formatDateValue(value, locale, options)` writes a date or range the same way the button does.

## Accessibility

- The button has `aria-haspopup="dialog"` and `aria-expanded`. Inside a `Field`, its name is the label followed by the chosen date ("Departure, 12 Mar 2026").
- Opening the panel moves focus to the chosen day, or today. The keys are the [Calendar](calendar.md)'s. Esc or a click outside closes it and focus returns to the button.
- A button can't stop a form from submitting, so `required` only sets `aria-required`. Check the value before you submit.
- The native date input in HTML is accessible and localised by the browser. Its look inside the open picker differs between browsers.
