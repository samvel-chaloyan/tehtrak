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
| `workspace` | `subtitle` (17/600) | `bodySmall` | `xl` vertical |
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

* **Pressable rows** — workspace rows use neutral `background` on press; nested rows use `primaryMuted`
* **Pressed** — `primaryMuted` background (collection/item)
* No borders on individual rows
* No emoji

Workspace rows use swipe actions — no inline edit/delete buttons.

---

## SwipeableRow

### Purpose

Reveal edit/delete actions on swipe without visible row chrome.

### Actions

| Direction | Action | Background | Icon |
|-----------|--------|------------|------|
| Swipe right | Edit | `successMuted` | `successEmphasis` pencil |
| Swipe left | Delete | `dangerMuted` | `dangerEmphasis` trash |

Used on workspace list. Rows remain clean while browsing.

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

Property rows for a single item page. Prefer hosting them inside `NotebookListShelf` (`framed={false}`) so the page shares the same subtle grouped surface and right-footer meta as list screens.

### Components

| Component | Role |
|-----------|------|
| `NotebookPage` | Optional unframed container (shelf usually owns the surface) |
| `NotebookPageHeader` | Optional title block — prefer shelf footer meta for “Updated …” |
| `NotebookPageRow` | Label + value or input, quiet inset dividers |

Use on item detail (view and edit). View mode shows formatted values; edit mode uses embedded plain inputs in the same rows. Put update time in the shelf’s right meta slot (`Updated 3d ago`), not as a page header.

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

## ContextBanner

### Purpose

Band under the brand header — places capsule on Workspaces home; soft navigation capsule on nested screens; ambient copy as fallback.

### Variants

| Mode | When | Content |
|------|------|---------|
| Places home | Workspaces root | Soft white capsule — recent initials circles \| search |
| Search | After tapping search | Soft white capsule — back \| text field (focused) \| clear / search |
| Capsule | Nested screens | Soft white nav capsule — back \| context label \| search |
| Ambient | Fallback root | Rotating quiet `bodySmall` secondary lines, centered |

### Places home rules

* Same capsule chrome as nested (`CONTEXT_CAPSULE_HEIGHT` 52, pill, `surface`, `shadows.soft`)
* Horizontal story circles — initials only (`caption`); custom place icons later
* Soft primary ring on last-opened place
* Hairline separator before search
* Search: `search-outline`, `textSecondary`

### Inline search rules

* Tapping search frees the capsule — recent circles / context label leave; field takes the middle
* Auto-focus the text field so the cursor is ready
* Back exits search and restores the previous capsule mode
* Clear (when query non-empty) empties the field without exiting
* Body starts blank while the query is empty; filters the grid/list live as the user types
* No primary blue inside the search capsule

### Ambient rules

* Fixed height `CONTEXT_BANNER_HEIGHT` (36)
* Short lines: centered; rotate every 5–8 seconds with a soft fade
* Long lines: slow marquee after a ~1s pause, then loop
* No border, card, icon, or button
* No background
* Generous horizontal padding (`lg`)
* Vertically centered

### Capsule rules (nested)

* Height `CONTEXT_CAPSULE_HEIGHT` (52), fully rounded pill (`height / 2`)
* White `surface` fill — quiet shadow, no border
* Equal vertical gap (`CONTEXT_CAPSULE_GAP` = 12) above and below — centered between header and list
* Layout: back · hairline separator · label · search
* Icons + label: `textSecondary` (medium gray) — never primary blue, never pure black
* Label slot flexes between separator and search; short names stay still
* Long names: hold ~1s, then seamless looping marquee (`RunningText`)
* Reuse on Collections, Items, Item details (and other nested shells)
* Blue stays on header, primary actions, active states, and brand only

Implementation: `ContextBanner`, composed in `AppScreenShell` via `onBack` / `subtitle` / `onSearch` / `recentPlaces` / `searchActive` (+ query handlers).

---

## WorkspaceGridCard

### Purpose

Place tile for the workspace home grid — calm, typography-led. Workspace home pairs this grid with the places capsule (initials + search) above.

### Anatomy

```
┌─────────────────────────┐
│ ╭─ blue corner accent   │  outside, one continuous rounded L
│                         │
│  Workspace name         │  bodySmall, medium, primary
│                         │
│  4 collections          │  caption, secondary
│  Updated yesterday      │
└─────────────────────────┘
```

Radius: `xl` (20). Surface: `surface`. Shadow: `soft`. No full border.

Press: brief opacity fade only — no persistent selected tint on the grid.

Accent: one continuous primary stroke hugging the **outside** of the top-left rounded corner — not a full-width bar, not separate arc/arm pieces.

Long press: focus mode via `WorkspaceFocusMenu` when used in a measurable grid.

Metadata only — no description, icons, badges, or visible action buttons on the idle card.

Implementation: `WorkspaceGridCard` + `WorkspaceFocusMenu`.

---

## WorkspaceShortcutChip

### Purpose

Quiet shortcut chip (FieldChip density). Prefer story circles in the Workspaces capsule for home shortcuts; chip remains available if needed elsewhere.

### Anatomy

Bordered chip, `bodySmall`, max one line. Default: `surface` + `primaryBorder` + secondary label. Emphasized (last opened): `primaryMuted` + `primary` border + accent label.

Implementation: `WorkspaceShortcutChip`.

---

## WorkspaceRecentAvatar

### Purpose

Story-style place circle in the Workspaces capsule — initials for now; custom icons later.

Quiet ring (`border` / `primary` when emphasized), face on `background` / `primaryMuted`, `caption` initials.

Implementation: `WorkspaceRecentAvatar` + `workspaceInitials()`.

---

## WorkspaceFocusMenu

### Purpose

Contextual long-press menu for a workspace place card — dynamic position, not a static bottom sheet.

### Anatomy

```
┌ BlurView + soft scrim (full screen) ──────────────┐
│                                                   │
│          ┌ sharp card clone (window xy) ┐         │
│          │  Workspace name …            │         │
│          └──────────────────────────────┘         │
│               ┌ pill cluster ┐                    │
│               │ ← │ ✎ │ 🗑  │                    │
│               └─────────────┘                     │
└───────────────────────────────────────────────────┘
```

Cluster anchors below the card when there is room, otherwise above. Icons match app chrome: `chevron-back` (cancel), `create-outline` (edit), `trash-outline` (delete). Hairline separators between actions (same as nav capsule). Tap scrim cancels.

Tokens: `expo-blur` light blur, light scrim, `surface` pill, `shadows.soft`, `radius.full`.

Delete still opens the shared confirm bottom sheet after dismiss.

Implementation: `WorkspaceFocusMenu`.

---

## AppBottomSheet

### Purpose

Calm notebook bottom sheet for short choices and destructive confirms — replaces system alerts.

### Anatomy

```
┌ overlay (colors.overlay) ─────────────┐
│                                       │
│  ┌ surface, top radius xl, soft ───┐  │
│  │  optional title (bodySmall)     │  │
│  │  optional message (caption)     │  │
│  │  ───────────────── hairline     │  │
│  │  Action rows (centered body)    │  │
│  │  Cancel (secondary)             │  │
│  └─────────────────────────────────┘  │
└───────────────────────────────────────┘
```

Tokens: `surface`, `overlay`, `radius.xl` (top), `shadows.soft`, inset `spacing.md`, safe-area bottom.

Confirm density: `compact` — floating rounded card (`radius.xl` all sides), tighter padding, shorter action rows, lifted off the bottom edge.

Action tones: default (`textPrimary`), danger (`danger`), cancel (`textSecondary`). Typography-led — no large primary buttons.

Tap overlay or Cancel dismisses.

### Imperative API

Mount `SheetHost` at app root. Call sites use:

* `presentActions({ title?, actions[] })` — shared action menus
* `presentConfirm({ title, message, onConfirm })` — delete confirms via `confirmDelete`

Implementation: `AppBottomSheet`, `SheetHost`, `sheetController`.

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
