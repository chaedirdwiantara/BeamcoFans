import {useState} from 'react';
import {
  SongList,
  DataDetailSong,
  SongPropsTypeA,
  DataDetailAlbum,
  PaginationType,
} from '../interface/song.interface';
import {ParamsProps} from '../interface/base.interface';
import {PostPropsTypeA} from '../interface/feed.interface';
import {
  detailSong,
  likeSong,
  listSong,
  unlikeSong,
  detailAlbum,
  detailAlbumPublic,
} from '../api/song.api';

export const useSongHook = () => {
  const [isLoadingSong, setIsLoadingSong] = useState(false);
  const [albumLoading, setAlbumLoading] = useState(false);
  const [isErrorSong, setIsErrorSong] = useState(false);
  const [dataSong, setDataSong] = useState<SongList[]>([]);
  const [dataNewSong, setDataNewSong] = useState<SongList[]>([]);
  const [metaSong, setMetaSong] = useState<PaginationType>();
  const [metaNewSong, setMetaNewSong] = useState<PaginationType>();
  const [dataDetailSong, setDataDetailSong] = useState<DataDetailSong | null>(
    null,
  );
  const [dataDetailAlbum, setDataDetailAlbum] =
    useState<DataDetailAlbum | null>(null);

  const getListDataSong = async (props?: ParamsProps) => {
    try {
      const response = await listSong(props);
      setDataSong(response.data);
      setMetaSong(response.meta);
    } catch (error) {
      console.log(error);
      setIsErrorSong(true);
      setDataSong([]);
    } finally {
      setIsLoadingSong(false);
    }
  };

  const getListDataNewSong = async (props?: ParamsProps) => {
    try {
      const response = await listSong(props);
      setDataNewSong(response.data);
      setMetaNewSong(response.meta);
    } catch (error) {
      console.log(error);
      setIsErrorSong(true);
      setDataNewSong([]);
    } finally {
      setIsLoadingSong(false);
    }
  };

  const getDetailSong = async (props?: PostPropsTypeA) => {
    setIsLoadingSong(true);
    try {
      const response = await detailSong(props);
      setDataDetailSong(response.data);
    } catch (error) {
      console.log(error);
      setIsErrorSong(true);
      setDataDetailSong(null);
    } finally {
      setIsLoadingSong(false);
    }
  };

  const getDetailAlbum = async (props?: PostPropsTypeA) => {
    setAlbumLoading(true);
    try {
      const response = await detailAlbum(props);
      setDataDetailAlbum(response.data);
    } catch (error) {
      console.log(error);
      setDataDetailAlbum(null);
    } finally {
      setAlbumLoading(false);
    }
  };

  const getDetailAlbumPublic = async (props?: PostPropsTypeA) => {
    setAlbumLoading(true);
    try {
      const response = await detailAlbumPublic(props);
      setDataDetailAlbum(response.data);
    } catch (error) {
      console.log(error);
      setDataDetailAlbum(null);
    } finally {
      setAlbumLoading(false);
    }
  };

  const setLikeSong = async (props?: SongPropsTypeA) => {
    setIsLoadingSong(true);
    try {
      await likeSong(props);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingSong(false);
    }
  };

  const setUnlikeSong = async (props?: SongPropsTypeA) => {
    setIsLoadingSong(true);
    try {
      await unlikeSong(props);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingSong(false);
    }
  };

  return {
    isLoadingSong,
    isErrorSong,
    dataSong,
    dataDetailSong,
    albumLoading,
    dataDetailAlbum,
    metaSong,
    dataNewSong,
    metaNewSong,
    getListDataSong,
    getDetailSong,
    getDetailAlbum,
    setDataDetailAlbum,
    setLikeSong,
    setUnlikeSong,
    getListDataNewSong,
    getDetailAlbumPublic,
  };
};
