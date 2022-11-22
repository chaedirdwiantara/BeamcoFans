import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({
  id: `ssufans-storage`,
  encryptionKey: 'ssuplayer',
});
