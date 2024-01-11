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
  data: {
    id: number;
    codeGenerated: string;
  };
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
  isLimitedClaim: boolean;
  stock: number;
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
    startDate: string;
    endDate: string;
  };
  code: string;
  statusVoucher: string;
  codeGenerated: string;
}

export interface DataHistoryVoucher {
  id: number;
  voucher: {
    id: number;
    title: string;
    imageUrl: imageTypes[];
    claimPoint: number;
  };
  statusVoucher: string;
  date: string;
  transferLog: {
    isTransfer: boolean;
    uuid: string;
    username: string;
    fullname: string;
    image: string;
  };
  codeGenerated: string;
}

export interface GetAvailableVoucher extends BaseResponseApi {
  data: DataAvailableVoucher[];
}

export interface GetMyVoucher extends BaseResponseApi {
  data: DataMyVoucher[];
}

export interface GetHistoryVoucher extends BaseResponseApi {
  data: DataHistoryVoucher[];
}

export interface DataVoucherListDetail {
  id: number;
  ownerUUID: string;
  ownerType: string;
  expiredDate: string;
  isRedeemed: boolean;
  isAvailable: boolean;
  code: string;
  title: string;
  startDate: string;
  endDate: string;
  subTitle: string;
  description: string;
  termsCondition: {
    title: string;
    value: string[];
  };
  imageUrl: imageTypes[];
  quotaLeft: number;
  claimPoint: number;
  stock: number;
  expiredDays: number;
  isClaimable: boolean;
  isLimitedClaim: boolean;
  status: {
    buttonDisabled: boolean;
    text: string;
  };
}

export interface DataVoucherDetailBeforeClaim {
  id: number;
  title: string;
  imageUrl: imageTypes[];
  generateType: string;
  claimPoint: number;
  stock: number;
  expiredDays: number;
  description: string;
  termsCondition: {
    title: string;
    value: string[];
  };
  isClaimable: boolean;
  isLimitedClaim: boolean;
  isRedeemed: boolean;
  status: {
    buttonDisabled: boolean;
    text: string;
  };
  endDate: string;
  expiredDate: string;
}

export interface GetVoucherListDetailResponse extends BaseResponseApi {
  data: DataVoucherListDetail;
}

export interface GetVoucherDetailBeforeClaimResponse extends BaseResponseApi {
  data: DataVoucherDetailBeforeClaim;
}

export interface ClaimVoucherResponse extends BaseResponseApi {
  data: null;
}

export interface SendVoucherReq {
  voucherid: number;
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

export interface DataBenefitProps {
  id: number;
  title: string;
  imageUrl: imageTypes[];
  type: string;
  tier: {
    value: number;
    name: string;
  };
}
export interface GetBenefits extends BaseResponseApi {
  data: DataBenefitProps[];
}
export interface DataDetailBenefitProps {
  id: number;
  title: string;
  description: string;
  tnc: {
    title: string;
    value: string[];
  };
  imageUrl: imageTypes[];
  type: string;
  tier: {
    value: number;
    name: string;
  };
}
export interface DetailBenefitsResponse extends BaseResponseApi {
  data: DataDetailBenefitProps;
}
