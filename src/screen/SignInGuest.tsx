import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../theme/Color';
import {RootStackParams} from '../App';
import {SignInGuestContent} from '../components';

export const SignInGuestScreen: React.FC = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.root}>
      <SignInGuestContent onPress={goToScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
