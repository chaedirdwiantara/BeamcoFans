import {UseInfiniteQueryOptions, useInfiniteQuery, useQuery} from 'react-query';
import {
  fetchListOrder,
  getEventDetail,
  getEventLineUp,
  getEventLiveRank,
  getEventMusicianTipped,
  getEventTopTipper,
  getStatusLiveMusician,
  listConcert,
  listEventHome,
  listEventHomePublic,
  listEventMusician,
  listMerch,
  searchEvent,
} from '../api/event.api';
import {
  OrderListBookyay,
  RequestPropsListMerch,
} from '../interface/event.interface';
import {ParamsProps} from '../interface/base.interface';
import {AxiosError} from 'axios';

export const useEventHook = () => {
  const getListDataMerch = async (props: RequestPropsListMerch) => {
    try {
      const response = await listMerch(props);
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getListDataConcert = async () => {
    try {
      const response = await listConcert();
      return {
        data: response?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const searchListDataMerch = async (props: RequestPropsListMerch) => {
    try {
      const response = await searchEvent({...props, type: 'product'});
      return {
        data: response?.data,
        total: response?.total,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const searchListDataTicket = async (props: RequestPropsListMerch) => {
    try {
      const response = await searchEvent({...props, type: 'event'});
      return {
        data: response?.data,
        total: response?.total,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const useEventHome = (params?: ParamsProps, isLogin?: boolean) => {
    return useQuery(
      [`event/home/${isLogin ? 'login' : 'public'}`],
      () => (isLogin ? listEventHome(params) : listEventHomePublic(params)),
      {
        enabled: false,
      },
    );
  };

  const useEventMusician = (uuid: string, params?: ParamsProps) => {
    return useQuery(
      [`event/musician/${uuid}`],
      () => listEventMusician(uuid, params),
      {
        enabled: false,
      },
    );
  };
  const useEventDetail = (id: string, params?: ParamsProps) => {
    return useQuery([`event/detail/${id}`], () => getEventDetail(id, params), {
      enabled: false,
    });
  };
  const useEventLineUp = (id: string, params?: ParamsProps) => {
    return useQuery(
      [`event/detail/lineup/${id}`],
      () => getEventLineUp(id, params),
      {
        enabled: false,
      },
    );
  };

  const useEventTopTipper = (events: string, params?: ParamsProps) => {
    return useQuery(
      [`event/detail/toptipper/${events}`],
      () => getEventTopTipper(events, params),
      {
        enabled: false,
      },
    );
  };

  const useEventMusicianTipped = (
    tipperuuid: string,
    event_id: string,
    params?: ParamsProps,
  ) => {
    return useQuery(
      [`event/detail/toptipper/${tipperuuid}/${event_id}`],
      () => getEventMusicianTipped(tipperuuid, event_id, params),
      {
        enabled: false,
      },
    );
  };

  const useOrderListBookYay = (
    token: string,
    totalPage: number,
    params?: ParamsProps,
    options?: UseInfiniteQueryOptions<
      OrderListBookyay,
      AxiosError,
      OrderListBookyay
    >,
  ) => {
    return useInfiniteQuery({
      queryKey: ['bookyay-order-' + token],
      enabled: false,
      queryFn: ({pageParam = 1}) =>
        fetchListOrder(token, {...params, page: pageParam, pageSize: 10}),
      keepPreviousData: true,
      ...options,
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

  const useEventMusicianLiveStatus = (eventId: string, musicianId: string) => {
    return useQuery(
      [`event/${eventId}/${musicianId}`],
      () => getStatusLiveMusician(eventId, musicianId),
      {
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
      },
    );
  };

  const useEventRankerLiveTipping = (
    events: string,
    musician?: string,
    params?: ParamsProps,
  ) => {
    return useQuery(
      [`event/detail/toptipper/${events}`],
      () => getEventLiveRank(events, musician, params),
      {
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
      },
    );
  };

  return {
    getListDataMerch,
    getListDataConcert,
    searchListDataMerch,
    searchListDataTicket,
    useEventHome,
    useEventMusician,
    useEventDetail,
    useEventLineUp,
    useOrderListBookYay,
    useEventTopTipper,
    useEventMusicianTipped,
    useEventMusicianLiveStatus,
    useEventRankerLiveTipping,
  };
};
