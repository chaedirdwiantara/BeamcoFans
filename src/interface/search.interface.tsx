import {imageTypes} from './base.interface';
import {TranscodedSongType} from './song.interface';

export type SearchProps = {
  keyword: string;
  filterBy?: string;
  genre?: number;
  mood?: number;
  page?: number;
  perPage?: number;
  albumID?: number;
};

export type FollowersProps = {
  keyword?: string;
  uuid: string;
  page?: number;
};

export type ListDataSearchFans = {
  uuid: string;
  username: string;
  fullname: string;
  email: string;
  imageProfileUrls: imageTypes[];
  followersType: 'fans' | 'musician';
  point: string;
};

export type ListSearchFansResponseType = {
  code: number;
  data: ListDataSearchFans[];
  message: string;
  meta: {
    page: number;
    perPage: number;
    total: number;
  };
  status: number;
};

export type ListDataFans = {
  uuid: string;
  fullname: string;
  image: imageTypes[];
  totalPoint: number;
  userType: 'fans' | 'musician';
};

export type ListFansResponseType = {
  code: number;
  data: ListDataFans[];
  message: string;
  meta: {
    page: number;
    perPage: number;
    total: number;
  };
  status: number;
};

export type ListDataSearchMusician = {
  uuid: string;
  username: string;
  fullname: string;
  email: string;
  imageProfileUrls: imageTypes[];
  followers: number;
  point?: string;
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
  musicianUUID: string;
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
  transcodedSongUrl: TranscodedSongType[];
  musician: {
    name: string;
  };
  album: {
    id: number;
  };
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
  name?: string;
  type?: string;
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
  playlistOwner: {
    UUID: string;
    fullname: string;
    image: string | null;
    username: string;
  };
};

export type ListSearchPlaylistsResponseType = {
  code: number;
  data: ListDataSearchPlaylist[];
  message: string;
  meta: {
    page: number;
    perPage: number;
    total: number;
  };
  status: number;
};

export interface KeywordProps {
  keyword: string;
}
