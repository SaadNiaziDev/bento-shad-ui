import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseHTML } from 'linkedom';

// Import the browser branch; every test supplies an isolated document and clock.
const initial = parseHTML('<html><body></body></html>');
globalThis.window = initial.window;
globalThis.document = initial.document;
const { toast, placePopover } = await import('../dist/index.js');

function environment(t) {
  const { window, document } = parseHTML('<html><body></body></html>');
  globalThis.window = window;
  globalThis.document = document;
  let hidden = false;
  Object.defineProperty(document, 'hidden', { get: () => hidden });
  let now = 0, id = 0;
  const timers = new Map();
  const originals = { setTimeout, clearTimeout, performance };
  globalThis.setTimeout = (fn, delay) => { timers.set(++id, { fn, at: now + delay }); return id; };
  globalThis.clearTimeout = (key) => timers.delete(key);
  globalThis.performance = { now: () => now };
  t.after(() => Object.assign(globalThis, originals));
  const tick = (ms) => {
    const end = now + ms;
    while (true) {
      const next = [...timers].filter(([, timer]) => timer.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
      if (!next) break;
      now = next[1].at;
      timers.delete(next[0]);
      next[1].fn();
    }
    now = end;
  };
  const emit = (el, type, relatedTarget = null) => {
    const event = new window.Event(type, { bubbles: true });
    Object.defineProperty(event, 'relatedTarget', { value: relatedTarget });
    el.dispatchEvent(event);
  };
  return { window, document, tick, emit, timers, visibility(value) { hidden = value; emit(document, 'visibilitychange'); } };
}

test('toast preserves remaining reading time through overlapping hover, focus and hidden-tab pauses', (t) => {
  const env = environment(t);
  toast({ title: 'File moved', duration: 1000, action: { label: 'Undo' } });
  const el = document.querySelector('.bk-toast');
  env.tick(400);
  env.emit(el, 'mouseenter');
  env.tick(5000);
  env.emit(el, 'focusin');
  env.emit(el, 'mouseleave');
  env.tick(5000);
  assert.equal(el.hasAttribute('data-leaving'), false);
  env.visibility(true);
  env.emit(el, 'focusout');
  env.tick(5000);
  env.visibility(false);
  env.tick(599);
  assert.equal(el.hasAttribute('data-leaving'), false);
  env.tick(1);
  assert.equal(el.hasAttribute('data-leaving'), true);
  env.tick(190);
  assert.equal(el.isConnected, false);
});

test('persistent toast stays persistent after interaction and dismiss cleans up timers', (t) => {
  const env = environment(t);
  const dismiss = toast({ title: 'Connection lost', duration: Infinity });
  const el = document.querySelector('.bk-toast');
  env.emit(el, 'mouseenter');
  env.emit(el, 'mouseleave');
  env.emit(el, 'focusin');
  env.emit(el, 'focusout');
  env.visibility(true);
  env.visibility(false);
  env.tick(60000);
  assert.equal(el.hasAttribute('data-leaving'), false);
  dismiss();
  dismiss();
  env.tick(190);
  env.visibility(true);
  env.visibility(false);
  assert.equal(el.isConnected, false);
  assert.equal(env.timers.size, 0);
});

test('toast created in a hidden tab waits for visible reading time; actions fire once per click', (t) => {
  const env = environment(t);
  env.visibility(true);
  let actions = 0;
  toast({ title: 'Archived', duration: 1000, action: { label: 'Undo', onClick: () => actions++ } });
  const el = document.querySelector('.bk-toast');
  env.tick(5000);
  assert.equal(el.hasAttribute('data-leaving'), false);
  env.visibility(false);
  env.tick(999);
  env.emit(el.querySelector('[data-act]'), 'click');
  env.emit(el.querySelector('[data-act]'), 'click');
  assert.equal(actions, 1);
  assert.equal(el.hasAttribute('data-leaving'), true);
});

test('popover origin follows the trigger through alignment, horizontal clamping and vertical flipping', (t) => {
  environment(t);
  Object.defineProperties(document.documentElement, { clientWidth: { value: 320 } });
  window.innerHeight = 400;
  const popover = document.createElement('div');
  Object.defineProperties(popover, { offsetWidth: { value: 200 }, offsetHeight: { value: 100 } });
  const anchor = document.createElement('button');
  anchor.getBoundingClientRect = () => ({ left: 280, right: 312, width: 32, top: 350, bottom: 382 });
  placePopover(popover, anchor);
  assert.equal(popover.style.left, '112px');
  assert.equal(popover.style.top, '244px');
  assert.equal(popover.style.transformOrigin, '184px bottom');
  anchor.getBoundingClientRect = () => ({ left: 20, right: 60, width: 40, top: 20, bottom: 52 });
  placePopover(popover, anchor);
  assert.equal(popover.style.transformOrigin, '20px top');
  popover.setAttribute('data-align', 'end');
  placePopover(popover, anchor);
  assert.equal(popover.style.left, '8px');
  assert.equal(popover.style.transformOrigin, '32px top');
});

// Exercise the same handlers shown in the documentation against their own markup.
async function loadExample(env, file) {
  const { readFileSync } = await import('node:fs');
  const source = readFileSync(new URL(`../docs/components/${file}.md`, import.meta.url), 'utf8');
  document.body.innerHTML = [...source.matchAll(/```html preview[^\n]*\n([\s\S]*?)```/g)].map(m => m[1]).join('\n');
  window.BentoUI = { toast };
  return () => {
    for (const [, script] of source.matchAll(/```js demo\n([\s\S]*?)```/g)) {
      new Function('window', 'document', script)(window, document);
    }
  };
}

test('documented archive example removes a file and its Undo action restores it', async (t) => {
  const env = environment(t);
  const run = await loadExample(env, 'toast');
  run();
  env.emit(document.querySelector('[data-archive]'), 'click');
  assert.equal(document.querySelector('[data-file]').hidden, true);
  assert.match(document.querySelector('[data-archive-status]').textContent, /archived/);
  env.emit(document.querySelector('.bk-toast [data-act]'), 'click');
  assert.equal(document.querySelector('[data-file]').hidden, false);
  assert.match(document.querySelector('[data-archive-status]').textContent, /restored/);
});

test('documented validation example connects errors, focuses the control and recovers on a valid value', async (t) => {
  const env = environment(t);
  const run = await loadExample(env, 'field');
  const form = document.querySelector('#contact-example');
  const email = document.querySelector('#contact-email');
  // Linkedom does not implement browser constraint validation; supply its result.
  let valid = false, missing = true, focused = false;
  Object.defineProperty(form, 'elements', { value: { namedItem: () => email } });
  Object.defineProperty(email, 'validity', { get: () => ({ valid, valueMissing: missing }) });
  email.focus = () => { focused = true; };
  run();
  env.emit(form, 'submit');
  assert.equal(email.getAttribute('aria-invalid'), 'true');
  assert.match(email.getAttribute('aria-describedby'), /contact-email-error/);
  assert.equal(document.querySelector('#contact-email-error').hidden, false);
  assert.equal(focused, true);
  assert.match(document.querySelector('#contact-email-error').textContent, /Enter your work email/);
  missing = false;
  env.emit(form, 'submit');
  assert.match(document.querySelector('#contact-email-error').textContent, /complete email address/);
  valid = true;
  env.emit(form, 'submit');
  assert.equal(email.getAttribute('aria-invalid'), 'false');
  assert.equal(email.getAttribute('aria-describedby'), 'contact-email-help');
  assert.equal(document.querySelector('#contact-email-error').hidden, true);
  assert.match(document.querySelector('[data-contact-status]').textContent, /Nothing was sent/);
});
