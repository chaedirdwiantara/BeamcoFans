import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../theme/Color';
import {dataOnboard} from '../data/onboard';
import {RootStackParams} from '../navigations';
import {storage} from '../hooks/use-storage.hook';
import {ImageSlider, SsuStatusBar} from '../components';

export const OnboardScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToScreenGuest = () => {
    navigation.replace('SignInGuest', {});
    storage.set('skipOnboard', true);
  };

  return (
    <View style={styles.root}>
      <SsuStatusBar type="black" />
      <ImageSlider
        type="Onboard"
        data={dataOnboard as any}
        onPress={goToScreenGuest}
        setFollowMusician={() => null}
        setUnfollowMusician={() => null}
        isLoading={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    justifyContent: 'center',
    alignItems: 'center',
  },
});
