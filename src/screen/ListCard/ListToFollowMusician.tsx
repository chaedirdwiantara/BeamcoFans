import {FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {MusicianListData} from '../../data/topMusician';
import {ListCard} from '../../components';
import {mvs} from 'react-native-size-matters';

const ListToFollowMusician = () => {
  const [selectedId, setSelectedId] = useState<number[]>([]);

  const followOnPress = (index: number) => {
    selectedId.includes(index)
      ? setSelectedId(selectedId.filter((x: number) => x !== index))
      : setSelectedId([...selectedId, index]);
  };
  return (
    <FlatList
      data={MusicianListData}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => (
        <ListCard.FollowMusician
          musicianName={item.musicianName}
          imgUri={item.imgUri}
          containerStyles={{marginTop: mvs(20)}}
          followerCount={1000}
          followOnPress={() => followOnPress(index)}
          stateButton={selectedId.includes(index) ? true : false}
        />
      )}
    />
  );
};

export default ListToFollowMusician;

const styles = StyleSheet.create({});
