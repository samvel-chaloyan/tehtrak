# CI/CD

## Pipelines (target)

### Backend (`services/api`)

```yaml
# On PR and push to main
- dotnet restore
- dotnet build
- dotnet test
- dotnet format --verify-no-changes
```

### Mobile (`apps/mobile`)

```yaml
# On PR
- npm ci
- npm run lint
- npm run typecheck
- npm test
```

## Environments

| Env | API | DB | Purpose |
|-----|-----|-----|---------|
| local | localhost:5000 | Docker PostgreSQL | Development |
| staging | api.staging.matian.app | Managed PG | QA |
| production | api.matian.app | Managed PG | Users |

## Deployment (MVP)

- **API:** container to cloud run / App Service (TBD)
- **Mobile:** EAS Build → TestFlight / Play Internal Testing
- **DB:** managed PostgreSQL with automated backups

## Secrets

- GitHub Actions secrets for CI
- No secrets in repo
- `.env.example` documents required vars without values

## Mobile release

1. Bump version in `app.json`
2. EAS build production profile
3. Submit to stores (manual MVP)

## Database migrations

- Run migrations in CI deploy step before traffic shift
- Never auto-run destructive migrations without review

## Quality gates

PR cannot merge if:

- Tests fail
- Lint fails
- Build fails

## Future

- Sentry release tracking
- E2E on staging before promote
- Blue/green API deploy
