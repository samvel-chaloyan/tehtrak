import { apiGet, apiPost, clearTokens, setTokens } from '@/core/api';
import type { ApiUser, AuthResponse } from '@/core/api/types';
import { isDemoMode } from '@/config/demo';
import { logDemo } from '@/config/demoDebug';
import {
  demoFetchMe,
  demoLogin,
  demoLogout,
  demoRegister,
  demoRestoreSession,
} from '@/demo/auth';

export async function registerUser(email: string, password: string, displayName: string) {
  if (isDemoMode) {
    return demoRegister(email, password, displayName);
  }

  const data = await apiPost<AuthResponse>('/auth/register', { email, password, displayName });
  await setTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function loginUser(email: string, password: string) {
  if (isDemoMode) {
    return demoLogin(email, password);
  }

  const data = await apiPost<AuthResponse>('/auth/login', { email, password });
  await setTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function logoutUser() {
  if (isDemoMode) {
    return demoLogout();
  }

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
  if (isDemoMode) {
    return demoFetchMe();
  }

  return apiGet<ApiUser>('/auth/me');
}

export async function restoreSession() {
  if (isDemoMode) {
    return demoRestoreSession();
  }

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
