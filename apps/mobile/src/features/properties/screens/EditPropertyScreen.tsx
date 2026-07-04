import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { FieldChip } from '@/features/collections/components/FieldChip';
import { useUpdateField } from '@/features/properties/hooks/useFields';
import { AppScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { AppScreenShell, Input, SingleBottomButton, Stack, Text } from '@/shared/ui';
import { getScreenErrorMessage } from '@/utils';

export function EditPropertyScreen({ navigation, route }: AppScreenProps<'EditProperty'>) {
  const {
    collectionId,
    collectionName,
    workspaceId,
    fieldId,
    fieldLabel,
    fieldType,
    fieldRequired,
  } = route.params;
  const updateField = useUpdateField(workspaceId, collectionId);
  const [label, setLabel] = useState(fieldLabel);
  const [error, setError] = useState<string | null>(null);

  const shellProps = {
    navigation,
    title: 'Edit field',
    subtitle: collectionName,
    subtitleUnderline: true,
    onBack: () => navigation.goBack(),
  };

  const handleSave = async () => {
    setError(null);
    const trimmed = label.trim();
    if (!trimmed) {
      return;
    }

    try {
      await updateField.mutateAsync({
        fieldId,
        label: trimmed,
        required: fieldRequired,
      });
      navigation.goBack();
    } catch (e) {
      setError(getScreenErrorMessage(e, 'Could not save field.'));
    }
  };

  const footer = (
    <SingleBottomButton
      action={{
        label: updateField.isPending ? 'Saving…' : 'Save',
        onPress: handleSave,
        disabled: updateField.isPending || !label.trim(),
      }}
    />
  );

  const typeLabel = fieldType === 'number' ? 'Number' : 'Text';

  return (
    <AppScreenShell {...shellProps} footer={footer}>
      <Stack gap="lg">
        <Input
          label="Field name"
          labelColor="secondary"
          valueColor="secondary"
          value={label}
          onChangeText={setLabel}
        />
        <Stack gap="xs">
          <Text variant="label" color="secondary">
            Type
          </Text>
          <Text variant="bodySmall" color="secondary">
            {typeLabel}
          </Text>
          <Text variant="caption" color="tertiary">
            Field type cannot be changed after creation.
          </Text>
        </Stack>
        {error ? (
          <Text variant="caption" color="danger">
            {error}
          </Text>
        ) : null}
      </Stack>
    </AppScreenShell>
  );
}
