import { isDemoMode } from '@/config/demo';
import { ApiClientError } from '@/core/api';

/**
 * Maps errors to human screen copy.
 * In demo mode, never surfaces API or network messages.
 */
export function getScreenErrorMessage(error: unknown, fallback: string): string {
  if (isDemoMode) {
    return fallback;
  }
  if (error instanceof ApiClientError) {
    if (error.code === 'DEMO_MODE') {
      return fallback;
    }
    return error.displayMessage;
  }
  return fallback;
}
