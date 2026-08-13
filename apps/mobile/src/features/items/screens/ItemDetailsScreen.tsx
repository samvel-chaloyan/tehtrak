import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { DynamicItemForm, DynamicItemFormHandle } from '@/features/items/components/DynamicItemForm';
import { useRecord, useUpdateRecord } from '@/features/items/hooks/useRecords';
import { useFields } from '@/features/properties/hooks/useFields';
import { AppScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import {
  AppScreenShell,
  EmptyListContent,
  EmptyNotebook,
  NotebookListShelf,
  PinButton,
  SingleBottomButton,
  SkeletonList,
  Text,
} from '@/shared/ui';
import { ItemData, PropertyField } from '@/types';
import { formatFieldValue, formatRelativeTime, getItemTitle, getScreenErrorMessage, confirmDiscardEdits } from '@/utils';

function matchesPropertyQuery(
  field: PropertyField,
  value: unknown,
  query: string,
) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return false;
  }

  const label = field.label.toLowerCase();
  const formatted = formatFieldValue(field, value).toLowerCase();
  const raw = value == null || value === '' ? '' : String(value).toLowerCase();

  return (
    label.includes(normalized) ||
    formatted.includes(normalized) ||
    raw.includes(normalized)
  );
}

function propertyCountLabel(count: number) {
  return count === 1 ? '1 property' : `${count} properties`;
}

function itemUpdatedMeta(iso: string) {
  return `Updated ${formatRelativeTime(iso)}`;
}

export function ItemDetailsScreen({ navigation, route }: AppScreenProps<'ItemDetails'>) {
  const { itemId, collectionId, workspaceId, edit: startEditing } = route.params;
  const { spacing } = useTheme();
  const formRef = useRef<DynamicItemFormHandle>(null);
  const [isEditing, setIsEditing] = useState(Boolean(startEditing));
  const [error, setError] = useState<string | null>(null);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: fields, isLoading: fieldsLoading } = useFields(workspaceId, collectionId);
  const { data: item, isLoading: itemLoading, isError } = useRecord(
    workspaceId,
    collectionId,
    itemId,
  );
  const updateRecord = useUpdateRecord(workspaceId, collectionId);

  const fieldList = fields ?? [];
  const isLoading = fieldsLoading || itemLoading;
  const itemTitle = item ? getItemTitle(item, fieldList) : 'Item';

  useEffect(() => {
    if (startEditing) {
      setIsEditing(true);
    }
  }, [startEditing]);

  const exitEdit = useCallback(() => {
    setIsEditing(false);
    setError(null);
    if (startEditing) {
      navigation.setParams({ edit: undefined });
    }
  }, [navigation, startEditing]);

  const enterSearch = useCallback(() => {
    const beginSearch = () => {
      exitEdit();
      setSearchQuery('');
      setSearchActive(true);
    };

    if (isEditing) {
      confirmDiscardEdits(beginSearch);
      return;
    }

    beginSearch();
  }, [isEditing, exitEdit]);

  const exitSearch = useCallback(() => {
    setSearchActive(false);
    setSearchQuery('');
  }, []);

  /** Back while editing exits edit (stay on item); otherwise leave the screen. */
  const handleBack = useCallback(() => {
    if (isEditing) {
      confirmDiscardEdits(exitEdit);
      return;
    }
    navigation.goBack();
  }, [isEditing, exitEdit, navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (event) => {
      if (!isEditing) {
        return;
      }
      // Phone back / gesture — exit edit instead of popping to the collection.
      event.preventDefault();
      confirmDiscardEdits(exitEdit);
    });
    return unsubscribe;
  }, [navigation, isEditing, exitEdit]);

  const visibleFields = useMemo(() => {
    if (!searchActive || !item) {
      return fieldList;
    }
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      return [];
    }
    return fieldList.filter((field) =>
      matchesPropertyQuery(field, item.data[field.key], trimmed),
    );
  }, [fieldList, item, searchActive, searchQuery]);

  const searchShellProps = {
    searchActive,
    searchQuery,
    searchPlaceholder: 'Find a property',
    onSearchQueryChange: setSearchQuery,
    onSearchCancel: exitSearch,
  };

  const shellProps = {
    navigation,
    title: 'Item',
    subtitle: itemTitle,
    subtitleUnderline: true,
    onBack: handleBack,
    onSearch: enterSearch,
    ...searchShellProps,
  };

  const handleSubmit = async (data: ItemData) => {
    setError(null);
    try {
      await updateRecord.mutateAsync({ recordId: itemId, data });
      setIsEditing(false);
    } catch (e) {
      setError(getScreenErrorMessage(e, 'Could not save item. Try again.'));
    }
  };

  const enterEdit = useCallback(() => {
    setError(null);
    setIsEditing(true);
    requestAnimationFrame(() => formRef.current?.reset());
  }, []);

  const footer = isEditing ? (
    <SingleBottomButton
      action={{
        label: updateRecord.isPending ? 'Saving…' : 'Save',
        onPress: () => formRef.current?.submit(),
        disabled: updateRecord.isPending || fieldList.length === 0,
      }}
    />
  ) : (
    <SingleBottomButton
      action={{
        label: 'Edit',
        icon: 'create-outline',
        onPress: enterEdit,
        disabled: fieldList.length === 0,
      }}
    />
  );

  if (isLoading) {
    return (
      <AppScreenShell {...shellProps} subtitle={undefined}>
        <NotebookListShelf countLabel="…" accent="item" framed={false} countColor="tertiary">
          <SkeletonList count={3} />
        </NotebookListShelf>
      </AppScreenShell>
    );
  }

  if (isError || !item) {
    return (
      <AppScreenShell {...shellProps}>
        <EmptyNotebook
          title="Item not found"
          description="This item may have been removed or is no longer available."
        />
      </AppScreenShell>
    );
  }

  const showSearchBlank = searchActive && !searchQuery.trim();
  const showSearchEmpty =
    searchActive && Boolean(searchQuery.trim()) && visibleFields.length === 0;

  const shelfMeta = searchActive
    ? propertyCountLabel(visibleFields.length)
    : itemUpdatedMeta(item.updatedAt);

  return (
    <AppScreenShell
      {...shellProps}
      footer={searchActive ? undefined : footer}
    >
      <View style={styles.content}>
        {error ? (
          <Text
            variant="bodySmall"
            color="danger"
            style={{ marginBottom: spacing.md, paddingHorizontal: spacing.lg }}
          >
            {error}
          </Text>
        ) : null}

        <NotebookListShelf
          countLabel={shelfMeta}
          accent="item"
          framed={false}
          countColor="tertiary"
          footerLeft={
            searchActive ? undefined : (
              <PinButton
                target={{
                  type: 'item',
                  workspaceId,
                  collectionId,
                  itemId: item.id,
                }}
              />
            )
          }
        >
          {showSearchBlank ? (
            <EmptyListContent
              title="Find a property"
              description="Start typing to filter properties on this page."
            />
          ) : showSearchEmpty ? (
            <EmptyListContent
              title="No matching properties"
              description="Try another label or value."
            />
          ) : (
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              showsVerticalScrollIndicator={false}
            >
              <DynamicItemForm
                ref={formRef}
                fields={visibleFields}
                initialValues={item.data}
                onSubmit={handleSubmit}
                hideSubmitButton
                mode={isEditing ? 'edit' : 'view'}
                layout="page"
              />
            </ScrollView>
          )}
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
