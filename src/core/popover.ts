import { $$, isBrowser } from './dom';

const SELECTOR = '.bk-menu[popover], .bk-popover[popover], .bk-combobox-list[popover]';

function invokerFor(popover: HTMLElement): HTMLElement | null {
  const combobox = popover.closest('.bk-combobox');
  if (combobox) return combobox.querySelector<HTMLElement>('.bk-combobox-control, .bk-combobox-input');
  if (!popover.id) return null;
  const id = CSS.escape(popover.id);
  if (popover.classList.contains('bk-hovercard')) {
    return document.querySelector<HTMLElement>(`[data-bk-hovercard="${id}"], [data-bk-hovercard-for="${id}"]`);
  }
  return document.querySelector<HTMLElement>(`[popovertarget="${id}"]`);
}

/**
 * Places an open `.bk-menu` / `.bk-popover` under the button that opened it,
 * flipping above when there is no room. `data-align="start|center|end"` sets the edge.
 * Sets `--anchor-width` to the trigger's width; combobox lists use it as their width.
 */
export function placePopover(popover: HTMLElement, anchor: HTMLElement | null = invokerFor(popover)): void {
  if (!isBrowser || !anchor) return;
  const rect = anchor.getBoundingClientRect();
  popover.style.setProperty('--anchor-width', `${Math.round(rect.width)}px`);
  const width = popover.offsetWidth;
  const height = popover.offsetHeight;
  const gap = 6;
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight;
  const align = popover.getAttribute('data-align') ?? 'start';

  let left = align === 'end' ? rect.right - width : align === 'center' ? rect.left + rect.width / 2 - width / 2 : rect.left;
  left = Math.max(8, Math.min(left, viewportWidth - width - 8));
  let top = rect.bottom + gap;
  if (top + height > viewportHeight - 8 && rect.top - gap - height > 8) top = rect.top - gap - height;

  // Grow from the nearest point to the trigger, including after a viewport flip.
  const originX = Math.max(0, Math.min(width, rect.left + rect.width / 2 - left));
  popover.style.transformOrigin = `${Math.round(originX)}px ${top < rect.top ? 'bottom' : 'top'}`;
  popover.style.left = `${Math.round(left)}px`;
  popover.style.top = `${Math.round(top)}px`;
  popover.setAttribute('data-placed', '');
}

function openPopovers(): HTMLElement[] {
  try {
    return $$('.bk-menu:popover-open, .bk-popover:popover-open, .bk-combobox-list:popover-open, .bk-hovercard:popover-open');
  } catch {
    return [];
  }
}

let bound = false;

/** Positions kit popovers whenever they open, scroll or resize. Idempotent; React components call it too. */
export function enablePopoverPlacement(): void {
  if (!isBrowser || bound) return;
  bound = true;
  document.addEventListener(
    'toggle',
    (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !target.matches(SELECTOR)) return;
      if ((event as ToggleEvent).newState === 'open') placePopover(target);
      else target.removeAttribute('data-placed');
    },
    true,
  );
  const reposition = () => openPopovers().forEach((p) => placePopover(p));
  window.addEventListener('resize', reposition);
  window.addEventListener('scroll', reposition, true);
}
