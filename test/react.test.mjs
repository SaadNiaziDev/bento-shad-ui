import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as UI from '../dist/react.js';

const html = (el) => renderToStaticMarkup(el);
const attr = (markup, name) => markup.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];

test('Button maps props to classes and attributes', () => {
  const out = html(h(UI.Button, { variant: 'outline', size: 'sm' }, 'Share'));
  assert.match(out, /^<button/);
  assert.match(out, /class="bk-button"/);
  assert.match(out, /data-variant="outline"/);
  assert.match(out, /data-size="sm"/);
  assert.match(out, /type="button"/);
  assert.doesNotMatch(html(h(UI.Button, null, 'Go')), /data-variant/);
});

test('Button loading disables it and shows a spinner', () => {
  const out = html(h(UI.Button, { loading: true }, 'Saving'));
  assert.match(out, /disabled=""/);
  assert.match(out, /aria-busy="true"/);
  assert.match(out, /bk-spinner/);
});

test('Button asChild renders the child element with button styles', () => {
  const out = html(h(UI.Button, { asChild: true, variant: 'link' }, h('a', { href: '/terms', className: 'x' }, 'Terms')));
  assert.match(out, /^<a /);
  assert.match(out, /href="\/terms"/);
  assert.match(out, /class="bk-button x"/);
  assert.match(out, /data-variant="link"/);
});

test('BentoGrid and Tile produce the grid structure', () => {
  const out = html(h(UI.BentoGrid, { cols: 2 }, h(UI.Tile, { span: 2, rows: 2, tone: 'peach', as: 'article' }, 'A')));
  assert.match(out, /^<div class="bk-bento"><div class="bk-bento-grid" data-cols="2">/);
  assert.match(out, /<article class="bk-tile bk-span-2 bk-row-2" data-tone="peach">A<\/article>/);
});

test('Field wires label, description, error and aria-invalid', () => {
  const out = html(h(UI.Field, { label: 'Email', description: 'Help', error: 'Wrong' }, h(UI.Input, { type: 'email' })));
  const id = attr(out, 'id');
  assert.ok(id);
  assert.equal(attr(out, 'for'), id);
  assert.equal(attr(out, 'aria-describedby'), `${id}-description ${id}-error`);
  assert.equal(attr(out, 'aria-invalid'), 'true');
  assert.match(out, /class="bk-field-error"/);
});

test('Tabs render the selected panel only', () => {
  const out = html(
    h(UI.Tabs, { defaultValue: 'week' },
      h(UI.TabsList, null, h(UI.TabsTrigger, { value: 'day' }, 'Day'), h(UI.TabsTrigger, { value: 'week' }, 'Week')),
      h(UI.TabsContent, { value: 'day' }, 'DAY-PANEL'),
      h(UI.TabsContent, { value: 'week' }, 'WEEK-PANEL'),
    ),
  );
  assert.match(out, /WEEK-PANEL/);
  assert.doesNotMatch(out, /DAY-PANEL/);
  assert.match(out, /aria-selected="true"[^>]*>Week/);
});

test('Dialog renders nothing inside while closed', () => {
  const out = html(h(UI.Dialog, { open: false, onOpenChange() {}, title: 'Secret title' }, 'Body'));
  assert.match(out, /^<dialog class="bk-dialog"/);
  assert.doesNotMatch(out, /Secret title/);
});

test('Calendar renders a 6-week grid', () => {
  const out = html(h(UI.Calendar, { defaultMonth: new Date(2026, 2, 1), today: null, locale: 'en-GB' }));
  assert.equal((out.match(/class="bk-calendar-day"/g) ?? []).length, 42);
  assert.match(out, /March 2026/);
});

test('getMonthGrid starts on Monday and pads with outside days', () => {
  const grid = UI.getMonthGrid(2026, 2, 1);
  assert.equal(grid.length, 42);
  assert.equal(grid[0].key, '2026-02-23');
  assert.equal(grid[0].outside, true);
  assert.equal(grid[6].key, '2026-03-01');
  assert.equal(grid[6].outside, false);
  assert.equal(grid[41].key, '2026-04-05');
  assert.equal(UI.getMonthGrid(2026, 2, 0)[0].key, '2026-03-01');
});

test('getPaginationRange keeps first, last and current pages', () => {
  assert.deepEqual(UI.getPaginationRange(1, 5), [1, 2, 3, 4, 5]);
  assert.deepEqual(UI.getPaginationRange(6, 20), [1, 'ellipsis', 5, 6, 7, 'ellipsis', 20]);
  assert.deepEqual(UI.getPaginationRange(1, 20), [1, 2, 3, 4, 5, 'ellipsis', 20]);
  assert.deepEqual(UI.getPaginationRange(20, 20), [1, 'ellipsis', 16, 17, 18, 19, 20]);
  assert.deepEqual(UI.getPaginationRange(3, 0), []);
});

test('chart helpers are to scale', () => {
  assert.deepEqual(UI.barHeights([{ label: 'a', value: 32 }, { label: 'b', value: 74 }], 80), [40, 92.5]);
  assert.deepEqual(UI.barHeights([{ label: 'a', value: 5 }, { label: 'b', value: 10 }]), [50, 100]);
  const pts = UI.sparklinePoints([12, 18, 15, 22, 19, 27, 31]);
  assert.deepEqual(pts[0], [0, 30]);
  assert.deepEqual(pts.at(-1), [100, 2]);
});

test('filterCommandGroups matches labels and keywords and drops empty groups', () => {
  const groups = [
    { heading: 'Trips', items: [{ id: 'l', label: 'Lisbon', keywords: ['portugal'] }, { id: 'm', label: 'Madrid' }] },
    { heading: 'Actions', items: [{ id: 'n', label: 'New trip' }] },
  ];
  assert.deepEqual(UI.filterCommandGroups(groups, 'portu').map((g) => g.items.map((i) => i.id)), [['l']]);
  assert.equal(UI.filterCommandGroups(groups, '').length, 2);
  assert.equal(UI.filterCommandGroups(groups, 'zzz').length, 0);
});

test('ThemeScript and Badge render', () => {
  assert.match(html(h(UI.ThemeScript)), /bk-theme/);
  assert.match(html(h(UI.Badge, { variant: 'success', dot: true }, 'Paid')), /data-variant="success" data-dot=""/);
});
