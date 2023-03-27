import React, {useEffect} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {ListItem} from './ListItem';
import {color, font} from '../../../theme';
import {EmptyState} from '../../../components';
import {widthPercentage} from '../../../utils';
import ListSongs from '../../ListCard/ListSongs';
import {useIsFocused} from '@react-navigation/native';
import {storage} from '../../../hooks/use-storage.hook';
import {SongList} from '../../../interface/song.interface';
import {usePlayerHook} from '../../../hooks/use-player.hook';
import {useSearchHook} from '../../../hooks/use-search.hook';

interface ListSongProps {
  title: string;
  fromMainTab: boolean;
  id?: number;
  filterBy?: any;
  onPressHidePlayer: () => void;
}

export const ListSong: React.FC<ListSongProps> = ({
  id,
  filterBy,
  title,
  fromMainTab,
  onPressHidePlayer,
}) => {
  const {t} = useTranslation();
  const {searchLoading, dataSearchSongs, getSearchSongs} = useSearchHook();
  const isFocused = useIsFocused();
  const {isPlaying, showPlayer, hidePlayer, addPlaylist} = usePlayerHook();
  const emptyState =
    filterBy === 'mood'
      ? t('Home.ListMood.EmptyState')
      : t('Home.ListGenre.EmptyState');

  useEffect(() => {
    getSearchSongs({[filterBy]: id, keyword: ''});
    storage.set('withoutBottomTab', true);
  }, []);

  useEffect(() => {
    if (isFocused && isPlaying) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, isPlaying]);

  const onPressSong = (val: SongList | null) => {
    addPlaylist({
      dataSong: dataSearchSongs !== undefined ? dataSearchSongs : [],
      playSongId: val?.id,
      isPlay: true,
    });
    showPlayer();
  };

  const children = () => {
    if (searchLoading) {
      return null;
    }

    if (dataSearchSongs.length > 0) {
      return (
        <ScrollView>
          <View style={{paddingHorizontal: widthPercentage(20)}}>
            <ListSongs
              dataSong={dataSearchSongs}
              type="home"
              onPress={onPressSong}
              loveIcon={true}
            />
          </View>
        </ScrollView>
      );
    } else {
      return (
        <EmptyState
          text={emptyState}
          containerStyle={styles.containerEmpty}
          textStyle={styles.emptyText}
          hideIcon={true}
        />
      );
    }
  };

  return (
    <ListItem
      title={title}
      children={children()}
      onPressBack={fromMainTab ? onPressHidePlayer : undefined}
    />
  );
};

const styles = StyleSheet.create({
  containerEmpty: {
    alignSelf: 'center',
  },
  emptyText: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    textAlign: 'center',
    color: color.Neutral[10],
    lineHeight: mvs(16),
  },
});
