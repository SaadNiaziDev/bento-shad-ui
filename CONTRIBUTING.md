# Contributing

Thanks for helping. The short version: edit `src/` and `docs/`, run `npm run check`, commit the regenerated `dist/` with your change.

## Setup

```bash
git clone https://github.com/SaadNiaziDev/bento-shad-ui.git
cd bento-shad-ui
npm install
npm run check
open index.html
```

Node 18+ is required. The only dev dependencies are TypeScript, esbuild and React (for types and render tests).

## Making a change

1. **Tokens**: edit `src/tokens.json` (both `light` and `dark`). If you add a pair that carries text, add it to `test/tokens.test.mjs`.
2. **CSS**: edit `src/css/components.css`. Use tokens; follow the `bk-` prefix and `data-*` variant pattern.
3. **Behaviour**: `src/core/` for the vanilla script, `src/react/` for React. Keep the core SSR-safe.
4. **Docs**: update `docs/components.md` and add a tile to `index.html` for new components.
5. `npm run check`. CI fails if `dist/` is out of date or a test fails.

## Commit messages

Use the imperative mood and a scope when it helps: `button: add icon-lg size`, `tokens: darken warning for contrast`, `docs: Flutter fonts`.

## Reporting bugs

Open an issue with the browser, the stack (HTML / React / shadcn / Flutter), the smallest markup or code that shows the problem, and what you expected.
