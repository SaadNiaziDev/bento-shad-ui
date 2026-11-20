import type { StartOptions } from './types';
export { getStoredTheme, getTheme, isTheme, onThemeChange, resolveTheme, setTheme, THEME_EVENT, THEME_STORAGE_KEY, themeScript } from './theme';
export { toast } from './toast';
export { enablePopoverPlacement, placePopover } from './popover';
export { fillSlider, openCommand } from './widgets';
export type { CalendarChangeDetail, DismissToast, ResolvedTheme, StartOptions, Theme, ThemeChangeDetail, ToastAction, ToastOptions, ToastVariant } from './types';
/** Library version. */
export declare const version: string;
/**
 * Wires up widgets that need per-element setup (tabs, command palettes, calendars, sliders,
 * indeterminate checkboxes) inside `root`. Safe to call repeatedly; each element is set up once.
 */
export declare function init(root?: ParentNode): void;
/**
 * Starts the vanilla behaviours: attaches delegated listeners once, restores the saved theme,
 * runs `init(document)` when the DOM is ready and, by default, watches for added nodes.
 * Calling it again does nothing.
 */
export declare function start(options?: StartOptions): void;
