import { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';
import { getScreenErrorMessage } from '@/utils';

import { Input } from './Input';
import { Text } from './Text';
import { TextLink } from './TextLink';

export interface EditDialogValues {
  name: string;
  description: string;
}

export interface EditDialogProps {
  visible: boolean;
  onClose: () => void;
  /** Card heading — e.g. “Edit workspace”. */
  title?: string;
  initialName: string;
  initialDescription: string;
  nameLabel?: string;
  descriptionLabel?: string;
  descriptionPlaceholder?: string;
  saveLabel?: string;
  closeLabel?: string;
  onSave: (values: EditDialogValues) => Promise<void>;
}

/**
 * Centered notebook edit card — same chrome as InfoDialog, with quiet fields + Save.
 */
export function EditDialog({
  visible,
  onClose,
  title = 'Edit',
  initialName,
  initialDescription,
  nameLabel = 'Name',
  descriptionLabel = 'Description',
  descriptionPlaceholder = 'Your operational notebook',
  saveLabel = 'Save',
  closeLabel = 'Close',
  onSave,
}: EditDialogProps) {
  const { colors, radius, shadows, spacing } = useTheme();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    if (!visible) {
      return;
    }
    setName(initialName);
    setDescription(initialDescription);
    setError(null);
    setSaving(false);
  }, [visible, initialName, initialDescription]);

  useEffect(() => {
    if (!visible) {
      setKeyboardOpen(false);
      return;
    }
    const show = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardOpen(true),
    );
    const hide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardOpen(false),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, [visible]);

  const canSave = name.trim().length > 0 && !saving;

  const handleOverlayPress = () => {
    if (keyboardOpen) {
      Keyboard.dismiss();
      return;
    }
    onClose();
  };

  const handleSave = async () => {
    if (!canSave) {
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await onSave({
        name: name.trim(),
        description: description.trim(),
      });
      onClose();
    } catch (e) {
      setError(getScreenErrorMessage(e, 'Could not save.'));
      setSaving(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
            onPress={handleOverlayPress}
          />

          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View
              style={[
                styles.card,
                shadows.soft,
                {
                  backgroundColor: colors.surface,
                  borderRadius: radius.xl,
                  paddingHorizontal: spacing.lg,
                  paddingTop: spacing.lg,
                  paddingBottom: spacing.md,
                  gap: spacing.md,
                },
              ]}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={closeLabel}
                hitSlop={8}
                onPress={() => {
                  Keyboard.dismiss();
                  onClose();
                }}
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

              <Input
                label={nameLabel}
                labelColor="secondary"
                valueColor="secondary"
                value={name}
                onChangeText={setName}
                autoCapitalize="sentences"
                returnKeyType="next"
              />
              <Input
                label={descriptionLabel}
                labelColor="secondary"
                valueColor="secondary"
                value={description}
                onChangeText={setDescription}
                placeholder={descriptionPlaceholder}
                autoCapitalize="sentences"
              />

              {error ? (
                <Text variant="caption" color="danger" style={styles.error}>
                  {error}
                </Text>
              ) : null}

              <View style={styles.saveRow}>
                <TextLink
                  label={saving ? 'Saving…' : saveLabel}
                  emphasis
                  disabled={!canSave}
                  onPress={handleSave}
                  style={styles.saveLink}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
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
  error: {
    textAlign: 'center',
  },
  saveRow: {
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  saveLink: {
    alignSelf: 'center',
  },
});
