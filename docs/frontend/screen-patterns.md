# Tehtrak Screen Patterns

## Purpose

Per-screen layout structure — content order, hierarchy, and action placement.

See [components.md](./components.md) for anatomy. See [ui-constitution.md](./ui-constitution.md) for rules.

**Metaphor:** Workspace → Collection → Item = Notebook → Section → Page.

---

## Navigation philosophy

One title source per screen. Never duplicate.

| Screen type | Title source | In-screen header |
|-------------|--------------|------------------|
| Workspace list | `PageHeader` (no native header) | Yes |
| Collection list | Native large title (workspace name) | `ScreenMeta` only |
| Collection details | Native large title (collection name) | `ScreenMeta` only |
| Item details | None in nav | `PageTitle` in content |
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
PageHeader
  Title: Workspaces
  Subtitle: Your operational notebooks.
  Action: Settings (TextLink, secondary)

ScreenMeta — "N notebooks"

NotebookIndex (one grouped surface)
  NotebookRow size=workspace × n
  divider between rows

IndexFooter
  TextLink — New workspace
```

No sign out here. No gear icon. No card-per-row layout.

---

## Collection List

```
[Native header: workspace name]

ScreenMeta — "N sections · {workspace}"

NotebookIndex
  NotebookRow size=collection × n

IndexFooter
  TextLink — New collection
```

Collections are visually subordinate to workspace rows.

---

## Collection Details

```
[Native header: collection name]

ScreenMeta — "N properties · N pages"

NotebookIndex
  NotebookRow size=item × n

IndexFooter
  TextLink — Add item
  TextLink — Add property (secondary)
```

No header toolbar. Actions below content.

---

## Item Details

Reading a page — not viewing a record.

```
PageTitle — item name
caption — Updated {relative time}

NotebookField × n
  label (caption, tertiary)
  value (body)
  gap xl between fields
```

No bordered card. No table layout. No duplicate nav title.

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
