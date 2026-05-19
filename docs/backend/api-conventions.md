# API Conventions

## URL design

- Plural nouns: `/collections`, `/records`
- kebab-case in URLs
- Workspace scope prefix: `/workspaces/:workspaceId/...`
- No verbs in URLs (use HTTP methods)
- Nested resources max 2 levels: `/collections/:id/records`

## HTTP methods

| Method | Use |
|--------|-----|
| GET | Read |
| POST | Create |
| PATCH | Partial update |
| PUT | Full replace or non-CRUD actions (`/fields/reorder`) |
| DELETE | Soft delete (default) |

## Request headers

| Header | Required | Value |
|--------|----------|-------|
| `Authorization` | Yes* | `Bearer {accessToken}` |
| `Content-Type` | On body | `application/json` |
| `X-Client-Version` | Recommended | `1.0.0` |
| `X-Request-Id` | Optional | UUID for tracing |

## Pagination

Cursor-based for records and activity:

```
GET /records?limit=50&cursor={base64}
```

Response `meta`:

```json
{ "cursor": "...", "hasMore": true }
```

Offset pagination acceptable for small lists (members, fields) in MVP.

## Filtering & sorting

```
GET /records?sort=-createdAt
GET /records?filter[payment_status]=true   // Phase 2
```

MVP: `search` query param only for records list.

## Idempotency

`POST` record create from mobile includes optional header:

```
X-Idempotency-Key: {client-generated-uuid}
```

Server stores key 24h; duplicate returns original response.

## Dates

- ISO 8601 UTC: `2026-05-18T14:32:00Z`
- Date-only fields: `2026-05-18`

## IDs

- UUID v4 in all public identifiers
- Never expose sequential integers

## Null vs omit

- `PATCH`: omitted keys unchanged; `null` clears optional value
- `POST`: required fields must be present

## Controller conventions (ASP.NET)

```csharp
[ApiController]
[Route("v1/workspaces/{workspaceId}/collections")]
public class CollectionsController : ControllerBase
```

- Thin controllers: delegate to MediatR
- Return `ActionResult<ApiResponse<T>>`

## DTO mapping

- Domain entities never returned directly
- Mapster or manual mapping in Application layer
- Response DTOs in `Application/DTOs`

## Validation

- FluentValidation in Application
- Return `VALIDATION_ERROR` with `details`:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "name": ["Name is required"]
    }
  }
}
```

## Logging

- Log `X-Request-Id`, userId, workspaceId, duration
- Never log passwords, tokens, full record payloads in production
