---
title: Table
description: A data table that scrolls sideways inside its wrapper on narrow screens, with tabular numbers.
group: Data display
---

```html preview full
<div class="bk-table-wrap">
    <table class="bk-table">
        <thead>
            <tr>
                <th>Guest</th>
                <th>Trip</th>
                <th>Status</th>
                <th data-align="end">Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Maya Kim</td>
                <td>Lisbon</td>
                <td>
                    <span
                        class="bk-badge"
                        data-variant="success"
                    >
                        Paid
                    </span>
                </td>
                <td data-align="end">€640.00</td>
            </tr>
            <tr>
                <td>Jonas Ruiz</td>
                <td>Porto</td>
                <td>
                    <span
                        class="bk-badge"
                        data-variant="warning"
                    >
                        Pending
                    </span>
                </td>
                <td data-align="end">€410.00</td>
            </tr>
            <tr>
                <td>Amira Saleh</td>
                <td>Seville</td>
                <td>
                    <span
                        class="bk-badge"
                        data-variant="outline"
                    >
                        Draft
                    </span>
                </td>
                <td data-align="end">€385.50</td>
            </tr>
        </tbody>
        <caption>3 bookings this week</caption>
    </table>
</div>
```

## Usage

```tsx
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
} from 'bento-shad-ui/react';

<Table>
    <TableHeader>
        <TableRow>
            <TableHead>Guest</TableHead>
            <TableHead align="end">Amount</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {rows.map((r) => (
            <TableRow key={r.id}>
                <TableCell>{r.guest}</TableCell>
                <TableCell align="end">{r.amount}</TableCell>
            </TableRow>
        ))}
    </TableBody>
    <TableCaption>3 bookings this week</TableCaption>
</Table>;
```

For sorting, filtering and paging, drive these parts from a headless table library such as TanStack Table, and add [Pagination](pagination.md).

## Examples

### Team directory

Combine avatars, role labels and status badges while keeping real column headings. On narrow screens, the table scrolls inside its wrapper.

```html preview full
<div class="bk-table-wrap">
    <table class="bk-table">
        <caption>Example workspace members</caption>
        <thead>
            <tr>
                <th scope="col">Member</th>
                <th scope="col">Role</th>
                <th scope="col">Status</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <div class="bk-row">
                        <span
                            class="bk-avatar"
                            aria-hidden="true"
                        >
                            SK
                        </span>
                        <span>Sam Khan</span>
                    </div>
                </td>
                <td>Owner</td>
                <td>
                    <span
                        class="bk-badge"
                        data-variant="success"
                    >
                        Active
                    </span>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="bk-row">
                        <span
                            class="bk-avatar"
                            aria-hidden="true"
                        >
                            AL
                        </span>
                        <span>Alex Lee</span>
                    </div>
                </td>
                <td>Editor</td>
                <td>
                    <span
                        class="bk-badge"
                        data-variant="success"
                    >
                        Active
                    </span>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="bk-row">
                        <span
                            class="bk-avatar"
                            aria-hidden="true"
                        >
                            NK
                        </span>
                        <span>Noor Khan</span>
                    </div>
                </td>
                <td>Viewer</td>
                <td>
                    <span
                        class="bk-badge"
                        data-variant="outline"
                    >
                        Invited
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

### Empty results

Keep the table headings visible and span the empty row across every column. Filtering logic belongs to your application.

```html preview full
<div class="bk-table-wrap">
    <table class="bk-table">
        <caption>Search results for archived invoices</caption>
        <thead>
            <tr>
                <th scope="col">Invoice</th>
                <th scope="col">Customer</th>
                <th
                    scope="col"
                    data-align="end"
                >
                    Amount
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="3">
                    <div class="bk-empty">
                        <h4 class="bk-empty-title">No invoices found</h4>
                        <p class="bk-empty-description">
                            Try a different customer name or date range.
                        </p>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

## API

### Table

<!-- props: TableProps -->

### TableHead and TableCell

<!-- props: TableCellProps -->

`TableHeader`, `TableBody`, `TableFooter`, `TableRow` and `TableCaption` render their elements unchanged.

## Accessibility

- Use `TableHead` (`<th scope="col">`) for column headers and a `TableCaption` that says what the table shows.
- Right-align numbers with `align="end"` so digits line up.
