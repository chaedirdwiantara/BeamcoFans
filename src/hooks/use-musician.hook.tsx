import {useState} from 'react';
import {listMusician} from '../api/musician.api';
import {MusicianList} from '../interface/musician.interface';

export const useMusicianHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataMusician, setDataMusician] = useState<MusicianList[]>([]);

  const getListDataMusician = async () => {
    try {
      const response = await listMusician();
      console.log(response);
      setDataMusician(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    dataMusician,
    getListDataMusician,
  };
};
