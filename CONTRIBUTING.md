# Contributing

Thanks for helping. The short version: edit `src/` and `docs/`, run `npm run check`, commit the regenerated `dist/` with your change.

## Setup

```bash
git clone https://github.com/SaadNiaziDev/bento-shad-ui.git
cd bento-shad-ui
npm install
npm run check
npm run docs:serve   # http://localhost:4321/bento-shad-ui/
```

Node 18+ is required. Dev dependencies: TypeScript and esbuild (build), React (types and render tests), marked and Shiki (docs site).

## Making a change

1. **Tokens**: edit `src/tokens.json` (both `light` and `dark`). If you add a pair that carries text, add it to `test/tokens.test.mjs`.
2. **CSS**: edit `src/css/components.css`. Use tokens; follow the `bk-` prefix and `data-*` variant pattern.
3. **Behaviour**: `src/core/` for the vanilla script, `src/react/` for React. Keep the core SSR-safe.
4. **Docs**: new components get a page in `docs/components/` (see AGENTS.md for the format), a link in `docs/components.md` and a tile in `site/kit.html`. Document every prop with JSDoc; the props tables are generated from it.
5. `npm run check`. CI fails if `dist/` is out of date or a test fails.

## Commit messages

Use the imperative mood and a scope when it helps: `button: add icon-lg size`, `tokens: darken warning for contrast`, `docs: Flutter fonts`.

## Releases

Maintainers release by tagging `vX.Y.Z` and publishing a GitHub release. The publish workflow then puts that version on npm with provenance. See "Releasing" in [AGENTS.md](https://github.com/SaadNiaziDev/bento-shad-ui/blob/main/AGENTS.md).

## Reporting bugs

Open an issue with the browser, the stack (HTML / React / shadcn / Flutter), the smallest markup or code that shows the problem, and what you expected.
