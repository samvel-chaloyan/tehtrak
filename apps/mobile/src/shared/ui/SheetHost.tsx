import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';

import { AppBottomSheet } from './AppBottomSheet';
import { EditDialog } from './EditDialog';
import { InfoDialog } from './InfoDialog';
import { Text } from './Text';
import {
  registerSheetController,
  type PresentActionsOptions,
  type PresentConfirmOptions,
  type PresentEditOptions,
  type PresentInfoOptions,
  type SheetAction,
  type SheetActionTone,
} from './sheetController';

type SheetState =
  | { kind: 'closed' }
  | { kind: 'actions'; options: PresentActionsOptions }
  | { kind: 'confirm'; options: PresentConfirmOptions }
  | { kind: 'info'; options: PresentInfoOptions }
  | { kind: 'edit'; options: PresentEditOptions };

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
 * Root host for Tehtrak sheets and centered info dialogs.
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

  const presentInfo = useCallback((options: PresentInfoOptions) => {
    setState({ kind: 'info', options });
  }, []);

  const presentEdit = useCallback((options: PresentEditOptions) => {
    setState({ kind: 'edit', options });
  }, []);

  useEffect(() => {
    registerSheetController({
      presentActions,
      presentConfirm,
      presentInfo,
      presentEdit,
      dismiss,
    });
    return () => registerSheetController(null);
  }, [presentActions, presentConfirm, presentInfo, presentEdit, dismiss]);

  const sheetVisible = state.kind === 'actions' || state.kind === 'confirm';
  const title =
    state.kind === 'actions' || state.kind === 'confirm' ? state.options.title : undefined;
  const message =
    state.kind === 'actions' || state.kind === 'confirm' ? state.options.message : undefined;
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
        visible={sheetVisible}
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

      <InfoDialog
        visible={state.kind === 'info'}
        onClose={dismiss}
        title={state.kind === 'info' ? state.options.title : ''}
        message={state.kind === 'info' ? state.options.message : undefined}
        meta={state.kind === 'info' ? state.options.meta : undefined}
        details={state.kind === 'info' ? state.options.details : undefined}
        closeLabel={state.kind === 'info' ? state.options.closeLabel : undefined}
      />

      <EditDialog
        visible={state.kind === 'edit'}
        onClose={dismiss}
        title={state.kind === 'edit' ? state.options.title : undefined}
        initialName={state.kind === 'edit' ? state.options.initialName : ''}
        initialDescription={state.kind === 'edit' ? state.options.initialDescription : ''}
        nameLabel={state.kind === 'edit' ? state.options.nameLabel : undefined}
        descriptionLabel={state.kind === 'edit' ? state.options.descriptionLabel : undefined}
        descriptionPlaceholder={
          state.kind === 'edit' ? state.options.descriptionPlaceholder : undefined
        }
        saveLabel={state.kind === 'edit' ? state.options.saveLabel : undefined}
        closeLabel={state.kind === 'edit' ? state.options.closeLabel : undefined}
        onSave={
          state.kind === 'edit'
            ? state.options.onSave
            : async () => undefined
        }
      />
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
