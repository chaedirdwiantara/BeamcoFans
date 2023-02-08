import {ImageSourcePropType} from 'react-native';

export interface DataOnboardType {
  title: string;
  uri?: ImageSourcePropType;
  subtitle?: string;
}

export const dataOnboard: DataOnboardType[] = [
  {
    uri: require('../assets/background/onboard-1.png'),
    title: "Become a Part of Your Favourite Musician's Story",
    subtitle:
      "We're excited to welcome you to our community of musicians and fans",
  },
  {
    uri: require('../assets/background/onboard-2.png'),
    title: 'Grow With Your Favourite Musicians',
    subtitle:
      'Our tools enable you to personally support the growth and success of your favourite musicians',
  },
  {
    uri: require('../assets/background/onboard-3.png'),
    title: 'Get Rewarded and Recognised',
    subtitle:
      "We're all about enabling musicians and fans growing together. So flex your clout as the No.1 superfan",
  },
];
