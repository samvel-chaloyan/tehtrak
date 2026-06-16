import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { CollectionDetailsScreen } from '@/features/collections/screens/CollectionDetailsScreen';
import { CollectionListScreen } from '@/features/collections/screens/CollectionListScreen';
import { CreateItemScreen } from '@/features/items/screens/CreateItemScreen';
import { ItemDetailsScreen } from '@/features/items/screens/ItemDetailsScreen';
import { CreatePropertyScreen } from '@/features/properties/screens/CreatePropertyScreen';
import { SettingsScreen } from '@/features/settings/screens/SettingsScreen';
import { WorkspaceListScreen } from '@/features/workspaces/screens/WorkspaceListScreen';
import { useTheme } from '@/theme';
import { AppStackParamList } from './types';
import { NavHeaderBackground } from './NavHeaderBackground';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  const { colors, typography } = useTheme();

  const largeTitle = Platform.OS === 'ios';

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
      }}
    >
      <Stack.Screen
        name="WorkspaceList"
        component={WorkspaceListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CollectionList"
        component={CollectionListScreen}
        options={({ route }) => ({
          title: route.params.workspaceName,
          headerLargeTitle: largeTitle,
        })}
      />
      <Stack.Screen
        name="CollectionDetails"
        component={CollectionDetailsScreen}
        options={({ route }) => ({
          title: route.params.collectionName,
          headerLargeTitle: largeTitle,
        })}
      />
      <Stack.Screen
        name="ItemDetails"
        component={ItemDetailsScreen}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="CreateItem"
        component={CreateItemScreen}
        options={{ title: 'New item' }}
      />
      <Stack.Screen
        name="CreateProperty"
        component={CreatePropertyScreen}
        options={{ title: 'Add property' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
}
