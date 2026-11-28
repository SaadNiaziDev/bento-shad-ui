import { closestFrom, isBrowser, isManaged } from './dom';
import { placePopover } from './popover';

/**
 * Hover card timing, shared with the React component. Opening waits so the card doesn't flash
 * while the pointer passes over; closing waits so the pointer can travel into the card.
 */
export const HOVERCARD_OPEN_DELAY = 500;
export const HOVERCARD_CLOSE_DELAY = 250;

const timers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();

function popoverOpen(el: HTMLElement): boolean {
  try {
    return el.matches(':popover-open');
  } catch {
    return false;
  }
}

function schedule(card: HTMLElement, delay: number, run: () => void): void {
  clearTimeout(timers.get(card));
  timers.set(card, setTimeout(run, delay));
}

/** Shows a hover card under its trigger now. */
export function showHoverCard(card: HTMLElement, trigger: HTMLElement): void {
  clearTimeout(timers.get(card));
  if (!popoverOpen(card) && typeof card.showPopover === 'function') {
    try {
      card.showPopover();
    } catch {
      return;
    }
  }
  placePopover(card, trigger);
}

/** Hides a hover card now. */
export function hideHoverCard(card: HTMLElement): void {
  clearTimeout(timers.get(card));
  if (popoverOpen(card) && typeof card.hidePopover === 'function') {
    try {
      card.hidePopover();
    } catch {
      /* already hidden */
    }
  }
  card.removeAttribute('data-placed');
}

function delays(trigger: HTMLElement): [number, number] {
  const open = Number(trigger.getAttribute('data-open-delay'));
  const close = Number(trigger.getAttribute('data-close-delay'));
  return [Number.isFinite(open) && trigger.hasAttribute('data-open-delay') ? open : HOVERCARD_OPEN_DELAY, Number.isFinite(close) && trigger.hasAttribute('data-close-delay') ? close : HOVERCARD_CLOSE_DELAY];
}

function cardFor(trigger: HTMLElement): HTMLElement | null {
  const card = document.getElementById(trigger.getAttribute('data-bk-hovercard') ?? '');
  return card && card.classList.contains('bk-hovercard') ? card : null;
}

function triggerFor(card: HTMLElement): HTMLElement | null {
  return card.id ? document.querySelector<HTMLElement>(`[data-bk-hovercard="${CSS.escape(card.id)}"]`) : null;
}

/* ---------- Hover card: [data-bk-hovercard="id"] trigger + .bk-hovercard[popover="manual"]#id ---------- */
function onOver(event: PointerEvent | FocusEvent): void {
  if (event instanceof PointerEvent && event.pointerType === 'touch') return; // a tap follows the link
  const trigger = closestFrom(event.target, '[data-bk-hovercard]');
  if (trigger && !isManaged(trigger)) {
    const card = cardFor(trigger);
    if (!card) return;
    // Focus from a mouse click isn't a request for the card; keyboard focus is.
    if (event.type === 'focusin' && !trigger.matches(':focus-visible')) return;
    const [open] = delays(trigger);
    if (popoverOpen(card)) clearTimeout(timers.get(card));
    else schedule(card, event.type === 'focusin' ? 0 : open, () => showHoverCard(card, trigger));
    return;
  }
  const card = closestFrom(event.target, '.bk-hovercard');
  if (card && !isManaged(card)) clearTimeout(timers.get(card));
}

function onOut(event: PointerEvent | FocusEvent): void {
  const from = closestFrom(event.target, '[data-bk-hovercard], .bk-hovercard');
  if (!from || isManaged(from)) return;
  const card = from.classList.contains('bk-hovercard') ? from : cardFor(from);
  const trigger = card ? (from === card ? triggerFor(card) : from) : null;
  if (!card || !trigger) return;
  // Moving between the trigger and its card keeps it open.
  const to = event.relatedTarget;
  if (to instanceof Node && (card.contains(to) || trigger.contains(to))) return;
  schedule(card, delays(trigger)[1], () => hideHoverCard(card));
}

function onKey(event: KeyboardEvent): void {
  if (event.key !== 'Escape') return;
  for (const card of Array.from(document.querySelectorAll<HTMLElement>('.bk-hovercard'))) {
    if (!isManaged(card) && popoverOpen(card)) hideHoverCard(card);
  }
}

let bound = false;

/** Attaches the delegated hover card listeners. `start()` calls it. */
export function enableHoverCards(): void {
  if (!isBrowser || bound) return;
  bound = true;
  document.addEventListener('pointerover', onOver);
  document.addEventListener('pointerout', onOut);
  document.addEventListener('focusin', onOver);
  document.addEventListener('focusout', onOut);
  document.addEventListener('keydown', onKey);
}
