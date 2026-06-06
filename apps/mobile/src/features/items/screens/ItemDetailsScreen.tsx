import { useFields } from '@/features/properties/hooks/useFields';
import { useRecord } from '@/features/items/hooks/useRecords';
import { AppScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { Card, EmptyNotebook, Screen, SectionHeader, SkeletonList, Stack, Text } from '@/shared/ui';
import { formatFieldValue } from '@/utils';

export function ItemDetailsScreen({ route }: AppScreenProps<'ItemDetails'>) {
  const { itemId, collectionId, workspaceId } = route.params;
  const { spacing } = useTheme();
  const { data: fields, isLoading: fieldsLoading } = useFields(workspaceId, collectionId);
  const { data: item, isLoading: itemLoading, isError } = useRecord(workspaceId, collectionId, itemId);

  const fieldList = fields ?? [];
  const isLoading = fieldsLoading || itemLoading;

  if (isLoading) {
    return (
      <Screen scroll edges={['bottom']}>
        <SkeletonList count={3} />
      </Screen>
    );
  }

  if (isError || !item) {
    return (
      <Screen edges={['bottom']}>
        <EmptyNotebook
          title="Item not found"
          description="This item may have been removed or is no longer available."
        />
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['bottom']}>
      <Stack gap="md">
        <SectionHeader title="Item details" />
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
        <Text variant="caption" color="secondary" style={{ marginTop: spacing.sm }}>
          Last updated {new Date(item.updatedAt).toLocaleString()}
        </Text>
      </Stack>
    </Screen>
  );
}
