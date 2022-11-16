import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../theme/Color';
import {RootStackParams} from '../App';
import {ImageSlider} from '../components';
import {dataOnboard} from '../data/onboard';

export const OnboardScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToScreenGuest = () => {
    navigation.replace('SignInGuest');
  };

  return (
    <View style={styles.root}>
      <ImageSlider data={dataOnboard} onPress={goToScreenGuest} />
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
