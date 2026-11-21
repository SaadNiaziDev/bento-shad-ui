---
title: Pagination
description: Move through pages of a long list, with first, last and nearby pages always visible.
group: Navigation
---

```html preview
<nav class="bk-pagination" aria-label="Pagination">
  <a class="bk-pagination-link" href="#" aria-label="Previous page"><svg class="bk-icon" aria-hidden="true"><use href="#i-chevron-left"/></svg></a>
  <a class="bk-pagination-link" href="#">1</a>
  <span class="bk-pagination-ellipsis" aria-hidden="true">…</span>
  <a class="bk-pagination-link" href="#">5</a>
  <a class="bk-pagination-link" href="#" aria-current="page">6</a>
  <a class="bk-pagination-link" href="#">7</a>
  <span class="bk-pagination-ellipsis" aria-hidden="true">…</span>
  <a class="bk-pagination-link" href="#">20</a>
  <a class="bk-pagination-link" href="#" aria-label="Next page"><svg class="bk-icon" aria-hidden="true"><use href="#i-chevron-right"/></svg></a>
</nav>
```

## Usage

```tsx
import { Pagination, getPaginationRange } from 'bento-shad-ui/react';

<Pagination page={page} pageCount={20} onPageChange={setPage} />

// Server-rendered lists: real links
<Pagination page={page} pageCount={20} getHref={(p) => `?page=${p}`} />

getPaginationRange(6, 20); // [1, 'ellipsis', 5, 6, 7, 'ellipsis', 20]
```

## API

<!-- props: PaginationProps -->

## Accessibility

- The current page has `aria-current="page"`; each number has a label such as "Page 6".
- Previous and Next are disabled at the ends rather than hidden, so the layout doesn't shift.
