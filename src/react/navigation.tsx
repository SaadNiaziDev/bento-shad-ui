import * as React from 'react';
import { cx, part, useControllableState, useSafeId } from './utils';

/* ---------------------------------------------------------------- inline icons */

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg className="bk-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={dir === 'left' ? 'm15 6-6 6 6 6' : 'm9 6 6 6-6 6'} />
    </svg>
  );
}

/* ---------------------------------------------------------------- Link-like items (asChild support) */

interface LinkLikeProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Marks the item as the current page (`aria-current="page"`). */
  current?: boolean;
  /** Render the single child (e.g. Next.js `<Link>`) instead of an `<a>`. */
  asChild?: boolean;
}

function linkLike(
  base: string,
  { current, asChild, className, children, ...props }: LinkLikeProps,
  ref: React.Ref<HTMLAnchorElement>,
  before?: React.ReactNode,
  after?: React.ReactNode,
): React.ReactElement {
  const shared = { className: cx(base, className), 'aria-current': current ? ('page' as const) : undefined };
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string; children?: React.ReactNode }>;
    return React.cloneElement(child, {
      ...props,
      ...shared,
      className: cx(shared.className, child.props.className),
      children: (
        <>
          {before}
          {child.props.children}
          {after}
        </>
      ),
    } as Record<string, unknown>);
  }
  return (
    <a ref={ref} {...props} {...shared}>
      {before}
      {children}
      {after}
    </a>
  );
}

/* ---------------------------------------------------------------- Tabs */

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
}
const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabs(component: string): TabsContextValue {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error(`<${component}> must be used inside <Tabs>.`);
  return ctx;
}

const slug = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, '-');

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(function Tabs({ value, defaultValue = '', onValueChange, className, ...props }, ref) {
  const [current, setCurrent] = useControllableState(value, defaultValue, onValueChange);
  const baseId = useSafeId('tabs');
  const ctx = React.useMemo(() => ({ value: current, setValue: setCurrent, baseId }), [current, setCurrent, baseId]);
  return (
    <TabsContext.Provider value={ctx}>
      <div ref={ref} className={className} data-bk-react="" {...props} />
    </TabsContext.Provider>
  );
});

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `pill` (segmented, default) or `line` (underline). */
  variant?: 'pill' | 'line';
  /** Stretch triggers to fill the width. */
  full?: boolean;
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(function TabsList({ variant = 'pill', full, className, onKeyDown, ...props }, ref) {
  return (
    <div
      ref={ref}
      role="tablist"
      className={cx('bk-tabs-list', className)}
      data-variant={variant === 'line' ? 'line' : undefined}
      data-full={full ? '' : undefined}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        const tabs = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'));
        const i = tabs.indexOf(document.activeElement as HTMLButtonElement);
        if (i < 0) return;
        const next =
          e.key === 'ArrowRight' ? tabs[(i + 1) % tabs.length] :
          e.key === 'ArrowLeft' ? tabs[(i - 1 + tabs.length) % tabs.length] :
          e.key === 'Home' ? tabs[0] :
          e.key === 'End' ? tabs[tabs.length - 1] : undefined;
        if (next) {
          e.preventDefault();
          next.focus();
          next.click();
        }
      }}
      {...props}
    />
  );
});

export interface TabsTriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  value: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(function TabsTrigger({ value, className, onClick, ...props }, ref) {
  const ctx = useTabs('TabsTrigger');
  const selected = ctx.value === value;
  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={`${ctx.baseId}-tab-${slug(value)}`}
      aria-controls={`${ctx.baseId}-panel-${slug(value)}`}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      className={cx('bk-tabs-trigger', className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) ctx.setValue(value);
      }}
      {...props}
    />
  );
});

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  /** Keep the panel in the DOM when hidden (it stays hidden). */
  forceMount?: boolean;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent({ value, forceMount, className, ...props }, ref) {
  const ctx = useTabs('TabsContent');
  const selected = ctx.value === value;
  if (!selected && !forceMount) return null;
  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`${ctx.baseId}-panel-${slug(value)}`}
      aria-labelledby={`${ctx.baseId}-tab-${slug(value)}`}
      hidden={!selected}
      tabIndex={0}
      className={cx('bk-tabs-content', className)}
      {...props}
    />
  );
});

/* ---------------------------------------------------------------- Breadcrumb */

export interface BreadcrumbItem {
  label: React.ReactNode;
  /** Omit on the last (current) item. */
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: readonly BreadcrumbItem[];
  /** Link component for router links, e.g. Next.js `Link`. Receives `href`. Default `a`. */
  linkAs?: React.ElementType;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb({ items, linkAs: LinkComponent = 'a', className, ...props }, ref) {
  return (
    <nav ref={ref} aria-label="Breadcrumb" className={className} {...props}>
      <ol className="bk-breadcrumb">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i}>
              {last || !item.href ? <span aria-current={last ? 'page' : undefined}>{item.label}</span> : <LinkComponent href={item.href}>{item.label}</LinkComponent>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});

/* ---------------------------------------------------------------- Pagination */

export type PaginationToken = number | 'ellipsis';

/**
 * Page numbers to show, with `'ellipsis'` where pages are skipped. Always includes the first,
 * last and current page plus `siblingCount` pages on each side.
 * @example getPaginationRange(6, 20) // [1, 'ellipsis', 5, 6, 7, 'ellipsis', 20]
 */
export function getPaginationRange(page: number, pageCount: number, siblingCount = 1): PaginationToken[] {
  const count = Math.max(0, Math.floor(pageCount));
  if (count === 0) return [];
  const current = Math.min(Math.max(1, Math.floor(page)), count);
  const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
  const slots = siblingCount * 2 + 5;
  if (count <= slots) return range(1, count);
  const left = Math.max(current - siblingCount, 1);
  const right = Math.min(current + siblingCount, count);
  const showLeft = left > 2;
  const showRight = right < count - 1;
  const edge = 3 + siblingCount * 2;
  if (!showLeft && showRight) return [...range(1, edge), 'ellipsis', count];
  if (showLeft && !showRight) return [1, 'ellipsis', ...range(count - edge + 1, count)];
  return [1, 'ellipsis', ...range(left, right), 'ellipsis', count];
}

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  /** Render links instead of buttons (for server-rendered pages). */
  getHref?: (page: number) => string;
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { page, pageCount, onPageChange, siblingCount = 1, getHref, className, ...props },
  ref,
) {
  const tokens = getPaginationRange(page, pageCount, siblingCount);
  const item = (target: number, content: React.ReactNode, extra: Record<string, unknown> = {}) => {
    const disabled = target < 1 || target > pageCount;
    if (getHref && !disabled) {
      return (
        <a className="bk-pagination-link" href={getHref(target)} onClick={() => onPageChange?.(target)} {...extra}>
          {content}
        </a>
      );
    }
    return (
      <button type="button" className="bk-pagination-link" disabled={disabled} onClick={() => onPageChange?.(target)} {...extra}>
        {content}
      </button>
    );
  };
  return (
    <nav ref={ref} aria-label="Pagination" className={cx('bk-pagination', className)} {...props}>
      {item(page - 1, <Chevron dir="left" />, { 'aria-label': 'Previous page' })}
      {tokens.map((t, i) =>
        t === 'ellipsis' ? (
          <span key={`e${i}`} className="bk-pagination-ellipsis" aria-hidden="true">
            …
          </span>
        ) : (
          <React.Fragment key={t}>{item(t, t, { 'aria-current': t === page ? 'page' : undefined, 'aria-label': `Page ${t}` })}</React.Fragment>
        ),
      )}
      {item(page + 1, <Chevron dir="right" />, { 'aria-label': 'Next page' })}
    </nav>
  );
});

/* ---------------------------------------------------------------- Navbar */

export const Navbar = part('nav', 'bk-navbar', 'Navbar');
export const NavbarLinks = part('div', 'bk-navbar-links', 'NavbarLinks');
export const NavbarActions = part('div', 'bk-navbar-actions', 'NavbarActions');

export const NavbarBrand = React.forwardRef<HTMLAnchorElement, LinkLikeProps>(function NavbarBrand(props, ref) {
  return linkLike('bk-navbar-brand', props, ref);
});

export const NavbarLink = React.forwardRef<HTMLAnchorElement, LinkLikeProps>(function NavbarLink(props, ref) {
  return linkLike('bk-navbar-link', props, ref);
});

/* ---------------------------------------------------------------- Sidebar */

export const Sidebar = part('nav', 'bk-sidebar', 'Sidebar');
export const SidebarBrand = part('div', 'bk-sidebar-brand', 'SidebarBrand');
export const SidebarLabel = part('div', 'bk-sidebar-label', 'SidebarLabel');
export const SidebarFooter = part('div', 'bk-sidebar-footer', 'SidebarFooter');

export interface SidebarItemProps extends LinkLikeProps {
  icon?: React.ReactNode;
  /** Count or status at the end, usually a `Badge`. */
  badge?: React.ReactNode;
}

export const SidebarItem = React.forwardRef<HTMLAnchorElement, SidebarItemProps>(function SidebarItem({ icon, badge, ...props }, ref) {
  return linkLike('bk-sidebar-item', props, ref, icon, badge);
});

/* ---------------------------------------------------------------- Bottom nav */

export const BottomNav = part('nav', 'bk-bottom-nav', 'BottomNav');

export interface BottomNavItemProps extends LinkLikeProps {
  icon: React.ReactNode;
}

export const BottomNavItem = React.forwardRef<HTMLAnchorElement, BottomNavItemProps>(function BottomNavItem({ icon, ...props }, ref) {
  return linkLike('bk-bottom-nav-item', props, ref, icon);
});
