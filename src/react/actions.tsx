import * as React from 'react';
import { cx, flag, part, Slot, useControllableState } from './utils';

/* ---------------------------------------------------------------- Spinner */

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'default' | 'lg';
  /** Screen-reader text. Default "Loading". Pass an empty string inside a labelled button. */
  label?: string;
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner({ size = 'default', label = 'Loading', className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cx('bk-spinner', className)}
      data-size={size === 'default' ? undefined : size}
      role={label ? 'status' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      {...props}
    />
  );
});

/* ---------------------------------------------------------------- Button */

export type ButtonVariant = 'default' | 'brand' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'default' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner and disables the button. */
  loading?: boolean;
  /** Full width. */
  block?: boolean;
  /** Render the single child (e.g. `<a>` or Next.js `<Link>`) with button styles. */
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'default', size = 'default', loading = false, block = false, asChild = false, className, children, disabled, type, ...props },
  ref,
) {
  const attrs = {
    className: cx('bk-button', className),
    'data-variant': variant === 'default' ? undefined : variant,
    'data-size': size === 'default' ? undefined : size,
    'data-loading': flag(loading),
    'data-block': flag(block),
  };
  if (asChild) {
    return (
      <Slot ref={ref as React.Ref<HTMLElement>} {...attrs} {...props}>
        {children}
      </Slot>
    );
  }
  return (
    <button ref={ref} type={type ?? 'button'} disabled={disabled || loading} aria-busy={loading || undefined} {...attrs} {...props}>
      {loading ? <Spinner size="sm" label="" /> : null}
      {children}
    </button>
  );
});

export const ButtonGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function ButtonGroup({ className, ...props }, ref) {
  return <div ref={ref} role="group" className={cx('bk-button-group', className)} {...props} />;
});

/* ---------------------------------------------------------------- Toggle */

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: 'default' | 'outline';
  /** Identifies the toggle inside a `ToggleGroup`. */
  value?: string;
}

interface ToggleGroupContextValue {
  isPressed: (value: string) => boolean;
  toggle: (value: string) => void;
}
const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null);

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { pressed, defaultPressed = false, onPressedChange, variant = 'default', value, className, onClick, type, ...props },
  ref,
) {
  const group = React.useContext(ToggleGroupContext);
  const [own, setOwn] = useControllableState(pressed, defaultPressed, onPressedChange);
  const isOn = group && value !== undefined ? group.isPressed(value) : own;
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      className={cx('bk-toggle', className)}
      data-variant={variant === 'outline' ? 'outline' : undefined}
      data-bk-react=""
      aria-pressed={isOn}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (group && value !== undefined) group.toggle(value);
        else setOwn(!own);
      }}
      {...props}
    />
  );
});

type ToggleGroupSingle = { type: 'single'; value?: string; defaultValue?: string; onValueChange?: (value: string) => void };
type ToggleGroupMultiple = { type: 'multiple'; value?: string[]; defaultValue?: string[]; onValueChange?: (value: string[]) => void };

export type ToggleGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> & (ToggleGroupSingle | ToggleGroupMultiple);

/** Segmented control. `type="single"` keeps exactly one pressed; `type="multiple"` allows any. */
export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(function ToggleGroup(props, ref) {
  const { type, value, defaultValue, onValueChange, className, children, ...rest } = props as ToggleGroupProps & {
    value?: string | string[];
    defaultValue?: string | string[];
    onValueChange?: (v: string | string[]) => void;
  };
  const [current, setCurrent] = useControllableState<string | string[]>(value, defaultValue ?? (type === 'single' ? '' : []), onValueChange);
  const ctx = React.useMemo<ToggleGroupContextValue>(
    () => ({
      isPressed: (v) => (Array.isArray(current) ? current.includes(v) : current === v),
      toggle: (v) => {
        if (type === 'single') setCurrent(v);
        else {
          const list = Array.isArray(current) ? current : [];
          setCurrent(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
        }
      },
    }),
    [current, setCurrent, type],
  );
  return (
    <ToggleGroupContext.Provider value={ctx}>
      <div ref={ref} role="group" className={cx('bk-toggle-group', className)} data-type={type} data-bk-react="" {...rest}>
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
});

/* ---------------------------------------------------------------- Kbd, Tooltip */

export const Kbd = part('kbd', 'bk-kbd', 'Kbd');
export const KbdGroup = part('span', 'bk-kbd-group', 'KbdGroup');

export interface TooltipProps {
  /** Tooltip text. Plain text only (it is rendered by CSS). */
  content: string;
  side?: 'top' | 'bottom';
  /** A single focusable element, usually a `Button`. */
  children: React.ReactElement;
}

/** CSS-only tooltip shown on hover and keyboard focus. Give icon-only buttons an `aria-label` too. */
export function Tooltip({ content, side = 'top', children }: TooltipProps): React.ReactElement {
  return (
    <Slot data-bk-tooltip={content} data-bk-tooltip-side={side === 'bottom' ? 'bottom' : undefined}>
      {children}
    </Slot>
  );
}
