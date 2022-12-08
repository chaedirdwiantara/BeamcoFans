import React, {FC} from 'react';
import {ListCard} from '../../components';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {TopSongListData} from '../../data/topSong';
import {elipsisText} from '../../utils';

interface TopSongProps {
  onPress?: () => void;
  scrollable?: boolean;
}

const TopSong: FC<TopSongProps> = (props: TopSongProps) => {
  const {onPress, scrollable} = props;
  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu');
  };
  return (
    <FlashList
      data={TopSongListData}
      showsVerticalScrollIndicator={false}
      scrollEnabled={scrollable}
      keyExtractor={item => item.id}
      renderItem={({item}: any) => (
        <ListCard.MusicList
          imgUri={item.imgUri}
          musicNum={item.musicNum}
          musicTitle={elipsisText(item.musicTitle, 22)}
          singerName={item.singerName}
          onPressMore={resultDataMore}
          onPressCard={onPress}
          containerStyles={{marginTop: mvs(20)}}
        />
      )}
      estimatedItemSize={TopSongListData.length}
    />
  );
};

export default TopSong;
