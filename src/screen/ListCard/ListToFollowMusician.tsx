import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MusicianListData} from '../../data/topMusician';
import {ListCard} from '../../components';
import {mvs} from 'react-native-size-matters';

const ListToFollowMusician = () => {
  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu');
  };
  const followOnPress = (dataResult: any) => {
    console.log('following', dataResult);
  };
  return (
    <FlatList
      data={MusicianListData}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <ListCard.MusicianList
          musicianName={item.musicianName}
          imgUri={item.imgUri}
          onPressMore={resultDataMore}
          containerStyles={{marginTop: mvs(20)}}
          type={'recommendation'}
          followerCount={1000}
          followOnPress={() => followOnPress(item.musicianName)}
        />
      )}
    />
  );
};

export default ListToFollowMusician;

const styles = StyleSheet.create({});
