import SsuAPI from './base';
import {
  FollowMusicianPropsType,
  FollowMusicianResponseType,
  ListMusicianResponseType,
} from '../interface/musician.interface';

export const listMusician = async (): Promise<ListMusicianResponseType> => {
  const {data} = await SsuAPI().request<ListMusicianResponseType>({
    url: '/musicians',
    method: 'GET',
  });

  return data;
};

export const followMusician = async (
  props?: FollowMusicianPropsType,
): Promise<FollowMusicianResponseType> => {
  const {data} = await SsuAPI().request<FollowMusicianResponseType>({
    url: '/musicians/follow',
    method: 'POST',
    data: props,
  });

  return data;
};

export const unfollowMusician = async (
  props?: FollowMusicianPropsType,
): Promise<FollowMusicianResponseType> => {
  const {data} = await SsuAPI().request<FollowMusicianResponseType>({
    url: '/musicians/unfollow',
    method: 'POST',
    data: props,
  });

  return data;
};
