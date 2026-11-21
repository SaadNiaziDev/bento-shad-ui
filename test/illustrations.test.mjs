import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { characters, isCharacterId, isMood, moods, renderCharacter } from '../dist/illustrations.js';
import { Empty, PencilCharacter } from '../dist/react.js';

const VOID = new Set(['circle', 'ellipse', 'line', 'path', 'rect', 'feTurbulence', 'feDisplacementMap', 'feColorMatrix', 'feComposite']);
function balanced(svg) {
  const stack = [];
  for (const m of svg.matchAll(/<(\/?)([a-zA-Z][\w-]*)\b[^>]*?(\/?)>/g)) {
    const [, closing, tag, self] = m;
    if (self) continue;
    if (!closing) stack.push(tag);
    else if (stack.pop() !== tag) return false;
  }
  return stack.length === 0 && !VOID.has('x');
}

test('the cast: 8 characters, 4 people and 4 animals, 6 moods', () => {
  assert.equal(characters.length, 8);
  assert.equal(new Set(characters.map((c) => c.id)).size, 8);
  assert.equal(characters.filter((c) => c.kind === 'person').length, 4);
  assert.equal(characters.filter((c) => c.kind === 'animal').length, 4);
  assert.deepEqual([...moods], ['neutral', 'happy', 'surprised', 'sad', 'thinking', 'sleepy']);
  for (const c of characters) {
    assert.ok(c.traits.length >= 3, `${c.id} needs at least 3 traits`);
    assert.ok(c.bestFor.length >= 1, `${c.id} needs suggested uses`);
  }
});

test('every character renders well-formed SVG in every mood', () => {
  for (const c of characters) {
    for (const mood of moods) {
      const svg = renderCharacter(c.id, mood, { idPrefix: 'x1' });
      assert.match(svg, /^<svg [^>]*viewBox="0 0 200 200"/, `${c.id}/${mood}`);
      assert.ok(balanced(svg), `${c.id}/${mood} has unbalanced tags`);
      assert.match(svg, new RegExp(`data-mood="${mood}"`));
      for (const m of svg.matchAll(/\sid="([^"]+)"/g)) assert.ok(m[1].startsWith('x1-'), `id ${m[1]} is not prefixed`);
      for (const m of svg.matchAll(/url\(#([^)]+)\)/g)) assert.ok(m[1].startsWith('x1-'), `reference ${m[1]} is not prefixed`);
    }
  }
});

test('moods change the drawing', () => {
  const variants = new Set(moods.map((m) => renderCharacter('pip', m, { idPrefix: 'p' })));
  assert.equal(variants.size, moods.length);
});

test('accessible name only when a title is given', () => {
  const named = renderCharacter('moss', 'sleepy', { title: 'Moss <loading>', idPrefix: 'm' });
  assert.match(named, /role="img" aria-labelledby="m-title"/);
  assert.match(named, /<title id="m-title">Moss &lt;loading&gt;<\/title>/);
  const decorative = renderCharacter('moss', 'sleepy');
  assert.match(decorative, /aria-hidden="true"/);
  assert.doesNotMatch(decorative, /<title/);
});

test('token colours by default, plain colours for static files', () => {
  assert.match(renderCharacter('mira'), /var\(--tint-sky/);
  assert.doesNotMatch(renderCharacter('mira', 'happy', { colors: 'static' }), /var\(/);
});

test('guards reject unknown names', () => {
  assert.equal(isCharacterId('pip'), true);
  assert.equal(isCharacterId('garfield'), false);
  assert.equal(isMood('sleepy'), true);
  assert.equal(isMood('angry'), false);
  assert.throws(() => renderCharacter('garfield'), /Unknown character/);
  assert.throws(() => renderCharacter('pip', 'angry'), /Unknown mood/);
});

test('48 static SVG files and a manifest ship in dist', () => {
  const manifest = JSON.parse(readFileSync(new URL('../dist/illustrations/index.json', import.meta.url), 'utf8'));
  assert.equal(manifest.files.length, 48);
  for (const f of manifest.files) {
    const file = new URL(`../dist/illustrations/${f}`, import.meta.url);
    assert.ok(existsSync(file), f);
    const svg = readFileSync(file, 'utf8');
    assert.doesNotMatch(svg, /var\(/, `${f} must not depend on CSS variables`);
    assert.match(svg, /width="200" height="200"/);
  }
});

test('React PencilCharacter and Empty illustration slot', () => {
  const out = renderToStaticMarkup(h(UIWrap));
  assert.match(out, /class="bk-illustration"/);
  assert.match(out, /--size:120px/);
  assert.match(out, /data-character="dumpling" data-mood="sad"/);
  assert.match(out, /role="img"/);
  assert.match(out, /class="bk-empty-illustration"/);
});

function UIWrap() {
  return h(Empty, {
    title: 'Something went wrong',
    illustration: h(PencilCharacter, { character: 'dumpling', mood: 'sad', size: 120, label: 'Dumpling the cat, sorry' }),
  });
}
