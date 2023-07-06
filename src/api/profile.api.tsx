import {ParamsProps} from '../interface/base.interface';
import {PostPropsTypeA} from '../interface/feed.interface';
import {
  CountLikedResponseType,
  DeleteProfileResponseType,
  GetLastStepResponseType,
  GetProfileProgressResponseType,
  LastStepResponseType,
  ProfileCountResponseType,
  ProfileResponseType,
  SetLastStepResponseType,
  UpdateProfileResponseType,
} from '../interface/profile.interface';
import SsuAPI from './baseRinjani';
import SsuAPISemeru from './baseSemeru';

export type UpdateProfilePropsType = {
  fullname?: string;
  username?: string;
  favoriteGeneres?: number[];
  moods?: number[];
  expectations?: number[];
  imageProfileUrl?: string;
  banner?: string;
  about?: string;
  locationCountry?: string;
  gender?: string;
};

export const getProfile = async (): Promise<ProfileResponseType> => {
  const {data} = await SsuAPI().request<ProfileResponseType>({
    url: '/fans-app/profile',
    method: 'GET',
  });

  return data;
};

export const getOtherUserProfile = async (
  props?: PostPropsTypeA,
): Promise<ProfileResponseType> => {
  const {data} = await SsuAPI().request<ProfileResponseType>({
    url: `/public/fans/${props?.id}`,
    method: 'GET',
  });

  return data;
};

export const updateProfile = async (
  props?: UpdateProfilePropsType,
): Promise<UpdateProfileResponseType> => {
  const {data} = await SsuAPI().request<UpdateProfileResponseType>({
    url: '/fans-app/update-profile',
    method: 'PATCH',
    data: props,
  });

  return data;
};

export const countLikedSong = async (
  props?: ParamsProps,
): Promise<CountLikedResponseType> => {
  const {data} = await SsuAPISemeru().request<CountLikedResponseType>({
    url: `/fans/${props?.uuid}`,
    method: 'GET',
  });

  return data;
};

export const deleteProfile = async (
  props?: ParamsProps,
): Promise<DeleteProfileResponseType> => {
  const {data} = await SsuAPI().request<DeleteProfileResponseType>({
    url: '/fans-app/profile',
    method: 'DELETE',
    data: props,
  });

  return data;
};

export const getTotalCount = async (
  props?: ParamsProps,
): Promise<ProfileCountResponseType> => {
  const {data} = await SsuAPISemeru().request<ProfileCountResponseType>({
    url: '/musician-app/profile',
    method: 'GET',
    params: props,
  });

  return data;
};

export const getProfileCompletion =
  async (): Promise<GetProfileProgressResponseType> => {
    const {data} = await SsuAPI().request<GetProfileProgressResponseType>({
      url: '/fans-app/profile-completion',
      method: 'GET',
    });

    return data;
  };

export const getLastStep = async (): Promise<GetLastStepResponseType> => {
  const {data} = await SsuAPI().request<GetLastStepResponseType>({
    url: '/fans-app/last-step-registration',
    method: 'GET',
  });

  return data;
};

export const setLastStep = async (
  props: LastStepResponseType,
): Promise<SetLastStepResponseType> => {
  const {data} = await SsuAPI().request<SetLastStepResponseType>({
    url: '/fans-app/last-step-registration',
    method: 'PATCH',
    data: props,
  });

  return data;
};
