import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/shared/ui/Text';
import { useTheme } from '@/theme';

const AVATAR_SIZE = 36;

export interface WorkspaceRecentAvatarProps {
  initials: string;
  label: string;
  onPress: () => void;
  /** Soft story ring for the last-opened place. */
  emphasized?: boolean;
}

/**
 * Story-style place circle — initials only (icons later).
 */
export function WorkspaceRecentAvatar({
  initials,
  label,
  onPress,
  emphasized = false,
}: WorkspaceRecentAvatarProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.75 : 1 }]}
    >
      <View
        style={[
          styles.ring,
          {
            width: AVATAR_SIZE + 4,
            height: AVATAR_SIZE + 4,
            borderRadius: (AVATAR_SIZE + 4) / 2,
            borderWidth: emphasized ? 1.5 : StyleSheet.hairlineWidth,
            borderColor: emphasized ? colors.primary : colors.border,
            padding: 2,
          },
        ]}
      >
        <View
          style={[
            styles.face,
            {
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
              borderRadius: AVATAR_SIZE / 2,
              backgroundColor: emphasized ? colors.primaryMuted : colors.background,
            },
          ]}
        >
          <Text
            variant="caption"
            color={emphasized ? 'accent' : 'secondary'}
            style={styles.initials}
          >
            {initials}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  face: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export const WORKSPACE_RECENT_AVATAR_SIZE = AVATAR_SIZE;
