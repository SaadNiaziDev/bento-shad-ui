---
title: Slider
description: Pick a number in a range. A native range input with a filled track and a live value.
group: Forms
---

```html preview
<div class="bk-field" style="width: 300px">
  <div class="bk-row bk-between"><label class="bk-label" for="sd-price">Max nightly price</label><output class="bk-small" for="sd-price">€140</output></div>
  <input class="bk-slider" id="sd-price" type="range" min="40" max="400" step="10" value="140" data-prefix="€">
</div>
```

## Usage

```tsx
import { Field, Slider } from 'bento-shad-ui/react';

const [price, setPrice] = useState(140);
<Field label={`Max nightly price: €${price}`}>
  <Slider min={40} max={400} step={10} value={price} onValueChange={setPrice} />
</Field>
```

In HTML, the script keeps the filled part of the track (`--val`) and any `<output for="id">` in sync. `data-prefix` and `data-suffix` add text around the value.

## API

<!-- props: SliderProps -->

## Accessibility

- Native range input: arrow keys step, Page Up/Down jump, Home/End go to the ends.
- Show the current value as text (an `<output>` or the label) so it isn't conveyed by position alone.
