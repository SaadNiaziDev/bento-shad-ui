/**
 * bento-shad-ui core: framework-free behaviours for the CSS components.
 * Every export is safe to import during server rendering; DOM work only happens in the browser.
 */
import { $$, closestFrom, isBrowser, isManaged } from './dom';
import { enablePopoverPlacement } from './popover';
import { getStoredTheme, getTheme, setTheme, syncThemeButtons, watchSystemTheme } from './theme';
import { toast } from './toast';
import type { StartOptions, ToastOptions } from './types';
import { initCombobox } from './combobox';
import { enableHoverCards } from './hovercard';
import { initNumber } from './number';
import { initTags } from './tags';
import { fillSlider, initCalendar, initCommand, initTabs, once, openCommand, pickCalendarDay } from './widgets';

export { foldText, hideListbox, matchesQuery, showListbox } from './combobox';
export { clampNumber, stepNumberInput } from './number';
export { linePath, niceScale } from './chart';
export type { NiceScale } from './chart';
export { enableHoverCards, hideHoverCard, HOVERCARD_CLOSE_DELAY, HOVERCARD_OPEN_DELAY, showHoverCard } from './hovercard';
export { addTags, describeTagChange, splitTags } from './tags';
export type { AddTagsOptions, AddTagsResult } from './tags';
export { getStoredTheme, getTheme, isTheme, onThemeChange, resolveTheme, setTheme, THEME_EVENT, THEME_STORAGE_KEY, themeScript } from './theme';
export { toast } from './toast';
export { enablePopoverPlacement, placePopover } from './popover';
export { fillSlider, openCommand } from './widgets';
export type { CalendarChangeDetail, ComboboxChangeDetail, DismissToast, ResolvedTheme, StartOptions, TagsChangeDetail, Theme, ThemeChangeDetail, ToastAction, ToastOptions, ToastVariant } from './types';

/** Library version. */
export const version: string = __VERSION__;

/**
 * Wires up widgets that need per-element setup (tabs, command palettes, comboboxes, tags inputs,
 * number inputs, calendars, sliders, indeterminate checkboxes) inside `root`. Safe to call repeatedly;
 * each element is set up once.
 */
export function init(root: ParentNode = isBrowser ? document : (undefined as unknown as ParentNode)): void {
  if (!isBrowser || !root) return;
  initTabs(root);
  initCommand(root);
  initCombobox(root, once);
  initTags(root, once);
  initNumber(root, once);
  initCalendar(root);
  for (const range of $$<HTMLInputElement>('.bk-slider', root)) if (!isManaged(range)) fillSlider(range);
  for (const box of $$<HTMLInputElement>('.bk-checkbox[data-indeterminate]', root)) box.indeterminate = true;
  syncThemeButtons(getTheme(), root);
}

/* ---------------------------------------------------------------- delegated events */

function onClick(event: MouseEvent): void {
  const target = event.target;
  let el: HTMLElement | null;

  if ((el = closestFrom(target, '[data-bk-theme-set]'))) {
    const value = el.getAttribute('data-bk-theme-set');
    if (value === 'light' || value === 'dark' || value === 'system') setTheme(value);
    return;
  }

  if ((el = closestFrom(target, '[data-bk-open]'))) {
    const dialog = document.getElementById(el.getAttribute('data-bk-open') ?? '');
    if (dialog instanceof HTMLDialogElement && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLElement>('[autofocus], .bk-command-input')?.focus();
    }
    return;
  }

  if ((el = closestFrom(target, '[data-bk-close]'))) {
    el.closest('dialog')?.close(el.getAttribute('data-bk-close') ?? '');
  }

  if (target instanceof HTMLDialogElement && target.matches('.bk-dialog, .bk-sheet, .bk-command') && !isManaged(target)) {
    const r = target.getBoundingClientRect();
    const outside = event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
    if (outside) target.close();
  }

  if ((el = closestFrom(target, '[data-bk-toast]'))) {
    const raw = el.getAttribute('data-bk-toast') ?? '';
    let options: ToastOptions;
    try {
      options = JSON.parse(raw) as ToastOptions;
    } catch {
      options = { title: raw };
    }
    toast(options);
  }

  if ((el = closestFrom(target, '.bk-menu-item')) && !isManaged(el)) {
    if (el.getAttribute('role') === 'menuitemcheckbox') {
      el.setAttribute('aria-checked', String(el.getAttribute('aria-checked') !== 'true'));
    } else if (!el.hasAttribute('data-keep-open')) {
      const popover = el.closest<HTMLElement>('[popover]');
      if (popover && typeof popover.hidePopover === 'function') popover.hidePopover();
    }
  }

  if ((el = closestFrom(target, '.bk-toggle')) && !isManaged(el) && !el.hasAttribute('data-bk-theme-set')) {
    const group = el.closest('.bk-toggle-group');
    if (group?.getAttribute('data-type') === 'single') {
      for (const b of $$('.bk-toggle', group)) b.setAttribute('aria-pressed', String(b === el));
    } else {
      el.setAttribute('aria-pressed', String(el.getAttribute('aria-pressed') !== 'true'));
    }
  }

  if ((el = closestFrom(target, '.bk-calendar-day')) && !isManaged(el)) pickCalendarDay(el);

  if ((el = closestFrom(target, '[data-bk-dismiss]')) && !isManaged(el)) {
    const tip = el.closest<HTMLElement>('.bk-tip');
    if (tip) tip.hidden = true;
  }

  if ((el = closestFrom(target, '[data-bk-copy]'))) {
    const selector = el.getAttribute('data-bk-copy-target');
    const text = selector ? document.querySelector(selector)?.textContent ?? '' : el.getAttribute('data-bk-copy') ?? '';
    navigator.clipboard?.writeText(text).then(
      () => toast({ title: 'Copied to clipboard', variant: 'success' }),
      () => toast({ title: 'Copy failed. Select the text and copy it manually.', variant: 'destructive' }),
    );
  }
}

function otpInputs(input: HTMLInputElement): HTMLInputElement[] {
  const group = input.closest('.bk-otp');
  return group ? $$<HTMLInputElement>('input', group) : [];
}

function onInput(event: Event): void {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || isManaged(target)) return;
  if (target.matches('.bk-slider')) fillSlider(target);
  if (target.matches('.bk-otp input')) {
    target.value = target.value.replace(/\D/g, '').slice(-1);
    if (target.value) {
      const all = otpInputs(target);
      all[all.indexOf(target) + 1]?.focus();
    }
  }
}

function onKeydown(event: KeyboardEvent): void {
  const target = event.target;
  if (target instanceof HTMLInputElement && target.matches('.bk-otp input') && !isManaged(target) && event.key === 'Backspace' && !target.value) {
    const all = otpInputs(target);
    const previous = all[all.indexOf(target) - 1];
    if (previous) {
      event.preventDefault();
      previous.value = '';
      previous.focus();
    }
  }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k' && document.querySelector('dialog.bk-command[data-bk-hotkey]')) {
    event.preventDefault();
    openCommand();
  }
}

function onPaste(event: ClipboardEvent): void {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || !target.matches('.bk-otp input') || isManaged(target)) return;
  const digits = (event.clipboardData?.getData('text') ?? '').replace(/\D/g, '');
  if (!digits) return;
  event.preventDefault();
  const all = otpInputs(target);
  const start = all.indexOf(target);
  [...digits].forEach((d, i) => {
    const input = all[start + i];
    if (input) input.value = d;
  });
  all[Math.min(start + digits.length, all.length - 1)]?.focus();
}

function onDrag(event: DragEvent): void {
  const zone = closestFrom(event.target, '.bk-dropzone');
  if (!zone || isManaged(zone)) return;
  if (event.type === 'dragenter' || event.type === 'dragover') zone.setAttribute('data-dragover', '');
  else zone.removeAttribute('data-dragover');
}

function onChange(event: Event): void {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || !target.matches('.bk-dropzone input[type="file"]') || isManaged(target)) return;
  const out = target.closest('.bk-dropzone')?.querySelector('.bk-dropzone-files');
  if (out) out.textContent = Array.from(target.files ?? [], (f) => f.name).join(', ');
}

let started = false;

/**
 * Starts the vanilla behaviours: attaches delegated listeners once, restores the saved theme,
 * runs `init(document)` when the DOM is ready and, by default, watches for added nodes.
 * Calling it again does nothing.
 */
export function start(options: StartOptions = {}): void {
  if (!isBrowser || started) return;
  started = true;
  const { observe = true, restoreTheme = true } = options;

  document.addEventListener('click', onClick);
  document.addEventListener('input', onInput);
  document.addEventListener('keydown', onKeydown);
  document.addEventListener('paste', onPaste);
  document.addEventListener('change', onChange);
  for (const type of ['dragenter', 'dragover', 'dragleave', 'drop'] as const) document.addEventListener(type, onDrag);
  enablePopoverPlacement();
  enableHoverCards();
  watchSystemTheme();

  if (restoreTheme) setTheme(getStoredTheme() ?? getTheme(), { persist: false });

  const ready = () => {
    init(document);
    if (observe && typeof MutationObserver !== 'undefined') {
      new MutationObserver((records) => {
        for (const record of records) {
          record.addedNodes.forEach((node) => {
            if (node instanceof Element) init(node.parentElement ?? node);
          });
        }
      }).observe(document.body, { childList: true, subtree: true });
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
  else ready();
}
