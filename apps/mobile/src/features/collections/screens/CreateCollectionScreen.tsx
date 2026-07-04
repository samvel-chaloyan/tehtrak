import { useState } from 'react';

import { useCreateCollection } from '@/features/collections/hooks/useCollections';
import { AppScreenProps } from '@/navigation/types';
import {
  AppScreenShell,
  Input,
  SingleBottomButton,
  Stack,
  Text,
} from '@/shared/ui';
import { getScreenErrorMessage } from '@/utils';

export function CreateCollectionScreen({
  navigation,
  route,
}: AppScreenProps<'CreateCollection'>) {
  const { workspaceId, workspaceName } = route.params;
  const createCollection = useCreateCollection(workspaceId);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const shellProps = {
    navigation,
    title: 'New collection',
    subtitle: workspaceName,
    subtitleUnderline: true,
    onBack: () => navigation.goBack(),
    scrollable: true,
  };

  const handleContinue = async () => {
    setError(null);
    const trimmedName = name.trim();
    if (!trimmedName) {
      return;
    }

    try {
      const collection = await createCollection.mutateAsync({
        name: trimmedName,
        description: description.trim() || undefined,
      });
      navigation.navigate('CollectionStructure', {
        workspaceId,
        workspaceName,
        collectionId: collection.id,
        collectionName: collection.name,
      });
    } catch (e) {
      setError(getScreenErrorMessage(e, 'Could not create collection.'));
    }
  };

  const footer = (
    <SingleBottomButton
      action={{
        label: createCollection.isPending ? 'Creating…' : 'Continue',
        onPress: handleContinue,
        disabled: createCollection.isPending || !name.trim(),
      }}
    />
  );

  return (
    <AppScreenShell {...shellProps} footer={footer}>
      <Stack gap="md">
        <Text variant="bodySmall" color="secondary">
          Name your collection, then define what each item will contain.
        </Text>
        <Input
          label="Name"
          labelColor="secondary"
          valueColor="secondary"
          value={name}
          onChangeText={setName}
          placeholder="Winter Food Storage"
        />
        <Input
          label="Description (optional)"
          labelColor="secondary"
          valueColor="secondary"
          value={description}
          onChangeText={setDescription}
          placeholder="What this collection tracks"
        />
        {error ? (
          <Text variant="caption" color="danger">
            {error}
          </Text>
        ) : null}
      </Stack>
    </AppScreenShell>
  );
}
