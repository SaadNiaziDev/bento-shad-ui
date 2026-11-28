/** Splits typed or pasted text into tags at `delimiter` and line breaks, trims them and drops empty ones. */
export declare function splitTags(text: string, delimiter?: string): string[];
export interface AddTagsOptions {
    /** Most tags allowed. Extra tags are returned in `rejected`. */
    max?: number;
    /** Keep a tag that is already in the list. Duplicates are compared without case. Default `false`. */
    allowDuplicates?: boolean;
}
export interface AddTagsResult {
    /** The new list. */
    tags: string[];
    /** Tags that were added. */
    added: string[];
    /** Tags left out because they were already in the list. */
    duplicates: string[];
    /** Tags left out because the list was full. */
    rejected: string[];
}
/** Adds `incoming` to `current`, skipping duplicates (ignoring case) and anything past `max`. */
export declare function addTags(current: readonly string[], incoming: readonly string[], options?: AddTagsOptions): AddTagsResult;
/** What a screen reader hears after an add. Shared with the React component. */
export declare function describeTagChange(result: AddTagsResult, max?: number): string;
export declare function initTags(root: ParentNode, once: (el: Element, key: string) => boolean): void;
