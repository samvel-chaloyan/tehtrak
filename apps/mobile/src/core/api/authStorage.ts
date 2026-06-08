import * as SecureStore from 'expo-secure-store';
import { isDemoMode } from '@/config/demo';
import { logDemo } from '@/config/demoDebug';

const ACCESS_KEY = 'tehtrak.accessToken';
const REFRESH_KEY = 'tehtrak.refreshToken';

const DEMO_ACCESS_TOKEN = 'demo-access-token';
const DEMO_REFRESH_TOKEN = 'demo-refresh-token';

export async function getAccessToken(): Promise<string | null> {
  if (isDemoMode) {
    return DEMO_ACCESS_TOKEN;
  }
  return SecureStore.getItemAsync(ACCESS_KEY);
}

export async function getRefreshToken(): Promise<string | null> {
  if (isDemoMode) {
    return DEMO_REFRESH_TOKEN;
  }
  return SecureStore.getItemAsync(REFRESH_KEY);
}

export async function setTokens(accessToken: string, refreshToken: string): Promise<void> {
  if (isDemoMode) {
    logDemo('Token storage skipped (demo session uses AsyncStorage)');
    return;
  }
  await SecureStore.setItemAsync(ACCESS_KEY, accessToken);
  await SecureStore.setItemAsync(REFRESH_KEY, refreshToken);
}

export async function clearTokens(): Promise<void> {
  if (isDemoMode) {
    logDemo('Token clear skipped (demo session uses AsyncStorage)');
    return;
  }
  await SecureStore.deleteItemAsync(ACCESS_KEY);
  await SecureStore.deleteItemAsync(REFRESH_KEY);
}
