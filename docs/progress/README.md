# Tehtrak — Progress Screenshots

This folder holds UI milestones for university documentation, architecture presentations, and portfolio material.

## Current product stance

**Core notebook is shipped** (online): Auth → Workspace → Collection → Field → Item.

Deferred for later: offline, member invites, attachments, server search, activity feed, Sentry, elderly text mode.  
See [implementation/phase-1.md](../implementation/phase-1.md) and [product/roadmap.md](../product/roadmap.md).

## Phase R3.5 — Demo experience & design compliance

Capture with `EXPO_PUBLIC_DEMO_MODE=true` (no backend required):

| # | Screen / flow | Filename suggestion |
|---|----------------|---------------------|
| 1 | Welcome | `r35-01-welcome.png` |
| 2 | Sign in | `r35-02-sign-in.png` |
| 3 | Workspace list (seeded data) | `r35-03-workspaces.png` |
| 4 | Collection list | `r35-04-collections.png` |
| 5 | Item list | `r35-05-items.png` |
| 6 | Item details | `r35-06-item-details.png` |
| 7 | Create item form | `r35-07-create-item.png` |
| 8 | Add property | `r35-08-add-property.png` |
| 9 | Empty state | `r35-09-empty-state.png` |
| 10 | App relaunch — session restored | `r35-10-session-restore.png` |

## Phase R2 — API integration

| # | Screen / flow | Filename suggestion |
|---|----------------|---------------------|
| 8 | Register + login (real auth) | `r2-01-auth.png` |
| 9 | Empty workspace → create workspace | `r2-02-create-workspace.png` |
| 10 | Create collection + properties | `r2-03-collection-setup.png` |
| 11 | Dynamic form saving to API | `r2-04-persisted-entry.png` |
| 12 | App relaunch — data still present | `r2-05-session-restore.png` |

## Phase R1 — Frontend foundation

| # | Screen / flow | Filename suggestion |
|---|----------------|---------------------|
| 1 | Welcome (product identity) | `r1-01-welcome.png` |
| 2 | Workspace list | `r1-02-workspaces.png` |
| 3 | Collection list | `r1-03-collections.png` |
| 4 | Item list | `r1-04-items.png` |
| 5 | Dynamic form (create item) | `r1-05-dynamic-form.png` |
| 6 | Property builder | `r1-06-property-builder.png` |
| 7 | Item details | `r1-07-item-details.png` |

## How to capture

1. Copy `apps/mobile/.env.example` to `apps/mobile/.env`
2. Start the app: `cd apps/mobile && npm start`
3. Use iOS Simulator or Android emulator
4. Save screenshots into this directory with the names above

## Notes

- Prefer light mode
- Include at least one scenario with believable operational data
- Empty states are worth capturing separately when testing fresh installs
- Demo mode: sign in with any email and password
- For API captures: run the local API and point `EXPO_PUBLIC_API_URL` at it
