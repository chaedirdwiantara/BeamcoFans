import i18n from '../locale';

export interface ShowCreditType {
  title: string;
  content: string[];
}

export const dataShowCredit: ShowCreditType[] = [
  {
    title: i18n.t('Music.Credit.SingBy'),
    content: ['Imagine Dragons', 'The Weekend'],
  },
  {
    title: i18n.t('Music.Credit.Featuring'),
    content: ['Zedd'],
  },
  {
    title: i18n.t('Music.Credit.Format'),
    content: ['Album'],
  },
  {
    title: i18n.t('Music.Credit.Label'),
    content: ['Sony Entertainment'],
  },
  {
    title: i18n.t('Music.Credit.Genre'),
    content: ['Pop, Pop Batak'],
  },
  {
    title: i18n.t('Music.Credit.Release'),
    content: ['October 10, 2022'],
  },
  {
    title: i18n.t('Music.Credit.Copyright'),
    content: [
      '© Sony Entertainment',
      '℗ SM Entertainmenr',
      '® Anthony, Brian Alexander, Harry Cucumber',
    ],
  },
];
