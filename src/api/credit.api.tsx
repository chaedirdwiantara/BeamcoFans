import SsuAPI from './baseKrakatau';
import SsuAPIRinjani from './baseRinjani';
import {
  CreateDonationParams,
  CreateIapPropsType,
  CreateIapResponseType,
  CreditResponseType,
  GetTransactionHistoryResponseType,
  LiveTippingParams,
  SessionPurchaseProps,
  SessionPurchaseResponseType,
  SubsECParams,
} from '../interface/credit.interface';

export const getCredit = async (): Promise<CreditResponseType> => {
  const {data} = await SsuAPI().request<CreditResponseType>({
    url: '/credit',
    method: 'GET',
  });

  return data;
};

export const createDonation = async (
  props?: CreateDonationParams,
): Promise<any> => {
  const {data} = await SsuAPI().request<any>({
    url: '/donation/donate',
    method: 'POST',
    data: props,
  });

  return data;
};

export const stopDonation = async (id?: string): Promise<any> => {
  const {data} = await SsuAPI().request<any>({
    url: `/donation/stop-recurring-donation/${id}`,
    method: 'POST',
  });

  return data;
};

export const checkSubsEC = async (musicianID: string): Promise<any> => {
  const {data} = await SsuAPIRinjani().request<any>({
    url: '/fans-app/subscriptions/check',
    method: 'POST',
    data: {
      musicianID: musicianID,
    },
  });

  return data;
};

export const subsEC = async (props?: SubsECParams): Promise<any> => {
  const {data} = await SsuAPIRinjani().request<any>({
    url: '/fans-app/subscriptions/subscribe',
    method: 'POST',
    data: props,
  });

  return data;
};

export const unsubsEC = async (id?: string): Promise<any> => {
  const {data} = await SsuAPIRinjani().request<any>({
    url: `/fans-app/subscriptions/${id}/unsubscribe`,
    method: 'POST',
  });

  return data;
};

export const getListTips = async ({
  page,
  perPage,
  filterColumn,
  filterValue,
}: {
  page: number;
  perPage: number;
  filterColumn: string[];
  filterValue: number[] | string[];
}): Promise<any> => {
  const {data} = await SsuAPI().request<any>({
    url: '/donation',
    method: 'GET',
    params: {
      page: page,
      per_page: perPage,
      filter_column: filterColumn,
      filter_value: filterValue,
    },
  });

  return data;
};

export const getListSubs = async ({
  page,
  perPage,
  durationUnit,
  status,
}: {
  page: number;
  perPage: number;
  durationUnit: '' | 'weekly' | 'monthly' | 'yearly' | string;
  status: 'current' | 'past';
}): Promise<any> => {
  const {data} = await SsuAPIRinjani().request<any>({
    url: '/fans-app/subscriptions',
    method: 'GET',
    params: {
      page: page,
      perPage: perPage,
      durationUnit: durationUnit,
      status: status,
    },
  });

  return data;
};

export const generateSessionPurchase = async (
  props: SessionPurchaseProps,
): Promise<SessionPurchaseResponseType> => {
  const {data} = await SsuAPI().request<SessionPurchaseResponseType>({
    url: '/trx/session/generate',
    method: 'GET',
    headers: {
      'Device-Id': props.deviceId,
    },
  });

  return data;
};

export const createIapApple = async (
  props: CreateIapPropsType,
): Promise<CreateIapResponseType> => {
  const {data} = await SsuAPI().request<CreateIapResponseType>({
    url: '/transaction/iap/apple',
    method: 'POST',
    data: props,
    headers: {
      'Device-Id': props.deviceId,
      'Transaction-Session': props.trxSession,
    },
  });

  return data;
};

export const createIapGoogle = async (
  props: CreateIapPropsType,
): Promise<CreateIapResponseType> => {
  const {data} = await SsuAPI().request<CreateIapResponseType>({
    url: '/transaction/iap/google',
    method: 'POST',
    data: props,
    headers: {
      'Device-Id': props.deviceId,
      'Transaction-Session': props.trxSession,
    },
  });

  return data;
};

export const getHistoryTransaction =
  async (): Promise<GetTransactionHistoryResponseType> => {
    const {data} = await SsuAPI().request<GetTransactionHistoryResponseType>({
      url: '/trx/record',
      method: 'GET',
    });

    return data;
  };

export const liveTipping = async (props?: LiveTippingParams): Promise<any> => {
  const {data} = await SsuAPI().request<any>({
    url: '/donation/tipping',
    method: 'POST',
    data: props,
  });

  return data;
};
