import { useState } from 'react';
import { ApiClientError } from '@/core/api';
import { useCreateRecord } from '@/features/items/hooks/useRecords';
import { useFields } from '@/features/properties/hooks/useFields';
import { AppScreenProps } from '@/navigation/types';
import { Loader, Screen, Stack, Text } from '@/shared/ui';
import { ItemData } from '@/types';
import { DynamicItemForm } from '../components/DynamicItemForm';

export function CreateItemScreen({ navigation, route }: AppScreenProps<'CreateItem'>) {
  const { collectionId, workspaceId } = route.params;
  const { data: fields, isLoading } = useFields(workspaceId, collectionId);
  const createRecord = useCreateRecord(workspaceId, collectionId);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: ItemData) => {
    setError(null);
    try {
      await createRecord.mutateAsync(data);
      navigation.goBack();
    } catch (e) {
      setError(
        e instanceof ApiClientError ? e.displayMessage : 'Could not save entry. Try again.',
      );
    }
  };

  if (isLoading) {
    return <Loader fullScreen />;
  }

  const fieldList = fields ?? [];

  return (
    <Screen scroll edges={['bottom']}>
      <Stack gap="md" style={{ paddingBottom: 24 }}>
        <Text variant="bodySmall" color="secondary">
          Fields are generated from your collection properties — the same path the live app uses.
        </Text>
        {error ? (
          <Text variant="bodySmall" color="danger">
            {error}
          </Text>
        ) : null}
        {fieldList.length === 0 ? (
          <Text variant="body" color="secondary">
            Add at least one property before creating entries.
          </Text>
        ) : (
          <DynamicItemForm
            fields={fieldList}
            onSubmit={handleSubmit}
            submitLabel={createRecord.isPending ? 'Saving…' : 'Save entry'}
          />
        )}
      </Stack>
    </Screen>
  );
}
