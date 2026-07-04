import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { FieldChip } from '@/features/collections/components/FieldChip';
import {
  STARTER_FIELDS,
  type CustomFieldDraft,
} from '@/features/collections/constants/starterFields';
import { useCreateField } from '@/features/properties/hooks/useFields';
import { AppScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import {
  AppScreenShell,
  Input,
  SingleBottomButton,
  Stack,
  Text,
  TextLink,
} from '@/shared/ui';
import { getScreenErrorMessage } from '@/utils';

function initialStarterState() {
  return Object.fromEntries(STARTER_FIELDS.map((field) => [field.id, field.defaultEnabled]));
}

export function CollectionStructureScreen({
  navigation,
  route,
}: AppScreenProps<'CollectionStructure'>) {
  const { workspaceId, workspaceName, collectionId, collectionName } = route.params;
  const { spacing } = useTheme();
  const createField = useCreateField(workspaceId, collectionId);
  const [starterEnabled, setStarterEnabled] = useState(initialStarterState);
  const [customFields, setCustomFields] = useState<CustomFieldDraft[]>([]);
  const [customLabel, setCustomLabel] = useState('');
  const [customType, setCustomType] = useState<'text' | 'number'>('text');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const enabledCount =
    STARTER_FIELDS.filter((field) => starterEnabled[field.id]).length + customFields.length;

  const shellProps = {
    navigation,
    title: 'Item template',
    subtitle: collectionName,
    subtitleUnderline: true,
    onBack: () => navigation.goBack(),
  };

  const toggleStarter = (id: string) => {
    setStarterEnabled((current) => ({ ...current, [id]: !current[id] }));
  };

  const addCustomField = () => {
    const trimmed = customLabel.trim();
    if (!trimmed) {
      return;
    }
    setCustomFields((current) => [...current, { label: trimmed, type: customType }]);
    setCustomLabel('');
    setCustomType('text');
  };

  const handleFinish = async () => {
    setError(null);
    if (enabledCount === 0) {
      setError('Choose at least one field for your items.');
      return;
    }

    setIsSaving(true);
    try {
      let sortOrder = 0;
      for (const starter of STARTER_FIELDS) {
        if (!starterEnabled[starter.id]) {
          continue;
        }
        await createField.mutateAsync({
          label: starter.label,
          type: starter.type,
          required: starter.required,
          sortOrder,
        });
        sortOrder += 1;
      }

      for (const field of customFields) {
        await createField.mutateAsync({
          label: field.label,
          type: field.type,
          required: false,
          sortOrder,
        });
        sortOrder += 1;
      }

      navigation.reset({
        index: 1,
        routes: [
          { name: 'CollectionList', params: { workspaceId, workspaceName } },
          {
            name: 'CollectionDetails',
            params: { workspaceId, collectionId, collectionName },
          },
        ],
      });
    } catch (e) {
      setError(getScreenErrorMessage(e, 'Could not save the item template.'));
    } finally {
      setIsSaving(false);
    }
  };

  const footer = (
    <SingleBottomButton
      action={{
        label: isSaving ? 'Saving…' : 'Finish',
        onPress: handleFinish,
        disabled: isSaving || enabledCount === 0,
      }}
    />
  );

  return (
    <AppScreenShell {...shellProps} footer={footer}>
      <Stack gap="lg">
        <Stack gap="sm">
          <Text variant="body" color="secondary">
            Let&apos;s create the pages in this notebook.
          </Text>
          <Text variant="bodySmall" color="secondary">
            Tap the fields each item should have. You can change them later.
          </Text>
        </Stack>

        <View style={[styles.chipWrap, { gap: spacing.sm }]}>
          {STARTER_FIELDS.map((field) => (
            <FieldChip
              key={field.id}
              label={field.label}
              selected={Boolean(starterEnabled[field.id])}
              onPress={() => toggleStarter(field.id)}
            />
          ))}
          {customFields.map((field, index) => (
            <FieldChip
              key={`${field.label}-${index}`}
              label={field.label}
              selected
              onPress={() =>
                setCustomFields((current) => current.filter((_, itemIndex) => itemIndex !== index))
              }
            />
          ))}
        </View>

        <Stack gap="md">
          <Input
            label="Custom field"
            labelColor="secondary"
            valueColor="secondary"
            value={customLabel}
            onChangeText={setCustomLabel}
            placeholder="Name"
          />
          <View style={[styles.typeRow, { gap: spacing.sm }]}>
            <FieldChip
              label="Text"
              selected={customType === 'text'}
              onPress={() => setCustomType('text')}
            />
            <FieldChip
              label="Number"
              selected={customType === 'number'}
              onPress={() => setCustomType('number')}
            />
          </View>
          <TextLink label="Add to template" onPress={addCustomField} />
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

const styles = StyleSheet.create({
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
