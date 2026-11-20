import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);
const read = (p) => readFileSync(new URL(p, root), 'utf8');
const pkg = JSON.parse(read('package.json'));
const css = read('dist/bento.css');

test('every exported file exists', () => {
  for (const [subpath, target] of Object.entries(pkg.exports)) {
    const files = typeof target === 'string' ? [target] : Object.values(target);
    for (const file of files) assert.ok(existsSync(new URL(file, root)), `${subpath} → ${file} is missing`);
  }
  for (const file of ['dist/bento.iife.js', 'dist/bento.iife.min.js', 'r/bento-theme.json', 'r/bento-grid.json', 'r/registry.json', 'llms.txt', 'llms-full.txt']) {
    assert.ok(existsSync(new URL(file, root)), `${file} is missing`);
  }
});

test('no monospace font anywhere in the shipped styles, themes or kit', () => {
  for (const file of ['dist/bento.css', 'dist/tokens.css', 'dist/shadcn-theme.css', 'dist/flutter/bento_theme.dart', 'dist/tokens.json', 'index.html', 'src/css/components.css']) {
    assert.doesNotMatch(read(file), /font-mono|JetBrains|Courier|IBM Plex Mono|Red Hat Mono|\bmonospace\s*[;,}"'\)]/i, file);
  }
});

test('component CSS reads colours from tokens', () => {
  const src = read('src/css/components.css').replace(/\/\*[\s\S]*?\*\//g, '').replace(/url\("data:[^"]+"\)/g, '');
  const literals = [...src.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map((m) => m[0]).filter((h) => !/^#fff$/i.test(h) && !/^#000$/i.test(h));
  assert.deepEqual(literals, [], 'unexpected hex colours in components.css');
});

function classesIn(html) {
  const out = new Set();
  for (const m of html.matchAll(/class(?:Name)?="([^"]+)"/g)) {
    for (const c of m[1].split(/\s+/)) if (/^bk(-[a-z0-9-]+)?$/.test(c)) out.add(c);
  }
  return out;
}

test('every bk- class used in the docs and the kit exists in bento.css', () => {
  const sources = ['index.html', ...readdirSync(new URL('docs/', root)).map((f) => `docs/${f}`)];
  const missing = [];
  for (const file of sources) {
    for (const cls of classesIn(read(file))) {
      const re = new RegExp(`\\.${cls}(?![a-z0-9-])`);
      if (!re.test(css)) missing.push(`${file}: ${cls}`);
    }
  }
  assert.deepEqual(missing, []);
});

test('the core is safe to import on the server', async () => {
  const core = await import('../dist/index.js');
  assert.equal(core.version, pkg.version);
  assert.equal(core.getTheme(), 'system');
  assert.equal(typeof core.toast('server'), 'function');
  assert.doesNotThrow(() => core.start());
  assert.doesNotThrow(() => core.setTheme('dark'));
  assert.match(core.themeScript, /bk-theme/);
  for (const name of ['init', 'start', 'toast', 'setTheme', 'getTheme', 'resolveTheme', 'onThemeChange', 'placePopover', 'openCommand']) {
    assert.equal(typeof core[name], 'function', name);
  }
});

test('the React bundle is a client module that reuses the core', () => {
  const js = read('dist/react.js');
  assert.ok(js.startsWith('"use client";'), 'missing "use client" directive');
  assert.match(js, /from\s*["']\.\/index\.js["']/, 'react.js should import the core instead of bundling it');
  assert.doesNotMatch(js, /bk-toaster/, 'toast implementation was bundled twice');
});

test('the script-tag build exposes window.BentoUI', () => {
  assert.match(read('dist/bento.iife.js'), /var BentoUI\s*=/);
});

test('type declarations are emitted', () => {
  assert.match(read('dist/types/core/index.d.ts'), /export \{ toast \} from '\.\/toast'/);
  assert.match(read('dist/types/core/toast.d.ts'), /export declare function toast\(input: string \| ToastOptions\): DismissToast/);
  assert.match(read('dist/types/react/index.d.ts'), /export \* from '\.\/layout'/);
  assert.match(read('dist/types/react/actions.d.ts'), /ButtonProps/);
});

test('shadcn registry items are well formed', () => {
  const theme = JSON.parse(read('r/bento-theme.json'));
  const grid = JSON.parse(read('r/bento-grid.json'));
  const tokens = JSON.parse(read('src/tokens.json'));
  assert.equal(theme.type, 'registry:theme');
  assert.equal(Object.keys(theme.cssVars.dark).length, Object.keys(tokens.color.dark).length);
  for (const value of Object.values(theme.cssVars.dark)) assert.match(value, /^oklch\(/);
  assert.equal(grid.type, 'registry:ui');
  assert.ok(grid.files[0].content.includes('function BentoTile'));
  assert.ok(grid.registryDependencies[0].endsWith('/r/bento-theme.json'));
});

test('llms.txt follows the llmstxt.org shape and llms-full.txt holds every guide', () => {
  const index = read('llms.txt');
  assert.match(index, /^# bento-shad-ui\n\n> /);
  assert.match(index, /\n## Docs\n/);
  const full = read('llms-full.txt');
  for (const f of readdirSync(new URL('docs/', root))) assert.ok(full.includes(`<!-- docs/${f} -->`), `${f} missing from llms-full.txt`);
});
