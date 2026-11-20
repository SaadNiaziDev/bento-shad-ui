# Accessibility

The target is WCAG 2.2 AA. This page lists what the library does for you and what you still have to do.

## Built in

**Contrast, checked by tests.** `npm test` computes WCAG contrast for every text/background token pair in light and dark mode and fails the build below the limits:

- text pairs (`foreground`/`background`, `primary-foreground`/`primary`, `muted-foreground` on `background`, `card` and `muted`, every tint and its foreground, status colours on cards…): at least 4.5:1
- `--input` (form control borders) and `--ring` (focus ring) against `--card` and `--background`: at least 3:1

That's why `--destructive-foreground` exists: white text on dark mode's light red fails, so dark mode uses dark text.

**Focus.** Every interactive element shows a 3px ring in `--ring` on `:focus-visible`. Nothing removes outlines without a replacement.

**Keyboard.**

| Component | Keys |
|---|---|
| Tabs | ←/→ move and select, Home/End |
| Dropdown menu | opens with focus on the first item; ↑/↓, Home/End; Esc closes and returns focus |
| Popover | Esc closes; focus moves into it on open |
| Dialog / Sheet | focus trapped by the native `<dialog>`; Esc closes |
| Command palette | ⌘K/Ctrl+K; ↑/↓ and Enter; `aria-activedescendant` keeps the screen reader on the active option |
| Calendar | ←/→ day, ↑/↓ week; Enter or Space picks |
| Input OTP | digits only; Backspace goes back; ←/→; paste fills all slots |
| Toggle / Switch / Checkbox / Radio | native Space / arrow behaviour |
| Accordion | native `<details>`: Enter/Space |

**Semantics.** Native elements first (`<button>`, `<dialog>`, `<details>`, `<select>`, `<input type="range">`, `popover`). ARIA is added where native HTML has none: `aria-pressed` on toggles, `aria-current` on nav, `role="tab"`/`tabpanel` wiring, `role="alert"` on destructive alerts and toasts, `aria-busy` on loading buttons, `role="progressbar"` with values.

**Motion.** `prefers-reduced-motion: reduce` removes animations and transitions.

**Forms.** The React `Field` connects label, help text and error (`htmlFor`, `aria-describedby`, `aria-invalid`).

## Your part

- **Name icon-only buttons**: `aria-label="Delete"`. A tooltip alone is not a name.
- **Describe charts**: `Sparkline` and `Ring` require `label`; give HTML charts an `aria-label` that states the values.
- **Image alt text** on `Avatar` and `Media` images.
- **Label every input.** Use `Field` or `<label for>`, and `aria-label` only when a visible label is impossible.
- **Don't rely on colour alone.** Badges and alerts carry text; keep it meaningful ("Paid", not just a green dot).
- **Keep the tone rules.** Custom token values must still meet the contrast limits above. Run `npm test` if you fork the tokens.
- **Language**: set `<html lang>`.
- **Toasts** disappear: don't put the only copy of important information or the only way to undo something in a toast.
