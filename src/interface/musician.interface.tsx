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

export type ListMusicianResponseType = {
  code: number;
  data: MusicianList[];
  message: string;
  meta: PaginationType;
  status: number;
};

export type FollowMusicianResponseType = {
  code: number;
  data: string;
  message: string;
  status: number;
};

export type FollowMusicianPropsType = {
  musicianID: string;
};
