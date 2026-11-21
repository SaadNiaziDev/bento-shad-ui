---
title: Accordion
description: Collapsible sections built on native details and summary, so they work before JavaScript loads.
group: Data display
---

```html preview full
<div class="bk-accordion">
  <details class="bk-accordion-item" open><summary class="bk-accordion-trigger">Can I change my dates?</summary><div class="bk-accordion-content">Yes. Change them up to 48 hours before check-in at no cost.</div></details>
  <details class="bk-accordion-item"><summary class="bk-accordion-trigger">How do shared payments work?</summary><div class="bk-accordion-content">Each traveller pays their share by card. The booking is confirmed when the last share is paid.</div></details>
  <details class="bk-accordion-item"><summary class="bk-accordion-trigger">Do the maps work offline?</summary><div class="bk-accordion-content">On Plus, yes. Download a city from the trip page before you leave.</div></details>
</div>
```

## Usage

```tsx
import { Accordion, AccordionItem } from 'bento-shad-ui/react';

<Accordion>
  <AccordionItem title="Can I change my dates?" defaultOpen>Yes, up to 48 hours before check-in.</AccordionItem>
  <AccordionItem title="How do shared payments work?" onOpenChange={(open) => track(open)}>…</AccordionItem>
</Accordion>
```

To allow only one open item at a time, give the items the same `name` attribute (supported by current browsers for `<details>`).

## API

<!-- props: AccordionItemProps -->

## Accessibility

- Native `<details>`: Enter or Space toggles, and screen readers announce expanded or collapsed.
- Browser find-in-page opens closed sections that contain the match.
