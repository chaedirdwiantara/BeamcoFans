import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {MusicianListData} from '../../data/topMusician';
import MusicianSection from '../Search/MusicianSection';

interface TopMusicianProps {
  type?: string;
}

const TopMusician: FC<TopMusicianProps> = ({type}) => {
  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu');
  };
  return (
    <FlashList
      data={MusicianListData}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => (
        <MusicianSection
          musicianId={item.id}
          musicianNum={(index + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          musicianName={item.musicianName}
          imgUri={item.imgUri}
          containerStyles={{marginTop: mvs(20)}}
          point={type === 'profile' ? item.point : null}
        />
      )}
      estimatedItemSize={MusicianListData.length}
    />
  );
};

export default TopMusician;

const styles = StyleSheet.create({});
