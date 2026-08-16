import { useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { DynamicItemForm, DynamicItemFormHandle } from '@/features/items/components/DynamicItemForm';
import { useCreateRecord } from '@/features/items/hooks/useRecords';
import { useFields } from '@/features/properties/hooks/useFields';
import { AppScreenProps } from '@/navigation/types';
import { useSurfaceStyles, useTheme } from '@/theme';
import {
  AppScreenShell,
  EmptyListContent,
  SingleBottomButton,
  SkeletonList,
  Text,
} from '@/shared/ui';
import { ItemData } from '@/types';
import { getScreenErrorMessage } from '@/utils';

export function CreateItemScreen({ navigation, route }: AppScreenProps<'CreateItem'>) {
  const { collectionId, collectionName, workspaceId } = route.params;
  const { spacing } = useTheme();
  const surfaces = useSurfaceStyles();
  const formRef = useRef<DynamicItemFormHandle>(null);
  const { data: fields, isLoading, isError, refetch } = useFields(workspaceId, collectionId);
  const createRecord = useCreateRecord(workspaceId, collectionId);
  const [error, setError] = useState<string | null>(null);

  const fieldList = fields ?? [];

  const shellProps = {
    navigation,
    title: 'New item',
    subtitle: collectionName,
    subtitleUnderline: true,
    onBack: () => navigation.goBack(),
  };

  const handleSubmit = async (data: ItemData) => {
    setError(null);
    try {
      await createRecord.mutateAsync(data);
      navigation.goBack();
    } catch (e) {
      setError(getScreenErrorMessage(e, 'Could not save item. Try again.'));
    }
  };

  const footer = (
    <SingleBottomButton
      action={{
        label: createRecord.isPending ? 'Saving…' : 'Save item',
        onPress: () => formRef.current?.submit(),
        disabled: createRecord.isPending || fieldList.length === 0,
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
        <SkeletonList count={4} />
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

  if (fieldList.length === 0) {
    return (
      <AppScreenShell
        {...shellProps}
        footer={
          <SingleBottomButton
            action={{
              label: 'Add field',
              icon: 'add-outline',
              onPress: () =>
                navigation.navigate('CustomizeFields', {
                  collectionId,
                  collectionName,
                  workspaceId,
                }),
            }}
          />
        }
      >
        <EmptyListContent
          title="Add a field first"
          description="Items are recorded using the fields in this collection. Add at least one field to get started."
        />
      </AppScreenShell>
    );
  }

  return (
    <AppScreenShell {...shellProps} footer={footer}>
      <ScrollView
        style={[styles.scroll, surfaces.scroll]}
        contentContainerStyle={{ paddingBottom: spacing.lg }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets={false}
        showsVerticalScrollIndicator={false}
      >
        {error ? (
          <Text variant="bodySmall" color="danger" style={{ marginBottom: spacing.md }}>
            {error}
          </Text>
        ) : null}
        <DynamicItemForm
          ref={formRef}
          fields={fieldList}
          onSubmit={handleSubmit}
          hideSubmitButton
        />
      </ScrollView>
    </AppScreenShell>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
});
