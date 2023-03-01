import {imageTypes} from './base.interface';

export type SearchProps = {
  keyword: string;
  filterBy?: string;
};

export type FollowersProps = {
  keyword?: string;
  uuid: string;
};

export type ListDataSearchFans = {
  uuid: string;
  username: string;
  fullname: string;
  email: string;
  imageProfileUrls: imageTypes[];
  followersType: 'fans' | 'musician';
};

export type ListSearchFansResponseType = {
  code: number;
  data: ListDataSearchFans[];
  message: string;
  meta: [];
  status: number;
};

export type ListDataSearchMusician = {
  uuid: string;
  username: string;
  fullname: string;
  email: string;
  imageProfileUrls: imageTypes[];
  followers: number;
  point?: number;
  isFollowed?: boolean;
};

export type ListSearchMusicianResponseType = {
  code: number;
  data: ListDataSearchMusician[];
  message: string;
  meta: [];
  status: number;
};

export type ListDataSearchSongs = {
  id: number;
  musicianId: string;
  musicianName: string;
  title: string;
  description: string;
  songWriter: string[];
  imageUrl: imageTypes[];
  publishedDate: string;
  copyright: string;
  language: string;
  CreatedAt: string;
  UpdatedAt: string;
  isLiked?: boolean;
};

export type ListSearchSongsResponseType = {
  code: number;
  data: ListDataSearchSongs[];
  message: string;
  meta: [];
  status: number;
};

export type ListDataSearchAlbums = {
  id: number;
  title: string;
  description: string;
  imageUrl: imageTypes[];
  featuringArtist: string[];
  genre: string;
  copyrightProducer: string[];
  copyrightVisual: string[];
  copyrightFans: string[];
  productionYear: string;
  publishedDate: string;
  language: string;
  label: string[];
  createdAt: string;
};

export type ListSearchAlbumsResponseType = {
  code: number;
  data: ListDataSearchAlbums[];
  message: string;
  meta: [];
  status: number;
};

export type ListDataSearchPlaylist = {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  userUUID: string;
  likesCount: number;
  totalSongs: number;
  CreatedAt: string;
  UpdatedAt: string;
};

export type ListSearchPlaylistsResponseType = {
  code: number;
  data: ListDataSearchPlaylist[];
  message: string;
  meta: [];
  status: number;
};

export interface KeywordProps {
  keyword: string;
}
