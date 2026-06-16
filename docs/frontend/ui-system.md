# Tehtrak UI System

## Purpose

This document defines **how components work together** — composition patterns and codebase layout.

No token tables (see [design-tokens.md](./design-tokens.md)). No component anatomy (see [components.md](./components.md)). No screen-specific layouts (see [screen-patterns.md](./screen-patterns.md)).

When documents conflict, follow hierarchy in [README.md](./README.md).

---

## Standard Screen Composition

```
Screen
└── ScreenHeader (optional)
    ├── PageTitle
    ├── subtitle (body, secondary)
    └── action slot → TextLink or compact control
└── Content
    ├── SectionHeader (optional)
    ├── NotebookRow list | NotebookField page | form fields
    └── EmptyNotebook (when no content)
└── Footer action (optional, forms only)
    └── Button primary
```

### Rules

* One visual title per screen — native header **or** `ScreenHeader`, not both competing
* Content area scrolls; header stays fixed
* Actions in header or footer — not as full-width bars above lists
* Empty content → `EmptyNotebook` replaces list

---

## List Screen Composition

```
Screen
├── ScreenHeader
│   ├── PageTitle + description
│   └── TextLink ("New …")
└── FlatList / ScrollView
    ├── NotebookRow × n   (gap: list)
    └── EmptyNotebook     (when n = 0)
```

Loading: `SkeletonList` in place of rows.

---

## Detail Screen Composition

### Collection / workspace context

```
Screen
├── ScreenHeader (title + description)
├── meta row (caption counts + TextLink actions)
└── NotebookRow list | EmptyNotebook
```

### Item detail

```
Screen
├── native header (item name)
└── bordered page container
    └── NotebookField × n
```

Single notebook page — not one card per field.

---

## Form Screen Composition

```
Screen
├── ScreenHeader or native title
├── Stack of Input / field components
└── Button primary (fullWidth, bottom area)
```

Dynamic field rendering: [form-engine.md](./form-engine.md).

Submit button in thumb zone. One primary button.

---

## Auth Screen Composition

```
Screen (centered or top-weighted)
├── ThreeLines
├── PageTitle or Text title
├── Input × n
├── Button primary (sign in / register)
└── Button ghost or TextLink (alternate path)
```

Auth screens may use primary buttons more prominently — no populated content to dominate.

---

## Action Hierarchy in Composition

| Priority | Component | Placement |
|----------|-----------|-----------|
| 1 | Content (lists, fields) | Center / majority of screen |
| 2 | TextLink | Header right, inline meta rows |
| 3 | Button secondary | Empty states, supporting actions |
| 4 | Button primary | Forms, auth, single commit |
| 5 | Button danger | Destructive confirmations only |

---

## Icons

Library: Lucide React Native (consistent stroke).

| Context | Size |
|---------|------|
| Default | 24 |
| Inline | 20 |

Icons accompany actions; they do not replace text labels in MVP.

---

## Theme Files

```
apps/mobile/src/theme/
├── colors.ts
├── typography.ts
├── spacing.ts
├── radius.ts
├── tokens.ts
└── ThemeProvider.tsx
```

Access via `useTheme()` hook.

---

## Component Files

```
apps/mobile/src/shared/ui/
├── Button.tsx
├── TextLink.tsx
├── Card.tsx
├── NotebookRow.tsx
├── NotebookField.tsx
├── Input.tsx
├── Screen.tsx
├── ScreenHeader.tsx
├── PageTitle.tsx
├── SectionHeader.tsx
├── ThreeLines.tsx
├── EmptyNotebook.tsx
├── SkeletonCard.tsx
├── SkeletonList.tsx
├── Loader.tsx
├── Text.tsx
├── Stack.tsx
└── index.ts
```

Import from `@/shared/ui`.

---

## Extension Rules

1. New visual patterns require updates to [components.md](./components.md) first
2. New composition patterns require updates to this file
3. Prefer extending existing components over creating parallel primitives
4. Do not duplicate token or typography values in component files — use `useTheme()`
