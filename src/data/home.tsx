import {BannerList} from '../interface/banner.interface';

export const defaultBanner: BannerList[] = [
  {
    id: 1,
    imageUrls: require('../assets/image/default_banner.png'),
    title: '',
    description: '',
    linkUrl: 'https://sunnysideup.io',
    isDefault: true,
  },
];

export const listRequiredAccount: string[] = [
  'Setting.Account.Label.DateOfBirth',
  'Setting.Account.Label.Gender',
  'Setting.Account.Label.Location',
  'Setting.Preference.Label.Genre',
];

export const listRequiredProfile: string[] = ['Profile.Edit.DisplayProfile'];
