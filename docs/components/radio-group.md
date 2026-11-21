---
title: Radio group
description: One choice from a short list, as a native fieldset of radios.
group: Forms
---

```html preview
<fieldset class="bk-radio-group" style="width: 260px">
  <legend class="bk-label" style="margin-bottom: 4px">Cabin class</legend>
  <label class="bk-option"><input class="bk-radio" type="radio" name="rg-cabin" checked><span>Economy</span></label>
  <label class="bk-option"><input class="bk-radio" type="radio" name="rg-cabin"><span>Premium economy</span></label>
  <label class="bk-option"><input class="bk-radio" type="radio" name="rg-cabin"><span>Business</span></label>
</fieldset>
```

## Usage

```tsx
import { RadioGroup, Radio } from 'bento-shad-ui/react';

<RadioGroup legend="Cabin class" value={cabin} onValueChange={setCabin}>
  <Radio value="economy" label="Economy" />
  <Radio value="premium" label="Premium economy" />
  <Radio value="business" label="Business" description="Lie-flat seats" />
</RadioGroup>
```

`RadioGroup` gives every `Radio` the same `name` and keeps the value. For radios that look like cards, use [Choice card](choice-card.md) inside the same group.

## API

### RadioGroup

<!-- props: RadioGroupProps -->

### Radio

<!-- props: RadioProps -->

## Accessibility

- Arrow keys move between radios in a group; Tab moves in and out of the group (native behaviour).
- The `legend` names the group. Use `aria-label` on `RadioGroup` if you hide it.
