import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {PlaylistContent} from '../../components';
import {DefaultPlaylist} from './DefaultPlaylist';
import {SongList} from '../../interface/song.interface';
import {useBackHandler} from '../../utils/useBackHandler';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';
import {MainTabParams, RootStackParams} from '../../navigations';
import {profileStorage, storage} from '../../hooks/use-storage.hook';
import {usePlayerStore} from '../../store/player.store';

type PlaylistProps = NativeStackScreenProps<RootStackParams, 'Playlist'>;

export const PlaylistScreen: React.FC<PlaylistProps> = ({
  navigation,
  route,
}: PlaylistProps) => {
  const isLogin = storage.getBoolean('isLogin');
  const navigation2 = useNavigation<NativeStackNavigationProp<MainTabParams>>();
  const {
    dataDetailPlaylist,
    dataSongsPlaylist,
    getDetailPlaylist,
    getDetailPlaylistPublic,
    getListSongsPlaylist,
    getListSongsPlaylistPublic,
  } = usePlaylistHook();
  const {
    isPlaying,
    visible: playerVisible,
    showPlayer,
    hidePlayer,
    addPlaylist,
    setPauseSong,
    setPlaySong,
  } = usePlayerHook();

  const {setWithoutBottomTab, show} = usePlayerStore();

  const isFocused = useIsFocused();
  const [fetchListSong, setFetchListSong] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      if (show) {
        setWithoutBottomTab(true);
      }
    }, [show]),
  );

  useFocusEffect(
    useCallback(() => {
      getDetailPlaylist({id: route.params.id});
      if (isLogin) {
        getDetailPlaylist({id: route.params.id});
      } else {
        getDetailPlaylistPublic({id: route.params.id});
      }
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (isLogin) {
        getListSongsPlaylist({id: route.params.id});
      } else {
        getListSongsPlaylistPublic({id: route.params.id});
      }
    }, [fetchListSong]),
  );

  useEffect(() => {
    if (isFocused && isPlaying) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, isPlaying]);

  const goBackProfile = (showToast: boolean) => {
    if (route.params?.from === 'other') {
      show && setWithoutBottomTab(false);
      navigation.goBack();
    } else {
      show && setWithoutBottomTab(false);
      setTimeout(() => {
        navigation2.navigate('Profile', {deletePlaylist: showToast});
      }, 500);
    }
  };

  useBackHandler(() => {
    goBackProfile(false);
    return true;
  });

  const goToEditPlaylist = () => {
    if (dataDetailPlaylist !== undefined && dataDetailPlaylist !== null) {
      navigation.navigate('EditPlaylist', dataDetailPlaylist);
    }
  };

  const goToAddSong = () => {
    if (dataDetailPlaylist !== undefined && dataDetailPlaylist !== null) {
      navigation.navigate('AddSong', dataDetailPlaylist);
    }
  };

  const goToAlbum = (id: number) => {
    navigation.navigate('Album', {id});
  };

  const goToDetailSong = (songId: number, musicianId: string) => {
    navigation.push('SongDetails', {songId, musicianId});
  };

  const goToProfile = (uuid: string, type: string) => {
    if (uuid === profileStorage()?.uuid && isLogin) {
      navigation2.navigate('Profile', {});
    } else {
      if (type === 'fans') {
        navigation.push('OtherUserProfile', {id: uuid});
      } else {
        navigation.push('MusicianProfile', {id: uuid});
      }
    }
  };

  const onPressSong = (val: SongList | null) => {
    addPlaylist({
      dataSong: dataSongsPlaylist !== undefined ? dataSongsPlaylist : [],
      playSongId: val?.id,
      isPlay: true,
    });
    showPlayer();
  };

  const handlePlayPaused = () => {
    if (isPlaying) {
      setPauseSong();
    } else {
      setPlaySong();
    }
  };

  const goToAddToPlaylist = (songId: number) => {
    navigation.navigate('AddToPlaylist', {
      id: [songId],
      type: 'song',
    });
  };

  const handleBackAction = () => {
    show && setWithoutBottomTab(false);
    navigation.goBack();
  };

  const listSongPlaylist =
    dataSongsPlaylist !== undefined ? dataSongsPlaylist : [];
  const isDefault = dataDetailPlaylist?.isDefaultPlaylist;

  return (
    <View style={styles.root}>
      {dataDetailPlaylist && !isDefault && (
        <PlaylistContent
          goToEditPlaylist={goToEditPlaylist}
          goBackProfile={val =>
            route.params.from === 'other'
              ? handleBackAction()
              : goBackProfile(val)
          }
          goToAddSong={goToAddSong}
          dataDetail={dataDetailPlaylist}
          listSongs={listSongPlaylist}
          onPressSong={onPressSong}
          playerVisible={playerVisible}
          isPlaying={isPlaying}
          handlePlayPaused={handlePlayPaused}
          playlistId={route.params.id}
          setFetchListSong={() => setFetchListSong(!fetchListSong)}
          goToAlbum={goToAlbum}
          goToDetailSong={goToDetailSong}
          goToAddToPlaylist={goToAddToPlaylist}
          otherPlaylist={route.params?.from === 'other'}
          goToProfile={goToProfile}
        />
      )}

      {isDefault && (
        <DefaultPlaylist
          listSong={dataSongsPlaylist}
          onPressSong={onPressSong}
          playerVisible={playerVisible}
          onPressGoBack={() => goBackProfile(false)}
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
