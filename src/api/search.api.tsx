import {
  ListSearchFansResponseType,
  ListSearchMusicianResponseType,
  SearchProps,
} from '../interface/search.interface';
import SsuAPI from './basePublic';

export const fansSearch = async (
  props?: SearchProps,
): Promise<ListSearchFansResponseType> => {
  const {data} = await SsuAPI().request<ListSearchFansResponseType>({
    url: '/fans',
    method: 'GET',
    params: props,
  });

  return data;
};

export const musicianSearch = async (
  props?: SearchProps,
): Promise<ListSearchMusicianResponseType> => {
  const {data} = await SsuAPI().request<ListSearchMusicianResponseType>({
    url: '/musicians',
    method: 'GET',
    params: props,
  });

  return data;
};
