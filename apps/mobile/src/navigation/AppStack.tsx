import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CollectionDetailsScreen } from '@/features/collections/screens/CollectionDetailsScreen';
import { CollectionListScreen } from '@/features/collections/screens/CollectionListScreen';
import { CreateItemScreen } from '@/features/items/screens/CreateItemScreen';
import { ItemDetailsScreen } from '@/features/items/screens/ItemDetailsScreen';
import { CreatePropertyScreen } from '@/features/properties/screens/CreatePropertyScreen';
import { WorkspaceListScreen } from '@/features/workspaces/screens/WorkspaceListScreen';
import { useTheme } from '@/theme';
import { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontWeight: '600', fontSize: 17 },
        headerBackTitle: 'Back',
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
        options={({ route }) => ({ title: route.params.workspaceName })}
      />
      <Stack.Screen
        name="CollectionDetails"
        component={CollectionDetailsScreen}
        options={({ route }) => ({ title: route.params.collectionName })}
      />
      <Stack.Screen
        name="ItemDetails"
        component={ItemDetailsScreen}
        options={{ title: 'Entry' }}
      />
      <Stack.Screen
        name="CreateItem"
        component={CreateItemScreen}
        options={({ route }) => ({ title: `New in ${route.params.collectionName}` })}
      />
      <Stack.Screen
        name="CreateProperty"
        component={CreatePropertyScreen}
        options={{ title: 'Add property' }}
      />
    </Stack.Navigator>
  );
}
