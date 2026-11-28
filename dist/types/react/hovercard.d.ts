import * as React from 'react';
export interface HoverCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** The element that shows the card, usually a link to the full page. */
    trigger: React.ReactElement;
    /** Content of the card. Keep it a preview: the same information must be reachable through the trigger. */
    children: React.ReactNode;
    /** Milliseconds the pointer rests on the trigger before the card opens. Default 500. */
    openDelay?: number;
    /** Milliseconds before the card closes after the pointer leaves, so it can travel into the card. Default 250. */
    closeDelay?: number;
    /** Edge of the trigger to line up with. Default `start`. */
    align?: 'start' | 'center' | 'end';
}
/**
 * A preview card that opens while a pointer rests on its trigger or the trigger has keyboard focus.
 * It stays open while the pointer is over it, and Esc closes it. Touch is ignored, so a tap
 * follows the link. Screen readers don't get the card: it supplements the trigger, never replaces it.
 */
export declare function HoverCard({ trigger, children, openDelay, closeDelay, align, className, onPointerEnter, onPointerLeave, ...props }: HoverCardProps): React.ReactElement;
