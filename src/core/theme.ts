import { $$, emit, isBrowser } from './dom';
import type { ResolvedTheme, Theme, ThemeChangeDetail } from './types';

/** localStorage key that remembers the chosen theme. */
export const THEME_STORAGE_KEY = 'bk-theme';
/** Event fired on `document` whenever the theme changes. */
export const THEME_EVENT = 'bk:theme';

const THEMES: readonly Theme[] = ['light', 'dark', 'system'];

export function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && (THEMES as readonly string[]).includes(value);
}

function systemPrefersDark(): boolean {
  return isBrowser && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/** The theme set on `<html data-theme>`. Returns `system` on the server. */
export function getTheme(): Theme {
  if (!isBrowser) return 'system';
  const value = document.documentElement.getAttribute('data-theme');
  return isTheme(value) ? value : 'system';
}

/** Turns `system` into `light` or `dark` using the OS setting. */
export function resolveTheme(theme: Theme = getTheme()): ResolvedTheme {
  if (theme === 'system') return systemPrefersDark() ? 'dark' : 'light';
  return theme;
}

/** Saved theme from localStorage, or null when none is saved or storage is blocked. */
export function getStoredTheme(): Theme | null {
  if (!isBrowser) return null;
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
}

/**
 * Sets `data-theme` and the `dark` class on `<html>`, remembers the choice and fires `bk:theme`.
 * Safe to call on the server (does nothing).
 */
export function setTheme(theme: Theme, options: { persist?: boolean } = {}): void {
  if (!isBrowser || !isTheme(theme)) return;
  const root = document.documentElement;
  const resolved = resolveTheme(theme);
  root.setAttribute('data-theme', theme);
  root.classList.toggle('dark', resolved === 'dark');
  if (options.persist !== false) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* storage blocked: the theme still applies for this page view */
    }
  }
  syncThemeButtons(theme);
  emit<ThemeChangeDetail>(document, THEME_EVENT, { theme, resolved });
}

/** Marks every `[data-bk-theme-set]` button as pressed or not. */
export function syncThemeButtons(theme: Theme = getTheme(), root: ParentNode = document): void {
  if (!isBrowser) return;
  for (const button of $$('[data-bk-theme-set]', root)) {
    button.setAttribute('aria-pressed', String(button.getAttribute('data-bk-theme-set') === theme));
  }
}

/** Subscribe to theme changes. Returns an unsubscribe function. */
export function onThemeChange(listener: (detail: ThemeChangeDetail) => void): () => void {
  if (!isBrowser) return () => {};
  const handler = (event: Event) => listener((event as CustomEvent<ThemeChangeDetail>).detail);
  document.addEventListener(THEME_EVENT, handler);
  return () => document.removeEventListener(THEME_EVENT, handler);
}

/**
 * Inline script for `<head>` that applies the saved theme before first paint (no dark-mode flash).
 * Plain HTML: `<script>{themeScript}</script>`. React: `<ThemeScript />`.
 */
export const themeScript: string =
  `(function(){try{var r=document.documentElement,t=null;try{t=localStorage.getItem('${THEME_STORAGE_KEY}')}catch(e){}` +
  `if(t!=='light'&&t!=='dark'&&t!=='system')t=r.getAttribute('data-theme')||'system';` +
  `var d=t==='dark'||(t==='system'&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches);` +
  `r.setAttribute('data-theme',t);r.classList.toggle('dark',d);}catch(e){}})();`;

let systemWatcherBound = false;

/** Re-applies `system` when the OS switches between light and dark. Idempotent. */
export function watchSystemTheme(): void {
  if (!isBrowser || systemWatcherBound || typeof window.matchMedia !== 'function') return;
  systemWatcherBound = true;
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getTheme() === 'system') setTheme('system', { persist: false });
  });
}
