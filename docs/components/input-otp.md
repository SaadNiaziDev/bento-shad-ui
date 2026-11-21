---
title: Input OTP
description: One-time code entry: digits only, auto-advance, backspace to go back, and paste to fill every slot.
group: Forms
---

```html preview
<div class="bk-stack" style="width: 320px">
  <div class="bk-otp" role="group" aria-label="Verification code">
    <div class="bk-otp-group"><input inputmode="numeric" maxlength="1" aria-label="Digit 1"><input inputmode="numeric" maxlength="1" aria-label="Digit 2"><input inputmode="numeric" maxlength="1" aria-label="Digit 3"></div>
    <span class="bk-otp-separator" aria-hidden="true"></span>
    <div class="bk-otp-group"><input inputmode="numeric" maxlength="1" aria-label="Digit 4"><input inputmode="numeric" maxlength="1" aria-label="Digit 5"><input inputmode="numeric" maxlength="1" aria-label="Digit 6"></div>
  </div>
  <p class="bk-field-description">Type or paste the 6-digit code sent to m•••@example.com.</p>
</div>
```

## Usage

```tsx
import { InputOTP } from 'bento-shad-ui/react';

<InputOTP groups={[3, 3]} aria-label="Verification code" onComplete={(code) => verify(code)} />
<InputOTP groups={[4]} value={pin} onValueChange={setPin} aria-label="PIN" />
```

## API

<!-- props: InputOTPProps -->

## Accessibility

- Each slot has a label ("Digit 2 of 6"); the group has `aria-label`.
- The first slot uses `autocomplete="one-time-code"`, so phones can fill codes from SMS.
- ←/→ move between slots; Backspace on an empty slot goes back.
