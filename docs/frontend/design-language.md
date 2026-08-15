# Tehtrak Design Language

## Purpose

This document defines what Tehtrak should **feel like**.

It answers: *What should Tehtrak feel like?*

For enforceable rules, see [ui-constitution.md](./ui-constitution.md). For visual values, see [design-tokens.md](./design-tokens.md).

---

## Product Identity

Tehtrak is a calm operational notebook.

It helps people organize real-world information through workspaces, collections, items, and properties.

Tehtrak is **not**:

* a database tool
* inventory software
* admin software
* an ERP or enterprise dashboard
* developer tooling

Tehtrak **is** a trusted place where people record, organize, and maintain operational knowledge.

---

## Emotional Tone

Users should feel:

* **calm** — no urgency, no noise
* **trustworthy** — stable, predictable, professional
* **warm** — human, approachable, not cold or corporate
* **organized** — clear structure without rigidity
* **in control** — confident about what they are looking at and what to do next

Users should never feel:

* overwhelmed
* rushed
* confused
* buried in configuration
* like they are using business software

---

## Notebook-First Philosophy

### Paper before software

The primary inspiration is a **notebook**, not a dashboard, database, or admin panel.

When making design decisions, prefer:

**Notebook → Software**

### Domain metaphor

| Product concept | Feels like |
|-----------------|------------|
| Workspace | Notebook |
| Collection | Section |
| Item | Page |
| Property | Field on the page |

Avoid framing that evokes databases:

| Avoid | Prefer |
|-------|--------|
| Schema | Collection structure |
| Entity | Item |
| Resource | Collection |
| Record (user-facing) | Item |
| Dataset | Workspace |

---

## Real World First

Tehtrak stores real operational information:

* Winter Food Storage
* Parking Log
* Tool Inventory
* Garden Harvest
* Customer Visits

The interface should remind users of the real-world process they are managing. Content should feel tangible and purposeful.

---

## Visual Identity

### Content over decoration

Information is the hero. The UI exists to support content.

Avoid large illustrations, decorative graphics, unnecessary badges, and visual clutter.

Prefer whitespace, structure, typography, and hierarchy.

### The Three Lines

The visual symbol of Tehtrak is three horizontal lines.

**Meaning:** record · structure · memory

They represent written information — the visual foundation of the brand.

They may appear in:

* logo and splash
* loading placeholders

Empty list bodies use a large, very soft blue wordmark watermark instead of ThreeLines — calm atmosphere without a competing foreground mark.

They should remain simple and recognizable. See [components.md](./components.md) for the `ThreeLines` component and `BrandWatermark`.

### Color character

* **System gray background** (`#F5F5F7`) dominates — the canvas for every screen
* **White surfaces** (`surface`) for grouped lists, inputs, modals, and rare cards
* **Primary blue** accents — clarity, trust, organization; used sparingly, never as decoration
* **Warm grays** for text hierarchy — `textPrimary`, `textSecondary`, `textTertiary`
* **Muted feedback** — success and danger as soft washes with gentler emphasis icons

Exact values and surface rules: [design-tokens.md](./design-tokens.md). Usage rules: [ui-constitution.md](./ui-constitution.md).

---

## Calm Productivity

Tehtrak does not compete for attention.

No hype. No urgency. No aggressive notifications. No unnecessary animation.

The application should feel stable and trustworthy — a notebook you return to, not an app that demands attention.

---

## Voice and Tone

Tehtrak speaks like a helpful assistant, not a technical system.

| Good | Avoid |
|------|-------|
| Add your first item | Initialize dataset |
| Create a collection | Configure schema |
| No items yet | No records found |
| This notebook is empty | Empty result set |

Use product language: Workspace, Collection, Item, Property.

---

## Screen Clarity

Every screen should answer within three seconds:

1. What am I looking at?
2. What can I do here?
3. What should I do next?

If not, simplify the screen.

---

## Decision Priority

When uncertain, choose:

* clear over beautiful
* understandable over clever
* focused over feature-rich

Every time.
