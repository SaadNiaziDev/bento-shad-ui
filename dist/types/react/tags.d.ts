import * as React from 'react';
export interface TagsInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'children' | 'placeholder'> {
    /** The tags. Controlled: pair with `onValueChange`. */
    value?: readonly string[];
    /** Initial tags when uncontrolled. */
    defaultValue?: readonly string[];
    /** Called with every tag after one is added or removed. */
    onValueChange?: (tags: string[]) => void;
    /** Shown while there are no tags. */
    placeholder?: string;
    /** Most tags allowed. Text past the limit stays in the field. */
    max?: number;
    /** Keep tags that repeat one already added. Duplicates are compared without case. */
    allowDuplicates?: boolean;
    /** Character that ends a tag, besides Enter. Pasted text is split on it and on line breaks. */
    delimiter?: string;
    /** Turn leftover text into a tag when focus leaves the field. */
    addOnBlur?: boolean;
    /** Disables the field and its remove buttons. */
    disabled?: boolean;
    /** Shorthand for `aria-invalid`. */
    invalid?: boolean;
    /** Requires at least one tag. `Field` sets it for you. */
    required?: boolean;
    /** Submits the tags with a form: one hidden input per tag. */
    name?: string;
}
/**
 * Free-text tags: type and press Enter or the delimiter, paste a list, remove with × or Backspace.
 * ← from the start of the field moves through the tags. The ref points at the text input.
 */
export declare const TagsInput: React.ForwardRefExoticComponent<TagsInputProps & React.RefAttributes<HTMLInputElement>>;
