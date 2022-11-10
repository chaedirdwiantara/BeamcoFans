import {ImageSourcePropType} from 'react-native';
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
