import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useCreateWorkspace, useWorkspaces } from '@/features/workspaces/hooks/useWorkspaces';
import { AppScreenProps } from '@/navigation/types';
import { useAppStore } from '@/store';
import { useTheme } from '@/theme';
import {
  Button,
  EmptyNotebook,
  IndexFooter,
  Input,
  PageHeader,
  Screen,
  ScreenMeta,
  SkeletonList,
  Stack,
  Text,
  TextLink,
  useNotebookIndexStyle,
} from '@/shared/ui';
import { getScreenErrorMessage } from '@/utils';
import { WorkspaceCard } from '../components/WorkspaceCard';

function workspaceCountLabel(count: number) {
  return count === 1 ? '1 notebook' : `${count} notebooks`;
}

export function WorkspaceListScreen({ navigation }: AppScreenProps<'WorkspaceList'>) {
  const { colors, spacing } = useTheme();
  const indexStyle = useNotebookIndexStyle();
  const { data: workspaces, isLoading, isError, refetch, isRefetching } = useWorkspaces();
  const createWorkspace = useCreateWorkspace();
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
      setCreateError(getScreenErrorMessage(e, 'Could not create workspace.'));
    }
  };

  const header = (
    <PageHeader
      title="Workspaces"
      subtitle="Your operational notebooks."
      action={
        <TextLink
          label="Settings"
          emphasis={false}
          onPress={() => navigation.navigate('Settings')}
        />
      }
    />
  );

  const createPanel = showCreate ? (
    <Stack gap="md" style={{ marginBottom: spacing.lg }}>
      <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: colors.border }} />
      <Stack gap="sm">
        <Text variant="sectionTitle">New workspace</Text>
        <Input label="Name" value={newName} onChangeText={setNewName} placeholder="Family Home" autoFocus />
        {createError ? (
          <Text variant="caption" color="danger">
            {createError}
          </Text>
        ) : null}
        <Stack horizontal gap="sm">
          <Button label="Create" onPress={handleCreate} disabled={createWorkspace.isPending} style={{ flex: 1 }} />
          <Button label="Cancel" variant="ghost" onPress={() => setShowCreate(false)} />
        </Stack>
      </Stack>
    </Stack>
  ) : null;

  const listFooter = !showCreate ? (
    <IndexFooter>
      <TextLink label="New workspace" onPress={() => setShowCreate(true)} />
    </IndexFooter>
  ) : null;

  if (isLoading) {
    return (
      <Screen edges={['top', 'bottom']}>
        {header}
        <View style={indexStyle}>
          <SkeletonList count={3} />
        </View>
      </Screen>
    );
  }

  if (isError) {
    return (
      <Screen edges={['top', 'bottom']}>
        {header}
        {createPanel}
        <EmptyNotebook
          title="Could not load workspaces"
          description="Pull to refresh or try again in a moment."
          actionLabel="Retry"
          onAction={() => refetch()}
        />
      </Screen>
    );
  }

  if (!workspaces?.length) {
    return (
      <Screen edges={['top', 'bottom']}>
        {header}
        {createPanel}
        {!showCreate ? (
          <EmptyNotebook
            title="No notebooks yet"
            description="Create a workspace to begin organizing collections and daily notes."
            actionLabel="New workspace"
            onAction={() => setShowCreate(true)}
          />
        ) : null}
      </Screen>
    );
  }

  return (
    <Screen edges={['top', 'bottom']}>
      {header}
      {createPanel}
      <ScreenMeta label={workspaceCountLabel(workspaces.length)} />

      <FlatList
        style={styles.list}
        data={workspaces}
        keyExtractor={(item) => item.id}
        refreshing={isRefetching}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, indexStyle]}
        ListFooterComponent={listFooter}
        renderItem={({ item, index }) => (
          <WorkspaceCard
            workspace={item}
            selected={item.id === selectedWorkspaceId}
            onPress={() => openWorkspace(item.id, item.name)}
            showDivider={index < workspaces.length - 1}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  listContent: { flexGrow: 1 },
});
