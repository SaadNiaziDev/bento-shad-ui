import * as React from 'react';
/** Joins class names, skipping falsy values. */
export declare function cx(...parts: Array<string | false | null | undefined | 0>): string;
/** Turns `true` into an empty data attribute and `false`/`undefined` into no attribute. */
export declare function flag(on: boolean | undefined): '' | undefined;
type AnyProps = Record<string, unknown>;
type PossibleRef<T> = React.Ref<T> | undefined;
export declare function composeRefs<T>(...refs: PossibleRef<T>[]): React.RefCallback<T>;
/**
 * Renders its only child with the given props merged in (class names joined, handlers chained).
 * Powers every `asChild` prop, e.g. `<Button asChild><Link href="/trips">Trips</Link></Button>`.
 */
export declare const Slot: React.ForwardRefExoticComponent<Omit<React.HTMLAttributes<HTMLElement> & AnyProps, "ref"> & React.RefAttributes<HTMLElement>>;
/** State that works controlled (`value` + `onChange`) or uncontrolled (`defaultValue`). */
export declare function useControllableState<T>(value: T | undefined, defaultValue: T, onChange?: (next: T) => void): [T, (next: T) => void];
/** A stable id usable in attributes and CSS selectors. */
export declare function useSafeId(prefix?: string): string;
type IntrinsicTag = keyof React.JSX.IntrinsicElements;
/** Builds a simple styled element, e.g. `part('div', 'bk-tile-footer', 'TileFooter')`. */
export declare function part<E extends IntrinsicTag>(tag: E, base: string, displayName: string): React.ForwardRefExoticComponent<React.PropsWithoutRef<React.PropsWithoutRef<React.ComponentProps<E>>> & React.RefAttributes<React.ComponentRef<E>>>;
/** Props React 18 and 19 both accept for the native popover API. */
export declare function popoverTargetProps(id: string): AnyProps;
export {};
