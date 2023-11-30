import {useQuery} from 'react-query';
import {
  getMissionMasterEp,
  getMissionProgressEp,
  getAvailableVouchertEp,
  setClaimMissionEp,
  getMyVouchertEp,
  claimAvailVoucherEp,
  getEventVoucherDetailRewards,
} from '../api/reward.api';
import {GetMissionProgressParams} from '../interface/reward.interface';

export const useRewardHook = () => {
  const useGetMissionMaster = () => {
    return useQuery(['reward/get-mission-master'], () => getMissionMasterEp());
  };

  const useGetMissionProgress = (param: GetMissionProgressParams) => {
    return useQuery(
      ['reward/get-mission-progress', param.task_type, param.function],
      () => getMissionProgressEp(param),
    );
  };

  const useSetClaimMission = (functionTxt: string | undefined) => {
    return useQuery(['reward/post-mission-claim'], () => {
      functionTxt !== undefined && setClaimMissionEp(functionTxt);
    });
  };

  const useGetAvailableVoucher = () => {
    return useQuery(['reward/get-available-voucher'], () =>
      getAvailableVouchertEp(),
    );
  };

  const useGetMyVoucher = () => {
    return useQuery(['reward/get-my-voucher'], () => getMyVouchertEp());
  };

  const useClaimMyVoucher = (voucherId: number | undefined) => {
    return useQuery(['reward/claim-voucher'], () => {
      voucherId !== undefined && claimAvailVoucherEp(voucherId);
    });
  };

  const useEventVoucherDetail = (id: string) => {
    return useQuery([`event/voucher/detail/${id}`], () =>
      getEventVoucherDetailRewards(id),
    );
  };

  return {
    useGetMissionMaster,
    useGetMissionProgress,
    useSetClaimMission,
    useGetAvailableVoucher,
    useGetMyVoucher,
    useClaimMyVoucher,
    useEventVoucherDetail,
  };
};
