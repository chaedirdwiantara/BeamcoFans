import {useState} from 'react';
import {listConcert, listMerch} from '../api/event.api';
import {MerchData} from '../interface/event.interface';

export const useEventHook = () => {
  const [concertIsLoading, setConcertIsLoading] = useState<boolean>(false);
  const [dataConcertList, setDataConcertList] = useState<MerchData[]>([]);
  const [concertIsError, setConcertIsError] = useState<boolean>(false);

  const getListDataMerch = async (props?: any) => {
    try {
      const response = await listMerch(props);
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getListDataConcert = async (props?: any) => {
    setConcertIsLoading(true);
    setConcertIsError(false);
    try {
      const response = await listConcert(props);
      setDataConcertList(response.data);
    } catch (error) {
      setConcertIsError(true);
    } finally {
      setConcertIsLoading(false);
    }
  };

  return {
    getListDataMerch,
    concertIsLoading,
    dataConcertList,
    concertIsError,
    getListDataConcert,
  };
};
