import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../App';
import {ImageSlider, SsuStatusBar} from '../components';
import Color from '../theme/Color';
import {dataFavourites} from '../data/preference';
import {useProfileHook} from '../hooks/use-profile.hook';
import {UpdateProfilePropsType} from '../api/profile.api';
import {useMusicianHook} from '../hooks/use-musician.hook';

export const PreferenceScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {updateProfilePreference} = useProfileHook();
  const {dataMusician, getListDataMusician} = useMusicianHook();

  useEffect(() => {
    getListDataMusician();
  }, []);

  const goToScreenReferral = () => {
    navigation.navigate('Referral');
  };

  return (
    <View style={styles.root}>
      <SsuStatusBar type="black" />
      <ImageSlider
        type="Preference"
        data={dataFavourites}
        onPress={goToScreenReferral}
        onUpdatePreference={(props?: UpdateProfilePropsType) =>
          updateProfilePreference(props)
        }
        dataList={dataMusician}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Dark[800],
  },
});
