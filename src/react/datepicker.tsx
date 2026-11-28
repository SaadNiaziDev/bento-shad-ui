import * as React from 'react';
import { enablePopoverPlacement } from '../core';
import { Calendar, toDateKey } from './calendar';
import type { DateRange } from './calendar';
import { composeRefs, cx, flag, popoverTargetProps, useControllableState, useSafeId } from './utils';

/* ---------------------------------------------------------------- Date picker */

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
export function formatDateValue(value: Date | DateRange | null | undefined, locale?: string, options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }): string {
  if (!value) return '';
  const format = new Intl.DateTimeFormat(locale, options);
  if (value instanceof Date) return format.format(value);
  if (!value.to) return `${format.format(value.from)} –`;
  return typeof format.formatRange === 'function' ? format.formatRange(value.from, value.to) : `${format.format(value.from)} – ${format.format(value.to)}`;
}

function CalendarIcon() {
  return (
    <svg className="bk-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

/**
 * A button that shows the chosen date and opens a calendar in a popover. Picking a day closes it
 * and returns focus to the button. The ref points at the button.
 */
export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(function DatePicker(
  {
    mode = 'single',
    value,
    defaultValue = null,
    onValueChange,
    placeholder = 'Pick a date',
    locale,
    formatOptions,
    weekStartsOn,
    isDisabled,
    today,
    clearable,
    disabled,
    invalid,
    required,
    name,
    calendarLabel = 'Choose date',
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
  const [selected, setSelected] = useControllableState<Date | DateRange | null>(
    value,
    defaultValue,
    onValueChange as ((next: Date | DateRange | null) => void) | undefined,
  );
  const [open, setOpen] = React.useState(false);
  const [opened, setOpened] = React.useState(0);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const panelId = useSafeId('datepicker');
  const textId = useSafeId('datepicker-text');

  React.useEffect(() => {
    enablePopoverPlacement();
    const panel = panelRef.current;
    if (!panel) return;
    const onToggle = (e: Event) => {
      const isOpen = (e as ToggleEvent).newState === 'open';
      setOpen(isOpen);
      if (isOpen) setOpened((n) => n + 1);
    };
    panel.addEventListener('toggle', onToggle);
    return () => panel.removeEventListener('toggle', onToggle);
  }, []);

  // The button's name is the field's <label> plus the chosen date, e.g. "Departure, 12 Mar 2026".
  const [autoLabelledBy, setAutoLabelledBy] = React.useState<string>();
  React.useEffect(() => {
    if (!id || labelledBy || ariaLabel) return;
    const label = document.querySelector<HTMLLabelElement>(`label[for="${CSS.escape(id)}"]`);
    if (!label) return;
    label.id ||= `${panelId}-label`;
    setAutoLabelledBy(`${label.id} ${textId}`);
  }, [id, labelledBy, ariaLabel, panelId, textId]);

  // Each opening starts on the chosen month with focus on the chosen day (or today).
  React.useEffect(() => {
    if (opened) panelRef.current?.querySelector<HTMLElement>('.bk-calendar-day[tabindex="0"]')?.focus();
  }, [opened]);

  const close = () => {
    const panel = panelRef.current;
    if (panel && typeof panel.hidePopover === 'function') {
      try {
        panel.hidePopover();
      } catch {
        /* already closed */
      }
    }
    triggerRef.current?.focus();
  };

  const text = formatDateValue(selected, locale, formatOptions);
  const range = mode === 'range' && selected && !(selected instanceof Date) ? selected : null;
  const submitted = selected instanceof Date ? [toDateKey(selected)] : range ? [toDateKey(range.from), range.to ? toDateKey(range.to) : ''] : [''];

  return (
    <div className={cx('bk-datepicker', className)} data-has-value={flag(!!selected)} data-bk-react="" {...props}>
      <button
        ref={composeRefs(triggerRef, forwarded)}
        id={id}
        type="button"
        className="bk-input bk-datepicker-trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={ariaLabel}
        aria-labelledby={labelledBy ?? autoLabelledBy}
        aria-describedby={describedBy}
        aria-invalid={invalid || ariaInvalid || undefined}
        aria-required={required || undefined}
        disabled={disabled}
        {...popoverTargetProps(panelId)}
      >
        <CalendarIcon />
        <span id={textId} className="bk-datepicker-value" data-placeholder={flag(!text)}>
          {text || placeholder}
        </span>
      </button>
      {clearable && selected && !disabled ? (
        <button
          type="button"
          className="bk-datepicker-clear"
          aria-label="Clear date"
          onClick={() => {
            setSelected(null);
            triggerRef.current?.focus();
          }}
        />
      ) : null}
      <div
        ref={panelRef}
        id={panelId}
        {...({ popover: 'auto' } as Record<string, string>)}
        role="dialog"
        aria-label={calendarLabel}
        className="bk-popover bk-datepicker-panel"
        data-bk-react=""
      >
        {mode === 'range' ? (
          <Calendar
            key={opened}
            mode="range"
            value={range}
            onValueChange={(next) => {
              setSelected(next);
              if (next.to) close();
            }}
            {...{ locale, weekStartsOn, isDisabled, today }}
          />
        ) : (
          <Calendar
            key={opened}
            value={selected instanceof Date ? selected : null}
            onValueChange={(next) => {
              setSelected(next);
              close();
            }}
            {...{ locale, weekStartsOn, isDisabled, today }}
          />
        )}
      </div>
      {name ? submitted.map((v, i) => <input key={i} type="hidden" name={name} value={v} />) : null}
    </div>
  );
});
