import * as React from 'react';
import type { CharacterId, Mood } from '../illustrations';
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
export declare const PencilCharacter: React.ForwardRefExoticComponent<PencilCharacterProps & React.RefAttributes<HTMLSpanElement>>;
