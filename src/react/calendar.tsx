import * as React from 'react';
import { Button } from './actions';
import { cx, useControllableState } from './utils';

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
export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  return !!a && !!b && toDateKey(a) === toDateKey(b);
}

/**
 * The 42 days (6 weeks) shown for a month, starting on Monday (`weekStartsOn = 1`) or Sunday (`0`).
 * @param month 0-based, like `Date#getMonth()`.
 */
export function getMonthGrid(year: number, month: number, weekStartsOn: 0 | 1 = 1): CalendarDay[] {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(year, month, 1 - offset + i);
    return { date, outside: date.getMonth() !== ((month % 12) + 12) % 12, key: toDateKey(date) };
  });
}

interface CalendarBaseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** Month shown (any day in it). Controlled. */
  month?: Date;
  /** Month shown first when uncontrolled. Default: the selected date, or today. */
  defaultMonth?: Date;
  /** Called with the first day of the month the user moved to. */
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
  /** Pick one day. */
  mode?: 'single';
  /** Selected day (controlled). */
  value?: Date | null;
  /** Initially selected day (uncontrolled). */
  defaultValue?: Date | null;
  /** Called with the picked day. */
  onValueChange?: (date: Date) => void;
}

export interface CalendarRangeProps extends CalendarBaseProps {
  /** Pick a start and an end day. */
  mode: 'range';
  /** Selected range (controlled). */
  value?: DateRange | null;
  /** Initial range (uncontrolled). */
  defaultValue?: DateRange | null;
  /** Called with the range; `to` is missing until the second click. */
  onValueChange?: (range: DateRange) => void;
}

export type CalendarProps = CalendarSingleProps | CalendarRangeProps;

/** Month calendar. Click to pick a day; in range mode click the start, then the end. Arrow keys move between days. */
export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(function Calendar(props, ref) {
  const {
    mode = 'single',
    value,
    defaultValue = null,
    onValueChange,
    month,
    defaultMonth,
    onMonthChange,
    today = new Date(),
    weekStartsOn = 1,
    locale,
    isDisabled,
    className,
    ...rest
  } = props as CalendarBaseProps & {
    mode?: 'single' | 'range';
    value?: Date | DateRange | null;
    defaultValue?: Date | DateRange | null;
    onValueChange?: (v: Date | DateRange) => void;
  };

  const [selected, setSelected] = useControllableState<Date | DateRange | null>(
    value,
    defaultValue,
    onValueChange as ((v: Date | DateRange | null) => void) | undefined,
  );
  const initialMonth = defaultMonth ?? (selected instanceof Date ? selected : selected?.from) ?? today ?? new Date();
  const [shown, setShown] = useControllableState<Date>(month, initialMonth, onMonthChange);
  const year = shown.getFullYear();
  const monthIndex = shown.getMonth();
  const days = React.useMemo(() => getMonthGrid(year, monthIndex, weekStartsOn), [year, monthIndex, weekStartsOn]);

  const title = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(shown);
  const weekdayFormat = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const dayLabel = new Intl.DateTimeFormat(locale, { dateStyle: 'full' });
  const weekdays = days.slice(0, 7).map((d) => weekdayFormat.format(d.date).slice(0, 2));

  const range = mode === 'range' && selected && !(selected instanceof Date) ? selected : null;
  const from = range?.from ?? null;
  const to = range?.to ?? null;

  const choose = (date: Date) => {
    if (mode !== 'range') {
      setSelected(date);
      return;
    }
    if (!from || to) setSelected({ from: date });
    else if (date < from) setSelected({ from: date, to: from });
    else setSelected({ from, to: date });
  };

  const rangeState = (date: Date): string | undefined => {
    if (!from) return undefined;
    const end = to ?? from;
    const key = toDateKey(date);
    if (key < toDateKey(from) || key > toDateKey(end)) return undefined;
    if (isSameDay(from, end)) return 'single';
    if (isSameDay(date, from)) return 'start';
    if (isSameDay(date, end)) return 'end';
    return 'middle';
  };

  const step = (delta: number) => setShown(new Date(year, monthIndex + delta, 1));

  return (
    <div ref={ref} className={cx('bk-calendar', className)} data-mode={mode} data-bk-react="" {...rest}>
      <div className="bk-calendar-head">
        <Button variant="ghost" size="icon-sm" aria-label="Previous month" onClick={() => step(-1)}>
          <svg className="bk-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
        </Button>
        <span className="bk-calendar-title" aria-live="polite">{title}</span>
        <Button variant="ghost" size="icon-sm" aria-label="Next month" onClick={() => step(1)}>
          <svg className="bk-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
        </Button>
      </div>
      <div
        className="bk-calendar-grid"
        onKeyDown={(e) => {
          const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
          const delta = moves[e.key];
          if (delta === undefined) return;
          const buttons = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('.bk-calendar-day'));
          const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
          const next = buttons[i + delta];
          if (i >= 0 && next) {
            e.preventDefault();
            next.focus();
          }
        }}
      >
        {weekdays.map((w, i) => (
          <span key={i} className="bk-calendar-weekday" aria-hidden="true">
            {w}
          </span>
        ))}
        {days.map((day) => {
          const single = mode !== 'range' && selected instanceof Date && isSameDay(day.date, selected);
          const state = mode === 'range' && !day.outside ? rangeState(day.date) : undefined;
          const pressed = single || state === 'start' || state === 'end' || state === 'single';
          const disabled = day.outside || isDisabled?.(day.date) === true;
          return (
            <button
              key={day.key}
              type="button"
              className="bk-calendar-day"
              data-outside={day.outside ? '' : undefined}
              data-today={today && isSameDay(day.date, today) ? '' : undefined}
              data-range={state}
              aria-pressed={pressed}
              aria-label={dayLabel.format(day.date)}
              disabled={disabled}
              tabIndex={day.outside ? -1 : 0}
              onClick={() => choose(day.date)}
            >
              {day.date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
});
