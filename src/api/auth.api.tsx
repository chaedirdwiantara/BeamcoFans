import {Platform} from 'react-native';
import {
  ConfirmEmailOTPRegisterResponseType,
  ConfirmSmsOTPLoginResponseType,
  DeleteAccountResponseType,
  DeleteAccountPropsType,
  LoginPhonePropsType,
  LoginResponseType,
  LoginPropsType,
  RegisterPropsType,
  RegisterResponseType,
  ResendOTPResponseType,
  RestoreAccountResponseType,
  UsernameAvailabilityResponseType,
  RefreshTokenResponseType,
} from '../interface/auth.interface';
import {RegistrationType} from '../interface/profile.interface';
import SsuAPI from './baseRinjani';

export const registerUser = async (
  registerProps: RegisterPropsType,
): Promise<RegisterResponseType> => {
  const {data} = await SsuAPI().request<RegisterResponseType>({
    url: '/fans-app/register',
    method: 'POST',
    data: registerProps,
    headers: {
      'X-OS-Platform': Platform.OS,
    },
  });

  return data;
};

export const loginUser = async (
  loginProps: LoginPropsType | LoginPhonePropsType,
): Promise<LoginResponseType> => {
  const {data} = await SsuAPI().request<LoginResponseType>({
    url: '/fans-app/login',
    method: 'POST',
    data: loginProps,
    headers: {
      'X-OS-Platform': Platform.OS,
    },
  });

  return data;
};

export const loginSso = async (
  user: string,
  registrationType: RegistrationType,
): Promise<LoginResponseType> => {
  const {data} = await SsuAPI().request<LoginResponseType>({
    url: '/fans-app/login-sso',
    method: 'POST',
    data: {
      user: user,
      registrationType: registrationType,
    },
    headers: {
      'X-OS-Platform': Platform.OS,
    },
  });
  return data;
};

export const loginPhoneNumber = async (
  loginProps: LoginPropsType | LoginPhonePropsType,
): Promise<LoginResponseType> => {
  const {data} = await SsuAPI().request<LoginResponseType>({
    url: '/fans-app/login-phone-number',
    method: 'POST',
    data: loginProps,
    headers: {
      'X-OS-Platform': Platform.OS,
    },
  });

  return data;
};

export const checkUsername = async (
  username: string,
): Promise<UsernameAvailabilityResponseType> => {
  const {data} = await SsuAPI().request<UsernameAvailabilityResponseType>({
    url: '/fans-app/username-availability',
    method: 'POST',
    data: {
      username: username,
    },
  });

  return data;
};

export const confirmEmailOtpRegister = async (
  email: string,
  code: string,
  context: string,
): Promise<ConfirmEmailOTPRegisterResponseType> => {
  const {data} = await SsuAPI().request<ConfirmEmailOTPRegisterResponseType>({
    url: '/fans-app/confirm-otp/email',
    method: 'POST',
    data: {
      email: email,
      code: code,
      context: context,
    },
  });

  return data;
};

export const confirmSmsOtpLogin = async (
  phoneNumber: string,
  code: string,
  context: string,
): Promise<ConfirmSmsOTPLoginResponseType> => {
  const {data} = await SsuAPI().request<ConfirmSmsOTPLoginResponseType>({
    url: '/fans-app/confirm-otp/sms',
    method: 'POST',
    data: {
      phoneNumber: phoneNumber,
      code: code,
      context: context,
    },
  });

  return data;
};

export const resendOtpEmail = async (
  email: string,
  context?: string,
): Promise<ResendOTPResponseType> => {
  const {data} = await SsuAPI().request<ResendOTPResponseType>({
    url: '/fans-app/resend-otp/email',
    method: 'POST',
    data: {
      email: email,
      context: context,
    },
  });
  return data;
};

export const resendOtpSms = async (
  phoneNumber: string,
  context?: string,
): Promise<ResendOTPResponseType> => {
  const {data} = await SsuAPI().request<ResendOTPResponseType>({
    url: '/fans-app/resend-otp/sms',
    method: 'POST',
    data: {
      phoneNumber: phoneNumber,
      context: context,
    },
  });

  return data;
};

export const forgotPasswordEmail = async (
  email: string,
): Promise<ResendOTPResponseType> => {
  const {data} = await SsuAPI().request<ResendOTPResponseType>({
    url: '/fans-app/forgot-password',
    method: 'POST',
    data: {
      identifier: email,
    },
  });

  return data;
};

export const confirmEmailOtpForgotPassword = async (
  email: string,
  code: string,
): Promise<ConfirmEmailOTPRegisterResponseType> => {
  const {data} = await SsuAPI().request<ConfirmEmailOTPRegisterResponseType>({
    url: '/fans-app/confirm-otp/email',
    method: 'POST',
    data: {
      email: email,
      code: code,
      context: 'forgotPassword',
    },
  });

  return data;
};

export const changePassword = async (
  email: string,
  code: string,
  password: string,
): Promise<LoginResponseType> => {
  const {data} = await SsuAPI().request<LoginResponseType>({
    url: '/fans-app/confirm-change-password',
    method: 'POST',
    data: {
      identifier: email,
      code: code,
      password: password,
    },
  });

  return data;
};

export const changePasswordSetting = async (
  password: string,
  newPassword: string,
): Promise<LoginResponseType> => {
  const {data} = await SsuAPI().request<LoginResponseType>({
    url: '/fans-app/change-password',
    method: 'POST',
    data: {
      password: password,
      newPassword: newPassword,
    },
  });

  return data;
};

export const deleteAccount = async (
  params: DeleteAccountPropsType,
): Promise<DeleteAccountResponseType> => {
  const {data} = await SsuAPI().request<DeleteAccountResponseType>({
    url: '/fans-app/delete',
    method: 'DELETE',
    data: params,
  });

  return data;
};

export const restoreAccount = async (): Promise<RestoreAccountResponseType> => {
  const {data} = await SsuAPI().request<RestoreAccountResponseType>({
    url: '/fans-app/restore',
    method: 'POST',
  });

  return data;
};

export const refreshToken = async (): Promise<RefreshTokenResponseType> => {
  const {data} = await SsuAPI().request<RefreshTokenResponseType>({
    url: '/fans-app/refresh-token',
    method: 'POST',
  });

  return data;
};
