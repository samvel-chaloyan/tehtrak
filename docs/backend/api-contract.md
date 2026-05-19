# API Contract

Base URL: `https://api.{env}.matian.app/v1`

All endpoints require `Authorization: Bearer {accessToken}` except auth routes.

Workspace-scoped routes include `:workspaceId` in path.

---

## Response envelope

### Success

```json
{
  "success": true,
  "data": {},
  "meta": null,
  "error": null
}
```

`meta` used for pagination:

```json
{
  "success": true,
  "data": [],
  "meta": {
    "cursor": "eyJpZCI6Li4ufQ==",
    "hasMore": true,
    "total": 142
  },
  "error": null
}
```

### Error

```json
{
  "success": false,
  "data": null,
  "meta": null,
  "error": {
    "code": "COLLECTION_NOT_FOUND",
    "message": "Collection not found",
    "details": {}
  }
}
```

HTTP status codes follow semantics (404 for not found, 403 for forbidden, etc.) even when envelope is used.

---

## Auth

| Method | Path | Body | Response |
|--------|------|------|----------|
| POST | `/auth/register` | `{ email, password, displayName }` | `{ user, accessToken, refreshToken }` |
| POST | `/auth/login` | `{ email, password }` | `{ user, accessToken, refreshToken }` |
| POST | `/auth/refresh` | `{ refreshToken }` | `{ accessToken, refreshToken }` |
| POST | `/auth/logout` | `{ refreshToken }` | `204` |
| GET | `/auth/me` | — | `{ user }` |

---

## Workspaces

| Method | Path | Notes |
|--------|------|-------|
| GET | `/workspaces` | List for current user |
| POST | `/workspaces` | `{ name }` → creates slug |
| GET | `/workspaces/:workspaceId` | |
| PATCH | `/workspaces/:workspaceId` | `{ name }` |
| DELETE | `/workspaces/:workspaceId` | Owner only, soft delete |

### Members

| Method | Path | Notes |
|--------|------|-------|
| GET | `/workspaces/:workspaceId/members` | |
| POST | `/workspaces/:workspaceId/members` | `{ email, role }` invite |
| PATCH | `/workspaces/:workspaceId/members/:memberId` | `{ role }` |
| DELETE | `/workspaces/:workspaceId/members/:memberId` | |

---

## Collections

| Method | Path | Notes |
|--------|------|-------|
| GET | `/workspaces/:workspaceId/collections` | `?include=fields` optional |
| POST | `/workspaces/:workspaceId/collections` | `{ name, description?, icon? }` |
| GET | `/workspaces/:workspaceId/collections/:collectionId` | |
| PATCH | `/workspaces/:workspaceId/collections/:collectionId` | |
| DELETE | `/workspaces/:workspaceId/collections/:collectionId` | soft delete |

---

## Fields

| Method | Path | Notes |
|--------|------|-------|
| GET | `/workspaces/:workspaceId/collections/:collectionId/fields` | |
| POST | `/workspaces/:workspaceId/collections/:collectionId/fields` | see Field DTO |
| PATCH | `/workspaces/:workspaceId/collections/:collectionId/fields/:fieldId` | label, config, required, sortOrder |
| DELETE | `/workspaces/:workspaceId/collections/:collectionId/fields/:fieldId` | soft delete |
| PUT | `/workspaces/:workspaceId/collections/:collectionId/fields/reorder` | `{ fieldIds: uuid[] }` |

### Field DTO

```json
{
  "key": "plate_number",
  "label": "Plate Number",
  "type": "text",
  "required": true,
  "config": {},
  "sortOrder": 0
}
```

---

## Records

| Method | Path | Notes |
|--------|------|-------|
| GET | `/workspaces/:workspaceId/collections/:collectionId/records` | `?cursor=&limit=50&search=` |
| POST | `/workspaces/:workspaceId/collections/:collectionId/records` | `{ data: {} }` |
| GET | `/workspaces/:workspaceId/collections/:collectionId/records/:recordId` | |
| PATCH | `/workspaces/:workspaceId/collections/:collectionId/records/:recordId` | `{ data: {} }` partial merge |
| DELETE | `/workspaces/:workspaceId/collections/:collectionId/records/:recordId` | soft delete |

### Record DTO

```json
{
  "id": "uuid",
  "collectionId": "uuid",
  "workspaceId": "uuid",
  "createdBy": "uuid",
  "data": {
    "plate_number": "35AB123",
    "enter_time": "2026-05-18T14:32:00Z"
  },
  "createdAt": "2026-05-18T14:32:00Z",
  "updatedAt": "2026-05-18T14:32:00Z"
}
```

---

## Attachments

| Method | Path | Notes |
|--------|------|-------|
| POST | `/workspaces/:workspaceId/attachments/upload-url` | `{ fileName, mimeType, sizeBytes }` → `{ uploadUrl, attachmentId }` |
| POST | `/workspaces/:workspaceId/attachments/:attachmentId/confirm` | |
| DELETE | `/workspaces/:workspaceId/attachments/:attachmentId` | |

---

## Activity

| Method | Path | Notes |
|--------|------|-------|
| GET | `/workspaces/:workspaceId/activity` | `?cursor=&limit=30` |

---

## Search (MVP)

| Method | Path | Notes |
|--------|------|-------|
| GET | `/workspaces/:workspaceId/search` | `?q=term&collectionId=` |

---

## Error codes

| Code | HTTP | When |
|------|------|------|
| `VALIDATION_ERROR` | 400 | Invalid input |
| `UNAUTHORIZED` | 401 | Missing/invalid token |
| `WORKSPACE_ACCESS_DENIED` | 403 | Not a member |
| `INSUFFICIENT_ROLE` | 403 | Role too low |
| `NOT_FOUND` | 404 | Generic not found |
| `COLLECTION_NOT_FOUND` | 404 | |
| `RECORD_NOT_FOUND` | 404 | |
| `CONFLICT` | 409 | Duplicate slug, version conflict |
| `RATE_LIMITED` | 429 | |
| `INTERNAL_ERROR` | 500 | |

---

## Versioning

- URL prefix `/v1`
- Breaking changes → `/v2`
- Deprecation header: `Deprecation: true`, `Sunset: {date}`
