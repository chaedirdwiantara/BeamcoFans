import {FlatList, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {ListCard} from '../../components';
import {ListDataSearchSongs} from '../../interface/search.interface';
import {mvs} from 'react-native-size-matters';

interface ListResultSongProps {
  dataSearchSongs: ListDataSearchSongs[];
}

const ListResultSong: FC<ListResultSongProps> = (
  props: ListResultSongProps,
) => {
  const {dataSearchSongs} = props;

  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu');
  };

  return (
    <FlatList
      data={dataSearchSongs}
      renderItem={({item, index}) => (
        <ListCard.MusicList
          imgUri={item.imageUrl}
          musicNum={(index + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          musicTitle={item.title}
          singerName={item.musicianName}
          onPressMore={resultDataMore}
          containerStyles={{marginTop: mvs(20)}}
          onPressCard={() => {}}
          hideDropdownMore
        />
      )}
    />
  );
};

export default ListResultSong;

const styles = StyleSheet.create({});
