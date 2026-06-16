import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  WorkspaceList: undefined;
  CollectionList: { workspaceId: string; workspaceName: string };
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
