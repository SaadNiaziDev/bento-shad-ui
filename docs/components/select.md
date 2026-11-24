---
title: Select
description: A styled native select. The most reliable choice on phones, with screen readers and in forms.
group: Forms
---

```html preview
<div
    class="bk-field"
    style="width: 280px"
>
    <label
        class="bk-label"
        for="sl-dest"
    >
        Destination
    </label>
    <select
        class="bk-select"
        id="sl-dest"
    >
        <optgroup label="Portugal">
            <option>Lisbon</option>
            <option>Porto</option>
        </optgroup>
        <optgroup label="Spain">
            <option>Madrid</option>
            <option>Seville</option>
        </optgroup>
    </select>
</div>
```

## Usage

```tsx
import { Field, Select } from 'bento-shad-ui/react';

<Field label="Destination">
    <Select
        value={city}
        onChange={(e) => setCity(e.target.value)}
    >
        <optgroup label="Portugal">
            <option>Lisbon</option>
            <option>Porto</option>
        </optgroup>
    </Select>
</Field>;
```

The open list is the operating system's own picker, so it works with touch, keyboard and screen readers everywhere. For a searchable list, use a [Command](command.md) inside a [Popover](popover.md).

## API

<!-- props: SelectProps -->
