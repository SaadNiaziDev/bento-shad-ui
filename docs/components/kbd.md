---
title: Kbd
description: Keyboard keys and shortcuts, shown inline in text, menus and inputs.
group: Actions
---

```html preview
<p
    class="bk-muted"
    style="margin: 0"
>
    Press
    <span class="bk-kbd-group">
        <kbd class="bk-kbd">⌘</kbd>
        <kbd class="bk-kbd">K</kbd>
    </span>
    to search, or
    <span class="bk-kbd-group">
        <kbd class="bk-kbd">Ctrl</kbd>
        +
        <kbd class="bk-kbd">K</kbd>
    </span>
    on Windows.
</p>
```

## Usage

```tsx
import { Kbd, KbdGroup } from 'bento-shad-ui/react';

<KbdGroup>
    <Kbd>⌘</Kbd>
    <Kbd>K</Kbd>
</KbdGroup>;
```

```html
<span class="bk-kbd-group">
    <kbd class="bk-kbd">⌘</kbd>
    <kbd class="bk-kbd">K</kbd>
</span>
```

## API

`Kbd` renders `<kbd class="bk-kbd">`; `KbdGroup` renders `<span class="bk-kbd-group">`. Both accept their element's attributes. Keys use the sans font: the library has no monospace face.
