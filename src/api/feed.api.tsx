import SsuAPI from './base';
import {
  CommentToPostPropsType,
  CommentToPostResponseType,
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
    url: `/posts/${props?.id}/like`,
    method: 'POST',
  });

  return data;
};

export const unlikePost = async (
  props?: UnlikePostPropsType,
): Promise<UnlikePostResponseType> => {
  const {data} = await SsuAPI().request<UnlikePostResponseType>({
    url: `/posts/${props?.id}/unlike`,
    method: 'POST',
  });

  return data;
};

export const commmentToPost = async (
  props?: CommentToPostPropsType,
): Promise<CommentToPostResponseType> => {
  const {data} = await SsuAPI().request<CommentToPostResponseType>({
    url: `/posts/${props?.id}/comments/create`,
    method: 'POST',
  });

  return data;
};
