import React, {FC, useEffect, useState} from 'react';
import {ms, mvs} from 'react-native-size-matters';

import {MusicSection} from '../../components';
import {DataDropDownType} from '../../data/dropdown';
import {useSongHook} from '../../hooks/use-song.hook';
import {SongList} from '../../interface/song.interface';
import {elipsisText, widthResponsive} from '../../utils';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {ListDataSearchSongs} from '../../interface/search.interface';
import {ScrollView, View} from 'react-native';

interface NewSongPropsScreen {
  type?: string;
  onPress: (param: any) => void;
  dataSong?: SongList[] | ListDataSearchSongs[];
  scrollable?: boolean;
  hideDropdownMore?: boolean;
  rightIcon?: boolean;
  rightIconComponent?: React.ReactNode;
  onPressIcon?: (data: number) => void;
  activeOpacity?: number;
  loveIcon?: boolean;
  newDataMore?: DataDropDownType[];
  newOnPressMore?: (data: DataDropDownType, item: SongList) => void;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}

const NewSong: FC<NewSongPropsScreen> = (props: NewSongPropsScreen) => {
  const {
    onPress,
    type,
    hideDropdownMore,
    dataSong,
    rightIcon,
    rightIconComponent,
    onPressIcon,
    activeOpacity,
    loveIcon,
    newDataMore,
    newOnPressMore,
  } = props;
  const {currentTrack, isPlaying, addSong} = usePlayerHook();
  const {setLikeSong, setUnlikeSong} = useSongHook();

  const [listSong, setListSong] = useState<SongList[] | ListDataSearchSongs[]>(
    dataSong ?? [],
  );

  const likeOnPress = (index: number, isLiked?: boolean) => {
    if (listSong !== undefined && listSong !== null) {
      const newList = listSong.map(val => ({
        ...val,
        isLiked: val.id === index ? !val.isLiked : val.isLiked,
      }));

      return setListSong(newList as SongList[] | ListDataSearchSongs[]);
    }

    isLiked ? setUnlikeSong({id: index}) : setLikeSong({id: index});
  };

  useEffect(() => {
    if (dataSong !== undefined) {
      setListSong(dataSong);
    }
  }, [dataSong]);

  const newListSong =
    type === 'defaultPlaylist'
      ? (listSong as any).filter((val: {isLiked: string}) => val.isLiked)
      : listSong;

  return newListSong ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingRight: newListSong?.length > 5 ? widthResponsive(24) : 0,
        paddingLeft: widthResponsive(24),
        width: newListSong?.length > 5 ? 'auto' : '100%',
      }}>
      <View
        style={{
          marginRight: ms(20),
          flex: 1,
          width: newListSong?.length > 5 ? widthResponsive(255) : '100%',
        }}>
        {newListSong?.map((item: SongList, index: number) => {
          if (index <= 4) {
            return (
              <MusicSection
                key={item.id}
                imgUri={item.imageUrl[0]?.image ?? ''}
                musicNum={index + 1}
                musicTitle={elipsisText(item.title, 22)}
                singerName={item.musicianName}
                onPressCard={
                  type === 'home' || type === 'defaultPlaylist'
                    ? () => onPress(item)
                    : undefined
                }
                played={
                  type === 'home' || type === 'defaultPlaylist'
                    ? isPlaying && item.id === currentTrack?.id
                    : false
                }
                containerStyles={{
                  marginTop: mvs(20),
                  marginBottom: index + 1 === dataSong?.length ? mvs(20) : 0,
                }}
                hideDropdownMore={hideDropdownMore}
                rightIcon={rightIcon}
                rightIconComponent={rightIconComponent}
                onPressIcon={() => onPressIcon && onPressIcon(item.id)}
                activeOpacity={activeOpacity}
                loveIcon={loveIcon}
                likeOnPress={() => likeOnPress(item.id, item.isLiked)}
                isLiked={item.isLiked}
                onPressAddToQueue={() => addSong(item)}
                songId={item.id}
                newDataMore={newDataMore}
                newOnPressMore={data =>
                  newOnPressMore && newOnPressMore(data, item)
                }
              />
            );
          }
        })}
      </View>
      {newListSong?.length > 5 && (
        <View style={{width: widthResponsive(255)}}>
          {newListSong?.map((item: SongList, index: number) => {
            if (index > 4 && index < 10) {
              return (
                <MusicSection
                  key={item.id}
                  imgUri={item.imageUrl[0]?.image ?? ''}
                  musicNum={index + 1}
                  musicTitle={elipsisText(item.title, 22)}
                  singerName={item.musicianName}
                  onPressCard={
                    type === 'home' || type === 'defaultPlaylist'
                      ? () => onPress(item)
                      : undefined
                  }
                  played={
                    type === 'home' || type === 'defaultPlaylist'
                      ? isPlaying && item.id === currentTrack?.id
                      : false
                  }
                  containerStyles={{
                    marginTop: mvs(20),
                    marginBottom: index + 1 === dataSong?.length ? mvs(20) : 0,
                  }}
                  hideDropdownMore={hideDropdownMore}
                  rightIcon={rightIcon}
                  rightIconComponent={rightIconComponent}
                  onPressIcon={() => onPressIcon && onPressIcon(item.id)}
                  activeOpacity={activeOpacity}
                  loveIcon={loveIcon}
                  likeOnPress={() => likeOnPress(item.id, item.isLiked)}
                  isLiked={item.isLiked}
                  onPressAddToQueue={() => addSong(item)}
                  songId={item.id}
                  newDataMore={newDataMore}
                  newOnPressMore={data =>
                    newOnPressMore && newOnPressMore(data, item)
                  }
                />
              );
            }
          })}
        </View>
      )}
    </ScrollView>
  ) : // TODO: add spinner or skeleton when loading && add empty state if data is empty
  null;
};

export default NewSong;
