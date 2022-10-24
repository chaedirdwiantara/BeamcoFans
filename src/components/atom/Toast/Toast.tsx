import React from 'react';
import {
  View,
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {color} from '../../../theme';

// import colors from '../../utils/colors';
// import { SnbButton } from '../Button/Button';
// import { SnbText } from '../Typography/Typography';

const {height} = Dimensions.get('screen');
type ToastPosition = 'top' | 'center' | 'bottom';

interface IToastShowOptions {
  position?: ToastPosition;
  action?: () => void;
  actionLabel?: string;
  positionValue?: number;
  fadeInDuration?: number;
  fadeOutDuration?: number;
  opacity?: number;
  useNativeAnimation?: boolean;
}

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

const SsuToast: React.FC<any> = React.forwardRef((_, ref) => {
  const [isShow, setIsShow] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>('');
  const [opacityValue] = React.useState(new Animated.Value(0));
  const [isMounted, setIsMounted] = React.useState<boolean>(true);
  const [toastHeight, setToastHeight] = React.useState<number>(0);
  const [toastOptions, setToastOptions] = React.useState<IToastShowOptions>({});

  React.useEffect(() => {
    () => setIsMounted(false);
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
          isMounted && setIsShow(false);
        });
      }, duration);
    },
    [isMounted, opacityValue],
  );

  const show = React.useCallback(
    (message: string, duration: number, options: IToastShowOptions) => {
      setIsShow(true);
      message && setText(message);
      setToastOptions(options);
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

  const view = isShow ? (
    <View
      testID={_.testID}
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
      <Animated.View style={[styles.content, {opacity: opacityValue}]}>
        <View
          style={{
            flexDirection: text.length <= 32 ? 'row' : 'column',
            alignItems: text.length <= 32 ? 'center' : 'baseline',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1, paddingVertical: 8}}>
            <Text style={{color: 'white'}}>{text}</Text>
          </View>
          {toastOptions?.action && (
            // <SnbButton.Dynamic
            //   size="small"
            //   title={toastOptions?.actionLabel || 'Dismiss'}
            //   contentColor={colors.yellow50}
            //   disabled={false}
            //   type="tertiary"
            //   onPress={() => {
            //     if (toastOptions?.action) {
            //       toastOptions.action();
            //       hide();
            //     }
            //   }}
            //   position="right"
            // />
            <TouchableOpacity
              style={{height: 10, width: 30}}
              onPress={() => {}}>
              <Text>Dismiss</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </View>
  ) : (
    <View testID={_.testID} />
  );
  return view;
});

type ToastRef = {
  show: (
    message: string,
    duration: number,
    options?: IToastShowOptions,
  ) => void;
  hide: () => void;
};

type ToastRefObj = {
  current: ToastRef | null;
};

let refs: ToastRefObj[] = [];
function addNewRef(newRef: any) {
  refs.push({
    current: newRef,
  });
}
function removeOldRef(oldRef: any) {
  refs = refs.filter(r => r.current !== oldRef);
}

const Toast = (props: any) => {
  console.log(props, 'your toast');

  const toastRef = React.useRef(null);
  const setRef = React.useCallback((ref: any) => {
    if (ref) {
      toastRef.current = ref;
      addNewRef(ref);
    } else {
      removeOldRef(toastRef.current);
    }
  }, []);
  return <SsuToast ref={setRef} {...props} />;
};

function getRef() {
  const reversePriority = [...refs].reverse();
  const activeRef = reversePriority.find(ref => ref?.current !== null);
  if (!activeRef) {
    return null;
  }
  return activeRef.current;
}

Toast.show = (
  message: string,
  duration: number,
  options?: IToastShowOptions,
) => {
  getRef()?.show(message, duration, options);
};

Toast.hide = () => {
  getRef()?.hide();
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 50,
    width: '100%',
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: 'center',
    zIndex: 10000,
    padding: 12,
  },
  content: {
    backgroundColor: color.Dark[900],
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 100,
    width: '100%',
  },
  text: {
    color: 'white',
  },
});

export default Toast;
