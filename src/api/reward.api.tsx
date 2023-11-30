import {
  GetAvailableVoucher,
  GetMissionMaster,
  GetMissionProgress,
  GetMissionProgressParams,
  GetMyVoucher,
  SendVoucherReq,
  SetClaimMission,
} from '../interface/reward.interface';
import SsuAPI from './baseRinjani';
import SsuKrakatauAPI from './baseKrakatau';
import {
  ClaimVoucherResponse,
  GetVoucherListDetailResponse,
} from '../interface/event.interface';

export const getMissionMasterEp = async (): Promise<GetMissionMaster> => {
  const {data} = await SsuAPI().request<GetMissionMaster>({
    url: '/missions',
    method: 'GET',
  });

  return data;
};

export const getMissionProgressEp = async (
  params: GetMissionProgressParams,
): Promise<GetMissionProgress> => {
  const {data} = await SsuAPI().request<GetMissionProgress>({
    url: `/missions/progress/${params.function}`,
    method: 'GET',
    params: {task_type: params.task_type},
  });

  return data;
};

export const setClaimMissionEp = async (
  functionTxt: string | undefined,
): Promise<SetClaimMission> => {
  const {data} = await SsuAPI().request<SetClaimMission>({
    url: `fans-app/missions/${functionTxt}/claim`,
    method: 'POST',
  });

  return data;
};

export const getAvailableVouchertEp =
  async (): Promise<GetAvailableVoucher> => {
    const {data} = await SsuKrakatauAPI().request<GetAvailableVoucher>({
      url: `/vouchers`,
      method: 'GET',
      params: {
        filter_column: 'generate_type',
        filter_value: 'loyalty_point_based',
      },
    });

    return data;
  };

export const getMyVouchertEp = async (): Promise<GetMyVoucher> => {
  const {data} = await SsuKrakatauAPI().request<GetMyVoucher>({
    url: `/vouchers`,
    method: 'GET',
    params: {
      withUser: true,
      filter_column: 'generate_type',
      filter_value: 'loyalty_point_based',
    },
  });

  return data;
};

export const claimAvailVoucherEp = async (
  voucherId: number | undefined,
): Promise<SetClaimMission> => {
  const {data} = await SsuKrakatauAPI().request<SetClaimMission>({
    url: `/vouchers/loyalty/${voucherId}/claim`,
    method: 'POST',
  });

  return data;
};

export const getEventVoucherDetailRewards = async (
  id: string,
): Promise<GetVoucherListDetailResponse> => {
  const {data} = await SsuKrakatauAPI().request<GetVoucherListDetailResponse>({
    url: `/vouchers/loyalty/${id}/detail`,
    method: 'GET',
  });

  return data;
};

export const transferVoucher = async (
  params: SendVoucherReq,
): Promise<ClaimVoucherResponse> => {
  const {data} = await SsuKrakatauAPI().request<ClaimVoucherResponse>({
    url: `/vouchers/loyalty/${params.id}/transfer`,
    method: 'POST',
    data: params,
  });

  return data;
};
