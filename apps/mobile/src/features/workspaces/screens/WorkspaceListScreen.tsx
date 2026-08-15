import { useCallback, useEffect, useMemo, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useResolvedPins } from '@/features/pins/hooks/useResolvedPins';
import { navigateToPin } from '@/features/pins/utils/resolvePin';
import { pinLetter } from '@/features/pins/utils/pinIdentity';
import { useWorkspaceSummaries } from '@/features/workspaces/hooks/useWorkspaceSummaries';
import { useDeleteWorkspace, useWorkspaces } from '@/features/workspaces/hooks/useWorkspaces';
import { workspaceCardMetaLines } from '@/features/workspaces/utils/workspaceMeta';
import { sortWorkspacesByLastEdited } from '@/features/workspaces/utils/workspaceOrder';
import { AppScreenProps } from '@/navigation/types';
import { useAppStore } from '@/store';
import {
  AppScreenShell,
  EmptyListContent,
  EmptyNotebook,
  NotebookListShelf,
  PinButton,
  ScrollIndicatorFlatList,
  SingleBottomButton,
  WorkspaceFocusMenu,
  WorkspaceGridCard,
  WorkspaceGridSkeleton,
  type CardAnchorLayout,
  type ContextRecentPlace,
} from '@/shared/ui';
import { useTheme } from '@/theme';
import type { Workspace } from '@/types';
import { confirmDelete } from '@/utils/confirmDelete';

const GRID_SPACER_ID = '__workspace-grid-spacer__';

type WorkspaceGridItem =
  | { kind: 'workspace'; workspace: Workspace }
  | { kind: 'spacer'; id: string };

type FocusTarget = {
  workspace: Workspace;
  layout: CardAnchorLayout;
  metaLines: string[];
};

function workspaceCountLabel(count: number) {
  return count === 1 ? '1 workspace' : `${count} workspaces`;
}

function toGridItems(workspaces: Workspace[]): WorkspaceGridItem[] {
  const items: WorkspaceGridItem[] = workspaces.map((workspace) => ({
    kind: 'workspace',
    workspace,
  }));

  if (items.length % 2 === 1) {
    items.push({ kind: 'spacer', id: GRID_SPACER_ID });
  }

  return items;
}

function matchesWorkspaceQuery(workspace: Workspace, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return false;
  }

  const name = workspace.name.toLowerCase();
  const description = (workspace.description ?? '').toLowerCase();
  return name.includes(normalized) || description.includes(normalized);
}

export function WorkspaceListScreen({ navigation, route }: AppScreenProps<'WorkspaceList'>) {
  const { spacing } = useTheme();
  const { data: workspaces, isLoading, isError, refetch, isRefetching } = useWorkspaces();
  const { data: summaries } = useWorkspaceSummaries(!isLoading && !isError);
  const deleteWorkspace = useDeleteWorkspace();
  const selectWorkspace = useAppStore((s) => s.selectWorkspace);
  const clearWorkspaceSelection = useAppStore((s) => s.clearWorkspaceSelection);
  const selectedWorkspaceId = useAppStore((s) => s.selectedWorkspaceId);
  const count = workspaces?.length ?? 0;
  const [focusTarget, setFocusTarget] = useState<FocusTarget | null>(null);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { resolved: resolvedPins } = useResolvedPins();

  // Root of the app stack — consume Android back so RN doesn't warn about GO_BACK.
  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => true);
      return () => sub.remove();
    }, []),
  );

  const enterSearch = useCallback(() => {
    setFocusTarget(null);
    setSearchQuery('');
    setSearchActive(true);
  }, []);

  const exitSearch = useCallback(() => {
    setSearchActive(false);
    setSearchQuery('');
  }, []);

  useEffect(() => {
    if (!route.params?.openSearch) {
      return;
    }
    enterSearch();
    navigation.setParams({ openSearch: undefined });
  }, [route.params?.openSearch, enterSearch, navigation]);

  const orderedWorkspaces = useMemo(
    () => sortWorkspacesByLastEdited(workspaces ?? [], summaries),
    [workspaces, summaries],
  );

  const filteredWorkspaces = useMemo(() => {
    if (!searchActive) {
      return orderedWorkspaces;
    }
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      return [];
    }
    return orderedWorkspaces.filter((workspace) =>
      matchesWorkspaceQuery(workspace, trimmed),
    );
  }, [orderedWorkspaces, searchActive, searchQuery]);

  const gridItems = useMemo(
    () => toGridItems(filteredWorkspaces),
    [filteredWorkspaces],
  );

  const openWorkspace = useCallback(
    (workspace: Workspace) => {
      selectWorkspace(workspace.id);
      navigation.navigate('CollectionList', {
        workspaceId: workspace.id,
        workspaceName: workspace.name,
      });
    },
    [navigation, selectWorkspace],
  );

  const openPinned = useCallback(
    (item: (typeof resolvedPins)[number]) => {
      if (!item.resolvable) {
        return;
      }
      if (item.pin.type === 'workspace') {
        selectWorkspace(item.pin.workspaceId);
      }
      navigateToPin(navigation, item.pin, item.title);
    },
    [navigation, selectWorkspace, resolvedPins],
  );

  /** Banner Quick Access — pinned objects (not recent activity). */
  const recentPlaces = useMemo<ContextRecentPlace[]>(
    () =>
      resolvedPins
        .filter((item) => item.resolvable)
        .map((item) => ({
          id: item.pin.id,
          label: item.title,
          initials: pinLetter(item.title),
          entityType: item.pin.type,
          onPress: () => openPinned(item),
        })),
    [resolvedPins, openPinned],
  );

  const closeFocusMenu = useCallback(() => {
    setFocusTarget(null);
  }, []);

  const handleWorkspaceLongPress = useCallback(
    (workspace: Workspace, layout: CardAnchorLayout) => {
      if (searchActive) {
        return;
      }
      setFocusTarget({
        workspace,
        layout,
        metaLines: workspaceCardMetaLines(summaries?.[workspace.id]),
      });
    },
    [searchActive, summaries],
  );

  const handleFocusEdit = useCallback(() => {
    if (!focusTarget) {
      return;
    }
    const { workspace } = focusTarget;
    setFocusTarget(null);
    requestAnimationFrame(() => {
      navigation.navigate('EditWorkspace', {
        workspaceId: workspace.id,
        workspaceName: workspace.name,
        workspaceDescription: workspace.description,
      });
    });
  }, [focusTarget, navigation]);

  const handleFocusDelete = useCallback(() => {
    if (!focusTarget) {
      return;
    }
    const { workspace } = focusTarget;
    setFocusTarget(null);
    requestAnimationFrame(() => {
      confirmDelete(
        'Delete workspace?',
        `Remove "${workspace.name}" and everything inside it?`,
        () => {
          deleteWorkspace.mutate(workspace.id, {
            onSuccess: () => {
              if (selectedWorkspaceId === workspace.id) {
                clearWorkspaceSelection();
              }
            },
          });
        },
      );
    });
  }, [
    clearWorkspaceSelection,
    deleteWorkspace,
    focusTarget,
    selectedWorkspaceId,
  ]);

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

  const searchShellProps = {
    searchActive,
    searchQuery,
    searchPlaceholder: 'Find a workspace',
    onSearchQueryChange: setSearchQuery,
    onSearchCancel: exitSearch,
  };

  const shellProps = {
    navigation,
    title: 'Workspaces',
    recentPlaces,
    onSearch: enterSearch,
    ...searchShellProps,
  };

  const listCount = searchActive ? filteredWorkspaces.length : count;
  const shelfProps = {
    countLabel: workspaceCountLabel(listCount),
    framed: false as const,
    countColor: 'tertiary' as const,
  };

  const gridContentStyle = useMemo(
    () => ({
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.lg,
      gap: spacing.md,
    }),
    [spacing],
  );

  const renderGridItem = ({ item }: { item: WorkspaceGridItem }) => {
    if (item.kind === 'spacer') {
      return <View style={styles.gridCell} pointerEvents="none" />;
    }

    const workspace = item.workspace;

    return (
      <View style={styles.gridCell}>
        <WorkspaceGridCard
          title={workspace.name}
          metaLines={workspaceCardMetaLines(summaries?.[workspace.id])}
          onPress={() => openWorkspace(workspace)}
          onLongPress={(layout) => handleWorkspaceLongPress(workspace, layout)}
          pinSlot={
            <PinButton target={{ type: 'workspace', workspaceId: workspace.id }} compact />
          }
        />
      </View>
    );
  };

  if (isLoading) {
    return (
      <AppScreenShell
        navigation={navigation}
        title="Workspaces"
        recentPlaces={[]}
        onSearch={enterSearch}
        {...searchShellProps}
      >
        <NotebookListShelf {...shelfProps}>
          <WorkspaceGridSkeleton />
        </NotebookListShelf>
      </AppScreenShell>
    );
  }

  if (isError) {
    return (
      <AppScreenShell
        navigation={navigation}
        title="Workspaces"
        recentPlaces={[]}
        onSearch={enterSearch}
        footer={retryFooter}
        {...searchShellProps}
      >
        <NotebookListShelf {...shelfProps}>
          <EmptyListContent
            title="Could not load workspaces"
            description="Pull to refresh or try again in a moment."
          />
        </NotebookListShelf>
      </AppScreenShell>
    );
  }

  if (!count) {
    return (
      <AppScreenShell
        navigation={navigation}
        title="Workspaces"
        recentPlaces={[]}
        onSearch={enterSearch}
        footer={newWorkspaceFooter}
        {...searchShellProps}
      >
        <NotebookListShelf {...shelfProps}>
          <EmptyNotebook
            title="Start your notebook"
            description="Create a workspace to keep collections and items in one calm place."
          />
        </NotebookListShelf>
      </AppScreenShell>
    );
  }

  const showSearchBlank = searchActive && !searchQuery.trim();
  const showSearchEmpty =
    searchActive && Boolean(searchQuery.trim()) && filteredWorkspaces.length === 0;

  return (
    <AppScreenShell
      {...shellProps}
      footer={searchActive ? undefined : newWorkspaceFooter}
    >
      <View style={styles.content}>
        <NotebookListShelf {...shelfProps}>
          {showSearchBlank ? (
            <EmptyListContent
              title="Find a workspace"
              description="Start typing to filter your workspaces."
            />
          ) : showSearchEmpty ? (
            <EmptyListContent
              title="No matching workspaces"
              description="Try another name or description."
            />
          ) : (
            <ScrollIndicatorFlatList
              data={gridItems}
              keyExtractor={(item) => (item.kind === 'spacer' ? item.id : item.workspace.id)}
              numColumns={2}
              keyboardShouldPersistTaps="handled"
              refreshing={searchActive ? false : isRefetching}
              onRefresh={searchActive ? undefined : refetch}
              contentContainerStyle={gridContentStyle}
              columnWrapperStyle={{ gap: spacing.md }}
              renderItem={renderGridItem}
            />
          )}
        </NotebookListShelf>
      </View>

      <WorkspaceFocusMenu
        visible={Boolean(focusTarget)}
        layout={focusTarget?.layout ?? null}
        title={focusTarget?.workspace.name ?? ''}
        metaLines={focusTarget?.metaLines ?? []}
        onEdit={handleFocusEdit}
        onDelete={handleFocusDelete}
        onCancel={closeFocusMenu}
      />
    </AppScreenShell>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    minHeight: 0,
  },
  gridCell: {
    flex: 1,
    overflow: 'visible',
  },
});
