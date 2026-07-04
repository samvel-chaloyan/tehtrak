import { useState } from 'react';

import { useUpdateCollection } from '@/features/collections/hooks/useCollections';
import { AppScreenProps } from '@/navigation/types';
import { AppScreenShell, Input, SingleBottomButton, Stack, Text } from '@/shared/ui';
import { getScreenErrorMessage } from '@/utils';

export function EditCollectionScreen({ navigation, route }: AppScreenProps<'EditCollection'>) {
  const {
    workspaceId,
    workspaceName,
    collectionId,
    collectionName,
    collectionDescription,
  } = route.params;
  const updateCollection = useUpdateCollection(workspaceId);
  const [name, setName] = useState(collectionName);
  const [description, setDescription] = useState(collectionDescription);
  const [error, setError] = useState<string | null>(null);

  const shellProps = {
    navigation,
    title: 'Edit collection',
    subtitle: workspaceName,
    subtitleUnderline: true,
    onBack: () => navigation.goBack(),
  };

  const handleSave = async () => {
    setError(null);
    const trimmedName = name.trim();
    if (!trimmedName) {
      return;
    }

    try {
      await updateCollection.mutateAsync({
        collectionId,
        name: trimmedName,
        description: description.trim() || undefined,
      });
      navigation.goBack();
    } catch (e) {
      setError(getScreenErrorMessage(e, 'Could not save collection.'));
    }
  };

  const footer = (
    <SingleBottomButton
      action={{
        label: updateCollection.isPending ? 'Saving…' : 'Save',
        onPress: handleSave,
        disabled: updateCollection.isPending || !name.trim(),
      }}
    />
  );

  return (
    <AppScreenShell {...shellProps} footer={footer}>
      <Stack gap="md">
        <Input
          label="Name"
          labelColor="secondary"
          valueColor="secondary"
          value={name}
          onChangeText={setName}
        />
        <Input
          label="Description (optional)"
          labelColor="secondary"
          valueColor="secondary"
          value={description}
          onChangeText={setDescription}
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
