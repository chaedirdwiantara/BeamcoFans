import VersionCheck from 'react-native-version-check';
import DeviceInfo from 'react-native-device-info';
import {useQuery} from 'react-query';
import {Platform} from 'react-native';
import semver from 'semver';
import {VersionInfoPropsType} from '../interface/version.interface';
import {versionInfo} from '../api/version.api';
import {queryClient} from '../service/queryClient';
import {storage} from '../hooks/use-storage.hook';
import {useAuthHook} from './use-auth.hook';

interface ICheckVersion {
  forceUpdate: boolean;
  showUpdate: boolean;
}

export const useVersionHook = () => {
  const {onLogout} = useAuthHook();
  const saveVersionStorage = () => {
    storage.set('versionBeam', DeviceInfo.getVersion());
  };

  const checkVersion = async (): Promise<ICheckVersion | undefined> => {
    let resultCheck: ICheckVersion = {
      forceUpdate: false,
      showUpdate: false,
    };
    try {
      let propsVersion = {
        platform: Platform.OS,
      };
      const data = await queryClient.fetchQuery({
        queryKey: ['versionInfo', propsVersion],
        queryFn: () => versionInfo(propsVersion),
      });
      const marketVersion = await storeVersion();
      const backendVersion = data.data.version as string;
      const currentVersion = DeviceInfo.getVersion();
      const storageVersion = storage.getString('versionBeam');
      if (semver.gt(marketVersion, currentVersion)) {
        if (semver.eq(marketVersion, backendVersion)) {
          resultCheck.showUpdate = true;
          resultCheck.forceUpdate = data.data.forceUpdate as boolean;
        }
      } else {
        resultCheck.forceUpdate = false;
        resultCheck.showUpdate = false;
      }
      if (storageVersion && semver.neq(currentVersion, storageVersion)) {
        await onLogout();
      }
      return resultCheck;
    } catch (error) {
      return resultCheck;
    }
  };

  const storeVersion = async (): Promise<string> => {
    const latestVersion = VersionCheck.getLatestVersion().then(version => {
      return version;
    });
    return latestVersion;
  };

  const versionCheckInfo = (props: VersionInfoPropsType) =>
    useQuery({
      queryKey: ['versionInfo', props],
      queryFn: () => versionInfo(props),
    });

  return {
    saveVersionStorage,
    checkVersion,
    storeVersion,
    versionCheckInfo,
  };
};
