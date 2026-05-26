import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { ApiClientError } from '@/core/api';
import { useLogout } from '@/features/auth/hooks/useAuth';
import { useCreateWorkspace, useWorkspaces } from '@/features/workspaces/hooks/useWorkspaces';
import { AppScreenProps } from '@/navigation/types';
import { useAppStore } from '@/store';
import { useTheme } from '@/theme';
import { Button, EmptyState, Input, Loader, Screen, Stack, Text } from '@/shared/ui';
import { WorkspaceCard } from '../components/WorkspaceCard';

export function WorkspaceListScreen({ navigation }: AppScreenProps<'WorkspaceList'>) {
  const { spacing } = useTheme();
  const { data: workspaces, isLoading, isError, refetch, isRefetching } = useWorkspaces();
  const createWorkspace = useCreateWorkspace();
  const logout = useLogout();
  const selectedWorkspaceId = useAppStore((s) => s.selectedWorkspaceId);
  const selectWorkspace = useAppStore((s) => s.selectWorkspace);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [createError, setCreateError] = useState<string | null>(null);

  const openWorkspace = (workspaceId: string, workspaceName: string) => {
    selectWorkspace(workspaceId);
    navigation.navigate('CollectionList', { workspaceId, workspaceName });
  };

  const handleCreate = async () => {
    setCreateError(null);
    const name = newName.trim();
    if (!name) return;
    try {
      const workspace = await createWorkspace.mutateAsync(name);
      setNewName('');
      setShowCreate(false);
      openWorkspace(workspace.id, workspace.name);
    } catch (e) {
      setCreateError(
        e instanceof ApiClientError ? e.displayMessage : 'Could not create workspace.',
      );
    }
  };

  if (isLoading) {
    return <Loader fullScreen message="Loading workspaces…" />;
  }

  return (
    <Screen edges={['top', 'bottom']}>
      <View style={[styles.header, { paddingTop: spacing.md, paddingBottom: spacing.lg }]}>
        <Stack gap="xs">
          <Text variant="titleLarge">Your workspaces</Text>
          <Text variant="body" color="secondary">
            Each workspace is a separate operational notebook.
          </Text>
        </Stack>
        <Pressable onPress={() => logout.mutate()} hitSlop={12}>
          <Text variant="caption" color="tertiary">
            Sign out
          </Text>
        </Pressable>
      </View>

      {showCreate ? (
        <Stack gap="sm" style={{ marginBottom: spacing.md }}>
          <Input
            label="Workspace name"
            value={newName}
            onChangeText={setNewName}
            placeholder="Family Home"
          />
          {createError ? (
            <Text variant="caption" color="danger">
              {createError}
            </Text>
          ) : null}
          <Stack horizontal gap="sm">
            <Button
              label="Create"
              onPress={handleCreate}
              disabled={createWorkspace.isPending}
              style={styles.flex}
            />
            <Button label="Cancel" variant="ghost" onPress={() => setShowCreate(false)} />
          </Stack>
        </Stack>
      ) : (
        <Button
          label="New workspace"
          variant="secondary"
          fullWidth
          onPress={() => setShowCreate(true)}
          style={{ marginBottom: spacing.md }}
        />
      )}

      {isError ? (
        <EmptyState
          title="Could not load workspaces"
          description="Check that Tehtrak is running and try again."
          actionLabel="Retry"
          onAction={() => refetch()}
        />
      ) : !workspaces?.length ? (
        <EmptyState
          title="No workspaces yet"
          description="Create your first workspace — a calm home for collections and daily operational notes."
          actionLabel="Create workspace"
          onAction={() => setShowCreate(true)}
        />
      ) : (
        <FlatList
          data={workspaces}
          keyExtractor={(item) => item.id}
          refreshing={isRefetching}
          onRefresh={refetch}
          contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing['2xl'] }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <WorkspaceCard
              workspace={item}
              selected={item.id === selectedWorkspaceId}
              onPress={() => openWorkspace(item.id, item.name)}
            />
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  flex: {
    flex: 1,
  },
});
