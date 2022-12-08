import messaging from '@react-native-firebase/messaging';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
};

export const getTokenFCM = ({
  onGetToken,
}: {
  onGetToken: (token: string) => void;
}) => {
  messaging()
    .getToken()
    .then(tokenFCM => {
      onGetToken(tokenFCM);
    })
    .catch(err => {
      console.log('[FCMService] User does not have a device token');
    });
};

export const deleteTokenFCM = () => {
  return new Promise(async function (resolve, reject) {
    messaging()
      .deleteToken()
      .then(() => {
        resolve(true);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const createNotificationListener = ({
  onRegister,
  onNotification,
  onOpenNotification,
}: {
  onRegister: (token: string) => void;
  onNotification: (data: any) => void;
  onOpenNotification: (data: any) => void;
}) => {
  // When the application is running, but in the background
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      '[FCMService] onNotificationOpenedApp Notification caused app to open from background state:',
      remoteMessage,
    );
    if (remoteMessage) {
      const notification = remoteMessage.notification;
      onOpenNotification(notification);
    }
  });

  // When the application is opened from a quit state.
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      console.log(
        '[FCMService] getInitialNotification Notification caused app to open from quit state:',
        remoteMessage,
      );
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
      }
    });

  // Foreground state messages
  messaging().onMessage(async remoteMessage => {
    console.log('[FCMService] A new FCM message arrived!', remoteMessage);
    if (remoteMessage) {
      onNotification(remoteMessage);
    }
  });

  // Triggered when have new token
  messaging().onTokenRefresh(fcmToken => {
    console.log('[FCMService] New token refresh: ', fcmToken);
    onRegister(fcmToken);
  });
};
