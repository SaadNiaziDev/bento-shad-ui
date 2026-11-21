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
