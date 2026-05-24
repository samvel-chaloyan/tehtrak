import { AppScreenProps } from '@/navigation/types';
import { getAllFields, useAppStore } from '@/store';
import { Screen, Stack, Text } from '@/shared/ui';
import { Item } from '@/types';
import { createId } from '@/utils';
import { DynamicItemForm } from '../components/DynamicItemForm';

export function CreateItemScreen({ navigation, route }: AppScreenProps<'CreateItem'>) {
  const { collectionId } = route.params;
  const fields = getAllFields(collectionId);
  const addItem = useAppStore((s) => s.addItem);

  const handleSubmit = (data: Item['data']) => {
    const now = new Date().toISOString();
    const item: Item = {
      id: createId('item'),
      collectionId,
      data,
      createdAt: now,
      updatedAt: now,
    };
    addItem(item);
    navigation.goBack();
  };

  return (
    <Screen scroll edges={['bottom']}>
      <Stack gap="md" style={{ paddingBottom: 24 }}>
        <Text variant="bodySmall" color="secondary">
          Fields are generated from your collection properties — the same path the live app will use.
        </Text>
        {fields.length === 0 ? (
          <Text variant="body" color="secondary">
            Add at least one property before creating entries.
          </Text>
        ) : (
          <DynamicItemForm fields={fields} onSubmit={handleSubmit} submitLabel="Save entry" />
        )}
      </Stack>
    </Screen>
  );
}
