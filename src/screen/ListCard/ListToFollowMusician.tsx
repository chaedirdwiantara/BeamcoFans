import {FlatList, StyleSheet, Text} from 'react-native';
import React, {FC, useState} from 'react';
import {MusicianListData} from '../../data/topMusician';
import {ListCard} from '../../components';
import {mvs} from 'react-native-size-matters';
import {color, font} from '../../theme';
import {MusicianList} from '../../interface/musician.interface';

interface ListToFollowProps {
  dataMusician: MusicianList[];
}

const ListToFollowMusician: FC<ListToFollowProps> = (
  props: ListToFollowProps,
) => {
  const {dataMusician} = props;
  const [selectedId, setSelectedId] = useState<number[]>([]);

  const followOnPress = (index: number) => {
    selectedId.includes(index)
      ? setSelectedId(selectedId.filter((x: number) => x !== index))
      : setSelectedId([...selectedId, index]);
  };
  return (
    <>
      <Text style={styles.textStyle}>People who might fit your interest</Text>
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
    </>
  );
};

export default ListToFollowMusician;

const styles = StyleSheet.create({
  textStyle: {
    color: color.Success[500],
    fontSize: mvs(15),
    fontFamily: font.InterRegular,
    fontWeight: '500',
  },
});
