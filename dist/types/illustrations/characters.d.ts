import type { Face, Sketch } from './kit';
export type CharacterId = 'mira' | 'theo' | 'zara' | 'kofi' | 'pip' | 'dumpling' | 'biscuit' | 'moss';
export interface CharacterInfo {
    id: CharacterId;
    name: string;
    kind: 'person' | 'animal';
    /** One-line personality. */
    role: string;
    /** Visual traits that make the character recognisable. */
    traits: readonly string[];
    /** UI situations the character suits. */
    bestFor: readonly string[];
}
export interface CharacterDefinition extends CharacterInfo {
    face: Face;
    draw: (s: Sketch) => void;
}
export declare const CHARACTERS: readonly CharacterDefinition[];
