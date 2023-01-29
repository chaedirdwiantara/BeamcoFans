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

export type images = {
  image: 'https://yt3.googleusercontent.com/ytc/AL5GRJXpF3TYVsKsURBxqMQ3eby_zyTY95IdIcfXzNOMUw=s900-c-k-c0x00ffffff-no-rj';
  presetName: 'thumbnail';
};

export type ProfileResponseData = {
  uuid: string;
  username: string;
  email: string;
  fullname: string;
  about: string | null;
  banner: string | null;
  images: images[];
  phoneNumber: string | null;
  registrationType: RegistrationType;
  favoriteGenres: FavGenreType[];
  moods: MoodsType[];
  expectation: ExpectationType[];
  isValid: boolean;
  following: number | null;
  songAdded: number | null;
  createdAt: string;
  updatedAt: string;
  locationCountry: string;
  gender: string;
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
