export interface DataRewardMenuType {
  value: string;
  label: string;
}
export const rewardMenu: DataRewardMenuType[] = [
  {
    value: '1',
    label: 'Rewards',
  },
  {
    value: '2',
    label: 'Mission',
  },
];

export const missionMenu: DataRewardMenuType[] = [
  {
    value: '1',
    label: 'Daily Mission',
  },
  {
    value: '2',
    label: 'One-time',
  },
  {
    value: '3',
    label: 'Repeatable',
  },
];
