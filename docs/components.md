# Components

47 components and 8 illustrated characters, each with a live preview, HTML markup, React usage, a props table generated from the TypeScript source, and accessibility notes.

## Layout

- [Bento grid](components/bento-grid.md): the grid, tiles, spans, rows and tones
- [Card](components/card.md): header, action, content and footer for standalone content
- [Stack and Row](components/stack.md): spacing helpers
- [Separator](components/separator.md): horizontal and vertical rules
- [Media](components/media.md): aspect-ratio box for images and video

## Actions

- [Button](components/button.md): seven variants, seven sizes, loading, `asChild`
- [Button group](components/button-group.md): joined buttons and split buttons
- [Toggle](components/toggle.md): pressed buttons and segmented controls
- [Kbd](components/kbd.md): keyboard keys
- [Tooltip](components/tooltip.md): CSS-only labels on hover and focus

## Forms

- [Field](components/field.md): label, help text and error, wired automatically
- [Input](components/input.md), [Textarea](components/textarea.md), [Select](components/select.md)
- [Input group](components/input-group.md): icons and hints inside an input
- [Checkbox](components/checkbox.md), [Radio group](components/radio-group.md), [Choice card](components/choice-card.md), [Switch](components/switch.md)
- [Slider](components/slider.md), [Input OTP](components/input-otp.md), [Dropzone](components/dropzone.md), [Calendar](components/calendar.md)

## Data display

- [Badge](components/badge.md), [Avatar](components/avatar.md)
- [Table](components/table.md), [List](components/list.md)
- [Stat](components/stat.md) with sparkline, [Bar chart](components/bar-chart.md) with meter and legend, [Progress](components/progress.md) with ring
- [Accordion](components/accordion.md)

## Feedback

- [Alert](components/alert.md), [Toast](components/toast.md), [Empty state](components/empty.md), [Skeleton](components/skeleton.md), [Spinner](components/spinner.md)

## Overlays

- [Dialog](components/dialog.md), [Sheet](components/sheet.md), [Dropdown menu](components/dropdown-menu.md), [Popover](components/popover.md), [Command](components/command.md)

## Navigation

- [Tabs](components/tabs.md), [Breadcrumb](components/breadcrumb.md), [Pagination](components/pagination.md), [Navbar](components/navbar.md), [Sidebar](components/sidebar.md), [Bottom nav](components/bottom-nav.md)

## Illustrations

- [Characters](components/characters.md): eight pencil-drawn people and animals with six moods each, for empty states, errors, loading and success

## Conventions

- **HTML**: every component is markup plus `bk-` classes. Variants are `data-variant`, `data-size` and `data-tone` attributes. The optional script ([JavaScript API](javascript-api.md)) adds behaviour through `data-bk-*` attributes.
- **React**: `import { … } from 'bento-shad-ui/react'`. Every component forwards `ref` and passes unknown props (`id`, `aria-*`, `data-*`, event handlers) to its root element. Stateful components work controlled (`value` + `onValueChange`) or uncontrolled (`defaultValue`). Link-like components take `asChild` for router links.
- **Icons**: the library ships none. Any 24px stroke icon works; lucide-react matches best. In HTML, give inline SVGs `class="bk-icon"`; in React, pass the icon element, and SVGs inside buttons, menu items and similar are sized for you.
