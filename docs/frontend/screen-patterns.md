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

Notebook shelf — not dashboard.

```
ScreenLineHeader
  blue line
  top row: BrandMenuButton | page title (accent, right)
  context row (when nested):
    left: ShellBackLink — chevron + Back, primaryBorder underline (under logo)
    right: parent name (secondary, primaryBorder underline when nested)
  subtitle row — tagline (secondary, right-aligned, primaryBorder underline) on root screens

AppDrawer — logo, brand, Search · Favorites · Recent · Settings · Help · About · Sign out

NotebookListShelf — frame + "N workspaces" meta (right-aligned, shown even when empty)

NotebookIndexFrame (fixed blue border, scroll inside)
  NotebookRow size=workspace × n
  divider between rows

SingleBottomButton — New workspace
```

Navigates to **Create Workspace** — no inline create on the list screen.

**NotebookRow** — pencil (edit) and red X (delete) on each row. Edit opens **Edit Workspace**; delete confirms before removing.

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
AppScreenShell — title Item, subtitle collection name (underlined)

NotebookPage (primary border frame)
  NotebookPageHeader — Updated caption only (item name lives in shell subtitle)
  NotebookPageRow × n — label + value (view) or highlighted edit control (edit)

SingleBottomButton — Edit (view) or Save (edit). Back dismisses unsaved edits.
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
