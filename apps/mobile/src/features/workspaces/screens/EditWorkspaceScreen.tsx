import { useState } from 'react';

import { useUpdateWorkspace } from '@/features/workspaces/hooks/useWorkspaces';
import { AppScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { AppScreenShell, Input, SingleBottomButton, Stack, Text } from '@/shared/ui';
import { getScreenErrorMessage } from '@/utils';

export function EditWorkspaceScreen({ navigation, route }: AppScreenProps<'EditWorkspace'>) {
  const { workspaceId, workspaceName, workspaceDescription } = route.params;
  const { spacing } = useTheme();
  const updateWorkspace = useUpdateWorkspace();
  const [name, setName] = useState(workspaceName);
  const [description, setDescription] = useState(workspaceDescription);
  const [error, setError] = useState<string | null>(null);

  const shellProps = {
    navigation,
    title: 'Edit workspace',
    subtitle: 'Your operational notebooks.',
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
      await updateWorkspace.mutateAsync({
        id: workspaceId,
        name: trimmedName,
        description: description.trim() || 'Your operational notebook',
      });
      navigation.goBack();
    } catch (e) {
      setError(getScreenErrorMessage(e, 'Could not save workspace.'));
    }
  };

  const footer = (
    <SingleBottomButton
      action={{
        label: updateWorkspace.isPending ? 'Saving…' : 'Save',
        onPress: handleSave,
        disabled: updateWorkspace.isPending || !name.trim(),
      }}
    />
  );

  return (
    <AppScreenShell {...shellProps} footer={footer}>
      <Stack gap="md" style={{ marginBottom: spacing.lg }}>
        <Input
          label="Name"
          labelColor="secondary"
          valueColor="secondary"
          value={name}
          onChangeText={setName}
        />
        <Input
          label="Description"
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
