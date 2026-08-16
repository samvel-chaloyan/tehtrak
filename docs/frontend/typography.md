# Tehtrak Typography

## Purpose

Text hierarchy — sizes, weights, line heights, and usage rules.

Implementation: `apps/mobile/src/theme/typography.ts`.

**Principle:** Typography creates hierarchy. Color is secondary.

---

## Font Family

**IBM Plex Sans** — single family for all UI (regular / medium / semibold).

Loaded via `@expo-google-fonts/ibm-plex-sans` at app start. Do not mix in system or other display faces.

Implementation: `fontFamily` + `fontFamilyForWeight()` in `apps/mobile/src/theme/typography.ts`.

---

## Scale

| Variant | Size | Weight | Line height | Use |
|---------|------|--------|-------------|-----|
| `display` | 48 | 600 | 54 | Brand hero (Welcome wordmark only) |
| `titleLarge` | 28 | 600 | 34 | Page title — once per screen |
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
5. Main reading text uses `textPrimary` — soft black, not pure `#000000`
6. Do not introduce arbitrary font sizes outside this scale

---

## Accessibility

Typography tokens scale with `fontScale` from [design-tokens.md](./design-tokens.md).
