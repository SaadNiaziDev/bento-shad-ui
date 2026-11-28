/** Axis scale from `niceScale`: rounded bounds and the tick values between them. */
export interface NiceScale {
    min: number;
    max: number;
    ticks: number[];
}
/**
 * A readable axis for values between `low` and `high`: about `count` steps of 1, 2, 2.5 or 5 × 10ⁿ.
 * Starts at 0 when every value is positive, so bars and areas aren't exaggerated.
 */
export declare function niceScale(low: number, high: number, count?: number): NiceScale;
/**
 * SVG path data for a line through `values` in a 0–100 × 0–100 box (y grows downwards).
 * `null` values leave a gap. With `area`, each run is closed down to the baseline at `base` (0–100).
 */
export declare function linePath(values: readonly (number | null)[], scale: {
    min: number;
    max: number;
}, area?: boolean, base?: number): string;
