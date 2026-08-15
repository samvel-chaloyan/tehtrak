# Tehtrak UI Audit

## Purpose

**Design review checklist only.**

Use when evaluating whether UI feels like Tehtrak — a calm operational notebook.

For engineering completion (loading states, TypeScript, navigation), see [screen-quality-checklist.md](./screen-quality-checklist.md).

Reference: [design-language.md](./design-language.md), [ui-constitution.md](./ui-constitution.md).

---

## Identity

- [ ] Feels like a notebook
- [ ] Feels calm, warm, and professional
- [ ] Does not feel like inventory software
- [ ] Does not feel like admin software
- [ ] Does not feel like a database or developer tool
- [ ] Uses product language (Workspace, Collection, Item, Property)
- [ ] Avoids technical language (schema, entity, dataset, record)

---

## Hierarchy

- [ ] User can identify screen purpose in under 3 seconds
- [ ] Page title is immediately visible
- [ ] Content is visually dominant over actions
- [ ] Lists are stronger than buttons on populated screens
- [ ] Actions support content; they do not compete with it
- [ ] Typography creates clear reading order

---

## Typography

- [ ] Uses typography tokens only ([typography.md](./typography.md))
- [ ] Page title is visually dominant
- [ ] No more than five text levels on screen
- [ ] Color is not used as primary hierarchy tool
- [ ] No unnecessary font weights

---

## Color

- [ ] Accent color occupies less than 10% of visible area
- [ ] Primary color not used decoratively
- [ ] Secondary and ghost actions are visually quiet
- [ ] Status colors used only for status (success, warning, danger)
- [ ] White/background dominates

---

## Spacing

- [ ] Uses design tokens only ([design-tokens.md](./design-tokens.md))
- [ ] No arbitrary spacing values
- [ ] Comfortable reading density — not cramped, not wasteful
- [ ] List gap is consistent (`list`)

---

## Buttons and Actions

- [ ] Maximum one primary button per screen
- [ ] Buttons do not dominate populated screens
- [ ] Create/add on populated screens uses TextLink or header action
- [ ] Button labels are clear and human
- [ ] Destructive actions use danger styling only

---

## Cards and Lists

- [ ] Rows feel like notebook entries, not CRUD/admin rows
- [ ] No emoji as primary card visual
- [ ] Subtle borders; no heavy shadows
- [ ] Selected state uses left accent, not loud outlines
- [ ] Row content readable without opening

---

## Empty States

- [ ] Empty state exists where lists can be empty
- [ ] Uses soft brand watermark + encouraging copy
- [ ] Explains next step clearly
- [ ] Contains an action that does not overpower the message

---

## Motion and Chrome

- [ ] No bounce or playful animation
- [ ] Header has at most one accent action
- [ ] Icons are simple and supportive, not decorative
- [ ] Edit/delete follows the gesture map (grid long-press, list swipe, structure RowActions, item footer)
- [ ] Status bar is visible; icon tone matches chrome (light on brand, dark on canvas)

---

## Final Question

If shown to a new user for 3 seconds, could they say:

> "This is where I keep track of things."

**YES / NO**

If NO, identify failing sections above and revise before shipping.

---

## Audit Report Template

When delivering UI work, include:

### UI Audit Results

**PASS**

* (list passed categories)

**FAIL**

* (list failed items with screen/area)

**RECOMMENDATIONS**

* (follow-up improvements)
