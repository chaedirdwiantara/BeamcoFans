import {StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';

import Color from '../../theme/Color';
import {EditProfile} from '../../components';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {useSettingHook} from '../../hooks/use-setting.hook';
import {useLocationHook} from '../../hooks/use-location.hook';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';

export const EditProfileScreen: React.FC = () => {
  const {isLoading, dataProfile, getProfileUser, deleteValueProfile} =
    useProfileHook();
  const {
    dataAllCountry,
    dataCitiesOfCountry,
    getDataAllCountry,
    getCitiesOfCountry,
  } = useLocationHook();
  const {getListMoodGenre, listGenre, listMood} = useSettingHook();
  const [selectedCountry, setSelectedCountry] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      getProfileUser();
      getDataAllCountry();
      getListMoodGenre({page: 0, perPage: 30});
    }, []),
  );

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

  return (
    <View style={styles.root}>
      {dataProfile && (
        <EditProfile
          dataProfile={dataProfile.data}
          deleteValueProfile={deleteValueProfile}
          dataAllCountry={dataAllCountry !== undefined ? dataAllCountry : []}
          moods={listMood}
          genres={listGenre}
          dataCitiesOfCountry={
            dataCitiesOfCountry !== undefined ? dataCitiesOfCountry : []
          }
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      )}
      <ModalLoading visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
