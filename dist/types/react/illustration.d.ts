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
export declare const Tip: React.ForwardRefExoticComponent<TipProps & React.RefAttributes<HTMLDivElement>>;
