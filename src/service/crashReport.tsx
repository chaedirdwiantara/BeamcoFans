import crashlytics from '@react-native-firebase/crashlytics';
import * as Sentry from '@sentry/react-native';
import {storage, profileStorage} from '../hooks/use-storage.hook';

type CrashLogProps = {
  message: string;
};

export const CrashLog = async (props: CrashLogProps) => {
  crashlytics().log(props.message);
  const isLogin = storage.getString('profile');
  if (isLogin && profileStorage() !== null) {
    await Promise.all([
      crashlytics().setUserId(profileStorage()?.uuid.toString() || '0'),
      crashlytics().setAttributes({
        email: profileStorage()?.email || '',
        username: profileStorage()?.username || '',
      }),
    ]);
  }
};

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
  crashlytics().recordError(props.error);
  Sentry.captureException(props.error);
};
