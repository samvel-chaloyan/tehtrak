export interface ApiErrorBody {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  meta: unknown;
  error: ApiErrorBody | null;
}

export interface ApiUser {
  id: string;
  email: string;
  displayName: string;
}

export interface AuthResponse {
  user: ApiUser;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ApiWorkspace {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiCollection {
  id: string;
  workspaceId: string;
  name: string;
  description: string | null;
  icon: string | null;
  sortOrder: number;
  itemCount: number;
  lastActivityAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiField {
  id: string;
  collectionId: string;
  key: string;
  label: string;
  type: string;
  required: boolean;
  config: Record<string, unknown>;
  sortOrder: number;
}

export interface ApiRecord {
  id: string;
  collectionId: string;
  workspaceId: string;
  createdBy: string;
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  cursor?: string | null;
  hasMore: boolean;
  total?: number;
}
