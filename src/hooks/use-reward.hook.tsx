import {useQuery} from 'react-query';
import {
  getMissionMasterEp,
  getMissionProgressEp,
  getAvailableVouchertEp,
  setClaimMissionEp,
  getMyVouchertEp,
  claimAvailVoucherEp,
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

  const useSetClaimMission = (param: GetMissionProgressParams) => {
    return useQuery(['reward/post-mission-claim'], () =>
      setClaimMissionEp(param),
    );
  };

  const useGetAvailableVoucher = () => {
    return useQuery(['reward/get-available-voucher'], () =>
      getAvailableVouchertEp(),
    );
  };

  const useGetMyVoucher = () => {
    return useQuery(['reward/get-my-voucher'], () => getMyVouchertEp());
  };

  const useClaimMyVoucher = (voucherId: number) => {
    return useQuery(['reward/claim-voucher'], () =>
      claimAvailVoucherEp(voucherId),
    );
  };

  return {
    useGetMissionMaster,
    useGetMissionProgress,
    useSetClaimMission,
    useGetAvailableVoucher,
    useGetMyVoucher,
    useClaimMyVoucher,
  };
};
