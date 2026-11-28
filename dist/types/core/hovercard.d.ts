/**
 * Hover card timing, shared with the React component. Opening waits so the card doesn't flash
 * while the pointer passes over; closing waits so the pointer can travel into the card.
 */
export declare const HOVERCARD_OPEN_DELAY = 500;
export declare const HOVERCARD_CLOSE_DELAY = 250;
/** Shows a hover card under its trigger now. */
export declare function showHoverCard(card: HTMLElement, trigger: HTMLElement): void;
/** Hides a hover card now. */
export declare function hideHoverCard(card: HTMLElement): void;
/** Attaches the delegated hover card listeners. `start()` calls it. */
export declare function enableHoverCards(): void;
