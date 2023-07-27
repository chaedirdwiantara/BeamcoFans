import {BannerList} from '../interface/banner.interface';

export const defaultBanner: BannerList[] = [
  {
    id: 1,
    imageUrls: require('../assets/image/default_banner.png'),
    title: '',
    description: '',
    linkUrl: 'https://www.thebeam.co/',
    isDefault: true,
  },
];

export const listRequiredAccount: string[] = [
  'Setting.Preference.Label.Genre',
  'Setting.Account.Label.DateOfBirth',
  'Setting.Account.Label.Gender',
  'Setting.Account.Label.Location',
];

export const listRequiredProfile: string[] = ['Profile.Edit.DisplayProfile'];
