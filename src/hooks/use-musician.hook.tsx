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
  const [dataFollow, setDataFollow] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const getListDataMusician = async () => {
    try {
      const response = await listMusician();
      setDataMusician(response.data);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setDataMusician([]);
    } finally {
      setIsLoading(false);
    }
  };

  const setFollowMusician = async (props?: FollowMusicianPropsType) => {
    setIsLoading(true);
    try {
      const response = await followMusician(props);
      setDataFollow(response.data);
      getListDataMusician();
    } catch (error) {
      console.log(error);
      setIsError(true);
      setDataFollow(null);
      setDataMusician([]);
    } finally {
      setIsLoading(false);
    }
  };

  const setUnfollowMusician = async (props?: FollowMusicianPropsType) => {
    setIsLoading(true);
    try {
      const response = await unfollowMusician(props);
      setDataFollow(response.data);
      getListDataMusician();
    } catch (error) {
      console.log(error);
      setIsError(true);
      setDataFollow(null);
      setDataMusician([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    dataMusician,
    dataFollow,
    getListDataMusician,
    setFollowMusician,
    setUnfollowMusician,
  };
};
