// import { default as color } from '../../../utils/design-token/color.json';

import { color } from "../../../theme";

export type ToastPosition = 'top' | 'center' | 'bottom';

export type ToastType = 'snackbar' | 'notification';

export type ToastNotificationStyle = 'success' | 'info' | 'warning' | 'error';

export interface IToastShowOptions {
  position?: ToastPosition;
  action?: () => void;
  actionLabel?: string;
  actionType?: 'short' | 'long';
  positionValue?: number;
  fadeInDuration?: number;
  fadeOutDuration?: number;
  opacity?: number;
  useNativeAnimation?: boolean;
  type?: ToastType;
  notificationStyle?: ToastNotificationStyle;
  description?: string;
}

export interface ToastProps {
  testID?: string;
}

export type ToastRef = {
  show: (
    message: string,
    duration: number,
    options?: IToastShowOptions
  ) => void;
  hide: () => void;
};

export type ToastRefObj = {
  current: ToastRef | null;
};

export interface NotificationStyleProps {
  bgColor: string;
  iconColor: string;
  tileColor: string;
}

type NotificationColor = Record<ToastNotificationStyle, string>;

export const notificationBgColor: NotificationColor = {
  success: color.Success[100],
  info: color.Neutral[100],
  warning: color.Warning[100],
  error: color.Error[100]
};

export const notificationIconColor: NotificationColor = {
  success: color.Success[100],
  info: color.Neutral[100],
  warning: color.Warning[100],
  error: color.Error[100]
};

export const notificationTileColor: NotificationColor = {
  success: color.Success[50],
  info: color.Neutral[50],
  warning: color.Warning[50],
  error: color.Error[50]
};

type NotificationIcon = 'check_circle' | 'info' | 'warning' | 'error';

export const notificationIcon: Record<
  ToastNotificationStyle,
  NotificationIcon
> = {
  success: 'check_circle',
  info: 'info',
  warning: 'warning',
  error: 'error'
};
