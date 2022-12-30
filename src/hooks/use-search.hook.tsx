import {useState} from 'react';
import {fansSearch, musicianSearch} from '../api/search.api';
import {
  ListDataSearchFans,
  ListDataSearchMusician,
  SearchProps,
} from '../interface/search.interface';

export const useSearchHook = () => {
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string>('');
  const [dataSearchFans, setDataSearchFans] = useState<
    ListDataSearchFans[] | null
  >(null);
  const [dataSearchMusicians, setDataSearchMusicians] = useState<
    ListDataSearchMusician[] | null
  >(null);

  const getSearchFans = async (props?: SearchProps) => {
    setSearchLoading(true);
    try {
      const response = await fansSearch(props);
      setDataSearchFans(response.data);
    } catch (error) {
      console.log(error);
      setDataSearchFans(null);
    } finally {
      setSearchLoading(false);
    }
  };

  const getSearchMusicians = async (props?: SearchProps) => {
    setSearchLoading(true);
    try {
      const response = await musicianSearch(props);
      setDataSearchMusicians(response.data);
    } catch (error) {
      console.log(error);
      setDataSearchMusicians(null);
    } finally {
      setSearchLoading(false);
    }
  };

  return {
    searchLoading,
    dataSearchFans,
    dataSearchMusicians,
    getSearchFans,
    getSearchMusicians,
  };
};
