import { useFields } from '@/features/properties/hooks/useFields';
import { useRecord } from '@/features/items/hooks/useRecords';
import { AppScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import {
  EmptyNotebook,
  NotebookField,
  PageTitle,
  Screen,
  SkeletonList,
  Stack,
  Text,
} from '@/shared/ui';
import { formatFieldValue, formatRelativeTime, getItemTitle } from '@/utils';

export function ItemDetailsScreen({ route }: AppScreenProps<'ItemDetails'>) {
  const { itemId, collectionId, workspaceId } = route.params;
  const { spacing } = useTheme();
  const { data: fields, isLoading: fieldsLoading } = useFields(workspaceId, collectionId);
  const { data: item, isLoading: itemLoading, isError } = useRecord(workspaceId, collectionId, itemId);

  const fieldList = fields ?? [];
  const isLoading = fieldsLoading || itemLoading;
  const itemTitle = item ? getItemTitle(item, fieldList) : 'Item';

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
    <Screen scroll edges={['bottom', 'top']}>
      <Stack gap="2xl">
        <Stack gap="xs">
          <PageTitle>{itemTitle}</PageTitle>
          <Text variant="caption" color="tertiary">
            Updated {formatRelativeTime(item.updatedAt)}
          </Text>
        </Stack>

        <Stack gap="xl">
          {fieldList.map((field) => (
            <NotebookField
              key={field.id}
              label={field.label}
              value={formatFieldValue(field, item.data[field.key])}
            />
          ))}
        </Stack>
      </Stack>
    </Screen>
  );
}
