/**
 * bento-shad-ui/illustrations: hand-drawn pencil characters as SVG strings.
 * Pure functions, no DOM: works on the server, in build scripts and in the browser.
 */
import { CHARACTERS, type CharacterId, type CharacterInfo } from './characters';
import { drawFace, GRAPHITE, Sketch, STATIC_PALETTE, TOKEN_PALETTE, type Mood } from './kit';

export type { CharacterId, CharacterInfo } from './characters';
export type { Mood } from './kit';

/** Every mood a character can show. */
export const moods: readonly Mood[] = ['neutral', 'happy', 'surprised', 'sad', 'thinking', 'sleepy'];

/** The cast, without drawing code: id, name, kind, role, traits and suggested uses. */
export const characters: readonly CharacterInfo[] = CHARACTERS.map(({ id, name, kind, role, traits, bestFor }) => ({ id, name, kind, role, traits, bestFor }));

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

export function isCharacterId(value: unknown): value is CharacterId {
  return typeof value === 'string' && CHARACTERS.some((c) => c.id === value);
}

export function isMood(value: unknown): value is Mood {
  return typeof value === 'string' && (moods as readonly string[]).includes(value);
}

const escapeText = (s: string) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] ?? c);

/**
 * Draws a character as an SVG string.
 * Lines use `currentColor` (graphite by default), so CSS `color` restyles the pencil, including in dark mode.
 *
 * @example container.innerHTML = renderCharacter('pip', 'thinking', { title: 'Pip the owl, thinking' });
 */
export function renderCharacter(id: CharacterId, mood: Mood = 'neutral', options: RenderOptions = {}): string {
  const character = CHARACTERS.find((c) => c.id === id);
  if (!character) throw new Error(`Unknown character "${String(id)}". Use one of: ${CHARACTERS.map((c) => c.id).join(', ')}.`);
  if (!isMood(mood)) throw new Error(`Unknown mood "${String(mood)}". Use one of: ${moods.join(', ')}.`);
  const prefix = (options.idPrefix ?? `bk-${id}-${mood}`).replace(/[^a-zA-Z0-9_-]/g, '');
  const sketch = new Sketch(prefix, options.colors === 'static' ? STATIC_PALETTE : TOKEN_PALETTE);
  character.draw(sketch);
  drawFace(sketch, character.face, mood);
  const a11y = options.title
    ? ` role="img" aria-labelledby="${prefix}-title"`
    : ' aria-hidden="true" focusable="false"';
  const size = options.size ? ` width="${options.size}" height="${options.size}"` : '';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"${size} color="${GRAPHITE}" class="bk-character" data-character="${id}" data-mood="${mood}"${a11y}>` +
    (options.title ? `<title id="${prefix}-title">${escapeText(options.title)}</title>` : '') +
    sketch.defs() +
    sketch.body() +
    `</svg>`
  );
}
