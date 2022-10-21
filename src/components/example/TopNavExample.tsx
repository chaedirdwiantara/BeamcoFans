import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TopNavigation} from '../molecules';
import {HomeIcon} from '../../assets/icon';

const TopNavExample = () => {
  return (
    <TopNavigation.Type1
      title="Fav Songs"
      backAction={() => console.log('Left Icon Pressed')}
      maxLengthTitle={20}
      itemStrokeColor={'white'}
      leftIconChild={<HomeIcon stroke={'white'} />}
    />
  );
};

export default TopNavExample;

const styles = StyleSheet.create({});
