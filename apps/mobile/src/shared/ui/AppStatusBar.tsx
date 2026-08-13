import { useEffect } from 'react';
import { StatusBar as RNStatusBar } from 'react-native';
import { setStatusBarStyle } from 'expo-status-bar';

export type AppStatusBarTone = 'brand' | 'canvas';

export interface AppStatusBarProps {
  /**
   * `brand` — light icons over the primary blue header.
   * `canvas` — dark icons over gray / white surfaces (auth, loaders).
   */
  tone: AppStatusBarTone;
}

/**
 * System status bar for Tehtrak — always visible, tone matches chrome.
 * Uses imperative style APIs (safer than mounting expo StatusBar under Hermes).
 */
export function AppStatusBar({ tone }: AppStatusBarProps) {
  useEffect(() => {
    const style = tone === 'brand' ? 'light' : 'dark';
    const barStyle = tone === 'brand' ? 'light-content' : 'dark-content';

    try {
      setStatusBarStyle(style, true);
    } catch {
      // Expo helper unavailable — fall through to RN.
    }

    try {
      RNStatusBar.setBarStyle(barStyle, true);
      RNStatusBar.setHidden(false, 'fade');
    } catch {
      // Native StatusBar unavailable in this runtime — ignore.
    }
  }, [tone]);

  return null;
}
