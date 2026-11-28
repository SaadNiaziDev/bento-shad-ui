import * as React from 'react';
export interface StepItem {
    /** Name of the step. */
    title: React.ReactNode;
    /** Second line under the title. */
    description?: React.ReactNode;
}
export interface StepsProps extends React.OlHTMLAttributes<HTMLOListElement> {
    /** The steps, in order. */
    steps: readonly StepItem[];
    /** Index of the current step, from 0. Steps before it show as done; `steps.length` marks all done. */
    current: number;
    /** `horizontal` (default) puts the steps in a row; `vertical` stacks them, for narrow spaces and long descriptions. */
    orientation?: 'horizontal' | 'vertical';
    /** Read before each finished step by screen readers. Default "Completed". */
    completedLabel?: string;
}
/** Progress through a fixed sequence, such as checkout or onboarding. Shows where you are; it is not a navigation. */
export declare const Steps: React.ForwardRefExoticComponent<StepsProps & React.RefAttributes<HTMLOListElement>>;
export declare const Timeline: React.ForwardRefExoticComponent<React.OlHTMLAttributes<HTMLOListElement> & React.RefAttributes<HTMLOListElement>>;
export interface TimelineItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'title'> {
    /** What happened. */
    title: React.ReactNode;
    /** When it happened, as shown, e.g. "2 h ago" or "12 Mar". */
    time?: React.ReactNode;
    /** Machine-readable date for `time`, e.g. "2026-03-12T09:30". */
    dateTime?: string;
    /** Icon in the marker. A dot is drawn when there's none. */
    icon?: React.ReactNode;
    /** Colours the marker. */
    tone?: 'default' | 'brand' | 'success' | 'warning' | 'destructive' | 'info';
}
/** One event in a `Timeline`. Children are its description. */
export declare const TimelineItem: React.ForwardRefExoticComponent<TimelineItemProps & React.RefAttributes<HTMLLIElement>>;
export interface DataListProps extends React.HTMLAttributes<HTMLDListElement> {
    /** `horizontal` (default) puts labels beside values; `vertical` puts each label above its value. */
    orientation?: 'horizontal' | 'vertical';
}
/** Labelled values, such as order details or a profile summary. Renders a `<dl>`. */
export declare const DataList: React.ForwardRefExoticComponent<DataListProps & React.RefAttributes<HTMLDListElement>>;
export interface DataListItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** The label, rendered as `<dt>`. */
    label: React.ReactNode;
}
/** One label and value. Children are the value, rendered as `<dd>`. */
export declare const DataListItem: React.ForwardRefExoticComponent<DataListItemProps & React.RefAttributes<HTMLDivElement>>;
