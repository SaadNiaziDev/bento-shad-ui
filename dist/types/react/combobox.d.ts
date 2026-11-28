import * as React from 'react';
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
/** Options that match `query` with the default combobox matching (label and keywords; case and accents ignored). */
export declare function filterComboboxOptions(options: readonly ComboboxOption[], query: string): ComboboxOption[];
/**
 * A text field that filters a list as you type. Picks one value, or several with `multiple`.
 * Arrow keys move through the list, Enter picks, Esc closes. The ref points at the text input.
 */
export declare const Combobox: React.ForwardRefExoticComponent<(ComboboxProps | ComboboxMultipleProps) & React.RefAttributes<HTMLInputElement>>;
export {};
