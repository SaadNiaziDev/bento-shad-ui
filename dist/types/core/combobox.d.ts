/** Lower-cases text and strips accents, so "sao" finds "São Paulo". */
export declare function foldText(text: string): string;
/** True when every word of `query` appears somewhere in `text`, ignoring case and accents. An empty query matches. */
export declare function matchesQuery(text: string, query: string): boolean;
/** Shows a combobox list in the top layer and lines it up with `anchor`. Shared with the React component. */
export declare function showListbox(list: HTMLElement, anchor: HTMLElement | null): void;
export declare function hideListbox(list: HTMLElement): void;
export declare function initCombobox(root: ParentNode, once: (el: Element, key: string) => boolean): void;
