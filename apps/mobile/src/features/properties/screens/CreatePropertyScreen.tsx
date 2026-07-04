import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { FieldChip } from '@/features/collections/components/FieldChip';
import { useCreateField, useFields } from '@/features/properties/hooks/useFields';
import { AppScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { AppScreenShell, Input, SingleBottomButton, Stack, Text } from '@/shared/ui';
import { getScreenErrorMessage } from '@/utils';
import { PropertyType } from '@/types';

export function CreatePropertyScreen({ navigation, route }: AppScreenProps<'CreateProperty'>) {
  const { collectionId, collectionName, workspaceId } = route.params;
  const { spacing } = useTheme();
  const { data: existingFields } = useFields(workspaceId, collectionId);
  const createField = useCreateField(workspaceId, collectionId);

  const [label, setLabel] = useState('');
  const [type, setType] = useState<Extract<PropertyType, 'text' | 'number'>>('text');
  const [error, setError] = useState<string | null>(null);

  const shellProps = {
    navigation,
    title: 'Add field',
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
      await createField.mutateAsync({
        label: trimmed,
        type,
        required: false,
        sortOrder: existingFields?.length ?? 0,
      });
      navigation.goBack();
    } catch (e) {
      setError(getScreenErrorMessage(e, 'Could not add field.'));
    }
  };

  const footer = (
    <SingleBottomButton
      action={{
        label: createField.isPending ? 'Saving…' : 'Save',
        onPress: handleSave,
        disabled: createField.isPending || !label.trim(),
      }}
    />
  );

  return (
    <AppScreenShell {...shellProps} footer={footer}>
      <Stack gap="lg">
        <Text variant="bodySmall" color="secondary">
          A field is one line on every item page — like Name or Count.
        </Text>
        <Input
          label="Field name"
          labelColor="secondary"
          valueColor="secondary"
          value={label}
          onChangeText={setLabel}
          placeholder="Storage spot"
        />
        <View style={[styles.typeRow, { gap: spacing.sm }]}>
          <FieldChip label="Text" selected={type === 'text'} onPress={() => setType('text')} />
          <FieldChip
            label="Number"
            selected={type === 'number'}
            onPress={() => setType('number')}
          />
        </View>
        {error ? (
          <Text variant="caption" color="danger">
            {error}
          </Text>
        ) : null}
      </Stack>
    </AppScreenShell>
  );
}

const styles = StyleSheet.create({
  typeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
