# Frontend Documentation

Tehtrak frontend documentation is organized in a strict hierarchy. Each file owns one responsibility. When documents conflict, follow the hierarchy top to bottom.

---

## Hierarchy

```
Vision        → design-language.md
Principles    → ui-constitution.md
Tokens        → design-tokens.md, typography.md
Components    → components.md
Composition   → ui-system.md
Screens       → screen-patterns.md
Audit         → ui-audit.md, screen-quality-checklist.md
Implementation → form-engine.md, navigation.md, state-management.md, offline-storage.md
```

| Layer | File | Question it answers |
|-------|------|---------------------|
| Vision | [design-language.md](./design-language.md) | What should Tehtrak feel like? |
| Principles | [ui-constitution.md](./ui-constitution.md) | What design rules may never be violated? |
| Tokens | [design-tokens.md](./design-tokens.md) | What are the exact visual values? |
| Tokens | [typography.md](./typography.md) | How does text create hierarchy? |
| Components | [components.md](./components.md) | What does each UI primitive look like? |
| Composition | [ui-system.md](./ui-system.md) | How do components work together? |
| Screens | [screen-patterns.md](./screen-patterns.md) | How is each screen structured? |
| Audit | [ui-audit.md](./ui-audit.md) | Does it pass design review? |
| Audit | [screen-quality-checklist.md](./screen-quality-checklist.md) | Is the screen engineering-complete? |
| Implementation | [form-engine.md](./form-engine.md) | How are dynamic forms built? |
| Implementation | [navigation.md](./navigation.md) | How does navigation work? |
| Implementation | [state-management.md](./state-management.md) | How is client state managed? |
| Implementation | [offline-storage.md](./offline-storage.md) | How does offline storage work? |

---

## Responsibility Map

| Concern | Owner | Not owned by |
|---------|-------|--------------|
| Product personality, emotional tone | `design-language.md` | All other files |
| Non-negotiable UI rules | `ui-constitution.md` | `design-language.md` (vision only) |
| Color, spacing, radius, motion values | `design-tokens.md` | Philosophy in any file |
| Text scale and hierarchy rules | `typography.md` | `components.md` |
| Component anatomy and variants | `components.md` | `screen-patterns.md` |
| Component composition patterns | `ui-system.md` | Component definitions |
| Per-screen layout and action placement | `screen-patterns.md` | Component implementation |
| Design review checklist | `ui-audit.md` | `screen-quality-checklist.md` |
| Engineering completion checklist | `screen-quality-checklist.md` | `ui-audit.md` |
| Dynamic forms pipeline | `form-engine.md` | Design files |
| Navigation architecture | `navigation.md` | Design files |
| State and cache patterns | `state-management.md` | Design files |
| SQLite offline schema | `offline-storage.md` | Design files |

---

## Reading Order

### Before any UI work

1. [design-language.md](./design-language.md)
2. [ui-constitution.md](./ui-constitution.md)
3. [design-tokens.md](./design-tokens.md)
4. [typography.md](./typography.md)
5. [components.md](./components.md)
6. [screen-patterns.md](./screen-patterns.md)

### Before shipping a screen

1. [ui-audit.md](./ui-audit.md) — design pass
2. [screen-quality-checklist.md](./screen-quality-checklist.md) — engineering pass

### Before implementation details

- [ui-system.md](./ui-system.md) — composition
- [form-engine.md](./form-engine.md) — forms
- [navigation.md](./navigation.md) — routing

---

## Governance

### Adding or changing documentation

1. Identify which layer the change belongs to.
2. Update only the owning file.
3. Add cross-references; do not duplicate content.
4. If a rule spans layers (e.g. accent color), put the *why* in `ui-constitution.md` and the *values* in `design-tokens.md`.
5. Run both audit checklists before closing UI work.

### Prohibited patterns

- Defining the same token in multiple files
- Embedding component anatomy in screen patterns
- Embedding design philosophy in engineering checklists
- Adding hex colors outside `design-tokens.md`
- Adding font sizes outside `typography.md` and `design-tokens.md`

### When unsure

Prefer updating documentation before code. If a pattern is missing, add it to the correct owning file — do not extend an adjacent file.

---

## Documentation Audit (2025-06)

See [DOCUMENTATION-AUDIT.md](./DOCUMENTATION-AUDIT.md) for the full pre-refactor audit, overlap analysis, and removed sections.
