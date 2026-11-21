/**
 * Pencil drawing kit for the bento-shad-ui characters.
 * Pure string building: no DOM, safe on the server and in build scripts.
 */

export interface Palette {
  peach: string;
  sky: string;
  mint: string;
  lilac: string;
  butter: string;
  brand: string;
  blush: string;
  paper: string;
}

/** Colours that follow the library tokens (and dark mode) when the SVG is inline in a page. */
export const TOKEN_PALETTE: Palette = {
  peach: 'var(--tint-peach, #ffd2b5)',
  sky: 'var(--tint-sky, #cfe2fb)',
  mint: 'var(--tint-mint, #cdeedb)',
  lilac: 'var(--tint-lilac, #e2d8fb)',
  butter: 'var(--tint-butter, #f9e7a8)',
  brand: 'var(--brand, #ff7a45)',
  blush: 'var(--chart-1, #ff7a45)',
  paper: 'var(--card, #ffffff)',
};

/** Plain colours for standalone .svg files (img tags, Flutter, design tools). */
export const STATIC_PALETTE: Palette = {
  peach: '#ffd2b5',
  sky: '#cfe2fb',
  mint: '#cdeedb',
  lilac: '#e2d8fb',
  butter: '#f9e7a8',
  brand: '#ff7a45',
  blush: '#ff7a45',
  paper: '#ffffff',
};

/** Default graphite colour, used when nothing sets `color` (for example in an <img>). */
export const GRAPHITE = '#3b3b42';

export type Point = readonly [number, number];

const n = (v: number) => +v.toFixed(2);

/**
 * Collects a drawing in painting order: later shapes cover earlier ones.
 * Lines are drawn twice with a slight offset and wobbled by a displacement filter, so they look sketched.
 * Colour fills sit on an opaque paper underlay and get a paper-grain filter, like coloured pencil.
 * Runs of the same kind share one filter group to keep the SVG light.
 */
export class Sketch {
  private out: string[] = [];
  private buf: string[] = [];
  private mode: 'line' | 'grain' | 'plain' | null = null;

  constructor(readonly id: string, readonly palette: Palette) {}

  private push(mode: 'line' | 'grain' | 'plain', svg: string): void {
    if (mode !== this.mode) this.flush();
    this.mode = mode;
    this.buf.push(svg);
  }

  private flush(): void {
    if (this.buf.length) {
      const inner = this.buf.join('');
      this.out.push(this.mode === 'line' ? `<g filter="url(#${this.id}-wobble)">${inner}</g>` : this.mode === 'grain' ? `<g filter="url(#${this.id}-grain)">${inner}</g>` : inner);
    }
    this.buf = [];
    this.mode = null;
  }

  /** A pencil line. `w` is the main stroke width. */
  line(d: string, w = 1.7): this {
    this.push(
      'line',
      `<path d="${d}" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>` +
        `<path d="${d}" fill="none" stroke="currentColor" stroke-width="${n(w * 0.55)}" stroke-linecap="round" stroke-linejoin="round" opacity=".42" transform="translate(.9 -.7)"/>`,
    );
    return this;
  }

  /** A light single stroke (wrinkles, fur, folds). */
  soft(d: string, w = 1.1): this {
    this.push('line', `<path d="${d}" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/>`);
    return this;
  }

  /** Coloured-pencil fill with paper grain. Opaque by default, so it hides what was drawn before. */
  fill(d: string, color: string, opacity = 1, opaque = true): this {
    if (opaque) this.push('plain', `<path d="${d}" fill="${this.palette.paper}"/>`);
    this.push('grain', `<path d="${d}" fill="${color}"${opacity < 1 ? ` opacity="${opacity}"` : ''}/>`);
    return this;
  }

  /** Graphite hatching. `dense` for dark areas such as hair; `opaque` hides what is behind. */
  hatch(d: string, dense = false, opaque = false): this {
    if (opaque) this.push('plain', `<path d="${d}" fill="${this.palette.paper}"/>`);
    this.push('plain', `<path d="${d}" fill="url(#${this.id}-${dense ? 'hatch2' : 'hatch'})"/>`);
    return this;
  }

  /** A solid graphite dot (pupils, freckles, noses). */
  dot(x: number, y: number, r: number, ry = r): this {
    this.push('line', r === ry ? `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="currentColor"/>` : `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(r)}" ry="${n(ry)}" fill="currentColor"/>`);
    return this;
  }

  /** Paper-coloured area that hides what is behind it (eye whites, lenses, skin). */
  paper(d: string): this {
    this.push('plain', `<path d="${d}" fill="${this.palette.paper}"/>`);
    return this;
  }

  /** Raw SVG drawn in pencil (wobbled). */
  raw(svg: string): this {
    this.push('line', svg);
    return this;
  }

  defs(): string {
    const id = this.id;
    return (
      `<defs>` +
      `<filter id="${id}-wobble" x="-4%" y="-4%" width="108%" height="108%"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.8" xChannelSelector="R" yChannelSelector="G"/></filter>` +
      `<filter id="${id}-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" seed="11" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.5 0 0 0 1.32" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>` +
      `<pattern id="${id}-hatch" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(38)"><line x1="0" y1="0" x2="0" y2="4.5" stroke="currentColor" stroke-width=".9" opacity=".38"/></pattern>` +
      `<pattern id="${id}-hatch2" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-42)"><line x1="0" y1="0" x2="0" y2="3" stroke="currentColor" stroke-width="1" opacity=".62"/></pattern>` +
      `</defs>`
    );
  }

  body(): string {
    this.flush();
    return this.out.join('');
  }
}

/* ------------------------------------------------------------------ face kit */

export type Mood = 'neutral' | 'happy' | 'surprised' | 'sad' | 'thinking' | 'sleepy';

export interface Face {
  /** Eye centres. */
  eyes: readonly [Point, Point];
  /** Eye size multiplier. Default 1. */
  eyeScale?: number;
  /** Mouth centre and half width. */
  mouth?: { at: Point; w: number; style?: 'human' | 'cat' | 'gap' };
  /** Cheek centres for blush. */
  cheeks?: readonly [Point, Point];
  /** Brow stroke width (bushy brows). Default 1.6. */
  brow?: number;
  /** Where thought bubbles and z's start (top right of the head). */
  bubble: Point;
}

/** Draws eyes, brows, mouth and mood extras for one face. */
export function drawFace(s: Sketch, face: Face, mood: Mood): void {
  const k = face.eyeScale ?? 1;
  const bw = face.brow ?? 1.6;
  const [[lx, ly], [rx, ry]] = face.eyes;

  // eyes
  for (const [x, y, side] of [[lx, ly, -1], [rx, ry, 1]] as const) {
    if (mood === 'happy') s.line(`M${n(x - 4.2 * k)} ${n(y + 1.5 * k)} Q${n(x)} ${n(y - 4.5 * k)} ${n(x + 4.2 * k)} ${n(y + 1.5 * k)}`, 1.9);
    else if (mood === 'sleepy') s.line(`M${n(x - 4 * k)} ${n(y)} Q${n(x)} ${n(y + 3.4 * k)} ${n(x + 4 * k)} ${n(y)}`, 1.7);
    else if (mood === 'surprised') {
      s.paper(`M${n(x - 5.6 * k)} ${n(y)} a${n(5.6 * k)} ${n(6.4 * k)} 0 1 0 ${n(11.2 * k)} 0 a${n(5.6 * k)} ${n(6.4 * k)} 0 1 0 ${n(-11.2 * k)} 0Z`);
      s.line(`M${n(x - 5.6 * k)} ${n(y)} a${n(5.6 * k)} ${n(6.4 * k)} 0 1 0 ${n(11.2 * k)} 0 a${n(5.6 * k)} ${n(6.4 * k)} 0 1 0 ${n(-11.2 * k)} 0`, 1.3);
      s.dot(x, y + 0.6 * k, 2.4 * k);
    } else if (mood === 'thinking') {
      s.dot(x + 1.6 * k, y - 1.8 * k, 3 * k, 3.6 * k);
      s.raw(`<circle cx="${n(x + 2.6 * k)}" cy="${n(y - 3.2 * k)}" r="${n(0.9 * k)}" fill="${s.palette.paper}"/>`);
    } else {
      s.dot(x, y, 3.1 * k, 3.9 * k);
      s.raw(`<circle cx="${n(x + 1.1 * k)}" cy="${n(y - 1.4 * k)}" r="${n(1 * k)}" fill="${s.palette.paper}"/>`);
    }
    // brows
    const bx = x;
    const by = y - 9 * k;
    if (mood === 'sad') s.line(side < 0 ? `M${n(bx - 5 * k)} ${n(by + 1.5)} L${n(bx + 4.5 * k)} ${n(by - 2.5)}` : `M${n(bx + 5 * k)} ${n(by + 1.5)} L${n(bx - 4.5 * k)} ${n(by - 2.5)}`, bw);
    else if (mood === 'surprised') s.line(`M${n(bx - 5 * k)} ${n(by - 3)} Q${n(bx)} ${n(by - 7)} ${n(bx + 5 * k)} ${n(by - 3)}`, bw);
    else if (mood === 'thinking') s.line(side > 0 ? `M${n(bx - 5 * k)} ${n(by - 2)} Q${n(bx)} ${n(by - 6)} ${n(bx + 5 * k)} ${n(by - 3)}` : `M${n(bx - 5 * k)} ${n(by)} L${n(bx + 5 * k)} ${n(by + 0.5)}`, bw);
    else if (mood !== 'sleepy') s.line(`M${n(bx - 4.5 * k)} ${n(by)} Q${n(bx)} ${n(by - 2.5)} ${n(bx + 4.5 * k)} ${n(by)}`, bw);
  }

  // mouth
  if (face.mouth) {
    const [mx, my] = face.mouth.at;
    const w = face.mouth.w;
    const style = face.mouth.style ?? 'human';
    if (mood === 'happy') {
      const d = `M${n(mx - w * 1.5)} ${n(my - 1)} Q${n(mx)} ${n(my + w * 1.9)} ${n(mx + w * 1.5)} ${n(my - 1)} Q${n(mx)} ${n(my + 2)} ${n(mx - w * 1.5)} ${n(my - 1)}Z`;
      s.fill(d, s.palette.blush, 0.55);
      s.line(d, 1.6);
      if (style === 'gap') {
        s.paper(`M${n(mx - 3.6)} ${n(my + 0.4)} h3 v3.4 h-3Z M${n(mx + 0.6)} ${n(my + 0.4)} h3 v3.4 h-3Z`);
        s.soft(`M${n(mx - 3.6)} ${n(my + 0.4)} v3.4 h3 v-3.4 M${n(mx + 0.6)} ${n(my + 0.4)} v3.4 h3 v-3.4`, 0.9);
      }
    } else if (mood === 'surprised') {
      s.fill(`M${n(mx - 3.4)} ${n(my + 2)} a3.4 4.4 0 1 0 6.8 0 a3.4 4.4 0 1 0 -6.8 0Z`, s.palette.blush, 0.4);
      s.line(`M${n(mx - 3.4)} ${n(my + 2)} a3.4 4.4 0 1 0 6.8 0 a3.4 4.4 0 1 0 -6.8 0`, 1.5);
    } else if (mood === 'sad') {
      s.line(`M${n(mx - w)} ${n(my + 3)} Q${n(mx)} ${n(my - 2.5)} ${n(mx + w)} ${n(my + 3)}`, 1.6);
    } else if (mood === 'thinking') {
      s.line(`M${n(mx - w * 0.8)} ${n(my + 1)} Q${n(mx)} ${n(my - 0.6)} ${n(mx + w * 0.9)} ${n(my + 1.8)}`, 1.5);
    } else if (mood === 'sleepy') {
      s.line(`M${n(mx - 2)} ${n(my + 1)} a2 2.4 0 1 0 4 0 a2 2.4 0 1 0 -4 0`, 1.3);
    } else if (style === 'cat') {
      s.line(`M${n(mx - w)} ${n(my)} Q${n(mx - w / 2)} ${n(my + 4)} ${n(mx)} ${n(my)} Q${n(mx + w / 2)} ${n(my + 4)} ${n(mx + w)} ${n(my)}`, 1.5);
    } else {
      s.line(`M${n(mx - w)} ${n(my)} Q${n(mx)} ${n(my + w * 0.75)} ${n(mx + w)} ${n(my)}`, 1.6);
    }
  }

  // extras
  if (face.cheeks && (mood === 'happy' || mood === 'neutral')) {
    for (const [cx, cy] of face.cheeks) s.fill(`M${n(cx - 6)} ${n(cy)} a6 3.6 0 1 0 12 0 a6 3.6 0 1 0 -12 0Z`, s.palette.blush, mood === 'happy' ? 0.5 : 0.28, false);
  }
  const [bx, by] = face.bubble;
  if (mood === 'thinking') {
    s.line(`M${n(bx)} ${n(by)} a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0`, 1.2);
    s.line(`M${n(bx + 6)} ${n(by - 8)} a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0`, 1.3);
    const cx = bx + 20;
    const cy = by - 24;
    s.paper(`M${cx - 12} ${cy} c0 -8 6 -12 12 -12 c7 0 12 4 12 11 c0 8 -6 12 -12 12 c-7 0 -12 -4 -12 -11Z`);
    s.line(`M${cx - 12} ${cy} c0 -8 6 -12 12 -12 c7 0 12 4 12 11 c0 8 -6 12 -12 12 c-7 0 -12 -4 -12 -11Z`, 1.4);
    s.line(`M${cx - 3.6} ${cy - 3.4} c0 -4 7.4 -4 7.4 0.6 c0 3.4 -3.8 3 -3.8 6.4`, 1.6);
    s.dot(cx, cy + 6.6, 1.1);
  } else if (mood === 'sleepy') {
    const z = (x: number, y: number, size: number) => `M${n(x)} ${n(y)} h${size} l${-size} ${n(size * 1.1)} h${size}`;
    s.line(z(bx + 2, by - 6, 6), 1.5);
    s.line(z(bx + 12, by - 20, 8.5), 1.6);
  } else if (mood === 'surprised') {
    s.line(`M${n(bx)} ${n(by - 2)} l5 -7 M${n(bx + 6)} ${n(by + 4)} l9 -3 M${n(bx - 6)} ${n(by - 6)} l1 -9`, 1.5);
  } else if (mood === 'sad') {
    const [tx, ty] = [lx - 3.5 * k, ly + 7 * k];
    const tear = `M${n(tx)} ${n(ty)} q-3.2 5.6 0 7.4 q3.2 -1.8 0 -7.4Z`;
    s.fill(tear, s.palette.sky, 1);
    s.line(tear, 1.1);
  }
}
