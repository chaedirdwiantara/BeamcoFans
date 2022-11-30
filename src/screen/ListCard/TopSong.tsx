import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ListCard} from '../../components';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {TopSongListData} from '../../data/topSong';
import {elipsisText} from '../../utils';

const TopSong = () => {
  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu');
  };
  return (
    <FlashList
      data={TopSongListData}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({item}: any) => (
        <ListCard.MusicList
          imgUri={item.imgUri}
          musicNum={item.musicNum}
          musicTitle={elipsisText(item.musicTitle, 22)}
          singerName={item.singerName}
          onPressMore={resultDataMore}
          // likePressed={likePressed}
          containerStyles={{marginTop: mvs(20)}}
        />
      )}
      estimatedItemSize={TopSongListData.length}
    />
  );
};

export default TopSong;

const styles = StyleSheet.create({});
