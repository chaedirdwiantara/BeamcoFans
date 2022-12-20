import SsuAPI from './base';
import {AddRemoveFcmResponseType} from '../interface/fcm.interface';

export const addTokenFcm = async (
  fcmToken: string,
): Promise<AddRemoveFcmResponseType> => {
  const {data} = await SsuAPI().request<AddRemoveFcmResponseType>({
    url: '/posts',
    method: 'GET',
    data: {
      fcmToken: fcmToken,
    },
  });

  return data;
};

export const removeTokenFcm = async (
  fcmToken: string,
): Promise<AddRemoveFcmResponseType> => {
  const {data} = await SsuAPI().request<AddRemoveFcmResponseType>({
    url: '/posts',
    method: 'DELETE',
    data: {
      fcmToken: fcmToken,
    },
  });

  return data;
};
