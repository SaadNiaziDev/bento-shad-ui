import { $$, emit, isManaged } from './dom';
import type { TagsChangeDetail } from './types';

/** Splits typed or pasted text into tags at `delimiter` and line breaks, trims them and drops empty ones. */
export function splitTags(text: string, delimiter = ','): string[] {
  return text
    .split(delimiter)
    .flatMap((part) => part.split(/\r?\n/))
    .map((part) => part.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

export interface AddTagsOptions {
  /** Most tags allowed. Extra tags are returned in `rejected`. */
  max?: number;
  /** Keep a tag that is already in the list. Duplicates are compared without case. Default `false`. */
  allowDuplicates?: boolean;
}

export interface AddTagsResult {
  /** The new list. */
  tags: string[];
  /** Tags that were added. */
  added: string[];
  /** Tags left out because they were already in the list. */
  duplicates: string[];
  /** Tags left out because the list was full. */
  rejected: string[];
}

/** Adds `incoming` to `current`, skipping duplicates (ignoring case) and anything past `max`. */
export function addTags(current: readonly string[], incoming: readonly string[], options: AddTagsOptions = {}): AddTagsResult {
  const { max = Infinity, allowDuplicates = false } = options;
  const tags = [...current];
  const seen = new Set(tags.map((t) => t.toLowerCase()));
  const result: AddTagsResult = { tags, added: [], duplicates: [], rejected: [] };
  for (const tag of incoming) {
    const key = tag.toLowerCase();
    if (!allowDuplicates && seen.has(key)) result.duplicates.push(tag);
    else if (tags.length >= max) result.rejected.push(tag);
    else {
      tags.push(tag);
      result.added.push(tag);
      seen.add(key);
    }
  }
  return result;
}

/** What a screen reader hears after an add. Shared with the React component. */
export function describeTagChange(result: AddTagsResult, max?: number): string {
  const parts: string[] = [];
  if (result.added.length === 1) parts.push(`Added ${result.added[0]}.`);
  else if (result.added.length > 1) parts.push(`Added ${result.added.length} tags.`);
  if (result.duplicates.length === 1) parts.push(`${result.duplicates[0]} is already added.`);
  else if (result.duplicates.length > 1) parts.push(`${result.duplicates.length} tags were already added.`);
  if (result.rejected.length) parts.push(`Limit of ${max} tags reached.`);
  return parts.join(' ');
}

/* ---------- Tags input: .bk-tags > .bk-chip[data-value]* + input.bk-tags-input ---------- */
export function initTags(root: ParentNode, once: (el: Element, key: string) => boolean): void {
  for (const box of $$('.bk-tags', root)) {
    if (isManaged(box) || !once(box, 'tags')) continue;
    const input = box.querySelector<HTMLInputElement>('.bk-tags-input');
    if (!input) continue;
    const delimiter = box.getAttribute('data-delimiter') || ',';
    const max = Number(box.getAttribute('data-max')) || undefined;
    const allowDuplicates = box.hasAttribute('data-allow-duplicates');
    const placeholder = input.placeholder;
    let tags = $$('.bk-chip', box).map((chip) => chip.getAttribute('data-value') ?? chip.textContent?.trim() ?? '').filter(Boolean);

    const status = document.createElement('span');
    status.className = 'bk-sr-only';
    status.setAttribute('aria-live', 'polite');
    box.append(status);
    const announce = (text: string) => {
      status.textContent = text;
    };

    const removeButtons = () => $$<HTMLButtonElement>('.bk-chip-remove', box);

    const render = () => {
      for (const chip of $$('.bk-chip', box)) chip.remove();
      for (const tag of tags) {
        const chip = document.createElement('span');
        chip.className = 'bk-chip';
        chip.setAttribute('data-value', tag);
        chip.textContent = tag;
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'bk-chip-remove';
        remove.tabIndex = -1;
        remove.disabled = input.disabled;
        remove.setAttribute('aria-label', `Remove ${tag}`);
        chip.append(remove);
        box.insertBefore(chip, input);
      }
      input.placeholder = tags.length ? '' : placeholder;
      input.required = box.hasAttribute('data-required') && !tags.length;
      const name = box.getAttribute('data-name');
      if (name) {
        for (const hidden of $$('input[data-bk-tags-value]', box)) hidden.remove();
        for (const tag of tags) {
          const hidden = document.createElement('input');
          hidden.type = 'hidden';
          hidden.name = name;
          hidden.value = tag;
          hidden.setAttribute('data-bk-tags-value', '');
          box.append(hidden);
        }
      }
      if (tags.length) box.setAttribute('data-has-value', '');
      else box.removeAttribute('data-has-value');
    };

    const changed = () => {
      render();
      emit<TagsChangeDetail>(box, 'bk:change', { values: [...tags] });
    };

    /** Adds the tags in `text`. Returns the text to leave in the field: tags that did not fit. */
    const commit = (text: string): string => {
      const parts = splitTags(text, delimiter);
      if (!parts.length) return '';
      const result = addTags(tags, parts, { max, allowDuplicates });
      if (result.added.length) {
        tags = result.tags;
        changed();
      }
      for (const dup of result.duplicates) {
        const chip = $$('.bk-chip', box).find((c) => c.getAttribute('data-value')?.toLowerCase() === dup.toLowerCase());
        if (!chip) continue;
        chip.setAttribute('data-duplicate', '');
        setTimeout(() => chip.removeAttribute('data-duplicate'), 700);
      }
      announce(describeTagChange(result, max));
      return result.rejected.join(`${delimiter} `);
    };

    const removeAt = (index: number) => {
      const [tag] = tags.splice(index, 1);
      if (tag === undefined) return;
      changed();
      announce(`Removed ${tag}.`);
    };

    input.addEventListener('keydown', (e) => {
      const atStart = input.selectionStart === 0 && input.selectionEnd === 0;
      if ((e.key === 'Enter' || e.key === delimiter) && input.value.trim()) {
        e.preventDefault();
        const kept = commit(input.value);
        // Text that did not fit stays as typed, separator included.
        input.value = kept && e.key === delimiter ? `${kept}${delimiter} ` : kept;
      } else if (e.key === delimiter) {
        e.preventDefault();
      } else if (e.key === 'Backspace' && !input.value && tags.length) {
        e.preventDefault();
        removeAt(tags.length - 1);
      } else if (e.key === 'ArrowLeft' && atStart && tags.length) {
        e.preventDefault();
        removeButtons().at(-1)?.focus();
      }
    });

    // Typing or dropping text that contains the delimiter adds everything before the last one.
    input.addEventListener('input', () => {
      const at = input.value.lastIndexOf(delimiter);
      if (at < 0) return;
      const rest = input.value.slice(at + 1).trimStart();
      const kept = commit(input.value.slice(0, at));
      input.value = kept ? `${kept}${delimiter} ${rest}` : rest;
    });

    input.addEventListener('paste', (e) => {
      const text = e.clipboardData?.getData('text') ?? '';
      if (!text.includes(delimiter) && !/\r?\n/.test(text)) return;
      e.preventDefault();
      input.value = commit(`${input.value}${delimiter}${text}`);
    });

    box.addEventListener('keydown', (e) => {
      const button = e.target instanceof Element ? e.target.closest<HTMLButtonElement>('.bk-chip-remove') : null;
      if (!button) return;
      const buttons = removeButtons();
      const i = buttons.indexOf(button);
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        buttons[Math.max(0, i - 1)]?.focus();
      } else if (e.key === 'ArrowRight' || e.key === 'Escape') {
        e.preventDefault();
        (e.key === 'ArrowRight' ? buttons[i + 1] ?? input : input).focus();
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        removeAt(i);
        (removeButtons()[Math.max(0, i - 1)] ?? input).focus();
      }
    });

    box.addEventListener('click', (e) => {
      if (input.disabled) return;
      const button = e.target instanceof Element ? e.target.closest('.bk-chip-remove') : null;
      if (button) {
        removeAt(removeButtons().indexOf(button as HTMLButtonElement));
        input.focus();
      } else if (e.target === box) {
        input.focus();
      }
    });

    // Leaving the field keeps what was typed as a tag, so nothing is lost on submit.
    box.addEventListener('focusout', (e) => {
      const next = (e as FocusEvent).relatedTarget;
      if (next instanceof Node && box.contains(next)) return;
      if (box.getAttribute('data-add-on-blur') !== 'false' && input.value.trim()) input.value = commit(input.value);
    });

    render();
  }
}
