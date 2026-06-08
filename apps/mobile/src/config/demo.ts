/**
 * Demo mode — full app exploration without a backend.
 * Set EXPO_PUBLIC_DEMO_MODE=true in .env (see .env.example).
 * Turn off to use the real API; no other code changes required.
 */
export const isDemoMode = process.env.EXPO_PUBLIC_DEMO_MODE === 'true';
