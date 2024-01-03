import {BaseResponseApi, imageTypes} from './base.interface';

export interface GetMissionProgressParams {
  task_type?: TaskType;
  //   amount_to_claim?: number;
  //   max_claim?: number;
  function: string;
  campaignId: number;
}

// Define a type for different reward functions
export type RewardListFunction =
  | 'complete-profile'
  | 'daily-sign-in'
  | 'refer-friend'
  | 'tip-live-tipping'
  | 'top-up-100-credits'
  | 'top-up-540-credits'
  | 'top-up-1200-credits'
  | 'top-up-6500-credits'
  | 'like-post'
  | 'vote-post'
  | 'comment-post'
  | 'follow-artist'
  | 'share-song-ig'
  | 'donation'
  | 'share-ig';

export type TaskType = 'daily' | 'based-reward' | 'one-time';

export interface DataMissionMaster {
  id: number;
  function: RewardListFunction;
  userType: 'Musician' | 'Fans';
  rewards: number;
  isInfinity: boolean;
  amountToClaim: number;
  taskName: string;
  taskImage: string;
  taskStartAt: string;
  taskEndAt: string;
  taskType: TaskType;
  amountType: number;
  maxClaim: number;
  campaignId: number;
  createdAt: string;
  updatedAt: string;
}

// Interface for mission details
export interface GetMissionMaster extends BaseResponseApi {
  data: DataMissionMaster[];
}

export interface DataListMissioProgress {
  function: RewardListFunction;
  userType: 'Musician' | 'Fans';
  userUUID: string;
  sumLoyaltyPoints: number;
  rowCount: number;
  isClaimed: boolean;
  isClaimable: boolean;
}

export interface GetMissionProgress extends BaseResponseApi {
  data: DataListMissioProgress;
}

export interface SetClaimMission extends BaseResponseApi {
  data: null;
}

export interface DataAvailableVoucher {
  id: number;
  title: string;
  titleHeader: string;
  startDate: string;
  endDate: string;
  subTitle: string;
  description: string;
  termsCondition: {
    title: string;
    value: string[];
  };
  imageUrl: imageTypes[];
  claimPoint: number;
  iconType: string;
  generateQty: number;
  isClaimable: boolean;
}

export interface DataMyVoucher {
  id: number;
  ownerUUID: string;
  ownerType: string;
  expiredDate: string;
  isRedeemed: boolean;
  voucher: {
    code: string;
    title: string;
    titleHeader: string;
    imageUrl: imageTypes[];
    claimPoint: number;
    iconType: string;
  };
  code: string;
  statusVoucher: string;
}

export interface GetAvailableVoucher extends BaseResponseApi {
  data: DataAvailableVoucher[];
}

export interface GetMyVoucher extends BaseResponseApi {
  data: DataMyVoucher[];
}

export interface SendVoucherReq {
  id: string;
  UUIDReceiver: string;
  usernameReceiver: string;
  fullnameReceiver: string;
  imageReceiver: string;
}
export interface DataMissionStoreProps {
  id: number;
  typeOnIndex: number;
  isClaimable: boolean;
}
