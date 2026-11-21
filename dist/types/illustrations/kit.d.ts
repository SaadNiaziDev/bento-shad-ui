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
export declare const TOKEN_PALETTE: Palette;
/** Plain colours for standalone .svg files (img tags, Flutter, design tools). */
export declare const STATIC_PALETTE: Palette;
/** Default graphite colour, used when nothing sets `color` (for example in an <img>). */
export declare const GRAPHITE = "#3b3b42";
export type Point = readonly [number, number];
/**
 * Collects a drawing in painting order: later shapes cover earlier ones.
 * Lines are drawn twice with a slight offset and wobbled by a displacement filter, so they look sketched.
 * Colour fills sit on an opaque paper underlay and get a paper-grain filter, like coloured pencil.
 * Runs of the same kind share one filter group to keep the SVG light.
 */
export declare class Sketch {
    readonly id: string;
    readonly palette: Palette;
    private out;
    private buf;
    private mode;
    constructor(id: string, palette: Palette);
    private push;
    private flush;
    /** A pencil line. `w` is the main stroke width. */
    line(d: string, w?: number): this;
    /** A light single stroke (wrinkles, fur, folds). */
    soft(d: string, w?: number): this;
    /** Coloured-pencil fill with paper grain. Opaque by default, so it hides what was drawn before. */
    fill(d: string, color: string, opacity?: number, opaque?: boolean): this;
    /** Graphite hatching. `dense` for dark areas such as hair; `opaque` hides what is behind. */
    hatch(d: string, dense?: boolean, opaque?: boolean): this;
    /** A solid graphite dot (pupils, freckles, noses). */
    dot(x: number, y: number, r: number, ry?: number): this;
    /** Paper-coloured area that hides what is behind it (eye whites, lenses, skin). */
    paper(d: string): this;
    /** Raw SVG drawn in pencil (wobbled). */
    raw(svg: string): this;
    defs(): string;
    body(): string;
}
export type Mood = 'neutral' | 'happy' | 'surprised' | 'sad' | 'thinking' | 'sleepy';
export interface Face {
    /** Eye centres. */
    eyes: readonly [Point, Point];
    /** Eye size multiplier. Default 1. */
    eyeScale?: number;
    /** Mouth centre and half width. */
    mouth?: {
        at: Point;
        w: number;
        style?: 'human' | 'cat' | 'gap';
    };
    /** Cheek centres for blush. */
    cheeks?: readonly [Point, Point];
    /** Brow stroke width (bushy brows). Default 1.6. */
    brow?: number;
    /** Where thought bubbles and z's start (top right of the head). */
    bubble: Point;
}
/** Draws eyes, brows, mouth and mood extras for one face. */
export declare function drawFace(s: Sketch, face: Face, mood: Mood): void;
