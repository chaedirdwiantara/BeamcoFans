import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../../theme/Color';
import {AccountContent} from '../../../components';
import {RootStackParams} from '../../../navigations';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import {useSettingHook} from '../../../hooks/use-setting.hook';
import {useLocationHook} from '../../../hooks/use-location.hook';

type AccountInformationProps = NativeStackScreenProps<
  RootStackParams,
  'AccountInformation'
>;
export const AccountInformationScreen: React.FC<AccountInformationProps> = ({
  navigation,
  route,
}: AccountInformationProps) => {
  const {fromScreen} = route.params;
  const {dataProfile, getProfileUser} = useProfileHook();
  const {
    dataAllCountry,
    dataCitiesOfCountry,
    getDataAllCountry,
    getCitiesOfCountry,
  } = useLocationHook();
  const {getListMoodGenre, listGenre, listMood} = useSettingHook();
  const [selectedCountry, setSelectedCountry] = useState<number>(0);

  useEffect(() => {
    getProfileUser();
    getDataAllCountry();
    getListMoodGenre({page: 0, perPage: 30});
  }, []);

  useEffect(() => {
    if (dataProfile) {
      setSelectedCountry(dataProfile.data.locationCountry?.id || 0);
    }
  }, [dataProfile]);

  useEffect(() => {
    if (selectedCountry > 0) {
      getCitiesOfCountry({id: selectedCountry});
    }
  }, [dataProfile, selectedCountry]);

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
          fromScreen={fromScreen}
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
