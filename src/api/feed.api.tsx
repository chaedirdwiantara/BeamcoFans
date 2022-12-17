import SsuAPI from './base';
import {
  FollowMusicianPropsType,
  FollowMusicianResponseType,
} from '../interface/musician.interface';
import {ListPostResponseType} from '../interface/feed.interface';

export const listPost = async (): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/posts',
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
