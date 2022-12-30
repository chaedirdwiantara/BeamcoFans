export type SearchProps = {
  keyword: string;
};
export type ListDataSearchFans = {
  uuid: string;
  username: string;
  fullname: string;
  email: string;
  imageProfileUrl: string;
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
  imageProfileUrl: string;
  followers: number;
};

export type ListSearchMusicianResponseType = {
  code: number;
  data: ListDataSearchMusician[];
  message: string;
  meta: [];
  status: number;
};
