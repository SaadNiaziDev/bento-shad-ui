import * as React from 'react';
export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: 'sm' | 'default' | 'lg';
    /** Screen-reader text. Default "Loading". Pass an empty string inside a labelled button. */
    label?: string;
}
export declare const Spinner: React.ForwardRefExoticComponent<SpinnerProps & React.RefAttributes<HTMLSpanElement>>;
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
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export declare const ButtonGroup: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
    pressed?: boolean;
    defaultPressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    variant?: 'default' | 'outline';
    /** Identifies the toggle inside a `ToggleGroup`. */
    value?: string;
}
export declare const Toggle: React.ForwardRefExoticComponent<ToggleProps & React.RefAttributes<HTMLButtonElement>>;
type ToggleGroupSingle = {
    type: 'single';
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
};
type ToggleGroupMultiple = {
    type: 'multiple';
    value?: string[];
    defaultValue?: string[];
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
    side?: 'top' | 'bottom';
    /** A single focusable element, usually a `Button`. */
    children: React.ReactElement;
}
/** CSS-only tooltip shown on hover and keyboard focus. Give icon-only buttons an `aria-label` too. */
export declare function Tooltip({ content, side, children }: TooltipProps): React.ReactElement;
export {};
