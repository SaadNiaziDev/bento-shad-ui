import { $$, emit, isManaged } from './dom';
import type { CalendarChangeDetail } from './types';

type Flagged<T extends Element> = T & { __bk?: Record<string, unknown> };

function once(el: Element, key: string): boolean {
  const flagged = el as Flagged<Element>;
  flagged.__bk ??= {};
  if (flagged.__bk[key]) return false;
  flagged.__bk[key] = true;
  return true;
}

/* ---------- Tabs: [data-bk-tabs] with role=tab buttons that point at panels via aria-controls ---------- */
export function initTabs(root: ParentNode): void {
  for (const wrapper of $$('[data-bk-tabs]', root)) {
    if (isManaged(wrapper) || !once(wrapper, 'tabs')) continue;
    const tabs = $$('[role="tab"]', wrapper).filter((t) => t.closest('[data-bk-tabs]') === wrapper);
    const select = (tab: HTMLElement, focus = false) => {
      for (const t of tabs) {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls') ?? '');
        if (panel) panel.hidden = !on;
      }
      if (focus) tab.focus();
      emit(wrapper, 'bk:change', { tab });
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', (e) => {
        const next =
          e.key === 'ArrowRight' ? tabs[(i + 1) % tabs.length] :
          e.key === 'ArrowLeft' ? tabs[(i - 1 + tabs.length) % tabs.length] :
          e.key === 'Home' ? tabs[0] :
          e.key === 'End' ? tabs[tabs.length - 1] : undefined;
        if (next) {
          e.preventDefault();
          select(next, true);
        }
      });
    });
    const current = tabs.find((t) => t.getAttribute('aria-selected') === 'true') ?? tabs[0];
    if (current) select(current);
  }
}

/* ---------- Command palette: .bk-command with .bk-command-input and .bk-command-item children ---------- */
function scrollIntoList(item: HTMLElement): void {
  const list = item.closest<HTMLElement>('.bk-command-list');
  if (!list) return;
  const top = item.offsetTop - list.offsetTop;
  const bottom = top + item.offsetHeight;
  if (top < list.scrollTop) list.scrollTop = top;
  else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
}

export function initCommand(root: ParentNode): void {
  for (const palette of $$('.bk-command', root)) {
    if (isManaged(palette) || !once(palette, 'command')) continue;
    const input = palette.querySelector<HTMLInputElement>('.bk-command-input');
    if (!input) continue;
    const items = () => $$('.bk-command-item', palette);
    const visible = () => items().filter((i) => !i.hidden);
    const setActive = (item: HTMLElement | undefined) => {
      for (const i of items()) i.setAttribute('aria-selected', String(i === item));
      if (item) scrollIntoList(item);
    };
    const filter = () => {
      const query = input.value.trim().toLowerCase();
      let first: HTMLElement | undefined;
      for (const item of items()) {
        const haystack = `${item.textContent ?? ''} ${item.getAttribute('data-keywords') ?? ''}`.toLowerCase();
        const match = !query || haystack.includes(query);
        item.hidden = !match;
        if (match && !first) first = item;
      }
      for (const group of $$('.bk-command-group', palette)) {
        group.hidden = !$$('.bk-command-item', group).some((i) => !i.hidden);
      }
      const empty = palette.querySelector<HTMLElement>('.bk-command-empty');
      if (empty) empty.hidden = !!first;
      setActive(first);
    };
    input.addEventListener('input', filter);
    input.addEventListener('keydown', (e) => {
      const list = visible();
      const current = list.findIndex((i) => i.getAttribute('aria-selected') === 'true');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive(list[Math.min(current + 1, list.length - 1)]);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(list[Math.max(current - 1, 0)]);
      } else if (e.key === 'Enter' && list[current]) {
        e.preventDefault();
        list[current]?.click();
      }
    });
    palette.addEventListener('mousemove', (e) => {
      const item = e.target instanceof Element ? e.target.closest<HTMLElement>('.bk-command-item') : null;
      if (item && item.getAttribute('aria-selected') !== 'true') setActive(item);
    });
    if (palette instanceof HTMLDialogElement) {
      palette.addEventListener('click', (e) => {
        if (e.target instanceof Element && e.target.closest('.bk-command-item')) palette.close();
      });
      palette.addEventListener('close', () => {
        input.value = '';
        filter();
      });
    }
    filter();
  }
}

/** Opens (or closes) a command dialog. Defaults to the first `dialog.bk-command[data-bk-hotkey]`. */
export function openCommand(dialog?: HTMLDialogElement | null): void {
  const target = dialog ?? document.querySelector<HTMLDialogElement>('dialog.bk-command[data-bk-hotkey]');
  if (!target) return;
  if (target.open) {
    target.close();
    return;
  }
  target.showModal();
  target.querySelector<HTMLInputElement>('.bk-command-input')?.focus();
}

/* ---------- Calendar: .bk-calendar[data-mode="single|range"] with .bk-calendar-day buttons ---------- */
type CalendarState = { start: number | null; end: number | null };
const calendarState = new WeakMap<Element, CalendarState>();

export function initCalendar(root: ParentNode): void {
  for (const cal of $$('.bk-calendar', root)) {
    if (isManaged(cal) || !once(cal, 'calendar')) continue;
    const state: CalendarState = { start: null, end: null };
    $$('.bk-calendar-day:not([data-outside])', cal).forEach((day, i) => {
      const range = day.getAttribute('data-range');
      if (range === 'start' || range === 'single') state.start = i;
      if (range === 'end' || range === 'single') state.end = i;
    });
    calendarState.set(cal, state);
  }
}

export function pickCalendarDay(button: HTMLElement): void {
  const cal = button.closest<HTMLElement>('.bk-calendar');
  if (!cal || isManaged(cal)) return;
  const days = $$('.bk-calendar-day:not([data-outside])', cal);
  const index = days.indexOf(button);
  if (index < 0) return;
  const dayNumber = (i: number) => Number(days[i]?.textContent?.trim() ?? 0);

  if (cal.getAttribute('data-mode') !== 'range') {
    for (const d of days) d.removeAttribute('aria-selected');
    button.setAttribute('aria-selected', 'true');
    emit<CalendarChangeDetail>(cal, 'bk:change', { start: dayNumber(index), end: dayNumber(index) });
    return;
  }

  const state = calendarState.get(cal) ?? { start: null, end: null };
  if (state.start === null || state.end !== null) {
    state.start = index;
    state.end = null;
  } else {
    state.end = index;
    if (state.end < state.start) [state.start, state.end] = [state.end, state.start];
  }
  calendarState.set(cal, state);
  const start = state.start;
  const end = state.end ?? state.start;
  days.forEach((d, j) => {
    d.removeAttribute('aria-selected');
    d.removeAttribute('data-range');
    if (j === start || j === end) d.setAttribute('aria-selected', 'true');
    if (j >= start && j <= end) d.setAttribute('data-range', start === end ? 'single' : j === start ? 'start' : j === end ? 'end' : 'middle');
  });
  emit<CalendarChangeDetail>(cal, 'bk:change', { start: dayNumber(start), end: dayNumber(end) });
}

/* ---------- Slider: keeps the --val fill and any <output for="id"> in sync ---------- */
export function fillSlider(range: HTMLInputElement): void {
  const min = Number(range.min || 0);
  const max = Number(range.max || 100);
  const value = Number(range.value);
  range.style.setProperty('--val', `${((value - min) / (max - min || 1)) * 100}%`);
  if (range.id) {
    for (const out of $$(`output[for~="${CSS.escape(range.id)}"]`)) {
      out.textContent = `${range.getAttribute('data-prefix') ?? ''}${range.value}${range.getAttribute('data-suffix') ?? ''}`;
    }
  }
}
