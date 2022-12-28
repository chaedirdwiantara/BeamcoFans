import {useState} from 'react';
import {listMerch} from '../api/event.api';
import {MerchData} from '../interface/event.interface';

export const useEventHook = () => {
  const [merchIsLoading, setMerchIsLoading] = useState<boolean>(false);
  const [dataMerchList, setDataMerchList] = useState<MerchData[]>([]);
  const [merchIsError, setMerchIsError] = useState<boolean>(false);

  const getListDataMerch = async (props?: any) => {
    setMerchIsLoading(true);
    setMerchIsError(false);
    try {
      const response = await listMerch(props);
      setDataMerchList(response.data);
    } catch (error) {
      setMerchIsError(true);
    } finally {
      setMerchIsLoading(false);
    }
  };

  return {
    merchIsLoading,
    merchIsError,
    dataMerchList,
    getListDataMerch,
  };
};
