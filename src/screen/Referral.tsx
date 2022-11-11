import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../App';
import {ReferralContent} from '../components';
import Color from '../theme/Color';

export const ReferralScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handeOnpressText = () => {
    navigation.push('MainTab');
  };

  return (
    <View style={styles.root}>
      <ReferralContent onPress={handeOnpressText} />
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
