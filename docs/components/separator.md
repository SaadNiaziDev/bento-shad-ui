---
title: Separator
description: A thin horizontal or vertical rule between groups of content.
group: Layout
---

```html preview
<div class="bk-stack" style="width: 300px">
  <span class="bk-small">Itinerary</span>
  <hr class="bk-separator">
  <div class="bk-row" style="--gap: 12px; height: 20px"><span class="bk-muted">Day 1</span><hr class="bk-separator" data-orientation="vertical"><span class="bk-muted">Day 2</span><hr class="bk-separator" data-orientation="vertical"><span class="bk-muted">Day 3</span></div>
</div>
```

## Usage

```tsx
import { Separator } from 'bento-shad-ui/react';

<Separator />
<Separator orientation="vertical" />
```

## API

<!-- props: SeparatorProps -->

| HTML | Effect |
|---|---|
| `<hr class="bk-separator">` | Horizontal |
| `<hr class="bk-separator" data-orientation="vertical">` | Vertical, stretches to the row height |
