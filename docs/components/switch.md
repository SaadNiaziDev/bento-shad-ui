---
title: Switch
description: An on/off control for settings that apply immediately.
group: Forms
---

```html preview
<div
    class="bk-stack"
    style="width: 300px"
>
    <label class="bk-switch-row">
        <span class="bk-option-text">
            <span>Price alerts</span>
            <span>When a saved fare drops</span>
        </span>
        <input
            class="bk-switch"
            type="checkbox"
            role="switch"
            checked
        />
    </label>
    <label class="bk-switch-row">
        <span>Offline maps</span>
        <input
            class="bk-switch"
            type="checkbox"
            role="switch"
            data-tone="brand"
            checked
        />
    </label>
    <label class="bk-switch-row">
        <span>Share location</span>
        <input
            class="bk-switch"
            type="checkbox"
            role="switch"
        />
    </label>
</div>
```

## Usage

```tsx
import { Switch } from 'bento-shad-ui/react';

<Switch
    label="Price alerts"
    description="When a saved fare drops"
    checked={alerts}
    onCheckedChange={setAlerts}
/>
<Switch tone="brand" aria-label="Offline maps" />
```

With `label`, the switch sits at the end of a full-width clickable row.

## API

<!-- props: SwitchProps -->

## Accessibility

- It's a native checkbox with `role="switch"`, so screen readers announce "on" or "off". Space toggles it.
- Use a switch only for changes that take effect at once. Inside a form that needs saving, use a checkbox.
