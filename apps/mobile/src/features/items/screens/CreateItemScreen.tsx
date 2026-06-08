import { useState } from 'react';
import { useCreateRecord } from '@/features/items/hooks/useRecords';
import { useFields } from '@/features/properties/hooks/useFields';
import { AppScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { EmptyNotebook, Screen, SkeletonList, Stack, Text } from '@/shared/ui';
import { ItemData } from '@/types';
import { getScreenErrorMessage } from '@/utils';
import { DynamicItemForm } from '../components/DynamicItemForm';

export function CreateItemScreen({ navigation, route }: AppScreenProps<'CreateItem'>) {
  const { collectionId, workspaceId } = route.params;
  const { spacing } = useTheme();
  const { data: fields, isLoading } = useFields(workspaceId, collectionId);
  const createRecord = useCreateRecord(workspaceId, collectionId);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: ItemData) => {
    setError(null);
    try {
      await createRecord.mutateAsync(data);
      navigation.goBack();
    } catch (e) {
      setError(getScreenErrorMessage(e, 'Could not save item. Try again.'));
    }
  };

  if (isLoading) {
    return (
      <Screen scroll edges={['bottom']}>
        <SkeletonList count={4} />
      </Screen>
    );
  }

  const fieldList = fields ?? [];

  return (
    <Screen scroll edges={['bottom']}>
      <Stack gap="md" style={{ paddingBottom: spacing.lg }}>
        {error ? (
          <Text variant="bodySmall" color="danger">
            {error}
          </Text>
        ) : null}
        {fieldList.length === 0 ? (
          <EmptyNotebook
            title="Add a property first"
            description="Items are recorded using the properties in this collection. Add at least one property to get started."
            actionLabel="Add property"
            onAction={() =>
              navigation.navigate('CreateProperty', {
                collectionId,
                collectionName: route.params.collectionName,
                workspaceId,
              })
            }
          />
        ) : (
          <DynamicItemForm
            fields={fieldList}
            onSubmit={handleSubmit}
            submitLabel={createRecord.isPending ? 'Saving…' : 'Save item'}
          />
        )}
      </Stack>
    </Screen>
  );
}
