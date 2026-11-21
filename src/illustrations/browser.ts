/**
 * Script-tag build (dist/illustrations.iife.js). Exposes `window.BentoIllustrations` and draws every
 * `[data-bk-character]` element, now and whenever one is added or its `data-mood` changes.
 *
 *   <span data-bk-character="pip" data-mood="thinking" data-size="160" aria-label="Pip the owl, thinking"></span>
 */
import { isCharacterId, isMood, renderCharacter } from './index';

export * from './index';

let counter = 0;

/** Draws one element from its data attributes. Safe to call again after changing `data-mood`. */
export function draw(el: HTMLElement): void {
  const id = el.getAttribute('data-bk-character');
  const mood = el.getAttribute('data-mood') ?? 'neutral';
  if (!isCharacterId(id) || !isMood(mood)) return;
  const label = el.getAttribute('data-label') ?? el.getAttribute('aria-label') ?? undefined;
  if (label) {
    el.setAttribute('data-label', label);
    el.removeAttribute('aria-label');
  }
  el.classList.add('bk-illustration');
  const size = el.getAttribute('data-size');
  if (size && !Number.isNaN(Number(size))) el.style.setProperty('--size', `${Number(size)}px`);
  el.innerHTML = renderCharacter(id, mood, { idPrefix: `bkc${++counter}`, title: label });
}

/** Draws every `[data-bk-character]` inside `root` that hasn't been drawn yet. */
export function mount(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-bk-character]').forEach((el) => {
    const svg = el.querySelector('svg');
    if (!svg || svg.getAttribute('data-mood') !== (el.getAttribute('data-mood') ?? 'neutral') || svg.getAttribute('data-character') !== el.getAttribute('data-bk-character')) draw(el);
  });
}

if (typeof document !== 'undefined') {
  const start = () => {
    mount();
    new MutationObserver((records) => {
      for (const r of records) {
        if (r.type === 'attributes' && r.target instanceof HTMLElement) draw(r.target);
        else r.addedNodes.forEach((node) => node instanceof Element && mount(node.parentElement ?? node));
      }
    }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-mood', 'data-bk-character'] });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
}
