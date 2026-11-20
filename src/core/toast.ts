import { escapeHtml, icon, isBrowser } from './dom';
import type { DismissToast, ToastOptions } from './types';

const DEFAULT_DURATION = 4500;

function region(): HTMLElement {
  let el = document.querySelector<HTMLElement>('.bk-toaster');
  if (!el) {
    el = document.createElement('section');
    el.className = 'bk-toaster';
    el.setAttribute('aria-label', 'Notifications');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }
  return el;
}

/**
 * Shows a toast in the bottom-right corner and returns a function that closes it.
 * Accepts a title string or full options. Does nothing on the server.
 *
 * @example toast({ title: 'Trip saved', description: 'Lisbon, 12–16 March', variant: 'success' })
 */
export function toast(input: string | ToastOptions): DismissToast {
  const options: ToastOptions = typeof input === 'string' ? { title: input } : input;
  if (!isBrowser) return () => {};

  const variant = options.variant ?? 'default';
  const el = document.createElement('div');
  el.className = 'bk-toast';
  el.setAttribute('data-variant', variant);
  el.setAttribute('role', variant === 'destructive' ? 'alert' : 'status');
  el.innerHTML =
    `<span class="bk-toast-icon">${icon(variant === 'success' ? 'success' : variant === 'destructive' ? 'destructive' : 'info')}</span>` +
    `<div class="bk-toast-title">${escapeHtml(options.title)}</div>` +
    (options.description ? `<div class="bk-toast-description">${escapeHtml(options.description)}</div>` : '') +
    '<div class="bk-toast-actions">' +
    (options.action ? `<button type="button" class="bk-button" data-variant="secondary" data-size="xs" data-act>${escapeHtml(options.action.label)}</button>` : '') +
    `<button type="button" class="bk-button" data-variant="ghost" data-size="icon-sm" aria-label="Dismiss" data-dismiss>${icon('x')}</button>` +
    '</div>';
  region().appendChild(el);

  let timer: ReturnType<typeof setTimeout> | undefined;
  const duration = options.duration ?? DEFAULT_DURATION;
  const dismiss: DismissToast = () => {
    if (timer) clearTimeout(timer);
    if (!el.isConnected || el.hasAttribute('data-leaving')) return;
    el.setAttribute('data-leaving', '');
    setTimeout(() => el.remove(), 190);
  };
  const schedule = (ms: number) => {
    if (Number.isFinite(ms)) timer = setTimeout(dismiss, ms);
  };

  el.querySelector('[data-dismiss]')?.addEventListener('click', dismiss);
  el.querySelector('[data-act]')?.addEventListener('click', () => {
    options.action?.onClick?.();
    dismiss();
  });
  el.addEventListener('mouseenter', () => timer && clearTimeout(timer));
  el.addEventListener('mouseleave', () => schedule(1800));
  schedule(duration);
  return dismiss;
}
