import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {
  DropDownExample,
  MusicListCardExample,
  TabFilterExample,
} from '../components/example';

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <DropDownExample />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
    paddingHorizontal: mvs(12),
  },
});
