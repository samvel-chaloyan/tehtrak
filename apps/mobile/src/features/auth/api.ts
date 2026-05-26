import { apiGet, apiPost, clearTokens, setTokens } from '@/core/api';
import type { ApiUser, AuthResponse } from '@/core/api/types';

export async function registerUser(email: string, password: string, displayName: string) {
  const data = await apiPost<AuthResponse>('/auth/register', { email, password, displayName });
  await setTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function loginUser(email: string, password: string) {
  const data = await apiPost<AuthResponse>('/auth/login', { email, password });
  await setTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function logoutUser() {
  const { getRefreshToken } = await import('@/core/api/authStorage');
  const refreshToken = await getRefreshToken();
  if (refreshToken) {
    try {
      await apiPost('/auth/logout', { refreshToken });
    } catch {
      // still clear locally
    }
  }
  await clearTokens();
}

export async function fetchMe() {
  return apiGet<ApiUser>('/auth/me');
}

export async function restoreSession() {
  const { getRefreshToken } = await import('@/core/api/authStorage');
  const refresh = await getRefreshToken();
  if (!refresh) return null;

  try {
    const data = await apiPost<{ accessToken: string; refreshToken: string }>('/auth/refresh', {
      refreshToken: refresh,
    });
    await setTokens(data.accessToken, data.refreshToken);
    return fetchMe();
  } catch {
    await clearTokens();
    return null;
  }
}
