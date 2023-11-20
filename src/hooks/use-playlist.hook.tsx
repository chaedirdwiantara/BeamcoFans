import {useState} from 'react';
import {SongList} from '../interface/song.interface';
import {ParamsProps} from '../interface/base.interface';
import {
  AddSongPropsType,
  Playlist,
  PlaylistPropsTypeA,
} from '../interface/playlist.interface';
import {
  addSong,
  detailPlaylist,
  detailPlaylistPublic,
  getListPlaylist,
  getListPlaylistPublic,
  listSongs,
  listSongsPlaylistPublic,
} from '../api/playlist.api';

export const usePlaylistHook = () => {
  const [playlistLoading, setPlaylistLoading] = useState<boolean>(false);
  const [playlistError, setPlaylistError] = useState<boolean>(false);
  const [dataPlaylist, setDataPlaylist] = useState<Playlist[] | null>([]);
  const [dataDetailPlaylist, setDataDetailPlaylist] =
    useState<Playlist | null>();
  const [dataSongsPlaylist, setDataSongsPlaylist] = useState<SongList[]>();

  const getPlaylist = async (props?: ParamsProps) => {
    setPlaylistLoading(true);
    setPlaylistError(false);
    try {
      const response = await getListPlaylist(props);
      setDataPlaylist(response.data);
    } catch (error) {
      console.log(error);
      setPlaylistError(true);
      setDataPlaylist([]);
    } finally {
      setPlaylistLoading(false);
    }
  };

  const getDetailPlaylist = async (props?: PlaylistPropsTypeA) => {
    setPlaylistLoading(true);
    setPlaylistError(false);
    try {
      const response = await detailPlaylist(props);
      setDataDetailPlaylist(response.data);
    } catch (error) {
      console.log(error);
      setPlaylistError(true);
    } finally {
      setPlaylistLoading(false);
    }
  };

  const getListSongsPlaylist = async (
    params?: PlaylistPropsTypeA,
    props?: ParamsProps,
  ) => {
    try {
      const response = await listSongs(params, props);
      setDataSongsPlaylist(response.data);
    } catch (error) {
      setPlaylistError(true);
      setDataSongsPlaylist([]);
    } finally {
      setPlaylistLoading(false);
    }
  };

  const setAddSongToPlaylist = async (props?: AddSongPropsType) => {
    try {
      await addSong(props);
    } catch (error) {
      console.log(error);
    } finally {
      setPlaylistLoading(false);
    }
  };

  const getPlaylistPublic = async (props?: ParamsProps) => {
    setPlaylistLoading(true);
    setPlaylistError(false);
    try {
      const response = await getListPlaylistPublic(props);
      setDataPlaylist(response.data);
    } catch (error) {
      console.log(error);
      setPlaylistError(true);
      setDataPlaylist([]);
    } finally {
      setPlaylistLoading(false);
    }
  };

  const getDetailPlaylistPublic = async (props?: PlaylistPropsTypeA) => {
    setPlaylistLoading(true);
    setPlaylistError(false);
    try {
      const response = await detailPlaylistPublic(props);
      setDataDetailPlaylist(response.data);
    } catch (error) {
      console.log(error);
      setPlaylistError(true);
    } finally {
      setPlaylistLoading(false);
    }
  };

  const getListSongsPlaylistPublic = async (
    params?: PlaylistPropsTypeA,
    props?: ParamsProps,
  ) => {
    try {
      const response = await listSongsPlaylistPublic(params, props);
      setDataSongsPlaylist(response.data);
    } catch (error) {
      setPlaylistError(true);
      setDataSongsPlaylist([]);
    } finally {
      setPlaylistLoading(false);
    }
  };

  return {
    playlistLoading,
    playlistError,
    dataPlaylist,
    dataDetailPlaylist,
    dataSongsPlaylist,
    getPlaylist,
    getDetailPlaylist,
    getListSongsPlaylist,
    setAddSongToPlaylist,
    getPlaylistPublic,
    getDetailPlaylistPublic,
    getListSongsPlaylistPublic,
  };
};
