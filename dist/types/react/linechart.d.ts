import * as React from 'react';
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
/**
 * Lines over shared labels, drawn as SVG with HTML text. Hover, or focus it and use ← →, to read
 * values. A visually hidden table holds every value for screen readers. Renders on the server;
 * without JavaScript the chart shows but the readout doesn't.
 */
export declare const LineChart: React.ForwardRefExoticComponent<LineChartProps & React.RefAttributes<HTMLElement>>;
