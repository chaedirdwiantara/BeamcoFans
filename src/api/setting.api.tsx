import SsuAPI from './base';
import {
  EmailPhoneProps,
  EmailPhoneVerifProps,
  EmailPhoneResponseType,
} from '../interface/setting.interface';

export const updateEmail = async (
  props?: EmailPhoneProps,
): Promise<EmailPhoneResponseType> => {
  const {data} = await SsuAPI().request<EmailPhoneResponseType>({
    url: '/account/change-email',
    method: 'POST',
    data: props,
  });

  return data;
};

export const updatePhoneNumber = async (
  props?: EmailPhoneProps,
): Promise<EmailPhoneResponseType> => {
  const {data} = await SsuAPI().request<EmailPhoneResponseType>({
    url: '/account/change-phone',
    method: 'POST',
    data: props,
  });

  return data;
};

export const getVerifCode = async (
  props?: EmailPhoneVerifProps,
): Promise<EmailPhoneResponseType> => {
  const {data} = await SsuAPI().request<EmailPhoneResponseType>({
    url: '/account/getcode',
    method: 'POST',
    data: props,
  });

  return data;
};

export const setVerifCode = async (
  props?: EmailPhoneProps,
): Promise<EmailPhoneResponseType> => {
  const {data} = await SsuAPI().request<EmailPhoneResponseType>({
    url: '/account/verif',
    method: 'POST',
    data: props,
  });

  return data;
};
