import {ParamsProps} from '../interface/base.interface';
import {PostPropsTypeA} from '../interface/feed.interface';
import {
  CountLikedResponseType,
  ProfileResponseType,
  UpdateProfileResponseType,
} from '../interface/profile.interface';
import SsuAPI from './base';
import SsuAPIPublicRinjani from './basePublic';
import BaseSemeruPublic from './baseSemeruPublic';

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
    url: '/profile',
    method: 'GET',
  });

  return data;
};

export const getOtherUserProfile = async (
  props?: PostPropsTypeA,
): Promise<ProfileResponseType> => {
  const {data} = await SsuAPIPublicRinjani().request<ProfileResponseType>({
    url: `/fans/${props?.id}`,
    method: 'GET',
  });

  return data;
};

export const updateProfile = async (
  props?: UpdateProfilePropsType,
): Promise<UpdateProfileResponseType> => {
  const {data} = await SsuAPI().request<UpdateProfileResponseType>({
    url: '/update-profile',
    method: 'PATCH',
    data: props,
  });

  return data;
};

export const countLikedSong = async (
  props?: ParamsProps,
): Promise<CountLikedResponseType> => {
  const {data} = await BaseSemeruPublic().request<CountLikedResponseType>({
    url: `/fans/${props?.uuid}`,
    method: 'GET',
  });

  return data;
};
