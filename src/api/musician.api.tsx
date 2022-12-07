import {ListMusicianResponseType} from '../interface/musician.interface';
import SsuAPI from './base';

export const listMusician = async (): Promise<ListMusicianResponseType> => {
  const {data} = await SsuAPI().request<ListMusicianResponseType>({
    url: '/musicians',
    method: 'GET',
  });

  return data;
};
