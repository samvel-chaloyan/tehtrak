import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenLineHeader } from '@/shared/ui';
import { useTheme } from '@/theme';

export interface AuthPageHeaderProps {
  title: string;
  onBack: () => void;
}

/** Auth form header — blue line + back + title (not the brand header tone). */
export function AuthPageHeader({ title, onBack }: AuthPageHeaderProps) {
  const { colors } = useTheme();

  return (
    <ScreenLineHeader
      tone="default"
      title={title}
      leading={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={10}
          onPress={onBack}
          style={({ pressed }) => [styles.backHit, { opacity: pressed ? 0.75 : 1 }]}
        >
          <View style={styles.backInner}>
            <Ionicons name="chevron-back" size={22} color={colors.primary} />
          </View>
        </Pressable>
      }
    />
  );
}

const styles = StyleSheet.create({
  backHit: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backInner: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
