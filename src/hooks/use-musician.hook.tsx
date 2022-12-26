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
import {ParamsProps} from '../interface/base.interface';

export const useMusicianHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataMusician, setDataMusician] = useState<MusicianList[]>([]);
  const [dataFollow, setDataFollow] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const getListDataMusician = async (props?: ParamsProps) => {
    try {
      const response = await listMusician(props);
      setDataMusician(response.data);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setDataMusician([]);
    } finally {
      setIsLoading(false);
    }
  };

  const setFollowMusician = async (
    props?: FollowMusicianPropsType,
    params?: ParamsProps,
  ) => {
    setIsLoading(true);
    try {
      const response = await followMusician(props);
      setDataFollow(response.data);
      getListDataMusician(params);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setDataFollow(null);
      setDataMusician([]);
    } finally {
      setIsLoading(false);
    }
  };

  const setUnfollowMusician = async (
    props?: FollowMusicianPropsType,
    params?: ParamsProps,
  ) => {
    setIsLoading(true);
    try {
      const response = await unfollowMusician(props);
      setDataFollow(response.data);
      getListDataMusician(params);
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
