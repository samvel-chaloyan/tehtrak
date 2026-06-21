import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useCreateField, useFields } from '@/features/properties/hooks/useFields';
import { AppScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { Button, Input, NotebookRow, Screen, SectionHeader, SkeletonList, Stack, Text } from '@/shared/ui';
import { getScreenErrorMessage } from '@/utils';
import { PropertyType } from '@/types';

const PROPERTY_TYPES: { type: PropertyType; label: string; hint: string }[] = [
  { type: 'text', label: 'Text', hint: 'Names, notes, labels' },
  { type: 'number', label: 'Number', hint: 'Quantities, counts, weights' },
  { type: 'date', label: 'Date', hint: 'Deadlines, pick dates, shifts' },
  { type: 'boolean', label: 'Yes / No', hint: 'Opened, inspected, overnight' },
  { type: 'select', label: 'Choice list', hint: 'Locations, shifts, categories' },
];

export function CreatePropertyScreen({ navigation, route }: AppScreenProps<'CreateProperty'>) {
  const { collectionId, workspaceId } = route.params;
  const { colors, radius, spacing } = useTheme();
  const { data: existingFields, isLoading } = useFields(workspaceId, collectionId);
  const createField = useCreateField(workspaceId, collectionId);

  const [label, setLabel] = useState('');
  const [type, setType] = useState<PropertyType>('text');
  const [required, setRequired] = useState(true);
  const [optionsText, setOptionsText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setError(null);
    const trimmed = label.trim();
    if (!trimmed) return;

    const config =
      type === 'select'
        ? {
            options: optionsText
              .split('\n')
              .map((line) => line.trim())
              .filter(Boolean)
              .map((line) => ({ label: line, value: line.toLowerCase().replace(/[^a-z0-9]+/g, '_') })),
          }
        : undefined;

    try {
      await createField.mutateAsync({
        label: trimmed,
        type,
        required,
        config,
        sortOrder: existingFields?.length ?? 0,
      });
      navigation.goBack();
    } catch (e) {
      setError(getScreenErrorMessage(e, 'Could not add property.'));
    }
  };

  if (isLoading) {
    return (
      <Screen scroll edges={['bottom']}>
        <SkeletonList count={3} />
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['bottom']}>
      <Stack gap="xl">
        <Text variant="body" color="secondary">
          Each property is a line on your notebook page — what you want to record for every item.
        </Text>

        <Input
          label="Property label"
          value={label}
          onChangeText={setLabel}
          placeholder="e.g. Storage spot"
        />

        <Stack gap="sm">
          <SectionHeader title="Property type" />
          <View style={[styles.typeList, { borderColor: colors.border, borderRadius: radius.lg }]}>
            {PROPERTY_TYPES.map((item) => {
              const selected = type === item.type;
              return (
                <NotebookRow
                  key={item.type}
                  title={item.label}
                  description={item.hint}
                  size="collection"
                  onPress={() => setType(item.type)}
                  showDivider
                  meta={selected ? 'Selected' : undefined}
                />
              );
            })}
          </View>
        </Stack>

        <View
          style={[styles.requiredRow, { borderColor: colors.border, borderRadius: radius.lg }]}
          onStartShouldSetResponder={() => true}
          onResponderRelease={() => setRequired((v) => !v)}
        >
          <NotebookRow
            title="Required for new items"
            description={required ? 'Yes' : 'No, can be left empty'}
            size="collection"
          />
        </View>

        {type === 'select' ? (
          <Input
            label="Choices (one per line)"
            value={optionsText}
            onChangeText={setOptionsText}
            multiline
            style={{ minHeight: 100, textAlignVertical: 'top' }}
            placeholder="Option A&#10;Option B&#10;Option C"
          />
        ) : null}

        {error ? (
          <Text variant="bodySmall" color="danger">
            {error}
          </Text>
        ) : null}

        <Button
          label={createField.isPending ? 'Saving…' : 'Add property'}
          fullWidth
          onPress={handleSave}
          disabled={createField.isPending}
        />
      </Stack>
    </Screen>
  );
}

const styles = StyleSheet.create({
  typeList: {
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  requiredRow: {
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
});
