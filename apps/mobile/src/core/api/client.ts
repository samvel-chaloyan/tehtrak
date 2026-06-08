import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { apiConfig } from '@/config/api';
import { isDemoMode } from '@/config/demo';
import { logDemo } from '@/config/demoDebug';
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from './authStorage';
import { ApiClientError } from './errors';
import { ApiResponse, RefreshResponse } from './types';

export const apiClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

let refreshPromise: Promise<string | null> | null = null;

function blockDemoNetwork(method: string, path: string): never {
  logDemo(`Blocked ${method} ${path}`);
  throw new ApiClientError('Demo mode active.', 'DEMO_MODE', 0);
}

apiClient.interceptors.request.use(async (config) => {
  if (isDemoMode) {
    const path = config.url ?? 'unknown';
    blockDemoNetwork(config.method?.toUpperCase() ?? 'REQUEST', path);
  }

  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiResponse<unknown>>) => {
    if (isDemoMode) {
      logDemo('Blocked response interceptor retry');
      throw new ApiClientError('Demo mode active.', 'DEMO_MODE', 0);
    }

    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      const newAccess = await refreshAccessToken();
      if (newAccess) {
        original.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(original);
      }
      await clearTokens();
    }

    return Promise.reject(toApiError(error));
  },
);

async function refreshAccessToken(): Promise<string | null> {
  if (isDemoMode) {
    logDemo('Blocked token refresh');
    return null;
  }

  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) return null;

      try {
        const { data: envelope } = await axios.post<ApiResponse<RefreshResponse>>(
          `${apiConfig.baseUrl}/auth/refresh`,
          { refreshToken },
        );
        if (!envelope.success || !envelope.data) return null;
        await setTokens(envelope.data.accessToken, envelope.data.refreshToken);
        return envelope.data.accessToken;
      } catch {
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
}

function toApiError(error: AxiosError<ApiResponse<unknown>>): ApiClientError {
  if (error.response?.data?.error) {
    return ApiClientError.fromBody(error.response.status, error.response.data.error);
  }

  if (error.code === 'ECONNABORTED' || !error.response) {
    return new ApiClientError(
      'Unable to reach Tehtrak. Check your connection and try again.',
      'NETWORK_ERROR',
      0,
    );
  }

  return new ApiClientError('Something went wrong. Please try again.', 'INTERNAL_ERROR', error.response?.status ?? 500);
}

export async function apiGet<T>(path: string, params?: Record<string, unknown>): Promise<T> {
  if (isDemoMode) {
    blockDemoNetwork('GET', path);
  }

  const { data } = await apiClient.get<ApiResponse<T>>(path, { params });
  if (!data.success || data.data === null) {
    throw ApiClientError.fromBody(400, data.error ?? undefined);
  }
  return data.data;
}

export async function apiGetWithMeta<T>(
  path: string,
  params?: Record<string, unknown>,
): Promise<{ data: T; meta: unknown }> {
  if (isDemoMode) {
    blockDemoNetwork('GET', path);
  }

  const { data } = await apiClient.get<ApiResponse<T>>(path, { params });
  if (!data.success || data.data === null) {
    throw ApiClientError.fromBody(400, data.error ?? undefined);
  }
  return { data: data.data, meta: data.meta };
}

export async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  if (isDemoMode) {
    blockDemoNetwork('POST', path);
  }

  const { data } = await apiClient.post<ApiResponse<T>>(path, body);
  if (!data.success || data.data === null) {
    throw ApiClientError.fromBody(400, data.error ?? undefined);
  }
  return data.data;
}

export async function apiPatch<T>(path: string, body?: unknown): Promise<T> {
  if (isDemoMode) {
    blockDemoNetwork('PATCH', path);
  }

  const { data } = await apiClient.patch<ApiResponse<T>>(path, body);
  if (!data.success || data.data === null) {
    throw ApiClientError.fromBody(400, data.error ?? undefined);
  }
  return data.data;
}

export async function apiDelete(path: string): Promise<void> {
  if (isDemoMode) {
    blockDemoNetwork('DELETE', path);
  }

  await apiClient.delete(path);
}
