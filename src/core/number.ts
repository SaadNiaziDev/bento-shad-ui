import { $$, isManaged } from './dom';

/** Keeps `value` inside `min` and `max` (either may be missing). */
export function clampNumber(value: number, min?: number, max?: number): number {
  if (min !== undefined && value < min) return min;
  if (max !== undefined && value > max) return max;
  return value;
}

const bound = (raw: string | null) => (raw === null || raw === '' ? undefined : Number(raw));

/**
 * Steps a native number input up or down, as its arrow keys would (respecting min, max and step),
 * and fires `input` and `change` so forms and frameworks see it. Shared with the React component.
 */
export function stepNumberInput(input: HTMLInputElement, direction: 1 | -1): void {
  if (input.disabled || input.readOnly) return;
  try {
    if (direction === 1) input.stepUp();
    else input.stepDown();
  } catch {
    return; // not a number input
  }
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

/** Disables − at the minimum and + at the maximum. */
function syncButtons(box: Element, input: HTMLInputElement): void {
  const value = input.value === '' ? NaN : Number(input.value);
  const min = bound(input.getAttribute('min'));
  const max = bound(input.getAttribute('max'));
  for (const button of $$<HTMLButtonElement>('.bk-number-step', box)) {
    const up = button.getAttribute('data-direction') === 'up';
    const limit = up ? max : min;
    button.disabled = input.disabled || (limit !== undefined && !Number.isNaN(value) && (up ? value >= limit : value <= limit));
  }
}

/* ---------- Number input: .bk-number > button.bk-number-step[data-direction] + input.bk-number-input ---------- */
export function initNumber(root: ParentNode, once: (el: Element, key: string) => boolean): void {
  for (const box of $$('.bk-number', root)) {
    if (isManaged(box) || !once(box, 'number')) continue;
    const input = box.querySelector<HTMLInputElement>('.bk-number-input');
    if (!input) continue;
    for (const button of $$<HTMLButtonElement>('.bk-number-step', box)) {
      button.type = 'button';
      // Keep focus (and the caret) in the input when a button is pressed.
      button.addEventListener('mousedown', (e) => e.preventDefault());
      button.addEventListener('click', () => {
        stepNumberInput(input, button.getAttribute('data-direction') === 'up' ? 1 : -1);
        syncButtons(box, input);
      });
    }
    input.addEventListener('input', () => syncButtons(box, input));
    // Out-of-range typing is pulled back to the nearest limit when focus leaves.
    input.addEventListener('blur', () => {
      if (input.value === '') return;
      const value = Number(input.value);
      const clamped = clampNumber(value, bound(input.getAttribute('min')), bound(input.getAttribute('max')));
      if (clamped !== value) {
        input.value = String(clamped);
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
      syncButtons(box, input);
    });
    syncButtons(box, input);
  }
}
