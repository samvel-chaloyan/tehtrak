# Tehtrak Components

## Purpose

This document defines **UI primitive anatomy** — purpose, structure, variants, spacing, and states.

No screen layouts (see [screen-patterns.md](./screen-patterns.md)). No composition patterns (see [ui-system.md](./ui-system.md)).

Implementation: `apps/mobile/src/shared/ui/`.

---

## Button

### Purpose

Commit actions and form submission. Used sparingly on populated screens.

### Variants

| Variant | Background | Border | Text color | Use |
|---------|------------|--------|------------|-----|
| `primary` | `primary` | — | white | One main action per screen |
| `secondary` | `background` | `border` | `primary` | Supporting actions |
| `ghost` | transparent | — | `textSecondary` | Tertiary, navigational |
| `danger` | `background` | `danger` | `danger` | Destructive only |

### Sizes

| Size | Min height | Horizontal padding |
|------|------------|-------------------|
| `md` | 48 | `md` (16) |
| `lg` | 52 | `lg` (24) |

### Anatomy

```
┌─────────────────────────┐
│        Label            │  subtitle variant, centered
└─────────────────────────┘
```

Radius: `md` (12). Optional `fullWidth`.

### States

* **Default** — full opacity
* **Pressed** — opacity 0.88
* **Disabled** — opacity 0.5, non-interactive

---

## TextLink

### Purpose

Quiet inline actions that must not dominate content. Preferred for add/create on populated screens.

### Anatomy

```
Add item          ← subtitle or body, primary or secondary color
```

### Variants

| Prop | Text color |
|------|------------|
| default | `textSecondary` |
| `emphasis` | `primary` |

Hit slop: 8. No background or border.

### States

Standard pressable feedback.

---

## Card

### Purpose

Generic bordered container. Prefer `NotebookRow` for list items.

### Anatomy

```
┌────────────────────────────┐
│  children                  │
└────────────────────────────┘
```

Padding: `md`. Radius: `lg`. Border: 1px `border`. Background: `background`.

### Selected state

Left accent: 3px `primary` left border. Remaining borders: `border`.

### States

Optional `onPress` — entire card tappable.

---

## NotebookRow

### Purpose

Index row inside a grouped `NotebookIndex` surface. Typography only — no icons, no per-row cards.

### Sizes

| Size | Title | Description | Padding |
|------|-------|-------------|---------|
| `workspace` | `title` (20/600) | `body` (17/400) | `lg` vertical |
| `collection` | `subtitle` (17/500) | `bodySmall` | `md` vertical |
| `item` | `subtitle` (17/500) | `bodySmall` | `md` vertical |

### Anatomy

```
Title
Description (optional)
Meta (optional, caption tertiary)
────────────────  inset divider when showDivider
```

### States

* **Pressable workspace rows** — title uses `accent`; description stays `secondary`
* **Pressed** — `primaryMuted` background
* No borders on individual rows
* No emoji

---

## NotebookIndex

### Purpose

One grouped white surface for list screens. Rows + inset dividers inside.

### Style

`useNotebookIndexStyle()` — surface background, hairline border, `lg` radius.

---

## PageHeader

### Purpose

In-screen title when native navigation is hidden. Typography only — no cards, no accent boxes.

### Anatomy

```
PageTitle
subtitle (bodySmall, secondary)     [optional TextLink action]
```

Use on: Workspace list, Settings, Auth forms.

---

## ScreenMeta

### Purpose

Quiet caption below native navigation. Never repeats the nav title.

Example: `4 collections`

---

## NotebookPage

### Purpose

Bordered notebook page for a single item — framed content with header and property rows.

### Components

| Component | Role |
|-----------|------|
| `NotebookPage` | Primary border frame (reuses index surface style) |
| `NotebookPageHeader` | Item name, updated caption, optional trailing action |
| `NotebookPageRow` | Label + value or input, inset divider between rows |

Use on item detail (view and edit). View mode shows formatted values; edit mode uses embedded plain inputs in the same rows.

---

## NotebookField

### Purpose

Readable property on an item page — legacy simple field layout. Prefer `NotebookPageRow` inside `NotebookPage` for item detail screens.

### Anatomy

```
label   caption, tertiary
value   body
```

Spacing between fields: `xl`. No boxes or borders.

---

## IndexFooter

### Purpose

TextLink actions below a grouped index. No tinted tray — padding only.

---

## ScreenHeader

Deprecated alias for `PageHeader`.

---

## Input

### Purpose

Single-line text entry in forms.

### Anatomy

```
Label          ← label variant, above field
┌────────────────────────────┐
│  value                     │  min height 48
└────────────────────────────┘
Error text     ← caption, danger (below)
```

Radius: `md`. Border: 1px `border`. Background: `background`.

### Variants

| Variant | Use |
|---------|-----|
| `default` | Standalone form fields (create flows) |
| `plain` | Embedded in `NotebookPageRow` — no box, label provided by row |

### States

* **Default**
* **Focused** — border `primary`
* **Error** — border `danger`, error message below
* **Disabled** — reduced opacity

---

## Screen

### Purpose

Root layout wrapper — safe area and horizontal padding.

### Anatomy

```
┌ Screen ────────────────────┐
│  horizontal padding: lg    │
│  children                  │
└────────────────────────────┘
```

Background: `background`.

---

## ScreenHeader

Deprecated alias for `PageHeader`. See **PageHeader** above.

---

## PageTitle

### Purpose

Consistent screen title typography.

### Anatomy

Single `titleLarge` text node. Used inside `ScreenHeader` or standalone.

---

## SectionHeader

### Purpose

In-screen section divider with title and optional trailing action.

### Anatomy

```
Section Title      sectionTitle     [optional action]
```

Margin below: `md`.

---

## ThreeLines

### Purpose

Brand signature — visual anchor for empty, welcome, and loading states.

### Variants

| Prop | Description |
|------|-------------|
| `size` | `sm` \| `md` \| `lg` \| `xl` \| `2xl` |
| `tone` | `default` (outer lines muted, middle `primary`) \| `brand` (all `primary`) |
| `align` | `left` \| `center` |

Three horizontal lines. Default tone: middle line `primary`, outer lines muted. Brand tone: all lines `primary`. No animation in MVP.

---

## EmptyNotebook

### Purpose

Standard empty state for lists and notebooks.

### Anatomy

```
ThreeLines (center)
Title (sectionTitle)
Description (body, secondary)
TextLink action (optional)
```


## SkeletonCard

### Purpose

Loading placeholder shaped like a `NotebookRow`.

### Anatomy

```
┌────────────────────────────┐
│ ≡≡  ████████               │  pulsing opacity
│     ██████████████         │
└────────────────────────────┘
```

Animated opacity loop. Matches notebook row border and padding.

---

## SkeletonList

### Purpose

Vertical list of `SkeletonCard` instances.

Gap: `list` (12). Configurable count.

---

## Loader

### Purpose

Full-screen spinner.

### Use

App startup and authentication bootstrap only. Not for list or screen loading.

---

## Text

### Purpose

Typography wrapper applying variants from [typography.md](./typography.md).

### Color props

`primary`, `secondary`, `tertiary`, `inverse`, `accent`, `danger` — mapped to design tokens.

---

## Stack

### Purpose

Layout helper for vertical/horizontal spacing using gap tokens.

Not a visual component — no styling beyond gap and alignment.
