---
title: Empty state
description: What to show when there's nothing yet. Say what will appear here and how to add the first item.
group: Feedback
---

```html preview full
<div class="bk-empty">
  <span class="bk-empty-icon"><svg class="bk-icon" data-size="lg" aria-hidden="true"><use href="#i-plane"/></svg></span>
  <h4 class="bk-empty-title">No trips yet</h4>
  <p class="bk-empty-description">Trips you plan or get invited to show up here. Start with a city and dates.</p>
  <div class="bk-empty-actions"><button class="bk-button" type="button"><svg class="bk-icon" aria-hidden="true"><use href="#i-plus"/></svg>Plan a trip</button><button class="bk-button" data-variant="outline" type="button">Import booking</button></div>
</div>
```

## Usage

```tsx
import { Empty, Button } from 'bento-shad-ui/react';
import { Plane, Plus } from 'lucide-react';

<Empty
  icon={<Plane />}
  title="No trips yet"
  description="Trips you plan or get invited to show up here. Start with a city and dates."
  actions={<Button><Plus />Plan a trip</Button>}
/>
```

## API

<!-- props: EmptyProps -->

## Writing it

- Title: what's missing ("No trips yet"), not "Nothing here".
- Description: what will show up here and how to get there.
- One primary action. Use a second outline button only for a real alternative.
