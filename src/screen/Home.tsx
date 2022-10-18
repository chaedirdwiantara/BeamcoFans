import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SsuText} from '../components/atom/Text/SsuText';
import {
  ButtonTabExample,
  InputExample,
  MusicListCardExample,
  TextExample,
} from '../components/example';
import {color} from '../theme';

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <Text>Home Screen</Text>
      <MusicListCardExample />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
