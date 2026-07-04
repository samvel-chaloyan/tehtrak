import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CollectionDetailsScreen } from '@/features/collections/screens/CollectionDetailsScreen';
import { CollectionListScreen } from '@/features/collections/screens/CollectionListScreen';
import { CollectionStructureScreen } from '@/features/collections/screens/CollectionStructureScreen';
import { CreateCollectionScreen } from '@/features/collections/screens/CreateCollectionScreen';
import { EditCollectionScreen } from '@/features/collections/screens/EditCollectionScreen';
import { CreateItemScreen } from '@/features/items/screens/CreateItemScreen';
import { ItemDetailsScreen } from '@/features/items/screens/ItemDetailsScreen';
import { CreatePropertyScreen } from '@/features/properties/screens/CreatePropertyScreen';
import { EditPropertyScreen } from '@/features/properties/screens/EditPropertyScreen';
import { CustomizeFieldsScreen } from '@/features/properties/screens/CustomizeFieldsScreen';
import { SettingsScreen } from '@/features/settings/screens/SettingsScreen';
import { CreateWorkspaceScreen } from '@/features/workspaces/screens/CreateWorkspaceScreen';
import { EditWorkspaceScreen } from '@/features/workspaces/screens/EditWorkspaceScreen';
import { WorkspaceListScreen } from '@/features/workspaces/screens/WorkspaceListScreen';
import { useTheme } from '@/theme';
import { AppStackParamList } from './types';
import { NavHeaderBackground } from './NavHeaderBackground';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  const { colors, typography } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackground: () => <NavHeaderBackground />,
        headerShadowVisible: false,
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: typography.title.fontWeight as '600',
          fontSize: typography.title.fontSize,
          color: colors.textPrimary,
        },
        headerTitleAlign: 'center',
        headerBackTitle: 'Back',
        headerLargeTitle: false,
        headerLargeTitleStyle: {
          fontWeight: typography.titleLarge.fontWeight as '700',
          fontSize: typography.titleLarge.fontSize,
          color: colors.textPrimary,
        },
        contentStyle: { backgroundColor: colors.background },
        keyboardHandlingEnabled: false,
      }}
    >
      <Stack.Screen
        name="WorkspaceList"
        component={WorkspaceListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateWorkspace"
        component={CreateWorkspaceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditWorkspace"
        component={EditWorkspaceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CollectionList"
        component={CollectionListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateCollection"
        component={CreateCollectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditCollection"
        component={EditCollectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CollectionStructure"
        component={CollectionStructureScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CollectionDetails"
        component={CollectionDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ItemDetails"
        component={ItemDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateItem"
        component={CreateItemScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateProperty"
        component={CreatePropertyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProperty"
        component={EditPropertyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomizeFields"
        component={CustomizeFieldsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
}
