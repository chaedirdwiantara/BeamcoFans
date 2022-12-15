import React, {FC, useState} from 'react';
import {ListCard} from '../../components';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {elipsisText} from '../../utils';
import {TopSongListData, TopSongProps} from '../../data/topSong';

interface TopSongPropsScreen {
  type?: string;
  onPress: (param: any) => void;
  scrollable?: boolean;
}

const TopSong: FC<TopSongPropsScreen> = (props: TopSongPropsScreen) => {
  const {onPress, scrollable, type} = props;
  const [listSong, setListSong] = useState(TopSongListData);
  const resultDataMore = (dataResult: any) => {
    console.log(dataResult, 'resultDataMenu');
  };

  const onPressPlay = (item: TopSongProps, index: number) => {
    let newList = [...listSong];
    newList = newList.map(v => ({...v, played: false}));
    newList[index].played = true;
    setListSong(newList);
    onPress(item);
  };

  return (
    <FlashList
      data={listSong}
      showsVerticalScrollIndicator={false}
      scrollEnabled={scrollable}
      keyExtractor={item => item.id}
      renderItem={({item, index}: any) => (
        <ListCard.MusicList
          imgUri={item.imgUri}
          musicNum={item.musicNum}
          musicTitle={elipsisText(item.musicTitle, 22)}
          singerName={item.singerName}
          onPressMore={resultDataMore}
          onPressCard={
            type === 'home' ? () => onPressPlay(item, index) : undefined
          }
          containerStyles={{marginTop: mvs(20)}}
          played={type === 'home' ? item.played : false}
        />
      )}
      estimatedItemSize={TopSongListData.length}
    />
  );
};

export default TopSong;
