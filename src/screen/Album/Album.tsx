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

type AlbumProps = NativeStackScreenProps<RootStackParams, 'Album'>;

export const AlbumScreen: React.FC<AlbumProps> = ({
  navigation,
  route,
}: AlbumProps) => {
  const isLogin = storage.getBoolean('isLogin');
  const {dataSearchSongs, getSearchSongs} = useSearchHook();
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
      getSearchSongs({albumID: route.params.id, keyword: ''});
      if (isLogin) {
        getDetailAlbum({id: route.params.id.toString()});
      } else {
        getDetailAlbumPublic({id: route.params.id.toString()});
      }
    }, [route.params.id]),
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
          onPressGoBack={onPressGoBack}
          comingSoon={route.params.type === 'coming_soon'}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
