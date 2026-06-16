import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useCreateField, useFields } from '@/features/properties/hooks/useFields';
import { AppScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { Button, Input, Screen, SkeletonList, Stack, Text } from '@/shared/ui';
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
  const { colors, spacing } = useTheme();
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
          <Text variant="label" color="secondary">
            Property type
          </Text>
          {PROPERTY_TYPES.map((item, index) => {
            const selected = type === item.type;
            return (
              <View key={item.type}>
                <Pressable
                  onPress={() => setType(item.type)}
                  style={({ pressed }) => [
                    {
                      paddingVertical: spacing.lg,
                      gap: spacing.xs,
                      opacity: pressed ? 0.82 : 1,
                    },
                  ]}
                >
                  <Text variant="subtitle" style={selected ? { fontWeight: '600' } : undefined}>
                    {item.label}
                  </Text>
                  <Text variant="caption" color="tertiary">
                    {item.hint}
                  </Text>
                </Pressable>
                {index < PROPERTY_TYPES.length - 1 ? (
                  <View
                    style={{
                      height: StyleSheet.hairlineWidth,
                      backgroundColor: colors.border,
                      marginLeft: spacing.md,
                    }}
                  />
                ) : null}
              </View>
            );
          })}
        </Stack>

        <Pressable
          onPress={() => setRequired((v) => !v)}
          style={({ pressed }) => [
            {
              paddingVertical: spacing.md,
              gap: spacing.xs,
              opacity: pressed ? 0.82 : 1,
            },
          ]}
        >
          <Text variant="body">Required for new items</Text>
          <Text variant="caption" color="secondary">
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
