import * as React from 'react';
import { cx, flag, part } from './utils';

/* ---------------------------------------------------------------- Badge */

export type BadgeVariant = 'default' | 'brand' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' | 'info';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Colour. `success`, `warning` and `info` are soft fills for status. */
  variant?: BadgeVariant;
  /** Small coloured dot before the text. */
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge({ variant = 'default', dot, className, ...props }, ref) {
  return <span ref={ref} className={cx('bk-badge', className)} data-variant={variant === 'default' ? undefined : variant} data-dot={flag(dot)} {...props} />;
});

/* ---------------------------------------------------------------- Avatar */

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image URL. */
  src?: string;
  /** Alternative text for the image. */
  alt?: string;
  /** Shown when there is no image or it fails to load. Usually initials. */
  fallback?: React.ReactNode;
  /** Diameter: sm 28px, default 36px, lg 48px, xl 64px. */
  size?: 'sm' | 'default' | 'lg' | 'xl';
  /** `square` rounds the corners instead of a circle. */
  shape?: 'circle' | 'square';
  /** Coloured dot in the corner. */
  status?: 'online' | 'busy' | 'offline';
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt = '', fallback, size = 'default', shape = 'circle', status, className, children, ...props },
  ref,
) {
  const [failed, setFailed] = React.useState(false);
  const showImage = src && !failed;
  return (
    <span
      ref={ref}
      className={cx('bk-avatar', className)}
      data-size={size === 'default' ? undefined : size}
      data-shape={shape === 'square' ? 'square' : undefined}
      data-status={status}
      {...props}
    >
      {showImage ? <img src={src} alt={alt} onError={() => setFailed(true)} /> : (fallback ?? children)}
    </span>
  );
});

export const AvatarGroup = part('span', 'bk-avatar-group', 'AvatarGroup');

/* ---------------------------------------------------------------- Table */

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Class for the scroll wrapper. */
  wrapperClassName?: string;
}

/** A table that scrolls sideways inside its wrapper on narrow screens. */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(function Table({ wrapperClassName, className, ...props }, ref) {
  return (
    <div className={cx('bk-table-wrap', wrapperClassName)}>
      <table ref={ref} className={cx('bk-table', className)} {...props} />
    </div>
  );
});
export const TableHeader = part('thead', '', 'TableHeader');
export const TableBody = part('tbody', '', 'TableBody');
export const TableFooter = part('tfoot', '', 'TableFooter');
export const TableRow = part('tr', '', 'TableRow');
export const TableCaption = part('caption', '', 'TableCaption');

export interface TableCellProps extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'align'> {
  /** `end` right-aligns, for numbers. */
  align?: 'start' | 'end';
}
export interface TableHeadProps extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, 'align'> {
  /** `end` right-aligns, for numbers. */
  align?: 'start' | 'end';
}
export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  function TableHead({ align, ...props }, ref) {
    return <th ref={ref} scope={props.scope ?? 'col'} data-align={align === 'end' ? 'end' : undefined} {...props} />;
  },
);
export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell({ align, ...props }, ref) {
  return <td ref={ref} data-align={align === 'end' ? 'end' : undefined} {...props} />;
});

/* ---------------------------------------------------------------- List */

export const List = part('ul', 'bk-list', 'List');

export interface ListItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'title'> {
  /** Avatar or icon at the start. */
  leading?: React.ReactNode;
  /** Main line, cut with an ellipsis when too long. */
  title: React.ReactNode;
  /** Second line, muted. */
  description?: React.ReactNode;
  /** Small text at the end, e.g. a time. */
  meta?: React.ReactNode;
}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(function ListItem({ leading, title, description, meta, className, children, ...props }, ref) {
  return (
    <li ref={ref} className={cx('bk-list-item', className)} {...props}>
      {leading}
      <div className="bk-list-item-text">
        <span>{title}</span>
        {description ? <span>{description}</span> : null}
      </div>
      {meta ? <span className="bk-list-item-meta">{meta}</span> : null}
      {children}
    </li>
  );
});

/* ---------------------------------------------------------------- Stat, Sparkline */

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** What the number measures. */
  label: React.ReactNode;
  /** The number, formatted for display. */
  value: React.ReactNode;
  /** Change text, e.g. "+12.4% vs February". */
  delta?: React.ReactNode;
  /** Colours `delta`: up is success, down is destructive. */
  trend?: 'up' | 'down' | 'flat';
  /** Icon before the label. */
  icon?: React.ReactNode;
}

export const Stat = React.forwardRef<HTMLDivElement, StatProps>(function Stat({ label, value, delta, trend = 'flat', icon, className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cx('bk-stat', className)} {...props}>
      <span className="bk-stat-label">
        {icon}
        {label}
      </span>
      <span className="bk-stat-value">{value}</span>
      {delta ? (
        <span className="bk-stat-delta" data-trend={trend === 'flat' ? undefined : trend}>
          {delta}
        </span>
      ) : null}
      {children}
    </div>
  );
});

/** SVG points for a sparkline in a `width` x `height` box, with `padding` kept clear top and bottom. */
export function sparklinePoints(data: readonly number[], width = 100, height = 32, padding = 2): Array<[number, number]> {
  if (data.length === 0) return [];
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const step = data.length > 1 ? width / (data.length - 1) : 0;
  return data.map((v, i) => [
    round(data.length > 1 ? i * step : width / 2),
    round(padding + (1 - (v - min) / span) * (height - padding * 2)),
  ]);
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

export interface SparklineProps extends React.SVGAttributes<SVGSVGElement> {
  /** Values from oldest to newest. The line scales to their min and max. */
  data: readonly number[];
  /** Accessible summary, e.g. "Bookings rose from 12 to 31 per day". Required because the chart has no text. */
  label: string;
  /** Fill the area under the line. Default true. */
  area?: boolean;
  /** Mark the last point. Default true. */
  endpoint?: boolean;
}

export const Sparkline = React.forwardRef<SVGSVGElement, SparklineProps>(function Sparkline({ data, label, area = true, endpoint = true, className, ...props }, ref) {
  const points = sparklinePoints(data);
  const line = points.map(([x, y]) => `${x},${y}`).join(' ');
  const last = points[points.length - 1];
  return (
    <svg ref={ref} className={cx('bk-spark', className)} viewBox="0 0 100 32" preserveAspectRatio="none" role="img" aria-label={label} {...props}>
      {area && points.length > 1 ? <polygon points={`${line} 100,32 0,32`} /> : null}
      <polyline points={line} />
      {endpoint && last ? <circle cx={last[0]} cy={last[1]} r="2.5" /> : null}
    </svg>
  );
});

/* ---------------------------------------------------------------- BarChart, Legend, Meter */

export interface BarDatum {
  label: string;
  value: number;
}

/** Bar heights as percentages of `max` (defaults to the largest value). */
export function barHeights(data: readonly BarDatum[], max?: number): number[] {
  const top = max ?? Math.max(0, ...data.map((d) => d.value));
  return data.map((d) => (top > 0 ? round(Math.max(0, Math.min(100, (d.value / top) * 100))) : 0));
}

export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Bars in order, each with a label and a value. */
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
export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(function BarChart(
  { data, max, highlight = 'max', height = 160, formatValue = String, color, className, ...props },
  ref,
) {
  const heights = barHeights(data, max);
  const maxIndex = data.reduce((best, d, i, arr) => (d.value > (arr[best]?.value ?? -Infinity) ? i : best), 0);
  const emphasised = highlight === 'max' ? maxIndex : highlight === 'none' ? -1 : highlight;
  const summary = data.map((d) => `${d.label} ${formatValue(d.value)}`).join(', ');
  return (
    <div ref={ref} className={cx('bk-chart', className)} role="img" aria-label={props['aria-label'] ?? summary} {...props}>
      <div className="bk-bars" style={{ ['--h' as string]: `${height}px`, ...(color ? { ['--bar' as string]: color } : {}) }}>
        {data.map((d, i) => (
          <div
            key={`${d.label}-${i}`}
            className="bk-bar"
            style={{ ['--v' as string]: `${heights[i]}%` }}
            data-value={formatValue(d.value)}
            data-muted={flag(emphasised !== -1 && i !== emphasised)}
            data-show={flag(i === emphasised)}
          />
        ))}
      </div>
      <div className="bk-bar-labels" aria-hidden="true">
        {data.map((d, i) => (
          <span key={`${d.label}-${i}`}>{d.label}</span>
        ))}
      </div>
    </div>
  );
});

export interface LegendItem {
  label: React.ReactNode;
  /** Any CSS colour, e.g. `var(--chart-2)`. */
  color: string;
}

export function Legend({ items, className }: { items: readonly LegendItem[]; className?: string }): React.ReactElement {
  return (
    <div className={cx('bk-legend', className)}>
      {items.map((item, i) => (
        <span key={i} style={{ ['--c' as string]: item.color }}>
          {item.label}
        </span>
      ))}
    </div>
  );
}

export interface MeterSegment {
  label: string;
  value: number;
  color: string;
}

export interface MeterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Parts in order, each with a label, value and CSS colour. */
  segments: readonly MeterSegment[];
  /** Value of a full bar. Default 100. The rest shows as empty track. */
  total?: number;
}

/** Parts of a whole in one bar. Pair with `Legend`. */
export const Meter = React.forwardRef<HTMLDivElement, MeterProps>(function Meter({ segments, total = 100, className, ...props }, ref) {
  const summary = segments.map((s) => `${s.label} ${round((s.value / total) * 100)}%`).join(', ');
  return (
    <div ref={ref} className={cx('bk-meter', className)} role="img" aria-label={props['aria-label'] ?? summary} {...props}>
      {segments.map((s, i) => (
        <span key={i} style={{ ['--v' as string]: `${round((s.value / total) * 100)}%`, ['--c' as string]: s.color }} />
      ))}
    </div>
  );
});

/* ---------------------------------------------------------------- Progress, Ring, Skeleton */

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current progress. */
  value: number;
  /** Value of a full bar. Default 100. */
  max?: number;
  /** Fill colour. */
  tone?: 'default' | 'brand' | 'success';
  /** Accessible name, e.g. "Upload". */
  label: string;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(function Progress({ value, max = 100, tone = 'default', label, className, ...props }, ref) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      ref={ref}
      className={cx('bk-progress', className)}
      data-tone={tone === 'default' ? undefined : tone}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      {...props}
    >
      <span style={{ ['--v' as string]: `${percent}%` }} />
    </div>
  );
});

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

export const Ring = React.forwardRef<HTMLDivElement, RingProps>(function Ring({ value, size, thickness, color, label, className, style, children, ...props }, ref) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      ref={ref}
      className={cx('bk-ring', className)}
      role="img"
      aria-label={label}
      style={{
        ...style,
        ['--p' as string]: String(clamped),
        ...(size ? { ['--size' as string]: `${size}px` } : {}),
        ...(thickness ? { ['--w' as string]: `${thickness}px` } : {}),
        ...(color ? { ['--ring-color' as string]: color } : {}),
      }}
      {...props}
    >
      <span aria-hidden="true">{children ?? `${Math.round(clamped)}%`}</span>
    </div>
  );
});

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** CSS width, or pixels as a number. */
  width?: number | string;
  /** CSS height, or pixels as a number. Default 12. */
  height?: number | string;
  /** Fully round, for avatars. */
  circle?: boolean;
}

export const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton({ width, height = 12, circle, className, style, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cx('bk-skeleton', className)}
      aria-hidden="true"
      style={{ width, height, ...(circle ? { borderRadius: '50%' } : {}), ...style }}
      {...props}
    />
  );
});

/* ---------------------------------------------------------------- Alert */

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Meaning and colour. `destructive` is announced immediately. */
  variant?: 'default' | 'info' | 'success' | 'warning' | 'destructive';
  /** Icon at the start. */
  icon?: React.ReactNode;
  /** Bold first line. */
  title?: React.ReactNode;
  /** Buttons under the text. */
  actions?: React.ReactNode;
}

/** Inline message. `destructive` uses role="alert" so screen readers announce it at once. */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert({ variant = 'default', icon, title, actions, className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cx('bk-alert', className)}
      data-variant={variant === 'default' ? undefined : variant}
      role={variant === 'destructive' ? 'alert' : 'status'}
      {...props}
    >
      <span className="bk-alert-icon" aria-hidden="true">{icon}</span>
      {title ? <div className="bk-alert-title">{title}</div> : null}
      {children ? <div className="bk-alert-description">{children}</div> : null}
      {actions ? <div className="bk-alert-actions">{actions}</div> : null}
    </div>
  );
});

/* ---------------------------------------------------------------- Empty state */

export interface EmptyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Icon in a rounded square above the title. */
  icon?: React.ReactNode;
  /** A larger drawing above the title, usually a `PencilCharacter`. Use instead of `icon`. */
  illustration?: React.ReactNode;
  /** What is missing, for example "No trips yet". */
  title: React.ReactNode;
  /** What will appear here and how to add the first one. */
  description?: React.ReactNode;
  /** Buttons under the text. */
  actions?: React.ReactNode;
}

/** Says what will appear here and how to add the first one. */
export const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(function Empty({ icon, illustration, title, description, actions, className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cx('bk-empty', className)} {...props}>
      {illustration ? <div className="bk-empty-illustration">{illustration}</div> : null}
      {icon ? <span className="bk-empty-icon" aria-hidden="true">{icon}</span> : null}
      <h4 className="bk-empty-title">{title}</h4>
      {description ? <p className="bk-empty-description">{description}</p> : null}
      {actions ? <div className="bk-empty-actions">{actions}</div> : null}
      {children}
    </div>
  );
});

/* ---------------------------------------------------------------- Accordion */

export const Accordion = part('div', 'bk-accordion', 'Accordion');

export interface AccordionItemProps extends Omit<React.DetailsHTMLAttributes<HTMLDetailsElement>, 'title' | 'onToggle'> {
  /** Text of the clickable row. */
  title: React.ReactNode;
  /** Start expanded. */
  defaultOpen?: boolean;
  /** Called when the row opens or closes. */
  onOpenChange?: (open: boolean) => void;
}

/** One collapsible row. Native `<details>`, so it works before JavaScript loads. */
export const AccordionItem = React.forwardRef<HTMLDetailsElement, AccordionItemProps>(function AccordionItem(
  { title, defaultOpen, onOpenChange, className, children, ...props },
  ref,
) {
  return (
    <details
      ref={ref}
      className={cx('bk-accordion-item', className)}
      open={props.open ?? defaultOpen}
      onToggle={(e) => onOpenChange?.((e.currentTarget as HTMLDetailsElement).open)}
      {...props}
    >
      <summary className="bk-accordion-trigger">{title}</summary>
      <div className="bk-accordion-content">{children}</div>
    </details>
  );
});
