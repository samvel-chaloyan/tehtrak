import { Platform } from 'react-native';

/** iOS Simulator / web */
const LOCALHOST = 'http://localhost:5163/v1';

/** Android emulator maps host machine to 10.0.2.2 */
const ANDROID_HOST = 'http://10.0.2.2:5163/v1';

export const apiConfig = {
  baseUrl:
    process.env.EXPO_PUBLIC_API_URL ??
    (Platform.OS === 'android' ? ANDROID_HOST : LOCALHOST),
};
