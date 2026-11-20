import * as React from 'react';
export type TileTone = 'default' | 'muted' | 'peach' | 'sky' | 'mint' | 'lilac' | 'butter' | 'inverse' | 'brand';
export type TileSpan = 1 | 2 | 3 | 4 | 'full';
export type TileRows = 1 | 2 | 3;
export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Columns at full width. Drops to 2 below 900px of container width and to 1 below 560px (`cols={2}` stays at 2). Default 4. */
    cols?: 2 | 3 | 4 | 6;
    /** Class for the outer element that the grid measures (the container query container). */
    containerClassName?: string;
}
/** The bento grid. Columns follow the width of the grid's own container, not the viewport. */
export declare const BentoGrid: React.ForwardRefExoticComponent<BentoGridProps & React.RefAttributes<HTMLDivElement>>;
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
export declare const Tile: React.ForwardRefExoticComponent<TileProps & React.RefAttributes<HTMLElement>>;
export declare const TileHeader: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare const TileTitle: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
export declare const TileDescription: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
export declare const TileFooter: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare const TileMedia: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare const Eyebrow: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
export declare const Card: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare const CardHeader: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare const CardTitle: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
export declare const CardDescription: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
export declare const CardAction: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare const CardContent: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare const CardFooter: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Gap in pixels. Default 12. */
    gap?: number;
}
export declare const Stack: React.ForwardRefExoticComponent<StackProps & React.RefAttributes<HTMLDivElement>>;
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Gap in pixels. Default 8. */
    gap?: number;
    /** Push children to both ends. */
    between?: boolean;
}
export declare const Row: React.ForwardRefExoticComponent<RowProps & React.RefAttributes<HTMLDivElement>>;
export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
    orientation?: 'horizontal' | 'vertical';
}
export declare const Separator: React.ForwardRefExoticComponent<SeparatorProps & React.RefAttributes<HTMLHRElement>>;
export interface MediaProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Aspect ratio, e.g. `"16 / 9"` or `1.5`. Default 16 / 9. */
    ratio?: string | number;
    /** Small label over the bottom-left corner. */
    caption?: React.ReactNode;
}
/** Aspect-ratio box for an `<img>` or `<video>` child. */
export declare const Media: React.ForwardRefExoticComponent<MediaProps & React.RefAttributes<HTMLDivElement>>;
