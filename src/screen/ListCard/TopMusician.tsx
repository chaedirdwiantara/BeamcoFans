import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {ListCard} from '../../components';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {MusicianListData} from '../../data/topMusician';

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
      renderItem={({item}) => (
        <ListCard.MusicianList
          musicianNum={item.musicNum}
          musicianName={item.musicianName}
          imgUri={item.imgUri}
          onPressMore={resultDataMore}
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
