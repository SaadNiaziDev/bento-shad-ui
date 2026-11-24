/* bento-shad-ui documentation site behaviour: copy buttons, table of contents, search. */
(function () {
  'use strict';
  var root = document.documentElement.getAttribute('data-root') || './';
  var toast = function (opts) { if (window.BentoUI) window.BentoUI.toast(opts); };

  function copy(text, button, label) {
    var done = function () {
      var old = button.innerHTML;
      button.textContent = label || 'Copied';
      setTimeout(function () { button.innerHTML = old; }, 1400);
    };
    try {
      navigator.clipboard.writeText(text).then(done, function () { toast({ title: 'Copy failed. Select the text and copy it manually.', variant: 'destructive' }); });
    } catch (e) {
      toast({ title: 'Copy failed. Select the text and copy it manually.', variant: 'destructive' });
    }
  }

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!(t instanceof Element)) return;
    var btn = t.closest('.doc-copy');
    if (btn) {
      var pre = btn.closest('.doc-code').querySelector('pre');
      copy(pre ? pre.textContent : '', btn);
      return;
    }
    var page = t.closest('[data-doc-copy-page]');
    if (page) {
      fetch('index.md').then(function (r) { return r.text(); }).then(function (md) { copy(md, page, 'Copied as Markdown'); });
      return;
    }
    if (t.closest('[data-doc-search]')) openSearch();
    var moodBtn = t.closest('[data-doc-mood]');
    if (moodBtn) {
      var art = document.getElementById(moodBtn.getAttribute('data-target'));
      if (art) art.setAttribute('data-mood', moodBtn.getAttribute('data-doc-mood'));
    }
  });

  /* ---------- keep the current sidebar link in view ---------- */
  var sidebar = document.querySelector('.doc-sidebar');
  var current = sidebar && sidebar.querySelector('[aria-current="page"]');
  if (sidebar && current) sidebar.scrollTop = current.offsetTop - sidebar.clientHeight / 2;

  /* ---------- "On this page" highlighting ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.doc-toc-link'));
  if (links.length && 'IntersectionObserver' in window) {
    var visible = new Set();
    var mark = function () {
      var first = links.filter(function (l) { return visible.has(l.getAttribute('href').slice(1)); })[0];
      if (!first) return;
      links.forEach(function (l) { if (l === first) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current'); });
    };
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) visible.add(en.target.id); else visible.delete(en.target.id); });
      mark();
    }, { rootMargin: '-72px 0px -60% 0px' });
    links.forEach(function (l) {
      var h = document.getElementById(l.getAttribute('href').slice(1));
      if (h) observer.observe(h);
    });
  }

  /* ---------- search ---------- */
  var dialog = document.getElementById('doc-search');
  var input = document.getElementById('doc-search-input');
  var list = document.getElementById('doc-search-list');
  var index = null;
  var results = [];
  var active = 0;
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  function load() {
    if (index) return Promise.resolve(index);
    return fetch(root + 'search-index.json').then(function (r) { return r.json(); }).then(function (data) { index = data; return data; });
  }

  function search(query) {
    var q = query.trim().toLowerCase();
    if (!q) {
      return index.slice(0, 9).map(function (p) { return { page: p }; });
    }
    var out = [];
    index.forEach(function (p) {
      var title = p.t.toLowerCase();
      var score = 0;
      if (title === q) score = 200;
      else if (title.indexOf(q) === 0) score = 150;
      else if (title.indexOf(q) !== -1) score = 110;
      else if ((p.d || '').toLowerCase().indexOf(q) !== -1) score = 40;
      else if (p.x.toLowerCase().indexOf(q) !== -1) score = 15;
      if (score) out.push({ page: p, score: score + (p.g.indexOf('Components') === 0 ? 5 : 0) });
      p.h.forEach(function (h) {
        var ht = h[0].toLowerCase();
        if (ht.indexOf(q) !== -1) out.push({ page: p, heading: h, score: ht.indexOf(q) === 0 ? 70 : 55 });
      });
    });
    out.sort(function (a, b) { return b.score - a.score; });
    return out.slice(0, 40);
  }

  function render() {
    results = search(input.value);
    active = 0;
    if (!results.length) {
      list.innerHTML = '<div class="bk-command-empty">No results for "' + esc(input.value) + '".</div>';
      return;
    }
    list.innerHTML = results.map(function (r, i) {
      var href = root + r.page.u + (r.heading ? '#' + r.heading[1] : '');
      var title = r.heading ? r.heading[0] : r.page.t;
      var meta = r.heading ? r.page.t + (r.page.g ? ' · ' + r.page.g : '') : (r.page.g || 'Docs');
      var icon = r.heading ? 'i-arrow-right' : r.page.g.indexOf('Components') === 0 ? 'i-grid' : 'i-file';
      return '<a class="bk-command-item doc-search-item" role="option" id="doc-r-' + i + '" href="' + esc(href) + '" aria-selected="' + (i === 0) + '">' +
        '<svg class="bk-icon" aria-hidden="true"><use href="#' + icon + '"/></svg><span><b>' + esc(title) + '</b><small>' + esc(meta) + '</small></span></a>';
    }).join('');
    input.setAttribute('aria-activedescendant', 'doc-r-0');
  }

  function setActive(i) {
    var items = list.querySelectorAll('.doc-search-item');
    if (!items.length) return;
    active = Math.max(0, Math.min(i, items.length - 1));
    items.forEach(function (el, j) { el.setAttribute('aria-selected', String(j === active)); });
    var el = items[active];
    input.setAttribute('aria-activedescendant', el.id);
    var top = el.offsetTop - list.offsetTop;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (top + el.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = top + el.offsetHeight - list.clientHeight;
  }

  function openSearch() {
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    input.focus();
    input.select();
    load().then(render, function () {
      list.innerHTML = '<div class="bk-command-empty">Search needs the site to be served over http(s).</div>';
    });
  }

  if (dialog) {
    input.addEventListener('input', function () { if (index) render(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
      else if (e.key === 'Enter') {
        var el = list.querySelectorAll('.doc-search-item')[active];
        if (el) { e.preventDefault(); dialog.close(); window.location.href = el.getAttribute('href'); }
      }
    });
    list.addEventListener('mousemove', function (e) {
      var el = e.target instanceof Element && e.target.closest('.doc-search-item');
      if (el) setActive(Array.prototype.indexOf.call(list.querySelectorAll('.doc-search-item'), el));
    });
    list.addEventListener('click', function (e) { if (e.target instanceof Element && e.target.closest('.doc-search-item')) dialog.close(); });
    dialog.addEventListener('click', function (e) {
      if (e.target !== dialog) return;
      var r = dialog.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
    });
    document.addEventListener('keydown', function (e) {
      var typing = e.target instanceof Element && e.target.closest('input, textarea, select, [contenteditable="true"]');
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (dialog.open) dialog.close(); else openSearch(); }
      else if (e.key === '/' && !typing && !dialog.open) { e.preventDefault(); openSearch(); }
    });
  }
})();
