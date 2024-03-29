export type PaginationType = {
  skip: number;
  limit: number;
  total: number;
};

export type ParamsProps = {
  skip?: number;
  limit?: number;
  total?: number;
  category?: string;
  sortBy?: string;
  filterBy?: string;
  fansUUID?: string;
  keyword?: string;
  page?: number;
  perPage?: number;
  musician_uuid?: string;
  uuid?: string;
  playlistID?: number;
  albumID?: number;
  context?: string;
  listType?: string;
  isPremium?: boolean;
  mood?: string;
  genre?: string;
  order?: 'asc' | 'desc';
  id?: number | string;
  myUUID?: string;
  pageSize?: number;
};

export type imageTypes = {
  image: string;
  presetName: string;
};

export type nameValue = {
  name: string;
  value: number | string;
  username: string;
  Name?: string;
  Value?: number | string;
};

export type metaValue = {
  Page: number;
  PerPage: number;
  TotalData: number;
};

export type BaseResponseApi = {
  code: number;
  message: string;
  status: number;
  meta?: metaValue;
};
