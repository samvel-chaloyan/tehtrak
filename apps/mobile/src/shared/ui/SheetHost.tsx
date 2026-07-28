import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';

import { AppBottomSheet } from './AppBottomSheet';
import { Text } from './Text';
import {
  registerSheetController,
  type PresentActionsOptions,
  type PresentConfirmOptions,
  type SheetAction,
  type SheetActionTone,
} from './sheetController';

type SheetState =
  | { kind: 'closed' }
  | { kind: 'actions'; options: PresentActionsOptions }
  | { kind: 'confirm'; options: PresentConfirmOptions };

function toneColor(
  tone: SheetActionTone | undefined,
): 'primary' | 'danger' | 'secondary' {
  if (tone === 'danger') return 'danger';
  if (tone === 'cancel') return 'secondary';
  return 'primary';
}

function ActionRow({
  action,
  onPress,
  compact = false,
}: {
  action: SheetAction;
  onPress: () => void;
  compact?: boolean;
}) {
  const { spacing } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        {
          minHeight: compact ? 40 : 48,
          paddingVertical: compact ? spacing.sm : spacing.md,
          paddingHorizontal: spacing.sm,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Text
        variant={compact ? 'bodySmall' : 'body'}
        color={toneColor(action.tone)}
        style={styles.rowLabel}
      >
        {action.label}
      </Text>
    </Pressable>
  );
}

/**
 * Root host for Tehtrak bottom sheets.
 * Registers imperative presentActions / presentConfirm for thin call-site helpers.
 */
export function SheetHost({ children }: { children: ReactNode }) {
  const { colors, spacing } = useTheme();
  const [state, setState] = useState<SheetState>({ kind: 'closed' });

  const dismiss = useCallback(() => {
    setState({ kind: 'closed' });
  }, []);

  const presentActions = useCallback((options: PresentActionsOptions) => {
    setState({ kind: 'actions', options });
  }, []);

  const presentConfirm = useCallback((options: PresentConfirmOptions) => {
    setState({ kind: 'confirm', options });
  }, []);

  useEffect(() => {
    registerSheetController({ presentActions, presentConfirm, dismiss });
    return () => registerSheetController(null);
  }, [presentActions, presentConfirm, dismiss]);

  const visible = state.kind !== 'closed';
  const title = state.kind === 'closed' ? undefined : state.options.title;
  const message =
    state.kind === 'actions' || state.kind === 'confirm'
      ? state.options.message
      : undefined;
  const isConfirm = state.kind === 'confirm';

  const runAction = (onPress: () => void) => {
    dismiss();
    requestAnimationFrame(() => {
      onPress();
    });
  };

  return (
    <>
      {children}
      <AppBottomSheet
        visible={visible}
        onClose={dismiss}
        title={title}
        message={message}
        compact={isConfirm}
      >
        {state.kind === 'actions' ? (
          <View style={{ gap: spacing.xs }}>
            {state.options.actions.map((action) => (
              <ActionRow
                key={`${action.tone ?? 'default'}-${action.label}`}
                action={action}
                onPress={() => runAction(action.onPress)}
              />
            ))}
          </View>
        ) : null}

        {state.kind === 'confirm' ? (
          <View>
            <ActionRow
              compact
              action={{
                label: state.options.confirmLabel ?? 'Delete',
                tone: state.options.confirmTone ?? 'danger',
                onPress: state.options.onConfirm,
              }}
              onPress={() => runAction(state.options.onConfirm)}
            />
            <View style={[styles.separator, { backgroundColor: colors.border }]} />
            <ActionRow
              compact
              action={{
                label: state.options.cancelLabel ?? 'Cancel',
                tone: 'cancel',
                onPress: dismiss,
              }}
              onPress={dismiss}
            />
          </View>
        ) : null}
      </AppBottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
  },
  rowLabel: {
    textAlign: 'center',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
});
