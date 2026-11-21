import * as React from 'react';
export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Diameter: 14px (`sm`), 18px or 28px (`lg`). */
    size?: 'sm' | 'default' | 'lg';
    /** Screen-reader text. Default "Loading". Pass an empty string inside a labelled button. */
    label?: string;
}
export declare const Spinner: React.ForwardRefExoticComponent<SpinnerProps & React.RefAttributes<HTMLSpanElement>>;
export type ButtonVariant = 'default' | 'brand' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'default' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual style. `brand` is the accent colour; `destructive` is for delete actions. */
    variant?: ButtonVariant;
    /** Height: xs 28px, sm 34px, default 40px, lg 46px. `icon*` sizes are square. */
    size?: ButtonSize;
    /** Shows a spinner and disables the button. */
    loading?: boolean;
    /** Full width. */
    block?: boolean;
    /** Render the single child (e.g. `<a>` or Next.js `<Link>`) with button styles. */
    asChild?: boolean;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export declare const ButtonGroup: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
    /** Pressed state (controlled). */
    pressed?: boolean;
    /** Initial pressed state (uncontrolled). */
    defaultPressed?: boolean;
    /** Called with the new pressed state. */
    onPressedChange?: (pressed: boolean) => void;
    /** `outline` adds a border. */
    variant?: 'default' | 'outline';
    /** Identifies the toggle inside a `ToggleGroup`. */
    value?: string;
}
export declare const Toggle: React.ForwardRefExoticComponent<ToggleProps & React.RefAttributes<HTMLButtonElement>>;
type ToggleGroupSingle = {
    /** `single`: exactly one toggle is pressed. `multiple`: any number. */
    type: 'single';
    /** Pressed value, or values for `multiple` (controlled). */
    value?: string;
    /** Initially pressed value, or values for `multiple` (uncontrolled). */
    defaultValue?: string;
    /** Called with the new value, or array of values for `multiple`. */
    onValueChange?: (value: string) => void;
};
type ToggleGroupMultiple = {
    /** `single`: exactly one toggle is pressed. `multiple`: any number. */
    type: 'multiple';
    /** Pressed value, or values for `multiple` (controlled). */
    value?: string[];
    /** Initially pressed value, or values for `multiple` (uncontrolled). */
    defaultValue?: string[];
    /** Called with the new value, or array of values for `multiple`. */
    onValueChange?: (value: string[]) => void;
};
export type ToggleGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> & (ToggleGroupSingle | ToggleGroupMultiple);
/** Segmented control. `type="single"` keeps exactly one pressed; `type="multiple"` allows any. */
export declare const ToggleGroup: React.ForwardRefExoticComponent<ToggleGroupProps & React.RefAttributes<HTMLDivElement>>;
export declare const Kbd: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>>;
export declare const KbdGroup: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
export interface TooltipProps {
    /** Tooltip text. Plain text only (it is rendered by CSS). */
    content: string;
    /** Show above (default) or below the element. */
    side?: 'top' | 'bottom';
    /** A single focusable element, usually a `Button`. */
    children: React.ReactElement;
}
/** CSS-only tooltip shown on hover and keyboard focus. Give icon-only buttons an `aria-label` too. */
export declare function Tooltip({ content, side, children }: TooltipProps): React.ReactElement;
export {};
