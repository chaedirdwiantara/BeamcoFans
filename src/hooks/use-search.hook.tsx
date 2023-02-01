import {useState} from 'react';
import {
  albumSearch,
  fansSearch,
  listBannerPublic,
  musicianSearch,
  playlistSearch,
  songSearch,
} from '../api/search.api';
import {
  ListDataSearchMusician,
  ListDataSearchSongs,
  SearchProps,
} from '../interface/search.interface';
import {searchEvent} from '../api/event.api';
import {BannerList} from '../interface/banner.interface';
import {PaginationType} from '../interface/base.interface';

export const useSearchHook = () => {
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [dataSearchMusicians, setDataSearchMusicians] = useState<
    ListDataSearchMusician[]
  >([]);
  const [dataSearchSongs, setDataSearchSongs] = useState<ListDataSearchSongs[]>(
    [],
  );
  const [dataPublicBanner, setDataPublicBanner] = useState<BannerList[]>([]);

  const getSearchFans = async (props?: SearchProps) => {
    try {
      const response = await fansSearch(props);
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchMusicians = async (props?: SearchProps) => {
    try {
      const response = await musicianSearch(props);
      setDataSearchMusicians(response?.data);
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchSongs = async (props?: SearchProps) => {
    try {
      const response = await songSearch(props);
      setDataSearchSongs(response.data);
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchAlbums = async (props?: SearchProps) => {
    try {
      const response = await albumSearch(props);
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchPlaylists = async (props?: SearchProps) => {
    try {
      const response = await playlistSearch(props);
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchMerchs = async (props?: SearchProps) => {
    try {
      const response = await searchEvent({
        type: 'merch',
        query: props?.keyword,
      });
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchEvents = async (props?: SearchProps) => {
    try {
      const response = await searchEvent({
        type: 'event',
        query: props?.keyword,
      });
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getListDataBannerPublic = async (props?: PaginationType) => {
    setSearchLoading(true);
    try {
      const response = await listBannerPublic(props);
      console.log({response});
      setDataPublicBanner(response.data);
    } catch (error) {
      console.log(error);
      setDataPublicBanner([]);
    } finally {
      setSearchLoading(false);
    }
  };

  return {
    searchLoading,
    dataPublicBanner,
    dataSearchMusicians,
    dataSearchSongs,
    getSearchFans,
    getSearchMusicians,
    getSearchAlbums,
    getSearchSongs,
    getSearchPlaylists,
    getListDataBannerPublic,
    getSearchMerchs,
    getSearchEvents,
  };
};
