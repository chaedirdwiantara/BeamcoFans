import {useState} from 'react';
import {
  followMusician,
  listMusician,
  unfollowMusician,
} from '../api/musician.api';
import {
  FollowMusicianPropsType,
  MusicianList,
} from '../interface/musician.interface';

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

  const setFollowMusician = async (props?: FollowMusicianPropsType) => {
    try {
      setIsLoading(true);
      await followMusician(props);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const setUnfollowMusician = async (props?: FollowMusicianPropsType) => {
    try {
      setIsLoading(true);
      await unfollowMusician(props);
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
    setFollowMusician,
    setUnfollowMusician,
  };
};
