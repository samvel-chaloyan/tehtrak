# Screen Quality Checklist

## Purpose

**Engineering and UX completion checklist.**

A screen is engineering-complete only when all applicable checks pass.

For design feeling and visual identity, run [ui-audit.md](./ui-audit.md) separately. This document does not duplicate design philosophy.

Applies to: new screens, modifications, refactors, feature additions.

---

## Prerequisites

Before this checklist:

1. [ui-audit.md](./ui-audit.md) design pass completed
2. Screen follows [screen-patterns.md](./screen-patterns.md)

---

## Structure

- [ ] Uses `Screen` component
- [ ] Uses `ScreenHeader` / `PageTitle` per [screen-patterns.md](./screen-patterns.md)
- [ ] Uses spacing tokens only — no magic numbers
- [ ] Uses theme colors only — no hardcoded hex
- [ ] Uses typography tokens only — no arbitrary font sizes

---

## Components

- [ ] Reuses primitives from [components.md](./components.md)
- [ ] No duplicated one-off UI patterns
- [ ] Uses `Button`, `TextLink`, `NotebookRow`, `Input` as appropriate
- [ ] Composition follows [ui-system.md](./ui-system.md)

---

## States

### Loading

- [ ] Loading state exists
- [ ] Uses `SkeletonList` / `SkeletonCard` when showing list/content shape
- [ ] `Loader` only for bootstrap/auth — not ordinary screen fetch

### Empty

- [ ] Empty state exists for applicable lists
- [ ] Uses `EmptyNotebook`
- [ ] Empty action wired and navigates correctly

### Error

- [ ] Error state exists
- [ ] Message is human-readable (no raw API codes)
- [ ] Retry action when recovery is possible

---

## Forms (when applicable)

- [ ] Follows [form-engine.md](./form-engine.md)
- [ ] React Hook Form + Zod validation
- [ ] Validation messages are human-readable
- [ ] Required fields indicated
- [ ] Submit button shows loading/disabled during mutation

---

## Navigation

- [ ] Follows [navigation.md](./navigation.md)
- [ ] Back behavior is predictable
- [ ] No dead-end screens
- [ ] Params typed and passed correctly

---

## Accessibility

- [ ] Touch targets meet minimum ([design-tokens.md](./design-tokens.md))
- [ ] `accessibilityLabel` on interactive elements
- [ ] Color is not the only state indicator
- [ ] Readable on smaller phones with system font scaling

---

## Mobile First

- [ ] Layout works on small phones
- [ ] Keyboard does not hide critical actions
- [ ] Primary form actions reachable (thumb zone)
- [ ] Lists scroll smoothly

---

## Performance

- [ ] No obvious UI jank
- [ ] Lists use appropriate list component (FlashList when warranted)
- [ ] No unnecessary re-renders in hot paths

---

## Technical Quality

- [ ] TypeScript passes (`npm run typecheck`)
- [ ] Lint passes
- [ ] No debug logs left in screen code
- [ ] No unresolved TODO for shipped behavior

---

## Design Audit Gate

- [ ] [ui-audit.md](./ui-audit.md) completed
- [ ] Audit report attached (PASS/FAIL/RECOMMENDATIONS)

---

## Final Question

Would a user believe this screen belongs to Tehtrak — functionally and experientially?

If not an immediate yes, continue refining.
