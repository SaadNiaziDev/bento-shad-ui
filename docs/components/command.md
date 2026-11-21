---
title: Command
description: A searchable list of actions and pages with keyboard navigation, inline or as a ⌘K palette.
group: Overlays
---

```html preview full
<div class="bk-command" data-inline>
  <div class="bk-command-search"><svg class="bk-icon" aria-hidden="true"><use href="#i-search"/></svg><input class="bk-command-input" placeholder="Type a command or search" aria-label="Command"></div>
  <div class="bk-command-list" role="listbox">
    <div class="bk-command-group"><div class="bk-command-group-heading">Trips</div>
      <div class="bk-command-item" role="option"><svg class="bk-icon" aria-hidden="true"><use href="#i-plane"/></svg>Lisbon, 12–16 March</div>
      <div class="bk-command-item" role="option"><svg class="bk-icon" aria-hidden="true"><use href="#i-plane"/></svg>Porto, 2–5 April</div>
    </div>
    <div class="bk-command-group"><div class="bk-command-group-heading">Actions</div>
      <div class="bk-command-item" role="option" data-keywords="new create"><svg class="bk-icon" aria-hidden="true"><use href="#i-plus"/></svg>New trip<span class="bk-kbd-group"><kbd class="bk-kbd">N</kbd></span></div>
      <div class="bk-command-item" role="option" data-keywords="preferences"><svg class="bk-icon" aria-hidden="true"><use href="#i-sliders"/></svg>Settings</div>
    </div>
    <div class="bk-command-empty" hidden>No results.</div>
  </div>
</div>
```

Type to filter. This site's own search (⌘K) is the same component.

## Usage

```tsx
import { Command, CommandDialog } from 'bento-shad-ui/react';

const groups = [
  { heading: 'Trips', items: [{ id: 'lis', label: 'Lisbon, 12–16 March', keywords: ['portugal'], onSelect: () => router.push('/trips/lis') }] },
  { heading: 'Actions', items: [{ id: 'new', label: 'New trip', shortcut: ['N'], onSelect: createTrip }] },
];

<Command groups={groups} />

const [open, setOpen] = useState(false); // ⌘K / Ctrl+K toggles it
<CommandDialog open={open} onOpenChange={setOpen} groups={groups} />
```

`filterCommandGroups(groups, query)` is exported if you build your own list.

### HTML

```html
<button class="bk-button" data-bk-open="cmd">Search</button>
<dialog class="bk-command" id="cmd" data-bk-hotkey aria-label="Search">
  <div class="bk-command-search"><input class="bk-command-input" aria-label="Search"></div>
  <div class="bk-command-list" role="listbox">
    <div class="bk-command-group"><div class="bk-command-group-heading">Trips</div>
      <a class="bk-command-item" role="option" href="/trips/lisbon" data-keywords="portugal">Lisbon</a>
    </div>
    <div class="bk-command-empty" hidden>No results.</div>
  </div>
</dialog>
```

`data-bk-hotkey` makes ⌘K / Ctrl+K open it. Items can be links or have click handlers; `data-keywords` adds hidden search terms.

## API

### Command

<!-- props: CommandProps -->

### CommandDialog

<!-- props: CommandDialogProps -->

## Accessibility

- The input is a combobox that controls the list. `aria-activedescendant` points at the highlighted option, so screen readers follow it while focus stays in the input.
- ↑/↓ move, Enter runs the highlighted item, Esc closes the dialog.
