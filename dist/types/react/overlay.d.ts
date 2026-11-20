import * as React from 'react';
interface ModalProps extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, 'open' | 'title'> {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: React.ReactNode;
    description?: React.ReactNode;
    /** Buttons at the bottom, right-aligned. */
    footer?: React.ReactNode;
    /** Hide the × button in the corner. */
    hideClose?: boolean;
    /** Close when the dimmed backdrop is clicked. */
    closeOnBackdrop?: boolean;
}
export interface DialogProps extends ModalProps {
    /** `alert` is for confirming destructive actions: narrower, role="alertdialog", no backdrop close by default. */
    variant?: 'default' | 'alert';
    /** Icon above the title (used by alert dialogs). */
    icon?: React.ReactNode;
}
/**
 * Modal dialog on the native `<dialog>`: focus is trapped, Esc closes, the page behind is inert.
 * Controlled: pass `open` and `onOpenChange`.
 */
export declare const Dialog: React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<HTMLDialogElement>>;
export interface SheetProps extends ModalProps {
    /** `right` (default) slides in from the side; `bottom` is the mobile pattern. */
    side?: 'right' | 'bottom';
}
export declare const Sheet: React.ForwardRefExoticComponent<SheetProps & React.RefAttributes<HTMLDialogElement>>;
export interface DropdownMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** The button that opens the menu. */
    trigger: React.ReactElement;
    /** Edge of the trigger to line up with. Default `start`. */
    align?: 'start' | 'center' | 'end';
    children: React.ReactNode;
}
/** Menu of actions. Arrow keys move between items, Esc and outside clicks close it. */
export declare function DropdownMenu({ trigger, align, className, children, onKeyDown, ...props }: DropdownMenuProps): React.ReactElement;
export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    /** Shortcut hint shown on the right, e.g. "⌘S". */
    shortcut?: string;
    variant?: 'default' | 'destructive';
    /** Called when chosen with mouse or keyboard. */
    onSelect?: () => void;
    /** Keep the menu open after choosing. */
    keepOpen?: boolean;
}
export declare const DropdownMenuItem: React.ForwardRefExoticComponent<DropdownMenuItemProps & React.RefAttributes<HTMLButtonElement>>;
export interface DropdownMenuCheckboxItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}
export declare const DropdownMenuCheckboxItem: React.ForwardRefExoticComponent<DropdownMenuCheckboxItemProps & React.RefAttributes<HTMLButtonElement>>;
export declare function DropdownMenuLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.ReactElement;
export declare function DropdownMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLHRElement>): React.ReactElement;
export interface PopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    trigger: React.ReactElement;
    align?: 'start' | 'center' | 'end';
    children: React.ReactNode;
}
/** Floating panel for a small form or details. Esc and outside clicks close it. */
export declare function Popover({ trigger, align, className, children, ...props }: PopoverProps): React.ReactElement;
/** Closes the popover or menu that contains the element that fired the event. */
export declare function closePopover(event: React.SyntheticEvent): void;
export interface CommandItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    /** Extra words that should match the search. */
    keywords?: readonly string[];
    /** Keys shown on the right, e.g. `['⌘', 'N']`. */
    shortcut?: readonly string[];
    disabled?: boolean;
    onSelect?: () => void;
}
export interface CommandGroup {
    heading: string;
    items: readonly CommandItem[];
}
/** Groups and items that match `query` (case-insensitive, label + keywords). Empty groups are dropped. */
export declare function filterCommandGroups(groups: readonly CommandGroup[], query: string): CommandGroup[];
export interface CommandProps {
    groups: readonly CommandGroup[];
    placeholder?: string;
    emptyText?: string;
    /** Called after an item's own `onSelect`. */
    onSelect?: (item: CommandItem) => void;
    autoFocus?: boolean;
    className?: string;
}
/** Inline command list with search and keyboard navigation. */
export declare function Command({ className, ...props }: CommandProps): React.ReactElement;
export interface CommandDialogProps extends CommandProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Key that toggles the palette with ⌘ / Ctrl. `false` disables it. Default `"k"`. */
    hotkey?: string | false;
}
/** Command palette in a modal. ⌘K / Ctrl+K toggles it by default. Choosing an item closes it. */
export declare function CommandDialog({ open, onOpenChange, hotkey, className, onSelect, ...props }: CommandDialogProps): React.ReactElement;
export {};
