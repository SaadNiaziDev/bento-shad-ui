import * as React from 'react';
import { getTheme, onThemeChange, resolveTheme, setTheme, themeScript } from '../core';
import type { ResolvedTheme, Theme } from '../core';
import { cx } from './utils';

const subscribe = (callback: () => void) => onThemeChange(() => callback());
const getServerTheme = (): Theme => 'system';
const getServerResolved = (): ResolvedTheme => 'light';

export interface UseThemeResult {
  /** What the user chose: `light`, `dark` or `system`. */
  theme: Theme;
  /** What is shown: `light` or `dark`. */
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

/** Current theme, updated whenever it changes anywhere on the page. */
export function useTheme(): UseThemeResult {
  const theme = React.useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const resolvedTheme = React.useSyncExternalStore(subscribe, () => resolveTheme(getTheme()), getServerResolved);
  return { theme, resolvedTheme, setTheme };
}

/**
 * Inline script that applies the saved theme before the first paint, so dark mode never flashes.
 * Put it in `<head>` and add `suppressHydrationWarning` to `<html>`.
 */
export function ThemeScript({ nonce }: { nonce?: string }): React.ReactElement {
  return <script nonce={nonce} dangerouslySetInnerHTML={{ __html: themeScript }} />;
}

const ICONS: Record<Theme, React.ReactElement> = {
  light: (
    <svg className="bk-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  dark: (
    <svg className="bk-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  ),
  system: (
    <svg className="bk-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
};

export interface ThemeToggleProps {
  className?: string;
  /** Accessible names for the three buttons. */
  labels?: Partial<Record<Theme, string>>;
}

/** Light / Dark / System switch. Remembers the choice in localStorage. */
export function ThemeToggle({ className, labels = {} }: ThemeToggleProps): React.ReactElement {
  const { theme } = useTheme();
  const names: Record<Theme, string> = { light: 'Light theme', dark: 'Dark theme', system: 'System theme', ...labels };
  return (
    <div role="group" aria-label="Theme" className={cx('bk-toggle-group', className)} data-bk-react="">
      {(['light', 'dark', 'system'] as const).map((t) => (
        <button key={t} type="button" className="bk-toggle" aria-pressed={theme === t} aria-label={names[t]} onClick={() => setTheme(t)}>
          {ICONS[t]}
        </button>
      ))}
    </div>
  );
}
