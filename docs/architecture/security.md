# Security Architecture

## Authentication

- JWT access token (short-lived: 15 minutes)
- Refresh token (long-lived: 30 days, rotatable)
- Refresh tokens stored hashed server-side
- Mobile: tokens in secure storage only (Keychain / EncryptedSharedPreferences)

## Authorization

- All resources scoped by `workspaceId`
- Server validates membership on every request
- Never trust `workspaceId` from body alone — verify against resource ownership

## Data protection

| Data | Protection |
|------|------------|
| Passwords | bcrypt or Argon2, never logged |
| Tokens | HTTPS only, secure storage on device |
| Attachments | Signed URLs, time-limited |
| PII | Minimize in logs |

## API security

- HTTPS required (TLS 1.2+)
- Rate limiting: auth endpoints 10 req/min/IP
- Rate limiting: general API 100 req/min/user
- CORS: mobile app uses certificate pinning later; MVP standard HTTPS
- Input validation: FluentValidation + max payload sizes

## JSONB injection

- Validate `Record.data` keys against allowed field keys
- Reject unknown keys on write (strict mode MVP)
- Sanitize string values; no HTML execution context in mobile

## Audit

- All mutations create `ActivityLog` entries
- Logs include actor, timestamp, entity, change payload
- Logs are append-only

## Mobile

- No secrets in source code
- Certificate pinning: Phase 2
- Jailbreak/root detection: not MVP
- Screenshot-sensitive screens: not MVP

## Compliance posture (future)

- Data export per workspace
- Account deletion with cascade
- GDPR-ready retention policies (document when needed)

## Security checklist (per PR)

- [ ] Authorization check in handler, not controller only
- [ ] No sensitive data in logs
- [ ] DTOs do not expose internal IDs unnecessarily
- [ ] File upload validates MIME type and size
- [ ] SQL via parameterized queries / EF only
