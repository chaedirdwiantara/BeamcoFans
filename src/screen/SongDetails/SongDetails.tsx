import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {SongDetailsContent} from '../../components';
import {storage} from '../../hooks/use-storage.hook';
import {useSongHook} from '../../hooks/use-song.hook';
import { usePlayerStore } from '../../store/player.store';

type SongDetailProps = NativeStackScreenProps<RootStackParams, 'SongDetails'>;

export const SongDetailsScreen: React.FC<SongDetailProps> = ({
  route,
}: SongDetailProps) => {
  const {songId} = route.params;
  const isLogin = storage.getBoolean('isLogin');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {dataDetailSong, getDetailSong, getDetailSongPublic} = useSongHook();
  const {setWithoutBottomTab, show} = usePlayerStore();
  const [showModalNotAvail, setShowModalNotAvail] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      if (isLogin) {
        getDetailSong({id: songId});
      } else {
        getDetailSongPublic({id: songId});
      }
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (show) {
        setWithoutBottomTab(true);
      }
    }, [show]),
  );

  const onPressGoBack = () => {
    show && setWithoutBottomTab(false);
    navigation.goBack();
  };

  const goToShowCredit = () => {
    navigation.navigate('ShowCredit', {songId});
  };

  const goToMusicianProfile = (uuid: string) => {
    if (uuid) {
      navigation.push('MusicianProfile', {id: uuid});
    } else {
      setShowModalNotAvail(true);
    }
  };

  const goToAlbum = (id: number) => {
    navigation.push('Album', {id});
  };

  const goToAddToPlaylist = () => {
    navigation.navigate('AddToPlaylist', {
      id: [songId],
      type: 'song',
      fromMainTab: false,
    });
  };

  return (
    <View style={styles.root}>
      {dataDetailSong && (
        <SongDetailsContent
          onPressGoBack={onPressGoBack}
          goToShowCredit={goToShowCredit}
          dataDetail={dataDetailSong}
          goToMusicianProfile={goToMusicianProfile}
          showModalNotAvail={showModalNotAvail}
          closeModalNotAvail={() => setShowModalNotAvail(false)}
          goToAlbum={goToAlbum}
          goToAddToPlaylist={goToAddToPlaylist}
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
