import { useCallback, useEffect, useRef, useState } from 'react';

import { DynamicItemForm, DynamicItemFormHandle } from '@/features/items/components/DynamicItemForm';
import { useRecord, useUpdateRecord } from '@/features/items/hooks/useRecords';
import { useFields } from '@/features/properties/hooks/useFields';
import { AppScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import {
  AppScreenShell,
  EmptyNotebook,
  NotebookPage,
  NotebookPageHeader,
  SingleBottomButton,
  SkeletonList,
  Text,
} from '@/shared/ui';
import { ItemData } from '@/types';
import { formatRelativeTime, getItemTitle, getScreenErrorMessage } from '@/utils';

export function ItemDetailsScreen({ navigation, route }: AppScreenProps<'ItemDetails'>) {
  const { itemId, collectionId, workspaceId, edit: startEditing } = route.params;
  const { spacing } = useTheme();
  const formRef = useRef<DynamicItemFormHandle>(null);
  const [isEditing, setIsEditing] = useState(Boolean(startEditing));
  const [error, setError] = useState<string | null>(null);

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

  const shellProps = {
    navigation,
    title: 'Item',
    subtitle: itemTitle,
    subtitleUnderline: true,
    onBack: () => navigation.goBack(),
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
        <SkeletonList count={3} />
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

  return (
    <AppScreenShell {...shellProps} scrollable footer={footer}>
      {error ? (
        <Text variant="bodySmall" color="danger" style={{ marginBottom: spacing.md }}>
          {error}
        </Text>
      ) : null}

      <NotebookPage>
        <NotebookPageHeader caption={`Updated ${formatRelativeTime(item.updatedAt)}`} />
        <DynamicItemForm
          ref={formRef}
          fields={fieldList}
          initialValues={item.data}
          onSubmit={handleSubmit}
          hideSubmitButton
          mode={isEditing ? 'edit' : 'view'}
          layout="page"
        />
      </NotebookPage>
    </AppScreenShell>
  );
}
