---
title: Progress
description: Linear progress bars in three tones, and a ring for a single percentage.
group: Data display
---

```html preview
<div class="bk-row" style="--gap: 28px">
  <div class="bk-stack" style="width: 260px; --gap: 14px">
    <div class="bk-progress" role="progressbar" aria-label="Packing list" aria-valuenow="68" aria-valuemin="0" aria-valuemax="100"><span style="--v: 68%"></span></div>
    <div class="bk-progress" data-tone="brand" role="progressbar" aria-label="Upload" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"><span style="--v: 40%"></span></div>
    <div class="bk-progress" data-tone="success" role="progressbar" aria-label="Done" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"><span style="--v: 100%"></span></div>
  </div>
  <div class="bk-ring" style="--p: 71" role="img" aria-label="71% of budget used"><span aria-hidden="true">71%</span></div>
</div>
```

## Usage

```tsx
import { Progress, Ring } from 'bento-shad-ui/react';

<Progress value={17} max={25} label="Packing list" />
<Progress value={uploaded} tone="brand" label="Upload" />
<Ring value={71} size={64} label="71% of budget used" />
```

## API

### Progress

<!-- props: ProgressProps -->

### Ring

<!-- props: RingProps -->

## Accessibility

- `Progress` sets `role="progressbar"` with `aria-valuenow`, `aria-valuemin` and `aria-valuemax`; `label` names it.
- `Ring` is a picture of one number: its `label` should state that number and what it means.
