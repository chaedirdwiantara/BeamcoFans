import {imageTypes} from './base.interface';
import {PreferenceList} from './setting.interface';

export type RegistrationType =
  | 'email'
  | 'facebook'
  | 'google'
  | 'apple'
  | 'phoneNumber';

export const SocialMedia: string[] = [
  'spotify',
  'browser',
  'instagram',
  'youtube',
];

export type ListImageType = {
  length: number;
  image: string;
  presetName: string;
};

export type LocationType = {
  id: number;
  name: string;
};

export type ProfileResponseData = {
  uuid: string;
  username: string;
  email: string;
  fullname: string;
  about: string;
  banners: imageTypes[];
  images: imageTypes[];
  phoneNumber: string | null;
  registrationType: RegistrationType;
  favoriteGenres: PreferenceList[];
  moods: PreferenceList[];
  expectation: ExpectationType[];
  isValid: boolean;
  language: string;
  following: number | null;
  songAdded: number | null;
  createdAt: string;
  updatedAt: string;
  referralFrom: string | null;
  locationCountry: LocationType;
  locationCity: string;
  birthdate: string;
  gender: string;
  followers: number;
  fans: number;
  bio: string;
  totalLiked: number;
  point: {
    daily: number;
    lasUpdated: string;
    pointLifetime: number;
  };
  blockIs?: boolean; // pov i being blocked by that user
  isBlock?: boolean; // pov i blocked that user
  isBanned: boolean;
  availablePoint: number;
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

export type LastStepResponseType = {
  lastStep: number;
};

export type SetLastStepResponseType = {
  code: number;
  data: LastStepResponseType;
  message: string;
  status: number;
};

export type GetStepResponseType = {
  lastStep: number;
};

export type GetLastStepResponseType = {
  code: number;
  data: GetStepResponseType;
  message: string;
  status: number;
};

export type ProfileProgressResponseType = {
  stepProgress: string;
  uncompleteList: {
    profileAndAccountInformation: string[];
  };
};

export type GetProfileProgressResponseType = {
  code: number;
  data: ProfileProgressResponseType;
  message: string;
  status: number;
};
