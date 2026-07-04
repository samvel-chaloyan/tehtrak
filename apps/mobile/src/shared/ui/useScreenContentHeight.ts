import { useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

/**
 * Fixed content height from the window — set once when the screen focuses.
 * Does not shrink when the keyboard opens, so bottom actions stay in place.
 */
export function useScreenContentHeight() {
  const insets = useSafeAreaInsets();
  const { spacing } = useTheme();

  const measure = useCallback(() => {
    return Dimensions.get('window').height - insets.top - spacing.lg;
  }, [insets.top, spacing.lg]);

  const [height, setHeight] = useState(measure);

  useFocusEffect(
    useCallback(() => {
      setHeight(measure());
    }, [measure]),
  );

  return height;
}
