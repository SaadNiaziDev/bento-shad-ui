---
title: Rating
description: Stars built from native radio buttons, plus a read-only version for showing a score.
group: Forms
---

```html preview
<fieldset class="bk-rating">
    <legend class="bk-sr-only">Rate your stay</legend>
    <input
        class="bk-rating-input"
        type="radio"
        name="stay"
        value="1"
        id="rt-1"
    />
    <label
        class="bk-rating-star"
        for="rt-1"
    >
        <span class="bk-sr-only">1 star</span>
    </label>
    <input
        class="bk-rating-input"
        type="radio"
        name="stay"
        value="2"
        id="rt-2"
    />
    <label
        class="bk-rating-star"
        for="rt-2"
    >
        <span class="bk-sr-only">2 stars</span>
    </label>
    <input
        class="bk-rating-input"
        type="radio"
        name="stay"
        value="3"
        id="rt-3"
    />
    <label
        class="bk-rating-star"
        for="rt-3"
    >
        <span class="bk-sr-only">3 stars</span>
    </label>
    <input
        class="bk-rating-input"
        type="radio"
        name="stay"
        value="4"
        id="rt-4"
        checked
    />
    <label
        class="bk-rating-star"
        for="rt-4"
    >
        <span class="bk-sr-only">4 stars</span>
    </label>
    <input
        class="bk-rating-input"
        type="radio"
        name="stay"
        value="5"
        id="rt-5"
    />
    <label
        class="bk-rating-star"
        for="rt-5"
    >
        <span class="bk-sr-only">5 stars</span>
    </label>
</fieldset>
```

Each star is a radio button, so the rating needs no script: arrow keys move, the form gets the number, and screen readers announce each star by its label ("4 stars"). Stars fill with CSS only.

## Usage

```tsx
import { Rating } from 'bento-shad-ui/react';

const [stars, setStars] = useState(0);

<Rating
    label="Rate your stay"
    value={stars}
    onValueChange={setStars}
/>;

<Rating
    readOnly
    value={4.5}
    label="Average rating"
/>;
```

## Examples

### Showing a score

The read-only version is a single image named with the score ("Average rating: 4.5 out of 5"), and can show fractions.

```html preview
<div
    class="bk-row"
    style="--gap: 8px"
>
    <span
        class="bk-rating"
        data-readonly
        role="img"
        aria-label="Average rating: 4.5 out of 5"
        style="--rating: 4.5; --max: 5"
    ></span>
    <span style="font-size: 13.5px; color: var(--muted-foreground)">
        4.5 · 128 reviews
    </span>
</div>
```

Sizes: `data-size="sm"` (16px stars) and `data-size="lg"` (30px). The default is 22px.

## API

<!-- props: RatingProps -->

## Accessibility

- The group is a `<fieldset>` named by its `<legend>`. Keep the legend, even if it's visually hidden.
- Native radio buttons give the keyboard behaviour: Tab enters the group, the arrow keys change the rating.
- Filled stars use `--warning` and empty stars `--input`. Both pass 3:1 against the background in light and dark mode, and a test checks this.
- Hover previews the rating only on devices with a precise pointer; on touch the stars change on tap.
