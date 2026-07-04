import { StyleSheet, View } from 'react-native';

import {
  useDeleteWorkspace,
  useWorkspaces,
} from '@/features/workspaces/hooks/useWorkspaces';
import { AppScreenProps } from '@/navigation/types';
import { useAppStore } from '@/store';
import {
  AppScreenShell,
  EmptyListContent,
  NotebookListShelf,
  NotebookRow,
  ScrollIndicatorFlatList,
  SingleBottomButton,
  SkeletonList,
} from '@/shared/ui';
import { confirmDelete } from '@/utils/confirmDelete';

function workspaceCountLabel(count: number) {
  return count === 1 ? '1 workspace' : `${count} workspaces`;
}

export function WorkspaceListScreen({ navigation }: AppScreenProps<'WorkspaceList'>) {
  const { data: workspaces, isLoading, isError, refetch, isRefetching } = useWorkspaces();
  const deleteWorkspace = useDeleteWorkspace();
  const selectedWorkspaceId = useAppStore((s) => s.selectedWorkspaceId);
  const selectWorkspace = useAppStore((s) => s.selectWorkspace);

  const openWorkspace = (workspaceId: string, workspaceName: string) => {
    selectWorkspace(workspaceId);
    navigation.navigate('CollectionList', { workspaceId, workspaceName });
  };

  const newWorkspaceFooter = (
    <SingleBottomButton
      action={{
        label: 'New workspace',
        icon: 'add-outline',
        onPress: () => navigation.navigate('CreateWorkspace'),
      }}
    />
  );

  const retryFooter = (
    <SingleBottomButton
      action={{
        label: 'Retry',
        onPress: () => refetch(),
      }}
    />
  );

  const shellProps = {
    navigation,
    title: 'Workspaces',
    subtitle: 'Your operational notebooks.',
    subtitleUnderline: true,
  };

  if (isLoading) {
    return (
      <AppScreenShell {...shellProps}>
        <NotebookListShelf countLabel={workspaceCountLabel(0)}>
          <SkeletonList count={3} />
        </NotebookListShelf>
      </AppScreenShell>
    );
  }

  if (isError) {
    return (
      <AppScreenShell {...shellProps} footer={retryFooter}>
        <EmptyListContent
          title="Could not load workspaces"
          description="Pull to refresh or try again in a moment."
        />
      </AppScreenShell>
    );
  }

  const count = workspaces?.length ?? 0;

  if (!count) {
    return (
      <AppScreenShell {...shellProps} footer={newWorkspaceFooter}>
        <NotebookListShelf countLabel={workspaceCountLabel(count)}>
          <EmptyListContent
            title="No workspaces yet"
            description="Create a workspace to begin organizing collections and items."
          />
        </NotebookListShelf>
      </AppScreenShell>
    );
  }

  const workspaceList = workspaces ?? [];

  return (
    <AppScreenShell {...shellProps} footer={newWorkspaceFooter}>
      <View style={styles.content}>
        <NotebookListShelf countLabel={workspaceCountLabel(count)}>
          <ScrollIndicatorFlatList
            data={workspaceList}
            keyExtractor={(item) => item.id}
            refreshing={isRefetching}
            onRefresh={refetch}
            contentContainerStyle={styles.listContent}
            renderItem={({ item, index }) => (
              <NotebookRow
                title={item.name}
                description={item.description || undefined}
                meta={item.id === selectedWorkspaceId ? 'Active workspace' : undefined}
                onPress={() => openWorkspace(item.id, item.name)}
                onEdit={() =>
                  navigation.navigate('EditWorkspace', {
                    workspaceId: item.id,
                    workspaceName: item.name,
                    workspaceDescription: item.description,
                  })
                }
                onDelete={() =>
                  confirmDelete(
                    'Delete workspace?',
                    `Remove "${item.name}" and everything inside it?`,
                    () => deleteWorkspace.mutate(item.id),
                  )
                }
                showDivider={index < workspaceList.length - 1}
                size="workspace"
              />
            )}
          />
        </NotebookListShelf>
      </View>
    </AppScreenShell>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    minHeight: 0,
  },
  listContent: {
    flexGrow: 1,
  },
});
