import { getString, remove, setString } from '@/services/storage';

/** Demo persistence keys — backed by AsyncStorage (temporary; MMKV planned). */
export const demoStorageKeys = {
  initialized: 'tehtrak.demo.initialized',
  seedVersion: 'tehtrak.demo.seedVersion',
  session: 'tehtrak.demo.session',
  data: 'tehtrak.demo.data',
} as const;

export async function getDemoStorageString(key: string): Promise<string | null> {
  return getString(key);
}

export async function setDemoStorageString(key: string, value: string): Promise<void> {
  await setString(key, value);
}

export async function getDemoStorageBoolean(key: string): Promise<boolean> {
  const raw = await getString(key);
  return raw === 'true';
}

export async function setDemoStorageBoolean(key: string, value: boolean): Promise<void> {
  await setString(key, value ? 'true' : 'false');
}

export async function removeDemoStorage(key: string): Promise<void> {
  await remove(key);
}
