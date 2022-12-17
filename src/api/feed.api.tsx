import SsuAPI from './base';
import {
  FollowMusicianPropsType,
  FollowMusicianResponseType,
} from '../interface/musician.interface';
import {
  LikePostPropsType,
  LikePostResponseType,
  ListPostResponseType,
  UnlikePostPropsType,
  UnlikePostResponseType,
} from '../interface/feed.interface';

export const listPost = async (): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/posts',
    method: 'GET',
  });

  return data;
};

export const likePost = async (
  props?: LikePostPropsType,
): Promise<LikePostResponseType> => {
  const {data} = await SsuAPI().request<LikePostResponseType>({
    url: `/posts/${props}/like`,
    method: 'POST',
  });

  return data;
};

export const unlikePost = async (
  props?: UnlikePostPropsType,
): Promise<UnlikePostResponseType> => {
  const {data} = await SsuAPI().request<UnlikePostResponseType>({
    url: `/posts/${props}/unlike`,
    method: 'POST',
  });

  return data;
};
