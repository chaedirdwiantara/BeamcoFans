import * as Sentry from '@sentry/react-native';
import {storage, profileStorage} from '../hooks/use-storage.hook';

type CrashRecordProps = {
  error: Error;
};

export const CrashInit = () => {
  const isLogin = storage.getString('profile');
  if (isLogin && profileStorage() !== null) {
    Sentry.setUser({
      email: profileStorage()?.email || '',
      username: profileStorage()?.username || '',
      id: profileStorage()?.id || '',
    });
  }
};

export const CrashRecord = (props: CrashRecordProps) => {
  Sentry.captureException(props.error);
};
