import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {TermAndConditions} from '../components';
import {
  DropDownExample,
  InputExample,
  MusicListCardExample,
  TabFilterExample,
  TncExample,
} from '../components/example';
import {color} from '../theme';

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <DropDownExample />
      <InputExample />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.Dark[800],
    paddingHorizontal: mvs(48),
  },
});
