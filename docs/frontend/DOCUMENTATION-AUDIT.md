# Frontend Documentation Audit

Audit date: 2025-06-06

Objective: eliminate responsibility overlap across `docs/frontend/` and establish a clear Vision → Principles → Tokens → Components → Screens → Audit hierarchy.

---

## Per-File Verdict

| File | Verdict | Action |
|------|---------|--------|
| `design-language.md` | **Rewrite** | Removed color hex values, design principles duplicated in constitution; kept vision and personality only |
| `ui-constitution.md` | **Rewrite** | Removed token tables, component specs, typography scale, embedded checklist; kept non-negotiable rules only |
| `design-tokens.md` | **Rewrite** | Removed philosophy and usage guidance; tokens only; aligned names with `src/theme/` |
| `typography.md` | **Rewrite** | Aligned scale with implementation; removed contradictions (32px page title → 28px) |
| `components.md` | **Rewrite** | Expanded to full component catalog; removed screen layouts; aligned with R4 notebook components |
| `ui-system.md` | **Rewrite** | Removed duplicate tokens and component definitions; composition and file paths only |
| `screen-patterns.md` | **Rewrite** | Removed accent rules and final checklist; layout structure only |
| `ui-audit.md` | **Keep + refine** | Absorbed design checklist from `screen-patterns.md` and constitution; design-only |
| `screen-quality-checklist.md` | **Rewrite** | Removed design philosophy; references `ui-audit.md`; engineering + UX only |
| `form-engine.md` | **Keep** | Implementation doc; added hierarchy note only |
| `navigation.md` | **Keep** | Implementation doc; added hierarchy note only |
| `state-management.md` | **Keep** | Implementation doc; added hierarchy note only |
| `offline-storage.md` | **Keep** | Implementation doc; added hierarchy note only |
| `README.md` | **Create** | Index, responsibility map, governance |
| `DOCUMENTATION-AUDIT.md` | **Create** | This file |

No files deleted. Implementation docs remain; they sit outside the design hierarchy.

---

## Duplicated Sections Removed

| Content | Was duplicated in | Now owned by |
|---------|-------------------|--------------|
| Color hex values and palette | `design-language.md`, `ui-constitution.md`, `ui-system.md`, `screen-quality-checklist.md` | `design-tokens.md` |
| Typography scale (conflicting sizes) | `ui-constitution.md`, `typography.md`, `ui-system.md` | `typography.md` |
| Spacing scale | `ui-constitution.md`, `design-tokens.md`, `ui-system.md` | `design-tokens.md` |
| Button variants and sizing | `ui-constitution.md`, `components.md` | `components.md` |
| Card / notebook row rules | `ui-constitution.md`, `components.md` | `components.md` |
| Empty state structure | `ui-constitution.md`, `components.md`, `screen-patterns.md` | `components.md` (anatomy), `screen-patterns.md` (placement) |
| Loading state rules | `ui-constitution.md`, `screen-quality-checklist.md` | `ui-constitution.md` (rule), `screen-quality-checklist.md` (verification) |
| Navigation header rules | `ui-constitution.md`, `components.md`, `screen-patterns.md` | `ui-constitution.md` (max one action), `screen-patterns.md` (per-screen placement) |
| Accent color philosophy | `design-language.md`, `screen-patterns.md`, `ui-audit.md`, `AGENTS.md` | `ui-constitution.md` (philosophy), `ui-audit.md` (verification) |
| Content-first / action placement | `design-language.md`, `screen-patterns.md`, `ui-audit.md`, `screen-quality-checklist.md` | `ui-constitution.md` (rules), `ui-audit.md` (verification) |
| Screen completion checklist | `ui-constitution.md`, `screen-patterns.md`, `screen-quality-checklist.md` | Split: `ui-audit.md` (design), `screen-quality-checklist.md` (engineering) |
| Three-second clarity rule | `design-language.md`, `screen-patterns.md` | `design-language.md` (intent), `ui-constitution.md` (rule) |
| ThreeLines brand symbol | `design-language.md`, `components.md` | `design-language.md` (meaning), `components.md` (usage) |
| Icon rules | `ui-constitution.md`, `ui-system.md` | `ui-constitution.md` (principles), `ui-system.md` (library choice) |
| Animation durations | `ui-constitution.md`, `design-tokens.md`, `ui-system.md` | `design-tokens.md` (values), `ui-constitution.md` (allowed types) |
| Accessibility minimums | `ui-constitution.md`, `ui-system.md`, `screen-quality-checklist.md` | `design-tokens.md` (touch target values), `ui-constitution.md` (rules), `screen-quality-checklist.md` (verification) |
| Component inventory table | `ui-system.md`, `components.md` | `components.md` (definitions), `ui-system.md` (composition references by name) |
| Workspace/Collection card specs | `components.md` (outdated) | `components.md` → `NotebookRow` (post-R4) |

---

## Contradictions Resolved

| Topic | Before | After (source of truth) |
|-------|--------|-------------------------|
| Page title size | 32/700 (`typography.md`) vs 28/600 (`ui-constitution.md`, code) | 28/600 — `typography.md` |
| Button height | 52 (`components.md`) vs 48 (`ui-constitution.md`) | md: 48, lg: 52 — `components.md` |
| Button radius | 14 (`components.md`) vs 12 (`ui-constitution.md`) | 12 (`radius.md`) — `components.md` |
| Secondary button | Blue border + blue text (constitution) vs gray border + primary text (R4 code) | Gray border, primary text — `components.md` reflects implementation; constitution states visual secondary principle |
| Empty state action | Primary button (constitution) vs secondary button (R4 code) | Secondary on populated-context empty; primary allowed on auth/onboarding — `components.md` + `screen-patterns.md` |
| Spacing token names | `spacing1–8` (`design-tokens.md`) vs `xs–2xl` (code) | `xs`, `sm`, `list`, `md`, `lg`, `xl`, `2xl` — `design-tokens.md` |

---

## Updated File Structure

```
docs/frontend/
├── README.md                      # Index, hierarchy, governance
├── DOCUMENTATION-AUDIT.md         # This audit report
│
├── design-language.md             # Vision
├── ui-constitution.md             # Principles
├── design-tokens.md               # Token values
├── typography.md                  # Text hierarchy
├── components.md                  # Component definitions
├── ui-system.md                   # Composition
├── screen-patterns.md             # Screen layouts
├── ui-audit.md                    # Design review
├── screen-quality-checklist.md    # Engineering review
│
├── form-engine.md                 # Implementation
├── navigation.md                  # Implementation
├── state-management.md            # Implementation
└── offline-storage.md             # Implementation
```

---

## Future Documentation Governance

1. **Single-owner rule** — Every new rule must land in exactly one file per the responsibility map in `README.md`.
2. **Cross-reference, don't copy** — Link to the owner; never paste token tables or component anatomy into other files.
3. **Code follows docs** — When implementation diverges, update the owning doc first, then code.
4. **Quarterly consistency review** — Compare `src/theme/` and `src/shared/ui/` against `design-tokens.md`, `typography.md`, and `components.md`.
5. **Audit on every screen PR** — Require both `ui-audit.md` and `screen-quality-checklist.md` results in PR description.
6. **Missing standards to add later** — Dark mode tokens, motion easing curves, illustration guidelines, icon size matrix, form field component specs (currently split between `components.md` and `form-engine.md`).
