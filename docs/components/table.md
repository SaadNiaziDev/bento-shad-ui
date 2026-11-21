---
title: Table
description: A data table that scrolls sideways inside its wrapper on narrow screens, with tabular numbers.
group: Data display
---

```html preview full
<div class="bk-table-wrap">
  <table class="bk-table">
    <thead><tr><th>Guest</th><th>Trip</th><th>Status</th><th data-align="end">Amount</th></tr></thead>
    <tbody>
      <tr><td>Maya Kim</td><td>Lisbon</td><td><span class="bk-badge" data-variant="success">Paid</span></td><td data-align="end">€640.00</td></tr>
      <tr><td>Jonas Ruiz</td><td>Porto</td><td><span class="bk-badge" data-variant="warning">Pending</span></td><td data-align="end">€410.00</td></tr>
      <tr><td>Amira Saleh</td><td>Seville</td><td><span class="bk-badge" data-variant="outline">Draft</span></td><td data-align="end">€385.50</td></tr>
    </tbody>
    <caption>3 bookings this week</caption>
  </table>
</div>
```

## Usage

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from 'bento-shad-ui/react';

<Table>
  <TableHeader>
    <TableRow><TableHead>Guest</TableHead><TableHead align="end">Amount</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    {rows.map((r) => (
      <TableRow key={r.id}><TableCell>{r.guest}</TableCell><TableCell align="end">{r.amount}</TableCell></TableRow>
    ))}
  </TableBody>
  <TableCaption>3 bookings this week</TableCaption>
</Table>
```

For sorting, filtering and paging, drive these parts from a headless table library such as TanStack Table, and add [Pagination](pagination.md).

## API

### Table

<!-- props: TableProps -->

### TableHead and TableCell

<!-- props: TableCellProps -->

`TableHeader`, `TableBody`, `TableFooter`, `TableRow` and `TableCaption` render their elements unchanged.

## Accessibility

- Use `TableHead` (`<th scope="col">`) for column headers and a `TableCaption` that says what the table shows.
- Right-align numbers with `align="end"` so digits line up.
