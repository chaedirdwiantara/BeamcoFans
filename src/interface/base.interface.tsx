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
};
