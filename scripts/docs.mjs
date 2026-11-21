// Builds the documentation website into _site/ (deployed to GitHub Pages).
// Run `npm run build` first: the site serves dist/ for its own styles and live previews.
//
//   docs/*.md                 guides            → /docs/<name>/
//   docs/components.md        component index   → /docs/components/
//   docs/components/*.md      one per component → /docs/components/<name>/
//   CHANGELOG.md, CONTRIBUTING.md                → /docs/changelog/, /docs/contributing/
//   site/home.html            landing page      → /
//   site/kit.html             live kit          → /kit/
//
// Markdown extras:
//   ```html preview          live preview with Preview / HTML tabs
//   <!-- props: ButtonProps --> props table generated from the TypeScript source
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';
import { createHighlighter } from 'shiki';
import ts from 'typescript';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, '_site');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const pkg = JSON.parse(read('package.json'));
const VERSION = pkg.version;
const SITE_URL = 'https://saadniazidev.github.io/bento-shad-ui/';
const REPO = 'https://github.com/SaadNiaziDev/bento-shad-ui';

if (!existsSync(join(ROOT, 'dist/bento.css'))) throw new Error('Run `npm run build` before `npm run docs`.');

/* ------------------------------------------------------------------ helpers */
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const slugify = (s) =>
  s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
const write = (p, content) => {
  if (p.endsWith('.html') && !p.startsWith('kit/')) {
    content = prerenderCharacters(content);
    const problems = checkNesting(content);
    if (problems.length) throw new Error(`${p}: broken HTML structure\n  ${problems.slice(0, 8).join('\n  ')}`);
  }
  mkdirSync(dirname(join(OUT, p)), { recursive: true });
  writeFileSync(join(OUT, p), content);
};
/** Relative path from one page URL (e.g. "docs/react/") to another ("docs/components/button/"). */
function rel(from, to) {
  if (to === '') return rootOf(from);
  const fromDir = from.endsWith('/') || from === '' ? from : posix.dirname(from) + '/';
  let r = posix.relative('/' + fromDir, '/' + to);
  if (to.endsWith('/') && !r.endsWith('/') && r !== '') r += '/';
  return r === '' ? './' : r;
}
const rootOf = (url) => (url === '' ? './' : '../'.repeat(url.split('/').filter(Boolean).length));

function parseFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { fm: {}, body: src };
  const fm = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  return { fm, body: src.slice(m[0].length) };
}

/* ------------------------------------------------------------------ pages */
const GUIDES = {
  'getting-started': 'Introduction',
  installation: 'Installation',
  html: 'HTML',
  react: 'React and Next.js',
  shadcn: 'shadcn/ui',
  flutter: 'Flutter',
  'ai-agents': 'AI agents',
  theming: 'Theming',
  typography: 'Typography',
  layout: 'Layout',
  accessibility: 'Accessibility',
  'javascript-api': 'JavaScript API',
};

const pages = [];
function addPage(file, url, extra = {}) {
  const raw = read(file);
  const { fm, body } = parseFrontmatter(raw);
  let content = body;
  let title = fm.title;
  const h1 = content.match(/^# (.+)\n/m);
  if (h1 && content.trimStart().startsWith('# ')) {
    title ??= h1[1].trim();
    content = content.replace(/^\s*# .+\n/, '');
  }
  pages.push({ file, url, title: title ?? url, description: fm.description ?? '', group: fm.group ?? '', raw, body: content, ...extra });
}

for (const name of Object.keys(GUIDES)) addPage(`docs/${name}.md`, `docs/${name}/`, { navTitle: GUIDES[name] });
addPage('docs/components.md', 'docs/components/', { navTitle: 'Overview' });
const componentFiles = readdirSync(join(ROOT, 'docs/components')).filter((f) => f.endsWith('.md')).sort();
for (const f of componentFiles) addPage(`docs/components/${f}`, `docs/components/${f.replace(/\.md$/, '')}/`);
addPage('CHANGELOG.md', 'docs/changelog/', { navTitle: 'Changelog' });
addPage('CONTRIBUTING.md', 'docs/contributing/', { navTitle: 'Contributing' });
const byFile = new Map(pages.map((p) => [p.file, p]));
const byUrl = new Map(pages.map((p) => [p.url, p]));

const COMPONENT_GROUPS = ['Layout', 'Actions', 'Forms', 'Data display', 'Feedback', 'Overlays', 'Navigation', 'Illustrations'];
for (const p of pages.filter((p) => p.file.startsWith('docs/components/'))) {
  if (!COMPONENT_GROUPS.includes(p.group)) throw new Error(`${p.file}: group "${p.group}" must be one of ${COMPONENT_GROUPS.join(', ')}`);
}

const NAV = [
  { title: 'Getting started', urls: ['getting-started', 'installation', 'html', 'react', 'shadcn', 'flutter', 'ai-agents'].map((n) => `docs/${n}/`) },
  { title: 'Foundations', urls: ['theming', 'typography', 'layout', 'accessibility'].map((n) => `docs/${n}/`) },
  { title: 'Components', urls: ['docs/components/'] },
  ...COMPONENT_GROUPS.map((g) => ({
    title: g,
    sub: true,
    urls: pages.filter((p) => p.group === g).sort((a, b) => a.title.localeCompare(b.title)).map((p) => p.url),
  })),
  { title: 'Reference', urls: ['docs/javascript-api/', 'docs/changelog/', 'docs/contributing/'] },
];
const ORDER = NAV.flatMap((s) => s.urls);
for (const p of pages) if (!ORDER.includes(p.url)) throw new Error(`${p.file} is not in the sidebar`);

/* ------------------------------------------------------------------ props tables from TypeScript */
const LITERAL = ts.TypeFlags.StringLiteral | ts.TypeFlags.NumberLiteral | ts.TypeFlags.BooleanLiteral;
/** Literal unions print as their values ('a' | 'b', boolean); everything else as TypeScript writes it. */
function formatType(checker, type) {
  const fmt = ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;
  if (type.isUnion()) {
    const members = type.types.filter((m) => !(m.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)));
    if (members.length && members.every((m) => m.flags & LITERAL)) {
      const names = members.map((m) => checker.typeToString(m).replace(/^"(.*)"$/, "'$1'"));
      const bools = names.filter((n) => n === 'true' || n === 'false');
      const rest = names.filter((n) => n !== 'true' && n !== 'false');
      if (bools.length === 2) rest.push('boolean');
      else rest.push(...bools);
      return rest.join(' | ');
    }
  }
  return checker.typeToString(type, undefined, fmt).replace(/ \| undefined$/, '').replace(/^undefined \| /, '');
}

function extractProps() {
  const entry = join(ROOT, 'src/react/index.ts');
  const program = ts.createProgram([entry, join(ROOT, 'src/globals.d.ts')], {
    jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler, strict: true, skipLibCheck: true,
  });
  const checker = program.getTypeChecker();
  const srcDir = join(ROOT, 'src/react');

  // Default values from destructuring: function Button({ variant = 'default' }) …
  const defaults = new Map();
  for (const sf of program.getSourceFiles()) {
    if (!sf.fileName.startsWith(srcDir)) continue;
    const record = (name, fn) => {
      const param = fn?.parameters?.[0];
      if (!param || !ts.isObjectBindingPattern(param.name)) return;
      const map = {};
      for (const el of param.name.elements) if (el.initializer && ts.isIdentifier(el.name)) map[el.name.text] = el.initializer.getText(sf);
      defaults.set(name, map);
    };
    ts.forEachChild(sf, (node) => {
      if (ts.isFunctionDeclaration(node) && node.name) record(node.name.text, node);
      if (ts.isVariableStatement(node)) {
        for (const d of node.declarationList.declarations) {
          if (!ts.isIdentifier(d.name) || !d.initializer || !ts.isCallExpression(d.initializer)) continue;
          const fn = d.initializer.arguments.find((a) => ts.isFunctionExpression(a) || ts.isArrowFunction(a));
          record(d.name.text, fn);
        }
      }
    });
  }

  const tables = new Map();
  const moduleSymbol = checker.getSymbolAtLocation(program.getSourceFile(entry));
  for (const exp of checker.getExportsOfModule(moduleSymbol)) {
    if (!exp.name.endsWith('Props')) continue;
    const symbol = exp.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exp) : exp;
    const decl = symbol.declarations?.[0];
    if (!decl) continue;
    const type = checker.getDeclaredTypeOfSymbol(symbol);
    const componentDefaults = defaults.get(exp.name.replace(/Props$/, '')) ?? {};
    const rows = [];
    for (const prop of checker.getPropertiesOfType(type)) {
      const own = prop.declarations?.some((d) => d.getSourceFile().fileName.startsWith(srcDir));
      if (!own) continue;
      const propType = checker.getTypeOfSymbolAtLocation(prop, decl);
      const typeText = formatType(checker, propType);
      const doc = ts.displayPartsToString(prop.getDocumentationComment(checker));
      const optional = (prop.flags & ts.SymbolFlags.Optional) !== 0;
      let def = componentDefaults[prop.name];
      if (!def) {
        const m = doc.match(/Default:?\s+([^.,]+?)(?:\)|\.|,|$)/);
        const raw = m?.[1].trim();
        if (raw && /^([`'"\d[{-]|true$|false$|null$)/.test(raw)) def = raw.replace(/`/g, '');
      }
      rows.push({ name: prop.name, type: typeText, optional, def, doc });
    }
    const heritage = ts.isInterfaceDeclaration(decl) ? (decl.heritageClauses ?? []).flatMap((h) => h.types.map((t) => t.getText())) : [];
    tables.set(exp.name, { rows, heritage });
    if (process.env.DOCS_REPORT) for (const r of rows) if (!r.doc) console.log(`undocumented: ${exp.name}.${r.name}`);
  }
  return tables;
}
const PROPS = extractProps();
const ILL = await import(join(ROOT, 'dist/illustrations.js'));
const MOOD_LABEL = { neutral: 'Neutral', happy: 'Happy', surprised: 'Surprised', sad: 'Sad', thinking: 'Thinking', sleepy: 'Sleepy' };

function characterGallery() {
  const tiles = ILL.characters.map((c) => {
    const target = `gal-${c.id}`;
    const toggles = ILL.moods
      .map((m) => `<button class="bk-toggle" type="button" data-doc-mood="${m}" data-target="${target}" aria-pressed="${m === 'neutral'}">${MOOD_LABEL[m]}</button>`)
      .join('');
    return `<article class="bk-tile doc-character" id="character-${c.id}">
<div class="doc-character-art"><span class="bk-illustration" id="${target}" data-bk-character="${c.id}" data-mood="neutral" style="--size: 176px" aria-label="${esc(c.name)} the ${c.kind === 'person' ? 'traveller' : esc(c.role.split(' ')[1] ?? 'animal')}"></span></div>
<div class="bk-toggle-group doc-moods" data-type="single" role="group" aria-label="${esc(c.name)}'s mood">${toggles}</div>
<div><h3 class="bk-tile-title">${esc(c.name)} <span class="bk-badge" data-variant="${c.kind === 'person' ? 'info' : 'success'}">${c.kind === 'person' ? 'Person' : 'Animal'}</span></h3><p class="bk-tile-description">${esc(c.role)}</p></div>
<div class="bk-row" style="--gap: 5px">${c.traits.map((t) => `<span class="bk-badge" data-variant="outline">${esc(t)}</span>`).join('')}</div>
<p class="doc-character-uses"><b>Good for:</b> ${esc(c.bestFor.join(', '))}</p>
</article>`;
  });
  return `<div class="bk-bento doc-gallery"><div class="bk-bento-grid">${tiles.join('')}</div></div>`;
}

/** Draws every empty [data-bk-character] placeholder into the HTML, so characters show before scripts run. */
let drawn = 0;
function prerenderCharacters(html) {
  return html.replace(/<(span|div)(\s[^>]*?data-bk-character="([a-z]+)"[^>]*)><\/\1>/g, (all, tag, attrs, id) => {
    const mood = attrs.match(/data-mood="([a-z]+)"/)?.[1] ?? 'neutral';
    const label = attrs.match(/aria-label="([^"]*)"/)?.[1];
    if (!ILL.isCharacterId(id) || !ILL.isMood(mood)) throw new Error(`Unknown character or mood: ${id} ${mood}`);
    let a = attrs.replace(/\saria-label="[^"]*"/, label ? ` data-label="${label}"` : '');
    if (!/class="[^"]*bk-illustration/.test(a)) a = a.includes('class="') ? a.replace('class="', 'class="bk-illustration ') : ` class="bk-illustration"${a}`;
    const svg = ILL.renderCharacter(id, mood, { idPrefix: `pre${++drawn}`, title: label?.replace(/&quot;/g, '"').replace(/&amp;/g, '&') });
    return `<${tag}${a}>${svg}</${tag}>`;
  });
}

function propsTable(name) {
  const table = PROPS.get(name);
  if (!table) throw new Error(`props table: ${name} is not an exported *Props type`);
  const rows = table.rows
    .map(
      (r) => `<tr><td><code class="doc-prop">${esc(r.name)}</code>${r.optional ? '' : ' <span class="bk-badge" data-variant="secondary">required</span>'}</td>` +
        `<td><code class="doc-type">${esc(r.type)}</code></td><td>${r.def ? `<code class="doc-type">${esc(r.def)}</code>` : '<span class="doc-dash">–</span>'}</td>` +
        `<td>${esc(r.doc).replace(/`([^`]+)`/g, '<code class="doc-type">$1</code>')}</td></tr>`,
    )
    .join('');
  const extends_ = table.heritage.filter((h) => /^(Omit<)?React\./.test(h));
  const note = extends_.length
    ? `<p class="doc-props-note">Also accepts everything from <code class="doc-type">${esc(extends_.join(', '))}</code> (for example <code class="doc-type">className</code>, <code class="doc-type">id</code>, <code class="doc-type">aria-*</code>, event handlers) and forwards <code class="doc-type">ref</code>.</p>`
    : '';
  return `<div class="bk-table-wrap doc-props"><table class="bk-table"><thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody>${rows}</tbody></table></div>${note}`;
}

/* ------------------------------------------------------------------ markdown */
const highlighter = await createHighlighter({
  themes: ['github-light', 'github-dark'],
  langs: ['html', 'tsx', 'ts', 'js', 'css', 'bash', 'dart', 'json', 'yaml', 'markdown'],
});
const LANG_ALIAS = { sh: 'bash', shell: 'bash', jsx: 'tsx', typescript: 'ts', javascript: 'js', md: 'markdown', yml: 'yaml' };
const LANG_LABEL = { html: 'HTML', tsx: 'React', ts: 'TypeScript', js: 'JavaScript', css: 'CSS', bash: 'Terminal', dart: 'Dart', json: 'JSON', yaml: 'YAML', markdown: 'Markdown' };

function highlight(code, lang) {
  const l = LANG_ALIAS[lang] ?? lang;
  if (!l || !highlighter.getLoadedLanguages().includes(l)) return `<pre class="shiki"><code>${esc(code)}</code></pre>`;
  return highlighter.codeToHtml(code, { lang: l, themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false });
}
function codeBlock(code, lang) {
  const l = LANG_ALIAS[lang] ?? lang ?? '';
  return `<div class="doc-code"><div class="doc-code-bar"><span>${esc(LANG_LABEL[l] ?? (l || 'Text'))}</span>` +
    `<button class="bk-button doc-copy" data-variant="ghost" data-size="xs" type="button">Copy</button></div>${highlight(code, l)}</div>`;
}

let ctx; // per-page state while rendering
const marked = new Marked({ gfm: true });
marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const inner = this.parser.parseInline(tokens);
      const plain = inner.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
      let id = slugify(plain) || 'section';
      while (ctx.ids.has(id)) id += '-1';
      ctx.ids.add(id);
      if (depth === 2 || depth === 3) ctx.toc.push({ depth, id, text: plain });
      if (depth <= 3) ctx.headings.push({ id, text: plain });
      return `<h${depth} id="${id}" class="doc-h${depth}">${inner}<a class="doc-anchor" href="#${id}" aria-label="Link to ${esc(plain)}">#</a></h${depth}>\n`;
    },
    code({ text, lang }) {
      const [language = '', ...flags] = (lang ?? '').split(/\s+/);
      if (!flags.includes('preview')) return codeBlock(text, language);
      const n = ++ctx.examples;
      const base = `ex-${n}`;
      return `<div class="doc-example${flags.includes('full') ? ' doc-example-full' : ''}" data-bk-tabs>
<div class="doc-example-bar"><div class="bk-tabs-list" role="tablist" aria-label="Example ${n}">
<button class="bk-tabs-trigger" role="tab" type="button" aria-controls="${base}-preview" aria-selected="true">Preview</button>
<button class="bk-tabs-trigger" role="tab" type="button" aria-controls="${base}-code">HTML</button>
</div></div>
<div class="doc-example-preview" role="tabpanel" id="${base}-preview">${text}</div>
<div class="doc-example-code" role="tabpanel" id="${base}-code" hidden>${codeBlock(text, 'html')}</div>
</div>\n`;
    },
    codespan({ text }) {
      // marked hands over raw text: escape it, or `<dialog>` in prose becomes a real element.
      return `<code class="bk-code">${esc(text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&'))}</code>`;
    },
    link({ href, title, tokens }) {
      const inner = this.parser.parseInline(tokens);
      let target = href;
      const external = /^[a-z]+:/i.test(href);
      if (!external && !href.startsWith('#')) {
        const [file, hash] = href.split('#');
        if (file.endsWith('.md')) {
          const resolved = posix.normalize(posix.join(posix.dirname(ctx.page.file), file));
          const page = byFile.get(resolved);
          if (!page) throw new Error(`${ctx.page.file}: broken link to ${href}`);
          target = rel(ctx.page.url, page.url) + (hash ? `#${hash}` : '');
        } else if (file === 'llms.txt' || file === 'llms-full.txt' || file.endsWith('/llms-full.txt')) {
          target = rel(ctx.page.url, posix.basename(file));
        } else {
          target = `${REPO}/blob/main/${posix.normalize(posix.join(posix.dirname(ctx.page.file), file))}`;
        }
      }
      const attrs = external ? ' rel="noopener"' : '';
      return `<a href="${esc(target)}"${title ? ` title="${esc(title)}"` : ''}${attrs}>${inner}</a>`;
    },
    html({ text }) {
      const m = text.match(/<!--\s*props:\s*(\w+)\s*-->/);
      if (m) return propsTable(m[1]);
      if (/<!--\s*character-gallery\s*-->/.test(text)) return characterGallery();
      return text;
    },
    blockquote({ tokens }) {
      return `<div class="doc-callout">${this.parser.parse(tokens)}</div>\n`;
    },
  },
});

function renderMarkdown(page) {
  ctx = { page, ids: new Set(['content']), toc: [], headings: [], examples: 0 };
  let html = marked.parse(page.body);
  html = html.replace(/<table>([\s\S]*?)<\/table>/g, '<div class="bk-table-wrap"><table class="bk-table">$1</table></div>');
  return { html, toc: ctx.toc, headings: ctx.headings };
}

/* ------------------------------------------------------------------ layout */
const sprite = read('site/sprite.svg');
const core = await import(join(ROOT, 'dist/index.js'));
const themeScript = core.themeScript;
const FONTS = 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@500;600;700;800&family=Red+Hat+Text:wght@400;500;600;700&display=swap';
const icon = (name, size) => `<svg class="bk-icon"${size ? ` data-size="${size}"` : ''} aria-hidden="true"><use href="#i-${name}"/></svg>`;
const GITHUB_SVG = '<svg class="bk-icon" viewBox="0 0 24 24" aria-hidden="true" style="fill:currentColor;stroke:none"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>';

function sidebar(current) {
  return NAV.map((section) => {
    const links = section.urls
      .map((u) => {
        const p = byUrl.get(u);
        const label = p.navTitle ?? p.title;
        return `<a class="doc-nav-link" href="${rel(current, u)}"${u === current ? ' aria-current="page"' : ''}>${esc(label)}</a>`;
      })
      .join('');
    return `<div class="doc-nav-group${section.sub ? ' doc-nav-sub' : ''}"><div class="doc-nav-title">${esc(section.title)}</div>${links}</div>`;
  }).join('');
}

function header(current, root) {
  const is = (prefix) => (current.startsWith(prefix) ? ' aria-current="page"' : '');
  return `<header class="doc-top"><div class="doc-top-in">
  <button class="bk-button doc-menu-btn" data-variant="ghost" data-size="icon-sm" type="button" data-bk-open="doc-nav-sheet" aria-label="Open navigation">${icon('menu')}</button>
  <a class="doc-logo" href="${root}"><span class="doc-mark" aria-hidden="true"><i></i><i></i><i></i></span>bento-shad-ui</a>
  <nav class="doc-top-nav" aria-label="Main">
    <a class="bk-navbar-link" href="${rel(current, 'docs/getting-started/')}"${current.startsWith('docs/') && !current.startsWith('docs/components') ? ' aria-current="page"' : ''}>Docs</a>
    <a class="bk-navbar-link" href="${rel(current, 'docs/components/')}"${is('docs/components')}>Components</a>
    <a class="bk-navbar-link" href="${rel(current, 'kit/')}">Kit</a>
  </nav>
  <div class="doc-top-tools">
    <button class="doc-search-btn" type="button" data-doc-search aria-label="Search documentation">${icon('search')}<span>Search docs…</span><span class="bk-kbd-group"><kbd class="bk-kbd">⌘</kbd><kbd class="bk-kbd">K</kbd></span></button>
    <a class="bk-badge" data-variant="outline" href="${rel(current, 'docs/changelog/')}">v${VERSION}</a>
    <a class="bk-button" data-variant="ghost" data-size="icon-sm" href="${REPO}" aria-label="GitHub repository" rel="noopener">${GITHUB_SVG}</a>
    <div class="bk-toggle-group doc-theme" role="group" aria-label="Theme">
      <button class="bk-toggle" type="button" data-bk-theme-set="light" aria-label="Light theme">${icon('sun')}</button>
      <button class="bk-toggle" type="button" data-bk-theme-set="dark" aria-label="Dark theme">${icon('moon')}</button>
      <button class="bk-toggle" type="button" data-bk-theme-set="system" aria-label="System theme">${icon('monitor')}</button>
    </div>
  </div>
</div></header>`;
}

function shell({ url, title, description, body, mdHref }) {
  const root = rootOf(url);
  const fullTitle = url === '' ? 'bento-shad-ui: bento-grid UI library with shadcn/ui anatomy' : `${title} · bento-shad-ui`;
  return `<!doctype html>
<html lang="en" data-theme="system" data-root="${root}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE_URL}${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="bento-shad-ui">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE_URL}${url}">
<meta property="og:image" content="${SITE_URL}assets/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#f1f0ec" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0f0f11" media="(prefers-color-scheme: dark)">
<link rel="icon" href="${root}assets/favicon.svg" type="image/svg+xml">
${mdHref ? `<link rel="alternate" type="text/markdown" href="${mdHref}">` : ''}
<script>${themeScript}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="${root}dist/bento.css">
<link rel="stylesheet" href="${root}assets/docs.css">
</head>
<body class="bk">
${sprite}
<a class="doc-skip" href="#content">Skip to content</a>
${header(url, root)}
${body}
<dialog class="bk-sheet doc-nav-sheet" id="doc-nav-sheet" aria-label="Navigation">
  <button class="bk-button bk-dialog-close" data-variant="ghost" data-size="icon-sm" type="button" data-bk-close aria-label="Close">${icon('x')}</button>
  <nav class="doc-sidebar-nav" aria-label="Docs">${sidebar(url)}</nav>
</dialog>
<dialog class="bk-command doc-search" id="doc-search" data-bk-react aria-label="Search documentation">
  <div class="bk-command-search">${icon('search')}<input class="bk-command-input" id="doc-search-input" placeholder="Search guides, components, props…" aria-label="Search documentation" autocomplete="off" role="combobox" aria-expanded="true" aria-controls="doc-search-list"></div>
  <div class="bk-command-list" id="doc-search-list" role="listbox"></div>
  <div class="bk-command-footer"><span><kbd class="bk-kbd">↑</kbd><kbd class="bk-kbd">↓</kbd> move</span><span><kbd class="bk-kbd">↵</kbd> open</span><span><kbd class="bk-kbd">esc</kbd> close</span></div>
</dialog>
<script src="${root}dist/bento.iife.min.js"></script>
<script src="${root}dist/illustrations.iife.min.js"></script>
<script src="${root}assets/docs.js"></script>
</body>
</html>
`;
}

function footer(root) {
  return `<footer class="doc-footer"><div>bento-shad-ui v${VERSION} · MIT · <a href="${REPO}">GitHub</a> · <a href="${root}llms.txt">llms.txt</a></div><div>Fonts: Red Hat Display, Red Hat Text (SIL OFL)</div></footer>`;
}

/* ------------------------------------------------------------------ HTML structure check */
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
/** Returns problems like "</div> closes over <main>" so broken pages fail the build instead of shipping. */
function checkNesting(html) {
  const body = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '');
  const stack = [];
  const problems = [];
  for (const m of body.matchAll(/<(\/?)([a-zA-Z][\w-]*)\b[^>]*?(\/?)>/g)) {
    const [, closing, rawTag, selfClosing] = m;
    const tag = rawTag.toLowerCase();
    if (VOID.has(tag) || selfClosing) continue;
    if (!closing) {
      stack.push(tag);
      continue;
    }
    const i = stack.lastIndexOf(tag);
    if (i === -1) problems.push(`stray </${tag}>`);
    else {
      if (i !== stack.length - 1) problems.push(`</${tag}> closes over <${stack.slice(i + 1).join('>, <')}>`);
      stack.length = i;
    }
  }
  if (stack.length) problems.push(`unclosed <${stack.join('>, <')}>`);
  return problems;
}

/* ------------------------------------------------------------------ build */
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(join(ROOT, 'dist'), join(OUT, 'dist'), { recursive: true });
cpSync(join(ROOT, 'r'), join(OUT, 'r'), { recursive: true });
cpSync(join(ROOT, 'site/assets'), join(OUT, 'assets'), { recursive: true });
for (const f of ['llms.txt', 'llms-full.txt']) cpSync(join(ROOT, f), join(OUT, f));
write('.nojekyll', '');

const searchIndex = [];
pages.forEach((page) => {
  const { html, toc, headings } = renderMarkdown(page);
  const root = rootOf(page.url);
  const i = ORDER.indexOf(page.url);
  const prev = byUrl.get(ORDER[i - 1]);
  const next = byUrl.get(ORDER[i + 1]);
  const section = NAV.find((s) => s.urls.includes(page.url));
  const crumbs = [`<li><a href="${rel(page.url, 'docs/getting-started/')}">Docs</a></li>`];
  if (section?.sub || page.url === 'docs/components/') crumbs.push(`<li><a href="${rel(page.url, 'docs/components/')}">Components</a></li>`);
  crumbs.push(`<li><span aria-current="page">${esc(page.navTitle ?? page.title)}</span></li>`);

  const body = `<div class="doc-shell">
  <aside class="doc-sidebar" aria-label="Documentation"><nav class="doc-sidebar-nav" aria-label="Docs">${sidebar(page.url)}</nav></aside>
  <main class="doc-main" id="content">
    <nav aria-label="Breadcrumb"><ol class="bk-breadcrumb doc-crumbs">${crumbs.join('')}</ol></nav>
    <div class="doc-head">
      <h1 class="bk-h1 doc-title">${esc(page.title)}</h1>
      ${page.description ? `<p class="bk-lead doc-lead">${esc(page.description)}</p>` : ''}
      <div class="doc-actions">
        <button class="bk-button" data-variant="outline" data-size="xs" type="button" data-doc-copy-page>${icon('copy', 'sm')}Copy page</button>
        <a class="bk-button" data-variant="ghost" data-size="xs" href="index.md">${icon('file', 'sm')}Markdown</a>
        <a class="bk-button" data-variant="ghost" data-size="xs" href="${REPO}/edit/main/${page.file}" rel="noopener">${icon('pencil', 'sm')}Edit on GitHub</a>
      </div>
    </div>
    <article class="doc-prose">${html}</article>
    <nav class="doc-pager" aria-label="Previous and next page">
      ${prev ? `<a class="doc-pager-link" href="${rel(page.url, prev.url)}"><span>Previous</span><b>${esc(prev.navTitle ?? prev.title)}</b></a>` : '<span></span>'}
      ${next ? `<a class="doc-pager-link doc-pager-next" href="${rel(page.url, next.url)}"><span>Next</span><b>${esc(next.navTitle ?? next.title)}</b></a>` : '<span></span>'}
    </nav>
    ${footer(root)}
  </main>
  <aside class="doc-toc" aria-label="On this page">${
    toc.length ? `<div class="doc-toc-title">On this page</div><nav>${toc.map((t) => `<a class="doc-toc-link" data-depth="${t.depth}" href="#${t.id}">${esc(t.text)}</a>`).join('')}</nav>` : ''
  }</aside>
</div>`;

  const description = page.description || (page.body.replace(/```[\s\S]*?```/g, '').match(/^(?!#|\||-|>|<)[A-Za-z`*].{40,}$/m)?.[0] ?? '').replace(/[`*]/g, '').slice(0, 200);
  write(`${page.url}index.html`, shell({ url: page.url, title: page.title, description, body, mdHref: 'index.md' }));
  write(`${page.url}index.md`, `# ${page.title}\n\n${page.description ? `> ${page.description}\n\n` : ''}${page.body.trim()}\n`);

  const text = page.body.replace(/```[\s\S]*?```/g, ' ').replace(/<!--[\s\S]*?-->/g, ' ').replace(/[#*`|>_[\]()-]/g, ' ').replace(/\s+/g, ' ').trim();
  searchIndex.push({
    t: page.navTitle ?? page.title,
    u: page.url,
    g: section?.sub ? `Components · ${section.title}` : section?.title ?? '',
    d: description,
    h: headings.filter((h) => h.id !== 'content').map((h) => [h.text, h.id]),
    x: text.slice(0, 600),
  });
});

// Landing page and kit
const home = read('site/home.html').replaceAll('{{root}}', './').replaceAll('{{version}}', VERSION).replaceAll('{{repo}}', REPO);
write('index.html', shell({ url: '', title: 'bento-shad-ui', description: pkg.description, body: home + `<div class="doc-home-footer">${footer('./')}</div>` }));
cpSync(join(ROOT, 'site/kit.html'), join(OUT, 'kit/index.html'));

// 404 (served from any path, so it uses an absolute base)
const notFound = shell({
  url: '',
  title: 'Page not found',
  description: 'This page does not exist.',
  body: `<main class="doc-404" id="content"><div class="bk-empty"><div class="bk-empty-illustration"><span class="bk-illustration" data-bk-character="biscuit" data-mood="surprised" style="--size: 190px"></span></div><h1 class="bk-empty-title">Page not found</h1><p class="bk-empty-description">Biscuit sniffed everywhere and found nothing. The page moved or never existed. Search the docs or start from the introduction.</p><div class="bk-empty-actions"><a class="bk-button" href="docs/getting-started/">Introduction</a><button class="bk-button" data-variant="outline" type="button" data-doc-search>Search docs</button></div></div></main>`,
}).replace('<head>', '<head>\n<base href="/bento-shad-ui/">');
write('404.html', notFound);

write('search-index.json', JSON.stringify(searchIndex));
const urls = ['', ...pages.map((p) => p.url), 'kit/'];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE_URL}${u}</loc></url>`).join('\n')}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}sitemap.xml\n`);

console.log(`docs: ${pages.length} pages, ${PROPS.size} props tables, search index ${searchIndex.length} entries → _site/`);
