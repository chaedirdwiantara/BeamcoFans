import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {AccountContent} from '../../components';
import {RootStackParams} from '../../navigations';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {useLocationHook} from '../../hooks/use-location.hook';

export const AccountScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {dataProfile, getProfileUser} = useProfileHook();
  const {dataAllCountry, getDataAllCountry} = useLocationHook();

  useEffect(() => {
    getProfileUser();
    getDataAllCountry();
  }, []);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      {dataProfile && (
        <AccountContent
          dataAllCountry={dataAllCountry !== undefined ? dataAllCountry : []}
          profile={dataProfile}
          onPressGoBack={onPressGoBack}
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
