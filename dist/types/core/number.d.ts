/** Keeps `value` inside `min` and `max` (either may be missing). */
export declare function clampNumber(value: number, min?: number, max?: number): number;
/**
 * Steps a native number input up or down, as its arrow keys would (respecting min, max and step),
 * and fires `input` and `change` so forms and frameworks see it. Shared with the React component.
 */
export declare function stepNumberInput(input: HTMLInputElement, direction: 1 | -1): void;
export declare function initNumber(root: ParentNode, once: (el: Element, key: string) => boolean): void;
