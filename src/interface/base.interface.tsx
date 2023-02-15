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
};

export type imageTypes = {
  image: string;
  presetName: string;
};
