/**
 * Places an open `.bk-menu` / `.bk-popover` under the button that opened it,
 * flipping above when there is no room. `data-align="start|center|end"` sets the edge.
 * Sets `--anchor-width` to the trigger's width; combobox lists use it as their width.
 */
export declare function placePopover(popover: HTMLElement, anchor?: HTMLElement | null): void;
/** Positions kit popovers whenever they open, scroll or resize. Idempotent; React components call it too. */
export declare function enablePopoverPlacement(): void;
