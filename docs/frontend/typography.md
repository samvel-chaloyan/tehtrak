# Tehtrak Typography

## Purpose

Text hierarchy — sizes, weights, line heights, and usage rules.

Implementation: `apps/mobile/src/theme/typography.ts`.

**Principle:** Typography creates hierarchy. Color is secondary.

---

## Font Family

System default (SF Pro on iOS, Roboto on Android).

---

## Scale

| Variant | Size | Weight | Line height | Use |
|---------|------|--------|-------------|-----|
| `titleLarge` | 32 | 700 | 38 | Page title — once per screen |
| `sectionTitle` | 22 | 600 | 28 | Section headers |
| `title` | 20 | 600 | 26 | Card / list row titles |
| `subtitle` | 17 | 500 | 26 | Emphasized inline text |
| `body` | 17 | 400 | 26 | Default reading text |
| `bodySmall` | 14 | 400 | 20 | Supporting descriptions |
| `caption` | 14 | 400 | 20 | Metadata |
| `label` | 14 | 500 | 20 | Form field labels |

---

## Hierarchy Rules

1. Page title is visually dominant on every screen
2. Card/list titles use `title` (20/600)
3. Metadata uses `caption` with `textTertiary`
4. Never use color to replace typographic hierarchy
5. Do not introduce arbitrary font sizes outside this scale

---

## Accessibility

Typography tokens scale with `fontScale` from [design-tokens.md](./design-tokens.md).
