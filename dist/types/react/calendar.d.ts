import * as React from 'react';
export interface CalendarDay {
    date: Date;
    /** True for days of the previous or next month that fill the grid. */
    outside: boolean;
    /** Local date as YYYY-MM-DD. */
    key: string;
}
export interface DateRange {
    from: Date;
    to?: Date;
}
/** Local date as `YYYY-MM-DD` (no time zone shift). */
export declare function toDateKey(date: Date): string;
export declare function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean;
/**
 * The 42 days (6 weeks) shown for a month, starting on Monday (`weekStartsOn = 1`) or Sunday (`0`).
 * @param month 0-based, like `Date#getMonth()`.
 */
export declare function getMonthGrid(year: number, month: number, weekStartsOn?: 0 | 1): CalendarDay[];
interface CalendarBaseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    /** Month shown (any day in it). Controlled. */
    month?: Date;
    /** Month shown first when uncontrolled. Default: the selected date, or today. */
    defaultMonth?: Date;
    onMonthChange?: (month: Date) => void;
    /** Marks a day as today. Default: the current date. Pass `null` to mark none. */
    today?: Date | null;
    /** 1 = Monday (default), 0 = Sunday. */
    weekStartsOn?: 0 | 1;
    /** BCP 47 locale for month and weekday names. Default: the browser's. */
    locale?: string;
    /** Return true to make a day unselectable. */
    isDisabled?: (date: Date) => boolean;
}
export interface CalendarSingleProps extends CalendarBaseProps {
    mode?: 'single';
    value?: Date | null;
    defaultValue?: Date | null;
    onValueChange?: (date: Date) => void;
}
export interface CalendarRangeProps extends CalendarBaseProps {
    mode: 'range';
    value?: DateRange | null;
    defaultValue?: DateRange | null;
    onValueChange?: (range: DateRange) => void;
}
export type CalendarProps = CalendarSingleProps | CalendarRangeProps;
/** Month calendar. Click to pick a day; in range mode click the start, then the end. Arrow keys move between days. */
export declare const Calendar: React.ForwardRefExoticComponent<CalendarProps & React.RefAttributes<HTMLDivElement>>;
export {};
