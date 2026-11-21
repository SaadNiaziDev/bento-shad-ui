---
title: Alert
description: An inline message about the current page, in five variants, with optional actions.
group: Feedback
---

```html preview full
<div class="bk-stack">
  <div class="bk-alert" role="status"><svg class="bk-icon" aria-hidden="true"><use href="#i-info"/></svg><div class="bk-alert-title">Flight time changed</div><div class="bk-alert-description">TP 1351 now leaves at 09:15, 35 minutes later.</div></div>
  <div class="bk-alert" data-variant="success" role="status"><svg class="bk-icon" aria-hidden="true"><use href="#i-check-circle"/></svg><div class="bk-alert-title">Booking confirmed</div><div class="bk-alert-description">Everyone has paid their share.</div></div>
  <div class="bk-alert" data-variant="warning" role="status"><svg class="bk-icon" aria-hidden="true"><use href="#i-triangle"/></svg><div class="bk-alert-title">Passport expires soon</div><div class="bk-alert-description">Some countries need 6 months of validity.</div></div>
  <div class="bk-alert" data-variant="destructive" role="alert"><svg class="bk-icon" aria-hidden="true"><use href="#i-alert"/></svg><div class="bk-alert-title">Payment failed</div><div class="bk-alert-description">Your card was declined. Update it to keep the booking.</div><div class="bk-alert-actions"><button class="bk-button" data-variant="destructive" data-size="xs" type="button">Update card</button></div></div>
</div>
```

## Usage

```tsx
import { Alert, Button } from 'bento-shad-ui/react';
import { TriangleAlert } from 'lucide-react';

<Alert variant="warning" icon={<TriangleAlert />} title="Passport expires soon" actions={<Button size="xs">Renew</Button>}>
  Some countries need 6 months of validity.
</Alert>
```

Variants: `default`, `info`, `success`, `warning`, `destructive`.

## API

<!-- props: AlertProps -->

## Accessibility

- `destructive` uses `role="alert"`, so screen readers announce it right away; the others use `role="status"`, which is announced politely.
- Use an alert for information about the page that stays until it's resolved. For short confirmations, use a [Toast](toast.md).
