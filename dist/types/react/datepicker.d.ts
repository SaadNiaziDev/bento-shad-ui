import * as React from 'react';
import type { DateRange } from './calendar';
interface DatePickerBaseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'placeholder'> {
    /** Text on the button while no date is chosen. */
    placeholder?: string;
    /** BCP 47 locale for the button text and the calendar. Default: the browser's. */
    locale?: string;
    /** How the chosen date is written on the button. Default `{ dateStyle: 'medium' }`, e.g. "12 Mar 2026". */
    formatOptions?: Intl.DateTimeFormatOptions;
    /** 1 = Monday (default), 0 = Sunday. */
    weekStartsOn?: 0 | 1;
    /** Return true to make a day unselectable. */
    isDisabled?: (date: Date) => boolean;
    /** Marks a day as today in the calendar. Pass `null` to mark none. */
    today?: Date | null;
    /** Shows a × button next to the field that clears the date. */
    clearable?: boolean;
    /** Disables the field. */
    disabled?: boolean;
    /** Shorthand for `aria-invalid`. */
    invalid?: boolean;
    /** Sets `aria-required`. A button can't block form submission, so check the value yourself. */
    required?: boolean;
    /** Submits the date as `YYYY-MM-DD` in a hidden input; a range sends two inputs, start then end. */
    name?: string;
    /** Accessible name of the calendar panel. Default "Choose date". */
    calendarLabel?: string;
}
export interface DatePickerSingleProps extends DatePickerBaseProps {
    /** Pick one day. */
    mode?: 'single';
    /** Chosen day (controlled). */
    value?: Date | null;
    /** Initially chosen day (uncontrolled). */
    defaultValue?: Date | null;
    /** Called with the chosen day, or `null` when cleared. */
    onValueChange?: (date: Date | null) => void;
}
export interface DatePickerRangeProps extends DatePickerBaseProps {
    /** Pick a start and an end day. The panel closes after the end day. */
    mode: 'range';
    /** Chosen range (controlled). */
    value?: DateRange | null;
    /** Initial range (uncontrolled). */
    defaultValue?: DateRange | null;
    /** Called with the range (`to` is missing until the second pick), or `null` when cleared. */
    onValueChange?: (range: DateRange | null) => void;
}
export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;
/** Writes a date or range the way the button shows it. */
export declare function formatDateValue(value: Date | DateRange | null | undefined, locale?: string, options?: Intl.DateTimeFormatOptions): string;
/**
 * A button that shows the chosen date and opens a calendar in a popover. Picking a day closes it
 * and returns focus to the button. The ref points at the button.
 */
export declare const DatePicker: React.ForwardRefExoticComponent<DatePickerProps & React.RefAttributes<HTMLButtonElement>>;
export {};
