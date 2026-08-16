# Tehtrak Screen Patterns

## Purpose

Per-screen layout structure — content order, hierarchy, and action placement.

See [components.md](./components.md) for anatomy. See [ui-constitution.md](./ui-constitution.md) for rules.

**Metaphor:** Workspace → Collection → Item = Notebook → Section → Page.

---

## Navigation philosophy

One title source per screen. Never duplicate.

**Status bar:** Always visible. `AppStatusBar` + stack `statusBarStyle` keep icons readable:

* Brand blue header → light (white) status icons
* Auth / canvas / bootstrap loader → dark status icons
* Animated fade when chrome changes

Do not hide the status bar. Content respects safe-area top inset under a transparent system bar.

**Bottom actions:** Every primary bottom button (New, Create, Continue, Save, etc.) uses the same slot via `FixedFooterFrame` + `ScreenBottomBar` — 52px button, `md` top padding, `xl` bottom inset above the safe area, `lg` horizontal padding. App screens and auth screens share this layout.

| Screen type | Title source | In-screen header |
|-------------|--------------|------------------|
| Workspace list | None (custom header) | Yes |
| Collection list | None (custom header) | Yes |
| Collection details | None (custom header) | Yes |
| Item details | None (custom header) | Yes — item name in shell subtitle |
| Settings | None (custom header) | Yes — brand shell |
| Auth | None | Auth page header |

Secondary account actions live in **Settings** — not on workspace list.

Drawer rows that ship: Search (global — already-fetched workspaces / collections / items), Quick Access, Settings, About (→ Settings), Sign out. Do not show stub rows that look live.
---

## Welcome

White surface canvas (`surface`) — brand page, not the gray app canvas.

```
┌ primary border frame ──────────────┐
│ display (accent) — Tehtrak         │  ← brand hero token; no off-system sizes
└────────────────────────────────────┘
body — A calm operational notebook
bodySmall — supporting message

[ Sign in — primary ]
[ Create account — ghost ]
```

Tight vertical rhythm. No excessive dead space between copy and actions. Welcome brand mark is the wordmark in a quiet primary-border frame — not ThreeLines (ThreeLines stays for empty states). Auth flow (Welcome, Sign in, Create account) uses white `surface` canvas.

---

## Sign in / Create account

```
[ ← back ]                    Sign in   ← ScreenLineHeader tone=default
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  primary line

Welcome back — open the notebook…       ← quiet bodySmall secondary

┌ soft surface card ─────────────────┐
│ Email                              │
│ Password              [ eye ]      │  ← revealable; hint under field when needed
│ At least 8 characters (register)   │  ← caption tertiary, not placeholder
└────────────────────────────────────┘

[ Sign in ] / [ Create account ]  ← FixedFooterFrame; label matches the task
```

Same pattern for Create account (name + email + password). Form lives on a quiet grouped card. Auth screens use white `surface` canvas (same as Welcome). Back chevron stays fully visible — no negative left offset, no overlay banner.

---

## Workspace List

Place grid home — soft banner with Quick Access pins + search above the 2-column tiles.

```
Brand header (primary blue, edge-to-edge)
  BrandMenuButton — tehtrak_white.png on brand header; tehtrak_blue.png in drawer (current brand blue)
  logo left | page title right (white) — title only

ContextBanner Quick Access (52px soft capsule) — type-colored chips | 🔍
  pinned Workspace / Collection / Item circles (first two-word initials — no titles under)
  color: workspace `#00BBFF` · collection `#F5C85F` · item `#34C759`
  horizontal scroll; empty until something is pinned
  empty dock: quiet caption — “Pin from a card” (not a blank capsule)
  search affordance on the right
  drawer: Quick Access opens the management screen

  On search tap → capsule becomes ← | text field (focused) | clear
  body blanks until typing; grid filters live by name / description
  back restores Quick Access banner + full grid

WorkspaceGrid (2 columns inside NotebookListShelf)
  WorkspaceGridCard × n — fixed equal height tiles
  quiet pin toggle on each card
  ordered by last edited (activity)
  long-press → WorkspaceFocusMenu (info / edit / delete / cancel; disabled while searching)
  Info → centered InfoDialog (name, description, “N collections”, created, updated)
  Edit → centered EditDialog (name, description, Save)

SingleBottomButton — New workspace (neutral border default, blue when pressed)
  hidden while search is active
```

Drawer **Quick Access** opens the management screen (grouped pins). Home banner is the shortcut dock.

Collections and Items keep notebook-style vertical lists.

Navigates to **Create Workspace** — no inline create on the grid screen.

---

## Global Search (drawer)

Mixed search over **already-fetched** notebook data — no network round-trip.

```
Brand header — Search
ContextBanner capsule — inline search field (active on entry)

Empty (no query) — EmptyListContent
  “Search your notebook”
  “Looks through workspaces, collections, and items you’ve already opened…”

No match — EmptyListContent
  “Nothing matched”

Results — grouped like Quick Access
  Workspaces (entity accent)
  Collections
  Items
  NotebookRow → navigate to place / section / page
```

Opens from drawer **Search**. Per-screen list search stays local to that list.

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
  swipe → edit / delete (disabled while searching)
  long-press → RowFocusInfoMenu (info circle; disabled while searching)
  Info → centered InfoDialog (name, description, “N items”, created, updated)
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
  swipe → edit / delete (disabled while searching)
  long-press → RowFocusInfoMenu (info circle; disabled while searching)
  Info → centered InfoDialog (title, subtitle, created, updated)
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
  NotebookPageRow × n — label + value (view) or quiet bordered field (edit)
  inset hairline dividers between properties
  footer meta (right, tertiary) — "Updated 3d ago" (or property count while searching)

SingleBottomButton — Edit (view) or Save (edit). Hidden while searching.
  Back dismisses unsaved edits.
```

Tap Edit or the list-row pencil to enter edit mode on the same page. Delete stays on the items list row.

---

## Quick Access

Management screen for pinned objects — opened from the drawer.

```
Brand header — Quick Access (title only)
ContextBanner capsule — ← Quick Access (no search)

NotebookListShelf sections (framed=false), empty groups omitted:
  Workspaces — NotebookRow + pin toggle
  Collections
  Items

Empty: calm EmptyListContent — “Nothing pinned yet”
```

Tap row opens the object (same deep navigation as home chips). Pin toggles unpin without confirm.

---

## Settings

```
Brand shell — Settings / Account capsule
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Grouped surface
  Display name
  email                          ← identity only (not tappable)

About
  Tehtrak
  A calm operational notebook

TextLink — Sign out
```

No placeholder “Coming soon” rows. Preferences wait until they exist.

---

## Empty states

`EmptyNotebook` — large soft blue logo as identity background, with encouraging headline + body on top. Use for **first-run** empty lists (workspaces / collections / items). Primary create stays in the footer — do not duplicate a loud CTA in the empty body.

`EmptyListContent` — quiet text only. Use for search blank, search no-match, and in-frame errors.

Never: "No data found", "No records available".

---

## Forms (create flows)

Native title only. Fields + single primary button at bottom.

Inline create panels: hairline divider + section title — no boxed chrome.
