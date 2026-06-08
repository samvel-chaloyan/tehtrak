import { isDemoMode } from './demo';

export function logDemo(message: string): void {
  if (__DEV__ && isDemoMode) {
    console.log(`[DEMO] ${message}`);
  }
}
