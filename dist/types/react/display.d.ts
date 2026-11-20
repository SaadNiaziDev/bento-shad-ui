import * as React from 'react';
export type BadgeVariant = 'default' | 'brand' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' | 'info';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    /** Small coloured dot before the text. */
    dot?: boolean;
}
export declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
    src?: string;
    alt?: string;
    /** Shown when there is no image or it fails to load. Usually initials. */
    fallback?: React.ReactNode;
    size?: 'sm' | 'default' | 'lg' | 'xl';
    shape?: 'circle' | 'square';
    status?: 'online' | 'busy' | 'offline';
}
export declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLSpanElement>>;
export declare const AvatarGroup: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
    /** Class for the scroll wrapper. */
    wrapperClassName?: string;
}
/** A table that scrolls sideways inside its wrapper on narrow screens. */
export declare const Table: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLTableElement>>;
export declare const TableHeader: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, "ref"> & React.RefAttributes<HTMLTableSectionElement>>;
export declare const TableBody: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, "ref"> & React.RefAttributes<HTMLTableSectionElement>>;
export declare const TableFooter: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, "ref"> & React.RefAttributes<HTMLTableSectionElement>>;
export declare const TableRow: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>, "ref"> & React.RefAttributes<HTMLTableRowElement>>;
export declare const TableCaption: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>>;
export interface TableCellProps extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'align'> {
    /** `end` right-aligns, for numbers. */
    align?: 'start' | 'end';
}
export interface TableHeadProps extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, 'align'> {
    /** `end` right-aligns, for numbers. */
    align?: 'start' | 'end';
}
export declare const TableHead: React.ForwardRefExoticComponent<TableHeadProps & React.RefAttributes<HTMLTableCellElement>>;
export declare const TableCell: React.ForwardRefExoticComponent<TableCellProps & React.RefAttributes<HTMLTableCellElement>>;
export declare const List: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React.RefAttributes<HTMLUListElement>>;
export interface ListItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'title'> {
    /** Avatar or icon at the start. */
    leading?: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    /** Small text at the end, e.g. a time. */
    meta?: React.ReactNode;
}
export declare const ListItem: React.ForwardRefExoticComponent<ListItemProps & React.RefAttributes<HTMLLIElement>>;
export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
    label: React.ReactNode;
    value: React.ReactNode;
    /** Change text, e.g. "+12.4% vs February". */
    delta?: React.ReactNode;
    trend?: 'up' | 'down' | 'flat';
    icon?: React.ReactNode;
}
export declare const Stat: React.ForwardRefExoticComponent<StatProps & React.RefAttributes<HTMLDivElement>>;
/** SVG points for a sparkline in a `width` x `height` box, with `padding` kept clear top and bottom. */
export declare function sparklinePoints(data: readonly number[], width?: number, height?: number, padding?: number): Array<[number, number]>;
export interface SparklineProps extends React.SVGAttributes<SVGSVGElement> {
    data: readonly number[];
    /** Accessible summary, e.g. "Bookings rose from 12 to 31 per day". Required because the chart has no text. */
    label: string;
    /** Fill the area under the line. Default true. */
    area?: boolean;
    /** Mark the last point. Default true. */
    endpoint?: boolean;
}
export declare const Sparkline: React.ForwardRefExoticComponent<SparklineProps & React.RefAttributes<SVGSVGElement>>;
export interface BarDatum {
    label: string;
    value: number;
}
/** Bar heights as percentages of `max` (defaults to the largest value). */
export declare function barHeights(data: readonly BarDatum[], max?: number): number[];
export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
    data: readonly BarDatum[];
    /** Value of the top of the scale. Defaults to the largest value. */
    max?: number;
    /** Bar to emphasise: an index, `"max"` (default) or `"none"` (all bars full colour). */
    highlight?: number | 'max' | 'none';
    /** Plot height in pixels. Default 160. */
    height?: number;
    /** Formats the value shown on hover. */
    formatValue?: (value: number) => string;
    /** Bar colour. Default `var(--chart-1)`. */
    color?: string;
}
/** Vertical bar chart drawn with CSS, to scale. Gridlines mark quarters of `max`. */
export declare const BarChart: React.ForwardRefExoticComponent<BarChartProps & React.RefAttributes<HTMLDivElement>>;
export interface LegendItem {
    label: React.ReactNode;
    /** Any CSS colour, e.g. `var(--chart-2)`. */
    color: string;
}
export declare function Legend({ items, className }: {
    items: readonly LegendItem[];
    className?: string;
}): React.ReactElement;
export interface MeterSegment {
    label: string;
    value: number;
    color: string;
}
export interface MeterProps extends React.HTMLAttributes<HTMLDivElement> {
    segments: readonly MeterSegment[];
    /** Value of a full bar. Default 100. The rest shows as empty track. */
    total?: number;
}
/** Parts of a whole in one bar. Pair with `Legend`. */
export declare const Meter: React.ForwardRefExoticComponent<MeterProps & React.RefAttributes<HTMLDivElement>>;
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number;
    max?: number;
    tone?: 'default' | 'brand' | 'success';
    /** Accessible name, e.g. "Upload". */
    label: string;
}
export declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;
export interface RingProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 0–100. */
    value: number;
    /** Diameter in pixels. Default 76. */
    size?: number;
    /** Stroke width in pixels. Default 8. */
    thickness?: number;
    /** Ring colour. Default `var(--brand)`. */
    color?: string;
    /** Accessible description, e.g. "71% of budget used". */
    label: string;
    /** Centre text. Default `${value}%`. */
    children?: React.ReactNode;
}
export declare const Ring: React.ForwardRefExoticComponent<RingProps & React.RefAttributes<HTMLDivElement>>;
export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
    width?: number | string;
    height?: number | string;
    /** Fully round, for avatars. */
    circle?: boolean;
}
export declare const Skeleton: React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLSpanElement>>;
export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    variant?: 'default' | 'info' | 'success' | 'warning' | 'destructive';
    icon?: React.ReactNode;
    title?: React.ReactNode;
    /** Buttons under the text. */
    actions?: React.ReactNode;
}
/** Inline message. `destructive` uses role="alert" so screen readers announce it at once. */
export declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
export interface EmptyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    icon?: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
}
/** Says what will appear here and how to add the first one. */
export declare const Empty: React.ForwardRefExoticComponent<EmptyProps & React.RefAttributes<HTMLDivElement>>;
export declare const Accordion: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export interface AccordionItemProps extends Omit<React.DetailsHTMLAttributes<HTMLDetailsElement>, 'title' | 'onToggle'> {
    title: React.ReactNode;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}
/** One collapsible row. Native `<details>`, so it works before JavaScript loads. */
export declare const AccordionItem: React.ForwardRefExoticComponent<AccordionItemProps & React.RefAttributes<HTMLDetailsElement>>;
