import * as React from 'react';
import { addTags, describeTagChange, splitTags } from '../core';
import { composeRefs, cx, flag, useControllableState } from './utils';

/* ---------------------------------------------------------------- Tags input */

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
export const TagsInput = React.forwardRef<HTMLInputElement, TagsInputProps>(function TagsInput(
  {
    value,
    defaultValue = [],
    onValueChange,
    placeholder,
    max,
    allowDuplicates,
    delimiter = ',',
    addOnBlur = true,
    disabled,
    invalid,
    required,
    name,
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
  const [raw, setRaw] = useControllableState<readonly string[]>(value, defaultValue, onValueChange as ((next: readonly string[]) => void) | undefined);
  const tags = [...raw];
  const [text, setText] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [flash, setFlash] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const boxRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!flash.length) return;
    const timer = setTimeout(() => setFlash([]), 700);
    return () => clearTimeout(timer);
  }, [flash]);

  /** Adds the tags in `input`; returns the text that did not fit. */
  const commit = (input: string): string => {
    const parts = splitTags(input, delimiter);
    if (!parts.length) return '';
    const result = addTags(tags, parts, { max, allowDuplicates });
    if (result.added.length) setRaw(result.tags);
    if (result.duplicates.length) setFlash(result.duplicates.map((d) => d.toLowerCase()));
    setStatus(describeTagChange(result, max));
    return result.rejected.join(`${delimiter} `);
  };
  const removeAt = (index: number) => {
    const tag = tags[index];
    if (tag === undefined) return;
    setRaw(tags.filter((_, i) => i !== index));
    setStatus(`Removed ${tag}.`);
  };
  const removeButtons = () => Array.from(boxRef.current?.querySelectorAll<HTMLButtonElement>('.bk-chip-remove') ?? []);

  return (
    <div
      ref={boxRef}
      className={cx('bk-tags', className)}
      data-has-value={flag(tags.length > 0)}
      data-bk-react=""
      onClick={(e) => {
        if (e.target === e.currentTarget && !disabled) inputRef.current?.focus();
      }}
      onBlur={(e) => {
        onBlur?.(e);
        if (e.relatedTarget instanceof Node && e.currentTarget.contains(e.relatedTarget)) return;
        if (addOnBlur && text.trim()) setText(commit(text));
      }}
      {...props}
    >
      {tags.map((tag, i) => (
        <span key={`${tag}-${i}`} className="bk-chip" data-value={tag} data-duplicate={flag(flash.includes(tag.toLowerCase()))}>
          {tag}
          <button
            type="button"
            className="bk-chip-remove"
            tabIndex={-1}
            aria-label={`Remove ${tag}`}
            disabled={disabled}
            onClick={() => {
              removeAt(i);
              inputRef.current?.focus();
            }}
            onKeyDown={(e) => {
              const buttons = removeButtons();
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                buttons[Math.max(0, i - 1)]?.focus();
              } else if (e.key === 'ArrowRight' || e.key === 'Escape') {
                e.preventDefault();
                (e.key === 'ArrowRight' ? buttons[i + 1] ?? inputRef.current : inputRef.current)?.focus();
              } else if (e.key === 'Backspace' || e.key === 'Delete') {
                e.preventDefault();
                removeAt(i);
                // The list re-renders without this chip: focus the one before it, or the field.
                requestAnimationFrame(() => (removeButtons()[Math.max(0, i - 1)] ?? inputRef.current)?.focus());
              }
            }}
          />
        </span>
      ))}
      <input
        ref={composeRefs(inputRef, forwarded)}
        id={id}
        className="bk-tags-input"
        value={text}
        placeholder={tags.length ? undefined : placeholder}
        disabled={disabled}
        required={required && tags.length === 0}
        aria-describedby={describedBy}
        aria-invalid={invalid || ariaInvalid || undefined}
        aria-label={ariaLabel}
        aria-labelledby={labelledBy}
        autoComplete="off"
        enterKeyHint="enter"
        onChange={(e) => {
          const next = e.target.value;
          const at = next.lastIndexOf(delimiter);
          if (at < 0) return setText(next);
          const rest = next.slice(at + 1).trimStart();
          const kept = commit(next.slice(0, at));
          // Text that did not fit stays as typed, separator included.
          setText(kept ? `${kept}${delimiter} ${rest}` : rest);
        }}
        onPaste={(e) => {
          const pasted = e.clipboardData.getData('text');
          if (!pasted.includes(delimiter) && !/\r?\n/.test(pasted)) return;
          e.preventDefault();
          setText(commit(`${text}${delimiter}${pasted}`));
        }}
        onKeyDown={(e) => {
          const input = e.currentTarget;
          if ((e.key === 'Enter' || e.key === delimiter) && text.trim()) {
            e.preventDefault();
            const kept = commit(text);
            setText(kept && e.key === delimiter ? `${kept}${delimiter} ` : kept);
          } else if (e.key === delimiter) {
            e.preventDefault();
          } else if (e.key === 'Backspace' && !text && tags.length) {
            e.preventDefault();
            removeAt(tags.length - 1);
          } else if (e.key === 'ArrowLeft' && input.selectionStart === 0 && input.selectionEnd === 0 && tags.length) {
            e.preventDefault();
            removeButtons().at(-1)?.focus();
          }
        }}
      />
      <span className="bk-sr-only" aria-live="polite">{status}</span>
      {name ? tags.map((tag, i) => <input key={`${tag}-${i}`} type="hidden" name={name} value={tag} />) : null}
    </div>
  );
});
