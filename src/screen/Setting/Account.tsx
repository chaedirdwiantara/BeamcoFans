import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {AccountContent} from '../../components';
import {RootStackParams} from '../../navigations';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {useSettingHook} from '../../hooks/use-setting.hook';
import {useLocationHook} from '../../hooks/use-location.hook';

export const AccountScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {dataProfile, getProfileUser} = useProfileHook();
  const {
    dataAllCountry,
    dataCitiesOfCountry,
    getDataAllCountry,
    getCitiesOfCountry,
  } = useLocationHook();
  const {getListMoodGenre, listGenre, listMood} = useSettingHook();

  const [selectedCountry, setSelectedCountry] = useState<string>(
    dataProfile?.data.locationCountry || '',
  );

  useEffect(() => {
    getProfileUser();
    getDataAllCountry();
    getListMoodGenre({page: 0, perPage: 30});
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getCitiesOfCountry({country: selectedCountry});
    }
  }, [selectedCountry]);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      {dataProfile && (
        <AccountContent
          dataAllCountry={dataAllCountry !== undefined ? dataAllCountry : []}
          profile={dataProfile}
          moods={listMood}
          genres={listGenre}
          onPressGoBack={onPressGoBack}
          dataCitiesOfCountry={
            dataCitiesOfCountry !== undefined ? dataCitiesOfCountry : []
          }
          setSelectedCountry={setSelectedCountry}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
