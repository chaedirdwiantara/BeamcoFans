import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Color from '../theme/Color';
import {RootStackParams} from '../App';

export const EventScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToScreenReferral = () => {
    navigation.navigate('Referral');
  };

  return (
    <View style={styles.root}>
      <Text>Event Screen</Text>
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
