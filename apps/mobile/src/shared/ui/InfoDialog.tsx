import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

import { Text } from './Text';

export interface InfoDetailRow {
  label: string;
  value: string;
}

export interface InfoDialogProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  /** Primary body copy (e.g. description). */
  message?: string;
  /** Quiet one-liner under the description (e.g. “3 collections”). */
  meta?: string;
  details?: InfoDetailRow[];
  /** Accessibility label for the top-right dismiss control. */
  closeLabel?: string;
}

/**
 * Centered notebook info card — name, description, quiet detail rows.
 * Soft dim overlay (same family as AppBottomSheet) — no separate blur layer.
 */
export function InfoDialog({
  visible,
  onClose,
  title,
  message,
  meta,
  details = [],
  closeLabel = 'Close',
}: InfoDialogProps) {
  const { colors, radius, shadows, spacing } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View
        style={[
          styles.root,
          {
            paddingTop: insets.top + spacing.lg,
            paddingBottom: insets.bottom + spacing.lg,
            paddingHorizontal: spacing.lg,
            backgroundColor: colors.overlay,
          },
        ]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          style={StyleSheet.absoluteFill}
          onPress={onClose}
        />

        <View
          style={[
            styles.card,
            shadows.soft,
            {
              backgroundColor: colors.surface,
              borderRadius: radius.xl,
              paddingHorizontal: spacing.lg,
              paddingTop: spacing.lg,
              paddingBottom: spacing.lg,
              gap: spacing.md,
            },
          ]}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={closeLabel}
            hitSlop={8}
            onPress={onClose}
            style={({ pressed }) => [
              styles.closeHit,
              {
                top: spacing.sm,
                right: spacing.sm,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Ionicons name="close" size={22} color={colors.textSecondary} />
          </Pressable>

          <Text variant="sectionTitle" color="primary" style={styles.title}>
            {title}
          </Text>

          {message ? (
            <Text variant="body" color="secondary" style={styles.message}>
              {message}
            </Text>
          ) : null}

          {meta ? (
            <Text variant="caption" color="tertiary" style={styles.meta}>
              {meta}
            </Text>
          ) : null}

          {details.length > 0 ? (
            <View style={{ gap: spacing.sm }}>
              {details.map((row) => (
                <View key={row.label} style={styles.detailRow}>
                  <Text variant="caption" color="tertiary">
                    {row.label}
                  </Text>
                  <Text variant="bodySmall" color="secondary" style={styles.detailValue}>
                    {row.value}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    zIndex: 1,
  },
  closeHit: {
    position: 'absolute',
    zIndex: 2,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    paddingHorizontal: 36,
  },
  message: {
    textAlign: 'center',
  },
  meta: {
    textAlign: 'center',
  },
  detailRow: {
    gap: 2,
  },
  detailValue: {
    marginTop: 2,
  },
});
