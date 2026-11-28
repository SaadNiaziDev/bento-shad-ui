import * as React from 'react';
import { clampNumber, stepNumberInput } from '../core';
import { composeRefs, cx, useControllableState, useSafeId } from './utils';

/* ---------------------------------------------------------------- Number input */

export interface NumberInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'placeholder'> {
  /** The number, `null` when empty. Controlled: pair with `onValueChange`. */
  value?: number | null;
  /** Initial number when uncontrolled. */
  defaultValue?: number | null;
  /** Called with the new number, or `null` when the field is emptied. */
  onValueChange?: (value: number | null) => void;
  /** Lowest value. The − button stops here, and typing below it is raised to it on blur. */
  min?: number;
  /** Highest value. The + button stops here, and typing above it is lowered to it on blur. */
  max?: number;
  /** Amount the buttons and arrow keys add or remove. Default 1. */
  step?: number;
  /** Shown while the field is empty. */
  placeholder?: string;
  /** Disables the field and its buttons. */
  disabled?: boolean;
  /** Shorthand for `aria-invalid`. */
  invalid?: boolean;
  /** Requires a value before the form submits. `Field` sets it for you. */
  required?: boolean;
  /** Submits the number with a form. */
  name?: string;
  /** Accessible name of the − button. Default "Decrease". */
  decrementLabel?: string;
  /** Accessible name of the + button. Default "Increase". */
  incrementLabel?: string;
}

/**
 * A native number field with − and + buttons. Arrow keys step it, min and max are respected,
 * and an out-of-range value is pulled back on blur. The ref points at the input.
 */
export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  {
    value,
    defaultValue = null,
    onValueChange,
    min,
    max,
    step = 1,
    placeholder,
    disabled,
    invalid,
    required,
    name,
    decrementLabel = 'Decrease',
    incrementLabel = 'Increase',
    id,
    className,
    'aria-describedby': describedBy,
    'aria-invalid': ariaInvalid,
    'aria-label': ariaLabel,
    'aria-labelledby': labelledBy,
    ...props
  },
  forwarded,
) {
  const [number, setNumber] = useControllableState<number | null>(value, defaultValue, onValueChange);
  // The text is kept separately so partial input such as "-" or "1." isn't overwritten while typing.
  const [text, setText] = React.useState(number === null ? '' : String(number));
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const shown = text === '' ? null : Number(text);
    if (shown !== number) setText(number === null ? '' : String(number));
  }, [number]); // follows outside changes only; `text` is deliberately not a dependency

  const readInput = (el: HTMLInputElement) => {
    setText(el.value);
    if (el.value === '') setNumber(null);
    else if (!Number.isNaN(el.valueAsNumber)) setNumber(el.valueAsNumber);
  };
  const press = (direction: 1 | -1) => {
    const el = inputRef.current;
    if (!el) return;
    stepNumberInput(el, direction);
    readInput(el);
  };
  const atMin = min !== undefined && number !== null && number <= min;
  const atMax = max !== undefined && number !== null && number >= max;

  return (
    <div className={cx('bk-number', className)} data-bk-react="" {...props}>
      <button
        type="button"
        className="bk-number-step"
        data-direction="down"
        tabIndex={-1}
        aria-label={decrementLabel}
        disabled={disabled || atMin}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => press(-1)}
      />
      <input
        ref={composeRefs(inputRef, forwarded)}
        id={id}
        type="number"
        className="bk-number-input"
        inputMode={Number.isInteger(step) && (min === undefined || min >= 0) ? 'numeric' : 'decimal'}
        value={text}
        min={min}
        max={max}
        step={step}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-describedby={describedBy}
        aria-invalid={invalid || ariaInvalid || undefined}
        aria-label={ariaLabel}
        aria-labelledby={labelledBy}
        onChange={(e) => readInput(e.currentTarget)}
        onBlur={(e) => {
          if (number === null) return;
          const clamped = clampNumber(number, min, max);
          if (clamped !== number) {
            setNumber(clamped);
            setText(String(clamped));
          } else if (e.currentTarget.value !== text) setText(e.currentTarget.value);
        }}
      />
      <button
        type="button"
        className="bk-number-step"
        data-direction="up"
        tabIndex={-1}
        aria-label={incrementLabel}
        disabled={disabled || atMax}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => press(1)}
      />
    </div>
  );
});

/* ---------------------------------------------------------------- Rating */

export interface RatingProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'defaultValue' | 'onChange'> {
  /** Number of stars chosen, 0 for none. Controlled: pair with `onValueChange`. */
  value?: number;
  /** Initial stars when uncontrolled. */
  defaultValue?: number;
  /** Called with the number of stars chosen. */
  onValueChange?: (value: number) => void;
  /** Number of stars. Default 5. */
  max?: number;
  /** Name of the group for screen readers, e.g. "Rate your stay". Default "Rating". */
  label?: string;
  /** Shows the value without inputs. Fractions are drawn as partly filled stars. */
  readOnly?: boolean;
  /** Accessible name of each star. Default "1 star", "2 stars"… */
  starLabel?: (stars: number, max: number) => string;
}

const defaultStarLabel = (n: number) => `${n} ${n === 1 ? 'star' : 'stars'}`;

/**
 * Stars as native radio buttons: arrow keys move, the form gets the value, nothing else to wire.
 * With `readOnly` it draws the value, including fractions such as 4.5, as an image with a text name.
 * The ref points at the fieldset; a read-only rating renders a `<span>` and takes no ref.
 */
export const Rating = React.forwardRef<HTMLFieldSetElement, RatingProps>(function Rating(
  { value, defaultValue = 0, onValueChange, max = 5, label = 'Rating', readOnly, starLabel = defaultStarLabel, name, className, style, disabled, ...props },
  ref,
) {
  const [stars, setStars] = useControllableState<number>(value, defaultValue, onValueChange);
  const group = useSafeId('rating');

  if (readOnly) {
    const shown = clampNumber(stars, 0, max);
    return (
      <span
        className={cx('bk-rating', className)}
        data-readonly=""
        role="img"
        aria-label={`${label}: ${shown} out of ${max}`}
        style={{ ...style, ['--rating' as string]: shown, ['--max' as string]: max }}
      />
    );
  }

  return (
    <fieldset ref={ref} className={cx('bk-rating', className)} disabled={disabled} style={style} data-bk-react="" {...props}>
      <legend className="bk-sr-only">{label}</legend>
      {Array.from({ length: max }, (_, i) => {
        const n = i + 1;
        const inputId = `${group}-${n}`;
        return (
          <React.Fragment key={n}>
            <input
              type="radio"
              className="bk-rating-input"
              id={inputId}
              name={name ?? group}
              value={n}
              checked={stars === n}
              onChange={() => setStars(n)}
            />
            <label htmlFor={inputId} className="bk-rating-star">
              <span className="bk-sr-only">{starLabel(n, max)}</span>
            </label>
          </React.Fragment>
        );
      })}
    </fieldset>
  );
});
