import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TopNavigation} from '../molecules';
import {HomeIcon} from '../../assets/icon';

const TopNavExample = () => {
  return (
    <TopNavigation.Type1
      title="Fav Songs"
      backAction={() => console.log('Left Icon Pressed')}
      //   rightIcon
      //   rightIconAction={() => console.log('Right Icon Pressed')}
      maxLengthTitle={20}
      itemStrokeColor={'white'}
    />
  );
};

export default TopNavExample;

const styles = StyleSheet.create({});
