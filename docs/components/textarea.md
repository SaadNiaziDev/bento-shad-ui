---
title: Textarea
description: Multi-line text input that resizes vertically.
group: Forms
---

```html preview
<div
    class="bk-field"
    style="width: 320px"
>
    <label
        class="bk-label"
        for="ta-notes"
    >
        Notes for the host
    </label>
    <textarea
        class="bk-textarea"
        id="ta-notes"
        placeholder="Arrival time, allergies, anything else"
    ></textarea>
    <p class="bk-field-description">Up to 500 characters.</p>
</div>
```

## Usage

```tsx
import { Field, Textarea } from 'bento-shad-ui/react';

<Field
    label="Notes for the host"
    description="Up to 500 characters."
>
    <Textarea maxLength={500} />
</Field>;
```

## API

<!-- props: TextareaProps -->

Minimum height 96px; `resize: vertical`.
