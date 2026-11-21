/**
 * bento-shad-ui/illustrations: hand-drawn pencil characters as SVG strings.
 * Pure functions, no DOM: works on the server, in build scripts and in the browser.
 */
import { type CharacterId, type CharacterInfo } from './characters';
import { type Mood } from './kit';
export type { CharacterId, CharacterInfo } from './characters';
export type { Mood } from './kit';
/** Every mood a character can show. */
export declare const moods: readonly Mood[];
/** The cast, without drawing code: id, name, kind, role, traits and suggested uses. */
export declare const characters: readonly CharacterInfo[];
export interface RenderOptions {
    /** Prefix for the SVG's internal ids. Must be unique per page when several characters share a document. Default `bk-<character>-<mood>`. */
    idPrefix?: string;
    /** Accessible name. When set the SVG gets `role="img"` and a `<title>`; otherwise it is `aria-hidden`. */
    title?: string;
    /** `tokens` (default) follows the page's CSS variables and dark mode; `static` uses plain colours for standalone files. */
    colors?: 'tokens' | 'static';
    /** Width and height attributes. Default none (size it with CSS). */
    size?: number;
}
export declare function isCharacterId(value: unknown): value is CharacterId;
export declare function isMood(value: unknown): value is Mood;
/**
 * Draws a character as an SVG string.
 * Lines use `currentColor` (graphite by default), so CSS `color` restyles the pencil, including in dark mode.
 *
 * @example container.innerHTML = renderCharacter('pip', 'thinking', { title: 'Pip the owl, thinking' });
 */
export declare function renderCharacter(id: CharacterId, mood?: Mood, options?: RenderOptions): string;
