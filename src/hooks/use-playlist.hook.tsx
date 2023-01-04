import {useState} from 'react';
import {SongList} from '../interface/song.interface';
import {ParamsProps} from '../interface/base.interface';
import {Playlist} from '../interface/playlist.interface';
import {PostPropsTypeA} from '../interface/feed.interface';
import {detailPlaylist, getListPlaylist, listSongs} from '../api/playlist.api';

export const usePlaylistHook = () => {
  const [playlistLoading, setPlaylistLoading] = useState<boolean>(false);
  const [playlistError, setPlaylistError] = useState<boolean>(false);
  const [dataPlaylist, setDataPlaylist] = useState<Playlist[]>([]);
  const [dataDetailPlaylist, setDataDetailPlaylist] = useState<Playlist>();
  const [dataSongsPlaylist, setDataSongsPlaylist] = useState<SongList[]>();

  const getPlaylist = async () => {
    setPlaylistLoading(true);
    setPlaylistError(false);
    try {
      const response = await getListPlaylist();
      setDataPlaylist(response.data);
    } catch (error) {
      console.log(error);
      setPlaylistError(true);
      setDataPlaylist([]);
    } finally {
      setPlaylistLoading(false);
    }
  };

  const getDetailPlaylist = async (props?: PostPropsTypeA) => {
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
    params?: PostPropsTypeA,
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

  return {
    playlistLoading,
    playlistError,
    dataPlaylist,
    dataDetailPlaylist,
    dataSongsPlaylist,
    getPlaylist,
    getDetailPlaylist,
    getListSongsPlaylist,
  };
};
