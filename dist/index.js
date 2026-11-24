/*! bento-shad-ui v0.2.2 | MIT | https://github.com/SaadNiaziDev/bento-shad-ui */

// src/core/dom.ts
var isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
function $$(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}
function isManaged(el) {
  return !!el && !!el.closest("[data-bk-react]");
}
function closestFrom(target, selector) {
  return target instanceof Element ? target.closest(selector) : null;
}
var ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ESCAPES[c] ?? c);
}
function emit(target, name, detail) {
  target.dispatchEvent(new CustomEvent(name, { detail, bubbles: true }));
}
var ICON_PATHS = {
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  success: '<circle cx="12" cy="12" r="10"/><path d="m8.5 12.5 2.5 2.5 5-5.5"/>',
  destructive: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>'
};
function icon(name) {
  return `<svg class="bk-icon" viewBox="0 0 24 24" aria-hidden="true">${ICON_PATHS[name]}</svg>`;
}

// src/core/popover.ts
var SELECTOR = ".bk-menu[popover], .bk-popover[popover]";
function invokerFor(popover) {
  if (!popover.id) return null;
  return document.querySelector(`[popovertarget="${CSS.escape(popover.id)}"]`);
}
function placePopover(popover, anchor = invokerFor(popover)) {
  if (!isBrowser || !anchor) return;
  const rect = anchor.getBoundingClientRect();
  const width = popover.offsetWidth;
  const height = popover.offsetHeight;
  const gap = 6;
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight;
  const align = popover.getAttribute("data-align") ?? "start";
  let left = align === "end" ? rect.right - width : align === "center" ? rect.left + rect.width / 2 - width / 2 : rect.left;
  left = Math.max(8, Math.min(left, viewportWidth - width - 8));
  let top = rect.bottom + gap;
  if (top + height > viewportHeight - 8 && rect.top - gap - height > 8) top = rect.top - gap - height;
  const originX = Math.max(0, Math.min(width, rect.left + rect.width / 2 - left));
  popover.style.transformOrigin = `${Math.round(originX)}px ${top < rect.top ? "bottom" : "top"}`;
  popover.style.left = `${Math.round(left)}px`;
  popover.style.top = `${Math.round(top)}px`;
  popover.setAttribute("data-placed", "");
}
function openPopovers() {
  try {
    return $$(".bk-menu:popover-open, .bk-popover:popover-open");
  } catch {
    return [];
  }
}
var bound = false;
function enablePopoverPlacement() {
  if (!isBrowser || bound) return;
  bound = true;
  document.addEventListener(
    "toggle",
    (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !target.matches(SELECTOR)) return;
      if (event.newState === "open") placePopover(target);
      else target.removeAttribute("data-placed");
    },
    true
  );
  const reposition = () => openPopovers().forEach((p) => placePopover(p));
  window.addEventListener("resize", reposition);
  window.addEventListener("scroll", reposition, true);
}

// src/core/theme.ts
var THEME_STORAGE_KEY = "bk-theme";
var THEME_EVENT = "bk:theme";
var THEMES = ["light", "dark", "system"];
function isTheme(value) {
  return typeof value === "string" && THEMES.includes(value);
}
function systemPrefersDark() {
  return isBrowser && typeof window.matchMedia === "function" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function getTheme() {
  if (!isBrowser) return "system";
  const value = document.documentElement.getAttribute("data-theme");
  return isTheme(value) ? value : "system";
}
function resolveTheme(theme = getTheme()) {
  if (theme === "system") return systemPrefersDark() ? "dark" : "light";
  return theme;
}
function getStoredTheme() {
  if (!isBrowser) return null;
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
}
function setTheme(theme, options = {}) {
  if (!isBrowser || !isTheme(theme)) return;
  const root = document.documentElement;
  const resolved = resolveTheme(theme);
  root.setAttribute("data-theme", theme);
  root.classList.toggle("dark", resolved === "dark");
  if (options.persist !== false) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
    }
  }
  syncThemeButtons(theme);
  emit(document, THEME_EVENT, { theme, resolved });
}
function syncThemeButtons(theme = getTheme(), root = document) {
  if (!isBrowser) return;
  for (const button of $$("[data-bk-theme-set]", root)) {
    button.setAttribute("aria-pressed", String(button.getAttribute("data-bk-theme-set") === theme));
  }
}
function onThemeChange(listener) {
  if (!isBrowser) return () => {
  };
  const handler = (event) => listener(event.detail);
  document.addEventListener(THEME_EVENT, handler);
  return () => document.removeEventListener(THEME_EVENT, handler);
}
var themeScript = `(function(){try{var r=document.documentElement,t=null;try{t=localStorage.getItem('${THEME_STORAGE_KEY}')}catch(e){}if(t!=='light'&&t!=='dark'&&t!=='system')t=r.getAttribute('data-theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches);r.setAttribute('data-theme',t);r.classList.toggle('dark',d);}catch(e){}})();`;
var systemWatcherBound = false;
function watchSystemTheme() {
  if (!isBrowser || systemWatcherBound || typeof window.matchMedia !== "function") return;
  systemWatcherBound = true;
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (getTheme() === "system") setTheme("system", { persist: false });
  });
}

// src/core/toast.ts
var DEFAULT_DURATION = 4500;
function region() {
  let el = document.querySelector(".bk-toaster");
  if (!el) {
    el = document.createElement("section");
    el.className = "bk-toaster";
    el.setAttribute("aria-label", "Notifications");
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
  }
  return el;
}
function toast(input) {
  const options = typeof input === "string" ? { title: input } : input;
  if (!isBrowser) return () => {
  };
  const variant = options.variant ?? "default";
  const el = document.createElement("div");
  el.className = "bk-toast";
  el.setAttribute("data-variant", variant);
  el.setAttribute("role", variant === "destructive" ? "alert" : "status");
  el.innerHTML = `<span class="bk-toast-icon">${icon(variant === "success" ? "success" : variant === "destructive" ? "destructive" : "info")}</span><div class="bk-toast-title">${escapeHtml(options.title)}</div>` + (options.description ? `<div class="bk-toast-description">${escapeHtml(options.description)}</div>` : "") + '<div class="bk-toast-actions">' + (options.action ? `<button type="button" class="bk-button" data-variant="secondary" data-size="xs" data-act>${escapeHtml(options.action.label)}</button>` : "") + `<button type="button" class="bk-button" data-variant="ghost" data-size="icon-sm" aria-label="Dismiss" data-dismiss>${icon("x")}</button></div>`;
  region().appendChild(el);
  let timer;
  let remaining = options.duration ?? DEFAULT_DURATION;
  let startedAt = 0;
  let hovered = false;
  let focused = false;
  let leaving = false;
  const pause = () => {
    if (timer === void 0) return;
    clearTimeout(timer);
    timer = void 0;
    remaining = Math.max(0, remaining - (performance.now() - startedAt));
  };
  const dismiss = () => {
    if (leaving) return;
    leaving = true;
    pause();
    document.removeEventListener("visibilitychange", syncTimer);
    if (!el.isConnected) return;
    el.setAttribute("data-leaving", "");
    setTimeout(() => el.remove(), 190);
  };
  const syncTimer = () => {
    if (leaving) return;
    if (hovered || focused || document.hidden) {
      pause();
      return;
    }
    if (timer !== void 0 || !Number.isFinite(remaining)) return;
    startedAt = performance.now();
    timer = setTimeout(dismiss, Math.max(0, remaining));
  };
  el.querySelector("[data-dismiss]")?.addEventListener("click", dismiss);
  el.querySelector("[data-act]")?.addEventListener("click", () => {
    if (leaving) return;
    options.action?.onClick?.();
    dismiss();
  });
  el.addEventListener("mouseenter", () => {
    hovered = true;
    syncTimer();
  });
  el.addEventListener("mouseleave", () => {
    hovered = false;
    syncTimer();
  });
  el.addEventListener("focusin", () => {
    focused = true;
    syncTimer();
  });
  el.addEventListener("focusout", (event) => {
    focused = el.contains(event.relatedTarget);
    syncTimer();
  });
  document.addEventListener("visibilitychange", syncTimer);
  syncTimer();
  return dismiss;
}

// src/core/widgets.ts
function once(el, key) {
  const flagged = el;
  flagged.__bk ?? (flagged.__bk = {});
  if (flagged.__bk[key]) return false;
  flagged.__bk[key] = true;
  return true;
}
function initTabs(root) {
  for (const wrapper of $$("[data-bk-tabs]", root)) {
    if (isManaged(wrapper) || !once(wrapper, "tabs")) continue;
    const tabs = $$('[role="tab"]', wrapper).filter((t) => t.closest("[data-bk-tabs]") === wrapper);
    const select = (tab, focus = false) => {
      for (const t of tabs) {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute("aria-controls") ?? "");
        if (panel) panel.hidden = !on;
      }
      if (focus) tab.focus();
      emit(wrapper, "bk:change", { tab });
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (e) => {
        const next = e.key === "ArrowRight" ? tabs[(i + 1) % tabs.length] : e.key === "ArrowLeft" ? tabs[(i - 1 + tabs.length) % tabs.length] : e.key === "Home" ? tabs[0] : e.key === "End" ? tabs[tabs.length - 1] : void 0;
        if (next) {
          e.preventDefault();
          select(next, true);
        }
      });
    });
    const current = tabs.find((t) => t.getAttribute("aria-selected") === "true") ?? tabs[0];
    if (current) select(current);
  }
}
function scrollIntoList(item) {
  const list = item.closest(".bk-command-list");
  if (!list) return;
  const top = item.offsetTop - list.offsetTop;
  const bottom = top + item.offsetHeight;
  if (top < list.scrollTop) list.scrollTop = top;
  else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
}
function initCommand(root) {
  for (const palette of $$(".bk-command", root)) {
    if (isManaged(palette) || !once(palette, "command")) continue;
    const input = palette.querySelector(".bk-command-input");
    if (!input) continue;
    const items = () => $$(".bk-command-item", palette);
    const visible = () => items().filter((i) => !i.hidden);
    const setActive = (item) => {
      for (const i of items()) i.setAttribute("aria-selected", String(i === item));
      if (item) scrollIntoList(item);
    };
    const filter = () => {
      const query = input.value.trim().toLowerCase();
      let first;
      for (const item of items()) {
        const haystack = `${item.textContent ?? ""} ${item.getAttribute("data-keywords") ?? ""}`.toLowerCase();
        const match = !query || haystack.includes(query);
        item.hidden = !match;
        if (match && !first) first = item;
      }
      for (const group of $$(".bk-command-group", palette)) {
        group.hidden = !$$(".bk-command-item", group).some((i) => !i.hidden);
      }
      const empty = palette.querySelector(".bk-command-empty");
      if (empty) empty.hidden = !!first;
      setActive(first);
    };
    input.addEventListener("input", filter);
    input.addEventListener("keydown", (e) => {
      const list = visible();
      const current = list.findIndex((i) => i.getAttribute("aria-selected") === "true");
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive(list[Math.min(current + 1, list.length - 1)]);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive(list[Math.max(current - 1, 0)]);
      } else if (e.key === "Enter" && list[current]) {
        e.preventDefault();
        list[current]?.click();
      }
    });
    palette.addEventListener("mousemove", (e) => {
      const item = e.target instanceof Element ? e.target.closest(".bk-command-item") : null;
      if (item && item.getAttribute("aria-selected") !== "true") setActive(item);
    });
    if (palette instanceof HTMLDialogElement) {
      palette.addEventListener("click", (e) => {
        if (e.target instanceof Element && e.target.closest(".bk-command-item")) palette.close();
      });
      palette.addEventListener("close", () => {
        input.value = "";
        filter();
      });
    }
    filter();
  }
}
function openCommand(dialog) {
  const target = dialog ?? document.querySelector("dialog.bk-command[data-bk-hotkey]");
  if (!target) return;
  if (target.open) {
    target.close();
    return;
  }
  target.showModal();
  target.querySelector(".bk-command-input")?.focus();
}
var calendarState = /* @__PURE__ */ new WeakMap();
function initCalendar(root) {
  for (const cal of $$(".bk-calendar", root)) {
    if (isManaged(cal) || !once(cal, "calendar")) continue;
    const state = { start: null, end: null };
    $$(".bk-calendar-day:not([data-outside])", cal).forEach((day, i) => {
      const range = day.getAttribute("data-range");
      if (range === "start" || range === "single") state.start = i;
      if (range === "end" || range === "single") state.end = i;
    });
    calendarState.set(cal, state);
  }
}
function pickCalendarDay(button) {
  const cal = button.closest(".bk-calendar");
  if (!cal || isManaged(cal)) return;
  const days = $$(".bk-calendar-day:not([data-outside])", cal);
  const index = days.indexOf(button);
  if (index < 0) return;
  const dayNumber = (i) => Number(days[i]?.textContent?.trim() ?? 0);
  if (cal.getAttribute("data-mode") !== "range") {
    for (const d of days) d.removeAttribute("aria-selected");
    button.setAttribute("aria-selected", "true");
    emit(cal, "bk:change", { start: dayNumber(index), end: dayNumber(index) });
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
  const start2 = state.start;
  const end = state.end ?? state.start;
  days.forEach((d, j) => {
    d.removeAttribute("aria-selected");
    d.removeAttribute("data-range");
    if (j === start2 || j === end) d.setAttribute("aria-selected", "true");
    if (j >= start2 && j <= end) d.setAttribute("data-range", start2 === end ? "single" : j === start2 ? "start" : j === end ? "end" : "middle");
  });
  emit(cal, "bk:change", { start: dayNumber(start2), end: dayNumber(end) });
}
function fillSlider(range) {
  const min = Number(range.min || 0);
  const max = Number(range.max || 100);
  const value = Number(range.value);
  range.style.setProperty("--val", `${(value - min) / (max - min || 1) * 100}%`);
  if (range.id) {
    for (const out of $$(`output[for~="${CSS.escape(range.id)}"]`)) {
      out.textContent = `${range.getAttribute("data-prefix") ?? ""}${range.value}${range.getAttribute("data-suffix") ?? ""}`;
    }
  }
}

// src/core/index.ts
var version = "0.2.2";
function init(root = isBrowser ? document : void 0) {
  if (!isBrowser || !root) return;
  initTabs(root);
  initCommand(root);
  initCalendar(root);
  for (const range of $$(".bk-slider", root)) if (!isManaged(range)) fillSlider(range);
  for (const box of $$(".bk-checkbox[data-indeterminate]", root)) box.indeterminate = true;
  syncThemeButtons(getTheme(), root);
}
function onClick(event) {
  const target = event.target;
  let el;
  if (el = closestFrom(target, "[data-bk-theme-set]")) {
    const value = el.getAttribute("data-bk-theme-set");
    if (value === "light" || value === "dark" || value === "system") setTheme(value);
    return;
  }
  if (el = closestFrom(target, "[data-bk-open]")) {
    const dialog = document.getElementById(el.getAttribute("data-bk-open") ?? "");
    if (dialog instanceof HTMLDialogElement && !dialog.open) {
      dialog.showModal();
      dialog.querySelector("[autofocus], .bk-command-input")?.focus();
    }
    return;
  }
  if (el = closestFrom(target, "[data-bk-close]")) {
    el.closest("dialog")?.close(el.getAttribute("data-bk-close") ?? "");
  }
  if (target instanceof HTMLDialogElement && target.matches(".bk-dialog, .bk-sheet, .bk-command") && !isManaged(target)) {
    const r = target.getBoundingClientRect();
    const outside = event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
    if (outside) target.close();
  }
  if (el = closestFrom(target, "[data-bk-toast]")) {
    const raw = el.getAttribute("data-bk-toast") ?? "";
    let options;
    try {
      options = JSON.parse(raw);
    } catch {
      options = { title: raw };
    }
    toast(options);
  }
  if ((el = closestFrom(target, ".bk-menu-item")) && !isManaged(el)) {
    if (el.getAttribute("role") === "menuitemcheckbox") {
      el.setAttribute("aria-checked", String(el.getAttribute("aria-checked") !== "true"));
    } else if (!el.hasAttribute("data-keep-open")) {
      const popover = el.closest("[popover]");
      if (popover && typeof popover.hidePopover === "function") popover.hidePopover();
    }
  }
  if ((el = closestFrom(target, ".bk-toggle")) && !isManaged(el) && !el.hasAttribute("data-bk-theme-set")) {
    const group = el.closest(".bk-toggle-group");
    if (group?.getAttribute("data-type") === "single") {
      for (const b of $$(".bk-toggle", group)) b.setAttribute("aria-pressed", String(b === el));
    } else {
      el.setAttribute("aria-pressed", String(el.getAttribute("aria-pressed") !== "true"));
    }
  }
  if ((el = closestFrom(target, ".bk-calendar-day")) && !isManaged(el)) pickCalendarDay(el);
  if (el = closestFrom(target, "[data-bk-copy]")) {
    const selector = el.getAttribute("data-bk-copy-target");
    const text = selector ? document.querySelector(selector)?.textContent ?? "" : el.getAttribute("data-bk-copy") ?? "";
    navigator.clipboard?.writeText(text).then(
      () => toast({ title: "Copied to clipboard", variant: "success" }),
      () => toast({ title: "Copy failed. Select the text and copy it manually.", variant: "destructive" })
    );
  }
}
function otpInputs(input) {
  const group = input.closest(".bk-otp");
  return group ? $$("input", group) : [];
}
function onInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || isManaged(target)) return;
  if (target.matches(".bk-slider")) fillSlider(target);
  if (target.matches(".bk-otp input")) {
    target.value = target.value.replace(/\D/g, "").slice(-1);
    if (target.value) {
      const all = otpInputs(target);
      all[all.indexOf(target) + 1]?.focus();
    }
  }
}
function onKeydown(event) {
  const target = event.target;
  if (target instanceof HTMLInputElement && target.matches(".bk-otp input") && !isManaged(target) && event.key === "Backspace" && !target.value) {
    const all = otpInputs(target);
    const previous = all[all.indexOf(target) - 1];
    if (previous) {
      event.preventDefault();
      previous.value = "";
      previous.focus();
    }
  }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k" && document.querySelector("dialog.bk-command[data-bk-hotkey]")) {
    event.preventDefault();
    openCommand();
  }
}
function onPaste(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || !target.matches(".bk-otp input") || isManaged(target)) return;
  const digits = (event.clipboardData?.getData("text") ?? "").replace(/\D/g, "");
  if (!digits) return;
  event.preventDefault();
  const all = otpInputs(target);
  const start2 = all.indexOf(target);
  [...digits].forEach((d, i) => {
    const input = all[start2 + i];
    if (input) input.value = d;
  });
  all[Math.min(start2 + digits.length, all.length - 1)]?.focus();
}
function onDrag(event) {
  const zone = closestFrom(event.target, ".bk-dropzone");
  if (!zone || isManaged(zone)) return;
  if (event.type === "dragenter" || event.type === "dragover") zone.setAttribute("data-dragover", "");
  else zone.removeAttribute("data-dragover");
}
function onChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || !target.matches('.bk-dropzone input[type="file"]') || isManaged(target)) return;
  const out = target.closest(".bk-dropzone")?.querySelector(".bk-dropzone-files");
  if (out) out.textContent = Array.from(target.files ?? [], (f) => f.name).join(", ");
}
var started = false;
function start(options = {}) {
  if (!isBrowser || started) return;
  started = true;
  const { observe = true, restoreTheme = true } = options;
  document.addEventListener("click", onClick);
  document.addEventListener("input", onInput);
  document.addEventListener("keydown", onKeydown);
  document.addEventListener("paste", onPaste);
  document.addEventListener("change", onChange);
  for (const type of ["dragenter", "dragover", "dragleave", "drop"]) document.addEventListener(type, onDrag);
  enablePopoverPlacement();
  watchSystemTheme();
  if (restoreTheme) setTheme(getStoredTheme() ?? getTheme(), { persist: false });
  const ready = () => {
    init(document);
    if (observe && typeof MutationObserver !== "undefined") {
      new MutationObserver((records) => {
        for (const record of records) {
          record.addedNodes.forEach((node) => {
            if (node instanceof Element) init(node.parentElement ?? node);
          });
        }
      }).observe(document.body, { childList: true, subtree: true });
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready, { once: true });
  else ready();
}
export {
  THEME_EVENT,
  THEME_STORAGE_KEY,
  enablePopoverPlacement,
  fillSlider,
  getStoredTheme,
  getTheme,
  init,
  isTheme,
  onThemeChange,
  openCommand,
  placePopover,
  resolveTheme,
  setTheme,
  start,
  themeScript,
  toast,
  version
};
