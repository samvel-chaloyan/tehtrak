import { AppScreenProps } from '@/navigation/types';
import { getAllFields, useAppStore } from '@/store';
import { Card, Screen, SectionHeader, Stack, Text } from '@/shared/ui';
import { formatFieldValue } from '@/utils';

export function ItemDetailsScreen({ route }: AppScreenProps<'ItemDetails'>) {
  const { itemId, collectionId } = route.params;
  const fields = getAllFields(collectionId);
  const item = useAppStore((s) => s.items.find((i) => i.id === itemId));

  if (!item) {
    return (
      <Screen>
        <Text variant="body" color="secondary">
          This entry could not be found.
        </Text>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['bottom']}>
      <Stack gap="md">
        <SectionHeader title="Entry details" subtitle="Rendered from property metadata" />
        {fields.map((field) => (
          <Card key={field.id} padded>
            <Stack gap="xs">
              <Text variant="label" color="secondary">
                {field.label}
              </Text>
              <Text variant="body">{formatFieldValue(field, item.data[field.key])}</Text>
            </Stack>
          </Card>
        ))}
        <Text variant="caption" color="tertiary">
          Last updated {new Date(item.updatedAt).toLocaleString()}
        </Text>
      </Stack>
    </Screen>
  );
}
