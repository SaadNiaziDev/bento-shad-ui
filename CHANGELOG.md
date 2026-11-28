# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/). Until 1.0.0, minor versions may contain breaking changes; they are listed under **Breaking**.

## [Unreleased]

### Added

- **Combobox**: a text field that filters a list as you type, for one value or several shown as chips. It has option groups, descriptions, disabled options, a clear button, form submission through hidden inputs, and matching that ignores case and accents (every typed word must match the label or its keywords).
  - React: `<Combobox options value onValueChange />`; with `multiple`, the value is a `string[]` and `onValueChange` is typed to match. `filter={false}`, `onInputChange` and `loading` handle results fetched from a server. `filterComboboxOptions` is exported.
  - HTML: `.bk-combobox` with `.bk-combobox-control`, `.bk-combobox-input`, `.bk-combobox-list[popover]` and `.bk-combobox-option`; `data-multiple`, `data-name`, `data-value`, `data-label` and `data-keywords`. Fires `bk:change` with `{ value, values }`.
  - Core exports `matchesQuery`, `foldText`, `showListbox`, `hideListbox` and the `ComboboxChangeDetail` type.
- **Tags input**: free-text values as chips. Enter or a comma adds a tag; pasted lists are split on commas and line breaks. Repeats are skipped (ignoring case) with a brief outline on the existing chip, and `max` keeps text past the limit in the field. ← from the start of the field moves through the chips' remove buttons; changes are announced in a polite live region.
  - React: `<TagsInput value onValueChange max delimiter allowDuplicates addOnBlur name />`.
  - HTML: `.bk-tags` with `.bk-chip` children and `input.bk-tags-input`; `data-name`, `data-max`, `data-delimiter`, `data-allow-duplicates`, `data-add-on-blur`, `data-required`. Fires `bk:change` with `{ values }`.
  - Core exports `splitTags`, `addTags`, `describeTagChange` and the `TagsChangeDetail` type.
- `.bk-chip` and `.bk-chip-remove`: the chip shared by the multiple combobox and the tags input.
- **Date picker** (React): `<DatePicker />` is a field-like button that opens the Calendar in a popover, for one date or a range (`mode="range"`). It closes on pick and returns focus to the button, writes the date in the reader's locale, has a clear button and `isDisabled`, and `name` submits `YYYY-MM-DD` hidden inputs. `formatDateValue` is exported. In plain HTML, the docs recommend a native `<input type="date" class="bk-input">`.
- **Number input**: a native `<input type="number">` between − and + buttons (`.bk-number`, `.bk-number-input`, `.bk-number-step[data-direction]`). The buttons respect `min`, `max` and `step`, disable at the limits and fire `input`/`change`; out-of-range typing is clamped on blur. React `<NumberInput value onValueChange min max step />` reports `null` for an empty field. Core exports `stepNumberInput` and `clampNumber`.
- **Rating**: native radio buttons styled as stars (`.bk-rating`, `.bk-rating-input`, `.bk-rating-star`), filled with CSS only; a read-only `.bk-rating[data-readonly]` image draws fractional scores from `--rating` and `--max`. `data-size="sm|lg"`. React `<Rating value onValueChange max label readOnly />`.
- **Steps**: progress through a fixed sequence, horizontal or vertical (`.bk-steps`, `.bk-step[data-status="complete|current|upcoming"]`). React `<Steps steps current orientation />`.
- **Timeline**: events with markers, optional icons and tones, and `<time>` stamps (`.bk-timeline`, `.bk-timeline-item[data-tone]`). React `<Timeline>` and `<TimelineItem title time dateTime icon tone>`.
- **Data list**: labelled values as a `<dl>` (`.bk-data-list`, `.bk-data-list-item`), side by side or `data-orientation="vertical"`. React `<DataList>` and `<DataListItem label>`.
- **Tip**: a pencil character with a speech bubble for hints, empty-state advice and announcements. Five tints, character on either side, optional actions and dismiss. React `<Tip character mood title actions onDismiss />`; HTML `.bk-tip` with `data-side`, `data-tone` and a `data-bk-dismiss` button.

### Changed

- `placePopover` sets `--anchor-width` on the popover to the trigger's width.
- React `Calendar` keyboard: the grid is one Tab stop (roving tabindex) instead of one per day. Arrow keys continue into the next or previous month; Home/End, Page Up/Page Down and Shift+Page Up/Down are added. Days rejected by `isDisabled` now use `aria-disabled` instead of `disabled`, so arrow keys can pass over them. If you styled them with `:disabled`, add `[aria-disabled="true"]`. Day buttons carry `data-date="YYYY-MM-DD"`.
- Added contrast tests for `muted-foreground` on `accent` and on `popover`, and 3:1 tests for `warning` (filled rating stars) on `card` and `background`.

## [0.2.2] - 2026-11-24

### Changed

- Fixed focus-style specificity so search inputs and OTP fields do not receive an extra global outline; search highlights its shared row boundary.

- Toasts retain remaining reading time while hovered, keyboard-focused or in a hidden tab. Persistent toasts remain persistent after interaction; dismissing removes visibility listeners and repeated clicks cannot repeat an action.
- Popover animation origins follow their triggers, including flipped and viewport-clamped placement.
- Card and toast text can wrap long names and addresses; added a narrow-card example with multilingual content.
- Native `hidden` attributes are respected inside the library scope, including flex layouts.
- Added working archive/undo and inline validation examples; the displayed JavaScript is the same code executed by their previews.
- Condensed the npm README around installation, supported stacks and working examples.
- Improved code sample readability with four-space nesting, one HTML attribute per line and clean element boundaries; copy preserves source whitespace.
- Restricted tile hover lift to precise pointers, added subtle enabled-button press feedback, and made command palette opening immediate.
- Refined the default light and dark palettes with neutral surfaces, the original orange brand accent and quieter tile tints. Token names and component APIs are unchanged; existing interfaces will adopt the new appearance on update.
- Rebuilt the documentation introduction around an interactive workspace preview and an example gallery.
- Shortened the README to focus on previews, installation and useful documentation paths.
- Removed the standalone playground and `/kit/` route; component pages are the primary place to explore examples.

### Added

- Eleven additional component-level examples across Card, Table, Stat and Empty state, plus consistent code formatting with `npm run docs:format`.
- Copyable dashboard, workspace settings, subscription and onboarding examples, indexed in navigation, search and agent documentation.
- Relevant npm keywords for TypeScript, Next.js, design tokens and agent-readable documentation.

## [0.2.1] - 2026-11-21

First release on npm.

### Added

- Published to npm as [`bento-shad-ui`](https://www.npmjs.com/package/bento-shad-ui): `npm install bento-shad-ui` (pnpm, yarn and bun too).
- `.github/workflows/publish.yml`: publishing a GitHub release puts the version on npm through trusted publishing, with provenance.

### Changed

- Install commands in the docs, README and `llms.txt` use npm instead of `github:SaadNiaziDev/bento-shad-ui#tag`. Installing from GitHub still works, for unreleased commits and forks.
- CDN links use jsDelivr's npm route (`cdn.jsdelivr.net/npm/bento-shad-ui@0.2.1/…`); unpkg works as well.
- README rewritten for npmjs.com: absolute image and link URLs, npm badges, a characters section and a table of every import path.

## [0.2.0] - 2026-11-21

### Added

- **Pencil characters**: eight original hand-drawn characters, four people (Mira, Theo, Zara, Kofi) and four animals (Pip the owl, Dumpling the cat, Biscuit the dachshund, Moss the turtle). Each has six moods: neutral, happy, surprised, sad, thinking, sleepy.
  - Graphite lines in `currentColor` (re-coloured with `--pencil`), hatching, and coloured-pencil fills from the tint tokens, so they follow the theme and dark mode.
  - `bento-shad-ui/illustrations`: `renderCharacter(id, mood, options)`, `characters`, `moods`, typed and SSR-safe.
  - React: `<PencilCharacter character mood size label />`, re-exported from `bento-shad-ui/react`.
  - HTML: `dist/illustrations.iife.min.js` draws every `[data-bk-character]` and redraws when `data-mood` changes.
  - 48 standalone SVGs with plain colours in `dist/illustrations/` (for `<img>`, Figma, Flutter via `flutter_svg`) plus `index.json`.
- `Empty` gets an `illustration` slot; CSS `.bk-illustration` and `.bk-empty-illustration`.
- Docs: Characters page with a live mood switcher, Biscuit on the 404 page, the cast on the home page.

## [0.1.2] - 2026-11-21

### Added

- Documentation website at https://saadniazidev.github.io/bento-shad-ui/: a landing page, sidebar navigation, a page per component with live previews and Preview/HTML tabs, syntax-highlighted code with copy buttons, props tables generated from the TypeScript types, ⌘K search, "On this page" contents, previous/next links, Edit on GitHub, Copy page as Markdown, light/dark, sitemap and 404.
- 47 component pages and a Typography guide in `docs/`. `llms-full.txt` now includes every component page.
- JSDoc descriptions for every React prop, so editors show them on hover.
- `npm run docs` and `npm run docs:serve`. CI builds the site; Pages deploys it.

### Fixed

- `code`, `kbd`, `pre` and `samp` inside `.bk` no longer fall back to the browser's monospace font.

### Changed

- The live kit moved from `index.html` to `site/kit.html` and is served at `/kit/`.

## [0.1.1] - 2026-11-21

### Fixed

- Docs: the shadcn theme must be installed with `npx shadcn@latest add …/bento-theme.json --overwrite`. Without the flag, shadcn keeps its own `--primary`, `--radius` and `--font-sans`, leaving a half-applied theme. Verified on a fresh Next.js 15 + Tailwind v4 app.
- Docs: `llms-full.txt` is about 75 KB, not 60 KB.

## [0.1.0] - 2026-11-21

First public release.

### Added

- Design tokens (`src/tokens.json`): shadcn/ui colour names plus `brand`, `destructive-foreground`, `success`, `warning`, `info`, `inverse` and five tile tints; light and dark; OKLCH output.
- Fonts: Red Hat Display (headings) and Red Hat Text (body). No monospace font.
- `bento.css`: bento grid with container queries, tiles with spans, rows and tones, and 47 components.
- Vanilla core in TypeScript (`bento-shad-ui`, `bento-shad-ui/auto`, `bento.iife.js`): theme switching with flash-free `themeScript`, toasts, popover placement, tabs, command palette, calendar, OTP, slider, dropzone, dialogs via data attributes. SSR-safe.
- React components (`bento-shad-ui/react`): typed, ref-forwarding, controlled or uncontrolled, `asChild` for router links, `"use client"` bundle.
- shadcn/ui: `shadcn-theme.css` for Tailwind v4 and registry items `bento-theme` and `bento-grid`.
- Flutter: `bento_theme.dart` with `ThemeData` for both modes and a `BentoColors` theme extension.
- Docs for HTML, React, shadcn, Flutter, theming, layout, components, JS API, accessibility and AI agents; `llms.txt` and `llms-full.txt`.
- Tests: token parity, WCAG contrast, build output, React rendering and pure helpers. CI and GitHub Pages workflows.

[0.2.1]: https://github.com/SaadNiaziDev/bento-shad-ui/releases/tag/v0.2.1
[0.2.0]: https://github.com/SaadNiaziDev/bento-shad-ui/releases/tag/v0.2.0
[0.1.2]: https://github.com/SaadNiaziDev/bento-shad-ui/releases/tag/v0.1.2
[0.1.1]: https://github.com/SaadNiaziDev/bento-shad-ui/releases/tag/v0.1.1
[0.1.0]: https://github.com/SaadNiaziDev/bento-shad-ui/releases/tag/v0.1.0
