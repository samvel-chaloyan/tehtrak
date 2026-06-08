import type { ApiUser, AuthResponse } from '@/core/api/types';
import { logDemo } from '@/config/demoDebug';
import { demoDelay } from './delay';
import {
  clearDemoSession,
  getDemoSession,
  setDemoSession,
} from './state';

const DEMO_ACCESS_TOKEN = 'demo-access-token';
const DEMO_REFRESH_TOKEN = 'demo-refresh-token';

function fallbackUser(email: string, displayName: string): ApiUser {
  return {
    id: 'demo-user',
    email: email.trim() || 'demo@tehtrak.app',
    displayName: displayName.trim() || 'Demo User',
  };
}

async function buildDemoUser(email: string, displayName: string): Promise<ApiUser> {
  const existing = (await getDemoSession())?.user;
  return {
    id: existing?.id ?? 'demo-user',
    email: email.trim() || existing?.email || 'demo@tehtrak.app',
    displayName: displayName.trim() || existing?.displayName || 'Demo User',
  };
}

async function establishSession(user: ApiUser): Promise<AuthResponse> {
  await setDemoSession(user);
  logDemo('Session established');
  return {
    user,
    accessToken: DEMO_ACCESS_TOKEN,
    refreshToken: DEMO_REFRESH_TOKEN,
  };
}

export async function demoRegister(
  email: string,
  _password: string,
  displayName: string,
): Promise<AuthResponse> {
  logDemo('Register bypassed API');
  await demoDelay();
  try {
    const user = await buildDemoUser(email, displayName);
    return await establishSession(user);
  } catch {
    logDemo('Register fallback session');
    return establishSession(fallbackUser(email, displayName));
  }
}

export async function demoLogin(email: string, _password: string): Promise<AuthResponse> {
  logDemo('Login bypassed API');
  await demoDelay();
  try {
    const session = await getDemoSession();
    const user = session?.user ?? (await buildDemoUser(email, 'Demo User'));
    if (email.trim()) {
      user.email = email.trim();
    }
    return await establishSession(user);
  } catch {
    logDemo('Login fallback session');
    return establishSession(fallbackUser(email, 'Demo User'));
  }
}

export async function demoLogout(): Promise<void> {
  logDemo('Logout bypassed API');
  await demoDelay(60);
  await clearDemoSession();
}

export async function demoFetchMe(): Promise<ApiUser> {
  logDemo('Fetch me bypassed API');
  await demoDelay(60);
  const session = await getDemoSession();
  if (!session) {
    throw new Error('Not authenticated');
  }
  return session.user;
}

export async function demoRestoreSession(): Promise<ApiUser | null> {
  logDemo('Restore session bypassed API');
  await demoDelay(80);
  try {
    const session = await getDemoSession();
    if (!session) {
      logDemo('No demo session found');
      return null;
    }
    logDemo('Restored session');
    return session.user;
  } catch {
    logDemo('Restore session fallback — unauthenticated');
    return null;
  }
}
