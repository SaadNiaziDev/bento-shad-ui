import * as React from 'react';
import { renderCharacter } from '../illustrations';
import type { CharacterId, Mood } from '../illustrations';
import { cx, useSafeId } from './utils';

export interface PencilCharacterProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Which character to draw. */
  character: CharacterId;
  /** Expression. Default `neutral`. */
  mood?: Mood;
  /** Width and height in pixels. Default 160. */
  size?: number;
  /** Accessible name, for example "Pip the owl, thinking". Omit when the drawing is decorative: it is then hidden from screen readers. */
  label?: string;
}

/**
 * A hand-drawn pencil character. Lines follow the text colour (`--pencil`), and the coloured-pencil
 * fills follow the tint tokens, so it matches light and dark mode.
 */
export const PencilCharacter = React.forwardRef<HTMLSpanElement, PencilCharacterProps>(function PencilCharacter(
  { character, mood = 'neutral', size = 160, label, className, style, ...props },
  ref,
) {
  const idPrefix = useSafeId('ch');
  const svg = React.useMemo(() => renderCharacter(character, mood, { idPrefix, title: label }), [character, mood, idPrefix, label]);
  return (
    <span
      ref={ref}
      className={cx('bk-illustration', className)}
      style={{ ...style, ['--size' as string]: `${size}px` }}
      dangerouslySetInnerHTML={{ __html: svg }}
      {...props}
    />
  );
});

/* ---------------------------------------------------------------- Tip */

export interface TipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Who is speaking. */
  character: CharacterId;
  /** The character's expression. Default `neutral`. */
  mood?: Mood;
  /** Bold first line of the bubble. */
  title?: React.ReactNode;
  /** Buttons under the text. */
  actions?: React.ReactNode;
  /** `end` puts the character on the right and points the bubble at it. Default `start`. */
  side?: 'start' | 'end';
  /** Bubble colour: `default` is the card surface, the others are the tile tints. */
  tone?: 'default' | 'peach' | 'sky' | 'mint' | 'lilac' | 'butter';
  /** Character size in pixels. Default 96. */
  size?: number;
  /** Shows a × button. Called when it is pressed; hide the tip in your state. */
  onDismiss?: () => void;
  /** Accessible name of the × button. Default "Dismiss". */
  dismissLabel?: string;
}

/**
 * A pencil character with a speech bubble: onboarding hints, empty-state advice, feature
 * announcements and assistant messages. The drawing is decorative; the bubble carries the text.
 */
export const Tip = React.forwardRef<HTMLDivElement, TipProps>(function Tip(
  { character, mood = 'neutral', title, actions, side = 'start', tone = 'default', size = 96, onDismiss, dismissLabel = 'Dismiss', className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role="note"
      className={cx('bk-tip', className)}
      data-side={side === 'end' ? 'end' : undefined}
      data-tone={tone === 'default' ? undefined : tone}
      {...props}
    >
      <PencilCharacter character={character} mood={mood} size={size} />
      <div className="bk-tip-bubble">
        {title ? <p className="bk-tip-title">{title}</p> : null}
        {children ? <div className="bk-tip-text">{children}</div> : null}
        {actions ? <div className="bk-tip-actions">{actions}</div> : null}
        {onDismiss ? (
          <button type="button" className="bk-button bk-tip-close" data-variant="ghost" data-size="icon-sm" aria-label={dismissLabel} onClick={onDismiss}>
            <svg className="bk-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
});
