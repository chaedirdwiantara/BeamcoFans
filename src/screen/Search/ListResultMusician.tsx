import {FlatList, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import MusicianSection from '../../components/molecule/MusicianSection/MusicianSection';
import {mvs} from 'react-native-size-matters';
import {ListDataSearchMusician} from '../../interface/search.interface';

interface ListResultMusicianProps {
  dataSearchMusicians: ListDataSearchMusician[];
}

const ListResultMusician: FC<ListResultMusicianProps> = (
  props: ListResultMusicianProps,
) => {
  const {dataSearchMusicians} = props;
  return (
    <FlatList
      data={dataSearchMusicians}
      renderItem={({item, index}) => (
        <MusicianSection
          musicianNum={(index + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          musicianName={item.fullname}
          imgUri={item.imageProfileUrl}
          containerStyles={{marginTop: mvs(20)}}
          musicianId={item.uuid}
          followersCount={item.followers}
          activeMore={false}
        />
      )}
    />
  );
};

export default ListResultMusician;

const styles = StyleSheet.create({});
