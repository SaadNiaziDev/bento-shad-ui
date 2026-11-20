import * as React from 'react';
import type { ResolvedTheme, Theme } from '../core';
export interface UseThemeResult {
    /** What the user chose: `light`, `dark` or `system`. */
    theme: Theme;
    /** What is shown: `light` or `dark`. */
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: Theme) => void;
}
/** Current theme, updated whenever it changes anywhere on the page. */
export declare function useTheme(): UseThemeResult;
/**
 * Inline script that applies the saved theme before the first paint, so dark mode never flashes.
 * Put it in `<head>` and add `suppressHydrationWarning` to `<html>`.
 */
export declare function ThemeScript({ nonce }: {
    nonce?: string;
}): React.ReactElement;
export interface ThemeToggleProps {
    className?: string;
    /** Accessible names for the three buttons. */
    labels?: Partial<Record<Theme, string>>;
}
/** Light / Dark / System switch. Remembers the choice in localStorage. */
export declare function ThemeToggle({ className, labels }: ThemeToggleProps): React.ReactElement;
