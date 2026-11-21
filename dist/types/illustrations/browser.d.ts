export * from './index';
/** Draws one element from its data attributes. Safe to call again after changing `data-mood`. */
export declare function draw(el: HTMLElement): void;
/** Draws every `[data-bk-character]` inside `root` that hasn't been drawn yet. */
export declare function mount(root?: ParentNode): void;
