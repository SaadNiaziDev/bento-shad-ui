import * as React from 'react';
import { cx } from './utils';

/* ---------------------------------------------------------------- Steps */

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
export const Steps = React.forwardRef<HTMLOListElement, StepsProps>(function Steps(
  { steps, current, orientation = 'horizontal', completedLabel = 'Completed', className, ...props },
  ref,
) {
  return (
    <ol ref={ref} className={cx('bk-steps', className)} data-orientation={orientation === 'vertical' ? 'vertical' : undefined} {...props}>
      {steps.map((step, i) => {
        const status = i < current ? 'complete' : i === current ? 'current' : 'upcoming';
        return (
          <li key={i} className="bk-step" data-status={status} aria-current={status === 'current' ? 'step' : undefined}>
            <span className="bk-step-marker" aria-hidden="true" />
            <span className="bk-step-text">
              <span className="bk-step-title">
                {status === 'complete' ? <span className="bk-sr-only">{completedLabel}: </span> : null}
                {step.title}
              </span>
              {step.description ? <span className="bk-step-description">{step.description}</span> : null}
            </span>
          </li>
        );
      })}
    </ol>
  );
});

/* ---------------------------------------------------------------- Timeline */

export const Timeline = React.forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(function Timeline({ className, ...props }, ref) {
  return <ol ref={ref} className={cx('bk-timeline', className)} {...props} />;
});

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
export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(function TimelineItem(
  { title, time, dateTime, icon, tone = 'default', className, children, ...props },
  ref,
) {
  return (
    <li ref={ref} className={cx('bk-timeline-item', className)} data-tone={tone === 'default' ? undefined : tone} {...props}>
      <span className="bk-timeline-marker" aria-hidden="true">{icon}</span>
      <div className="bk-timeline-content">
        <div className="bk-timeline-head">
          <p className="bk-timeline-title">{title}</p>
          {time ? <time className="bk-timeline-time" dateTime={dateTime}>{time}</time> : null}
        </div>
        {children ? <div className="bk-timeline-description">{children}</div> : null}
      </div>
    </li>
  );
});

/* ---------------------------------------------------------------- Data list */

export interface DataListProps extends React.HTMLAttributes<HTMLDListElement> {
  /** `horizontal` (default) puts labels beside values; `vertical` puts each label above its value. */
  orientation?: 'horizontal' | 'vertical';
}

/** Labelled values, such as order details or a profile summary. Renders a `<dl>`. */
export const DataList = React.forwardRef<HTMLDListElement, DataListProps>(function DataList({ orientation = 'horizontal', className, ...props }, ref) {
  return <dl ref={ref} className={cx('bk-data-list', className)} data-orientation={orientation === 'vertical' ? 'vertical' : undefined} {...props} />;
});

export interface DataListItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The label, rendered as `<dt>`. */
  label: React.ReactNode;
}

/** One label and value. Children are the value, rendered as `<dd>`. */
export const DataListItem = React.forwardRef<HTMLDivElement, DataListItemProps>(function DataListItem({ label, className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cx('bk-data-list-item', className)} {...props}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
});
