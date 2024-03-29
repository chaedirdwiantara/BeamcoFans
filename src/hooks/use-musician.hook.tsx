import {useState} from 'react';
import {
  detailMusician,
  detailMusicianGuest,
  followMusician,
  getAlbumById,
  getAppersOnAlbum,
  listContribution,
  listMusician,
  listTopArtists,
  recommendedMusician,
  unfollowMusician,
} from '../api/musician.api';
import {
  AlbumData,
  AppearsOnDataType,
  DataDetailMusician,
  FollowMusicianPropsType,
  MusicianList,
  paramsTypeUuid,
} from '../interface/musician.interface';
import {ParamsProps} from '../interface/base.interface';
import {PostPropsTypeA} from '../interface/feed.interface';
import {useInfiniteQuery, useQuery} from 'react-query';

export const useMusicianHook = () => {
  const [isLoadingMusician, setIsLoadingMusician] = useState(false);
  const [isLoadingAlbum, setIsLoadingAlbum] = useState(false);
  const [dataMusician, setDataMusician] = useState<MusicianList[]>([]);
  const [dataFavoriteMusician, setDataFavoriteMusician] = useState<
    MusicianList[]
  >([]);
  const [dataRecommendedMusician, setDataRecommendedMusician] = useState<
    MusicianList[]
  >([]);
  const [dataAlbum, setDataAlbum] = useState<AlbumData[]>([]);
  const [dataDetailMusician, setDataDetailMusician] =
    useState<DataDetailMusician>();
  const [dataFollow, setDataFollow] = useState<string | null>(null);
  const [dataAppearsOn, setDataAppearsOn] = useState<AppearsOnDataType[]>([]);
  const [isErrorMusician, setIsErrorMusician] = useState(false);

  const getListDataMusician = async (props?: ParamsProps) => {
    setIsLoadingMusician(true);
    try {
      const response = await listMusician(props);
      setDataMusician(response.data);
    } catch (error) {
      console.log(error);
      setIsErrorMusician(true);
      setDataMusician([]);
    } finally {
      setIsLoadingMusician(false);
    }
  };

  const getListDataFavoriteMusician = async (props?: ParamsProps) => {
    setIsLoadingMusician(true);
    try {
      const response = await listMusician(props);
      setDataFavoriteMusician(response.data);
    } catch (error) {
      console.log(error);
      setIsErrorMusician(true);
      setDataFavoriteMusician([]);
    } finally {
      setIsLoadingMusician(false);
    }
  };

  const getListDataRecommendedMusician = async (props?: ParamsProps) => {
    setIsLoadingMusician(true);
    try {
      const response = await recommendedMusician(props);
      setDataRecommendedMusician(response.data);
    } catch (error) {
      console.log(error, 'recommended');
      setIsErrorMusician(true);
      setDataRecommendedMusician([]);
    } finally {
      setIsLoadingMusician(false);
    }
  };

  const getDetailMusician = async (props?: ParamsProps) => {
    setIsLoadingMusician(true);
    try {
      const response = await detailMusician(props);
      setDataDetailMusician(response.data);
    } catch (error) {
      console.log(error);
      setIsErrorMusician(true);
      setDataDetailMusician(undefined);
    } finally {
      setIsLoadingMusician(false);
    }
  };

  const getDetailMusicianGuest = async (props?: PostPropsTypeA) => {
    setIsLoadingMusician(true);
    try {
      const response = await detailMusicianGuest(props);
      setDataDetailMusician(response.data);
    } catch (error) {
      console.log(error);
      setIsErrorMusician(true);
      setDataDetailMusician(undefined);
    } finally {
      setIsLoadingMusician(false);
    }
  };

  const getAlbum = async (props?: paramsTypeUuid) => {
    setIsLoadingAlbum(true);
    try {
      const response = await getAlbumById(props);
      setDataAlbum(response.data);
    } catch (error) {
      console.log(error);
      setIsErrorMusician(true);
      setDataAlbum([]);
    } finally {
      setIsLoadingAlbum(false);
    }
  };

  const getDataAppearsOn = async (props?: paramsTypeUuid) => {
    setIsLoadingMusician(true);
    try {
      const response = await getAppersOnAlbum(props);
      setDataAppearsOn(response.data);
    } catch (error) {
      console.log(error);
      setIsErrorMusician(true);
      setDataAlbum([]);
    } finally {
      setIsLoadingMusician(false);
    }
  };

  const setFollowMusician = async (
    props?: FollowMusicianPropsType,
    params?: ParamsProps,
    notTriggeredGetList?: boolean | undefined,
  ) => {
    try {
      const response = await followMusician(props);
      setDataFollow(response.data);
      !notTriggeredGetList && getListDataMusician(params);
    } catch (error) {
      console.log(error);
      setIsErrorMusician(true);
      setDataFollow(null);
      setDataMusician([]);
    } finally {
      setIsLoadingMusician(false);
    }
  };

  const setUnfollowMusician = async (
    props?: FollowMusicianPropsType,
    params?: ParamsProps,
    notTriggeredGetList?: boolean | undefined,
  ) => {
    try {
      const response = await unfollowMusician(props);
      setDataFollow(response.data);
      !notTriggeredGetList && getListDataMusician(params);
    } catch (error) {
      console.log(error);
      setIsErrorMusician(true);
      setDataFollow(null);
      setDataMusician([]);
    } finally {
      setIsLoadingMusician(false);
    }
  };

  const useListContribution = (totalPage: number, params?: ParamsProps) => {
    return useInfiniteQuery({
      queryKey: ['list-contribution'],
      enabled: false,
      queryFn: ({pageParam = 1}) =>
        listContribution({...params, page: pageParam, perPage: 10}),
      keepPreviousData: true,
      getNextPageParam: lastPage => {
        if ((lastPage?.data?.length as number) < totalPage) {
          const nextPage = (lastPage?.data?.length as number) + 1;
          return nextPage;
        }
        return null;
      },
      getPreviousPageParam: () => null,
    });
  };

  const useGetListTopArtists = (filter: 'lifetime' | 'trending') => {
    return useQuery([`top-artists/${filter}`], () =>
      listTopArtists(filter),
    );
  };

  return {
    isLoadingMusician,
    isErrorMusician,
    dataMusician,
    dataFollow,
    dataDetailMusician,
    dataAlbum,
    dataFavoriteMusician,
    dataRecommendedMusician,
    dataAppearsOn,
    isLoadingAlbum,
    getListDataMusician,
    setFollowMusician,
    setUnfollowMusician,
    getDetailMusician,
    getAlbum,
    getListDataFavoriteMusician,
    getListDataRecommendedMusician,
    getDetailMusicianGuest,
    getDataAppearsOn,
    useListContribution,
    useGetListTopArtists,
  };
};
