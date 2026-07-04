import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { useDeleteField, useFields } from '@/features/properties/hooks/useFields';
import { AppScreenProps } from '@/navigation/types';
import {
  AppScreenShell,
  EmptyListContent,
  NotebookIndexFrame,
  NotebookRow,
  ScrollIndicatorFlatList,
  SingleBottomButton,
  SkeletonList,
} from '@/shared/ui';
import { confirmDelete } from '@/utils/confirmDelete';

const FIELD_TYPE_LABELS: Record<string, string> = {
  text: 'Text',
  number: 'Number',
};

export function CustomizeFieldsScreen({
  navigation,
  route,
}: AppScreenProps<'CustomizeFields'>) {
  const { collectionId, collectionName, workspaceId } = route.params;
  const { data: fields, isLoading, isError, refetch } = useFields(workspaceId, collectionId);
  const deleteField = useDeleteField(workspaceId, collectionId);

  const shellProps = {
    navigation,
    title: 'Customize fields',
    subtitle: collectionName,
    subtitleUnderline: true,
    onBack: () => navigation.goBack(),
  };

  const openAddField = useCallback(
    () => navigation.navigate('CreateProperty', { collectionId, collectionName, workspaceId }),
    [navigation, collectionId, collectionName, workspaceId],
  );

  const footer = (
    <SingleBottomButton
      action={{
        label: 'Add field',
        icon: 'add-outline',
        onPress: openAddField,
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

  if (isLoading) {
    return (
      <AppScreenShell {...shellProps}>
        <NotebookIndexFrame>
          <SkeletonList count={4} />
        </NotebookIndexFrame>
      </AppScreenShell>
    );
  }

  if (isError) {
    return (
      <AppScreenShell {...shellProps} footer={retryFooter}>
        <EmptyListContent
          title="Could not load fields"
          description="Try again in a moment."
        />
      </AppScreenShell>
    );
  }

  const fieldList = fields ?? [];

  if (!fieldList.length) {
    return (
      <AppScreenShell {...shellProps} footer={footer}>
        <EmptyListContent
          title="No fields yet"
          description="Add fields to define what each item in this collection contains."
        />
      </AppScreenShell>
    );
  }

  return (
    <AppScreenShell {...shellProps} footer={footer}>
      <View style={styles.content}>
        <NotebookIndexFrame>
          <ScrollIndicatorFlatList
            data={fieldList}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item, index }) => (
              <NotebookRow
                title={item.label}
                description={FIELD_TYPE_LABELS[item.type] ?? item.type}
                meta={item.required ? 'Required' : undefined}
                onEdit={() =>
                  navigation.navigate('EditProperty', {
                    fieldId: item.id,
                    fieldLabel: item.label,
                    fieldType: item.type === 'number' ? 'number' : 'text',
                    fieldRequired: item.required,
                    collectionId,
                    collectionName,
                    workspaceId,
                  })
                }
                onDelete={() =>
                  confirmDelete(
                    'Remove field?',
                    `"${item.label}" will no longer appear on new items.`,
                    () => deleteField.mutate(item.id),
                  )
                }
                showDivider={index < fieldList.length - 1}
                size="collection"
              />
            )}
          />
        </NotebookIndexFrame>
      </View>
    </AppScreenShell>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
});
