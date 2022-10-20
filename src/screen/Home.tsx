import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DropdownComponent from '../components/atom/DropDown/Dropdown';
import {SsuText} from '../components/atom/Text/SsuText';
import {
  ButtonTabExample,
  InputExample,
  MusicianListExample,
  MusicListCardExample,
  TextExample,
} from '../components/example';
import DropDownExample from '../components/example/DropDownExample';
import PostListCardExample from '../components/example/PostListCardExample';
import {color} from '../theme';

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <Text>Home Screen</Text>
      <DropDownExample />
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
