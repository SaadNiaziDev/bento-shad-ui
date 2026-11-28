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
export function niceScale(low: number, high: number, count = 4): NiceScale {
  let min = Math.min(low, high);
  let max = Math.max(low, high);
  if (min > 0) min = 0;
  if (max < 0) max = 0;
  if (min === max) max = min + 1;
  const raw = (max - min) / Math.max(1, count);
  const power = 10 ** Math.floor(Math.log10(raw));
  const step = ([1, 2, 2.5, 5, 10].find((m) => m * power >= raw) ?? 10) * power;
  const start = Math.floor(min / step) * step;
  const end = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= end + step / 2; v += step) ticks.push(Math.round(v / step) * step);
  return { min: start, max: end, ticks: ticks.map((t) => Number(t.toPrecision(12))) };
}

/**
 * SVG path data for a line through `values` in a 0–100 × 0–100 box (y grows downwards).
 * `null` values leave a gap. With `area`, each run is closed down to the baseline at `base` (0–100).
 */
export function linePath(values: readonly (number | null)[], scale: { min: number; max: number }, area = false, base = 100): string {
  const span = scale.max - scale.min || 1;
  const x = (i: number) => (values.length > 1 ? (i / (values.length - 1)) * 100 : 50);
  const y = (v: number) => 100 - ((v - scale.min) / span) * 100;
  const runs: Array<Array<[number, number]>> = [];
  let run: Array<[number, number]> = [];
  values.forEach((v, i) => {
    if (v === null || !Number.isFinite(v)) {
      if (run.length) runs.push(run);
      run = [];
    } else run.push([x(i), y(v)]);
  });
  if (run.length) runs.push(run);
  const f = (n: number) => String(Math.round(n * 100) / 100);
  return runs
    .map((points) => {
      const line = points.map(([px, py], i) => `${i ? 'L' : 'M'}${f(px)} ${f(py)}`).join(' ');
      if (!area) return points.length === 1 ? `${line} L${f(points[0]![0])} ${f(points[0]![1])}` : line;
      const first = points[0]!;
      const last = points[points.length - 1]!;
      return `${line} L${f(last[0])} ${f(base)} L${f(first[0])} ${f(base)} Z`;
    })
    .join(' ');
}
