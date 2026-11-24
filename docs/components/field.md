---
title: Field
description: Label, control, help text and error message, with ids and ARIA wired for you.
group: Forms
---

```html preview
<div
    class="bk-form"
    style="width: 320px"
>
    <div class="bk-field">
        <label
            class="bk-label"
            for="fd-email"
        >
            Email
        </label>
        <input
            class="bk-input"
            id="fd-email"
            type="email"
            placeholder="you@example.com"
            aria-describedby="fd-email-d"
        />
        <p
            class="bk-field-description"
            id="fd-email-d"
        >
            We'll send the itinerary here.
        </p>
    </div>
    <div class="bk-field">
        <label
            class="bk-label"
            for="fd-code"
        >
            Promo code
        </label>
        <input
            class="bk-input"
            id="fd-code"
            value="SUMMER"
            aria-invalid="true"
            aria-describedby="fd-code-e"
        />
        <p
            class="bk-field-error"
            id="fd-code-e"
        >
            This code expired on 31 August.
        </p>
    </div>
</div>
```

## Usage

```tsx
import { Field, Input } from 'bento-shad-ui/react';

<Field
    label="Email"
    description="We'll send the itinerary here."
    error={errors.email}
    required
>
    <Input
        type="email"
        name="email"
    />
</Field>;
```

`Field` generates an id (or uses yours), connects `<label for>`, points `aria-describedby` at the description and error, sets `aria-invalid` when there's an error, and passes `required` to the control. It works with any single control: `Input`, `Textarea`, `Select`, `Slider`.

### With react-hook-form

```tsx
<Field
    label="Email"
    error={formState.errors.email?.message}
>
    <Input
        type="email"
        {...register('email', { required: 'Enter your email' })}
    />
</Field>;
```

## Examples

### Form layout

```html preview full
<form
    class="bk-form"
    onsubmit="event.preventDefault()"
>
    <div class="bk-form-row">
        <div class="bk-field">
            <label
                class="bk-label"
                for="fl-first"
            >
                First name
            </label>
            <input
                class="bk-input"
                id="fl-first"
                autocomplete="given-name"
            />
        </div>
        <div class="bk-field">
            <label
                class="bk-label"
                for="fl-last"
            >
                Last name
            </label>
            <input
                class="bk-input"
                id="fl-last"
                autocomplete="family-name"
            />
        </div>
    </div>
    <div class="bk-field">
        <label
            class="bk-label"
            for="fl-mail"
        >
            Email
        </label>
        <input
            class="bk-input"
            id="fl-mail"
            type="email"
            autocomplete="email"
        />
    </div>
    <button
        class="bk-button"
        type="submit"
    >
        Create account
    </button>
</form>
```

### Validation with a recovery path

Submit an empty or malformed email to see an inline error, then correct it and submit again. This example uses native email validity and keeps the message next to the field. A valid value is acknowledged locally; it does not create an account or send an email.

```html preview full
<form
    class="bk-form"
    id="contact-example"
    novalidate
>
    <div class="bk-field">
        <label
            class="bk-label"
            for="contact-email"
        >
            Work email
        </label>
        <input
            class="bk-input"
            id="contact-email"
            name="email"
            type="email"
            required
            autocomplete="email"
            aria-describedby="contact-email-help"
        />
        <p
            class="bk-field-description"
            id="contact-email-help"
        >
            Use an address where your team can reach you.
        </p>
        <p
            class="bk-field-error"
            id="contact-email-error"
            hidden
        ></p>
    </div>
    <div class="bk-row">
        <button
            class="bk-button"
            type="submit"
        >
            Check email
        </button>
        <span class="bk-caption">Preview only · nothing is sent</span>
    </div>
    <p
        class="bk-field-description"
        role="status"
        data-contact-status
    ></p>
</form>
```

The preview uses this handler. Validation runs on submit, rather than interrupting someone while they type.

```js demo
const form = document.querySelector('#contact-example');
const email = form.elements.namedItem('email');
const error = form.querySelector('#contact-email-error');
const status = form.querySelector('[data-contact-status]');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const invalid = !email.validity.valid;
    email.setAttribute('aria-invalid', String(invalid));
    email.setAttribute(
        'aria-describedby',
        invalid
            ? 'contact-email-help contact-email-error'
            : 'contact-email-help',
    );
    error.hidden = !invalid;
    error.textContent = email.validity.valueMissing
        ? 'Enter your work email to continue.'
        : 'Enter a complete email address, such as sam@example.com.';
    status.textContent = invalid
        ? ''
        : 'Email format checked. Nothing was sent.';
    if (invalid) email.focus();
});
```

## API

<!-- props: FieldProps -->

### HTML

| Class | Use |
|---|---|
| `bk-field` | Wrapper: label, control, help, error (8px gap) |
| `bk-label` | Label text |
| `bk-field-description` | Help text, linked with `aria-describedby` |
| `bk-field-error` | Error text, linked with `aria-describedby`; set `aria-invalid="true"` on the control |
| `bk-form` | Vertical stack of fields (16px gap) |
| `bk-form-row` | Fields side by side, wrapping below 160px each |
| `bk-fieldset` | Unstyled `<fieldset>` with a styled `<legend>` |

## Accessibility

- Every control needs a label. Use `aria-label` only when a visible label is impossible.
- Show errors after the user leaves the field or submits, not on every keystroke.
- Errors say what's wrong and how to fix it ("This code expired on 31 August"), not just "Invalid".
