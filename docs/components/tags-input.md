---
title: Tags input
description: A field for short free-text values such as topics or labels. Press Enter or type a comma to add one.
group: Forms
---

```html preview
<div
    class="bk-field"
    style="width: 340px"
>
    <label
        class="bk-label"
        for="tg-topics"
    >
        Topics
    </label>
    <div
        class="bk-tags"
        data-name="topics"
    >
        <span
            class="bk-chip"
            data-value="Design"
        >
            Design
        </span>
        <span
            class="bk-chip"
            data-value="Research"
        >
            Research
        </span>
        <input
            class="bk-tags-input"
            id="tg-topics"
            placeholder="Add a topic"
        />
    </div>
    <p class="bk-field-description">
        Press Enter or type a comma after each topic.
    </p>
</div>
```

Use a tags input when people write their own values. When they choose from a known list, use a [Combobox](combobox.md) with `multiple`.

## Usage

```tsx
import { Field, TagsInput } from 'bento-shad-ui/react';

const [topics, setTopics] = useState<string[]>(['Design', 'Research']);

<Field
    label="Topics"
    description="Press Enter or type a comma after each topic."
>
    <TagsInput
        value={topics}
        onValueChange={setTopics}
        placeholder="Add a topic"
    />
</Field>;
```

### HTML

Write the starting tags as `.bk-chip` elements before the input. The script adds the remove buttons and keeps the hidden form inputs in sync.

```html
<div
    class="bk-tags"
    data-name="topics"
>
    <span
        class="bk-chip"
        data-value="Design"
    >
        Design
    </span>
    <input
        class="bk-tags-input"
        id="topics"
        placeholder="Add a topic"
    />
</div>
```

| Attribute | On | Effect |
|---|---|---|
| `data-name` | `.bk-tags` | Adds one hidden input per tag with this name, so the tags are sent with the form |
| `data-max` | `.bk-tags` | Most tags allowed |
| `data-delimiter` | `.bk-tags` | Character that ends a tag. Default `,` |
| `data-allow-duplicates` | `.bk-tags` | Keep tags that repeat one already added |
| `data-add-on-blur="false"` | `.bk-tags` | Don't turn leftover text into a tag when focus leaves |
| `data-required` | `.bk-tags` | Requires at least one tag before the form submits |

The field fires `bk:change` with `{ values }` after a tag is added or removed.

## Examples

### With a limit

`data-max` (`max` in React) caps the list. Text that doesn't fit stays in the field, so nothing typed is lost. Pasting `Lisbon, Porto, Faro` or a list with one item per line adds each one.

```html preview
<div
    class="bk-field"
    style="width: 340px"
>
    <label
        class="bk-label"
        for="tg-cities"
    >
        Shortlist
    </label>
    <div
        class="bk-tags"
        data-max="3"
    >
        <span
            class="bk-chip"
            data-value="Lisbon"
        >
            Lisbon
        </span>
        <input
            class="bk-tags-input"
            id="tg-cities"
            placeholder="Add up to three cities"
            aria-describedby="tg-cities-hint"
        />
    </div>
    <p
        class="bk-field-description"
        id="tg-cities-hint"
    >
        Up to three cities.
    </p>
</div>
```

### Repeated tags

A tag that is already in the list isn't added again. The existing chip is outlined briefly, and screen readers hear "… is already added". Matching ignores case, so "design" repeats "Design". Set `allowDuplicates` when repeats are meaningful.

## API

<!-- props: TagsInputProps -->

`splitTags(text, delimiter)` and `addTags(tags, incoming, { max, allowDuplicates })` are exported from `bento-shad-ui` if you build your own field.

## Accessibility

- Each chip's × button is named "Remove …". The buttons are not in the Tab order, so Tab moves past the field in one step.
- From the start of the text field, ← moves onto the last chip's × button. ← and → move between them, Delete or Backspace removes the focused tag, and Esc returns to the text field. Backspace in an empty field removes the last tag.
- Additions, repeats, the limit and removals are announced through a polite live region, because new chips appear outside the text field.
- Enter adds a tag when the field has text. In an empty field, Enter submits the form as usual.
- With `required`, the text field is required until there is at least one tag.
