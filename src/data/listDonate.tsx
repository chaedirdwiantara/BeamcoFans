export interface ListDonateType {
  text: string;
  selected: boolean;
}

export const listDonate: ListDonateType[] = [
  {
    text: 'One Time Donation',
    selected: false,
  },
  {
    text: 'Donation Weekly',
    selected: false,
  },
  {
    text: 'Donation Monthly',
    selected: false,
  },
  {
    text: 'Donation Yearly',
    selected: false,
  },
];
