import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getString(key: string): Promise<string | null> {
  return AsyncStorage.getItem(key);
}

export async function setString(key: string, value: string): Promise<void> {
  await AsyncStorage.setItem(key, value);
}

export async function remove(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}
