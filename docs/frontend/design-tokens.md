# Tehtrak Design Tokens

## Purpose

This document defines **exact visual values** only.

For rules, see [ui-constitution.md](./ui-constitution.md). Implementation: `apps/mobile/src/theme/`.

---

## Colors

### Core palette

| Role | Token | Value |
|------|-------|-------|
| Background | `background` | `#F5F5F7` |
| Surface | `surface` | `#FFFFFF` |
| Border | `border` | `#E5E7EB` |
| Primary text | `textPrimary` | `#48484A` |
| Secondary text | `textSecondary` | `#6B7280` |
| Tertiary text | `textTertiary` | `#9CA3AF` |
| Primary blue | `primary` | `#29B5E8` |
| Pressed blue | `primaryPressed` | `#1FA3D4` |

### Background vs surface

| Element | Token |
|---------|-------|
| Entire screen background | `background` |
| Drawer background | `background` |
| Grouped list (when grouped) | `surface` |
| Modal | `surface` |
| Bottom sheet | `surface` |
| Dialog | `surface` |
| Input fields | `surface` |
| Cards (rare) | `surface` |

`background` is the canvas. `surface` is content that sits on the canvas.

Implementation: `useSurfaceStyles()` in `apps/mobile/src/theme/surfaces.ts` — use `canvas`, `grouped`, and `scroll` (transparent) instead of hardcoded colors. ScrollViews and FlatLists must use `scroll` so the canvas shows through.

### Brand (derived)

| Token | Value |
|-------|-------|
| `primaryMuted` | `#EEF6FA` |
| `primaryBorder` | `rgba(41, 181, 232, 0.35)` |

### Surfaces

| Token | Value |
|-------|-------|
| `background` | `#F5F5F7` |
| `surface` | `#FFFFFF` |
| `surfaceElevated` | `#FFFFFF` |

### Borders

| Token | Value |
|-------|-------|
| `border` | `#E5E7EB` |
| `borderLight` | `#E5E7EB` |
| `borderSecondary` | `#D1D5DB` |

### Text

| Token | Value |
|-------|-------|
| `textPrimary` | `#48484A` |
| `textSecondary` | `#6B7280` |
| `textTertiary` | `#9CA3AF` |
| `textInverse` | `#FFFFFF` |

### Aesthetic color rule

Prefer soft/muted variants over direct saturated colors.

| Use | Token |
|-----|-------|
| Reading text | `textPrimary` |
| Large fills / swipe backgrounds | `*Muted` tokens |
| Icons on muted washes | `*Emphasis` tokens |
| Errors, strong borders | `danger`, `success` (small areas only) |

Never use pure black (`#000`) or full-saturation red/green for large surfaces.

### Feedback

| Token | Value |
|-------|-------|
| `success` | `#6FAF73` |
| `successMuted` | `#F2F8F2` |
| `successEmphasis` | `#84B588` |
| `warning` | `#D4A15A` |
| `danger` | `#C85A5A` |
| `dangerMuted` | `#FBF0F0` |
| `dangerEmphasis` | `#CF9595` |

### Overlay

| Token | Value |
|-------|-------|
| `overlay` | `rgba(28, 28, 30, 0.4)` |

---

## Spacing

4px base grid.

| Token | Value |
|-------|-------|
| `xs` | 4 |
| `sm` | 8 |
| `list` | 12 |
| `md` | 16 |
| `lg` | 24 |
| `xl` | 32 |
| `2xl` | 48 |
| `3xl` | 64 |

Screen layout: horizontal padding `lg` (24), top `lg` (24), bottom `xl` (32).

---

## Radius

| Token | Value |
|-------|-------|
| `sm` | 8 |
| `md` | 12 |
| `lg` | 16 |
| `button` | 14 |
| `card` | 18 |
| `xl` | 20 |
| `full` | 9999 |

---

## Touch Targets

| Token | Value |
|-------|-------|
| `minTouch` | 44 |
| `preferredTouch` | 48 |
| `buttonMd` | 48 |
| `buttonLg` | 52 |

---

## Animation

| Token | Value |
|-------|-------|
| `fast` | 150ms |
| `normal` | 200ms |
| `slow` | 250ms |

Easing: `ease-out` (enter), `ease-in` (exit).

---

## Elevation

Quiet shadows only. Heavy multi-layer shadows are prohibited.

| Token | Use |
|-------|-----|
| `shadows.card` | Light lift — small tiles if needed |
| `shadows.soft` | Surfaces, list panels, buttons, grid cards, nav capsule |
| `shadows.raised` | Brand header chrome (must read on canvas) |

Implementation: `apps/mobile/src/theme/shadows.ts`. Parents must not use `overflow: 'hidden'` or shadows will be clipped.
