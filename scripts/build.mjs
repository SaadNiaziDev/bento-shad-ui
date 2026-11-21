// bento-shad-ui build. `npm run build` regenerates everything in dist/, r/ and llms-full.txt
// from src/ and docs/. Deterministic: running it twice gives identical output (CI checks this).
import { build, transform } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { hexToOklch } from './color.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const write = (p, content) => {
  mkdirSync(dirname(join(root, p)), { recursive: true });
  writeFileSync(join(root, p), content);
};

const pkg = JSON.parse(read('package.json'));
const T = JSON.parse(read('src/tokens.json'));
const components = read('src/css/components.css');
const VERSION = pkg.version;
const REPO = 'SaadNiaziDev/bento-shad-ui';
const REGISTRY_BASE = `https://raw.githubusercontent.com/${REPO}/main/r`;
const banner = `bento-shad-ui v${VERSION} | MIT | https://github.com/${REPO}`;

const L = T.color.light;
const D = T.color.dark;
const keys = Object.keys(L);
const missing = keys.filter((k) => !(k in D));
const extra = Object.keys(D).filter((k) => !(k in L));
if (missing.length || extra.length) throw new Error(`light/dark token mismatch. Missing in dark: ${missing}. Only in dark: ${extra}`);

const SHADCN_COLORS = new Set([
  'background', 'foreground', 'card', 'card-foreground', 'popover', 'popover-foreground', 'primary', 'primary-foreground',
  'secondary', 'secondary-foreground', 'muted', 'muted-foreground', 'accent', 'accent-foreground', 'destructive', 'border',
  'input', 'ring', 'chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5', 'sidebar', 'sidebar-foreground', 'sidebar-primary',
  'sidebar-primary-foreground', 'sidebar-accent', 'sidebar-accent-foreground', 'sidebar-border', 'sidebar-ring',
]);
const bentoExtras = keys.filter((k) => !SHADCN_COLORS.has(k));

const fam = (name, fallback = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif') => `"${name}", ${fallback}`;
const colorLines = (set, indent = '  ') => keys.map((k) => `${indent}--${k}: ${hexToOklch(set[k])};`).join('\n');
const shadowLines = (set, indent = '  ') => Object.entries(set).map(([k, v]) => `${indent}--shadow-${k}: ${v};`).join('\n');
const sizeLines = (indent = '  ') =>
  [
    `--radius: ${T.size.radius};`,
    '--radius-sm: calc(var(--radius) * 0.6);',
    '--radius-md: calc(var(--radius) * 0.8);',
    '--radius-lg: var(--radius);',
    '--radius-xl: calc(var(--radius) * 1.4);',
    '--radius-2xl: calc(var(--radius) * 1.8);',
    '--radius-pill: 999px;',
    `--tile-radius: ${T.size['tile-radius']};`,
    `--tile-gap: ${T.size['tile-gap']};`,
    `--tile-pad: ${T.size['tile-pad']};`,
  ].map((l) => indent + l).join('\n');

rmSync(join(root, 'dist'), { recursive: true, force: true });
rmSync(join(root, 'r'), { recursive: true, force: true });

/* ------------------------------------------------------------------ CSS */
const darkBlock = `${colorLines(D)}\n${shadowLines(T.shadow.dark)}\n  color-scheme: dark;`;
const tokensCss = `/*! ${banner} */
/* Tokens only. Dark mode: class="dark" or data-theme="dark" on <html>; data-theme="system" follows the OS. */
:root {
  --font-sans: ${fam(T.font.sans)};
  --font-heading: ${fam(T.font.heading)};
${sizeLines()}
${colorLines(L)}
${shadowLines(T.shadow.light)}
  color-scheme: light;
}

.dark,
[data-theme="dark"] {
${darkBlock}
}

@media (prefers-color-scheme: dark) {
  [data-theme="system"] {
${darkBlock.replace(/^ {2}/gm, '    ')}
  }
}
`;
const bentoCss = `${tokensCss}\n${components}`;
write('dist/tokens.css', tokensCss);
write('dist/bento.css', bentoCss);
const minCss = await transform(bentoCss, { loader: 'css', minify: true, legalComments: 'inline' });
write('dist/bento.min.css', minCss.code);

/* ------------------------------------------------------------------ shadcn / Tailwind v4 theme */
const shadcnCss = `/* ${banner}
   shadcn/ui on Tailwind CSS v4: use this file as app/globals.css (or merge the theme parts into yours).
   Fonts: load "${T.font.sans}" and "${T.font.heading}" with next/font or a <link>. See docs/shadcn.md. */
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-sans: ${fam(T.font.sans)};
  --font-heading: ${fam(T.font.heading)};
${keys.map((k) => `  --color-${k}: var(--${k});`).join('\n')}
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-tile: var(--tile-radius);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
}

:root {
  --radius: ${T.size.radius};
  --tile-radius: ${T.size['tile-radius']};
  --tile-gap: ${T.size['tile-gap']};
  --tile-pad: ${T.size['tile-pad']};
${colorLines(L)}
${shadowLines(T.shadow.light)}
}

.dark {
${colorLines(D)}
${shadowLines(T.shadow.dark)}
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground font-sans antialiased;
  }
  h1, h2, h3, h4 {
    font-family: var(--font-heading);
  }
}

/* Bento layout. Wrap the grid in "@container" so it follows its own width:
   <div class="@container"><div class="bento-grid"><div class="bento-tile @xl:col-span-2">…</div></div></div> */
@utility bento-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-auto-flow: dense;
  gap: var(--tile-gap);
  @container (min-width: 36rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @container (min-width: 56rem) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@utility bento-tile {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
  padding: var(--tile-pad);
  border: 1px solid var(--border);
  border-radius: var(--tile-radius);
  background: var(--card);
  color: var(--card-foreground);
}
`;
write('dist/shadcn-theme.css', shadcnCss);

/* ------------------------------------------------------------------ shadcn registry (npx shadcn add <url>) */
const SCHEMA = 'https://ui.shadcn.com/schema/registry-item.json';
const themeItem = {
  $schema: SCHEMA,
  name: 'bento-theme',
  type: 'registry:theme',
  title: 'Bento theme',
  description: `bento-shad-ui v${VERSION} tokens: shadcn colours plus brand, status, inverse and tile tints, light and dark.`,
  cssVars: {
    theme: {
      'font-sans': fam(T.font.sans),
      'font-heading': fam(T.font.heading),
      'radius-tile': 'var(--tile-radius)',
      ...Object.fromEntries(bentoExtras.map((k) => [`color-${k}`, `var(--${k})`])),
    },
    light: {
      radius: T.size.radius,
      'tile-radius': T.size['tile-radius'],
      'tile-gap': T.size['tile-gap'],
      'tile-pad': T.size['tile-pad'],
      ...Object.fromEntries(keys.map((k) => [k, hexToOklch(L[k])])),
    },
    dark: Object.fromEntries(keys.map((k) => [k, hexToOklch(D[k])])),
  },
};
const gridItem = {
  $schema: SCHEMA,
  name: 'bento-grid',
  type: 'registry:ui',
  title: 'Bento grid',
  description: 'BentoGrid and BentoTile for shadcn/ui projects: container-query grid, span and row props, eight tile tones.',
  dependencies: ['class-variance-authority'],
  registryDependencies: [`${REGISTRY_BASE}/bento-theme.json`],
  files: [{ path: 'registry/bento-grid.tsx', type: 'registry:ui', content: read('registry/bento-grid.tsx') }],
  css: {
    '@utility bento-grid': {
      display: 'grid',
      'grid-template-columns': 'minmax(0, 1fr)',
      'grid-auto-flow': 'dense',
      gap: 'var(--tile-gap)',
      '@container (min-width: 36rem)': { 'grid-template-columns': 'repeat(2, minmax(0, 1fr))' },
      '@container (min-width: 56rem)': { 'grid-template-columns': 'repeat(4, minmax(0, 1fr))' },
    },
    '@utility bento-tile': {
      display: 'flex',
      'flex-direction': 'column',
      gap: '1rem',
      'min-width': '0',
      padding: 'var(--tile-pad)',
      border: '1px solid var(--border)',
      'border-radius': 'var(--tile-radius)',
      background: 'var(--card)',
      color: 'var(--card-foreground)',
    },
  },
};
write('r/bento-theme.json', JSON.stringify(themeItem, null, 2) + '\n');
write('r/bento-grid.json', JSON.stringify(gridItem, null, 2) + '\n');
write(
  'r/registry.json',
  JSON.stringify(
    {
      $schema: 'https://ui.shadcn.com/schema/registry.json',
      name: 'bento-shad-ui',
      homepage: pkg.homepage,
      items: [
        { name: themeItem.name, type: themeItem.type, title: themeItem.title, description: themeItem.description },
        { name: gridItem.name, type: gridItem.type, title: gridItem.title, description: gridItem.description },
      ],
    },
    null,
    2,
  ) + '\n',
);

/* ------------------------------------------------------------------ tokens.json (with version) */
write('dist/tokens.json', JSON.stringify({ name: 'bento-shad-ui', version: VERSION, ...T, $description: undefined }, null, 2) + '\n');

/* ------------------------------------------------------------------ Flutter */
const camel = (k) => k.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const dartHex = (hex) => '0xFF' + hex.replace('#', '').slice(0, 6).toUpperCase();
const px = (v) => (v.endsWith('rem') ? parseFloat(v) * 16 : parseFloat(v));
const fields = keys.map(camel);
const colorArgs = (set) => keys.map((k) => `    ${camel(k)}: Color(${dartHex(set[k])}),`).join('\n');
const dart = `// ${banner}
// Generated from tokens.json by scripts/build.mjs. Do not edit by hand.
//
// MaterialApp(theme: BentoTheme.light(), darkTheme: BentoTheme.dark())
// Any token in a widget: Theme.of(context).extension<BentoColors>()!.tintPeach
// Fonts: add "${T.font.sans}" and "${T.font.heading}" (google_fonts package or font assets).
import 'package:flutter/material.dart';

@immutable
class BentoColors extends ThemeExtension<BentoColors> {
  const BentoColors({
${fields.map((f) => `    required this.${f},`).join('\n')}
  });

${fields.map((f) => `  final Color ${f};`).join('\n')}

  static const light = BentoColors(
${colorArgs(L)}
  );

  static const dark = BentoColors(
${colorArgs(D)}
  );

  @override
  BentoColors copyWith({
${fields.map((f) => `    Color? ${f},`).join('\n')}
  }) {
    return BentoColors(
${fields.map((f) => `      ${f}: ${f} ?? this.${f},`).join('\n')}
    );
  }

  @override
  BentoColors lerp(ThemeExtension<BentoColors>? other, double t) {
    if (other is! BentoColors) return this;
    return BentoColors(
${fields.map((f) => `      ${f}: Color.lerp(${f}, other.${f}, t)!,`).join('\n')}
    );
  }
}

class BentoTheme {
  BentoTheme._();

  static const String version = '${VERSION}';
  static const String fontFamily = '${T.font.sans}';
  static const String headingFontFamily = '${T.font.heading}';
  static const double radius = ${px(T.size.radius)};
  static const double tileRadius = ${px(T.size['tile-radius'])};
  static const double tileGap = ${px(T.size['tile-gap'])};
  static const double tilePadding = ${px(T.size['tile-pad'])};

  static ThemeData light() => _build(BentoColors.light, Brightness.light);
  static ThemeData dark() => _build(BentoColors.dark, Brightness.dark);

  /// A bento tile: card surface, 1px border, large radius. Pass a tint for toned tiles.
  static BoxDecoration tile(BentoColors c, {Color? color}) => BoxDecoration(
        color: color ?? c.card,
        borderRadius: BorderRadius.circular(tileRadius),
        border: color == null ? Border.all(color: c.border) : null,
      );

  static ThemeData _build(BentoColors c, Brightness b) {
    final scheme = ColorScheme(
      brightness: b,
      primary: c.primary,
      onPrimary: c.primaryForeground,
      secondary: c.secondary,
      onSecondary: c.secondaryForeground,
      tertiary: c.brand,
      onTertiary: c.brandForeground,
      error: c.destructive,
      onError: c.destructiveForeground,
      surface: c.card,
      onSurface: c.cardForeground,
      surfaceContainerHighest: c.muted,
      onSurfaceVariant: c.mutedForeground,
      outline: c.input,
      outlineVariant: c.border,
    );
    final field = OutlineInputBorder(
      borderRadius: BorderRadius.circular(radius * 0.8),
      borderSide: BorderSide(color: c.input),
    );
    final base = ThemeData(
      useMaterial3: true,
      brightness: b,
      colorScheme: scheme,
      scaffoldBackgroundColor: c.background,
      fontFamily: fontFamily,
      dividerColor: c.border,
      extensions: [c],
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          shape: const StadiumBorder(),
          minimumSize: const Size(0, 40),
          textStyle: const TextStyle(fontWeight: FontWeight.w600),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          shape: const StadiumBorder(),
          minimumSize: const Size(0, 40),
          side: BorderSide(color: c.border),
          foregroundColor: c.foreground,
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(shape: const StadiumBorder(), foregroundColor: c.foreground),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: c.card,
        border: field,
        enabledBorder: field,
        focusedBorder: field.copyWith(borderSide: BorderSide(color: c.ring, width: 2)),
        errorBorder: field.copyWith(borderSide: BorderSide(color: c.destructive)),
      ),
    );
    TextStyle? heading(TextStyle? s) => s?.copyWith(fontFamily: headingFontFamily, fontWeight: FontWeight.w700);
    final t = base.textTheme;
    return base.copyWith(
      textTheme: t.copyWith(
        displayLarge: heading(t.displayLarge),
        displayMedium: heading(t.displayMedium),
        displaySmall: heading(t.displaySmall),
        headlineLarge: heading(t.headlineLarge),
        headlineMedium: heading(t.headlineMedium),
        headlineSmall: heading(t.headlineSmall),
        titleLarge: heading(t.titleLarge),
      ),
    );
  }
}
`;
write('dist/flutter/bento_theme.dart', dart);

/* ------------------------------------------------------------------ JavaScript */
const define = { __VERSION__: JSON.stringify(VERSION) };
const common = { bundle: true, target: 'es2020', define, legalComments: 'none', logLevel: 'warning' };
await build({ ...common, entryPoints: [join(root, 'src/core/index.ts')], outfile: join(root, 'dist/index.js'), format: 'esm', platform: 'neutral', banner: { js: `/*! ${banner} */` } });
write('dist/auto.js', `/*! ${banner} */\n// Side-effect entry: starts the vanilla behaviours. import 'bento-shad-ui/auto'\nimport { start } from './index.js';\n\nstart();\n\nexport * from './index.js';\n`);
for (const minify of [false, true]) {
  await build({
    ...common,
    entryPoints: [join(root, 'src/core/browser.ts')],
    outfile: join(root, minify ? 'dist/bento.iife.min.js' : 'dist/bento.iife.js'),
    format: 'iife',
    globalName: 'BentoUI',
    platform: 'browser',
    minify,
    banner: { js: `/*! ${banner} */` },
  });
}
const coreExternal = {
  name: 'core-external',
  setup(b) {
    b.onResolve({ filter: /^\.\.\/core$/ }, () => ({ path: './index.js', external: true }));
  },
};
await build({
  ...common,
  entryPoints: [join(root, 'src/react/index.ts')],
  outfile: join(root, 'dist/react.js'),
  format: 'esm',
  platform: 'neutral',
  jsx: 'automatic',
  external: ['react', 'react/jsx-runtime', 'react-dom'],
  plugins: [coreExternal],
  banner: { js: `"use client";\n/*! ${banner} */` },
});

/* ------------------------------------------------------------------ Type declarations */
execFileSync(join(root, 'node_modules/.bin/tsc'), ['-p', join(root, 'tsconfig.json'), '--emitDeclarationOnly', '--outDir', join(root, 'dist/types')], { stdio: 'inherit' });

/* ------------------------------------------------------------------ llms-full.txt */
const GUIDE_ORDER = [
  'getting-started', 'installation', 'html', 'react', 'shadcn', 'flutter', 'theming', 'typography', 'layout', 'components', 'javascript-api', 'accessibility', 'ai-agents',
];
const GROUP_ORDER = ['Layout', 'Actions', 'Forms', 'Data display', 'Feedback', 'Overlays', 'Navigation'];
function forLlm(file) {
  const raw = read(file);
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const fm = {};
  if (m) for (const line of m[1].split('\n')) { const i = line.indexOf(':'); if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim(); }
  let body = m ? raw.slice(m[0].length) : raw;
  body = body.replace(/^```(\w+)[ \t]+preview(?:[ \t]+full)?[ \t]*$/gm, '```$1');
  const head = fm.title ? `# ${fm.title}\n\n> ${fm.description ?? ''}\n\n` : '';
  return { fm, text: `<!-- ${file} -->\n\n${head}${body.trim()}\n` };
}
const componentDocs = readdirSync(join(root, 'docs/components'))
  .filter((f) => f.endsWith('.md'))
  .map((f) => forLlm(`docs/components/${f}`))
  .sort((a, b) => GROUP_ORDER.indexOf(a.fm.group) - GROUP_ORDER.indexOf(b.fm.group) || a.fm.title.localeCompare(b.fm.title));
const full = [
  `# bento-shad-ui v${VERSION}: full documentation for LLMs`,
  '',
  `> Every guide and every component page in one file. Source: https://github.com/${REPO}/tree/main/docs. Website: ${pkg.homepage}. Index: llms.txt.`,
  '',
  ...GUIDE_ORDER.map((name) => forLlm(`docs/${name}.md`).text),
  ...componentDocs.map((d) => d.text),
].join('\n');
write('llms-full.txt', full.replace(/\n{3,}/g, '\n\n'));

console.log(`bento-shad-ui ${VERSION}: ${keys.length} colour tokens x 2 themes, built dist/, r/, llms-full.txt`);
