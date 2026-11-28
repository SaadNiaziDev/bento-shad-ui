import type { StartOptions } from './types';
export { foldText, hideListbox, matchesQuery, showListbox } from './combobox';
export { clampNumber, stepNumberInput } from './number';
export { addTags, describeTagChange, splitTags } from './tags';
export type { AddTagsOptions, AddTagsResult } from './tags';
export { getStoredTheme, getTheme, isTheme, onThemeChange, resolveTheme, setTheme, THEME_EVENT, THEME_STORAGE_KEY, themeScript } from './theme';
export { toast } from './toast';
export { enablePopoverPlacement, placePopover } from './popover';
export { fillSlider, openCommand } from './widgets';
export type { CalendarChangeDetail, ComboboxChangeDetail, DismissToast, ResolvedTheme, StartOptions, TagsChangeDetail, Theme, ThemeChangeDetail, ToastAction, ToastOptions, ToastVariant } from './types';
/** Library version. */
export declare const version: string;
/**
 * Wires up widgets that need per-element setup (tabs, command palettes, comboboxes, tags inputs,
 * number inputs, calendars, sliders, indeterminate checkboxes) inside `root`. Safe to call repeatedly;
 * each element is set up once.
 */
export declare function init(root?: ParentNode): void;
/**
 * Starts the vanilla behaviours: attaches delegated listeners once, restores the saved theme,
 * runs `init(document)` when the DOM is ready and, by default, watches for added nodes.
 * Calling it again does nothing.
 */
export declare function start(options?: StartOptions): void;
