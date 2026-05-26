import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ApiClientError } from '@/core/api';
import { useCreateField, useFields } from '@/features/properties/hooks/useFields';
import { AppScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { Button, Input, Loader, Screen, Stack, Text } from '@/shared/ui';
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
  const [optionsText, setOptionsText] = useState('Option A\nOption B\nOption C');
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
      setError(e instanceof ApiClientError ? e.displayMessage : 'Could not add property.');
    }
  };

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <Screen scroll edges={['bottom']}>
      <Stack gap="lg">
        <Text variant="bodySmall" color="secondary">
          Properties define how entries are captured. This builder validates the metadata-driven
          runtime — no collection-specific code.
        </Text>

        <Input
          label="Property label"
          value={label}
          onChangeText={setLabel}
          placeholder="e.g. Storage spot"
        />

        <Stack gap="sm">
          <Text variant="label" color="secondary">
            Property type
          </Text>
          {PROPERTY_TYPES.map((item) => {
            const selected = type === item.type;
            return (
              <Pressable
                key={item.type}
                onPress={() => setType(item.type)}
                style={[
                  styles.typeRow,
                  {
                    backgroundColor: selected ? colors.primaryMuted : colors.surface,
                    borderColor: selected ? colors.primary : colors.border,
                    borderRadius: radius.md,
                    padding: spacing.md,
                  },
                ]}
              >
                <Text variant="subtitle" color={selected ? 'accent' : 'primary'}>
                  {item.label}
                </Text>
                <Text variant="caption" color="tertiary">
                  {item.hint}
                </Text>
              </Pressable>
            );
          })}
        </Stack>

        <Pressable
          onPress={() => setRequired((v) => !v)}
          style={[
            styles.typeRow,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: radius.md,
              padding: spacing.md,
            },
          ]}
        >
          <Text variant="body">Required for new entries</Text>
          <Text variant="caption" color={required ? 'accent' : 'tertiary'}>
            {required ? 'Yes' : 'No'}
          </Text>
        </Pressable>

        {type === 'select' ? (
          <Input
            label="Choices (one per line)"
            value={optionsText}
            onChangeText={setOptionsText}
            multiline
            style={{ minHeight: 100, textAlignVertical: 'top' }}
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
  typeRow: {
    borderWidth: 1,
    gap: 4,
  },
});
