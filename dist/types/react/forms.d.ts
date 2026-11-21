import * as React from 'react';
export declare const Label: React.ForwardRefExoticComponent<React.LabelHTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>>;
export interface FieldProps {
    /** Visible label, linked to the control. */
    label?: React.ReactNode;
    /** Help text under the control. */
    description?: React.ReactNode;
    /** Error message. Also marks the control `aria-invalid`. */
    error?: React.ReactNode;
    /** Adds a visual marker to the label and `required` to the control. */
    required?: boolean;
    /** Id for the control. Generated when omitted. */
    id?: string;
    /** Class for the wrapper. */
    className?: string;
    /** Exactly one control: `Input`, `Textarea`, `Select`, `Slider`… */
    children: React.ReactElement;
}
/** Label + control + help text + error, with ids and ARIA wired automatically. */
export declare function Field({ label, description, error, required, id, className, children }: FieldProps): React.ReactElement;
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Shorthand for `aria-invalid`. */
    invalid?: boolean;
}
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Shorthand for `aria-invalid`. */
    invalid?: boolean;
}
export declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    /** Shorthand for `aria-invalid`. */
    invalid?: boolean;
}
/** Styled native `<select>`: the most robust choice on phones and with screen readers. */
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Icon shown inside the start of the input. */
    icon?: React.ReactNode;
    /** Content inside the end of the input, e.g. `<KbdGroup>`. */
    end?: React.ReactNode;
    /** One `Input`. */
    children: React.ReactNode;
}
export declare const InputGroup: React.ForwardRefExoticComponent<InputGroupProps & React.RefAttributes<HTMLDivElement>>;
interface OptionTextProps {
    /** When set, the control is wrapped in a clickable label row. */
    label?: React.ReactNode;
    /** Smaller second line under the label. */
    description?: React.ReactNode;
}
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>, OptionTextProps {
    /** Shows a dash: some, but not all, sub-options are checked. */
    indeterminate?: boolean;
    /** Called with the new checked state. */
    onCheckedChange?: (checked: boolean) => void;
}
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>, OptionTextProps {
}
export declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>>;
export interface RadioGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'defaultValue' | 'onChange'> {
    /** Visible group label. Use `aria-label` instead to keep it hidden. */
    legend?: React.ReactNode;
    /** Selected value (controlled). */
    value?: string;
    /** Initially selected value (uncontrolled). */
    defaultValue?: string;
    /** Called with the newly selected value. */
    onValueChange?: (value: string) => void;
    /** Shared `name` for the radios. Generated when omitted. */
    name?: string;
}
/** A `<fieldset>` of `Radio`s that share one value. */
export declare const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLFieldSetElement>>;
export interface ChoiceCardProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    /** Single choice in a group (`radio`) or independent (`checkbox`). */
    type?: 'radio' | 'checkbox';
    /** Main text of the card. */
    label: React.ReactNode;
    /** Second line under the label. */
    description?: React.ReactNode;
    /** Right-aligned detail, e.g. a price. */
    aside?: React.ReactNode;
}
/** A selectable card holding a radio or checkbox. */
export declare const ChoiceCard: React.ForwardRefExoticComponent<ChoiceCardProps & React.RefAttributes<HTMLInputElement>>;
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'role'>, OptionTextProps {
    /** `brand` uses the accent colour when on. */
    tone?: 'default' | 'brand';
    /** Called with the new on/off state. */
    onCheckedChange?: (checked: boolean) => void;
}
/** On/off switch. With `label`, renders a full-width row with the switch on the right. */
export declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLInputElement>>;
export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'onChange'> {
    /** Current value (controlled). */
    value?: number;
    /** Initial value (uncontrolled). Defaults to `min`. */
    defaultValue?: number;
    /** Called with the new number while dragging. */
    onValueChange?: (value: number) => void;
    /** Lowest value. Default 0. */
    min?: number;
    /** Highest value. Default 100. */
    max?: number;
    /** Increment. Default 1. */
    step?: number;
}
export declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLInputElement>>;
export interface InputOTPProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
    /** Digits per group, e.g. `[3, 3]` for a 6-digit code with a separator. Default `[6]`. */
    groups?: number[];
    /** Entered code (controlled). */
    value?: string;
    /** Initial code (uncontrolled). */
    defaultValue?: string;
    /** Called with the code on every change. */
    onValueChange?: (value: string) => void;
    /** Called once every slot is filled. */
    onComplete?: (value: string) => void;
    /** Disables every slot. */
    disabled?: boolean;
}
/** One-time code input: digits only, auto-advance, backspace to go back, paste fills every slot. */
export declare const InputOTP: React.ForwardRefExoticComponent<InputOTPProps & React.RefAttributes<HTMLDivElement>>;
export interface DropzoneProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'title'> {
    /** Main line of text. Default "Drop files or click to upload". */
    title?: React.ReactNode;
    /** Second line, for example accepted types and size. */
    hint?: React.ReactNode;
    /** Icon above the text. */
    icon?: React.ReactNode;
    /** Called with the chosen files. */
    onFiles?: (files: File[]) => void;
}
/** Drag-and-drop area backed by a real `<input type="file">`, so keyboard and click work too. */
export declare const Dropzone: React.ForwardRefExoticComponent<DropzoneProps & React.RefAttributes<HTMLInputElement>>;
export {};
