---
title: Data list
description: Labelled values such as booking details or an account summary, as a description list.
group: Data display
---

```html preview
<dl
    class="bk-data-list"
    style="width: 100%; max-width: 420px"
>
    <div class="bk-data-list-item">
        <dt>Booking</dt>
        <dd>LIS-48213</dd>
    </div>
    <div class="bk-data-list-item">
        <dt>Guest</dt>
        <dd>Mira Okafor</dd>
    </div>
    <div class="bk-data-list-item">
        <dt>Dates</dt>
        <dd>12–16 March 2026 · 4 nights</dd>
    </div>
    <div class="bk-data-list-item">
        <dt>Status</dt>
        <dd>
            <span
                class="bk-badge"
                data-variant="success"
                data-dot
            >
                Paid
            </span>
        </dd>
    </div>
</dl>
```

Use a data list for a few labelled facts about one thing. For many things with the same fields, use a [Table](table.md).

## Usage

```tsx
import { Badge, DataList, DataListItem } from 'bento-shad-ui/react';

<DataList>
    <DataListItem label="Booking">LIS-48213</DataListItem>
    <DataListItem label="Guest">Mira Okafor</DataListItem>
    <DataListItem label="Status">
        <Badge
            variant="success"
            dot
        >
            Paid
        </Badge>
    </DataListItem>
</DataList>;
```

## Examples

### Vertical

`data-orientation="vertical"` (`orientation="vertical"` in React) puts each label above its value, which suits narrow tiles and long values.

```html preview
<dl
    class="bk-data-list"
    data-orientation="vertical"
    style="width: 260px"
>
    <div class="bk-data-list-item">
        <dt>Billing address</dt>
        <dd>Rua Augusta 24, 1100-053 Lisboa, Portugal</dd>
    </div>
    <div class="bk-data-list-item">
        <dt>VAT number</dt>
        <dd>PT 509 123 456</dd>
    </div>
</dl>
```

## API

<!-- props: DataListProps -->

<!-- props: DataListItemProps -->

## Accessibility

- It renders a `<dl>` with `<dt>` and `<dd>` pairs, so screen readers announce each label with its value.
- Long values wrap instead of overflowing, including unbroken strings such as IDs.
