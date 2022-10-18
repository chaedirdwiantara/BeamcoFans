import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MusiciansListCard from '../molecules/ListCard/MusiciansListCard';

const MusicianListExample = () => {
  const onPressThreeDots = () => {
    console.log('dowtey');
  };
  return (
    <MusiciansListCard
      musicNum={'01'}
      musicTitle={'Sikok Bagi Tigo'}
      imgUri={
        'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp'
      }
      onPressThreeDots={onPressThreeDots}
    />
  );
};

export default MusicianListExample;

const styles = StyleSheet.create({});
