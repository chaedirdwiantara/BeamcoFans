import SsuAPI from './base';
import {
  CommentDetailPropsType,
  CommentDetailResponseType,
  CommentPropsType,
  CommentResponseType,
  LikePostPropsType,
  LikePostResponseType,
  ListCommentResponseType,
  ListPostResponseType,
  UnlikePostPropsType,
  UnlikePostResponseType,
} from '../interface/feed.interface';

// => List Post Area
export const listPost = async (): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/posts',
    method: 'GET',
  });

  return data;
};

// => like / Unlike Area
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

// => Comment Area
export const commentList = async (): Promise<ListCommentResponseType> => {
  const {data} = await SsuAPI().request<ListCommentResponseType>({
    url: '/comments',
    method: 'GET',
  });

  return data;
};

export const commentDetail = async (
  props?: CommentDetailPropsType,
): Promise<CommentDetailResponseType> => {
  const {data} = await SsuAPI().request<CommentDetailResponseType>({
    url: `/comments/${props?.id}`,
    method: 'GET',
  });

  return data;
};

export const commmentToPost = async (
  props?: CommentPropsType,
): Promise<CommentResponseType> => {
  const {data} = await SsuAPI().request<CommentResponseType>({
    url: `/posts/${props?.id}/comments/create`,
    method: 'POST',
  });

  return data;
};

export const commmentToComment = async (
  props?: CommentPropsType,
): Promise<CommentResponseType> => {
  const {data} = await SsuAPI().request<CommentResponseType>({
    url: `/comments/${props?.id}/comments/create`,
    method: 'POST',
  });

  return data;
};
