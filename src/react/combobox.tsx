import * as React from 'react';
import { enablePopoverPlacement, hideListbox, matchesQuery, placePopover, showListbox } from '../core';
import { composeRefs, cx, flag, useControllableState, useSafeId } from './utils';

/* ---------------------------------------------------------------- Combobox */

export interface ComboboxOption {
  /** Value submitted and passed to `onValueChange`. Unique within the list. */
  value: string;
  /** Text shown in the list, in chips and in the field. */
  label: string;
  /** Second line in the list. */
  description?: string;
  /** Icon before the label. */
  icon?: React.ReactNode;
  /** Extra words that should match the search, e.g. a country for a city. */
  keywords?: readonly string[];
  /** Heading the option is listed under. Groups keep the order in which they first appear. */
  group?: string;
  /** Shown but not selectable. */
  disabled?: boolean;
}

interface ComboboxBaseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'children' | 'placeholder'> {
  /** Choices to search. */
  options: readonly ComboboxOption[];
  /** Shown in the empty field. */
  placeholder?: string;
  /** Shown when nothing matches. */
  emptyText?: React.ReactNode;
  /** Shows a × button that clears the selection. */
  clearable?: boolean;
  /** Disables the field. */
  disabled?: boolean;
  /** Shorthand for `aria-invalid`. */
  invalid?: boolean;
  /** Marks the field required. `Field` sets it for you. */
  required?: boolean;
  /** Submits the selection with a form: one hidden input per selected value. */
  name?: string;
  /** Custom matching, or `false` to show `options` exactly as given (results filtered on a server). By default every word of the query must appear in the label or keywords, ignoring case and accents. */
  filter?: ((option: ComboboxOption, query: string) => boolean) | false;
  /** Called with the search text as it changes. */
  onInputChange?: (query: string) => void;
  /** Shows a loading row in place of the empty text, e.g. while results load. */
  loading?: boolean;
  /** Text of the loading row. */
  loadingText?: React.ReactNode;
  /** Accessible name of the button that opens the list. */
  toggleLabel?: string;
}

export interface ComboboxProps extends ComboboxBaseProps {
  /** Leave unset for one value. Set `multiple` to pick several (see `ComboboxMultipleProps`). */
  multiple?: false;
  /** Selected value, `null` for none. Controlled: pair with `onValueChange`. */
  value?: string | null;
  /** Initial value when uncontrolled. */
  defaultValue?: string | null;
  /** Called with the new value, or `null` when cleared. */
  onValueChange?: (value: string | null) => void;
}

export interface ComboboxMultipleProps extends ComboboxBaseProps {
  /** Pick several values. They show as chips; Backspace in the empty field removes the last one. */
  multiple: true;
  /** Selected values. Controlled: pair with `onValueChange`. */
  value?: readonly string[];
  /** Initial values when uncontrolled. */
  defaultValue?: readonly string[];
  /** Called with every selected value, in the order they were picked. */
  onValueChange?: (value: string[]) => void;
}

const toList = (value: string | null | readonly string[] | undefined): string[] =>
  value == null ? [] : typeof value === 'string' ? [value] : [...value];

const defaultFilter = (option: ComboboxOption, query: string) => matchesQuery(`${option.label} ${(option.keywords ?? []).join(' ')}`, query);

/** Options that match `query` with the default combobox matching (label and keywords; case and accents ignored). */
export function filterComboboxOptions(options: readonly ComboboxOption[], query: string): ComboboxOption[] {
  return query.trim() ? options.filter((o) => defaultFilter(o, query)) : [...options];
}

/**
 * A text field that filters a list as you type. Picks one value, or several with `multiple`.
 * Arrow keys move through the list, Enter picks, Esc closes. The ref points at the text input.
 */
export const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps | ComboboxMultipleProps>(function Combobox(
  {
    options,
    placeholder,
    emptyText = 'No matches.',
    clearable,
    disabled,
    invalid,
    required,
    name,
    filter,
    onInputChange,
    loading,
    loadingText = 'Loading…',
    toggleLabel = 'Show options',
    multiple,
    value,
    defaultValue,
    onValueChange,
    id,
    className,
    onBlur,
    'aria-describedby': describedBy,
    'aria-invalid': ariaInvalid,
    'aria-label': ariaLabel,
    'aria-labelledby': labelledBy,
    ...props
  },
  forwarded,
) {
  const isMultiple = multiple === true;
  const [raw, setRaw] = useControllableState<string | null | readonly string[]>(
    value,
    defaultValue ?? (isMultiple ? [] : null),
    onValueChange as ((next: string | null | readonly string[]) => void) | undefined,
  );
  const selected = toList(raw);
  const setSelected = (next: string[]) => setRaw(isMultiple ? next : next[0] ?? null);

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [typed, setTyped] = React.useState(false);
  const [active, setActive] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const controlRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const listId = useSafeId('combobox-list');

  const byValue = React.useMemo(() => new Map(options.map((o) => [o.value, o])), [options]);
  const indexOf = React.useMemo(() => new Map(options.map((o, i) => [o.value, i])), [options]);
  const search = typed ? query : '';
  const shown = React.useMemo(() => {
    if (filter === false || !search.trim()) return [...options];
    const match = filter ?? defaultFilter;
    return options.filter((o) => match(o, search));
  }, [options, filter, search]);
  const enabled = shown.filter((o) => !o.disabled);
  const sections = React.useMemo(() => {
    const out: { heading?: string; items: ComboboxOption[] }[] = [];
    for (const o of shown) {
      const last = out[out.length - 1];
      const section = o.group === undefined ? (last && last.heading === undefined ? last : undefined) : out.find((s) => s.heading === o.group);
      if (section) section.items.push(o);
      else out.push({ heading: o.group, items: [o] });
    }
    return out;
  }, [shown]);

  const optionId = (v: string) => `${listId}-${indexOf.get(v) ?? 0}`;
  const selectedLabel = !isMultiple && selected[0] !== undefined ? byValue.get(selected[0])?.label ?? selected[0] : '';
  const inputValue = isMultiple || typed ? query : selectedLabel;
  const activeOption = active !== null && enabled.some((o) => o.value === active) ? active : null;

  React.useEffect(() => enablePopoverPlacement(), []);
  // Name the list after the field's <label>, as Field renders it.
  React.useEffect(() => {
    const list = listRef.current;
    if (!list || !id || ariaLabel || labelledBy) return;
    const label = document.querySelector<HTMLLabelElement>(`label[for="${CSS.escape(id)}"]`);
    if (!label) return;
    label.id ||= `${listId}-label`;
    list.setAttribute('aria-labelledby', label.id);
  }, [id, ariaLabel, labelledBy, listId]);
  React.useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (open) showListbox(list, controlRef.current);
    else hideListbox(list);
  }, [open]);
  React.useEffect(() => {
    if (open && listRef.current) placePopover(listRef.current, controlRef.current);
  }, [open, shown.length, selected.length]);
  React.useEffect(() => {
    const list = listRef.current;
    const el = activeOption === null ? null : list?.querySelector<HTMLElement>(`[data-value="${CSS.escape(activeOption)}"]`);
    if (!list || !el) return;
    if (el.offsetTop < list.scrollTop) list.scrollTop = el.offsetTop;
    else if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight;
  }, [activeOption]);

  const show = () => {
    if (open || disabled) return;
    setOpen(true);
    const current = selected.find((v) => enabled.some((o) => o.value === v));
    setActive(current ?? enabled[0]?.value ?? null);
  };
  const updateQuery = (next: string) => {
    setQuery(next);
    onInputChange?.(next);
  };
  const hide = () => {
    if (!open) return;
    setOpen(false);
    setActive(null);
    if (!isMultiple && typed && !query.trim() && selected.length) setSelected([]);
    setTyped(false);
    if (query) updateQuery('');
  };
  const choose = (option: ComboboxOption | undefined) => {
    if (!option || option.disabled) return;
    if (isMultiple) {
      setSelected(selected.includes(option.value) ? selected.filter((v) => v !== option.value) : [...selected, option.value]);
      setTyped(false);
      if (query) updateQuery('');
      setActive(option.value);
    } else {
      setSelected([option.value]);
      setOpen(false);
      setActive(null);
      setTyped(false);
      if (query) updateQuery('');
    }
  };
  const move = (step: 1 | -1) => {
    const i = enabled.findIndex((o) => o.value === activeOption);
    const next = i < 0 ? (step === 1 ? 0 : enabled.length - 1) : Math.max(0, Math.min(enabled.length - 1, i + step));
    setActive(enabled[next]?.value ?? null);
  };

  const renderOption = (o: ComboboxOption) => {
    const isSelected = selected.includes(o.value);
    return (
      <div
        key={o.value}
        id={optionId(o.value)}
        role="option"
        className="bk-combobox-option"
        data-value={o.value}
        aria-selected={isSelected}
        aria-disabled={o.disabled || undefined}
        data-active={flag(activeOption === o.value)}
        onMouseMove={() => {
          if (!o.disabled && activeOption !== o.value) setActive(o.value);
        }}
        onClick={() => choose(o)}
      >
        {o.icon}
        {o.description ? (
          <span className="bk-combobox-option-text">
            <span>{o.label}</span>
            <span className="bk-combobox-option-description">{o.description}</span>
          </span>
        ) : (
          o.label
        )}
      </div>
    );
  };

  return (
    <div
      className={cx('bk-combobox', className)}
      data-multiple={flag(isMultiple)}
      data-open={flag(open)}
      data-has-value={flag(selected.length > 0)}
      data-bk-react=""
      onBlur={(e) => {
        onBlur?.(e);
        if (!(e.relatedTarget instanceof Node) || !e.currentTarget.contains(e.relatedTarget)) hide();
      }}
      {...props}
    >
      <div
        ref={controlRef}
        className="bk-combobox-control"
        onMouseDown={(e) => {
          if (e.target !== inputRef.current) e.preventDefault();
        }}
        onClick={(e) => {
          if (disabled) return;
          const target = e.target as Element;
          if (target.closest('.bk-chip-remove, .bk-combobox-clear')) return;
          if (target.closest('.bk-combobox-toggle') && open) hide();
          else show();
          inputRef.current?.focus();
        }}
      >
        {isMultiple
          ? selected.map((v) => {
              const label = byValue.get(v)?.label ?? v;
              return (
                <span key={v} className="bk-chip" data-value={v}>
                  {label}
                  <button
                    type="button"
                    className="bk-chip-remove"
                    tabIndex={-1}
                    aria-label={`Remove ${label}`}
                    disabled={disabled}
                    onClick={() => {
                      setSelected(selected.filter((s) => s !== v));
                      inputRef.current?.focus();
                    }}
                  />
                </span>
              );
            })
          : null}
        <input
          ref={composeRefs(inputRef, forwarded)}
          id={id}
          className="bk-combobox-input"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && activeOption !== null ? optionId(activeOption) : undefined}
          aria-describedby={describedBy}
          aria-invalid={invalid || ariaInvalid || undefined}
          aria-label={ariaLabel}
          aria-labelledby={labelledBy}
          autoComplete="off"
          placeholder={isMultiple && selected.length ? undefined : placeholder}
          disabled={disabled}
          required={required && selected.length === 0}
          value={inputValue}
          onChange={(e) => {
            setTyped(true);
            updateQuery(e.target.value);
            if (!open && !disabled) setOpen(true);
            const match = filter === false ? options : options.filter((o) => (filter ?? defaultFilter)(o, e.target.value));
            setActive(match.find((o) => !o.disabled)?.value ?? null);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
              e.preventDefault();
              if (!open) show();
              else move(e.key === 'ArrowDown' ? 1 : -1);
            } else if (e.key === 'Enter') {
              if (open && activeOption !== null) {
                e.preventDefault();
                choose(byValue.get(activeOption));
              }
            } else if (e.key === 'Escape') {
              if (open) {
                e.preventDefault();
                e.stopPropagation();
                hide();
              }
            } else if (e.key === 'Backspace' && isMultiple && !query && selected.length) {
              setSelected(selected.slice(0, -1));
            } else if (e.key === 'Tab') {
              hide();
            }
          }}
        />
        {clearable && selected.length > 0 ? (
          <button
            type="button"
            className="bk-combobox-clear"
            tabIndex={-1}
            aria-label="Clear"
            disabled={disabled}
            onClick={() => {
              setSelected([]);
              setTyped(false);
              if (query) updateQuery('');
              inputRef.current?.focus();
            }}
          />
        ) : null}
        <button type="button" className="bk-combobox-toggle" tabIndex={-1} aria-label={toggleLabel} disabled={disabled} />
      </div>
      <div
        ref={listRef}
        id={listId}
        {...({ popover: 'manual' } as Record<string, string>)}
        role="listbox"
        className="bk-combobox-list"
        aria-multiselectable={isMultiple || undefined}
        aria-label={ariaLabel}
        aria-labelledby={labelledBy}
        onMouseDown={(e) => e.preventDefault()}
      >
        {sections.map((section, i) =>
          section.heading === undefined ? (
            <React.Fragment key={`_${i}`}>{section.items.map(renderOption)}</React.Fragment>
          ) : (
            <div key={section.heading} className="bk-combobox-group" role="group" aria-label={section.heading}>
              <div className="bk-combobox-group-heading" aria-hidden="true">{section.heading}</div>
              {section.items.map(renderOption)}
            </div>
          ),
        )}
        {loading ? <div className="bk-combobox-empty" role="status">{loadingText}</div> : shown.length === 0 ? <div className="bk-combobox-empty">{emptyText}</div> : null}
      </div>
      {name ? (isMultiple ? selected : [selected[0] ?? '']).map((v, i) => <input key={`${v}-${i}`} type="hidden" name={name} value={v} />) : null}
    </div>
  );
});
