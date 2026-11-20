// Colour maths shared by the build and the tests. No dependencies.

function channels(hex) {
  const h = hex.replace('#', '');
  if (!/^[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(h)) throw new Error(`Not a #rrggbb colour: ${hex}`);
  const p = (i) => parseInt(h.slice(i, i + 2), 16) / 255;
  return { r: p(0), g: p(2), b: p(4), a: h.length === 8 ? p(6) : 1 };
}

const linear = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

/** #rrggbb → `oklch(L C H)`, the format shadcn/ui uses. */
export function hexToOklch(hex) {
  const { r, g, b, a } = channels(hex);
  const R = linear(r), G = linear(g), B = linear(b);
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const Bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.hypot(A, Bb);
  let H = (Math.atan2(Bb, A) * 180) / Math.PI;
  if (H < 0) H += 360;
  const f = (x) => +x.toFixed(3);
  const core = C < 0.002 ? `${f(L)} 0 0` : `${f(L)} ${f(C)} ${+H.toFixed(2)}`;
  return `oklch(${core}${a < 0.999 ? ` / ${Math.round(a * 100)}%` : ''})`;
}

/** WCAG 2.x relative luminance. */
export function luminance(hex) {
  const { r, g, b } = channels(hex);
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

/** WCAG 2.x contrast ratio between two colours (1–21). */
export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
