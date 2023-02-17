import i18n from '../locale';

export interface ListDonateType {
  text: string;
  selected: boolean;
}

export const listDonate: ListDonateType[] = [
  {
    text: i18n.t('Setting.Tips.Filter.OneTime'),
    selected: false,
  },
  {
    text: i18n.t('Setting.Tips.Filter.Weekly'),
    selected: false,
  },
  {
    text: i18n.t('Setting.Tips.Filter.Monthly'),
    selected: false,
  },
  {
    text: i18n.t('Setting.Tips.Filter.Yearly'),
    selected: false,
  },
];
