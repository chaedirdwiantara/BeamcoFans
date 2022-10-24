import React from 'react';
import {
  View,
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Pressable,
  LayoutChangeEvent,
  Text,
} from 'react-native';
// import { color, spacing as layout, border } from '@sinbad/design-token/mobile';

// import { SnbStyles } from '../../../styles';
// import { SnbButton } from '../../Button/Button';
// import { SnbText2 } from '../Typography/Typography';
// import SnbIcon from '../../Icon/Icon';
import type {
  ToastPosition,
  IToastShowOptions,
  ToastProps,
  ToastRef,
  ToastRefObj,
  ToastType,
  ToastNotificationStyle,
  NotificationStyleProps,
} from './types';
import {
  notificationBgColor,
  notificationIconColor,
  notificationTileColor,
  notificationIcon,
} from './types';
import {useState} from 'react';
import {HomeIcon, SearchIcon} from '../../../assets/icon';
import {color} from '../../../theme';
// import { testProps } from '../../../utils';

const {height} = Dimensions.get('screen');

function setHeight(
  position: ToastPosition = 'bottom',
  positionValue: number = 0,
  toastHeight: number = 0,
) {
  let pos = 0;

  switch (position) {
    case 'top':
      pos = positionValue;
      break;
    case 'center':
      pos = height / 2;
      break;
    case 'bottom':
      pos =
        height - positionValue - toastHeight - (StatusBar.currentHeight || 0);
      break;
  }

  return pos;
}

const SnbToast = React.forwardRef<ToastRef, ToastProps>(({testID}, ref) => {
  const [isShowing, setIsShowing] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>('');
  const [opacityValue] = React.useState(new Animated.Value(0));
  const [isMounted, setIsMounted] = React.useState<boolean>(true);
  const [toastHeight, setToastHeight] = React.useState<number>(0);
  const [toastOptions, setToastOptions] = React.useState<IToastShowOptions>({});
  const [toastType, setToastType] = React.useState<ToastType>('snackbar');
  const [notifStyle, setNotifStyle] =
    React.useState<ToastNotificationStyle>('info');
  const [notifContentHeight, setNotifContentHeight] = useState(56);

  const notifStyleProps: NotificationStyleProps = {
    bgColor: notificationBgColor[notifStyle],
    iconColor: notificationIconColor[notifStyle],
    tileColor: notificationTileColor[notifStyle],
  };
  const notifIcon = notificationIcon[notifStyle];

  React.useEffect(() => {
    return () => setIsMounted(false);
  }, []);

  let timer: any = null;

  const hide = React.useCallback(
    (duration: number = 0) => {
      timer && clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timer = setTimeout(() => {
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: toastOptions?.fadeOutDuration || 250,
          useNativeDriver: toastOptions?.useNativeAnimation || true,
        }).start(() => {
          isMounted && setIsShowing(false);
        });
      }, duration);
    },
    [isMounted, opacityValue],
  );

  const show = React.useCallback(
    (message: string, duration: number, options?: IToastShowOptions) => {
      setIsShowing(true);
      message && setText(message);

      if (options) {
        setToastOptions(options);

        if (options.type) {
          setToastType(options.type);
        } else {
          setToastType('snackbar');
        }

        options.notificationStyle && setNotifStyle(options.notificationStyle);
      } else {
        setToastType('snackbar');
      }

      Animated.timing(opacityValue, {
        toValue: 1,
        duration: options?.fadeInDuration || 250,
        useNativeDriver: options?.useNativeAnimation || true,
      }).start();
      hide(duration);
    },
    [hide, opacityValue],
  );

  React.useImperativeHandle(
    ref,
    React.useCallback(() => ({show, hide}), [show, hide]),
  );

  const snackbar = (
    <View
      onLayout={event => setToastHeight(event.nativeEvent.layout.height)}
      style={[
        styles.container,
        {
          top: setHeight(
            toastOptions?.position,
            toastOptions?.positionValue,
            toastHeight,
          ),
        },
      ]}
      pointerEvents="auto">
      <Animated.View style={[styles.snackbarContent, {opacity: opacityValue}]}>
        <View
          style={{
            flexDirection:
              toastOptions.actionType === 'short' ? 'row' : 'column',
            alignItems:
              toastOptions.actionType === 'short' ? 'center' : 'baseline',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1, paddingVertical: 8}}>
            <Text style={{color: 'blue'}}>{text}</Text>
          </View>
          {toastOptions?.action && (
            // <SnbButton.Dynamic
            //   size="small"
            //   title={toastOptions?.actionLabel || 'Dismiss'} // body/default
            //   contentColor={color.textColor.link}
            //   disabled={false}
            //   type="tertiary"
            //   onPress={() => {
            //     if (toastOptions?.action) {
            //       toastOptions.action();
            //       hide();
            //     }
            //   }}
            //   position={
            //     toastOptions.actionType === 'short' ? 'center' : 'right'
            //   }
            // />
            <Text>Araraaa</Text>
          )}
        </View>
      </Animated.View>
    </View>
  );

  const notification = (
    <View
      onLayout={event => setToastHeight(event.nativeEvent.layout.height)}
      style={[
        styles.container,
        {
          top: setHeight(
            toastOptions?.position,
            toastOptions?.positionValue,
            toastHeight,
          ),
        },
      ]}
      pointerEvents="auto">
      <Animated.View
        onLayout={(event: LayoutChangeEvent) => {
          setNotifContentHeight(event.nativeEvent.layout.height);
        }}
        style={[
          styles.notificationContent,
          {
            opacity: opacityValue,
            backgroundColor: notifStyleProps.bgColor,
          },
        ]}>
        <View
          style={[
            styles.notificationTile,
            {
              backgroundColor: notifStyleProps.tileColor,
              height: notifContentHeight,
            },
          ]}
        />
        <View
          style={{
            flexDirection: text.length <= 32 ? 'row' : 'column',
            alignItems: text.length <= 32 ? 'center' : 'baseline',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{
                alignSelf: 'flex-start',
                marginRight: 16,
              }}>
              <HomeIcon stroke={'blue'} />
            </View>
            <View style={{flex: 1, paddingTop: 3}}>
              <Text>{text}</Text>
              {toastOptions.description && <Text>{text}</Text>}
            </View>
          </View>
          {toastOptions?.action && (
            <Pressable
              style={{
                alignSelf: toastOptions.description
                  ? 'center'
                  : text.length <= 32
                  ? 'flex-start'
                  : 'flex-end',
              }}
              onPress={() => {
                if (toastOptions?.action) {
                  toastOptions.action();
                  hide();
                }
              }}>
              <SearchIcon stroke="blue" />
            </Pressable>
          )}
        </View>
      </Animated.View>
    </View>
  );

  const toast = toastType === 'snackbar' ? snackbar : notification;

  return isShowing ? toast : <View />;
});

let refs: ToastRefObj[] = [];

function addNewRef(newRef: any) {
  refs.push({
    current: newRef,
  });
}

function removeOldRef(oldRef: any) {
  refs = refs.filter(r => r.current !== oldRef);
}

const ayolahBro = (props: ToastProps) => {
  console.log('toast', props);

  const toastRef = React.useRef(null);
  const setRef = React.useCallback(ref => {
    if (ref) {
      toastRef.current = ref;
      addNewRef(ref);
    } else {
      removeOldRef(toastRef.current);
    }
  }, []);

  return <SnbToast ref={setRef} {...props} />;
};

function getRef() {
  const reversePriority = [...refs].reverse();
  console.log(refs, 'refs');

  const activeRef = reversePriority.find(ref => ref?.current !== null);

  if (!activeRef) {
    return console.log('not activated'); //null
  }
  console.log('works');

  return activeRef.current;
}

ayolahBro.show = (
  message: string,
  duration: number,
  options?: IToastShowOptions,
) => {
  console.log(message, duration, options, 'message');

  getRef()?.show(message, duration, options);
};

ayolahBro.hide = () => {
  getRef()?.hide();
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10000,
    padding: 12,
    opacity: 0.9,
  },
  snackbarContent: {
    backgroundColor: color.Dark[100],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
    shadowColor: '#3f3f3f',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.16,
    shadowRadius: 0,
    elevation: 8,
  },
  notificationContent: {
    padding: 16,
    position: 'relative',
    width: '100%',
    shadowColor: '#3f3f3f',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.16,
    shadowRadius: 0,
    elevation: 8,
  },
  notificationTile: {
    position: 'absolute',
    left: -6,
    width: 6,
    top: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
});

export default ayolahBro;
