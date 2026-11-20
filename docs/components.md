# Components

Every component is listed with its HTML markup and its React equivalent (`import { … } from 'bento-shad-ui/react'`). In HTML, variants are `data-*` attributes; in React they are props. The live kit (`index.html`) shows each one with a **Code** button.

Shared conventions:

- Icon slots take any SVG. In HTML give inline SVGs `class="bk-icon"`. In React pass any icon element (lucide-react recommended).
- Every React component forwards `ref` and passes unknown props (`id`, `aria-*`, `data-*`, handlers) to its root element.
- Stateful React components work both controlled (`value` + `onValueChange`) and uncontrolled (`defaultValue`).

---

## Layout

### BentoGrid and Tile

```html
<div class="bk-bento">
  <div class="bk-bento-grid" data-cols="4">
    <article class="bk-tile bk-span-2 bk-row-2" data-tone="inverse">…</article>
    <article class="bk-tile" data-tone="peach" data-interactive>…</article>
  </div>
</div>
```

```tsx
<BentoGrid cols={4}>
  <Tile span={2} rows={2} tone="inverse">…</Tile>
  <Tile tone="peach" interactive asChild><a href="/maps">…</a></Tile>
</BentoGrid>
```

| Tile prop / attribute | Values |
|---|---|
| `span` / `bk-span-N` | `1` `2` `3` `4` `"full"` |
| `rows` / `bk-row-N` | `1` `2` `3` |
| `tone` / `data-tone` | `default` `muted` `peach` `sky` `mint` `lilac` `butter` `inverse` `brand` |
| `interactive` / `data-interactive` | Lifts on hover |
| `center` / `data-center` | Centres content |
| `as` | `div` (default) `article` `section` `aside` `li` `a` `nav` `form` |

Parts: `TileHeader` (`.bk-tile-header`), `TileTitle` (`.bk-tile-title`, h3), `TileDescription` (`.bk-tile-description`), `TileFooter` (`.bk-tile-footer`, pinned to the bottom), `TileMedia` (`.bk-tile-media`, bleeds to the top edge), `Eyebrow` (`.bk-eyebrow`).

### Card

shadcn anatomy, for content outside a bento grid (forms, settings).

```html
<div class="bk-card">
  <div class="bk-card-header">
    <h3 class="bk-card-title">Profile</h3>
    <div class="bk-card-action"><span class="bk-badge" data-variant="success">Verified</span></div>
    <p class="bk-card-description">How other travellers see you.</p>
  </div>
  <div class="bk-card-content">…</div>
  <div class="bk-card-footer">…</div>
</div>
```

```tsx
<Card>
  <CardHeader><CardTitle>Profile</CardTitle><CardAction><Badge>Verified</Badge></CardAction><CardDescription>…</CardDescription></CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>…</CardFooter>
</Card>
```

### Stack, Row, Separator, Media, Container

```html
<div class="bk-stack" style="--gap: 16px">…</div>
<div class="bk-row bk-between">…</div>
<hr class="bk-separator">  <hr class="bk-separator" data-orientation="vertical">
<div class="bk-media" style="--ratio: 4 / 3"><img src="…" alt="…"><span class="bk-media-caption">Alfama</span></div>
<main class="bk-container">…</main>
```

```tsx
<Stack gap={16}>…</Stack>  <Row between gap={8}>…</Row>  <Separator orientation="vertical" />
<Media ratio="4 / 3" caption="Alfama"><img src="…" alt="…" /></Media>
```

### Typography

| Class | Use |
|---|---|
| `bk-display` | Hero headline (fluid 40–68px, Red Hat Display 800) |
| `bk-h1` `bk-h2` `bk-h3` `bk-h4` | Headings 40 / 30 / 24 / 20px |
| `bk-lead` | Intro paragraph, 20px muted |
| `bk-p` | Body copy, 16px, 1.75 line height, 68ch max |
| `bk-large` `bk-small` `bk-muted` `bk-caption` | 18px semibold / 14px medium / 14px muted / 12px muted |
| `bk-eyebrow` | 11px uppercase label |
| `bk-num` | Big tabular number |
| `bk-code` | Inline code chip (sans font, tabular figures) |
| `bk-codeblock` | Preformatted block |
| `bk-blockquote` | Quote with brand rule |
| `bk-truncate` `bk-sr-only` | One-line ellipsis / visually hidden |

---

## Actions

### Button

```html
<button class="bk-button">Book trip</button>
<button class="bk-button" data-variant="outline" data-size="sm"><svg class="bk-icon">…</svg>Share</button>
<button class="bk-button" data-size="icon" aria-label="Add"><svg class="bk-icon">…</svg></button>
<button class="bk-button" data-loading disabled><span class="bk-spinner" data-size="sm"></span>Saving</button>
<a class="bk-button" data-variant="link" href="/terms">View terms</a>
```

```tsx
<Button>Book trip</Button>
<Button variant="outline" size="sm"><Share2 />Share</Button>
<Button size="icon" aria-label="Add"><Plus /></Button>
<Button loading>Saving</Button>
<Button asChild variant="link"><Link href="/terms">View terms</Link></Button>
```

| Prop | Values |
|---|---|
| `variant` | `default` `brand` `secondary` `outline` `ghost` `destructive` `link` |
| `size` | `xs` (28px) `sm` (34) `default` (40) `lg` (46) `icon` `icon-sm` `icon-lg` |
| `loading` | Spinner, `aria-busy`, disabled |
| `block` / `data-block` | Full width |
| `asChild` | Style a link or router `Link` as a button |

### ButtonGroup

```html
<div class="bk-button-group" role="group" aria-label="Range">
  <button class="bk-button" data-variant="outline" data-size="sm">Day</button>
  <button class="bk-button" data-variant="outline" data-size="sm">Week</button>
</div>
```

```tsx
<ButtonGroup aria-label="Range"><Button variant="outline" size="sm">Day</Button><Button variant="outline" size="sm">Week</Button></ButtonGroup>
```

### Toggle and ToggleGroup

```html
<button class="bk-toggle" data-variant="outline" aria-pressed="true" aria-label="Bold">…</button>
<div class="bk-toggle-group" data-type="single" role="group" aria-label="Alignment">
  <button class="bk-toggle" aria-pressed="true" aria-label="Left">…</button>
  <button class="bk-toggle" aria-pressed="false" aria-label="Center">…</button>
</div>
```

```tsx
<Toggle variant="outline" defaultPressed aria-label="Bold"><Bold /></Toggle>
<ToggleGroup type="single" defaultValue="left" aria-label="Alignment">
  <Toggle value="left" aria-label="Left"><AlignLeft /></Toggle>
  <Toggle value="center" aria-label="Center"><AlignCenter /></Toggle>
</ToggleGroup>
<ToggleGroup type="multiple" value={styles} onValueChange={setStyles}>…</ToggleGroup>
```

### Kbd

```html
<span class="bk-kbd-group"><kbd class="bk-kbd">⌘</kbd><kbd class="bk-kbd">K</kbd></span>
```

```tsx
<KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
```

### Tooltip

CSS-only; shows on hover and keyboard focus. Plain text only.

```html
<button class="bk-button" data-variant="outline" data-size="icon" aria-label="Copy link" data-bk-tooltip="Copy link" data-bk-tooltip-side="bottom">…</button>
```

```tsx
<Tooltip content="Copy link" side="bottom"><Button variant="outline" size="icon" aria-label="Copy link"><Link2 /></Button></Tooltip>
```

---

## Forms

### Field, Label, Input, Textarea, Select

```html
<div class="bk-field">
  <label class="bk-label" for="email">Email</label>
  <input class="bk-input" id="email" type="email" aria-describedby="email-d">
  <p class="bk-field-description" id="email-d">We'll send the itinerary here.</p>
</div>
<div class="bk-field">
  <label class="bk-label" for="code">Promo code</label>
  <input class="bk-input" id="code" aria-invalid="true" aria-describedby="code-e">
  <p class="bk-field-error" id="code-e">This code expired on 31 August.</p>
</div>
<textarea class="bk-textarea"></textarea>
<select class="bk-select"><option>Lisbon</option></select>
```

```tsx
<Field label="Email" description="We'll send the itinerary here." required>
  <Input type="email" name="email" />
</Field>
<Field label="Promo code" error="This code expired on 31 August."><Input defaultValue="SUMMER" /></Field>
<Field label="Notes"><Textarea /></Field>
<Field label="Destination"><Select><option>Lisbon</option></Select></Field>
```

`Field` generates the id and sets `htmlFor`, `aria-describedby` and `aria-invalid`. `Input`, `Textarea` and `Select` also accept `invalid`.

Layout helpers: `bk-form` (vertical stack, 16px), `bk-form-row` (fields side by side, wraps), `bk-fieldset` with a `legend`.

### InputGroup (icon, shortcut)

```html
<div class="bk-input-group">
  <svg class="bk-icon">…</svg>
  <input class="bk-input" type="search" placeholder="Search trips" aria-label="Search trips">
  <span class="bk-input-end bk-kbd-group"><kbd class="bk-kbd">⌘</kbd><kbd class="bk-kbd">K</kbd></span>
</div>
```

```tsx
<InputGroup icon={<Search />} end={<KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>}>
  <Input type="search" placeholder="Search trips" aria-label="Search trips" />
</InputGroup>
```

### Checkbox, Radio, RadioGroup

```html
<label class="bk-option">
  <input class="bk-checkbox" type="checkbox" checked>
  <span class="bk-option-text"><span>Window seat</span><span>Free on flights over 2 hours</span></span>
</label>
<input class="bk-checkbox" type="checkbox" data-indeterminate>  <!-- indeterminate via script -->
<fieldset class="bk-radio-group">
  <legend class="bk-sr-only">Cabin class</legend>
  <label class="bk-option"><input class="bk-radio" type="radio" name="cabin" checked><span>Economy</span></label>
</fieldset>
```

```tsx
<Checkbox label="Window seat" description="Free on flights over 2 hours" defaultChecked />
<Checkbox indeterminate label="All extras" />
<RadioGroup legend="Cabin class" defaultValue="economy" onValueChange={setCabin}>
  <Radio value="economy" label="Economy" />
  <Radio value="business" label="Business" />
</RadioGroup>
```

### ChoiceCard

```html
<label class="bk-choice">
  <input class="bk-radio" type="radio" name="plan" checked>
  <span class="bk-option-text"><span>Plus</span><span>Unlimited trips</span></span>
  <span class="bk-choice-price">€4/mo</span>
</label>
```

```tsx
<RadioGroup legend="Plan" defaultValue="free">
  <ChoiceCard value="free" label="Free" description="3 trips" aside="€0" />
  <ChoiceCard value="plus" label="Plus" description="Unlimited trips" aside="€4/mo" />
</RadioGroup>
```

### Switch

```html
<label class="bk-switch-row"><span>Price alerts</span><input class="bk-switch" type="checkbox" role="switch" checked></label>
<input class="bk-switch" type="checkbox" role="switch" data-tone="brand" aria-label="Offline maps">
```

```tsx
<Switch label="Price alerts" description="When a saved fare drops" defaultChecked />
<Switch tone="brand" aria-label="Offline maps" checked={on} onCheckedChange={setOn} />
```

### Slider

```html
<label class="bk-label" for="price">Max price</label> <output for="price">€140</output>
<input class="bk-slider" id="price" type="range" min="40" max="400" step="10" value="140" data-prefix="€">
```

```tsx
<Field label="Max price"><Slider min={40} max={400} step={10} value={price} onValueChange={setPrice} /></Field>
```

### InputOTP

```html
<div class="bk-otp" role="group" aria-label="Verification code">
  <div class="bk-otp-group"><input inputmode="numeric" maxlength="1" aria-label="Digit 1">…</div>
  <span class="bk-otp-separator" aria-hidden="true"></span>
  <div class="bk-otp-group">…</div>
</div>
```

```tsx
<InputOTP groups={[3, 3]} aria-label="Verification code" onComplete={(code) => verify(code)} />
```

### Dropzone

```html
<label class="bk-dropzone">
  <input type="file" multiple accept="image/*,.pdf">
  <svg class="bk-icon" data-size="lg">…</svg>
  <span class="bk-small">Drop files or click to upload</span>
  <span class="bk-caption">PNG, JPG or PDF, up to 10 MB</span>
  <span class="bk-dropzone-files"></span>
</label>
```

```tsx
<Dropzone multiple accept="image/*,.pdf" icon={<Upload />} hint="PNG, JPG or PDF, up to 10 MB" onFiles={(files) => upload(files)} />
```

### Calendar

```html
<div class="bk-calendar" data-mode="range">
  <div class="bk-calendar-head">…prev · <span class="bk-calendar-title">March 2026</span> · next…</div>
  <div class="bk-calendar-grid">
    <span class="bk-calendar-weekday">Mo</span>…
    <button class="bk-calendar-day" data-outside tabindex="-1">23</button>
    <button class="bk-calendar-day" data-range="start" aria-selected="true">12</button>
    <button class="bk-calendar-day" data-range="middle">13</button>
    <button class="bk-calendar-day" data-today>9</button>
  </div>
</div>
```

```tsx
<Calendar mode="range" value={range} onValueChange={setRange} />
<Calendar defaultValue={new Date(2026, 2, 12)} isDisabled={(d) => d < today} weekStartsOn={0} locale="pt-PT" />
```

Helpers: `getMonthGrid(year, month, weekStartsOn)` returns the 42 days of a month view; `toDateKey(date)` gives `YYYY-MM-DD` in local time.

---

## Data display

### Badge

```html
<span class="bk-badge">Default</span>
<span class="bk-badge" data-variant="success" data-dot>Paid</span>
```

```tsx
<Badge variant="success" dot>Paid</Badge>
```

Variants: `default` `brand` `secondary` `outline` `destructive` `success` `warning` `info`.

### Avatar and AvatarGroup

```html
<span class="bk-avatar" data-size="lg" data-status="online"><img src="…" alt="Maya Kim"></span>
<span class="bk-avatar-group"><span class="bk-avatar">MK</span><span class="bk-avatar">+3</span></span>
```

```tsx
<Avatar src={user.photo} alt={user.name} fallback="MK" size="lg" status="online" />
<AvatarGroup><Avatar fallback="MK" /><Avatar fallback="+3" /></AvatarGroup>
```

Sizes `sm` (28) `default` (36) `lg` (48) `xl` (64); `shape="square"`; `status` `online` `busy` `offline`. A broken image falls back to `fallback`.

### Table

```html
<div class="bk-table-wrap">
  <table class="bk-table">
    <thead><tr><th>Guest</th><th data-align="end">Amount</th></tr></thead>
    <tbody><tr><td>Maya Kim</td><td data-align="end">€640.00</td></tr></tbody>
  </table>
</div>
```

```tsx
<Table>
  <TableHeader><TableRow><TableHead>Guest</TableHead><TableHead align="end">Amount</TableHead></TableRow></TableHeader>
  <TableBody><TableRow><TableCell>Maya Kim</TableCell><TableCell align="end">€640.00</TableCell></TableRow></TableBody>
  <TableCaption>4 bookings</TableCaption>
</Table>
```

### List

```html
<ul class="bk-list">
  <li class="bk-list-item">
    <span class="bk-avatar" data-size="sm">MK</span>
    <div class="bk-list-item-text"><span>Maya booked Lisbon</span><span>Hotel Chiado</span></div>
    <span class="bk-list-item-meta">2m</span>
  </li>
</ul>
```

```tsx
<List><ListItem leading={<Avatar size="sm" fallback="MK" />} title="Maya booked Lisbon" description="Hotel Chiado" meta="2m" /></List>
```

### Stat and Sparkline

```html
<div class="bk-stat">
  <span class="bk-stat-label">Bookings</span>
  <span class="bk-stat-value">1,284</span>
  <span class="bk-stat-delta" data-trend="up">+12.4% vs February</span>
</div>
<svg class="bk-spark" viewBox="0 0 100 32" preserveAspectRatio="none" role="img" aria-label="…"><polygon points="…"/><polyline points="…"/></svg>
```

```tsx
<Stat label="Bookings" value="1,284" delta="+12.4% vs February" trend="up" icon={<Calendar />} />
<Sparkline data={[12, 18, 15, 22, 19, 27, 31]} label="Bookings rose from 12 to 31 a day" />
```

`sparklinePoints(data, width, height, padding)` returns the SVG coordinates if you draw your own.

### BarChart, Legend, Meter

```html
<div class="bk-chart" role="img" aria-label="Mon 32, Tue 45, Sat 74">
  <div class="bk-bars" style="--h: 160px">
    <div class="bk-bar" data-muted style="--v: 40%" data-value="32"></div>
    <div class="bk-bar" style="--v: 92.5%" data-value="74" data-show></div>
  </div>
  <div class="bk-bar-labels"><span>Mon</span><span>Sat</span></div>
</div>
<div class="bk-meter" role="img" aria-label="Stay 46%, travel 22%"><span style="--v: 46%; --c: var(--chart-1)"></span>…</div>
<div class="bk-legend"><span style="--c: var(--chart-1)">Stay 46%</span></div>
```

```tsx
<BarChart data={[{ label: 'Mon', value: 32 }, { label: 'Sat', value: 74 }]} max={80} formatValue={(v) => `${v}`} />
<Meter segments={[{ label: 'Stay', value: 46, color: 'var(--chart-1)' }, { label: 'Travel', value: 22, color: 'var(--chart-2)' }]} />
<Legend items={[{ label: 'Stay 46%', color: 'var(--chart-1)' }]} />
```

`BarChart` scales bars against `max` (default: the largest value), draws quarter gridlines, emphasises the highest bar (`highlight={index | 'max' | 'none'}`) and builds an `aria-label` from the data. For complex charts use a chart library with the `--chart-1…5` colours.

### Progress, Ring

```html
<div class="bk-progress" data-tone="brand" role="progressbar" aria-label="Upload" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"><span style="--v: 40%"></span></div>
<div class="bk-ring" style="--p: 71; --size: 64px" role="img" aria-label="71% of budget used"><span>71%</span></div>
```

```tsx
<Progress value={40} tone="brand" label="Upload" />
<Ring value={71} size={64} label="71% of budget used" />
```

### Accordion

```html
<div class="bk-accordion">
  <details class="bk-accordion-item" open>
    <summary class="bk-accordion-trigger">Can I change my dates?</summary>
    <div class="bk-accordion-content">Yes, up to 48 hours before check-in.</div>
  </details>
</div>
```

```tsx
<Accordion><AccordionItem title="Can I change my dates?" defaultOpen>Yes, up to 48 hours before check-in.</AccordionItem></Accordion>
```

---

## Feedback

### Alert

```html
<div class="bk-alert" data-variant="warning" role="status">
  <svg class="bk-icon">…</svg>
  <div class="bk-alert-title">Passport expires soon</div>
  <div class="bk-alert-description">Some countries need 6 months of validity.</div>
  <div class="bk-alert-actions"><button class="bk-button" data-size="xs">Renew</button></div>
</div>
```

```tsx
<Alert variant="warning" icon={<TriangleAlert />} title="Passport expires soon" actions={<Button size="xs">Renew</Button>}>
  Some countries need 6 months of validity.
</Alert>
```

Variants `default` `info` `success` `warning` `destructive` (the last one uses `role="alert"`).

### Toast

```html
<button class="bk-button" data-bk-toast='{"title":"Trip saved","description":"Lisbon","variant":"success"}'>Save</button>
```

```ts
toast('Link copied');
const dismiss = toast({ title: 'Payment failed', variant: 'destructive', action: { label: 'Retry', onClick: retry }, duration: 8000 });
```

Toasts stack bottom-right, pause on hover and close after 4.5s (`duration: Infinity` keeps them open).

### Spinner, Skeleton

```html
<span class="bk-spinner" data-size="sm" role="status" aria-label="Loading"></span>
<span class="bk-skeleton" style="width: 70%; height: 12px"></span>
```

```tsx
<Spinner size="lg" />
<Skeleton width="70%" />  <Skeleton width={40} height={40} circle />
```

### Empty

```html
<div class="bk-empty">
  <span class="bk-empty-icon"><svg class="bk-icon" data-size="lg">…</svg></span>
  <h4 class="bk-empty-title">No trips yet</h4>
  <p class="bk-empty-description">Trips you plan or get invited to show up here.</p>
  <div class="bk-empty-actions"><button class="bk-button">Plan a trip</button></div>
</div>
```

```tsx
<Empty icon={<Plane />} title="No trips yet" description="Trips you plan or get invited to show up here." actions={<Button>Plan a trip</Button>} />
```

---

## Overlays

### Dialog and alert dialog

Native `<dialog>`: focus trap, Esc to close, the page behind is inert.

```html
<button class="bk-button" data-bk-open="edit">Edit profile</button>
<dialog class="bk-dialog" id="edit" aria-labelledby="edit-t">
  <button class="bk-button bk-dialog-close" data-variant="ghost" data-size="icon-sm" data-bk-close aria-label="Close">…</button>
  <div class="bk-dialog-header"><h2 class="bk-dialog-title" id="edit-t">Edit profile</h2><p class="bk-dialog-description">…</p></div>
  <div class="bk-dialog-body">…</div>
  <div class="bk-dialog-footer"><button class="bk-button" data-variant="outline" data-bk-close>Cancel</button><button class="bk-button">Save</button></div>
</dialog>
<!-- alert: --><dialog class="bk-dialog" data-variant="alert" role="alertdialog">…<span class="bk-dialog-icon">…</span>…</dialog>
```

```tsx
<Dialog open={open} onOpenChange={setOpen} title="Edit profile" description="…" footer={<Button onClick={save}>Save</Button>}>…</Dialog>
<Dialog variant="alert" icon={<Trash2 />} open={confirm} onOpenChange={setConfirm} title='Delete "Lisbon"?' description="This can't be undone."
  footer={<><Button variant="outline" onClick={() => setConfirm(false)}>Keep</Button><Button variant="destructive" onClick={remove}>Delete</Button></>} />
```

Alert dialogs hide the × button and ignore backdrop clicks unless you set `hideClose={false}` or `closeOnBackdrop`.

### Sheet

```html
<dialog class="bk-sheet" id="filters">…</dialog>
<dialog class="bk-sheet" data-side="bottom" id="share"><div class="bk-sheet-handle" aria-hidden="true"></div>…</dialog>
```

```tsx
<Sheet open={open} onOpenChange={setOpen} title="Filters" footer={<Button>Show 142 stays</Button>}>…</Sheet>
<Sheet side="bottom" open={share} onOpenChange={setShare} title="Share trip">…</Sheet>
```

### DropdownMenu

Native popover: Esc and outside clicks close it; arrow keys move between items.

```html
<button class="bk-button" data-variant="outline" popovertarget="account">Maya Kim</button>
<div class="bk-menu" id="account" popover role="menu" data-align="end">
  <div class="bk-menu-label">My account</div>
  <button class="bk-menu-item" role="menuitem">Profile<span class="bk-menu-shortcut">⇧⌘P</span></button>
  <button class="bk-menu-item" role="menuitemcheckbox" aria-checked="true">Email updates</button>
  <hr class="bk-menu-separator">
  <button class="bk-menu-item" role="menuitem" data-variant="destructive">Log out</button>
</div>
```

```tsx
<DropdownMenu trigger={<Button variant="outline">Maya Kim</Button>} align="end">
  <DropdownMenuLabel>My account</DropdownMenuLabel>
  <DropdownMenuItem icon={<User />} shortcut="⇧⌘P" onSelect={openProfile}>Profile</DropdownMenuItem>
  <DropdownMenuCheckboxItem checked={emails} onCheckedChange={setEmails}>Email updates</DropdownMenuCheckboxItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem variant="destructive" onSelect={logout}>Log out</DropdownMenuItem>
</DropdownMenu>
```

### Popover

```html
<button class="bk-button" popovertarget="invite">Invite</button>
<div class="bk-popover" id="invite" popover>…</div>
```

```tsx
<Popover trigger={<Button>Invite</Button>}>
  <Field label="Email"><Input type="email" /></Field>
  <Button size="sm" onClick={(e) => { send(); closePopover(e); }}>Send invite</Button>
</Popover>
```

### Command palette

```html
<dialog class="bk-command" id="cmd" data-bk-hotkey aria-label="Search">
  <div class="bk-command-search"><svg class="bk-icon">…</svg><input class="bk-command-input" placeholder="Search" aria-label="Search"></div>
  <div class="bk-command-list" role="listbox">
    <div class="bk-command-group"><div class="bk-command-group-heading">Trips</div>
      <a class="bk-command-item" role="option" href="/trips/lisbon" data-keywords="portugal">Lisbon</a>
    </div>
    <div class="bk-command-empty" hidden>No results.</div>
  </div>
</dialog>
<!-- inline version: <div class="bk-command" data-inline>…</div> -->
```

```tsx
<CommandDialog open={open} onOpenChange={setOpen} groups={[
  { heading: 'Trips', items: [{ id: 'lis', label: 'Lisbon', keywords: ['portugal'], onSelect: () => router.push('/trips/lisbon') }] },
  { heading: 'Actions', items: [{ id: 'new', label: 'New trip', shortcut: ['N'], onSelect: create }] },
]} />
<Command groups={groups} />  {/* inline */}
```

`filterCommandGroups(groups, query)` is exported for custom UIs.

---

## Navigation

### Tabs

```html
<div data-bk-tabs>
  <div class="bk-tabs-list" role="tablist" aria-label="View">
    <button class="bk-tabs-trigger" role="tab" aria-controls="p-week" aria-selected="true">Week</button>
    <button class="bk-tabs-trigger" role="tab" aria-controls="p-month">Month</button>
  </div>
  <div class="bk-tabs-content" role="tabpanel" id="p-week">…</div>
  <div class="bk-tabs-content" role="tabpanel" id="p-month" hidden>…</div>
</div>
<!-- underline style: <div class="bk-tabs-list" data-variant="line">; full width: data-full -->
```

```tsx
<Tabs defaultValue="week">
  <TabsList variant="pill" aria-label="View">
    <TabsTrigger value="week">Week</TabsTrigger>
    <TabsTrigger value="month">Month</TabsTrigger>
  </TabsList>
  <TabsContent value="week">…</TabsContent>
  <TabsContent value="month">…</TabsContent>
</Tabs>
```

### Breadcrumb

```html
<nav aria-label="Breadcrumb"><ol class="bk-breadcrumb"><li><a href="/trips">Trips</a></li><li><span aria-current="page">Day 2</span></li></ol></nav>
```

```tsx
<Breadcrumb items={[{ label: 'Trips', href: '/trips' }, { label: 'Lisbon', href: '/trips/lisbon' }, { label: 'Day 2' }]} linkAs={Link} />
```

### Pagination

```html
<nav class="bk-pagination" aria-label="Pagination">
  <a class="bk-pagination-link" href="?page=1">1</a>
  <a class="bk-pagination-link" href="?page=2" aria-current="page">2</a>
  <span class="bk-pagination-ellipsis">…</span>
</nav>
```

```tsx
<Pagination page={page} pageCount={20} onPageChange={setPage} />
<Pagination page={page} pageCount={20} getHref={(p) => `?page=${p}`} />  {/* links, for server-rendered lists */}
```

`getPaginationRange(page, pageCount, siblingCount)` returns e.g. `[1, 'ellipsis', 5, 6, 7, 'ellipsis', 20]`.

### Navbar

```html
<nav class="bk-navbar" aria-label="Main">
  <a class="bk-navbar-brand" href="/">Tripline</a>
  <div class="bk-navbar-links"><a class="bk-navbar-link" href="/trips" aria-current="page">Trips</a></div>
  <div class="bk-navbar-actions">…</div>
</nav>
```

```tsx
<Navbar aria-label="Main">
  <NavbarBrand href="/">Tripline</NavbarBrand>
  <NavbarLinks><NavbarLink asChild current><Link href="/trips">Trips</Link></NavbarLink></NavbarLinks>
  <NavbarActions><Button size="sm">New trip</Button></NavbarActions>
</Navbar>
```

### Sidebar

```html
<nav class="bk-sidebar" aria-label="App">
  <div class="bk-sidebar-brand">Tripline</div>
  <a class="bk-sidebar-item" href="/" aria-current="page"><svg class="bk-icon">…</svg>Home</a>
  <a class="bk-sidebar-item" href="/inbox"><svg class="bk-icon">…</svg>Inbox<span class="bk-badge" data-variant="brand">2</span></a>
  <div class="bk-sidebar-label">Workspace</div>
  <div class="bk-sidebar-footer">…</div>
</nav>
```

```tsx
<Sidebar aria-label="App">
  <SidebarBrand>Tripline</SidebarBrand>
  <SidebarItem href="/" icon={<Home />} current>Home</SidebarItem>
  <SidebarItem href="/inbox" icon={<Inbox />} badge={<Badge variant="brand">2</Badge>}>Inbox</SidebarItem>
  <SidebarLabel>Workspace</SidebarLabel>
  <SidebarFooter>…</SidebarFooter>
</Sidebar>
```

### BottomNav

```html
<nav class="bk-bottom-nav" aria-label="Tabs">
  <a class="bk-bottom-nav-item" href="/" aria-current="page"><svg class="bk-icon">…</svg>Home</a>
  <a class="bk-bottom-nav-item" href="/trips"><svg class="bk-icon">…</svg>Trips</a>
</nav>
```

```tsx
<BottomNav aria-label="Tabs">
  <BottomNavItem href="/" icon={<Home />} current>Home</BottomNavItem>
  <BottomNavItem href="/trips" icon={<Plane />}>Trips</BottomNavItem>
</BottomNav>
```

---

## Theme

```html
<div class="bk-toggle-group" role="group" aria-label="Theme">
  <button class="bk-toggle" data-bk-theme-set="light" aria-label="Light theme">…</button>
  <button class="bk-toggle" data-bk-theme-set="dark" aria-label="Dark theme">…</button>
  <button class="bk-toggle" data-bk-theme-set="system" aria-label="System theme">…</button>
</div>
```

```tsx
<ThemeToggle />
const { theme, resolvedTheme, setTheme } = useTheme();
<ThemeScript />  {/* in <head> */}
```
