# Tehtrak Design Tokens

## Purpose

This document defines **exact visual values** only.

For rules, see [ui-constitution.md](./ui-constitution.md). Implementation: `apps/mobile/src/theme/`.

---

## Colors

### Brand

| Token | Value |
|-------|-------|
| `primary` | `#29B5E8` |
| `primaryPressed` | `#4E9BC7` |
| `primaryMuted` | `#EEF6FA` |

### Surfaces

| Token | Value |
|-------|-------|
| `background` | `#F8F8F6` |
| `surface` | `#FFFFFF` |
| `surfaceElevated` | `#FFFFFF` |

### Borders

| Token | Value |
|-------|-------|
| `border` | `#E8EAED` |
| `borderLight` | `#E8EAED` |
| `borderSecondary` | `#D9DDE3` |

### Text

| Token | Value |
|-------|-------|
| `textPrimary` | `#1E2430` | Main reading text — soft black, not pure black |
| `textSecondary` | `#667085` | Dark gray — supporting text, labels, auth body copy |
| `textTertiary` | `#98A2B3` |
| `textInverse` | `#FFFFFF` |

### Feedback

| Token | Value |
|-------|-------|
| `success` | `#6FAF73` |
| `successMuted` | `#F2F8F2` |
| `warning` | `#D4A15A` |
| `danger` | `#C85A5A` |
| `dangerMuted` | `#FBF0F0` |

### Overlay

| Token | Value |
|-------|-------|
| `overlay` | `rgba(30, 36, 48, 0.4)` |

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

Prefer borders and spacing over shadows. Heavy shadows are prohibited.

| Token | Use |
|-------|-----|
| `shadowCard` | Reserved; avoid in MVP |
| `shadowModal` | Modals only |
