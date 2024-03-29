import {ImageSourcePropType} from 'react-native';

export interface DataOnboardType {
  title: string;
  uri?: ImageSourcePropType;
  subtitle?: string | null;
}

export const dataOnboard: DataOnboardType[] = [
  {
    uri: require('../assets/background/onboard-1.jpg'),
    title: 'Onboarding.Step1.Title',
    subtitle: 'Onboarding.Step1.Description' || '',
  },
  {
    uri: require('../assets/background/onboard-2.jpg'),
    title: 'Onboarding.Step2.Title',
    subtitle: 'Onboarding.Step2.Description' || '',
  },
  {
    uri: require('../assets/background/onboard-3.jpg'),
    title: 'Onboarding.Step3.Title',
    subtitle: 'Onboarding.Step3.Description' || '',
  },
];
