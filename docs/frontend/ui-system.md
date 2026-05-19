# UI System

## Design direction

Clean, modern, calm — inspired by Linear, Notion, Stripe.

- Whitespace-forward layouts
- Typography-driven hierarchy
- Minimal chrome; content first
- Calm neutral palette with one accent

## Design tokens

### Spacing scale (4px base)

| Token | Value |
|-------|-------|
| `xs` | 4 |
| `sm` | 8 |
| `md` | 16 |
| `lg` | 24 |
| `xl` | 32 |
| `2xl` | 48 |

### Typography

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `titleLarge` | 28 | 600 | Screen titles |
| `title` | 22 | 600 | Section headers |
| `body` | 16 | 400 | Default text |
| `bodySmall` | 14 | 400 | Secondary text |
| `caption` | 12 | 400 | Labels, hints |

Font: system default (SF Pro / Roboto). Custom font Phase 2.

### Elderly-friendly mode

- `fontScale`: 1.0 (default) | 1.25 | 1.5
- Applied via context; scales typography tokens
- Minimum touch target: 48×48 dp always

### Colors (light mode MVP)

| Token | Hex | Use |
|-------|-----|-----|
| `background` | #FFFFFF | Screen bg |
| `surface` | #F7F7F8 | Cards |
| `border` | #E8E8EC | Dividers |
| `textPrimary` | #111111 | Primary text |
| `textSecondary` | #6B6B70 | Secondary |
| `accent` | #2563EB | Primary actions |
| `danger` | #DC2626 | Delete errors |
| `success` | #16A34A | Confirmations |

Dark mode: Phase 2.

### Radius

| Token | Value |
|-------|-------|
| `sm` | 8 |
| `md` | 12 |
| `lg` | 16 |
| `full` | 9999 |

### Shadows

| Token | Use |
|-------|-----|
| `card` | `0 1px 3px rgba(0,0,0,0.08)` |
| `modal` | `0 8px 24px rgba(0,0,0,0.12)` |

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
| `Button` | primary, secondary, ghost, danger |
| `IconButton` | toolbar actions |
| `TextInput` | single-line text |
| `NumericInput` | number fields |
| `Screen` | safe area + padding |
| `Card` | list items |
| `EmptyState` | no data |
| `LoadingState` | skeleton/spinner |
| `BottomSheet` | selectors |
| `FAB` | primary create action |
| `ListItem` | tappable row |

## Layout rules

- Screen horizontal padding: `md` (16)
- List item min height: 56
- Bottom actions in thumb zone (bottom 33% of screen)
- FAB: 56×56, 16 from bottom/right safe area

## Icons

- Lucide React Native (consistent stroke)
- 24px default; 20px inline

## Accessibility

- `accessibilityLabel` on all interactive elements
- Color contrast ≥ 4.5:1 for body text
- Support system font scaling

## File location

```
src/theme/
├── tokens.ts
├── colors.ts
├── typography.ts
└── ThemeProvider.tsx
```
