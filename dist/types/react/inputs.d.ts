import * as React from 'react';
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
export declare const NumberInput: React.ForwardRefExoticComponent<NumberInputProps & React.RefAttributes<HTMLInputElement>>;
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
/**
 * Stars as native radio buttons: arrow keys move, the form gets the value, nothing else to wire.
 * With `readOnly` it draws the value, including fractions such as 4.5, as an image with a text name.
 * The ref points at the fieldset; a read-only rating renders a `<span>` and takes no ref.
 */
export declare const Rating: React.ForwardRefExoticComponent<RatingProps & React.RefAttributes<HTMLFieldSetElement>>;
