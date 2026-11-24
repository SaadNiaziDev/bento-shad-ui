---
title: Examples
description: Build a dashboard, workspace settings, pricing page and onboarding flow with copyable component compositions.
---

These examples combine the same components used throughout the kit. Switch the site theme to see each composition in light and dark mode, then open the HTML tab to copy it. The data is illustrative. Buttons that show toasts demonstrate local feedback; connect persistence, authentication and billing in your application.

## Analytics overview

Use a wide tile for the main story and smaller tiles for supporting metrics. Give charts a text alternative and keep the scale consistent. Built with [Bento grid](components/bento-grid.md), [Stat](components/stat.md), [Bar chart](components/bar-chart.md) and [Table](components/table.md).

```html preview full
<div class="bk-bento">
    <div class="bk-bento-grid">
        <article class="bk-tile bk-span-2">
            <div class="bk-stat">
                <span class="bk-stat-label">Monthly revenue</span>
                <span class="bk-stat-value">$24,680</span>
                <span
                    class="bk-stat-delta"
                    data-trend="up"
                >
                    +18.6% from last month
                </span>
            </div>
        </article>
        <article class="bk-tile bk-span-2">
            <div class="bk-stat">
                <span class="bk-stat-label">Active subscriptions</span>
                <span class="bk-stat-value">1,482</span>
                <span
                    class="bk-stat-delta"
                    data-trend="up"
                >
                    +124 from last month
                </span>
            </div>
        </article>
        <article class="bk-tile bk-span-full">
            <div class="bk-tile-header">
                <div>
                    <h3 class="bk-tile-title">Revenue, in perspective</h3>
                    <p class="bk-tile-description">
                        Last six months · USD thousands · scale 0–30
                    </p>
                </div>
                <span
                    class="bk-badge"
                    data-variant="outline"
                >
                    Monthly
                </span>
            </div>
            <div
                class="bk-chart"
                role="img"
                aria-label="Revenue: June $12,000; July $18,000; August $15,000; September $21,000; October $24,000; November $24,680."
            >
                <div class="bk-bars">
                    <div
                        class="bk-bar"
                        data-muted
                        style="--v: 40%"
                        data-value="$12k"
                    ></div>
                    <div
                        class="bk-bar"
                        data-muted
                        style="--v: 60%"
                        data-value="$18k"
                    ></div>
                    <div
                        class="bk-bar"
                        data-muted
                        style="--v: 50%"
                        data-value="$15k"
                    ></div>
                    <div
                        class="bk-bar"
                        data-muted
                        style="--v: 70%"
                        data-value="$21k"
                    ></div>
                    <div
                        class="bk-bar"
                        data-muted
                        style="--v: 80%"
                        data-value="$24k"
                    ></div>
                    <div
                        class="bk-bar"
                        style="--v: 82.27%"
                        data-value="$24.68k"
                    ></div>
                </div>
                <div class="bk-bar-labels">
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                </div>
            </div>
        </article>
        <article class="bk-tile bk-span-full">
            <h3 class="bk-tile-title">Recent invoices</h3>
            <div class="bk-table-wrap">
                <table class="bk-table">
                    <caption>
                        Illustrative customer invoices for November
                    </caption>
                    <thead>
                        <tr>
                            <th scope="col">Customer</th>
                            <th scope="col">Status</th>
                            <th
                                scope="col"
                                data-align="end"
                            >
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Studio North</td>
                            <td>
                                <span
                                    class="bk-badge"
                                    data-variant="success"
                                >
                                    Paid
                                </span>
                            </td>
                            <td data-align="end">$240.00</td>
                        </tr>
                        <tr>
                            <td>Forma Design</td>
                            <td>
                                <span
                                    class="bk-badge"
                                    data-variant="warning"
                                >
                                    Pending
                                </span>
                            </td>
                            <td data-align="end">$120.00</td>
                        </tr>
                        <tr>
                            <td>Orbit Labs</td>
                            <td>
                                <span
                                    class="bk-badge"
                                    data-variant="outline"
                                >
                                    Draft
                                </span>
                            </td>
                            <td data-align="end">$480.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </article>
    </div>
</div>
```

## Workspace settings

Use visible labels, helpful descriptions and native controls. This preview uses a button to demonstrate feedback; a real form should validate and save before reporting success. Built with [Field](components/field.md), [Input](components/input.md), [Switch](components/switch.md) and [Card](components/card.md).

```html preview full
<section
    class="bk-card"
    aria-labelledby="example-settings-title"
>
    <div class="bk-card-header">
        <h3
            class="bk-card-title"
            id="example-settings-title"
        >
            Workspace settings
        </h3>
        <p class="bk-card-description">The details your team sees.</p>
    </div>
    <div class="bk-card-content bk-form">
        <div class="bk-form-row">
            <div class="bk-field">
                <label
                    class="bk-label"
                    for="example-workspace"
                >
                    Workspace name
                </label>
                <input
                    class="bk-input"
                    id="example-workspace"
                    value="Studio North"
                    autocomplete="organization"
                />
            </div>
            <div class="bk-field">
                <label
                    class="bk-label"
                    for="example-email"
                >
                    Contact email
                </label>
                <input
                    class="bk-input"
                    type="email"
                    id="example-email"
                    value="hello@example.com"
                    autocomplete="email"
                />
            </div>
        </div>
        <div class="bk-field">
            <label
                class="bk-label"
                for="example-timezone"
            >
                Time zone
            </label>
            <select
                class="bk-select"
                id="example-timezone"
            >
                <option>Asia/Karachi (UTC+05:00)</option>
                <option>Europe/London</option>
                <option>America/New_York</option>
            </select>
        </div>
        <hr class="bk-separator" />
        <label class="bk-switch-row">
            <span class="bk-option-text">
                <span>Weekly digest</span>
                <span>A summary of activity in your workspace.</span>
            </span>
            <input
                class="bk-switch"
                type="checkbox"
                role="switch"
                checked
            />
        </label>
        <label class="bk-switch-row">
            <span class="bk-option-text">
                <span>Product updates</span>
                <span>Occasional news about new features.</span>
            </span>
            <input
                class="bk-switch"
                type="checkbox"
                role="switch"
            />
        </label>
    </div>
    <div class="bk-card-footer">
        <button
            class="bk-button"
            type="button"
            data-bk-toast='{"title":"Preview only","description":"Connect this form to your save handler.","variant":"info"}'
        >
            Preview save feedback
        </button>
    </div>
</section>
```

## Subscription plans

A neutral comparison keeps the recommended plan in focus. Prices are example content; these controls do not start checkout. Built with [Card](components/card.md), [Badge](components/badge.md) and [Button](components/button.md).

```html preview full
<div class="bk-bento">
    <div class="bk-bento-grid">
        <article class="bk-tile bk-span-2">
            <span class="bk-eyebrow">Personal</span>
            <h3 class="bk-tile-title">Space to explore</h3>
            <div class="bk-stat">
                <span class="bk-stat-value">$0</span>
                <span class="bk-stat-label">Free, for personal projects</span>
            </div>
            <ul>
                <li>3 projects</li>
                <li>Community support</li>
                <li>Core components</li>
            </ul>
            <button
                class="bk-button"
                data-variant="outline"
                type="button"
                data-bk-toast='{"title":"Personal plan preview","description":"Add your sign-up flow here."}'
            >
                Start a project
            </button>
        </article>
        <article
            class="bk-tile bk-span-2"
            data-tone="mint"
        >
            <div class="bk-row bk-between">
                <span class="bk-eyebrow">Team</span>
                <span
                    class="bk-badge"
                    data-variant="outline"
                >
                    For growing teams
                </span>
            </div>
            <h3 class="bk-tile-title">Build together</h3>
            <div class="bk-stat">
                <span class="bk-stat-value">$24</span>
                <span class="bk-stat-label">
                    Per member / month, billed monthly
                </span>
            </div>
            <ul>
                <li>Unlimited projects</li>
                <li>Shared workspaces</li>
                <li>Priority support</li>
            </ul>
            <button
                class="bk-button"
                data-variant="brand"
                type="button"
                data-bk-toast='{"title":"Team plan preview","description":"Connect your billing provider to start checkout."}'
            >
                Explore Team
            </button>
        </article>
    </div>
</div>
```

## Onboarding checklist

Use native checkboxes for tasks and keep the action close to its context. This example lets people check tasks locally; it does not persist progress. Built with [Checkbox](components/checkbox.md), [Alert](components/alert.md) and [Button](components/button.md).

```html preview full
<section
    class="bk-card"
    aria-labelledby="example-onboarding-title"
>
    <div class="bk-card-header">
        <span class="bk-eyebrow">Your first workspace</span>
        <h3
            class="bk-card-title"
            id="example-onboarding-title"
        >
            Make yourself at home
        </h3>
        <p class="bk-card-description">
            A few small steps to get your team moving.
        </p>
    </div>
    <div class="bk-card-content bk-stack">
        <label class="bk-option">
            <input
                class="bk-checkbox"
                type="checkbox"
                checked
            />
            <span class="bk-option-text">
                <span>Name your workspace</span>
                <span>Pick something your team will recognise.</span>
            </span>
        </label>
        <label class="bk-option">
            <input
                class="bk-checkbox"
                type="checkbox"
            />
            <span class="bk-option-text">
                <span>Create your first project</span>
                <span>Start with one goal and a few tasks.</span>
            </span>
        </label>
        <label class="bk-option">
            <input
                class="bk-checkbox"
                type="checkbox"
            />
            <span class="bk-option-text">
                <span>Invite a teammate</span>
                <span>Good work is better together.</span>
            </span>
        </label>
        <div
            class="bk-alert"
            role="note"
        >
            <div>
                <div class="bk-alert-title">Go at your own pace</div>
                <p class="bk-alert-description">
                    You can return to this checklist whenever you like.
                </p>
            </div>
        </div>
    </div>
    <div class="bk-card-footer">
        <button
            class="bk-button"
            type="button"
            data-bk-toast='{"title":"Invitation preview","description":"Connect your invitation handler here."}'
        >
            Preview invitation
        </button>
    </div>
</section>
```

## Use these patterns in React

Import the stylesheet once. React components use props in place of HTML data attributes; use application state for data and event handlers for actions. See the [React guide](react.md) for setup and the component pages for the full prop tables.

```tsx
import 'bento-shad-ui/bento.css';
import { BentoGrid, Tile, Stat, Button, toast } from 'bento-shad-ui/react';

export function Overview() {
    return (
        <BentoGrid>
            <Tile>
                <Stat
                    label="Monthly revenue"
                    value="$24,680"
                    delta="+18.6%"
                    trend="up"
                />
            </Tile>
            <Tile>
                <Stat
                    label="Active projects"
                    value="12"
                />
            </Tile>
            <Tile span={2}>
                <Button onClick={() => toast({ title: 'Preview only' })}>
                    Preview feedback
                </Button>
            </Tile>
        </BentoGrid>
    );
}
```
