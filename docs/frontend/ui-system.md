# Tehtrak UI System

## Purpose

This document defines **how components work together** — composition patterns and codebase layout.

No token tables (see [design-tokens.md](./design-tokens.md)). No component anatomy (see [components.md](./components.md)). No screen-specific layouts (see [screen-patterns.md](./screen-patterns.md)).

When documents conflict, follow hierarchy in [README.md](./README.md).

---

## Standard Screen Composition

Authenticated app screens use **`AppScreenShell`** — custom header (`ScreenLineHeader`), scrollable content, optional `FixedFooterFrame` bottom action.

```
AppScreenShell
├── ScreenLineHeader (context title + subtitle)
├── Content (scroll when needed)
│   ├── PageTitle (when content needs its own hero title)
│   ├── NotebookRow list | NotebookField page | form fields
│   └── EmptyNotebook | EmptyListContent (when no content)
└── Footer action (optional, forms only via FixedFooterFrame)
    └── OutlineButton primary
```

Settings and other simple screens may still use legacy **`Screen`** with a native stack title.

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
AppScreenShell — title "Item", subtitle collection name
└── NotebookPage (primary border frame)
    ├── NotebookPageHeader — item name + updated caption
    └── NotebookPageRow × n — view values or embedded edit inputs
```

View and edit share one screen. Footer toggles between Edit and Save.

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
├── AppScreenShell.tsx
├── FixedFooterFrame.tsx
├── ScreenBottomBar.tsx
├── KeyboardDismissView.tsx
├── Button.tsx
├── OutlineButton.tsx
├── TextLink.tsx
├── RowActions.tsx
├── NotebookRow.tsx
├── NotebookField.tsx
├── Input.tsx
├── Screen.tsx          (Settings and legacy screens)
├── ScreenLineHeader.tsx
├── PageTitle.tsx
├── EmptyNotebook.tsx
├── SkeletonList.tsx
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
