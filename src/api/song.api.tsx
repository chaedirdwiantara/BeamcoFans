import SsuAPI from './baseSemeru';
import {ListSongResponseType} from '../interface/song.interface';

export const listSong = async (): Promise<ListSongResponseType> => {
  const {data} = await SsuAPI().request<ListSongResponseType>({
    url: '/songs',
    method: 'GET',
  });

  return data;
};
