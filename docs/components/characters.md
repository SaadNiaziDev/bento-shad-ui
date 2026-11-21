---
title: Characters
description: Eight hand-drawn pencil characters, four people and four animals, each with six moods. Use them for empty states, errors, loading, success and onboarding.
group: Illustrations
---

<!-- character-gallery -->

Pick a mood on any card to see it. Every character is drawn by the same pencil kit: graphite lines drawn twice and slightly wobbled, hatching for shadows, and coloured-pencil fills taken from the tint tokens. Lines follow the text colour, so in dark mode they turn into chalk on dark paper.

## Usage

```tsx
import { PencilCharacter, Empty, Button } from 'bento-shad-ui/react';

<PencilCharacter character="pip" mood="thinking" size={160} />

<Empty
  illustration={<PencilCharacter character="pip" mood="thinking" />}
  title="No trips yet"
  description="Trips you plan or get invited to show up here."
  actions={<Button>Plan a trip</Button>}
/>
```

In HTML, load the illustrations script once. It draws every element with `data-bk-character`, including ones added later, and redraws when `data-mood` changes:

```html
<script src="https://cdn.jsdelivr.net/gh/SaadNiaziDev/bento-shad-ui@v0.2.0/dist/illustrations.iife.min.js" defer></script>

<span data-bk-character="moss" data-mood="sleepy" data-size="140" aria-label="Moss the turtle, waiting"></span>
```

```js
document.querySelector('[data-bk-character]').dataset.mood = 'happy'; // redraws
```

Or use a ready-made file. These use plain colours instead of tokens, so they work in `<img>`, email, Figma and Flutter:

```html
<img src="https://cdn.jsdelivr.net/gh/SaadNiaziDev/bento-shad-ui@v0.2.0/dist/illustrations/biscuit-surprised.svg" width="160" height="160" alt="">
```

Files are named `<character>-<mood>.svg`, for example `pip-thinking.svg`. `dist/illustrations/index.json` lists all of them.

### Any JavaScript

```ts
import { renderCharacter, characters, moods } from 'bento-shad-ui/illustrations';

el.innerHTML = renderCharacter('dumpling', 'sad', { title: 'Dumpling the cat, looking sorry' });
characters.map((c) => c.name); // ['Mira', 'Theo', 'Zara', 'Kofi', 'Pip', 'Dumpling', 'Biscuit', 'Moss']
```

`renderCharacter` is a pure function that returns an SVG string, so it also works on the server and in build scripts. Pass a unique `idPrefix` when you render the same character more than once on a page.

### Flutter

Copy the SVG files into `assets/characters/` and draw them with `flutter_svg`. The pencil uses `currentColor`, so `SvgTheme` sets it:

```dart
SvgPicture.asset(
  'assets/characters/pip-thinking.svg',
  width: 160,
  theme: SvgTheme(currentColor: Theme.of(context).extension<BentoColors>()!.foreground),
)
```

## Which character for which moment

| Situation | Character and mood |
|---|---|
| Empty list, no search results | Pip, `thinking` |
| Loading, waiting, slow connection | Moss, `sleepy` |
| Success, booking confirmed | Mira, `happy` |
| Error, failed action | Dumpling, `sad` |
| Page not found | Biscuit, `surprised` |
| Offline, no messages | Zara, `sad` |
| Welcome, guided tour, tips | Theo, `neutral` or `happy` |
| Achievement, first trip planned | Kofi, `happy` |

## Moods

| Mood | Face | Extra |
|---|---|---|
| `neutral` | Open eyes, soft smile | Light blush |
| `happy` | Closed smiling eyes, open smile | Blush |
| `surprised` | Wide eyes, raised brows, round mouth | Motion lines |
| `sad` | Drooping brows, frown | A tear |
| `thinking` | Eyes looking up, one brow raised | Thought bubble with "?" |
| `sleepy` | Closed eyes, small mouth | "z z" |

## Changing the pencil colour

The graphite colour is `--pencil`, which defaults to a mix of `--foreground` and `--background`. Override it on any parent:

```css
.onboarding { --pencil: var(--brand); }
```

## API

<!-- props: PencilCharacterProps -->

## Accessibility

- Characters are decorative by default: the SVG is hidden from screen readers. Pass `label` (React) or `aria-label` (HTML) only when the drawing adds meaning the text around it doesn't already give.
- Never put information only in the drawing. An empty state still needs its title and description.
- The drawings have no animation, so they're unaffected by reduced-motion settings.
