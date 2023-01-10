import React, {FC} from 'react';
import {MusicSection} from '../../components';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {SongList} from '../../interface/song.interface';
import {elipsisText, heightResponsive} from '../../utils';
import {ListDataSearchSongs} from '../../interface/search.interface';
import {usePlayerHook} from '../../hooks/use-player.hook';

interface TopSongPropsScreen {
  type?: string;
  onPress: (param: any) => void;
  dataSong?: SongList[] | ListDataSearchSongs[] | null;
  scrollable?: boolean;
  hideDropdownMore?: boolean;
  rightIcon?: boolean;
  rightIconComponent?: React.ReactNode;
  onPressIcon?: (data: any) => void;
}

const TopSong: FC<TopSongPropsScreen> = (props: TopSongPropsScreen) => {
  const {
    onPress,
    scrollable,
    type,
    hideDropdownMore,
    dataSong,
    rightIcon,
    rightIconComponent,
    onPressIcon,
  } = props;
  const {musicData, isPlay} = usePlayerHook();

  return (
    <FlashList<SongList | ListDataSearchSongs>
      data={dataSong}
      showsVerticalScrollIndicator={false}
      scrollEnabled={scrollable}
      keyExtractor={item => item.id.toString()}
      renderItem={({item, index}) => (
        <MusicSection
          imgUri={item.imageUrl !== null ? item.imageUrl : ''}
          musicNum={index + 1}
          musicTitle={elipsisText(item.title, 22)}
          singerName={item.musicianName}
          onPressCard={type === 'home' ? () => onPress(item) : undefined}
          containerStyles={{marginTop: mvs(20)}}
          played={type === 'home' ? isPlay && item.id === musicData.id : false}
          hideDropdownMore={hideDropdownMore}
          rightIcon={rightIcon}
          rightIconComponent={rightIconComponent}
          onPressIcon={onPressIcon}
        />
      )}
      estimatedItemSize={heightResponsive(500)}
      extraData={[musicData, isPlay]}
    />
  );
};

export default TopSong;
