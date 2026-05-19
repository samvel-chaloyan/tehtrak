# Git Strategy

## Branching

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready |
| `develop` | Integration (optional for solo; use if team) |
| `feature/*` | New features |
| `fix/*` | Bug fixes |

Solo MVP: `main` + short-lived `feature/*` branches is sufficient.

## Commits

Conventional Commits:

```
feat(collections): add record list pagination
fix(sync): retry on network timeout
docs(api): document search endpoint
chore(deps): bump expo sdk
```

Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `perf`

## Pull requests

- One vertical slice per PR when possible
- Link to doc section or issue
- Include test plan in description
- Max ~400 lines changed; split if larger

## PR checklist

- [ ] Matches docs/architecture contracts
- [ ] Authorization tested
- [ ] No secrets committed
- [ ] Tests added/updated
- [ ] Lint passes

## Versioning

- Mobile: semver in `app.json` / `package.json`
- API: URL version `/v1`
- Coordinate breaking API changes with mobile release

## Repository layout (future)

```
matian/
├── apps/mobile/       # Expo app
├── services/api/      # ASP.NET backend
├── docs/              # This documentation
└── infra/             # IaC (later)
```

Monorepo when scaffolding begins. MVP can start as two repos if preferred — document choice in README when decided.
