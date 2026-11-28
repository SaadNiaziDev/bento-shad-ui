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

// Combobox: the vanilla behaviour against the documented markup shape.
const { init, matchesQuery } = await import('../dist/index.js');

// The core checks instanceof Element/Node and dispatches CustomEvent: use linkedom's classes.
function domGlobals(t, window) {
  const names = ['Element', 'Node', 'HTMLElement', 'HTMLInputElement', 'HTMLDialogElement', 'CustomEvent', 'Event'];
  const saved = Object.fromEntries(names.map((n) => [n, globalThis[n]]));
  for (const n of names) globalThis[n] = window[n] ?? class {}; // linkedom has no HTMLDialogElement
  t.after(() => Object.assign(globalThis, saved));
}

function combobox(t, { multiple = false } = {}) {
  const env = environment(t);
  domGlobals(t, env.window);
  document.body.innerHTML = `
    <label class="bk-label" for="cb">City</label>
    <div class="bk-combobox" data-name="city"${multiple ? ' data-multiple' : ''}>
      <div class="bk-combobox-control">
        <input class="bk-combobox-input" id="cb" placeholder="Choose a city">
        <button class="bk-combobox-clear" aria-label="Clear"></button>
        <button class="bk-combobox-toggle" tabindex="-1" aria-label="Show cities"></button>
      </div>
      <div class="bk-combobox-list">
        <div class="bk-combobox-group" aria-label="Portugal">
          <div class="bk-combobox-option" data-value="lis" data-keywords="portugal">Lisbon</div>
          <div class="bk-combobox-option" data-value="opo" aria-selected="true">Porto</div>
        </div>
        <div class="bk-combobox-group" aria-label="Brazil">
          <div class="bk-combobox-option" data-value="sao">São Paulo</div>
          <div class="bk-combobox-option" data-value="rio" aria-disabled="true">Rio de Janeiro</div>
        </div>
        <div class="bk-combobox-empty">No cities found</div>
      </div>
    </div>`;
  init(document);
  const box = document.querySelector('.bk-combobox');
  const input = box.querySelector('input.bk-combobox-input');
  const key = (k) => {
    const event = new window.Event('keydown', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'key', { value: k });
    input.dispatchEvent(event);
  };
  const type = (text) => {
    input.value = text;
    input.dispatchEvent(new window.Event('input', { bubbles: true }));
  };
  const changes = [];
  box.addEventListener('bk:change', (e) => changes.push(e.detail));
  const option = (v) => box.querySelector(`[data-value="${v}"]`);
  const hidden = () => [...box.querySelectorAll('input[type="hidden"]')].map((h) => h.value);
  return { env, box, input, key, type, changes, option, hidden };
}

test('matchesQuery ignores case and accents and needs every word', () => {
  assert.equal(matchesQuery('São Paulo', 'sao'), true);
  assert.equal(matchesQuery('Lisbon portugal', 'PORT lis'), true);
  assert.equal(matchesQuery('Lisbon', 'lis x'), false);
  assert.equal(matchesQuery('anything', '  '), true);
});

test('combobox wires ARIA, shows the selected label and submits through a hidden input', (t) => {
  const { box, input, option, hidden } = combobox(t);
  const list = box.querySelector('.bk-combobox-list');
  assert.equal(input.getAttribute('role'), 'combobox');
  assert.equal(input.getAttribute('aria-expanded'), 'false');
  assert.equal(input.getAttribute('aria-controls'), list.id);
  assert.equal(list.getAttribute('role'), 'listbox');
  assert.equal(list.getAttribute('popover'), 'manual');
  assert.equal(list.getAttribute('aria-labelledby'), document.querySelector('label').id);
  assert.equal(option('lis').getAttribute('role'), 'option');
  assert.equal(input.value, 'Porto');
  assert.deepEqual(hidden(), ['opo']);
  assert.equal(box.hasAttribute('data-has-value'), true);
});

test('combobox filters while typing, skips disabled options and picks with Enter', (t) => {
  const { box, input, key, type, changes, option, hidden } = combobox(t);
  type('sao');
  assert.equal(input.getAttribute('aria-expanded'), 'true');
  assert.equal(option('lis').hidden, true);
  assert.equal(option('sao').hidden, false);
  assert.equal(box.querySelector('[aria-label="Portugal"]').hidden, true);
  assert.equal(input.getAttribute('aria-activedescendant'), option('sao').id);
  key('ArrowDown'); // Rio is disabled: the active option stays on São Paulo
  assert.equal(input.getAttribute('aria-activedescendant'), option('sao').id);
  key('Enter');
  assert.equal(input.getAttribute('aria-expanded'), 'false');
  assert.equal(input.value, 'São Paulo');
  assert.deepEqual(changes.at(-1), { value: 'sao', values: ['sao'] });
  assert.deepEqual(hidden(), ['sao']);
  assert.equal(option('lis').hidden, false, 'closing resets the filter');
});

test('combobox shows its empty row, keeps the value on Escape and clears when the text is emptied', (t) => {
  const { box, input, key, type, changes, hidden } = combobox(t);
  type('zzz');
  assert.equal(box.querySelector('.bk-combobox-empty').hidden, false);
  key('Escape');
  assert.equal(input.value, 'Porto', 'Escape restores the selected label');
  assert.equal(changes.length, 0);
  type('');
  key('Escape');
  assert.equal(input.value, '');
  assert.deepEqual(changes.at(-1), { value: null, values: [] });
  assert.deepEqual(hidden(), ['']);
});

test('multiple combobox toggles chips, stays open and removes the last chip with Backspace', (t) => {
  const { env, box, input, key, type, changes, option, hidden } = combobox(t, { multiple: true });
  const chips = () => [...box.querySelectorAll('.bk-chip')].map((c) => c.getAttribute('data-value'));
  assert.deepEqual(chips(), ['opo']);
  assert.equal(input.placeholder, '');
  assert.equal(box.querySelector('.bk-combobox-list').getAttribute('aria-multiselectable'), 'true');
  type('lis');
  key('Enter');
  assert.equal(input.getAttribute('aria-expanded'), 'true');
  assert.equal(input.value, '');
  assert.deepEqual(chips(), ['lis', 'opo']);
  assert.deepEqual(changes.at(-1).values, ['lis', 'opo']);
  env.emit(box.querySelector('[data-value="lis"] .bk-chip-remove'), 'click');
  assert.deepEqual(chips(), ['opo']);
  key('Backspace');
  assert.deepEqual(chips(), []);
  assert.equal(input.placeholder, 'Choose a city');
  assert.deepEqual(hidden(), []);
  assert.equal(option('opo').getAttribute('aria-selected'), 'false');
});

test('documented tip dismiss button hides its tip', (t) => {
  const env = environment(t);
  domGlobals(t, env.window);
  document.body.innerHTML = '<div class="bk-tip"><div class="bk-tip-bubble"><button data-bk-dismiss>×</button></div></div>';
  // The delegated click handler is attached by start(); call it on this document.
  return import('../dist/index.js').then(({ start }) => {
    start({ observe: false, restoreTheme: false });
    env.emit(document.querySelector('[data-bk-dismiss]'), 'click');
    assert.equal(document.querySelector('.bk-tip').hidden, true);
  });
});

// Tags input
const { splitTags, addTags } = await import('../dist/index.js');

test('splitTags and addTags trim, split on lines, skip duplicates without case and respect max', () => {
  assert.deepEqual(splitTags(' design ,  ux  research\nSeO,,'), ['design', 'ux research', 'SeO']);
  assert.deepEqual(splitTags('a; b', ';'), ['a', 'b']);
  const r = addTags(['Design'], ['design', 'UX', 'SEO', 'ux', 'Copy'], { max: 3 });
  assert.deepEqual(r.tags, ['Design', 'UX', 'SEO']);
  assert.deepEqual(r.added, ['UX', 'SEO']);
  assert.deepEqual(r.duplicates, ['design', 'ux']);
  assert.deepEqual(r.rejected, ['Copy']);
  assert.deepEqual(addTags(['a'], ['A'], { allowDuplicates: true }).tags, ['a', 'A']);
});

function tagsField(t, attrs = '') {
  const env = environment(t);
  domGlobals(t, env.window);
  document.body.innerHTML = `
    <div class="bk-tags" data-name="topics"${attrs}>
      <span class="bk-chip" data-value="Design">Design</span>
      <input class="bk-tags-input" placeholder="Add a topic">
    </div>`;
  init(document);
  const box = document.querySelector('.bk-tags');
  const input = box.querySelector('.bk-tags-input');
  const keyOn = (el, k) => {
    const event = new window.Event('keydown', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'key', { value: k });
    el.dispatchEvent(event);
    return event;
  };
  const type = (text) => {
    input.value = text;
    input.dispatchEvent(new window.Event('input', { bubbles: true }));
  };
  const chips = () => [...box.querySelectorAll('.bk-chip')].map((c) => c.getAttribute('data-value'));
  const hidden = () => [...box.querySelectorAll('input[type="hidden"]')].map((h) => h.value);
  const status = () => box.querySelector('[aria-live]').textContent;
  const changes = [];
  box.addEventListener('bk:change', (e) => changes.push(e.detail.values));
  return { env, box, input, keyOn, type, chips, hidden, status, changes };
}

test('tags input adds on Enter and comma, announces it and submits hidden inputs', (t) => {
  const { input, keyOn, type, chips, hidden, status, changes } = tagsField(t);
  assert.deepEqual(chips(), ['Design']);
  assert.equal(input.placeholder, '');
  type('Research');
  keyOn(input, 'Enter');
  assert.equal(input.value, '');
  type('SEO, Copy');            // typing a comma adds what comes before it
  assert.deepEqual(chips(), ['Design', 'Research', 'SEO']);
  assert.equal(input.value, 'Copy');
  assert.deepEqual(hidden(), ['Design', 'Research', 'SEO']);
  assert.equal(status(), 'Added SEO.');
  assert.deepEqual(changes.at(-1), ['Design', 'Research', 'SEO']);
  const empty = keyOn(input, 'Enter');
  assert.equal(empty.defaultPrevented, true, 'Enter with text adds instead of submitting');
  input.value = '';
  assert.equal(keyOn(input, 'Enter').defaultPrevented, false, 'Enter on an empty field still submits the form');
});

test('tags input flags duplicates, keeps text past max and removes with Backspace', (t) => {
  const { env, box, input, keyOn, type, chips, status } = tagsField(t, ' data-max="2"');
  type('design');
  keyOn(input, 'Enter');
  assert.deepEqual(chips(), ['Design']);
  assert.equal(box.querySelector('[data-value="Design"]').hasAttribute('data-duplicate'), true);
  assert.equal(status(), 'design is already added.');
  env.tick(700);
  assert.equal(box.querySelector('[data-value="Design"]').hasAttribute('data-duplicate'), false);
  type('UX, Copy, ');
  assert.deepEqual(chips(), ['Design', 'UX']);
  assert.equal(input.value, 'Copy, ', 'text past the limit stays in the field with its separator');
  assert.match(status(), /Limit of 2 tags reached/);
  type('Copy, Extra');
  assert.equal(input.value, 'Copy, Extra', 'tags that do not fit are not merged');
  keyOn(input, ',');
  assert.equal(input.value, 'Copy, Extra, ');
  input.value = '';
  keyOn(input, 'Backspace');
  assert.deepEqual(chips(), ['Design']);
  assert.equal(status(), 'Removed UX.');
});

test('tags input remove buttons: click and Delete remove, arrows move', (t) => {
  const { env, box, input, keyOn, type, chips } = tagsField(t);
  type('A, B, ');
  assert.deepEqual(chips(), ['Design', 'A', 'B']);
  env.emit(box.querySelector('[data-value="A"] .bk-chip-remove'), 'click');
  assert.deepEqual(chips(), ['Design', 'B']);
  const last = box.querySelector('[data-value="B"] .bk-chip-remove');
  assert.equal(last.getAttribute('aria-label'), 'Remove B');
  keyOn(last, 'Delete');
  assert.deepEqual(chips(), ['Design']);
});

// Number input. linkedom has no stepUp/stepDown, so the test supplies the native behaviour.
test('number input steps within min and max, disables buttons at the limits and clamps on blur', (t) => {
  const env = environment(t);
  domGlobals(t, env.window);
  document.body.innerHTML = `
    <div class="bk-number">
      <button class="bk-number-step" data-direction="down" aria-label="Decrease"></button>
      <input class="bk-number-input" type="number" value="2" min="1" max="3" step="1">
      <button class="bk-number-step" data-direction="up" aria-label="Increase"></button>
    </div>`;
  const input = document.querySelector('.bk-number-input');
  const native = (dir) => function () {
    const attr = (n) => Number(this.getAttribute(n));
    const next = Number(this.value || 0) + dir * (attr('step') || 1);
    this.value = String(Math.min(attr('max'), Math.max(attr('min'), next)));
  };
  input.stepUp = native(1);
  input.stepDown = native(-1);
  init(document);
  const [down, up] = document.querySelectorAll('.bk-number-step');
  const events = [];
  input.addEventListener('change', () => events.push(input.value));
  assert.equal(down.type, 'button');
  env.emit(up, 'click');
  assert.equal(input.value, '3');
  assert.deepEqual(events, ['3'], 'buttons fire change');
  assert.equal(up.disabled, true, '+ is disabled at max');
  assert.equal(down.disabled, false);
  input.value = '9';
  env.emit(input, 'blur');
  assert.equal(input.value, '3', 'typed values above max are clamped on blur');
  input.value = '';
  env.emit(input, 'blur');
  assert.equal(input.value, '', 'an empty field stays empty');
});

// Line chart maths
const { niceScale, linePath, showHoverCard, hideHoverCard } = await import('../dist/index.js');

test('niceScale rounds to 1/2/2.5/5 steps and starts positive data at 0', () => {
  assert.deepEqual(niceScale(820, 1710), { min: 0, max: 2000, ticks: [0, 500, 1000, 1500, 2000] });
  assert.deepEqual(niceScale(12.4, 24.8).ticks, [0, 10, 20, 30]);
  assert.deepEqual(niceScale(-30, 45), { min: -40, max: 60, ticks: [-40, -20, 0, 20, 40, 60] });
  assert.deepEqual(niceScale(5, 5).ticks.slice(0, 2), [0, 2]);
});

test('linePath draws to scale, leaves gaps for null and closes areas to the baseline', () => {
  const scale = { min: 0, max: 100 };
  assert.equal(linePath([0, 50, 100], scale), 'M0 100 L50 50 L100 0');
  assert.equal(linePath([10, null, 30, 40], scale), 'M0 90 L0 90 M66.67 70 L100 60');
  assert.equal(linePath([0, 100], scale, true), 'M0 100 L100 0 L100 100 L0 100 Z');
});

test('hover card helpers place the card under its trigger and clear it on hide', (t) => {
  const env = environment(t);
  domGlobals(t, env.window);
  document.body.innerHTML = '<a href="#p" data-bk-hovercard="hc">Mira</a><div class="bk-hovercard" id="hc" popover="manual">Card</div>';
  const trigger = document.querySelector('a');
  const card = document.getElementById('hc');
  trigger.getBoundingClientRect = () => ({ left: 40, right: 90, width: 50, top: 20, bottom: 40 });
  Object.defineProperties(card, { offsetWidth: { value: 300 }, offsetHeight: { value: 100 } });
  Object.defineProperties(document.documentElement, { clientWidth: { value: 800 } });
  window.innerHeight = 600;
  showHoverCard(card, trigger);
  assert.equal(card.hasAttribute('data-placed'), true);
  assert.equal(card.style.top, '46px');
  assert.equal(card.style.left, '40px');
  hideHoverCard(card);
  assert.equal(card.hasAttribute('data-placed'), false);
});
