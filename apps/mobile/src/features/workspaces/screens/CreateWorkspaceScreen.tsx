import { useState } from 'react';

import { useCreateWorkspace } from '@/features/workspaces/hooks/useWorkspaces';
import { AppScreenProps } from '@/navigation/types';
import { AppScreenShell, Input, SingleBottomButton, Stack, Text } from '@/shared/ui';
import { getScreenErrorMessage } from '@/utils';

export function CreateWorkspaceScreen({ navigation }: AppScreenProps<'CreateWorkspace'>) {
  const createWorkspace = useCreateWorkspace();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const shellProps = {
    navigation,
    title: 'New workspace',
    subtitle: 'Your operational notebooks.',
    subtitleUnderline: true,
    onBack: () => navigation.goBack(),
    scrollable: true,
  };

  const handleCreate = async () => {
    setError(null);
    const trimmedName = name.trim();
    if (!trimmedName) {
      return;
    }

    try {
      const workspace = await createWorkspace.mutateAsync({
        name: trimmedName,
        description: description.trim() || undefined,
      });
      navigation.replace('CollectionList', {
        workspaceId: workspace.id,
        workspaceName: workspace.name,
      });
    } catch (e) {
      setError(getScreenErrorMessage(e, 'Could not create workspace.'));
    }
  };

  const footer = (
    <SingleBottomButton
      action={{
        label: createWorkspace.isPending ? 'Creating…' : 'Create',
        onPress: handleCreate,
        disabled: createWorkspace.isPending || !name.trim(),
      }}
    />
  );

  return (
    <AppScreenShell {...shellProps} footer={footer}>
      <Stack gap="md">
        <Text variant="bodySmall" color="secondary">
          Give your workspace a name and a short note about what it is for.
        </Text>
        <Input
          label="Name"
          labelColor="secondary"
          valueColor="secondary"
          value={name}
          onChangeText={setName}
          placeholder="Family Home"
        />
        <Input
          label="Description (optional)"
          labelColor="secondary"
          valueColor="secondary"
          value={description}
          onChangeText={setDescription}
          placeholder="Your operational notebook"
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
