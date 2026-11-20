/** True in a browser, false during server rendering. Every DOM access is guarded by this. */
export const isBrowser: boolean = typeof window !== 'undefined' && typeof document !== 'undefined';

export function $$<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

/** Elements rendered by `bento-shad-ui/react` carry `data-bk-react`; the vanilla behaviours leave them alone. */
export function isManaged(el: Element | null): boolean {
  return !!el && !!el.closest('[data-bk-react]');
}

export function closestFrom<T extends Element = HTMLElement>(target: EventTarget | null, selector: string): T | null {
  return target instanceof Element ? target.closest<T>(selector) : null;
}

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapeHtml(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ESCAPES[c] ?? c);
}

export function emit<T>(target: EventTarget, name: string, detail: T): void {
  target.dispatchEvent(new CustomEvent<T>(name, { detail, bubbles: true }));
}

const ICON_PATHS = {
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  success: '<circle cx="12" cy="12" r="10"/><path d="m8.5 12.5 2.5 2.5 5-5.5"/>',
  destructive: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
} as const;

export function icon(name: keyof typeof ICON_PATHS): string {
  return `<svg class="bk-icon" viewBox="0 0 24 24" aria-hidden="true">${ICON_PATHS[name]}</svg>`;
}
