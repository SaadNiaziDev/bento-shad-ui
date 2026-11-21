---
title: Choice card
description: A selectable card holding a radio or checkbox, for plans, shipping options and similar choices.
group: Forms
---

```html preview full
<fieldset class="bk-fieldset">
  <legend>Plan</legend>
  <div class="bk-form-row">
    <label class="bk-choice"><input class="bk-radio" type="radio" name="cc-plan" checked><span class="bk-option-text"><span>Free</span><span>3 trips, 1 traveller</span></span><span class="bk-choice-price">€0</span></label>
    <label class="bk-choice"><input class="bk-radio" type="radio" name="cc-plan"><span class="bk-option-text"><span>Plus</span><span>Unlimited trips, 6 travellers</span></span><span class="bk-choice-price">€4/mo</span></label>
  </div>
</fieldset>
```

## Usage

```tsx
import { RadioGroup, ChoiceCard } from 'bento-shad-ui/react';

<RadioGroup legend="Plan" defaultValue="free">
  <ChoiceCard value="free" label="Free" description="3 trips, 1 traveller" aside="€0" />
  <ChoiceCard value="plus" label="Plus" description="Unlimited trips, 6 travellers" aside="€4/mo" />
</RadioGroup>

<ChoiceCard type="checkbox" label="Travel insurance" aside="€12" />
```

## API

<!-- props: ChoiceCardProps -->

The selected card gets a 2px outline in `--foreground` through `:has(:checked)`.

## Accessibility

- The whole card is the label, so clicking anywhere selects it. Keyboard behaviour is the native radio or checkbox behaviour.
