import * as React from 'react';
import { cx, flag, part, Slot } from './utils';

export type TileTone = 'default' | 'muted' | 'peach' | 'sky' | 'mint' | 'lilac' | 'butter' | 'inverse' | 'brand';
export type TileSpan = 1 | 2 | 3 | 4 | 'full';
export type TileRows = 1 | 2 | 3;

/* ---------------------------------------------------------------- BentoGrid */

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Columns at full width. Drops to 2 below 900px of container width and to 1 below 560px (`cols={2}` stays at 2). Default 4. */
  cols?: 2 | 3 | 4 | 6;
  /** Class for the outer element that the grid measures (the container query container). */
  containerClassName?: string;
}

/** The bento grid. Columns follow the width of the grid's own container, not the viewport. */
export const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(function BentoGrid(
  { cols = 4, className, containerClassName, ...props },
  ref,
) {
  return (
    <div className={cx('bk-bento', containerClassName)}>
      <div ref={ref} className={cx('bk-bento-grid', className)} data-cols={cols === 4 ? undefined : cols} {...props} />
    </div>
  );
});

/* ---------------------------------------------------------------- Tile */

export interface TileProps extends React.HTMLAttributes<HTMLElement> {
  /** Columns the tile spans. */
  span?: TileSpan;
  /** Rows the tile spans. */
  rows?: TileRows;
  /** Background tone. Components inside adapt their colours. */
  tone?: TileTone;
  /** Lifts on hover; use for clickable tiles. */
  interactive?: boolean;
  /** Centres content both ways. */
  center?: boolean;
  /** Element to render. Default `div`. */
  as?: 'div' | 'article' | 'section' | 'aside' | 'li' | 'a' | 'nav' | 'form';
  /** Render the single child instead (e.g. a Next.js `<Link>`), merging tile props into it. */
  asChild?: boolean;
}

export const Tile = React.forwardRef<HTMLElement, TileProps>(function Tile(
  { span = 1, rows = 1, tone = 'default', interactive, center, as = 'div', asChild, className, ...props },
  ref,
) {
  const attrs = {
    className: cx('bk-tile', span !== 1 && (span === 'full' ? 'bk-span-full' : `bk-span-${span}`), rows !== 1 && `bk-row-${rows}`, className),
    'data-tone': tone === 'default' ? undefined : tone,
    'data-interactive': flag(interactive),
    'data-center': flag(center),
  };
  if (asChild) return <Slot ref={ref} {...attrs} {...props} />;
  const Tag = as as React.ElementType;
  return <Tag ref={ref} {...attrs} {...props} />;
});

export const TileHeader = part('div', 'bk-tile-header', 'TileHeader');
export const TileTitle = part('h3', 'bk-tile-title', 'TileTitle');
export const TileDescription = part('p', 'bk-tile-description', 'TileDescription');
export const TileFooter = part('div', 'bk-tile-footer', 'TileFooter');
export const TileMedia = part('div', 'bk-tile-media', 'TileMedia');
export const Eyebrow = part('span', 'bk-eyebrow', 'Eyebrow');

/* ---------------------------------------------------------------- Card (shadcn anatomy) */

export const Card = part('div', 'bk-card', 'Card');
export const CardHeader = part('div', 'bk-card-header', 'CardHeader');
export const CardTitle = part('h3', 'bk-card-title', 'CardTitle');
export const CardDescription = part('p', 'bk-card-description', 'CardDescription');
export const CardAction = part('div', 'bk-card-action', 'CardAction');
export const CardContent = part('div', 'bk-card-content', 'CardContent');
export const CardFooter = part('div', 'bk-card-footer', 'CardFooter');

/* ---------------------------------------------------------------- Layout helpers */

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap in pixels. Default 12. */
  gap?: number;
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(function Stack({ gap, className, style, ...props }, ref) {
  return <div ref={ref} className={cx('bk-stack', className)} style={gap === undefined ? style : { ...style, ['--gap' as string]: `${gap}px` }} {...props} />;
});

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap in pixels. Default 8. */
  gap?: number;
  /** Push children to both ends. */
  between?: boolean;
}

export const Row = React.forwardRef<HTMLDivElement, RowProps>(function Row({ gap, between, className, style, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cx('bk-row', between && 'bk-between', className)}
      style={gap === undefined ? style : { ...style, ['--gap' as string]: `${gap}px` }}
      {...props}
    />
  );
});

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  /** Direction of the rule. */
  orientation?: 'horizontal' | 'vertical';
}

export const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(function Separator({ orientation = 'horizontal', className, ...props }, ref) {
  return <hr ref={ref} className={cx('bk-separator', className)} data-orientation={orientation === 'vertical' ? 'vertical' : undefined} aria-orientation={orientation} {...props} />;
});

export interface MediaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Aspect ratio, e.g. `"16 / 9"` or `1.5`. Default 16 / 9. */
  ratio?: string | number;
  /** Small label over the bottom-left corner. */
  caption?: React.ReactNode;
}

/** Aspect-ratio box for an `<img>` or `<video>` child. */
export const Media = React.forwardRef<HTMLDivElement, MediaProps>(function Media({ ratio, caption, className, style, children, ...props }, ref) {
  return (
    <div ref={ref} className={cx('bk-media', className)} style={ratio === undefined ? style : { ...style, ['--ratio' as string]: String(ratio) }} {...props}>
      {children}
      {caption ? <span className="bk-media-caption">{caption}</span> : null}
    </div>
  );
});
