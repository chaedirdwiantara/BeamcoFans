import {useState} from 'react';
import {listSong} from '../api/song.api';
import {SongList} from '../interface/song.interface';

export const useSongHook = () => {
  const [isLoadingSong, setIsLoadingSong] = useState(false);
  const [isErrorSong, setIsErrorSong] = useState(false);
  const [dataSong, setDataSong] = useState<SongList[]>([]);

  const getListDataSong = async () => {
    try {
      const response = await listSong();
      setDataSong(response.data);
    } catch (error) {
      console.log(error);
      setIsErrorSong(true);
      setDataSong([]);
    } finally {
      setIsLoadingSong(false);
    }
  };

  return {
    isLoadingSong,
    isErrorSong,
    dataSong,
    getListDataSong,
  };
};
