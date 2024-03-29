import {imageTypes, PaginationType} from './base.interface';

export type paramsTypeUuid = {
  uuid: string;
};

export type MusicianList = {
  point?: string;
  credit: number;
  email: string;
  followers: number;
  fullname: string;
  imageProfileUrls: imageTypes[];
  isFollowed: boolean;
  username: string;
  uuid: string;
};

export type ListMusicianResponseType = {
  code: number;
  data: MusicianList[];
  message: string;
  meta: PaginationType;
  status: number;
};

export type photos = {
  createdAt: string;
  images: imageTypes[];
};

export type TheGenres = {
  id: number;
  name: string;
};

export type DataDetailMusician = {
  point: {
    daily: number;
    lastUpdated: string;
    pointLifetime: number;
  };
  uuid: string;
  username: string;
  fullname: string;
  imageProfileUrls: imageTypes[];
  email: string;
  registrationType: string;
  phoneNumber: number;
  genres: TheGenres[];
  labels: string;
  bio: string;
  about: string;
  members: string[];
  website: string;
  originCountry: string;
  originCity: string;
  locationCountry: string;
  locationCity: string;
  yearsActiveFrom: string;
  yearsActiveTo: string;
  socialMedia: [];
  followers: number;
  fans: number;
  totalRelease: number;
  totalPlaylist: number;
  rank: number;
  createdAt: string;
  updatedAt: string;
  isFollowed: boolean;
  banners: imageTypes[];
  photos: photos[];
  albums: [];
  merchs: [];
  favoriteGenres: TheGenres[];
  blockIs: boolean; // pov i being blocked by that user
  isBlock: boolean; // pov i blocked that user
  websiteUrl: string | null;
  spotifyUrl: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
};

export type DetailMusicianResponseType = {
  code: number;
  data: DataDetailMusician;
  message: string;
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

export type AlbumData = {
  id: number;
  title: string;
  description: string;
  imageUrl: imageTypes[];
  featuringArtist: string[];
  genre: string;
  subgenre: string;
  likesCount: number;
  shareCount: number;
  mood: string;
  copyrightProducer: string[];
  copyrightVisual: string[];
  copyrightFans: string[];
  productionYear: string;
  publishedDate: string;
  isPublished: boolean;
  language: string;
  label: string[];
  barcodeUpc: string;
  createdAt: string;
  updatedAt: string;
  albumType?: string;
  type?: string;
};

export type AlbumByIdResponseType = {
  code: number;
  data: AlbumData[];
  message: string;
  meta: PaginationType;
  status: number;
};

export type DataDetailMusicianLite = {
  uuid: string;
  username: string;
  fullname: string;
  imageProfile: imageTypes[];
  email: string;
};

export type DetailMusicianLiteResponseType = {
  code: number;
  data: DataDetailMusicianLite;
  message: string;
  status: number;
};

export type AppearsOnDataType = {
  id: number;
  title: string;
  albumType: string;
  imageUrl: imageTypes[];
  productionYear: string;
};

export type AppearsOnResponseType = {
  code: number;
  data: AppearsOnDataType[];
  message: string;
  status: number;
};
