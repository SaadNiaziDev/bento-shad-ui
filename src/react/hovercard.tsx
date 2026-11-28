import * as React from 'react';
import { enablePopoverPlacement, hideHoverCard, HOVERCARD_CLOSE_DELAY, HOVERCARD_OPEN_DELAY, showHoverCard } from '../core';
import { cx, useSafeId } from './utils';

/* ---------------------------------------------------------------- Hover card */

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

type TriggerProps = {
  onPointerEnter?: (e: React.PointerEvent<HTMLElement>) => void;
  onPointerLeave?: (e: React.PointerEvent<HTMLElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
};

/**
 * A preview card that opens while a pointer rests on its trigger or the trigger has keyboard focus.
 * It stays open while the pointer is over it, and Esc closes it. Touch is ignored, so a tap
 * follows the link. Screen readers don't get the card: it supplements the trigger, never replaces it.
 */
export function HoverCard({
  trigger,
  children,
  openDelay = HOVERCARD_OPEN_DELAY,
  closeDelay = HOVERCARD_CLOSE_DELAY,
  align = 'start',
  className,
  onPointerEnter,
  onPointerLeave,
  ...props
}: HoverCardProps): React.ReactElement {
  const id = useSafeId('hovercard');
  const cardRef = React.useRef<HTMLDivElement>(null);
  const anchor = React.useRef<HTMLElement | null>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  React.useEffect(() => {
    enablePopoverPlacement();
    return () => clearTimeout(timer.current);
  }, []);

  const later = (ms: number, run: () => void) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(run, ms);
  };
  const open = (delay: number) =>
    later(delay, () => {
      if (cardRef.current && anchor.current) showHoverCard(cardRef.current, anchor.current);
    });
  const close = () =>
    later(closeDelay, () => {
      if (cardRef.current) hideHoverCard(cardRef.current);
    });
  const stay = () => clearTimeout(timer.current);

  const own = trigger.props as TriggerProps;
  const clone = React.cloneElement(trigger as React.ReactElement<TriggerProps & Record<string, unknown>>, {
    'data-bk-hovercard-for': id,
    onPointerEnter: (e: React.PointerEvent<HTMLElement>) => {
      own.onPointerEnter?.(e);
      if (e.pointerType === 'touch') return;
      anchor.current = e.currentTarget;
      open(openDelay);
    },
    onPointerLeave: (e: React.PointerEvent<HTMLElement>) => {
      own.onPointerLeave?.(e);
      close();
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      own.onFocus?.(e);
      anchor.current = e.currentTarget;
      if (e.currentTarget.matches(':focus-visible')) open(0);
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      own.onBlur?.(e);
      close();
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
      own.onKeyDown?.(e);
      if (e.key === 'Escape' && cardRef.current) hideHoverCard(cardRef.current);
    },
  });

  return (
    <>
      {clone}
      <div
        ref={cardRef}
        id={id}
        {...({ popover: 'manual' } as Record<string, string>)}
        className={cx('bk-hovercard', className)}
        data-align={align}
        data-bk-react=""
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          stay();
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          close();
        }}
        {...props}
      >
        {children}
      </div>
    </>
  );
}
