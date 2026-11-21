# Using with React and Next.js

`bento-shad-ui/react` is a set of typed React components that render the kit's classes. It needs no Tailwind. The bundle starts with `"use client"`, works with React 18 and 19, and renders on the server (no `window` access at import time).

## Install

```bash
npm install github:SaadNiaziDev/bento-shad-ui#v0.1.2
```

## Next.js App Router

```tsx
// app/layout.tsx
import 'bento-shad-ui/bento.css';
import './globals.css'; // your overrides, after the kit
import { Red_Hat_Display, Red_Hat_Text } from 'next/font/google';
import { ThemeScript } from 'bento-shad-ui/react';

const text = Red_Hat_Text({ subsets: ['latin'], variable: '--font-rh-text' });
const display = Red_Hat_Display({ subsets: ['latin'], variable: '--font-rh-display' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="system" className={`${text.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bk">{children}</body>
    </html>
  );
}
```

```css
/* app/globals.css */
:root {
  --font-sans: var(--font-rh-text), ui-sans-serif, system-ui, sans-serif;
  --font-heading: var(--font-rh-display), ui-sans-serif, system-ui, sans-serif;
}
```

- `ThemeScript` applies the saved theme before the first paint, so dark mode doesn't flash.
- `suppressHydrationWarning` is needed because that script changes `<html>` attributes before React hydrates.
- Server components can render kit components. Event-handler props (`onClick`, `onValueChange`, `onOpenChange`) must come from a component marked `"use client"`, as with any React library.

## Vite / Create React App

```tsx
// main.tsx
import 'bento-shad-ui/bento.css';
import { createRoot } from 'react-dom/client';
import App from './App';
document.body.classList.add('bk');
createRoot(document.getElementById('root')!).render(<App />);
```

## A page

```tsx
'use client';
import { useState } from 'react';
import {
  BentoGrid, Tile, TileHeader, TileTitle, TileDescription, Eyebrow,
  Button, Badge, Stat, Sparkline, BarChart, Field, Input, Switch, Dialog, toast,
} from 'bento-shad-ui/react';

export function Dashboard() {
  const [open, setOpen] = useState(false);
  return (
    <BentoGrid>
      <Tile span={2} rows={2} tone="inverse">
        <Eyebrow>This week</Eyebrow>
        <BarChart
          data={[{ label: 'Mon', value: 32 }, { label: 'Tue', value: 45 }, { label: 'Wed', value: 28 }]}
          formatValue={(v) => `${v} bookings`}
        />
      </Tile>
      <Tile>
        <Stat label="Revenue" value="€48,210" delta="+8.1% vs February" trend="up" />
        <Sparkline data={[12, 18, 15, 22, 19, 27, 31]} label="Revenue rose all week" />
      </Tile>
      <Tile tone="peach">
        <TileHeader>
          <div>
            <TileTitle>Price alerts</TileTitle>
            <TileDescription>We tell you when fares drop.</TileDescription>
          </div>
          <Badge variant="brand">New</Badge>
        </TileHeader>
        <Switch label="Email me" defaultChecked />
      </Tile>
      <Tile>
        <Button onClick={() => setOpen(true)}>Edit profile</Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="Edit profile"
          description="Your name shows on shared trips."
          footer={
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => { setOpen(false); toast({ title: 'Saved', variant: 'success' }); }}>Save</Button>
            </>
          }
        >
          <Field label="Name"><Input defaultValue="Maya Kim" /></Field>
        </Dialog>
      </Tile>
    </BentoGrid>
  );
}
```

## Patterns

**Router links.** Every link-like component takes `asChild`:

```tsx
import Link from 'next/link';
<Button asChild><Link href="/trips">Trips</Link></Button>
<NavbarLink asChild current><Link href="/">Home</Link></NavbarLink>
<SidebarItem asChild icon={<Home />}><Link href="/">Home</Link></SidebarItem>
<Tile asChild interactive><Link href="/trips/lisbon">…</Link></Tile>
```

**Forms.** `Field` creates the id and wires `htmlFor`, `aria-describedby` and `aria-invalid`:

```tsx
<Field label="Email" description="We'll send the itinerary here." error={errors.email} required>
  <Input type="email" name="email" />
</Field>
```

It works with react-hook-form (`<Input {...register('email')} />`) and with server actions (plain `name` attributes).

**Controlled or uncontrolled.** Stateful components accept both: `value` + `onValueChange`, or `defaultValue`. The same goes for `pressed`, `checked`, `open` and `month`.

**Toasts.** `toast()` works from anywhere, with no provider:

```tsx
toast({ title: 'Payment failed', description: 'Your card was declined.', variant: 'destructive', action: { label: 'Retry', onClick: retry } });
```

**Theme.**

```tsx
const { theme, resolvedTheme, setTheme } = useTheme();
<ThemeToggle /> // Light / Dark / System
```

**Command palette.**

```tsx
const [open, setOpen] = useState(false); // ⌘K / Ctrl+K toggles it
<CommandDialog
  open={open}
  onOpenChange={setOpen}
  groups={[{ heading: 'Pages', items: [{ id: 'trips', label: 'Trips', onSelect: () => router.push('/trips') }] }]}
/>
```

## Icons

Pass any React icon as children or as an `icon` prop. lucide-react matches the kit:

```tsx
import { Plus } from 'lucide-react';
<Button><Plus />Add trip</Button>
```

SVGs inside buttons, menu items, sidebar items, badges and similar are sized to 16px automatically (20px in the bottom nav).

## Using it with the vanilla core

You don't need `bento-shad-ui` (the core) in a React app. If a page also contains plain-HTML kit markup and you call `start()`, the core leaves React-rendered components alone: they carry `data-bk-react`.

Every component and prop is listed in [components.md](components.md).
