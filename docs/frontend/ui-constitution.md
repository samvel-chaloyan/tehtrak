# Tehtrak UI Constitution

## Purpose

This document defines **non-negotiable UI rules**.

It answers: *What design rules may never be violated?*

For product feeling, see [design-language.md](./design-language.md). For exact values, see [design-tokens.md](./design-tokens.md) and [typography.md](./typography.md). For component anatomy, see [components.md](./components.md).

All screens, components, and flows must follow these rules. Do not invent styles outside this system without updating documentation first.

---

## Content First

Content is always the hero. Actions support content.

* Lists and readable information must visually dominate populated screens
* Buttons must not be the largest or most prominent element on populated screens
* Primary actions may appear in headers or at natural completion points — not as full-width bars above content
* Prefer text links for secondary and inline actions on populated screens

---

## Typography-First Hierarchy

Hierarchy comes from typography, not color, borders, or effects.

* Page title is visually dominant on every screen
* Section titles separate content groups
* Body text carries primary reading content
* Metadata and captions are visually quiet

Do not use bright colors, heavy borders, large buttons, or visual effects to compensate for weak hierarchy.

Rules and scale: [typography.md](./typography.md).

---

## Accent Color Philosophy

Primary color is an accent, not a theme.

Use primary color only for:

* one primary action per screen (when a button is appropriate)
* active or selected state
* focused input state

Do not use primary color for:

* decoration
* large background fills
* secondary buttons
* list row backgrounds
* conveying hierarchy that typography should handle

**Rule of thumb:** primary color should occupy less than 10% of visible screen area. If a screen feels blue, reduce accent usage.

Exact values: [design-tokens.md](./design-tokens.md).

---

## Layout

### Screen padding

Default horizontal padding: `lg` (24). Minimum: `md` (16).

### Vertical rhythm

Use spacing tokens only. No arbitrary values.

Allowed scale: [design-tokens.md](./design-tokens.md).

### Cards and lists

* Notebook rows use subtle borders, not heavy shadows
* Prefer borders over shadows
* Heavy shadows are prohibited
* List gap between rows: `list` (12)
* Entire row is tappable

Component anatomy: [components.md](./components.md).

---

## Actions

### One primary action

Maximum one primary button per screen.

### Button hierarchy

| Variant | Role |
|---------|------|
| Primary | Single main commit action (save, continue, sign in) |
| Secondary | Supporting actions; visually quiet |
| Ghost | Tertiary or navigational actions |
| Danger | Destructive actions only |

On populated screens, prefer `TextLink` over buttons for create/add actions.

Variants and sizing: [components.md](./components.md).

---

## Forms

* Labels always above the field — never floating labels
* Errors below the field, concise and human-readable
* Validate on submit for speed; focus first invalid field on error

Form implementation: [form-engine.md](./form-engine.md). Input anatomy: [components.md](./components.md).

---

## Navigation Chrome

* Header: back, title, optional single action
* Never overload the header — maximum one accent action
* Native stack titles and in-screen `ScreenHeader` must not compete for dominance

Screen-specific placement: [screen-patterns.md](./screen-patterns.md).

---

## States

### Empty

Every list screen requires an empty state. Structure and component: [components.md](./components.md) (`EmptyNotebook`). Placement: [screen-patterns.md](./screen-patterns.md).

### Loading

Prefer skeleton placeholders over spinners. Full-screen loaders only during app startup and authentication bootstrap.

### Error

Human-readable messages. Retry when recovery is possible.

State verification: [screen-quality-checklist.md](./screen-quality-checklist.md).

---

## Icons

Icons support content. Icons are not content.

* Simple outline style
* No 3D, colorful, or decorative iconography

Library: [ui-system.md](./ui-system.md).

---

## Motion

* Duration: token values in [design-tokens.md](./design-tokens.md)
* Allowed: fade, subtle scale, slide
* Prohibited: bounce, exaggerated spring, playful effects

Tehtrak should feel calm in motion.

---

## Accessibility

* Minimum touch target: 44×44 (preferred 48×48 for primary actions)
* Maintain accessible color contrast
* Do not communicate information using color alone
* `accessibilityLabel` on all interactive elements

Verification: [screen-quality-checklist.md](./screen-quality-checklist.md).

---

## Compliance

Before shipping UI:

1. [ui-audit.md](./ui-audit.md) — design pass
2. [screen-quality-checklist.md](./screen-quality-checklist.md) — engineering pass

A functioning screen that fails either audit is not complete.
