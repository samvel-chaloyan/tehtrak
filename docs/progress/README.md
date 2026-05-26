# Tehtrak — Progress Screenshots

This folder holds UI milestones for university documentation, architecture presentations, and portfolio material.

## Phase R2 — API integration

| # | Screen / flow | Filename suggestion |
|---|----------------|---------------------|
| 8 | Register + login (real auth) | `r2-01-auth.png` |
| 9 | Empty workspace → create workspace | `r2-02-create-workspace.png` |
| 10 | Create collection + properties | `r2-03-collection-setup.png` |
| 11 | Dynamic form saving to API | `r2-04-persisted-entry.png` |
| 12 | App relaunch — data still present | `r2-05-session-restore.png` |

## Phase R1 — Frontend foundation

Capture these flows once the app runs locally:

| # | Screen / flow | Filename suggestion |
|---|----------------|---------------------|
| 1 | Welcome (product identity) | `r1-01-welcome.png` |
| 2 | Workspace list | `r1-02-workspaces.png` |
| 3 | Collection list | `r1-03-collections.png` |
| 4 | Item list (FlashList) | `r1-04-items.png` |
| 5 | Dynamic form (create entry) | `r1-05-dynamic-form.png` |
| 6 | Property builder | `r1-06-property-builder.png` |
| 7 | Item details (metadata display) | `r1-07-item-details.png` |

## How to capture

1. Start the app: `cd apps/mobile && npm start`
2. Use iOS Simulator or Android emulator
3. Save screenshots into this directory with the names above

## Notes

- Prefer light mode (MVP)
- Include at least one scenario with believable operational data (e.g. Winter Food Storage)
- Empty states are worth capturing separately when testing fresh installs
