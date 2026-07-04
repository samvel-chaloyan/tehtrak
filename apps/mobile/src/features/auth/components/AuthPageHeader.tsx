import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

import { ScreenLineHeader } from '@/shared/ui';
import { useTheme } from '@/theme';

export interface AuthPageHeaderProps {
  title: string;
  onBack: () => void;
}

export function AuthPageHeader({ title, onBack }: AuthPageHeaderProps) {
  const { colors } = useTheme();

  return (
    <ScreenLineHeader
      title={title}
      leading={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={8}
          onPress={onBack}
          style={({ pressed }) => [{ opacity: pressed ? 0.75 : 1, marginLeft: -10 }]}
        >
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </Pressable>
      }
    />
  );
}
