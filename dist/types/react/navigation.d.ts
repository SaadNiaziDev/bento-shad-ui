import * as React from 'react';
export interface LinkLikeProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Marks the item as the current page (`aria-current="page"`). */
    current?: boolean;
    /** Render the single child (e.g. Next.js `<Link>`) instead of an `<a>`. */
    asChild?: boolean;
}
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    /** Selected tab (controlled). */
    value?: string;
    /** Initially selected tab (uncontrolled). */
    defaultValue?: string;
    /** Called with the newly selected tab value. */
    onValueChange?: (value: string) => void;
}
export declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
    /** `pill` (segmented, default) or `line` (underline). */
    variant?: 'pill' | 'line';
    /** Stretch triggers to fill the width. */
    full?: boolean;
}
export declare const TabsList: React.ForwardRefExoticComponent<TabsListProps & React.RefAttributes<HTMLDivElement>>;
export interface TabsTriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
    /** Matches the `value` of a `TabsContent`. */
    value: string;
}
export declare const TabsTrigger: React.ForwardRefExoticComponent<TabsTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Shown when this matches the selected tab's `value`. */
    value: string;
    /** Keep the panel in the DOM when hidden (it stays hidden). */
    forceMount?: boolean;
}
export declare const TabsContent: React.ForwardRefExoticComponent<TabsContentProps & React.RefAttributes<HTMLDivElement>>;
export interface BreadcrumbItem {
    label: React.ReactNode;
    /** Omit on the last (current) item. */
    href?: string;
}
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
    /** Trail from the top level to the current page. The last item is the current page. */
    items: readonly BreadcrumbItem[];
    /** Link component for router links, e.g. Next.js `Link`. Receives `href`. Default `a`. */
    linkAs?: React.ElementType;
}
export declare const Breadcrumb: React.ForwardRefExoticComponent<BreadcrumbProps & React.RefAttributes<HTMLElement>>;
export type PaginationToken = number | 'ellipsis';
/**
 * Page numbers to show, with `'ellipsis'` where pages are skipped. Always includes the first,
 * last and current page plus `siblingCount` pages on each side.
 * @example getPaginationRange(6, 20) // [1, 'ellipsis', 5, 6, 7, 'ellipsis', 20]
 */
export declare function getPaginationRange(page: number, pageCount: number, siblingCount?: number): PaginationToken[];
export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
    /** Current page, starting at 1. */
    page: number;
    /** Total number of pages. */
    pageCount: number;
    /** Called with the page the user picked. */
    onPageChange?: (page: number) => void;
    /** Pages shown on each side of the current one. Default 1. */
    siblingCount?: number;
    /** Render links instead of buttons (for server-rendered pages). */
    getHref?: (page: number) => string;
}
export declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLElement>>;
export declare const Navbar: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>>;
export declare const NavbarLinks: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare const NavbarActions: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare const NavbarBrand: React.ForwardRefExoticComponent<LinkLikeProps & React.RefAttributes<HTMLAnchorElement>>;
export declare const NavbarLink: React.ForwardRefExoticComponent<LinkLikeProps & React.RefAttributes<HTMLAnchorElement>>;
export declare const Sidebar: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>>;
export declare const SidebarBrand: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare const SidebarLabel: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare const SidebarFooter: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export interface SidebarItemProps extends LinkLikeProps {
    /** Icon before the label. */
    icon?: React.ReactNode;
    /** Count or status at the end, usually a `Badge`. */
    badge?: React.ReactNode;
}
export declare const SidebarItem: React.ForwardRefExoticComponent<SidebarItemProps & React.RefAttributes<HTMLAnchorElement>>;
export declare const BottomNav: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>>;
export interface BottomNavItemProps extends LinkLikeProps {
    /** Icon above the label. */
    icon: React.ReactNode;
}
export declare const BottomNavItem: React.ForwardRefExoticComponent<BottomNavItemProps & React.RefAttributes<HTMLAnchorElement>>;
