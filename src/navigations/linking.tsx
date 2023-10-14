import {Linking} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {LinkingOptions} from '@react-navigation/native';
import {RootStackParams} from './index';

const linking: LinkingOptions<RootStackParams> = {
  prefixes: ['https://thebeam.co', 'beamco://app'],
  async getInitialURL() {
    const link = await dynamicLinks().getInitialLink();
    if (link !== null) {
      return link.url;
    }
  },
  subscribe: listener => {
    // @ts-ignore
    const onReceiveURL = ({url}) => {
      listener(url);
    };
    Linking.addEventListener('url', onReceiveURL);
    const unsubscribe = dynamicLinks().onLink(onReceiveURL);

    return () => {
      // @ts-ignore
      Linking.removeEventListener('url', onReceiveURL);
      unsubscribe();
    };
  },
  config: {
    screens: {
      // TODO: path to specific screen
    },
  },
};

export default linking;
