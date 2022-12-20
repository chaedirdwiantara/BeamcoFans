import {PaginationType} from './base.interface';

export type PostPropsTypeA = {
  id: string;
};

export type PostPropsTypeB = {
  id: string;
  content: string;
};

export type DataComment = {id: string; created_at: string};

// => PostList Area
export type MusicianData = {
  uuid: string;
  username: string;
  fullname: string;
  email: string;
  isFollowed: boolean;
  imageProfileUrl: string;
  followers: number;
};

export type PostList = {
  id: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  category: string;
  image: string[];
  createdAt: string;
  updatedAt: string;
  isPremium: boolean;
  musician: MusicianData;
  isLiked: boolean;
};

export type ListPostResponseType = {
  code: number;
  data: PostList[];
  message: string;
  meta: PaginationType;
  status: number;
};

export type DetailPostData = {
  id: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  comments: CommentList[];
};

export type DetailPostResponseType = {
  code: number;
  data: DetailPostData;
  message: string;
  status: number;
};

// => Like / Unlike Area
export type LikePostResponseType = {
  code: number;
  data: string;
  message: string;
  status: number;
};

export type UnlikePostResponseType = {
  code: number;
  data: string;
  message: string;
  status: number;
};

// => Comment Area
export type CommentList = {
  id: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  commentLevel: number;
  createdAt: string;
  comments: null | [];
};

export type ListCommentResponseType = {
  code: number;
  data: CommentList[];
  message: string;
  meta: PaginationType;
  status: number;
};

export type CommentDetailData = {
  id: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  commentLevel: number;
  createdAt: string;
  comments: null | [];
};

export type CommentDetailResponseType = {
  code: number;
  data: CommentDetailData;
  message: string;
  status: number;
};

export type CommentResponseType = {
  code: number;
  data: DataComment;
  message: string;
  status: number;
};

export type commentUpdateData = {
  id: string;
  caption: string;
  likes: number;
  comment_level: number;
  created_at: string;
};

export type CommentUpdateResponseType = {
  code: number;
  data: commentUpdateData;
  message: string;
  status: number;
};
