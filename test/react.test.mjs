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

const CITIES = [
  { value: 'lis', label: 'Lisbon', group: 'Portugal', keywords: ['portugal'] },
  { value: 'opo', label: 'Porto', group: 'Portugal' },
  { value: 'sao', label: 'São Paulo', group: 'Brazil', description: 'Largest city in Brazil' },
  { value: 'rio', label: 'Rio de Janeiro', group: 'Brazil', disabled: true },
];

test('Combobox renders an ARIA combobox with a manual popover listbox and grouped options', () => {
  const out = html(h(UI.Combobox, { options: CITIES, defaultValue: 'opo', name: 'city', placeholder: 'Choose a city', id: 'c1' }));
  assert.match(out, /role="combobox"/);
  assert.match(out, /aria-expanded="false"/);
  assert.match(out, /popover="manual"/);
  assert.match(out, /role="listbox"/);
  assert.equal(attr(out, 'value'), 'Porto');
  assert.match(out, /<input type="hidden" name="city" value="opo"\/>/);
  assert.equal((out.match(/role="group"/g) ?? []).length, 2);
  assert.match(out, /data-value="opo" aria-selected="true"/);
  assert.match(out, /data-value="rio" aria-selected="false" aria-disabled="true"/);
  assert.match(out, /bk-combobox-option-description">Largest city in Brazil/);
  assert.match(out, /data-bk-react=""/);
});

test('Combobox multiple renders chips, one hidden input per value and no placeholder', () => {
  const out = html(h(UI.Combobox, { multiple: true, options: CITIES, defaultValue: ['lis', 'sao'], name: 'cities', placeholder: 'Add cities', clearable: true }));
  assert.match(out, /data-multiple=""/);
  assert.match(out, /aria-multiselectable="true"/);
  assert.equal((out.match(/class="bk-chip"/g) ?? []).length, 2);
  assert.match(out, /aria-label="Remove São Paulo"/);
  assert.equal((out.match(/type="hidden" name="cities"/g) ?? []).length, 2);
  assert.doesNotMatch(out, /placeholder=/);
  assert.match(out, /class="bk-combobox-clear"/);
});

test('Combobox inside Field gets the id, description and invalid state on its input', () => {
  const out = html(h(UI.Field, { label: 'City', error: 'Pick a city', id: 'city' }, h(UI.Combobox, { options: CITIES })));
  assert.match(out, /<input id="city" class="bk-combobox-input"/);
  assert.match(out, /aria-describedby="city-error"/);
  assert.match(out, /aria-invalid="true"/);
});

test('filterComboboxOptions matches labels and keywords without accents', () => {
  assert.deepEqual(UI.filterComboboxOptions(CITIES, 'sao').map((o) => o.value), ['sao']);
  assert.deepEqual(UI.filterComboboxOptions(CITIES, 'portugal').map((o) => o.value), ['lis']);
  assert.equal(UI.filterComboboxOptions(CITIES, '').length, 4);
});

test('Tip draws a decorative character beside a note bubble', () => {
  const out = html(h(UI.Tip, { character: 'pip', mood: 'thinking', title: 'Try a country', tone: 'sky', side: 'end', onDismiss: () => {} }, 'Search “Portugal” to see every city.'));
  assert.match(out, /^<div role="note" class="bk-tip" data-side="end" data-tone="sky">/);
  assert.match(out, /class="bk-character"[^>]*aria-hidden="true"/);
  assert.match(out, /<p class="bk-tip-title">Try a country<\/p>/);
  assert.match(out, /aria-label="Dismiss"/);
  assert.doesNotMatch(html(h(UI.Tip, { character: 'pip' }, 'Hi')), /data-tone|data-side|bk-tip-close/);
});

test('TagsInput renders chips with named remove buttons, hidden inputs and a live region', () => {
  const out = html(h(UI.TagsInput, { defaultValue: ['Design', 'UX'], name: 'topics', placeholder: 'Add a topic', id: 't1' }));
  assert.match(out, /^<div class="bk-tags" data-has-value="" data-bk-react="">/);
  assert.equal((out.match(/class="bk-chip"/g) ?? []).length, 2);
  assert.match(out, /aria-label="Remove UX"/);
  assert.match(out, /<input id="t1" class="bk-tags-input"/);
  assert.doesNotMatch(out, /placeholder=/);
  assert.equal((out.match(/type="hidden" name="topics"/g) ?? []).length, 2);
  assert.match(out, /aria-live="polite"/);
  const empty = html(h(UI.Field, { label: 'Topics', required: true }, h(UI.TagsInput, { placeholder: 'Add a topic' })));
  assert.match(empty, /placeholder="Add a topic"/);
  assert.match(empty, /required=""/);
});

test('Calendar has one Tab stop: the selected day, else today, else the 1st', () => {
  const stops = (props) => [...html(h(UI.Calendar, props)).matchAll(/data-date="([\d-]+)"[^>]*tabindex="0"/g)].map((m) => m[1]);
  assert.deepEqual(stops({ defaultValue: new Date(2026, 2, 12), today: new Date(2026, 2, 3) }), ['2026-03-12']);
  assert.deepEqual(stops({ defaultMonth: new Date(2026, 2, 1), today: new Date(2026, 2, 3) }), ['2026-03-03']);
  assert.deepEqual(stops({ defaultMonth: new Date(2026, 4, 1), today: null }), ['2026-05-01']);
});

test('Calendar marks unavailable days aria-disabled so they stay reachable by arrow keys', () => {
  const out = html(h(UI.Calendar, { defaultMonth: new Date(2026, 2, 1), isDisabled: (d) => d.getDate() === 14 }));
  assert.match(out, /data-date="2026-03-14"[^>]*aria-disabled="true"/);
  assert.doesNotMatch(out, /data-date="2026-03-14"[^>]*disabled=""/);
  assert.match(out, /data-date="2026-02-23"[^>]*disabled=""/, 'outside days stay natively disabled');
});

test('formatDateValue writes single dates and ranges', () => {
  const opts = { dateStyle: 'medium' };
  assert.equal(UI.formatDateValue(null), '');
  assert.equal(UI.formatDateValue(new Date(2026, 2, 12), 'en-GB', opts), '12 Mar 2026');
  assert.equal(UI.formatDateValue({ from: new Date(2026, 2, 12) }, 'en-GB', opts), '12 Mar 2026 –');
  assert.match(UI.formatDateValue({ from: new Date(2026, 2, 12), to: new Date(2026, 2, 16) }, 'en-GB', opts), /^12\D+16 Mar 2026$/);
});

test('DatePicker renders a field-like button, a popover dialog and hidden ISO values', () => {
  const out = html(h(UI.DatePicker, { id: 'd1', defaultValue: new Date(2026, 2, 12), locale: 'en-GB', name: 'departure', clearable: true }));
  assert.match(out, /<button id="d1" type="button" class="bk-input bk-datepicker-trigger" aria-haspopup="dialog" aria-expanded="false"/);
  assert.match(out, /popovertarget="datepicker-/i);
  assert.match(out, />12 Mar 2026</);
  assert.match(out, /role="dialog" aria-label="Choose date" class="bk-popover bk-datepicker-panel"/);
  assert.match(out, /popover="auto"/);
  assert.match(out, /<input type="hidden" name="departure" value="2026-03-12"\/>/);
  assert.match(out, /aria-label="Clear date"/);
  const empty = html(h(UI.DatePicker, { placeholder: 'Pick dates', mode: 'range', name: 'trip', disabled: true, clearable: true }));
  assert.match(empty, /data-placeholder="">Pick dates</);
  assert.equal((empty.match(/name="trip"/g) ?? []).length, 1);
  assert.doesNotMatch(empty, /Clear date/);
  const range = html(h(UI.DatePicker, { mode: 'range', name: 'trip', defaultValue: { from: new Date(2026, 2, 12), to: new Date(2026, 2, 16) } }));
  assert.match(range, /name="trip" value="2026-03-12"\/><input type="hidden" name="trip" value="2026-03-16"/);
});

test('NumberInput renders a native number field between two named buttons', () => {
  const out = html(h(UI.NumberInput, { id: 'n1', defaultValue: 1, min: 1, max: 8, name: 'guests' }));
  assert.match(out, /^<div class="bk-number" data-bk-react="">/);
  assert.match(out, /data-direction="down" tabindex="-1" aria-label="Decrease" disabled=""/, '− is disabled at min');
  const input = out.match(/<input [^>]*>/)[0];
  for (const a of ['id="n1"', 'type="number"', 'class="bk-number-input"', 'inputMode="numeric"', 'value="1"', 'min="1"', 'max="8"', 'step="1"', 'name="guests"']) assert.ok(input.includes(a), a);
  assert.match(out, /data-direction="up" tabindex="-1" aria-label="Increase"><\/button>/);
  assert.match(html(h(UI.NumberInput, { step: 0.5 })), /inputMode="decimal"/);
});

test('Rating renders radios in a named fieldset, or a read-only image', () => {
  const out = html(h(UI.Rating, { defaultValue: 3, label: 'Rate your stay', name: 'stay' }));
  assert.match(out, /^<fieldset class="bk-rating" data-bk-react=""><legend class="bk-sr-only">Rate your stay<\/legend>/);
  assert.equal((out.match(/type="radio"/g) ?? []).length, 5);
  assert.match(out, /<input [^>]*checked=""[^>]*value="3"|<input [^>]*value="3"[^>]*checked=""/);
  assert.match(out, /<span class="bk-sr-only">1 star<\/span>/);
  const shown = html(h(UI.Rating, { readOnly: true, value: 4.5, label: 'Average rating' }));
  assert.match(shown, /role="img" aria-label="Average rating: 4.5 out of 5" style="--rating:4.5;--max:5"/);
});

test('Steps marks complete, current and upcoming steps', () => {
  const out = html(h(UI.Steps, { current: 1, steps: [{ title: 'Details' }, { title: 'Travellers', description: 'Names' }, { title: 'Payment' }] }));
  assert.match(out, /^<ol class="bk-steps">/);
  assert.match(out, /data-status="complete"><span class="bk-step-marker" aria-hidden="true"><\/span><span class="bk-step-text"><span class="bk-step-title"><span class="bk-sr-only">Completed: <\/span>Details/);
  assert.match(out, /data-status="current" aria-current="step"/);
  assert.match(out, /data-status="upcoming"/);
  assert.match(html(h(UI.Steps, { current: 0, steps: [{ title: 'A' }], orientation: 'vertical' })), /data-orientation="vertical"/);
});

test('Timeline and DataList render semantic lists', () => {
  const tl = html(h(UI.Timeline, null, h(UI.TimelineItem, { title: 'Booked', time: '2 Mar', dateTime: '2026-03-02', tone: 'success' }, 'Four nights')));
  assert.match(tl, /^<ol class="bk-timeline"><li class="bk-timeline-item" data-tone="success"><span class="bk-timeline-marker" aria-hidden="true"><\/span>/);
  assert.match(tl, /<time class="bk-timeline-time" dateTime="2026-03-02">2 Mar<\/time>/i);
  assert.match(tl, /<div class="bk-timeline-description">Four nights<\/div>/);
  const dl = html(h(UI.DataList, { orientation: 'vertical' }, h(UI.DataListItem, { label: 'Guest' }, 'Mira')));
  assert.equal(dl, '<dl class="bk-data-list" data-orientation="vertical"><div class="bk-data-list-item"><dt>Guest</dt><dd>Mira</dd></div></dl>');
});

test('LineChart renders lines, axis ticks, a hidden data table and a focusable plot', () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const out = html(h(UI.LineChart, {
    label: 'Bookings per month',
    labels: months,
    series: [{ label: 'Bookings', data: [820, 932, 901, 1290, 1330, 1520, 1710, 1650, null, 1380, 1210, 1460] }, { label: 'Cancellations', data: months.map(() => 40) }],
  }));
  assert.match(out, /^<figure class="bk-line-chart"/);
  assert.equal((out.match(/class="bk-line-chart-line"/g) ?? []).length, 2);
  assert.match(out, /d="M0 [\d.]+ L[^"]*M[^"]*"/, 'the null value splits the first line');
  assert.match(out, /stroke|--c:var\(--chart-1\)/);
  assert.match(out, /tabindex="0" role="group" aria-roledescription="chart" aria-label="Bookings per month\. Use the left and right arrow keys/i);
  for (const tick of ['0', '500', '1,000', '1,500', '2,000']) assert.ok(out.includes(`>${tick}</span>`), tick);
  const xLabels = [...out.matchAll(/class="bk-line-chart-x"[^]*?<\/div>/g)][0][0].match(/>([A-Z][a-z]{2})</g).map((m) => m.slice(1, -1));
  assert.deepEqual(xLabels, ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Dec']);
  assert.match(out, /<table class="bk-sr-only"><caption>Bookings per month<\/caption>/);
  assert.equal((out.match(/<th scope="row">/g) ?? []).length, 12);
  assert.match(out, /<th scope="row">Sep<\/th><td>No value<\/td>/);
  assert.match(out, /class="bk-legend"/);
  assert.doesNotMatch(html(h(UI.LineChart, { label: 'One', labels: ['a', 'b'], series: [{ label: 'A', data: [1, 2] }] })), /bk-legend/);
});

test('HoverCard links its trigger and a manual popover', () => {
  const out = html(h(UI.HoverCard, { trigger: h('a', { href: '/people/mira' }, 'Mira') }, 'Design lead'));
  const id = out.match(/data-bk-hovercard-for="([^"]+)"/)[1];
  assert.match(out, new RegExp(`id="${id}" popover="manual" class="bk-hovercard" data-align="start" data-bk-react="">Design lead`));
  assert.match(out, /^<a href="\/people\/mira"/);
});
