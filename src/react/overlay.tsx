import * as React from 'react';
import { enablePopoverPlacement } from '../core';
import { Button } from './actions';
import { Kbd, KbdGroup } from './actions';
import { composeRefs, cx, popoverTargetProps, useSafeId } from './utils';

function CloseIcon() {
  return (
    <svg className="bk-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

/* ---------------------------------------------------------------- Dialog, Sheet (native <dialog>) */

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

function useModal(open: boolean, onOpenChange: (open: boolean) => void, closeOnBackdrop: boolean) {
  const ref = React.useRef<HTMLDialogElement>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
  }, [open]);
  const handlers = {
    onClose: () => {
      if (open) onOpenChange(false);
    },
    onClick: (e: React.MouseEvent<HTMLDialogElement>) => {
      if (!closeOnBackdrop || e.target !== e.currentTarget) return;
      const r = e.currentTarget.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onOpenChange(false);
    },
  };
  return { ref, handlers };
}

function ModalContent({
  title,
  description,
  footer,
  hideClose,
  icon,
  titleId,
  descriptionId,
  onOpenChange,
  children,
  handle,
}: Pick<ModalProps, 'title' | 'description' | 'footer' | 'hideClose' | 'onOpenChange' | 'children'> & {
  icon?: React.ReactNode;
  titleId: string;
  descriptionId: string;
  handle?: boolean;
}) {
  return (
    <>
      {handle ? <div className="bk-sheet-handle" aria-hidden="true" /> : null}
      {hideClose ? null : (
        <Button variant="ghost" size="icon-sm" className="bk-dialog-close" aria-label="Close" onClick={() => onOpenChange(false)}>
          <CloseIcon />
        </Button>
      )}
      {icon ? <span className="bk-dialog-icon" aria-hidden="true">{icon}</span> : null}
      {title || description ? (
        <div className="bk-dialog-header">
          {title ? <h2 className="bk-dialog-title" id={titleId}>{title}</h2> : null}
          {description ? <p className="bk-dialog-description" id={descriptionId}>{description}</p> : null}
        </div>
      ) : null}
      {children ? <div className="bk-dialog-body">{children}</div> : null}
      {footer ? <div className="bk-dialog-footer">{footer}</div> : null}
    </>
  );
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
export const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(function Dialog(
  { open, onOpenChange, title, description, footer, hideClose, closeOnBackdrop, variant = 'default', icon, className, children, ...props },
  forwarded,
) {
  const { ref, handlers } = useModal(open, onOpenChange, closeOnBackdrop ?? variant !== 'alert');
  const titleId = useSafeId('dialog-title');
  const descriptionId = useSafeId('dialog-description');
  return (
    <dialog
      ref={composeRefs(ref, forwarded)}
      className={cx('bk-dialog', className)}
      data-variant={variant === 'alert' ? 'alert' : undefined}
      role={variant === 'alert' ? 'alertdialog' : undefined}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
      data-bk-react=""
      {...handlers}
      {...props}
    >
      {open ? (
        <ModalContent {...{ title, description, footer, hideClose, icon, titleId, descriptionId, onOpenChange }} hideClose={hideClose ?? variant === 'alert'}>
          {children}
        </ModalContent>
      ) : null}
    </dialog>
  );
});

export interface SheetProps extends ModalProps {
  /** `right` (default) slides in from the side; `bottom` is the mobile pattern. */
  side?: 'right' | 'bottom';
}

export const Sheet = React.forwardRef<HTMLDialogElement, SheetProps>(function Sheet(
  { open, onOpenChange, title, description, footer, hideClose, closeOnBackdrop = true, side = 'right', className, children, ...props },
  forwarded,
) {
  const { ref, handlers } = useModal(open, onOpenChange, closeOnBackdrop);
  const titleId = useSafeId('sheet-title');
  const descriptionId = useSafeId('sheet-description');
  return (
    <dialog
      ref={composeRefs(ref, forwarded)}
      className={cx('bk-sheet', className)}
      data-side={side === 'bottom' ? 'bottom' : undefined}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
      data-bk-react=""
      {...handlers}
      {...props}
    >
      {open ? (
        <ModalContent {...{ title, description, footer, titleId, descriptionId, onOpenChange }} hideClose={hideClose ?? side === 'bottom'} handle={side === 'bottom'}>
          {children}
        </ModalContent>
      ) : null}
    </dialog>
  );
});

/* ---------------------------------------------------------------- Dropdown menu, Popover (native popover API) */

function usePopoverSurface(onOpen?: (el: HTMLElement) => void) {
  const ref = React.useRef<HTMLDivElement>(null);
  const onOpenRef = React.useRef(onOpen);
  onOpenRef.current = onOpen;
  React.useEffect(() => {
    enablePopoverPlacement();
    const el = ref.current;
    if (!el) return;
    const onToggle = (e: Event) => {
      if ((e as ToggleEvent).newState === 'open') onOpenRef.current?.(el);
    };
    el.addEventListener('toggle', onToggle);
    return () => el.removeEventListener('toggle', onToggle);
  }, []);
  return ref;
}

const POPOVER_AUTO = { popover: 'auto' } as Record<string, string>;

export interface DropdownMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** The button that opens the menu. */
  trigger: React.ReactElement;
  /** Edge of the trigger to line up with. Default `start`. */
  align?: 'start' | 'center' | 'end';
  children: React.ReactNode;
}

/** Menu of actions. Arrow keys move between items, Esc and outside clicks close it. */
export function DropdownMenu({ trigger, align = 'start', className, children, onKeyDown, ...props }: DropdownMenuProps): React.ReactElement {
  const id = useSafeId('menu');
  const ref = usePopoverSurface((el) => el.querySelector<HTMLElement>('[role^="menuitem"]:not(:disabled)')?.focus());
  return (
    <>
      {React.cloneElement(trigger, { ...popoverTargetProps(id), 'aria-haspopup': 'menu' } as Record<string, unknown>)}
      <div
        ref={ref}
        id={id}
        {...POPOVER_AUTO}
        role="menu"
        className={cx('bk-menu', className)}
        data-align={align}
        data-bk-react=""
        onKeyDown={(e) => {
          onKeyDown?.(e);
          const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role^="menuitem"]:not(:disabled)'));
          const i = items.indexOf(document.activeElement as HTMLElement);
          const next = e.key === 'ArrowDown' ? items[(i + 1) % items.length] : e.key === 'ArrowUp' ? items[(i - 1 + items.length) % items.length] : e.key === 'Home' ? items[0] : e.key === 'End' ? items[items.length - 1] : undefined;
          if (next) {
            e.preventDefault();
            next.focus();
          }
        }}
        {...props}
      >
        {children}
      </div>
    </>
  );
}

function hideClosestPopover(el: Element): void {
  const popover = el.closest<HTMLElement>('[popover]');
  if (popover && typeof popover.hidePopover === 'function') popover.hidePopover();
}

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

export const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(function DropdownMenuItem(
  { icon, shortcut, variant = 'default', onSelect, keepOpen, className, onClick, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      className={cx('bk-menu-item', className)}
      data-variant={variant === 'destructive' ? 'destructive' : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        onSelect?.();
        if (!keepOpen) hideClosestPopover(e.currentTarget);
      }}
      {...props}
    >
      {icon}
      {children}
      {shortcut ? <span className="bk-menu-shortcut">{shortcut}</span> : null}
    </button>
  );
});

export interface DropdownMenuCheckboxItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const DropdownMenuCheckboxItem = React.forwardRef<HTMLButtonElement, DropdownMenuCheckboxItemProps>(function DropdownMenuCheckboxItem(
  { checked, onCheckedChange, className, onClick, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      role="menuitemcheckbox"
      aria-checked={checked}
      className={cx('bk-menu-item', className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) onCheckedChange(!checked);
      }}
      {...props}
    />
  );
});

export function DropdownMenuLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return <div className={cx('bk-menu-label', className)} {...props} />;
}

export function DropdownMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLHRElement>): React.ReactElement {
  return <hr className={cx('bk-menu-separator', className)} {...props} />;
}

export interface PopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  trigger: React.ReactElement;
  align?: 'start' | 'center' | 'end';
  children: React.ReactNode;
}

/** Floating panel for a small form or details. Esc and outside clicks close it. */
export function Popover({ trigger, align = 'start', className, children, ...props }: PopoverProps): React.ReactElement {
  const id = useSafeId('popover');
  const ref = usePopoverSurface((el) => el.querySelector<HTMLElement>('input, select, textarea, button, [tabindex]')?.focus());
  return (
    <>
      {React.cloneElement(trigger, { ...popoverTargetProps(id), 'aria-haspopup': 'dialog' } as Record<string, unknown>)}
      <div ref={ref} id={id} {...POPOVER_AUTO} role="dialog" className={cx('bk-popover', className)} data-align={align} data-bk-react="" {...props}>
        {children}
      </div>
    </>
  );
}

/** Closes the popover or menu that contains the element that fired the event. */
export function closePopover(event: React.SyntheticEvent): void {
  hideClosestPopover(event.currentTarget as Element);
}

/* ---------------------------------------------------------------- Command palette */

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
export function filterCommandGroups(groups: readonly CommandGroup[], query: string): CommandGroup[] {
  const q = query.trim().toLowerCase();
  if (!q) return groups.map((g) => ({ heading: g.heading, items: [...g.items] }));
  return groups
    .map((g) => ({ heading: g.heading, items: g.items.filter((item) => `${item.label} ${(item.keywords ?? []).join(' ')}`.toLowerCase().includes(q)) }))
    .filter((g) => g.items.length > 0);
}

export interface CommandProps {
  groups: readonly CommandGroup[];
  placeholder?: string;
  emptyText?: string;
  /** Called after an item's own `onSelect`. */
  onSelect?: (item: CommandItem) => void;
  autoFocus?: boolean;
  className?: string;
}

function CommandBody({ groups, placeholder = 'Type a command or search', emptyText = 'No results.', onSelect, autoFocus }: CommandProps) {
  const [query, setQuery] = React.useState('');
  const [active, setActive] = React.useState(0);
  const listId = useSafeId('command-list');
  const listRef = React.useRef<HTMLDivElement>(null);
  const visible = React.useMemo(() => filterCommandGroups(groups, query), [groups, query]);
  const flat = React.useMemo(() => visible.flatMap((g) => g.items.filter((i) => !i.disabled)), [visible]);

  React.useEffect(() => setActive(0), [query]);
  React.useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    const list = listRef.current;
    if (!el || !list) return;
    const top = el.offsetTop - list.offsetTop;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (top + el.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = top + el.offsetHeight - list.clientHeight;
  }, [active]);

  const run = (item: CommandItem | undefined) => {
    if (!item || item.disabled) return;
    item.onSelect?.();
    onSelect?.(item);
  };
  const activeItem = flat[active];

  return (
    <>
      <div className="bk-command-search">
        <svg className="bk-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4.3-4.3" /></svg>
        <input
          className="bk-command-input"
          placeholder={placeholder}
          aria-label={placeholder}
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={activeItem ? `${listId}-${activeItem.id}` : undefined}
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActive((i) => Math.min(i + 1, flat.length - 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((i) => Math.max(i - 1, 0));
            } else if (e.key === 'Enter') {
              e.preventDefault();
              run(activeItem);
            }
          }}
        />
      </div>
      <div className="bk-command-list" role="listbox" id={listId} ref={listRef}>
        {visible.map((group) => (
          <div key={group.heading} className="bk-command-group" role="group" aria-label={group.heading}>
            <div className="bk-command-group-heading" aria-hidden="true">{group.heading}</div>
            {group.items.map((item) => (
              <div
                key={item.id}
                id={`${listId}-${item.id}`}
                role="option"
                aria-selected={activeItem?.id === item.id}
                aria-disabled={item.disabled || undefined}
                className="bk-command-item"
                onMouseMove={() => {
                  const i = flat.findIndex((f) => f.id === item.id);
                  if (i >= 0 && i !== active) setActive(i);
                }}
                onClick={() => run(item)}
              >
                {item.icon}
                {item.label}
                {item.shortcut ? (
                  <KbdGroup>
                    {item.shortcut.map((k) => (
                      <Kbd key={k}>{k}</Kbd>
                    ))}
                  </KbdGroup>
                ) : null}
              </div>
            ))}
          </div>
        ))}
        {visible.length === 0 ? <div className="bk-command-empty">{emptyText}</div> : null}
      </div>
    </>
  );
}

/** Inline command list with search and keyboard navigation. */
export function Command({ className, ...props }: CommandProps): React.ReactElement {
  return (
    <div className={cx('bk-command', className)} data-inline="" data-bk-react="">
      <CommandBody {...props} />
    </div>
  );
}

export interface CommandDialogProps extends CommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Key that toggles the palette with ⌘ / Ctrl. `false` disables it. Default `"k"`. */
  hotkey?: string | false;
}

/** Command palette in a modal. ⌘K / Ctrl+K toggles it by default. Choosing an item closes it. */
export function CommandDialog({ open, onOpenChange, hotkey = 'k', className, onSelect, ...props }: CommandDialogProps): React.ReactElement {
  const { ref, handlers } = useModal(open, onOpenChange, true);
  const openRef = React.useRef(open);
  openRef.current = open;
  React.useEffect(() => {
    if (!hotkey) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === hotkey.toLowerCase()) {
        e.preventDefault();
        onOpenChange(!openRef.current);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hotkey, onOpenChange]);
  return (
    <dialog ref={ref} className={cx('bk-command', className)} data-bk-react="" aria-label={props.placeholder ?? 'Command palette'} {...handlers}>
      {open ? (
        <CommandBody
          {...props}
          autoFocus
          onSelect={(item) => {
            onSelect?.(item);
            onOpenChange(false);
          }}
        />
      ) : null}
    </dialog>
  );
}
