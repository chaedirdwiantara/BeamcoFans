import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {AlbumContent} from '../../components';
import {RootStackParams} from '../../navigations';
import {storage} from '../../hooks/use-storage.hook';
import {useSongHook} from '../../hooks/use-song.hook';
import {useSearchHook} from '../../hooks/use-search.hook';
import {usePlayerStore} from '../../store/player.store';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';

type AlbumProps = NativeStackScreenProps<RootStackParams, 'Album'>;

export const AlbumScreen: React.FC<AlbumProps> = ({
  navigation,
  route,
}: AlbumProps) => {
  const {id, type} = route.params;
  const isLogin = storage.getBoolean('isLogin');
  const {searchLoading, dataSearchSongs, getSearchSongs} = useSearchHook();
  const {isLoadingSong, dataSongComingSoon, getListSongComingSoon} =
    useSongHook();
  const {albumLoading, dataDetailAlbum, getDetailAlbum, getDetailAlbumPublic} =
    useSongHook();

  const {setWithoutBottomTab, show} = usePlayerStore();

  useFocusEffect(
    useCallback(() => {
      if (show) {
        setWithoutBottomTab(true);
      }
    }, [show]),
  );

  useFocusEffect(
    useCallback(() => {
      // EP Detail Album
      if (isLogin) {
        getDetailAlbum({id: id.toString()});
      } else {
        getDetailAlbumPublic({id: id.toString()});
      }

      // EP List Song by Album
      if (type === 'coming_soon') {
        getListSongComingSoon({id});
      } else {
        getSearchSongs({albumID: id, keyword: ''});
      }
    }, [id]),
  );

  const onPressGoBack = () => {
    show && setWithoutBottomTab(false);
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      {dataDetailAlbum && !albumLoading && (
        <AlbumContent
          detailAlbum={dataDetailAlbum}
          dataSong={dataSearchSongs}
          dataSongComingSoon={dataSongComingSoon}
          onPressGoBack={onPressGoBack}
          comingSoon={type === 'coming_soon'}
          isLoading={searchLoading || isLoadingSong}
        />
      )}

      <ModalLoading visible={albumLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
