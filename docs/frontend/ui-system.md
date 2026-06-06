# UI System

> **Source of truth:** `design-language.md` and `ui-constitution.md` take precedence over this file when they conflict.

## Design direction

Clean, modern, calm — a notebook-first operational product.

- Whitespace-forward layouts
- Typography-driven hierarchy
- Minimal chrome; content first
- Calm neutral palette with one accent

## Design tokens

### Spacing scale (4px base)

| Token | Value | Use |
|-------|-------|-----|
| `xs` | 4 | Tight gaps |
| `sm` | 8 | Inline spacing |
| `list` | 12 | Gap between list cards |
| `md` | 16 | Card padding, form sections |
| `lg` | 24 | Screen horizontal padding |
| `xl` | 32 | Large section breaks |
| `2xl` | 48 | Hero / empty state vertical padding |

### Typography

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `titleLarge` | 28 | 600 | Screen titles |
| `sectionTitle` | 18 | 600 | Section headers |
| `title` | 18 | 600 | Card emphasis |
| `subtitle` | 17 | 500 | Card titles |
| `body` | 16 | 400 | Default text |
| `bodySmall` | 14 | 400 | Secondary text |
| `caption` | 14 | 400 | Labels, hints |
| `label` | 14 | 500 | Form labels |

Font: system default (SF Pro / Roboto). Custom font Phase 2.

### Elderly-friendly mode

- `fontScale`: 1.0 (default) | 1.25 | 1.5
- Applied via context; scales typography tokens
- Minimum touch target: 48×48 dp always

### Colors (light mode MVP)

| Token | Hex | Use |
|-------|-----|-----|
| `primary` | #29B5E8 | Primary actions, active states |
| `background` | #FFFFFF | Screen bg, cards |
| `surface` | #F8FAFC | Subtle fills, skeleton |
| `border` | #E2E8F0 | Dividers, card borders |
| `textPrimary` | #0F172A | Primary text |
| `textSecondary` | #475569 | Secondary text |
| `textTertiary` | #94A3B8 | Hints |
| `danger` | #DC2626 | Delete, errors |
| `success` | #16A34A | Confirmations |
| `warning` | #D97706 | Warnings |

Dark mode: Phase 2.

### Radius

| Token | Value |
|-------|-------|
| `sm` | 8 |
| `md` | 12 |
| `lg` | 16 |
| `full` | 9999 |

### Shadows

Prefer borders over shadows. Heavy shadows are prohibited per UI Constitution.

| Token | Use |
|-------|-----|
| `card` | Reserved; avoid in MVP |
| `modal` | Modals only |

### Animation

| Token | Duration |
|-------|----------|
| `fast` | 150ms |
| `normal` | 250ms |
| `slow` | 350ms |

Easing: `ease-out` for enter, `ease-in` for exit.

## Core components (`shared/ui/`)

| Component | Purpose |
|-----------|---------|
| `ThreeLines` | Brand signature — empty states, welcome |
| `ScreenHeader` | Standard page header (title, subtitle, action) |
| `PageTitle` | Consistent screen title typography |
| `Button` | primary, secondary, ghost, danger |
| `Input` | single-line text |
| `Screen` | safe area + padding |
| `Card` | list items (notebook pages) |
| `EmptyNotebook` | Standard empty state |
| `EmptyState` | Alias for `EmptyNotebook` |
| `SkeletonCard` | Card-shaped loading placeholder |
| `SkeletonList` | List of skeleton cards |
| `Loader` | Full-screen spinner (bootstrap only) |
| `SectionHeader` | In-screen section titles |
| `Stack` | Layout helper |
| `Text` | Typography wrapper |
| `BottomSheet` | selectors (Phase 2) |
| `FAB` | primary create action (Phase 2) |

## Layout rules

- Screen horizontal padding: `lg` (24)
- List card gap: `list` (12)
- Card padding: `md` (16)
- Card radius: `lg` (16)
- Bottom actions in thumb zone (bottom 33% of screen)
- FAB: 56×56, 16 from bottom/right safe area

## Icons

- Lucide React Native (consistent stroke)
- 24px default; 20px inline

## Accessibility

- `accessibilityLabel` on all interactive elements
- Color contrast ≥ 4.5:1 for body text
- Support system font scaling
- Minimum touch target: 44×44

## File location

```
src/theme/
├── tokens.ts
├── colors.ts
├── typography.ts
└── ThemeProvider.tsx

src/shared/ui/
├── ThreeLines.tsx
├── ScreenHeader.tsx
├── PageTitle.tsx
├── EmptyNotebook.tsx
├── SkeletonCard.tsx
└── ...
```
