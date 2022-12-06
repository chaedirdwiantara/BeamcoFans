export interface DataCountryType {
  value: string;
  label: string;
  image: string;
  code: string;
}
export const countryData: DataCountryType[] = [
  {
    value: '1',
    label: 'US',
    image: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    code: '+1',
  },
  {
    value: '2',
    label: 'ID',
    image: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    code: '+62',
  },
  {
    value: '3',
    label: 'JP',
    image: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    code: '+81',
  },
  {
    value: '4',
    label: 'IN',
    image: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    code: '+91',
  },
  {
    value: '5',
    label: 'UK',
    image: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    code: '+44',
  },
];

export interface DataDropDownType {
  label: string;
  value: string;
}

export const dropDownDataCategory: DataDropDownType[] = [
  {label: 'All', value: '1'},
  {label: 'Coming Up', value: '2'},
  {label: 'Tour', value: '3'},
  {label: 'Daily Life', value: '4'},
  {label: 'Behind The Scene', value: '5'},
  {label: 'Highlight Post', value: '6'},
  {label: 'Backstage', value: '7'},
];

export interface DropDownFilterType {
  label: string;
  value: string;
}

export const dropDownDataFilter: DropDownFilterType[] = [
  {label: 'Today', value: '1'},
  {label: 'Last Week', value: '7'},
  {label: 'This Month', value: '30'},
];

export interface DropDownSortType {
  label: string;
  value: string;
}

export const dropDownDataSort: DropDownSortType[] = [
  {label: 'Latest', value: '1'},
  {label: 'Popular', value: '2'},
];

export const dropDownDataSubscription: DataDropDownType[] = [
  {label: 'All', value: '1'},
  {label: 'One Time', value: '2'},
  {label: 'Weekly', value: '3'},
  {label: 'Monthly', value: '4'},
  {label: 'Yearly', value: '5'},
];

export const dropDownHeaderAlbum: DataDropDownType[] = [
  {label: 'Add to Queue', value: '1'},
  {label: 'Share Album', value: '2'},
  {label: 'Add to My Playlist', value: '3'},
];

export const dropDownHeaderSongDetails: DataDropDownType[] = [
  {label: 'Add to Playlist', value: '1'},
  {label: 'Add to Queue', value: '2'},
  {label: 'Share Music', value: '3'},
  {label: 'Show Credits', value: '4'},
];

export const dropDownSubscription: DataDropDownType[] = [
  {label: 'Go To Musician', value: '1'},
  {label: 'Unsubscribe', value: '2'},
];
