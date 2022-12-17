import {PaginationType} from './base.interface';

export type MusicianList = {
  uuid: string;
  username: string;
  fullname: string;
  email: string;
  isFollowed: boolean;
  imageProfileUrl: string | null;
  followers: number;
};

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
