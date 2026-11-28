/** Colour theme. `system` follows the operating system. */
export type Theme = 'light' | 'dark' | 'system';
/** The theme actually shown after resolving `system`. */
export type ResolvedTheme = 'light' | 'dark';
export interface ThemeChangeDetail {
    theme: Theme;
    resolved: ResolvedTheme;
}
export type ToastVariant = 'default' | 'success' | 'destructive';
export interface ToastAction {
    label: string;
    onClick?: () => void;
}
export interface ToastOptions {
    title: string;
    description?: string;
    variant?: ToastVariant;
    /** Milliseconds before the toast closes. Default 4500. Use `Infinity` to keep it open. */
    duration?: number;
    action?: ToastAction;
}
/** Call to close a toast early. */
export type DismissToast = () => void;
export interface StartOptions {
    /** Re-run `init()` on nodes added to the page later (SPAs, htmx, Turbo). Default `true`. */
    observe?: boolean;
    /** Restore the theme saved in localStorage. Default `true`. */
    restoreTheme?: boolean;
}
export interface ComboboxChangeDetail {
    /** The selected value, or the first one in a multiple combobox. `null` when nothing is selected. */
    value: string | null;
    /** Every selected value, in list order. */
    values: string[];
}
export interface TagsChangeDetail {
    /** Every tag, in the order they were added. */
    values: string[];
}
export interface CalendarChangeDetail {
    /** Day of month the range starts on (or the selected day in single mode). */
    start: number;
    /** Day of month the range ends on. Equal to `start` in single mode. */
    end: number;
}
