import { useFields } from '@/features/properties/hooks/useFields';
import { useRecord } from '@/features/items/hooks/useRecords';
import { AppScreenProps } from '@/navigation/types';
import { Card, Loader, Screen, SectionHeader, Stack, Text } from '@/shared/ui';
import { formatFieldValue } from '@/utils';

export function ItemDetailsScreen({ route }: AppScreenProps<'ItemDetails'>) {
  const { itemId, collectionId, workspaceId } = route.params;
  const { data: fields, isLoading: fieldsLoading } = useFields(workspaceId, collectionId);
  const { data: item, isLoading: itemLoading } = useRecord(workspaceId, collectionId, itemId);

  if (fieldsLoading || itemLoading) {
    return <Loader fullScreen />;
  }

  if (!item) {
    return (
      <Screen>
        <Text variant="body" color="secondary">
          This entry could not be found.
        </Text>
      </Screen>
    );
  }

  const fieldList = fields ?? [];

  return (
    <Screen scroll edges={['bottom']}>
      <Stack gap="md">
        <SectionHeader title="Entry details" subtitle="Rendered from property metadata" />
        {fieldList.map((field) => (
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
