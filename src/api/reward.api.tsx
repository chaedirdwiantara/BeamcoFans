import {
  DetailBenefitsResponse,
  GetAvailableVoucher,
  GetBenefits,
  GetHistoryVoucher,
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
  GetVoucherDetailBeforeClaimResponse,
  GetVoucherListDetailResponse,
} from '../interface/reward.interface';
import SsuAPIKrakatau from './baseKrakatau';
import {ParamsProps} from '../interface/base.interface';

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
    params: {task_type: params.task_type, campaignId: params.campaignId},
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

export const getAvailableVouchertEp = async (
  params: ParamsProps,
): Promise<GetAvailableVoucher> => {
  const {data} = await SsuKrakatauAPI().request<GetAvailableVoucher>({
    url: `/vouchers`,
    method: 'GET',
    params: {
      filter_column: 'generate_type',
      filter_value: 'loyalty_point_based',
      page: params.page,
      per_Page: params.perPage,
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

export const getHistoryVoucher = async (): Promise<GetHistoryVoucher> => {
  const {data} = await SsuKrakatauAPI().request<GetHistoryVoucher>({
    url: `/vouchers/history`,
    method: 'GET',
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

export const getVoucherDetailRewards = async (
  codeGenerated: string,
): Promise<GetVoucherListDetailResponse> => {
  const {data} = await SsuKrakatauAPI().request<GetVoucherListDetailResponse>({
    url: `/vouchers/my-voucher/${codeGenerated}/detail`,
    method: 'GET',
  });

  return data;
};

export const getVoucherDetailBeforeClaim = async (
  id: number,
): Promise<GetVoucherDetailBeforeClaimResponse> => {
  const {data} =
    await SsuKrakatauAPI().request<GetVoucherDetailBeforeClaimResponse>({
      url: `/vouchers/detail/${id}`,
      method: 'GET',
    });

  return data;
};

export const transferVoucher = async (
  params: SendVoucherReq,
): Promise<ClaimVoucherResponse> => {
  const {data} = await SsuKrakatauAPI().request<ClaimVoucherResponse>({
    url: `/vouchers/loyalty/${params.voucherid}/gift`,
    method: 'POST',
    data: params,
  });

  return data;
};

export const getBenefitEp = async (
  params: ParamsProps,
): Promise<GetBenefits> => {
  const {data} = await SsuAPIKrakatau().request<GetBenefits>({
    url: `/benefits/tier/${params.id}`,
    method: 'GET',
  });

  return data;
};

export const getDetailBenefitEp = async (
  params: ParamsProps,
): Promise<DetailBenefitsResponse> => {
  const {data} = await SsuAPIKrakatau().request<DetailBenefitsResponse>({
    url: `/benefits/detail/${params.id}`,
    method: 'GET',
  });

  return data;
};
