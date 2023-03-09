import {imageTypes} from './base.interface';

export type RegistrationType =
  | 'email'
  | 'facebook'
  | 'google'
  | 'apple'
  | 'phoneNumber';

export type FavGenreType = {
  id: number;
  name: string;
};

export type ListImageType = {
  length: number;
  image: string;
  presetName: string;
};

export type ProfileResponseData = {
  uuid: string;
  username: string;
  email: string;
  fullname: string;
  about: string | null;
  banners: imageTypes[];
  images: imageTypes[];
  phoneNumber: string | null;
  registrationType: RegistrationType;
  favoriteGenres: FavGenreType[];
  moods: MoodsType[];
  expectation: ExpectationType[];
  isValid: boolean;
  language: string;
  following: number | null;
  songAdded: number | null;
  createdAt: string;
  updatedAt: string;
  referralFrom: string | null;
  locationCountry: string;
  gender: string;
  followers: number;
  fans: number;
  bio: string | null;
  totalLiked: number;
  points: {
    daily: number;
    lasUpdated: string;
  };
};

export type MoodsType = {
  id: number;
  name: string;
};

export type ExpectationType = {
  id: number;
  name: string;
};

export type ProfileResponseType = {
  code: number;
  data: ProfileResponseData;
  message: string;
  status: number;
};

export type UpdateProfileResponseType = {
  code: number;
  data: {
    id: number;
    uuid: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
  status: number;
};

export type ApplyReferralResponseType = {
  code: number;
  data: null | {
    username: string;
    appliedAt: string;
  };
  message: string;
  status: number;
};

export type DataCountLiked = {
  uuid: string;
  countLikedSong: number;
};

export type CountLikedResponseType = {
  code: number;
  data: DataCountLiked;
  message: string;
  status: number;
};

export type DeleteProfileResponseType = {
  code: number;
  data: string;
  message: string;
  status: number;
};

export type DataTotalCountPropsType = {
  uuid: string;
  countPlaylist: number;
  countSong: number;
  countAlbumReleased: number;
};

export type ProfileCountResponseType = {
  code: number;
  data: DataTotalCountPropsType;
  message: string;
  status: number;
};
