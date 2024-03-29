import SsuAPI from './baseRinjani';
import SsuSemeruPublic from './baseSemeru';
import {
  CommentDetailResponseType,
  CommentResponseType,
  CommentUpdateResponseType,
  DetailPostResponseType,
  LikePostResponseType,
  ListCommentResponseType,
  ListPostResponseType,
  LoadMoreProps,
  MostPlayedSongResponseType,
  PostPropsTypeA,
  PostPropsTypeB,
  SetViewsCountResponseType,
  UnlikePostResponseType,
} from '../interface/feed.interface';
import {ParamsProps} from '../interface/base.interface';

// => List Post Area
export const listPost = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/fans-app/posts',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listPostProfile = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/fans-app/posts/feeds',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listPostProfileGuestMode = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/public/posts',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listTopPost = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/fans-app/posts/top-post',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listTopPostPublic = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/public/top-post',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listPostExclusive = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/fans-app/posts/premium',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listPostSimilar = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/posts/similar-post',
    method: 'GET',
    params: props,
  });

  return data;
};

// => Detail Post Area
export const detailPost = async (
  props?: PostPropsTypeA,
): Promise<DetailPostResponseType> => {
  const {data} = await SsuAPI().request<DetailPostResponseType>({
    url: `/fans-app/posts/${props?.id}`,
    method: 'GET',
  });

  return data;
};

// => like / Unlike Area
export const likePost = async (
  props?: PostPropsTypeA,
): Promise<LikePostResponseType> => {
  const {data} = await SsuAPI().request<LikePostResponseType>({
    url: `/fans-app/posts/${props?.id}/like`,
    method: 'POST',
  });

  return data;
};

export const unlikePost = async (
  props?: PostPropsTypeA,
): Promise<UnlikePostResponseType> => {
  const {data} = await SsuAPI().request<UnlikePostResponseType>({
    url: `/fans-app/posts/${props?.id}/unlike`,
    method: 'POST',
  });

  return data;
};

// => Comment Area
export const likeComment = async (
  props?: PostPropsTypeA,
): Promise<LikePostResponseType> => {
  const {data} = await SsuAPI().request<LikePostResponseType>({
    url: `/fans-app/comments/${props?.id}/like`,
    method: 'POST',
  });

  return data;
};

export const unlikeComment = async (
  props?: PostPropsTypeA,
): Promise<UnlikePostResponseType> => {
  const {data} = await SsuAPI().request<UnlikePostResponseType>({
    url: `/fans-app/comments/${props?.id}/unlike`,
    method: 'POST',
  });

  return data;
};

export const loadMore = async (
  props?: LoadMoreProps,
): Promise<ListCommentResponseType> => {
  const {data} = await SsuAPI().request<ListCommentResponseType>({
    url: `/fans-app/comments/${props?.id}/list`,
    method: 'GET',
    params: props?.params,
  });

  return data;
};

export const commentDetail = async (
  props?: PostPropsTypeA,
): Promise<CommentDetailResponseType> => {
  const {data} = await SsuAPI().request<CommentDetailResponseType>({
    url: `/fans-app/comments/${props?.id}`,
    method: 'GET',
  });

  return data;
};

export const commmentToPost = async (
  props?: PostPropsTypeB,
): Promise<CommentResponseType> => {
  const {data} = await SsuAPI().request<CommentResponseType>({
    url: `/fans-app/posts/${props?.id}/comments/create`,
    method: 'POST',
    data: props?.content,
  });

  return data;
};

export const commmentToComment = async (
  props?: PostPropsTypeB,
): Promise<CommentResponseType> => {
  const {data} = await SsuAPI().request<CommentResponseType>({
    url: `/fans-app/comments/${props?.id}/create`,
    method: 'POST',
    data: props?.content,
  });

  return data;
};

export const commmentUpdate = async (
  props?: PostPropsTypeB,
): Promise<CommentUpdateResponseType> => {
  const {data} = await SsuAPI().request<CommentUpdateResponseType>({
    url: `/fans-app/comments/${props?.id}/update`,
    method: 'PATCH',
    data: props?.content,
  });

  return data;
};

export const commmentDelete = async (
  props?: PostPropsTypeA,
): Promise<CommentResponseType> => {
  const {data} = await SsuAPI().request<CommentResponseType>({
    url: `/fans-app/comments/${props?.id}/delete`,
    method: 'DELETE',
  });

  return data;
};

export const mostPlayedSong = async (
  props?: PostPropsTypeA,
): Promise<MostPlayedSongResponseType> => {
  const {data} = await SsuSemeruPublic().request<MostPlayedSongResponseType>({
    url: `/songs/most-play-song/${props?.id}`,
    method: 'GET',
  });

  return data;
};

export const viewsCount = async (
  props?: PostPropsTypeA,
): Promise<SetViewsCountResponseType> => {
  const {data} = await SsuAPI().request<SetViewsCountResponseType>({
    url: `/posts/${props?.id}/watch-video`,
    method: 'POST',
  });

  return data;
};
