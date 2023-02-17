import i18n from '../locale';

export interface ListPlanType {
  title: string;
  subtitle: string;
  coin: string;
  selected: boolean;
}

export const listPlan: ListPlanType[] = [
  {
    title: i18n.t('ExclusiveContent.Weekly'),
    subtitle:
      'You will get 1 Week exclusive content with 3 days grace period, you can cancel it anytime.',
    coin: `100 Coin / ${i18n.t('ExclusiveContent.Week')}`,
    selected: false,
  },
  {
    title: i18n.t('ExclusiveContent.Monthly'),
    subtitle:
      'You will get 1 Month exclusive content with 3 days grace period, you can cancel it anytime.',
    coin: `400 Coin / ${i18n.t('ExclusiveContent.Month')}`,
    selected: false,
  },
  {
    title: i18n.t('ExclusiveContent.Yearly'),
    subtitle:
      'You will get 1 Year exclusive content with 3 days grace period, you can cancel it anytime.',
    coin: `4,800 Coin / ${i18n.t('ExclusiveContent.Year')}`,
    selected: false,
  },
];
