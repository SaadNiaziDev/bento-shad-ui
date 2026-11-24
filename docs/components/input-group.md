---
title: Input group
description: An input with an icon at the start and a hint or button at the end, such as a search field.
group: Forms
---

```html preview
<div
    class="bk-stack"
    style="width: 320px"
>
    <div class="bk-input-group">
        <svg
            class="bk-icon"
            aria-hidden="true"
        >
            <use href="#i-search" />
        </svg>
        <input
            class="bk-input"
            type="search"
            placeholder="Search trips"
            aria-label="Search trips"
        />
        <span class="bk-input-end bk-kbd-group">
            <kbd class="bk-kbd">⌘</kbd>
            <kbd class="bk-kbd">K</kbd>
        </span>
    </div>
    <div class="bk-input-group">
        <svg
            class="bk-icon"
            aria-hidden="true"
        >
            <use href="#i-map-pin" />
        </svg>
        <input
            class="bk-input"
            value="Lisbon, Portugal"
            aria-label="Location"
        />
    </div>
</div>
```

## Usage

```tsx
import { InputGroup, Input, KbdGroup, Kbd } from 'bento-shad-ui/react';
import { Search } from 'lucide-react';

<InputGroup
    icon={<Search />}
    end={
        <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
        </KbdGroup>
    }
>
    <Input
        type="search"
        placeholder="Search trips"
        aria-label="Search trips"
    />
</InputGroup>;
```

## API

<!-- props: InputGroupProps -->

| HTML | Use |
|---|---|
| `bk-input-group` | Wrapper |
| `.bk-icon` or `bk-input-start` | Leading icon; the input gets extra left padding |
| `bk-input-end` | Trailing content, for example a `bk-kbd-group` or an icon button |

## Accessibility

- The icon is decorative (`aria-hidden`). The input still needs a label or `aria-label`.
