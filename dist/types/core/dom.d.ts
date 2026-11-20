/** True in a browser, false during server rendering. Every DOM access is guarded by this. */
export declare const isBrowser: boolean;
export declare function $$<T extends Element = HTMLElement>(selector: string, root?: ParentNode): T[];
/** Elements rendered by `bento-shad-ui/react` carry `data-bk-react`; the vanilla behaviours leave them alone. */
export declare function isManaged(el: Element | null): boolean;
export declare function closestFrom<T extends Element = HTMLElement>(target: EventTarget | null, selector: string): T | null;
export declare function escapeHtml(value: unknown): string;
export declare function emit<T>(target: EventTarget, name: string, detail: T): void;
declare const ICON_PATHS: {
    readonly info: "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 16v-4M12 8h.01\"/>";
    readonly success: "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m8.5 12.5 2.5 2.5 5-5.5\"/>";
    readonly destructive: "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 8v4M12 16h.01\"/>";
    readonly x: "<path d=\"M18 6 6 18M6 6l12 12\"/>";
};
export declare function icon(name: keyof typeof ICON_PATHS): string;
export {};
