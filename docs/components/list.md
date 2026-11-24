---
title: List
description: Rows with a leading avatar or icon, a title, a description and a trailing meta, for activity feeds and settings.
group: Data display
---

```html preview
<ul
    class="bk-list"
    style="width: 340px"
>
    <li class="bk-list-item">
        <span
            class="bk-avatar"
            data-size="sm"
        >
            MK
        </span>
        <div class="bk-list-item-text">
            <span>Maya booked Lisbon</span>
            <span>Hotel Chiado, 4 nights</span>
        </div>
        <span class="bk-list-item-meta">2m</span>
    </li>
    <li class="bk-list-item">
        <span
            class="bk-avatar"
            data-size="sm"
        >
            JR
        </span>
        <div class="bk-list-item-text">
            <span>Jonas added a day trip</span>
            <span>Sintra, Wed 14</span>
        </div>
        <span class="bk-list-item-meta">1h</span>
    </li>
    <li class="bk-list-item">
        <span
            class="bk-avatar"
            data-size="sm"
        >
            AS
        </span>
        <div class="bk-list-item-text">
            <span>Amira left a note</span>
            <span>"Book the tram early"</span>
        </div>
        <span class="bk-list-item-meta">3h</span>
    </li>
</ul>
```

## Usage

```tsx
import { List, ListItem, Avatar } from 'bento-shad-ui/react';

<List>
    <ListItem
        leading={
            <Avatar
                size="sm"
                fallback="MK"
            />
        }
        title="Maya booked Lisbon"
        description="Hotel Chiado, 4 nights"
        meta="2m"
    />
</List>;
```

## API

<!-- props: ListItemProps -->

`List` renders `<ul class="bk-list">`. Long titles are cut with an ellipsis.
