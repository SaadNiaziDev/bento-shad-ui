import * as React from 'react';

/** Joins class names, skipping falsy values. */
export function cx(...parts: Array<string | false | null | undefined | 0>): string {
  return parts.filter(Boolean).join(' ');
}

/** Turns `true` into an empty data attribute and `false`/`undefined` into no attribute. */
export function flag(on: boolean | undefined): '' | undefined {
  return on ? '' : undefined;
}

type AnyProps = Record<string, unknown>;
type PossibleRef<T> = React.Ref<T> | undefined;

export function composeRefs<T>(...refs: PossibleRef<T>[]): React.RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(node);
      else if (ref && typeof ref === 'object') (ref as React.MutableRefObject<T | null>).current = node;
    }
  };
}

function childRef(child: React.ReactElement): PossibleRef<unknown> {
  const fromProps = (child.props as AnyProps).ref as PossibleRef<unknown>;
  return fromProps ?? (child as unknown as { ref?: PossibleRef<unknown> }).ref;
}

/**
 * Renders its only child with the given props merged in (class names joined, handlers chained).
 * Powers every `asChild` prop, e.g. `<Button asChild><Link href="/trips">Trips</Link></Button>`.
 */
export const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & AnyProps>(function Slot(
  { children, ...slotProps },
  ref,
) {
  if (!React.isValidElement(children)) return null;
  const child = children as React.ReactElement<AnyProps>;
  const childProps = child.props;
  const merged: AnyProps = { ...slotProps, ...childProps };
  for (const key of Object.keys(slotProps)) {
    const slotValue = slotProps[key];
    const childValue = childProps[key];
    if (/^on[A-Z]/.test(key) && typeof slotValue === 'function' && typeof childValue === 'function') {
      merged[key] = (...args: unknown[]) => {
        (childValue as (...a: unknown[]) => void)(...args);
        (slotValue as (...a: unknown[]) => void)(...args);
      };
    }
  }
  merged.className = cx(slotProps.className as string | undefined, childProps.className as string | undefined) || undefined;
  if (slotProps.style || childProps.style) merged.style = { ...(slotProps.style as object), ...(childProps.style as object) };
  merged.ref = composeRefs(ref, childRef(child) as PossibleRef<HTMLElement>);
  return React.cloneElement(child, merged);
});

/** State that works controlled (`value` + `onChange`) or uncontrolled (`defaultValue`). */
export function useControllableState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (next: T) => void,
): [T, (next: T) => void] {
  const [inner, setInner] = React.useState<T>(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? (value as T) : inner;
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;
  const set = React.useCallback(
    (next: T) => {
      if (!controlled) setInner(next);
      onChangeRef.current?.(next);
    },
    [controlled],
  );
  return [current, set];
}

/** A stable id usable in attributes and CSS selectors. */
export function useSafeId(prefix = 'bk'): string {
  const id = React.useId();
  return `${prefix}-${id.replace(/[^a-zA-Z0-9_-]/g, '')}`;
}

type IntrinsicTag = keyof React.JSX.IntrinsicElements;

/** Builds a simple styled element, e.g. `part('div', 'bk-tile-footer', 'TileFooter')`. */
export function part<E extends IntrinsicTag>(tag: E, base: string, displayName: string) {
  const Component = React.forwardRef<React.ComponentRef<E>, React.ComponentPropsWithoutRef<E>>(function Part(props, ref) {
    const { className, ...rest } = props as { className?: string };
    return React.createElement(tag, { ...rest, ref, className: cx(base, className) });
  });
  Component.displayName = displayName;
  return Component;
}

/** Props React 18 and 19 both accept for the native popover API. */
export function popoverTargetProps(id: string): AnyProps {
  return React.version.startsWith('18') ? { popovertarget: id } : { popoverTarget: id };
}
