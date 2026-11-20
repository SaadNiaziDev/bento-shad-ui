# Using bento-shad-ui with AI coding agents

The library ships documentation written for language models, so an agent (Claude Code, Cursor, Copilot, Codex…) can build UIs with it correctly in any project.

## Files for agents

| File | Use |
|---|---|
| `llms.txt` | Short index in the llmstxt.org format: what the library is, with links to every guide |
| `llms-full.txt` | Every guide in one file (about 75 KB). Give this to an agent that has to write UI code |

Where to find them:

- installed: `node_modules/bento-shad-ui/llms.txt` and `node_modules/bento-shad-ui/llms-full.txt`
- online: `https://raw.githubusercontent.com/SaadNiaziDev/bento-shad-ui/main/llms-full.txt`
- site: `https://saadniazidev.github.io/bento-shad-ui/llms-full.txt`

## Add this to the project's CLAUDE.md / AGENTS.md / .cursorrules

```markdown
## UI: bento-shad-ui

This project's UI uses bento-shad-ui (https://github.com/SaadNiaziDev/bento-shad-ui).
Before writing UI code, read node_modules/bento-shad-ui/llms-full.txt.

- Layout pages as bento grids: BentoGrid + Tile (React) or .bk-bento > .bk-bento-grid > .bk-tile (HTML).
  One idea per tile; spans in a row add up to 4; at most one toned tile in four; one inverse tile per view.
- Use library components before writing new ones. React: import from 'bento-shad-ui/react'.
- Colours come only from tokens (var(--primary), var(--muted-foreground), var(--tint-peach)…). Never hard-code hex or Tailwind palette colours.
- Fonts: Red Hat Text (body) and Red Hat Display (headings). No monospace font anywhere, not even for code.
- Variants are props in React (variant, size, tone) and data attributes in HTML (data-variant, data-size, data-tone).
- Dark mode is automatic through tokens. Don't write dark: overrides for colours.
- Icon-only buttons need aria-label; charts need a label; inputs go inside <Field>.
- Use the styles ending in -foreground for text on a coloured surface.
```

## Prompts that work well

- "Build the settings page as a single `Card` with `Field`s and `Switch` rows, using bento-shad-ui/react."
- "Make the dashboard a 4-column `BentoGrid`: sidebar `rows={3}`, three `Stat` tiles, a `BarChart` tile `span={2}`, an activity `List` tile `rows={2}`, a `Table` tile `span={2}`."
- "Convert this page to bento-shad-ui HTML classes and the CDN script. Keep the copy."

## Check an agent's output

- No `#hex`, `rgb()` or Tailwind colour utilities (`bg-blue-500`) in new code; only tokens or `bg-tint-*`/`bg-brand` in shadcn projects.
- No `font-mono`, monospace font stacks, Inter, Geist or other fonts.
- Spans add up per row at 4 columns, and the page still reads at 2 and 1 columns.
- Every icon-only button has `aria-label`.
