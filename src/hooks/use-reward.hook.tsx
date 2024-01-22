import {useQuery} from 'react-query';
import {
  getMissionMasterEp,
  getMissionProgressEp,
  getAvailableVouchertEp,
  setClaimMissionEp,
  getMyVouchertEp,
  claimAvailVoucherEp,
  getBenefitEp,
  getDetailBenefitEp,
  getVoucherDetailBeforeClaim,
  getVoucherDetailRewards,
  getHistoryVoucher,
} from '../api/reward.api';
import {GetMissionProgressParams} from '../interface/reward.interface';
import {ParamsProps} from '../interface/base.interface';

export const useRewardHook = () => {
  const useGetMissionMaster = () => {
    return useQuery(['reward/get-mission-master'], () => getMissionMasterEp());
  };

  const useGetMissionProgress = (param: GetMissionProgressParams) => {
    return useQuery(
      [
        'reward/get-mission-progress',
        param.task_type,
        param.function,
        param.campaignId,
      ],
      () => getMissionProgressEp(param),
    );
  };

  const useSetClaimMission = (functionTxt: string | undefined) => {
    return useQuery(['reward/post-mission-claim'], () => {
      functionTxt !== undefined && setClaimMissionEp(functionTxt);
    });
  };

  const useGetAvailableVoucher = (param: ParamsProps) => {
    return useQuery(['reward/get-available-voucher'], () =>
      getAvailableVouchertEp(param),
    );
  };

  const useGetMyVoucher = (param: ParamsProps) => {
    return useQuery(['reward/get-my-voucher'], () => getMyVouchertEp(param));
  };

  const useGetHistoryVoucher = () => {
    return useQuery(['reward/history-voucher'], () => getHistoryVoucher());
  };

  const useClaimMyVoucher = (voucherId: number | undefined) => {
    return useQuery(['reward/claim-voucher'], () => {
      voucherId !== undefined && claimAvailVoucherEp(voucherId);
    });
  };

  const useVoucherDetailBeforeClaim = (id?: number) => {
    return useQuery([`voucher/detail/${id}`], () =>
      id !== undefined ? getVoucherDetailBeforeClaim(id) : null,
    );
  };

  const useMyVoucherDetail = (codeGenerated?: string) => {
    return useQuery([`my-voucher/detail/${codeGenerated}`], () =>
      codeGenerated !== undefined
        ? getVoucherDetailRewards(codeGenerated)
        : null,
    );
  };

  const useGetBenefit = (param: ParamsProps) => {
    return useQuery(['reward/get-benefit'], () => getBenefitEp(param));
  };

  const useGetDetailBenefit = (param: ParamsProps) => {
    return useQuery(['reward/get-detail-benefit'], () =>
      getDetailBenefitEp(param),
    );
  };

  return {
    useGetMissionMaster,
    useGetMissionProgress,
    useSetClaimMission,
    useGetAvailableVoucher,
    useGetMyVoucher,
    useGetHistoryVoucher,
    useClaimMyVoucher,
    useGetBenefit,
    useGetDetailBenefit,
    useVoucherDetailBeforeClaim,
    useMyVoucherDetail,
  };
};
