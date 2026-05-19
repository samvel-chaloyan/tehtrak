# Authentication

## Flow

```
Register/Login → accessToken + refreshToken
       ↓
API calls with Authorization: Bearer {accessToken}
       ↓
401 → refresh with refreshToken → new pair
       ↓
Refresh fails → logout, redirect to login
```

## Token specification

### Access token (JWT)

| Claim | Value |
|-------|-------|
| `sub` | userId |
| `email` | user email |
| `exp` | 15 minutes from issue |
| `iat` | issued at |
| `jti` | unique token id |

Algorithm: RS256 (preferred) or HS256 for dev.

### Refresh token

- Opaque random string (64 bytes, base64url)
- Stored as SHA-256 hash in `refresh_tokens`
- Expires 30 days
- Rotated on each refresh (old token revoked)

## Endpoints

See [api-contract.md](api-contract.md#auth).

## Password policy (MVP)

- Minimum 8 characters
- No complexity rules (mobile UX); revisit later

## Mobile storage

| Item | Storage |
|------|---------|
| accessToken | Secure storage |
| refreshToken | Secure storage |
| user profile | MMKV or Query cache |

Never store tokens in AsyncStorage plain text.

## Session restoration

On app launch:

1. Read refresh token from secure storage
2. If present → `POST /auth/refresh`
3. On success → hydrate user via `GET /auth/me`
4. On failure → clear storage, show login

## Logout

1. `POST /auth/logout` with refresh token
2. Clear secure storage + local SQLite workspace data
3. Invalidate TanStack Query cache

## Security

- Rate limit login: 10/min/IP
- Generic error on login failure: "Invalid email or password"
- Lock account after 20 failures: Phase 2

## Implementation files (backend)

```
Modules/Auth/
├── Application/Commands/RegisterUserCommand.cs
├── Application/Commands/LoginCommand.cs
├── Application/Commands/RefreshTokenCommand.cs
├── Infrastructure/Services/JwtTokenService.cs
└── Api/Controllers/AuthController.cs
```
