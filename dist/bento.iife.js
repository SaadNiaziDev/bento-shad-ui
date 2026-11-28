/*! bento-shad-ui v0.2.2 | MIT | https://github.com/SaadNiaziDev/bento-shad-ui */
"use strict";
var BentoUI = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/core/browser.ts
  var browser_exports = {};
  __export(browser_exports, {
    HOVERCARD_CLOSE_DELAY: () => HOVERCARD_CLOSE_DELAY,
    HOVERCARD_OPEN_DELAY: () => HOVERCARD_OPEN_DELAY,
    THEME_EVENT: () => THEME_EVENT,
    THEME_STORAGE_KEY: () => THEME_STORAGE_KEY,
    addTags: () => addTags,
    clampNumber: () => clampNumber,
    describeTagChange: () => describeTagChange,
    enableHoverCards: () => enableHoverCards,
    enablePopoverPlacement: () => enablePopoverPlacement,
    fillSlider: () => fillSlider,
    foldText: () => foldText,
    getStoredTheme: () => getStoredTheme,
    getTheme: () => getTheme,
    hideHoverCard: () => hideHoverCard,
    hideListbox: () => hideListbox,
    init: () => init,
    isTheme: () => isTheme,
    linePath: () => linePath,
    matchesQuery: () => matchesQuery,
    niceScale: () => niceScale,
    onThemeChange: () => onThemeChange,
    openCommand: () => openCommand,
    placePopover: () => placePopover,
    resolveTheme: () => resolveTheme,
    setTheme: () => setTheme,
    showHoverCard: () => showHoverCard,
    showListbox: () => showListbox,
    splitTags: () => splitTags,
    start: () => start,
    stepNumberInput: () => stepNumberInput,
    themeScript: () => themeScript,
    toast: () => toast,
    version: () => version
  });

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
  var SELECTOR = ".bk-menu[popover], .bk-popover[popover], .bk-combobox-list[popover]";
  function invokerFor(popover) {
    const combobox = popover.closest(".bk-combobox");
    if (combobox) return combobox.querySelector(".bk-combobox-control, .bk-combobox-input");
    if (!popover.id) return null;
    const id = CSS.escape(popover.id);
    if (popover.classList.contains("bk-hovercard")) {
      return document.querySelector(`[data-bk-hovercard="${id}"], [data-bk-hovercard-for="${id}"]`);
    }
    return document.querySelector(`[popovertarget="${id}"]`);
  }
  function placePopover(popover, anchor = invokerFor(popover)) {
    if (!isBrowser || !anchor) return;
    const rect = anchor.getBoundingClientRect();
    popover.style.setProperty("--anchor-width", `${Math.round(rect.width)}px`);
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
      return $$(".bk-menu:popover-open, .bk-popover:popover-open, .bk-combobox-list:popover-open, .bk-hovercard:popover-open");
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

  // src/core/combobox.ts
  function foldText(text) {
    return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  function matchesQuery(text, query) {
    const haystack = foldText(text);
    return foldText(query).split(/\s+/).filter(Boolean).every((word) => haystack.includes(word));
  }
  function popoverOpen(el) {
    try {
      return el.matches(":popover-open");
    } catch {
      return false;
    }
  }
  function showListbox(list, anchor) {
    if (typeof list.showPopover === "function" && !popoverOpen(list)) {
      try {
        list.showPopover();
      } catch {
      }
    }
    placePopover(list, anchor);
  }
  function hideListbox(list) {
    if (typeof list.hidePopover === "function" && popoverOpen(list)) {
      try {
        list.hidePopover();
      } catch {
      }
    }
    list.removeAttribute("data-placed");
  }
  var uid = 0;
  var nextId = (prefix) => `bk-${prefix}-${++uid}`;
  var escapeId = (id) => typeof CSS !== "undefined" && CSS.escape ? CSS.escape(id) : id.replace(/"/g, '\\"');
  function initCombobox(root, once2) {
    for (const box of $$(".bk-combobox", root)) {
      if (isManaged(box) || !once2(box, "combobox")) continue;
      const input = box.querySelector(".bk-combobox-input");
      const list = box.querySelector(".bk-combobox-list");
      if (!input || !list) continue;
      const control = box.querySelector(".bk-combobox-control") ?? input;
      const clear = box.querySelector(".bk-combobox-clear");
      const multiple = box.hasAttribute("data-multiple");
      const placeholder = input.placeholder;
      let typed = false;
      list.id || (list.id = nextId("listbox"));
      list.setAttribute("role", "listbox");
      if (!list.hasAttribute("popover")) list.setAttribute("popover", "manual");
      if (multiple) list.setAttribute("aria-multiselectable", "true");
      input.setAttribute("role", "combobox");
      input.setAttribute("aria-autocomplete", "list");
      input.setAttribute("aria-expanded", "false");
      input.setAttribute("aria-controls", list.id);
      input.setAttribute("autocomplete", "off");
      if (input.id && !list.hasAttribute("aria-label") && !list.hasAttribute("aria-labelledby")) {
        const label = document.querySelector(`label[for="${escapeId(input.id)}"]`);
        if (label) {
          label.id || (label.id = nextId("label"));
          list.setAttribute("aria-labelledby", label.id);
        }
      }
      const options = () => $$(".bk-combobox-option", list);
      for (const option of options()) {
        option.setAttribute("role", "option");
        option.id || (option.id = nextId("option"));
        if (!option.hasAttribute("aria-selected")) option.setAttribute("aria-selected", "false");
      }
      for (const group of $$(".bk-combobox-group", list)) group.setAttribute("role", "group");
      const labelOf = (o) => o.getAttribute("data-label") ?? o.textContent?.trim() ?? "";
      const valueOf = (o) => o.getAttribute("data-value") ?? labelOf(o);
      const selected = () => options().filter((o) => o.getAttribute("aria-selected") === "true");
      const enabled = () => options().filter((o) => !o.hidden && o.getAttribute("aria-disabled") !== "true");
      const active = () => options().find((o) => o.hasAttribute("data-active"));
      const isOpen = () => input.getAttribute("aria-expanded") === "true";
      const setActive = (option) => {
        for (const o of options()) {
          if (o === option) o.setAttribute("data-active", "");
          else o.removeAttribute("data-active");
        }
        if (!option) {
          input.removeAttribute("aria-activedescendant");
          return;
        }
        input.setAttribute("aria-activedescendant", option.id);
        const top = option.offsetTop;
        const bottom = top + option.offsetHeight;
        if (top < list.scrollTop) list.scrollTop = top;
        else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
      };
      const filter = (query) => {
        let any = false;
        for (const o of options()) {
          const match = matchesQuery(`${labelOf(o)} ${o.getAttribute("data-keywords") ?? ""}`, query);
          o.hidden = !match;
          any || (any = match);
        }
        for (const group of $$(".bk-combobox-group", list)) group.hidden = !$$(".bk-combobox-option", group).some((o) => !o.hidden);
        const empty = list.querySelector(".bk-combobox-empty");
        if (empty) empty.hidden = any;
      };
      const render = () => {
        const chosen = selected();
        if (multiple) {
          for (const chip of $$(".bk-chip", control)) chip.remove();
          for (const o of chosen) {
            const chip = document.createElement("span");
            chip.className = "bk-chip";
            chip.setAttribute("data-value", valueOf(o));
            chip.textContent = labelOf(o);
            const remove = document.createElement("button");
            remove.type = "button";
            remove.className = "bk-chip-remove";
            remove.tabIndex = -1;
            remove.setAttribute("aria-label", `Remove ${labelOf(o)}`);
            chip.append(remove);
            control.insertBefore(chip, input);
          }
          input.placeholder = chosen.length ? "" : placeholder;
        } else if (!typed) {
          input.value = chosen[0] ? labelOf(chosen[0]) : "";
        }
        const name = box.getAttribute("data-name");
        if (name) {
          for (const hidden of $$("input[data-bk-combobox-value]", box)) hidden.remove();
          const values = chosen.length ? chosen.map(valueOf) : multiple ? [] : [""];
          for (const value of values) {
            const hidden = document.createElement("input");
            hidden.type = "hidden";
            hidden.name = name;
            hidden.value = value;
            hidden.setAttribute("data-bk-combobox-value", "");
            box.append(hidden);
          }
        }
        if (chosen.length) box.setAttribute("data-has-value", "");
        else box.removeAttribute("data-has-value");
      };
      const changed = () => {
        render();
        const values = selected().map(valueOf);
        emit(box, "bk:change", { value: values[0] ?? null, values });
      };
      const open = () => {
        if (isOpen() || input.disabled || input.readOnly) return;
        input.setAttribute("aria-expanded", "true");
        box.setAttribute("data-open", "");
        showListbox(list, control);
        const first = selected().find((o) => !o.hidden);
        setActive(first ?? enabled()[0]);
      };
      const close = () => {
        if (!isOpen()) return;
        input.setAttribute("aria-expanded", "false");
        box.removeAttribute("data-open");
        hideListbox(list);
        setActive(void 0);
        const cleared = !multiple && typed && !input.value.trim() && selected().length > 0;
        typed = false;
        if (multiple) input.value = "";
        filter("");
        if (cleared) {
          for (const o of options()) o.setAttribute("aria-selected", "false");
          changed();
        } else render();
      };
      const choose = (option) => {
        if (option.getAttribute("aria-disabled") === "true") return;
        if (multiple) {
          option.setAttribute("aria-selected", String(option.getAttribute("aria-selected") !== "true"));
          input.value = "";
          typed = false;
          filter("");
          changed();
          setActive(option);
          showListbox(list, control);
        } else {
          for (const o of options()) o.setAttribute("aria-selected", String(o === option));
          typed = false;
          changed();
          close();
        }
      };
      input.addEventListener("input", () => {
        typed = true;
        open();
        filter(input.value);
        setActive(enabled()[0]);
      });
      input.addEventListener("keydown", (e) => {
        const items = enabled();
        const current = active();
        const i = current ? items.indexOf(current) : -1;
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          if (!isOpen()) {
            open();
            if (e.key === "ArrowUp" && !selected().length) setActive(items[items.length - 1]);
            return;
          }
          setActive(e.key === "ArrowDown" ? items[Math.min(i + 1, items.length - 1)] : items[Math.max(i - 1, 0)]);
        } else if (e.key === "Enter") {
          if (isOpen() && current) {
            e.preventDefault();
            choose(current);
          }
        } else if (e.key === "Escape") {
          if (isOpen()) {
            e.preventDefault();
            e.stopPropagation();
            close();
          }
        } else if (e.key === "Backspace" && multiple && !input.value) {
          const last = selected().at(-1);
          if (last) {
            last.setAttribute("aria-selected", "false");
            changed();
          }
        } else if (e.key === "Tab") {
          close();
        }
      });
      list.addEventListener("mousedown", (e) => e.preventDefault());
      list.addEventListener("click", (e) => {
        const option = e.target instanceof Element ? e.target.closest(".bk-combobox-option") : null;
        if (option) choose(option);
      });
      list.addEventListener("mousemove", (e) => {
        const option = e.target instanceof Element ? e.target.closest(".bk-combobox-option") : null;
        if (option && !option.hasAttribute("data-active") && option.getAttribute("aria-disabled") !== "true") setActive(option);
      });
      control.addEventListener("mousedown", (e) => {
        if (e.target !== input) e.preventDefault();
      });
      control.addEventListener("click", (e) => {
        if (input.disabled) return;
        const target = e.target instanceof Element ? e.target : null;
        const chip = target?.closest(".bk-chip-remove")?.closest(".bk-chip");
        if (chip) {
          const option = options().find((o) => valueOf(o) === chip.getAttribute("data-value"));
          if (option) {
            option.setAttribute("aria-selected", "false");
            changed();
          }
        } else if (target?.closest(".bk-combobox-clear")) {
          for (const o of options()) o.setAttribute("aria-selected", "false");
          input.value = "";
          typed = false;
          filter("");
          changed();
        } else if (target?.closest(".bk-combobox-toggle") && isOpen()) {
          close();
        } else {
          open();
        }
        input.focus();
      });
      box.addEventListener("focusout", (e) => {
        const next = e.relatedTarget;
        if (!(next instanceof Node) || !box.contains(next)) close();
      });
      clear?.setAttribute("type", "button");
      filter("");
      render();
    }
  }

  // src/core/hovercard.ts
  var HOVERCARD_OPEN_DELAY = 500;
  var HOVERCARD_CLOSE_DELAY = 250;
  var timers = /* @__PURE__ */ new WeakMap();
  function popoverOpen2(el) {
    try {
      return el.matches(":popover-open");
    } catch {
      return false;
    }
  }
  function schedule(card, delay, run) {
    clearTimeout(timers.get(card));
    timers.set(card, setTimeout(run, delay));
  }
  function showHoverCard(card, trigger) {
    clearTimeout(timers.get(card));
    if (!popoverOpen2(card) && typeof card.showPopover === "function") {
      try {
        card.showPopover();
      } catch {
        return;
      }
    }
    placePopover(card, trigger);
  }
  function hideHoverCard(card) {
    clearTimeout(timers.get(card));
    if (popoverOpen2(card) && typeof card.hidePopover === "function") {
      try {
        card.hidePopover();
      } catch {
      }
    }
    card.removeAttribute("data-placed");
  }
  function delays(trigger) {
    const open = Number(trigger.getAttribute("data-open-delay"));
    const close = Number(trigger.getAttribute("data-close-delay"));
    return [Number.isFinite(open) && trigger.hasAttribute("data-open-delay") ? open : HOVERCARD_OPEN_DELAY, Number.isFinite(close) && trigger.hasAttribute("data-close-delay") ? close : HOVERCARD_CLOSE_DELAY];
  }
  function cardFor(trigger) {
    const card = document.getElementById(trigger.getAttribute("data-bk-hovercard") ?? "");
    return card && card.classList.contains("bk-hovercard") ? card : null;
  }
  function triggerFor(card) {
    return card.id ? document.querySelector(`[data-bk-hovercard="${CSS.escape(card.id)}"]`) : null;
  }
  function onOver(event) {
    if (event instanceof PointerEvent && event.pointerType === "touch") return;
    const trigger = closestFrom(event.target, "[data-bk-hovercard]");
    if (trigger && !isManaged(trigger)) {
      const card2 = cardFor(trigger);
      if (!card2) return;
      if (event.type === "focusin" && !trigger.matches(":focus-visible")) return;
      const [open] = delays(trigger);
      if (popoverOpen2(card2)) clearTimeout(timers.get(card2));
      else schedule(card2, event.type === "focusin" ? 0 : open, () => showHoverCard(card2, trigger));
      return;
    }
    const card = closestFrom(event.target, ".bk-hovercard");
    if (card && !isManaged(card)) clearTimeout(timers.get(card));
  }
  function onOut(event) {
    const from = closestFrom(event.target, "[data-bk-hovercard], .bk-hovercard");
    if (!from || isManaged(from)) return;
    const card = from.classList.contains("bk-hovercard") ? from : cardFor(from);
    const trigger = card ? from === card ? triggerFor(card) : from : null;
    if (!card || !trigger) return;
    const to = event.relatedTarget;
    if (to instanceof Node && (card.contains(to) || trigger.contains(to))) return;
    schedule(card, delays(trigger)[1], () => hideHoverCard(card));
  }
  function onKey(event) {
    if (event.key !== "Escape") return;
    for (const card of Array.from(document.querySelectorAll(".bk-hovercard"))) {
      if (!isManaged(card) && popoverOpen2(card)) hideHoverCard(card);
    }
  }
  var bound2 = false;
  function enableHoverCards() {
    if (!isBrowser || bound2) return;
    bound2 = true;
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("focusin", onOver);
    document.addEventListener("focusout", onOut);
    document.addEventListener("keydown", onKey);
  }

  // src/core/number.ts
  function clampNumber(value, min, max) {
    if (min !== void 0 && value < min) return min;
    if (max !== void 0 && value > max) return max;
    return value;
  }
  var bound3 = (raw) => raw === null || raw === "" ? void 0 : Number(raw);
  function stepNumberInput(input, direction) {
    if (input.disabled || input.readOnly) return;
    try {
      if (direction === 1) input.stepUp();
      else input.stepDown();
    } catch {
      return;
    }
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }
  function syncButtons(box, input) {
    const value = input.value === "" ? NaN : Number(input.value);
    const min = bound3(input.getAttribute("min"));
    const max = bound3(input.getAttribute("max"));
    for (const button of $$(".bk-number-step", box)) {
      const up = button.getAttribute("data-direction") === "up";
      const limit = up ? max : min;
      button.disabled = input.disabled || limit !== void 0 && !Number.isNaN(value) && (up ? value >= limit : value <= limit);
    }
  }
  function initNumber(root, once2) {
    for (const box of $$(".bk-number", root)) {
      if (isManaged(box) || !once2(box, "number")) continue;
      const input = box.querySelector(".bk-number-input");
      if (!input) continue;
      for (const button of $$(".bk-number-step", box)) {
        button.type = "button";
        button.addEventListener("mousedown", (e) => e.preventDefault());
        button.addEventListener("click", () => {
          stepNumberInput(input, button.getAttribute("data-direction") === "up" ? 1 : -1);
          syncButtons(box, input);
        });
      }
      input.addEventListener("input", () => syncButtons(box, input));
      input.addEventListener("blur", () => {
        if (input.value === "") return;
        const value = Number(input.value);
        const clamped = clampNumber(value, bound3(input.getAttribute("min")), bound3(input.getAttribute("max")));
        if (clamped !== value) {
          input.value = String(clamped);
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }
        syncButtons(box, input);
      });
      syncButtons(box, input);
    }
  }

  // src/core/tags.ts
  function splitTags(text, delimiter = ",") {
    return text.split(delimiter).flatMap((part) => part.split(/\r?\n/)).map((part) => part.replace(/\s+/g, " ").trim()).filter(Boolean);
  }
  function addTags(current, incoming, options = {}) {
    const { max = Infinity, allowDuplicates = false } = options;
    const tags = [...current];
    const seen = new Set(tags.map((t) => t.toLowerCase()));
    const result = { tags, added: [], duplicates: [], rejected: [] };
    for (const tag of incoming) {
      const key = tag.toLowerCase();
      if (!allowDuplicates && seen.has(key)) result.duplicates.push(tag);
      else if (tags.length >= max) result.rejected.push(tag);
      else {
        tags.push(tag);
        result.added.push(tag);
        seen.add(key);
      }
    }
    return result;
  }
  function describeTagChange(result, max) {
    const parts = [];
    if (result.added.length === 1) parts.push(`Added ${result.added[0]}.`);
    else if (result.added.length > 1) parts.push(`Added ${result.added.length} tags.`);
    if (result.duplicates.length === 1) parts.push(`${result.duplicates[0]} is already added.`);
    else if (result.duplicates.length > 1) parts.push(`${result.duplicates.length} tags were already added.`);
    if (result.rejected.length) parts.push(`Limit of ${max} tags reached.`);
    return parts.join(" ");
  }
  function initTags(root, once2) {
    for (const box of $$(".bk-tags", root)) {
      if (isManaged(box) || !once2(box, "tags")) continue;
      const input = box.querySelector(".bk-tags-input");
      if (!input) continue;
      const delimiter = box.getAttribute("data-delimiter") || ",";
      const max = Number(box.getAttribute("data-max")) || void 0;
      const allowDuplicates = box.hasAttribute("data-allow-duplicates");
      const placeholder = input.placeholder;
      let tags = $$(".bk-chip", box).map((chip) => chip.getAttribute("data-value") ?? chip.textContent?.trim() ?? "").filter(Boolean);
      const status = document.createElement("span");
      status.className = "bk-sr-only";
      status.setAttribute("aria-live", "polite");
      box.append(status);
      const announce = (text) => {
        status.textContent = text;
      };
      const removeButtons = () => $$(".bk-chip-remove", box);
      const render = () => {
        for (const chip of $$(".bk-chip", box)) chip.remove();
        for (const tag of tags) {
          const chip = document.createElement("span");
          chip.className = "bk-chip";
          chip.setAttribute("data-value", tag);
          chip.textContent = tag;
          const remove = document.createElement("button");
          remove.type = "button";
          remove.className = "bk-chip-remove";
          remove.tabIndex = -1;
          remove.disabled = input.disabled;
          remove.setAttribute("aria-label", `Remove ${tag}`);
          chip.append(remove);
          box.insertBefore(chip, input);
        }
        input.placeholder = tags.length ? "" : placeholder;
        input.required = box.hasAttribute("data-required") && !tags.length;
        const name = box.getAttribute("data-name");
        if (name) {
          for (const hidden of $$("input[data-bk-tags-value]", box)) hidden.remove();
          for (const tag of tags) {
            const hidden = document.createElement("input");
            hidden.type = "hidden";
            hidden.name = name;
            hidden.value = tag;
            hidden.setAttribute("data-bk-tags-value", "");
            box.append(hidden);
          }
        }
        if (tags.length) box.setAttribute("data-has-value", "");
        else box.removeAttribute("data-has-value");
      };
      const changed = () => {
        render();
        emit(box, "bk:change", { values: [...tags] });
      };
      const commit = (text) => {
        const parts = splitTags(text, delimiter);
        if (!parts.length) return "";
        const result = addTags(tags, parts, { max, allowDuplicates });
        if (result.added.length) {
          tags = result.tags;
          changed();
        }
        for (const dup of result.duplicates) {
          const chip = $$(".bk-chip", box).find((c) => c.getAttribute("data-value")?.toLowerCase() === dup.toLowerCase());
          if (!chip) continue;
          chip.setAttribute("data-duplicate", "");
          setTimeout(() => chip.removeAttribute("data-duplicate"), 700);
        }
        announce(describeTagChange(result, max));
        return result.rejected.join(`${delimiter} `);
      };
      const removeAt = (index) => {
        const [tag] = tags.splice(index, 1);
        if (tag === void 0) return;
        changed();
        announce(`Removed ${tag}.`);
      };
      input.addEventListener("keydown", (e) => {
        const atStart = input.selectionStart === 0 && input.selectionEnd === 0;
        if ((e.key === "Enter" || e.key === delimiter) && input.value.trim()) {
          e.preventDefault();
          const kept = commit(input.value);
          input.value = kept && e.key === delimiter ? `${kept}${delimiter} ` : kept;
        } else if (e.key === delimiter) {
          e.preventDefault();
        } else if (e.key === "Backspace" && !input.value && tags.length) {
          e.preventDefault();
          removeAt(tags.length - 1);
        } else if (e.key === "ArrowLeft" && atStart && tags.length) {
          e.preventDefault();
          removeButtons().at(-1)?.focus();
        }
      });
      input.addEventListener("input", () => {
        const at = input.value.lastIndexOf(delimiter);
        if (at < 0) return;
        const rest = input.value.slice(at + 1).trimStart();
        const kept = commit(input.value.slice(0, at));
        input.value = kept ? `${kept}${delimiter} ${rest}` : rest;
      });
      input.addEventListener("paste", (e) => {
        const text = e.clipboardData?.getData("text") ?? "";
        if (!text.includes(delimiter) && !/\r?\n/.test(text)) return;
        e.preventDefault();
        input.value = commit(`${input.value}${delimiter}${text}`);
      });
      box.addEventListener("keydown", (e) => {
        const button = e.target instanceof Element ? e.target.closest(".bk-chip-remove") : null;
        if (!button) return;
        const buttons = removeButtons();
        const i = buttons.indexOf(button);
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          buttons[Math.max(0, i - 1)]?.focus();
        } else if (e.key === "ArrowRight" || e.key === "Escape") {
          e.preventDefault();
          (e.key === "ArrowRight" ? buttons[i + 1] ?? input : input).focus();
        } else if (e.key === "Backspace" || e.key === "Delete") {
          e.preventDefault();
          removeAt(i);
          (removeButtons()[Math.max(0, i - 1)] ?? input).focus();
        }
      });
      box.addEventListener("click", (e) => {
        if (input.disabled) return;
        const button = e.target instanceof Element ? e.target.closest(".bk-chip-remove") : null;
        if (button) {
          removeAt(removeButtons().indexOf(button));
          input.focus();
        } else if (e.target === box) {
          input.focus();
        }
      });
      box.addEventListener("focusout", (e) => {
        const next = e.relatedTarget;
        if (next instanceof Node && box.contains(next)) return;
        if (box.getAttribute("data-add-on-blur") !== "false" && input.value.trim()) input.value = commit(input.value);
      });
      render();
    }
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

  // src/core/chart.ts
  function niceScale(low, high, count = 4) {
    let min = Math.min(low, high);
    let max = Math.max(low, high);
    if (min > 0) min = 0;
    if (max < 0) max = 0;
    if (min === max) max = min + 1;
    const raw = (max - min) / Math.max(1, count);
    const power = 10 ** Math.floor(Math.log10(raw));
    const step = ([1, 2, 2.5, 5, 10].find((m) => m * power >= raw) ?? 10) * power;
    const start2 = Math.floor(min / step) * step;
    const end = Math.ceil(max / step) * step;
    const ticks = [];
    for (let v = start2; v <= end + step / 2; v += step) ticks.push(Math.round(v / step) * step);
    return { min: start2, max: end, ticks: ticks.map((t) => Number(t.toPrecision(12))) };
  }
  function linePath(values, scale, area = false, base = 100) {
    const span = scale.max - scale.min || 1;
    const x = (i) => values.length > 1 ? i / (values.length - 1) * 100 : 50;
    const y = (v) => 100 - (v - scale.min) / span * 100;
    const runs = [];
    let run = [];
    values.forEach((v, i) => {
      if (v === null || !Number.isFinite(v)) {
        if (run.length) runs.push(run);
        run = [];
      } else run.push([x(i), y(v)]);
    });
    if (run.length) runs.push(run);
    const f = (n) => String(Math.round(n * 100) / 100);
    return runs.map((points) => {
      const line = points.map(([px, py], i) => `${i ? "L" : "M"}${f(px)} ${f(py)}`).join(" ");
      if (!area) return points.length === 1 ? `${line} L${f(points[0][0])} ${f(points[0][1])}` : line;
      const first = points[0];
      const last = points[points.length - 1];
      return `${line} L${f(last[0])} ${f(base)} L${f(first[0])} ${f(base)} Z`;
    }).join(" ");
  }

  // src/core/index.ts
  var version = "0.2.2";
  function init(root = isBrowser ? document : void 0) {
    if (!isBrowser || !root) return;
    initTabs(root);
    initCommand(root);
    initCombobox(root, once);
    initTags(root, once);
    initNumber(root, once);
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
    if ((el = closestFrom(target, "[data-bk-dismiss]")) && !isManaged(el)) {
      const tip = el.closest(".bk-tip");
      if (tip) tip.hidden = true;
    }
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
    enableHoverCards();
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

  // src/core/browser.ts
  start();
  return __toCommonJS(browser_exports);
})();
