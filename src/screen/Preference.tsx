import React, {useEffect} from 'react';
import {View, StyleSheet, NativeModules} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../theme/Color';
import {heightResponsive} from '../utils';
import {RootStackParams} from '../navigations';
import {storage} from '../hooks/use-storage.hook';
import {ImageSlider, SsuStatusBar} from '../components';
import {useProfileHook} from '../hooks/use-profile.hook';
import {useSettingHook} from '../hooks/use-setting.hook';
import {UpdateProfilePropsType} from '../api/profile.api';
import {useMusicianHook} from '../hooks/use-musician.hook';
import {FollowMusicianPropsType} from '../interface/musician.interface';

const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;

export const PreferenceScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    infoStep,
    updateProfilePreference,
    getLastStepWizard,
    setLastStepWizard,
  } = useProfileHook();
  const {
    dataMusician,
    getListDataMusician,
    setFollowMusician,
    setUnfollowMusician,
  } = useMusicianHook();
  const {getListPreference, listPreference} = useSettingHook();
  useEffect(() => {
    getListDataMusician();
    getListPreference({perPage: 25});
    getLastStepWizard();
  }, []);

  const goToHome = () => {
    storage.set('isPreference', false);
    navigation.reset({
      index: 0,
      routes: [{name: 'MainTab'}],
    });
  };

  return (
    <View style={styles.root}>
      <SsuStatusBar type="black" />
      <ImageSlider
        type="Preference"
        data={listPreference}
        onPress={goToHome}
        onUpdatePreference={(props?: UpdateProfilePropsType) =>
          updateProfilePreference(props)
        }
        setFollowMusician={(props?: FollowMusicianPropsType) =>
          setFollowMusician(props, {}, true)
        }
        setUnfollowMusician={(props?: FollowMusicianPropsType) =>
          setUnfollowMusician(props, {}, true)
        }
        dataList={dataMusician}
        infoStep={infoStep}
        setLastStepWizard={setLastStepWizard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    paddingTop: heightResponsive(barHeight + 25),
  },
});
