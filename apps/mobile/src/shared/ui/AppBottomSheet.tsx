import { ReactNode } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

import { Text } from './Text';

export interface AppBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  children: ReactNode;
  /** Compact floating card — quieter confirms. */
  compact?: boolean;
  /** Extra style on the sheet panel. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Calm notebook bottom sheet — soft surface over dim overlay.
 * Presentational shell only; host owns open/close state.
 */
export function AppBottomSheet({
  visible,
  onClose,
  title,
  message,
  children,
  compact = false,
  style,
}: AppBottomSheetProps) {
  const { colors, radius, shadows, spacing } = useTheme();
  const insets = useSafeAreaInsets();
  const hasHeader = Boolean(title || message);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.root}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          style={[styles.overlay, { backgroundColor: colors.overlay }]}
          onPress={onClose}
        />
        <View
          style={[
            styles.sheet,
            shadows.soft,
            compact
              ? {
                  backgroundColor: colors.surface,
                  borderRadius: radius.xl,
                  marginHorizontal: spacing.lg,
                  marginBottom: Math.max(insets.bottom, spacing.sm) + spacing.md,
                  paddingTop: spacing.md,
                  paddingBottom: spacing.sm,
                  paddingHorizontal: spacing.md,
                }
              : {
                  backgroundColor: colors.surface,
                  borderTopLeftRadius: radius.xl,
                  borderTopRightRadius: radius.xl,
                  marginHorizontal: spacing.md,
                  paddingTop: spacing.lg,
                  paddingBottom: Math.max(insets.bottom, spacing.md),
                  paddingHorizontal: spacing.md,
                },
            style,
          ]}
        >
          {hasHeader ? (
            <View
              style={{
                marginBottom: compact ? spacing.sm : spacing.md,
                gap: spacing.xs,
              }}
            >
              {title ? (
                <Text
                  variant="bodySmall"
                  color="primary"
                  style={[styles.title, compact && styles.titleCenter]}
                >
                  {title}
                </Text>
              ) : null}
              {message ? (
                <Text
                  variant="caption"
                  color="secondary"
                  style={compact ? styles.messageCenter : undefined}
                >
                  {message}
                </Text>
              ) : null}
            </View>
          ) : null}
          {hasHeader ? (
            <View
              style={[
                styles.rule,
                {
                  backgroundColor: colors.border,
                  marginBottom: compact ? spacing.xs : spacing.sm,
                },
              ]}
            />
          ) : null}
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
  },
  sheet: {
    zIndex: 1,
  },
  title: {
    fontWeight: '500',
  },
  titleCenter: {
    textAlign: 'center',
  },
  messageCenter: {
    textAlign: 'center',
  },
  rule: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
});
