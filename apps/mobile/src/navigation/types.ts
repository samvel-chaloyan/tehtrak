import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  WorkspaceList: { openSearch?: boolean } | undefined;
  CreateWorkspace: undefined;
  EditWorkspace: {
    workspaceId: string;
    workspaceName: string;
    workspaceDescription: string;
  };
  CollectionList: { workspaceId: string; workspaceName: string };
  CreateCollection: { workspaceId: string; workspaceName: string };
  EditCollection: {
    workspaceId: string;
    workspaceName: string;
    collectionId: string;
    collectionName: string;
    collectionDescription: string;
  };
  CollectionStructure: {
    workspaceId: string;
    workspaceName: string;
    collectionId: string;
    collectionName: string;
  };
  CollectionDetails: {
    collectionId: string;
    collectionName: string;
    workspaceId: string;
  };
  ItemDetails: {
    itemId: string;
    collectionId: string;
    collectionName: string;
    workspaceId: string;
    edit?: boolean;
  };
  CreateItem: {
    collectionId: string;
    collectionName: string;
    workspaceId: string;
  };
  CreateProperty: {
    collectionId: string;
    collectionName: string;
    workspaceId: string;
  };
  EditProperty: {
    fieldId: string;
    fieldLabel: string;
    fieldType: 'text' | 'number';
    fieldRequired: boolean;
    collectionId: string;
    collectionName: string;
    workspaceId: string;
  };
  CustomizeFields: {
    collectionId: string;
    collectionName: string;
    workspaceId: string;
  };
  QuickAccess: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

export type AuthScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;

export type AppScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>;
