import { $$, emit, isManaged } from './dom';
import { placePopover } from './popover';
import type { ComboboxChangeDetail } from './types';

/** Lower-cases text and strips accents, so "sao" finds "São Paulo". */
export function foldText(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/** True when every word of `query` appears somewhere in `text`, ignoring case and accents. An empty query matches. */
export function matchesQuery(text: string, query: string): boolean {
  const haystack = foldText(text);
  return foldText(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

function popoverOpen(el: HTMLElement): boolean {
  try {
    return el.matches(':popover-open');
  } catch {
    return false;
  }
}

/** Shows a combobox list in the top layer and lines it up with `anchor`. Shared with the React component. */
export function showListbox(list: HTMLElement, anchor: HTMLElement | null): void {
  if (typeof list.showPopover === 'function' && !popoverOpen(list)) {
    try {
      list.showPopover();
    } catch {
      /* not connected, or already shown by another script */
    }
  }
  placePopover(list, anchor);
}

export function hideListbox(list: HTMLElement): void {
  if (typeof list.hidePopover === 'function' && popoverOpen(list)) {
    try {
      list.hidePopover();
    } catch {
      /* already hidden */
    }
  }
  list.removeAttribute('data-placed');
}

let uid = 0;
const nextId = (prefix: string) => `bk-${prefix}-${++uid}`;
const escapeId = (id: string) => (typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(id) : id.replace(/"/g, '\\"'));

/* ---------- Combobox: .bk-combobox > .bk-combobox-control > .bk-combobox-input, plus .bk-combobox-list ---------- */
export function initCombobox(root: ParentNode, once: (el: Element, key: string) => boolean): void {
  for (const box of $$('.bk-combobox', root)) {
    if (isManaged(box) || !once(box, 'combobox')) continue;
    const input = box.querySelector<HTMLInputElement>('.bk-combobox-input');
    const list = box.querySelector<HTMLElement>('.bk-combobox-list');
    if (!input || !list) continue;
    const control = box.querySelector<HTMLElement>('.bk-combobox-control') ?? input;
    const clear = box.querySelector<HTMLElement>('.bk-combobox-clear');
    const multiple = box.hasAttribute('data-multiple');
    const placeholder = input.placeholder;
    let typed = false;

    list.id ||= nextId('listbox');
    list.setAttribute('role', 'listbox');
    if (!list.hasAttribute('popover')) list.setAttribute('popover', 'manual');
    if (multiple) list.setAttribute('aria-multiselectable', 'true');
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-controls', list.id);
    input.setAttribute('autocomplete', 'off');
    if (input.id && !list.hasAttribute('aria-label') && !list.hasAttribute('aria-labelledby')) {
      const label = document.querySelector<HTMLElement>(`label[for="${escapeId(input.id)}"]`);
      if (label) {
        label.id ||= nextId('label');
        list.setAttribute('aria-labelledby', label.id);
      }
    }

    const options = () => $$('.bk-combobox-option', list);
    for (const option of options()) {
      option.setAttribute('role', 'option');
      option.id ||= nextId('option');
      if (!option.hasAttribute('aria-selected')) option.setAttribute('aria-selected', 'false');
    }
    for (const group of $$('.bk-combobox-group', list)) group.setAttribute('role', 'group');

    const labelOf = (o: HTMLElement) => o.getAttribute('data-label') ?? o.textContent?.trim() ?? '';
    const valueOf = (o: HTMLElement) => o.getAttribute('data-value') ?? labelOf(o);
    const selected = () => options().filter((o) => o.getAttribute('aria-selected') === 'true');
    const enabled = () => options().filter((o) => !o.hidden && o.getAttribute('aria-disabled') !== 'true');
    const active = () => options().find((o) => o.hasAttribute('data-active'));
    const isOpen = () => input.getAttribute('aria-expanded') === 'true';

    const setActive = (option: HTMLElement | undefined) => {
      for (const o of options()) {
        if (o === option) o.setAttribute('data-active', '');
        else o.removeAttribute('data-active');
      }
      if (!option) {
        input.removeAttribute('aria-activedescendant');
        return;
      }
      input.setAttribute('aria-activedescendant', option.id);
      const top = option.offsetTop;
      const bottom = top + option.offsetHeight;
      if (top < list.scrollTop) list.scrollTop = top;
      else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
    };

    const filter = (query: string) => {
      let any = false;
      for (const o of options()) {
        const match = matchesQuery(`${labelOf(o)} ${o.getAttribute('data-keywords') ?? ''}`, query);
        o.hidden = !match;
        any ||= match;
      }
      for (const group of $$('.bk-combobox-group', list)) group.hidden = !$$('.bk-combobox-option', group).some((o) => !o.hidden);
      const empty = list.querySelector<HTMLElement>('.bk-combobox-empty');
      if (empty) empty.hidden = any;
    };

    const render = () => {
      const chosen = selected();
      if (multiple) {
        for (const chip of $$('.bk-chip', control)) chip.remove();
        for (const o of chosen) {
          const chip = document.createElement('span');
          chip.className = 'bk-chip';
          chip.setAttribute('data-value', valueOf(o));
          chip.textContent = labelOf(o);
          const remove = document.createElement('button');
          remove.type = 'button';
          remove.className = 'bk-chip-remove';
          remove.tabIndex = -1;
          remove.setAttribute('aria-label', `Remove ${labelOf(o)}`);
          chip.append(remove);
          control.insertBefore(chip, input);
        }
        input.placeholder = chosen.length ? '' : placeholder;
      } else if (!typed) {
        input.value = chosen[0] ? labelOf(chosen[0]) : '';
      }
      const name = box.getAttribute('data-name');
      if (name) {
        for (const hidden of $$('input[data-bk-combobox-value]', box)) hidden.remove();
        const values = chosen.length ? chosen.map(valueOf) : multiple ? [] : [''];
        for (const value of values) {
          const hidden = document.createElement('input');
          hidden.type = 'hidden';
          hidden.name = name;
          hidden.value = value;
          hidden.setAttribute('data-bk-combobox-value', '');
          box.append(hidden);
        }
      }
      if (chosen.length) box.setAttribute('data-has-value', '');
      else box.removeAttribute('data-has-value');
    };

    const changed = () => {
      render();
      const values = selected().map(valueOf);
      emit<ComboboxChangeDetail>(box, 'bk:change', { value: values[0] ?? null, values });
    };

    const open = () => {
      if (isOpen() || input.disabled || input.readOnly) return;
      input.setAttribute('aria-expanded', 'true');
      box.setAttribute('data-open', '');
      showListbox(list, control);
      const first = selected().find((o) => !o.hidden);
      setActive(first ?? enabled()[0]);
    };

    const close = () => {
      if (!isOpen()) return;
      input.setAttribute('aria-expanded', 'false');
      box.removeAttribute('data-open');
      hideListbox(list);
      setActive(undefined);
      // Emptying the text of a single combobox clears its value.
      const cleared = !multiple && typed && !input.value.trim() && selected().length > 0;
      typed = false;
      if (multiple) input.value = '';
      filter('');
      if (cleared) {
        for (const o of options()) o.setAttribute('aria-selected', 'false');
        changed();
      } else render();
    };

    const choose = (option: HTMLElement) => {
      if (option.getAttribute('aria-disabled') === 'true') return;
      if (multiple) {
        option.setAttribute('aria-selected', String(option.getAttribute('aria-selected') !== 'true'));
        input.value = '';
        typed = false;
        filter('');
        changed();
        setActive(option);
        showListbox(list, control);
      } else {
        for (const o of options()) o.setAttribute('aria-selected', String(o === option));
        typed = false;
        changed();
        close();
      }
    };

    input.addEventListener('input', () => {
      typed = true;
      open();
      filter(input.value);
      setActive(enabled()[0]);
    });

    input.addEventListener('keydown', (e) => {
      const items = enabled();
      const current = active();
      const i = current ? items.indexOf(current) : -1;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen()) {
          open();
          if (e.key === 'ArrowUp' && !selected().length) setActive(items[items.length - 1]);
          return;
        }
        setActive(e.key === 'ArrowDown' ? items[Math.min(i + 1, items.length - 1)] : items[Math.max(i - 1, 0)]);
      } else if (e.key === 'Enter') {
        if (isOpen() && current) {
          e.preventDefault();
          choose(current);
        }
      } else if (e.key === 'Escape') {
        if (isOpen()) {
          e.preventDefault();
          e.stopPropagation();
          close();
        }
      } else if (e.key === 'Backspace' && multiple && !input.value) {
        const last = selected().at(-1);
        if (last) {
          last.setAttribute('aria-selected', 'false');
          changed();
        }
      } else if (e.key === 'Tab') {
        close();
      }
    });

    // Clicks on the list, chips and buttons keep focus in the input.
    list.addEventListener('mousedown', (e) => e.preventDefault());
    list.addEventListener('click', (e) => {
      const option = e.target instanceof Element ? e.target.closest<HTMLElement>('.bk-combobox-option') : null;
      if (option) choose(option);
    });
    list.addEventListener('mousemove', (e) => {
      const option = e.target instanceof Element ? e.target.closest<HTMLElement>('.bk-combobox-option') : null;
      if (option && !option.hasAttribute('data-active') && option.getAttribute('aria-disabled') !== 'true') setActive(option);
    });
    control.addEventListener('mousedown', (e) => {
      if (e.target !== input) e.preventDefault();
    });
    control.addEventListener('click', (e) => {
      if (input.disabled) return;
      const target = e.target instanceof Element ? e.target : null;
      const chip = target?.closest<HTMLElement>('.bk-chip-remove')?.closest<HTMLElement>('.bk-chip');
      if (chip) {
        const option = options().find((o) => valueOf(o) === chip.getAttribute('data-value'));
        if (option) {
          option.setAttribute('aria-selected', 'false');
          changed();
        }
      } else if (target?.closest('.bk-combobox-clear')) {
        for (const o of options()) o.setAttribute('aria-selected', 'false');
        input.value = '';
        typed = false;
        filter('');
        changed();
      } else if (target?.closest('.bk-combobox-toggle') && isOpen()) {
        close();
      } else {
        open();
      }
      input.focus();
    });
    box.addEventListener('focusout', (e) => {
      const next = (e as FocusEvent).relatedTarget;
      if (!(next instanceof Node) || !box.contains(next)) close();
    });
    clear?.setAttribute('type', 'button');

    filter('');
    render();
  }
}
