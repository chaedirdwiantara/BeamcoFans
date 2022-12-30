import {PaginationType} from './base.interface';

export type BannerList = {
  id: number;
  title?: string;
  description?: string;
  imageUrl?: string;
  linkUrl?: string;
  platformType?: string;
  isPublish?: boolean;
  ordering?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ListBannerResponseType = {
  code: number;
  data: BannerList[];
  message: string;
  meta: PaginationType;
  status: number;
};