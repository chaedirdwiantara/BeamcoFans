import create from 'zustand';
import {DataMissionStoreProps} from '../interface/reward.interface';

interface ClaimableStatusProps {
  storedDataMission: DataMissionStoreProps[];
  setStoredDataMission: (storedDataMission: DataMissionStoreProps[]) => void;
}

export const dataMissionStore = create<ClaimableStatusProps>(set => ({
  storedDataMission: [],
  setStoredDataMission: (value: DataMissionStoreProps[]) =>
    set({storedDataMission: value}),
}));
