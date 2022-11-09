import {
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
