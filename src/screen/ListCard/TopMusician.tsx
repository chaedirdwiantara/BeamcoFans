import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ListCard} from '../../components';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {MusicianListData} from '../../data/topMusician';

const TopMusician = () => {
  const onPressThreeDots = () => {
    console.log('dowtey');
  };
  return (
    <FlashList
      data={MusicianListData}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({item}: any) => (
        <ListCard.MusicianList
          musicNum={item.musicNum}
          musicianName={item.musicianName}
          imgUri={item.imgUri}
          onPressThreeDots={onPressThreeDots}
          containerStyles={{marginTop: mvs(20)}}
        />
      )}
      estimatedItemSize={15}
    />
  );
};

export default TopMusician;

const styles = StyleSheet.create({});
