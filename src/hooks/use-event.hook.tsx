import {UseInfiniteQueryOptions, useInfiniteQuery, useQuery} from 'react-query';
import {
  checkIsGeneratedTopupVoucher,
  checkVoucherAvail,
  fetchListOrder,
  getEventDetail,
  getEventDetailVoucher,
  getEventLineUp,
  getEventLiveRank,
  getEventMusicianTipped,
  getEventTopTipper,
  getEventVoucher,
  getEventVoucherList,
  getEventVoucherListDetail,
  getStatusLiveMusician,
  listConcert,
  listEventHome,
  listEventHomePublic,
  listEventMusician,
  listMerch,
  searchEvent,
} from '../api/event.api';
import {
  CheckIsGeneratedTopupVoucherReq,
  GenerateVoucherReq,
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
    return useInfiniteQuery({
      queryKey: [`event/home/${isLogin ? 'login' : 'public'}`],
      enabled: true,
      queryFn: ({pageParam = 1}) =>
        isLogin
          ? listEventHome({...params, page: pageParam, perPage: 3})
          : listEventHomePublic({...params, page: pageParam, perPage: 3}),
      keepPreviousData: false,
      getNextPageParam: lastPage => {
        if (
          (lastPage?.data?.length as number) < Math.ceil(lastPage?.meta?.total)
        ) {
          const nextPage = (lastPage?.meta?.page as number) + 1;
          return nextPage;
        }
        return null;
      },
      getPreviousPageParam: () => null,
    });
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
        enabled: true,
        refetchInterval: 3000,
        refetchIntervalInBackground: true,
      },
    );
  };

  const useEventTopTipper = (events: string, params?: ParamsProps) => {
    return useQuery(
      [`event/detail/toptipper/${events}`],
      () => getEventTopTipper(events, params),
      {
        enabled: true,
        refetchInterval: 3000,
        refetchIntervalInBackground: true,
      },
    );
  };

  const useEventMusicianTipped = (
    tipperuuid: string,
    event_id: string,
    params?: ParamsProps,
  ) => {
    return useQuery(
      [`event/detail/musician-tipped/${tipperuuid}/${event_id}`],
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
        refetchInterval: 3000,
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
      [`event/detail/ranker-live/${events}`],
      () => getEventLiveRank(events, musician, params),
      {
        refetchInterval: 3000,
        refetchIntervalInBackground: true,
      },
    );
  };
  const useEventGenerateVoucher = (params: GenerateVoucherReq) => {
    return useQuery([`event/voucher/${params?.eventId}`], () =>
      getEventVoucher(params),
    );
  };

  const useEventDetailVoucher = (eventId: string) => {
    return useQuery([`event/voucher/detail/${eventId}`], () =>
      getEventDetailVoucher(eventId),
    );
  };

  const useEventVoucherList = (eventId: string) => {
    return useQuery([`event/voucher/list/${eventId}`], () =>
      getEventVoucherList(eventId),
    );
  };

  const useEventVoucherListDetail = (voucherId: string) => {
    return useQuery([`event/voucher/list/detail/${voucherId}`], () =>
      getEventVoucherListDetail(voucherId),
    );
  };

  const useEventCheckGeneratedTopupVoucher = (
    params: CheckIsGeneratedTopupVoucherReq,
  ) => {
    return useQuery(
      [`event/check-voucher-topup/${params?.userUUID}/${params?.eventId}`],
      () => checkIsGeneratedTopupVoucher(params),
      {enabled: !!params.eventId},
    );
  };

  const useEventCheckGeneratedTopupVoucherHome = (
    params: CheckIsGeneratedTopupVoucherReq,
  ) => {
    return useQuery(
      [`event/check-voucher-topup-home/${params?.userUUID}/${params?.eventId}`],
      () => checkIsGeneratedTopupVoucher(params),
      {enabled: !!params.eventId},
    );
  };

  const useCheckAvailVoucher = (generateType: string, enabled?: boolean) => {
    return useQuery(
      ['event/check-voucher'],
      () => checkVoucherAvail(generateType),
      {enabled},
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
    useEventGenerateVoucher,
    useEventDetailVoucher,
    useEventVoucherList,
    useEventVoucherListDetail,
    useEventCheckGeneratedTopupVoucher,
    useEventCheckGeneratedTopupVoucherHome,
    useCheckAvailVoucher,
  };
};
