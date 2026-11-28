import * as React from 'react';
import { linePath, niceScale } from '../core';
import { Legend } from './display';
import { cx } from './utils';

/* ---------------------------------------------------------------- Line chart */

export interface LineSeries {
  /** Name shown in the legend, the readout and the data table. */
  label: string;
  /** One value per label, oldest first. `null` leaves a gap. */
  data: readonly (number | null)[];
  /** Any CSS colour. Default: `--chart-1` to `--chart-5` in order. */
  color?: string;
}

export interface LineChartProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** What the chart shows, e.g. "Bookings per month, 2026". Used as the caption of the data table. */
  label: string;
  /** Labels along the bottom, one per value. */
  labels: readonly string[];
  /** One or more lines. */
  series: readonly LineSeries[];
  /** Fill the area under each line. Best with one series. */
  area?: boolean;
  /** Plot height in pixels. Default 200. */
  height?: number;
  /** Lowest value on the scale. Default: 0, or the lowest value when it is negative. */
  min?: number;
  /** Highest value on the scale. Default: a round number above the highest value. */
  max?: number;
  /** Formats values on the axis, in the readout and in the data table. */
  formatValue?: (value: number) => string;
  /** Show the legend. Default: when there is more than one series. */
  legend?: boolean;
}

const defaultFormat = (value: number) => value.toLocaleString();
const colorAt = (s: LineSeries, i: number) => s.color ?? `var(--chart-${(i % 5) + 1})`;

/**
 * Lines over shared labels, drawn as SVG with HTML text. Hover, or focus it and use ← →, to read
 * values. A visually hidden table holds every value for screen readers. Renders on the server;
 * without JavaScript the chart shows but the readout doesn't.
 */
export const LineChart = React.forwardRef<HTMLElement, LineChartProps>(function LineChart(
  { label, labels, series, area = false, height = 200, min, max, formatValue = defaultFormat, legend, className, style, ...props },
  ref,
) {
  const values = series.flatMap((s) => s.data.filter((v): v is number => v !== null && Number.isFinite(v)));
  const auto = niceScale(values.length ? Math.min(...values) : 0, values.length ? Math.max(...values) : 1);
  const scale = { min: min ?? auto.min, max: max ?? auto.max };
  const ticks = min === undefined && max === undefined ? auto.ticks : niceScale(scale.min, scale.max).ticks.filter((t) => t >= scale.min && t <= scale.max);
  const span = scale.max - scale.min || 1;
  const yOf = (v: number) => ((v - scale.min) / span) * 100; // percent from the bottom
  const xOf = (i: number) => (labels.length > 1 ? (i / (labels.length - 1)) * 100 : 50);
  const base = 100 - yOf(Math.max(scale.min, Math.min(scale.max, 0)));

  const [active, setActive] = React.useState<number | null>(null);
  const [announce, setAnnounce] = React.useState('');
  const describe = (i: number) =>
    `${labels[i]}: ${series.map((s) => `${s.label} ${s.data[i] == null ? 'no value' : formatValue(s.data[i] as number)}`).join(', ')}`;
  const select = (i: number, speak: boolean) => {
    const clamped = Math.max(0, Math.min(labels.length - 1, i));
    setActive(clamped);
    if (speak) setAnnounce(describe(clamped));
  };

  const tickLabels = ticks.map(formatValue);
  const yChars = Math.max(...tickLabels.map((t) => t.length), 1);
  const every = Math.max(1, Math.ceil(labels.length / 8)); // at most about 8 labels along the bottom
  const showLegend = legend ?? series.length > 1;

  return (
    <figure
      ref={ref}
      className={cx('bk-line-chart', className)}
      style={{ ...style, ['--h' as string]: `${height}px`, ['--y-chars' as string]: yChars }}
      {...props}
    >
      <div className="bk-line-chart-body">
        <div className="bk-line-chart-y" aria-hidden="true">
          {ticks.map((t, i) => (
            <span key={t} style={{ ['--y' as string]: `${yOf(t)}%` }}>
              {tickLabels[i]}
            </span>
          ))}
        </div>
        <div
          className="bk-line-chart-plot"
          tabIndex={0}
          role="group"
          aria-roledescription="chart"
          aria-label={`${label}. Use the left and right arrow keys to read values.`}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            select(Math.round(((e.clientX - r.left) / (r.width || 1)) * (labels.length - 1)), false);
          }}
          onPointerLeave={(e) => {
            // Keep the readout if the chart also has keyboard focus.
            if (document.activeElement !== e.currentTarget) setActive(null);
          }}
          onFocus={() => select(active ?? labels.length - 1, true)}
          onBlur={() => setActive(null)}
          onKeyDown={(e) => {
            const current = active ?? labels.length - 1;
            const next = e.key === 'ArrowLeft' ? current - 1 : e.key === 'ArrowRight' ? current + 1 : e.key === 'Home' ? 0 : e.key === 'End' ? labels.length - 1 : null;
            if (next === null) return;
            e.preventDefault();
            select(next, true);
          }}
        >
          {ticks.map((t) => (
            <span key={t} className="bk-line-chart-gridline" style={{ ['--y' as string]: `${yOf(t)}%` }} />
          ))}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            {area
              ? series.map((s, i) => (
                  <path key={`a${i}`} className="bk-line-chart-area" d={linePath(s.data, scale, true, base)} style={{ ['--c' as string]: colorAt(s, i) }} />
                ))
              : null}
            {series.map((s, i) => (
              <path key={`l${i}`} className="bk-line-chart-line" d={linePath(s.data, scale)} style={{ ['--c' as string]: colorAt(s, i) }} />
            ))}
          </svg>
          {active !== null ? (
            <div className="bk-line-chart-cursor" style={{ ['--x' as string]: `${xOf(active)}%` }} aria-hidden="true">
              {series.map((s, i) =>
                s.data[active] == null ? null : (
                  <span key={i} className="bk-line-chart-dot" style={{ ['--y' as string]: `${yOf(s.data[active] as number)}%`, ['--c' as string]: colorAt(s, i) }} />
                ),
              )}
              <div className="bk-line-chart-tip" data-side={xOf(active) > 60 ? 'start' : 'end'}>
                <div className="bk-line-chart-tip-title">{labels[active]}</div>
                {series.map((s, i) => (
                  <div key={i} className="bk-line-chart-tip-row" style={{ ['--c' as string]: colorAt(s, i) }}>
                    <span>{s.label}</span>
                    <b>{s.data[active] == null ? '–' : formatValue(s.data[active] as number)}</b>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="bk-line-chart-x" aria-hidden="true">
          {labels.map((l, i) =>
            // Every `every`-th label, plus the last; a regular label too close to the last is dropped.
            (i % every === 0 && labels.length - 1 - i >= every) || i === labels.length - 1 ? (
              <span key={i} style={{ ['--x' as string]: `${xOf(i)}%` }} data-edge={i === 0 ? 'start' : i === labels.length - 1 ? 'end' : undefined}>
                {l}
              </span>
            ) : null,
          )}
        </div>
      </div>
      {showLegend ? <Legend items={series.map((s, i) => ({ label: s.label, color: colorAt(s, i) }))} /> : null}
      <table className="bk-sr-only">
        <caption>{label}</caption>
        <thead>
          <tr>
            <td />
            {series.map((s) => (
              <th key={s.label} scope="col">{s.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {labels.map((l, i) => (
            <tr key={i}>
              <th scope="row">{l}</th>
              {series.map((s) => (
                <td key={s.label}>{s.data[i] == null ? 'No value' : formatValue(s.data[i] as number)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <span className="bk-sr-only" aria-live="polite">{announce}</span>
    </figure>
  );
});
