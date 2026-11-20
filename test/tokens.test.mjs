import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { contrast } from '../scripts/color.mjs';

const T = JSON.parse(readFileSync(new URL('../src/tokens.json', import.meta.url), 'utf8'));
const MODES = ['light', 'dark'];

test('light and dark define exactly the same colour tokens', () => {
  assert.deepEqual(Object.keys(T.color.dark).sort(), Object.keys(T.color.light).sort());
});

test('every colour is #rrggbb', () => {
  for (const mode of MODES) {
    for (const [name, value] of Object.entries(T.color[mode])) {
      assert.match(value, /^#[0-9a-f]{6}$/i, `${mode}.${name} = ${value}`);
    }
  }
});

test('no monospace font token', () => {
  assert.deepEqual(Object.keys(T.font).sort(), ['heading', 'sans']);
  assert.doesNotMatch(JSON.stringify(T), /mono/i);
});

// [foreground, background] pairs that carry text: WCAG AA 4.5:1
const TEXT = [
  ['foreground', 'background'],
  ['card-foreground', 'card'],
  ['popover-foreground', 'popover'],
  ['primary-foreground', 'primary'],
  ['secondary-foreground', 'secondary'],
  ['muted-foreground', 'background'],
  ['muted-foreground', 'card'],
  ['muted-foreground', 'muted'],
  ['accent-foreground', 'accent'],
  ['destructive-foreground', 'destructive'],
  ['destructive', 'card'],
  ['destructive', 'background'],
  ['brand-foreground', 'brand'],
  ['inverse-foreground', 'inverse'],
  ['success', 'card'],
  ['warning', 'card'],
  ['info', 'card'],
  ['sidebar-foreground', 'sidebar'],
  ['sidebar-primary-foreground', 'sidebar-primary'],
  ['sidebar-accent-foreground', 'sidebar-accent'],
  ['tint-peach-foreground', 'tint-peach'],
  ['tint-sky-foreground', 'tint-sky'],
  ['tint-mint-foreground', 'tint-mint'],
  ['tint-lilac-foreground', 'tint-lilac'],
  ['tint-butter-foreground', 'tint-butter'],
];

// Non-text UI that must be perceivable: control borders and focus rings, 3:1
const UI = [
  ['input', 'card'],
  ['input', 'background'],
  ['ring', 'card'],
  ['ring', 'background'],
  ['sidebar-ring', 'sidebar'],
];

for (const mode of MODES) {
  const c = T.color[mode];
  for (const [fg, bg] of TEXT) {
    test(`${mode}: ${fg} on ${bg} is at least 4.5:1`, () => {
      const ratio = contrast(c[fg], c[bg]);
      assert.ok(ratio >= 4.5, `${fg} ${c[fg]} on ${bg} ${c[bg]} is ${ratio.toFixed(2)}:1`);
    });
  }
  for (const [fg, bg] of UI) {
    test(`${mode}: ${fg} against ${bg} is at least 3:1`, () => {
      const ratio = contrast(c[fg], c[bg]);
      assert.ok(ratio >= 3, `${fg} ${c[fg]} against ${bg} ${c[bg]} is ${ratio.toFixed(2)}:1`);
    });
  }
}
