# Backend Modules

## Module list

| Module | Responsibility | MVP |
|--------|----------------|-----|
| Auth | Register, login, refresh, logout | Yes |
| Workspaces | CRUD, members, invites | Yes |
| Collections | Collection CRUD | Yes |
| Fields | Property definitions CRUD | Yes |
| Records | Item CRUD, JSONB validation | Yes |
| Permissions | Role checks, authorization service | Yes |
| Activity | ActivityLog write/read | Yes |
| Attachments | Upload, link to records | Yes |
| Notifications | Push, reminders | No |
| Analytics | Usage events | No |

## Module boundaries

Modules must not reference another module's Infrastructure layer. Cross-module calls go through Application interfaces registered in DI.

```
Collections.Application → IWorkspaceAuthorizationService (Permissions)
Records.Application → IFieldRepository (Fields) — for validation only
```

## Auth module

- `RegisterUser`, `Login`, `RefreshToken`, `Logout`
- Issues JWT; stores refresh token hash
- No workspace logic

## Workspaces module

- Workspace CRUD, archive
- Member invite, role change, remove
- List workspaces for current user

## Collections module

- CRUD scoped to workspace
- List with pagination
- Soft delete

## Fields module

- CRUD per collection
- Reorder (`sortOrder`)
- Validate type + config JSON

## Records module

- CRUD with JSONB `data`
- Validate against Fields metadata
- List/filter/search within collection
- Pagination: cursor-based preferred

## Permissions module

- `IWorkspaceAuthorizationService`
- `RequireRole(workspaceId, userId, minimumRole)`
- `CanAccessCollection`, `CanModifyRecord` helpers

## Activity module

- `LogActivityCommand` called from other handlers
- `ListActivityQuery` for workspace feed

## Attachments module

- Presigned upload URL generation
- Confirm upload + link to record
- Delete attachment

## Shared kernel

- `Result<T>` type for operation outcomes
- `Entity`, `AuditableEntity` base classes
- Common enums: `FieldType`, `WorkspaceRole`, `ActivityAction`

## Registration

Each module exposes `IServiceCollection Add{Module}(IServiceCollection)` extension in Infrastructure.

Api project calls all module registrations in `Program.cs`.
