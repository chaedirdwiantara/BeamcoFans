import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ListCard} from '../../components';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {MusicianListData} from '../../data/topMusician';
import {elipsisText} from '../../utils';

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
          musicianName={elipsisText(item.musicianName, 22)}
          imgUri={item.imgUri}
          onPressThreeDots={onPressThreeDots}
          containerStyles={{marginTop: mvs(20)}}
        />
      )}
      estimatedItemSize={MusicianListData.length}
    />
  );
};

export default TopMusician;

const styles = StyleSheet.create({});
