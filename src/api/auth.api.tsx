import {
  LoginPropsType,
  LoginResponseType,
  RegisterPropsType,
  RegisterResponseType,
} from '../interface/auth.interface';
import SsuAPI from './base';

export const registerUser = async (
  registerProps: RegisterPropsType,
): Promise<RegisterResponseType> => {
  const {data} = await SsuAPI().request<RegisterResponseType>({
    url: '/register',
    method: 'POST',
    data: registerProps,
  });

  return data;
};

export const loginUser = async (
  loginProps: LoginPropsType,
): Promise<LoginResponseType> => {
  const {data} = await SsuAPI().request<LoginResponseType>({
    url: '/login',
    method: 'POST',
    data: loginProps,
  });

  return data;
};
