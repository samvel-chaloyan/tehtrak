# Tehtrak Screen Patterns

## Purpose

Per-screen layout structure — content order, hierarchy, and action placement.

See [components.md](./components.md) for anatomy. See [ui-constitution.md](./ui-constitution.md) for rules.

**Metaphor:** Workspace → Collection → Item = Notebook → Section → Page.

---

## Navigation philosophy

One title source per screen. Never duplicate.

**Bottom actions:** Every primary bottom button (New, Create, Continue, Save, etc.) uses the same slot via `FixedFooterFrame` + `ScreenBottomBar` — 52px button, `md` top padding, `xl` bottom inset above the safe area, `lg` horizontal padding. App screens and auth screens share this layout.

| Screen type | Title source | In-screen header |
|-------------|--------------|------------------|
| Workspace list | None (custom header) | Yes |
| Collection list | None (custom header) | Yes |
| Collection details | None (custom header) | Yes |
| Item details | None (custom header) | Yes — item name in shell subtitle |
| Settings | Native title | `PageHeader` optional subtitle |
| Auth | None | `PageHeader` |

Secondary account actions live in **Settings** — not on workspace list.

---

## Welcome

```
ThreeLines
PageTitle — Tehtrak
body — A calm operational notebook
bodySmall — supporting message

[ Sign in — primary ]
[ Create account — ghost ]
```

Tight vertical rhythm. No excessive dead space between copy and actions.

---

## Workspace List

Place grid home — soft capsule with recent initials + search above the familiar 2-column tiles.

```
Brand header (primary blue, edge-to-edge)
  BrandMenuButton — tehtrak_white.png on blue; tehtrak_blue.png in drawer
  logo left | page title right (white) — title only

ContextBanner capsule (52px) — story circles (initials) | 🔍
  recent places side-by-side (scroll if needed)
  soft primary ring on last-opened
  place icons deferred — initials only for now
  search affordance on the right (drawer also has Search)

  On search tap → capsule becomes ← | text field (focused) | clear
  body blanks until typing; grid filters live by name / description
  back restores places capsule + full grid

WorkspaceGrid (2 columns inside NotebookListShelf)
  WorkspaceGridCard × n — fixed equal height tiles
  ordered by last edited (activity)
  long-press → WorkspaceFocusMenu (disabled while searching)

SingleBottomButton — New workspace (neutral border default, blue when pressed)
  hidden while search is active
```

Collections and Items keep notebook-style vertical lists.

Navigates to **Create Workspace** — no inline create on the grid screen.

---

## Collection List

Same shell pattern as workspace list.

```
Brand header — Collections (title only)
ContextBanner capsule (52px) — ← context label 🔍  (white, no border/shadow, no blue inside)

  On search tap → capsule becomes ← | text field (focused) | clear
  body blanks until typing; list filters live by name / description
  back restores context capsule + full list

NotebookListShelf + SwipeableRow × n
ScreenMeta — "N collections"
SingleBottomButton — New collection (hidden while searching)
```

---

## Collection Details (Items)

```
Brand header — Items (title only)
ContextBanner capsule — ← collection name 🔍

  On search tap → capsule becomes ← | text field (focused) | clear
  body blanks until typing; list filters live by title / values
  back restores context capsule + full list

PlainListSurface + SwipeableRow × n
NotebookListShelf footer — Customize fields (compact) + item/field count meta
  Customize hidden while searching
SingleBottomButton — Add item (hidden while searching)
```

---

## Create Workspace

Dedicated screen — list not visible behind.

```
ScreenLineHeader — New workspace | Your operational notebooks.
Name + optional description (placeholder: Your operational notebook)
SingleBottomButton — Create (fixed at bottom; does not move with keyboard)
```

On success, navigates into the new workspace's collection list.

---

## Edit Workspace

```
ScreenLineHeader — Edit workspace
Name + description
SingleBottomButton — Save
```

Delete is available from the list row icon — not repeated on this screen.

---

## Collection List

Sections inside the active notebook — same shelf pattern as workspaces, visually subordinate row styling.

```
ScreenLineHeader
  blue line
  top row: BrandMenuButton | Collections (accent, right)
  context row:
    left: ShellBackLink
    right: {workspace name} + primaryBorder underline

NotebookListShelf — frame + "N collections" meta (right-aligned, shown even when empty)

NotebookIndexFrame (fixed blue border, scroll inside)
  NotebookRow size=collection × n
  divider between rows

SingleBottomButton — New collection (+ icon)
```

Navigates to Create Collection step 1 — no inline create on the list screen.

**NotebookRow** — edit and delete on each row. Edit opens **Edit Collection**.

---

## Edit Collection

```
ScreenLineHeader — Edit collection | {workspace name}
Name + optional description
SingleBottomButton — Save
```

Delete is available from the list row icon — not repeated on this screen.

---

## Create Collection (step 1)

```
ScreenLineHeader — New collection | {workspace name}
Name + optional description
SingleBottomButton — Continue
```

Creates the collection, then navigates to page template setup.

---

## Collection Structure (step 2)

```
ScreenLineHeader — Item template | {collection name}
Intro copy — tap the fields each item should have

FieldChip bubbles — Name, Description, Count (toggle on/off)
Custom field — name input + Text / Number chips + Add to template link
Added custom fields appear as selected chips (tap to remove)

SingleBottomButton — Finish
```

Finish saves selected fields and opens the collection. Back from collection list — not through setup again.

---

## Customize Fields

Same field editor accessed later from Collection Details.

```
ScreenLineHeader — Customize fields | {collection name}
NotebookIndexFrame — existing fields (label, type, required)
NotebookRow — delete on each field
SingleBottomButton — Add field (only action; no duplicate link in list)
```

**Add field** screen — name + Text / Number chips only.

---

## Collection Details

Items inside the active collection — same shelf pattern, item-sized rows.

```
ScreenLineHeader
  blue line
  top row: BrandMenuButton | Items (accent, right)
  context row:
    left: ShellBackLink
    right: {collection name} + primaryBorder underline

NotebookListShelf
  frame + "N items · N fields each" meta (right-aligned)
  footerLeft: TextLink — Customize fields (compact OutlineButton, bordered)

NotebookIndexFrame (fixed blue border, scroll inside)
  NotebookRow size=item × n (delete on row)
  divider between rows
  EmptyListContent when empty (text only — no ThreeLines logo inside frame)

SingleBottomButton — Add item (+ icon, fixed bottom)
```

---

## Item Details

Reading a page — not viewing a record. One screen for view and edit.

```
AppScreenShell — title Item, subtitle item title (underlined) + search

  On search tap → capsule becomes ← | text field (focused) | clear
  exits edit if needed; body blanks until typing
  properties filter live by label / value
  back restores context capsule + full page

NotebookListShelf (framed=false — same subtle grouped surface as lists)
  NotebookPageRow × n — label + value (view) or highlighted edit control (edit)
  inset hairline dividers between properties
  footer meta (right, tertiary) — "Updated 3d ago" (or property count while searching)

SingleBottomButton — Edit (view) or Save (edit). Hidden while searching.
  Back dismisses unsaved edits.
```

Tap Edit or the list-row pencil to enter edit mode on the same page. Delete stays on the items list row.

---

## Settings

```
PageHeader — Settings

Grouped surface
  Account
  Preferences

About block

TextLink — Sign out
```

---

## Empty states

`EmptyNotebook` — ThreeLines, encouraging headline, body, TextLink action.

Never: "No data found", "No records available".

---

## Forms (create flows)

Native title only. Fields + single primary button at bottom.

Inline create panels: hairline divider + section title — no boxed chrome.
