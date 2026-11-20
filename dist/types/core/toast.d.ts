import type { DismissToast, ToastOptions } from './types';
/**
 * Shows a toast in the bottom-right corner and returns a function that closes it.
 * Accepts a title string or full options. Does nothing on the server.
 *
 * @example toast({ title: 'Trip saved', description: 'Lisbon, 12–16 March', variant: 'success' })
 */
export declare function toast(input: string | ToastOptions): DismissToast;
