import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {SongDetailsContent} from '../../components';
import {useSongHook} from '../../hooks/use-song.hook';
import {useMusicianHook} from '../../hooks/use-musician.hook';

type SongDetailProps = NativeStackScreenProps<RootStackParams, 'SongDetails'>;

export const SongDetailsScreen: React.FC<SongDetailProps> = ({
  route,
}: SongDetailProps) => {
  const {songId, musicianId} = route.params;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {dataDetailSong, getDetailSong} = useSongHook();
  const {dataAlbum, getAlbum} = useMusicianHook();

  useFocusEffect(
    useCallback(() => {
      getDetailSong({id: songId.toString()});
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      getAlbum({uuid: musicianId});
    }, []),
  );

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToShowCredit = () => {
    navigation.navigate('ShowCredit', {songId});
  };

  return (
    <View style={styles.root}>
      {dataDetailSong && (
        <SongDetailsContent
          onPressGoBack={onPressGoBack}
          goToShowCredit={goToShowCredit}
          dataDetail={dataDetailSong}
          dataAlbum={dataAlbum}
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
