import * as React from 'react';
import { composeRefs, cx, flag, useControllableState, useSafeId } from './utils';

/* ---------------------------------------------------------------- Label, Field */

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(function Label({ className, ...props }, ref) {
  return <label ref={ref} className={cx('bk-label', className)} {...props} />;
});

export interface FieldProps {
  label?: React.ReactNode;
  /** Help text under the control. */
  description?: React.ReactNode;
  /** Error message. Also marks the control `aria-invalid`. */
  error?: React.ReactNode;
  /** Adds a visual marker to the label and `required` to the control. */
  required?: boolean;
  /** Id for the control. Generated when omitted. */
  id?: string;
  className?: string;
  /** Exactly one control: `Input`, `Textarea`, `Select`, `Slider`… */
  children: React.ReactElement;
}

/** Label + control + help text + error, with ids and ARIA wired automatically. */
export function Field({ label, description, error, required, id, className, children }: FieldProps): React.ReactElement {
  const generated = useSafeId('field');
  const childProps = children.props as Record<string, unknown>;
  const controlId = id ?? (childProps.id as string | undefined) ?? generated;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const control = React.cloneElement(children, {
    id: controlId,
    'aria-describedby': cx(childProps['aria-describedby'] as string | undefined, descriptionId, errorId) || undefined,
    'aria-invalid': error ? true : childProps['aria-invalid'],
    required: required ?? childProps.required,
  } as Record<string, unknown>);
  return (
    <div className={cx('bk-field', className)}>
      {label ? (
        <Label htmlFor={controlId}>
          {label}
          {required ? <span aria-hidden="true"> *</span> : null}
        </Label>
      ) : null}
      {control}
      {description ? <p id={descriptionId} className="bk-field-description">{description}</p> : null}
      {error ? <p id={errorId} className="bk-field-error">{error}</p> : null}
    </div>
  );
}

/* ---------------------------------------------------------------- Text controls */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Shorthand for `aria-invalid`. */
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input({ invalid, className, ...props }, ref) {
  return <input ref={ref} className={cx('bk-input', className)} aria-invalid={invalid || props['aria-invalid'] || undefined} {...props} />;
});

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ invalid, className, ...props }, ref) {
  return <textarea ref={ref} className={cx('bk-textarea', className)} aria-invalid={invalid || props['aria-invalid'] || undefined} {...props} />;
});

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

/** Styled native `<select>`: the most robust choice on phones and with screen readers. */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select({ invalid, className, ...props }, ref) {
  return <select ref={ref} className={cx('bk-select', className)} aria-invalid={invalid || props['aria-invalid'] || undefined} {...props} />;
});

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon shown inside the start of the input. */
  icon?: React.ReactNode;
  /** Content inside the end of the input, e.g. `<KbdGroup>`. */
  end?: React.ReactNode;
  /** One `Input`. */
  children: React.ReactNode;
}

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(function InputGroup({ icon, end, className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cx('bk-input-group', className)} {...props}>
      {icon ? <span className="bk-input-start" aria-hidden="true">{icon}</span> : null}
      {children}
      {end ? <span className="bk-input-end">{end}</span> : null}
    </div>
  );
});

/* ---------------------------------------------------------------- Checkbox, Radio, Switch */

interface OptionTextProps {
  /** When set, the control is wrapped in a clickable label row. */
  label?: React.ReactNode;
  description?: React.ReactNode;
}

function OptionRow({ control, label, description, className }: { control: React.ReactNode; className?: string } & OptionTextProps) {
  if (!label) return <>{control}</>;
  return (
    <label className={cx('bk-option', className)}>
      {control}
      <span className="bk-option-text">
        <span>{label}</span>
        {description ? <span>{description}</span> : null}
      </span>
    </label>
  );
}

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>, OptionTextProps {
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { indeterminate, label, description, className, onChange, onCheckedChange, ...props },
  ref,
) {
  const inner = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (inner.current) inner.current.indeterminate = !!indeterminate;
  }, [indeterminate]);
  const control = (
    <input
      ref={composeRefs(ref, inner)}
      type="checkbox"
      className={cx('bk-checkbox', !label && className)}
      onChange={(e) => {
        onChange?.(e);
        onCheckedChange?.(e.target.checked);
      }}
      {...props}
    />
  );
  return <OptionRow control={control} label={label} description={description} className={label ? className : undefined} />;
});

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>, OptionTextProps {}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio({ label, description, className, ...props }, ref) {
  const group = React.useContext(RadioGroupContext);
  const groupProps = group && props.value !== undefined
    ? { name: group.name, checked: group.value === String(props.value), onChange: () => group.setValue(String(props.value)) }
    : {};
  const control = <input ref={ref} type="radio" className={cx('bk-radio', !label && className)} {...props} {...groupProps} />;
  return <OptionRow control={control} label={label} description={description} className={label ? className : undefined} />;
});

interface RadioGroupContextValue {
  name: string;
  value: string;
  setValue: (value: string) => void;
}
const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'defaultValue' | 'onChange'> {
  /** Visible group label. Use `aria-label` instead to keep it hidden. */
  legend?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Shared `name` for the radios. Generated when omitted. */
  name?: string;
}

/** A `<fieldset>` of `Radio`s that share one value. */
export const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(function RadioGroup(
  { legend, value, defaultValue = '', onValueChange, name, className, children, ...props },
  ref,
) {
  const generated = useSafeId('radio');
  const [current, setCurrent] = useControllableState(value, defaultValue, onValueChange);
  const ctx = React.useMemo(() => ({ name: name ?? generated, value: current, setValue: setCurrent }), [name, generated, current, setCurrent]);
  return (
    <RadioGroupContext.Provider value={ctx}>
      <fieldset ref={ref} className={cx('bk-radio-group', className)} {...props}>
        {legend ? <legend className="bk-label" style={{ marginBottom: 4 }}>{legend}</legend> : null}
        {children}
      </fieldset>
    </RadioGroupContext.Provider>
  );
});

export interface ChoiceCardProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: 'radio' | 'checkbox';
  label: React.ReactNode;
  description?: React.ReactNode;
  /** Right-aligned detail, e.g. a price. */
  aside?: React.ReactNode;
}

/** A selectable card holding a radio or checkbox. */
export const ChoiceCard = React.forwardRef<HTMLInputElement, ChoiceCardProps>(function ChoiceCard(
  { type = 'radio', label, description, aside, className, ...props },
  ref,
) {
  const group = React.useContext(RadioGroupContext);
  const groupProps = type === 'radio' && group && props.value !== undefined
    ? { name: group.name, checked: group.value === String(props.value), onChange: () => group.setValue(String(props.value)) }
    : {};
  return (
    <label className={cx('bk-choice', className)}>
      <input ref={ref} type={type} className={type === 'radio' ? 'bk-radio' : 'bk-checkbox'} {...props} {...groupProps} />
      <span className="bk-option-text">
        <span>{label}</span>
        {description ? <span>{description}</span> : null}
      </span>
      {aside ? <span className="bk-choice-price">{aside}</span> : null}
    </label>
  );
});

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'role'>, OptionTextProps {
  tone?: 'default' | 'brand';
  onCheckedChange?: (checked: boolean) => void;
}

/** On/off switch. With `label`, renders a full-width row with the switch on the right. */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { tone = 'default', label, description, className, onChange, onCheckedChange, ...props },
  ref,
) {
  const control = (
    <input
      ref={ref}
      type="checkbox"
      role="switch"
      className={cx('bk-switch', !label && className)}
      data-tone={tone === 'brand' ? 'brand' : undefined}
      onChange={(e) => {
        onChange?.(e);
        onCheckedChange?.(e.target.checked);
      }}
      {...props}
    />
  );
  if (!label) return control;
  return (
    <label className={cx('bk-switch-row', className)}>
      <span className="bk-option-text">
        <span>{label}</span>
        {description ? <span>{description}</span> : null}
      </span>
      {control}
    </label>
  );
});

/* ---------------------------------------------------------------- Slider */

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'onChange'> {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { value, defaultValue, onValueChange, min = 0, max = 100, step = 1, className, style, ...props },
  ref,
) {
  const [current, setCurrent] = useControllableState(value, defaultValue ?? min, onValueChange);
  const percent = ((current - min) / (max - min || 1)) * 100;
  return (
    <input
      ref={ref}
      type="range"
      className={cx('bk-slider', className)}
      min={min}
      max={max}
      step={step}
      value={current}
      data-bk-react=""
      style={{ ...style, ['--val' as string]: `${percent}%` }}
      onChange={(e) => setCurrent(Number(e.target.value))}
      {...props}
    />
  );
});

/* ---------------------------------------------------------------- Input OTP */

export interface InputOTPProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Digits per group, e.g. `[3, 3]` for a 6-digit code with a separator. Default `[6]`. */
  groups?: number[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Called once every slot is filled. */
  onComplete?: (value: string) => void;
  disabled?: boolean;
}

/** One-time code input: digits only, auto-advance, backspace to go back, paste fills every slot. */
export const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(function InputOTP(
  { groups = [6], value, defaultValue = '', onValueChange, onComplete, disabled, className, ...props },
  ref,
) {
  const length = groups.reduce((a, b) => a + b, 0);
  const [code, setCode] = useControllableState(value, defaultValue, onValueChange);
  const inputs = React.useRef<Array<HTMLInputElement | null>>([]);
  // Empty slots are stored as spaces so a gap in the middle doesn't shift later digits.
  const digits = Array.from({ length }, (_, i) => (code[i] && code[i] !== ' ' ? code[i] : ''));

  const commit = (next: string[], focusIndex?: number) => {
    const joined = next.map((d) => d || ' ').join('').slice(0, length).replace(/\s+$/, '');
    setCode(joined);
    if (joined.length === length && !joined.includes(' ')) onComplete?.(joined);
    if (focusIndex !== undefined) inputs.current[Math.max(0, Math.min(focusIndex, length - 1))]?.focus();
  };

  let index = 0;
  return (
    <div ref={ref} role="group" className={cx('bk-otp', className)} data-bk-react="" {...props}>
      {groups.map((size, g) => (
        <React.Fragment key={g}>
          {g > 0 ? <span className="bk-otp-separator" aria-hidden="true" /> : null}
          <div className="bk-otp-group">
            {Array.from({ length: size }, () => {
              const i = index++;
              return (
                <input
                  key={i}
                  ref={(el) => {
                    inputs.current[i] = el;
                  }}
                  inputMode="numeric"
                  autoComplete={i === 0 ? 'one-time-code' : 'off'}
                  maxLength={1}
                  disabled={disabled}
                  aria-label={`Digit ${i + 1} of ${length}`}
                  value={digits[i]}
                  onChange={(e) => {
                    const d = e.target.value.replace(/\D/g, '').slice(-1);
                    const next = [...digits];
                    next[i] = d;
                    commit(next, d ? i + 1 : undefined);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !digits[i] && i > 0) {
                      e.preventDefault();
                      const next = [...digits];
                      next[i - 1] = '';
                      commit(next, i - 1);
                    } else if (e.key === 'ArrowLeft') inputs.current[i - 1]?.focus();
                    else if (e.key === 'ArrowRight') inputs.current[i + 1]?.focus();
                  }}
                  onPaste={(e) => {
                    const pasted = e.clipboardData.getData('text').replace(/\D/g, '');
                    if (!pasted) return;
                    e.preventDefault();
                    const next = [...digits];
                    [...pasted].forEach((d, k) => {
                      if (i + k < length) next[i + k] = d;
                    });
                    commit(next, i + pasted.length);
                  }}
                />
              );
            })}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
});

/* ---------------------------------------------------------------- Dropzone */

export interface DropzoneProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'title'> {
  title?: React.ReactNode;
  hint?: React.ReactNode;
  icon?: React.ReactNode;
  onFiles?: (files: File[]) => void;
}

/** Drag-and-drop area backed by a real `<input type="file">`, so keyboard and click work too. */
export const Dropzone = React.forwardRef<HTMLInputElement, DropzoneProps>(function Dropzone(
  { title = 'Drop files or click to upload', hint, icon, onFiles, onChange, className, ...props },
  ref,
) {
  const [names, setNames] = React.useState('');
  const [over, setOver] = React.useState(false);
  return (
    <label
      className={cx('bk-dropzone', className)}
      data-dragover={flag(over)}
      data-bk-react=""
      onDragEnter={() => setOver(true)}
      onDragOver={() => setOver(true)}
      onDragLeave={() => setOver(false)}
      onDrop={() => setOver(false)}
    >
      <input
        ref={ref}
        type="file"
        onChange={(e) => {
          onChange?.(e);
          const files = Array.from(e.target.files ?? []);
          setNames(files.map((f) => f.name).join(', '));
          onFiles?.(files);
        }}
        {...props}
      />
      {icon}
      <span className="bk-small">{title}</span>
      {hint ? <span className="bk-caption">{hint}</span> : null}
      {names ? <span className="bk-dropzone-files">{names}</span> : null}
    </label>
  );
});
