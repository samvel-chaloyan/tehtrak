import type { WorkspaceRole } from '@/types';

/** Lower number = more privilege (matches API WorkspaceRole enum order). */
const ROLE_RANK: Record<WorkspaceRole, number> = {
  owner: 0,
  admin: 1,
  manager: 2,
  worker: 3,
  viewer: 4,
};

export function roleAtLeast(
  role: WorkspaceRole | undefined | null,
  minimum: WorkspaceRole,
): boolean {
  if (!role) {
    return false;
  }
  return ROLE_RANK[role] <= ROLE_RANK[minimum];
}

/** Create / rename / delete collections and fields. */
export function canManageCollections(role?: WorkspaceRole | null) {
  return roleAtLeast(role, 'manager');
}

/** Create / edit / delete items (pages). Viewers are read-only. */
export function canMutateItems(role?: WorkspaceRole | null) {
  return roleAtLeast(role, 'worker');
}

/** Rename workspace (API: Admin+). */
export function canEditWorkspace(role?: WorkspaceRole | null) {
  return roleAtLeast(role, 'admin');
}

/** Soft-delete workspace (API: Owner). */
export function canDeleteWorkspace(role?: WorkspaceRole | null) {
  return roleAtLeast(role, 'owner');
}
