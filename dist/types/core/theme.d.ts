import type { ResolvedTheme, Theme, ThemeChangeDetail } from './types';
/** localStorage key that remembers the chosen theme. */
export declare const THEME_STORAGE_KEY = "bk-theme";
/** Event fired on `document` whenever the theme changes. */
export declare const THEME_EVENT = "bk:theme";
export declare function isTheme(value: unknown): value is Theme;
/** The theme set on `<html data-theme>`. Returns `system` on the server. */
export declare function getTheme(): Theme;
/** Turns `system` into `light` or `dark` using the OS setting. */
export declare function resolveTheme(theme?: Theme): ResolvedTheme;
/** Saved theme from localStorage, or null when none is saved or storage is blocked. */
export declare function getStoredTheme(): Theme | null;
/**
 * Sets `data-theme` and the `dark` class on `<html>`, remembers the choice and fires `bk:theme`.
 * Safe to call on the server (does nothing).
 */
export declare function setTheme(theme: Theme, options?: {
    persist?: boolean;
}): void;
/** Marks every `[data-bk-theme-set]` button as pressed or not. */
export declare function syncThemeButtons(theme?: Theme, root?: ParentNode): void;
/** Subscribe to theme changes. Returns an unsubscribe function. */
export declare function onThemeChange(listener: (detail: ThemeChangeDetail) => void): () => void;
/**
 * Inline script for `<head>` that applies the saved theme before first paint (no dark-mode flash).
 * Plain HTML: `<script>{themeScript}</script>`. React: `<ThemeScript />`.
 */
export declare const themeScript: string;
/** Re-applies `system` when the OS switches between light and dark. Idempotent. */
export declare function watchSystemTheme(): void;
