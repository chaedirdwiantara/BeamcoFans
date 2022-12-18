import {PaginationType} from './base.interface';

// => PostList Area
export type MusicianData = {
  uuid: string;
  username: string;
  fullname: string;
  email: string;
  created_at: string;
};

export type PostList = {
  id: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  musician: MusicianData;
};

export type ListPostResponseType = {
  code: number;
  data: PostList[];
  message: string;
  meta: PaginationType;
  status: number;
};

// => Like / Unlike Area
export type LikePostResponseType = {
  code: number;
  data: string;
  message: string;
  status: number;
};

export type LikePostPropsType = {
  id: string;
};

export type UnlikePostResponseType = {
  code: number;
  data: string;
  message: string;
  status: number;
};

export type UnlikePostPropsType = {
  id: string;
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

export type CommentDetailPropsType = {
  id: string;
};

export type CommentDetailResponseType = {
  code: number;
  data: CommentDetailData;
  message: string;
  status: number;
};

export type DataComment = {id: string; created_at: string};

export type CommentPropsType = {
  id: string;
  content: string;
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

export type DeletePropsType = {
  id: string;
};
