import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {AddSongContent} from '../../components';
import {RootStackParams} from '../../navigations';
import {useSongHook} from '../../hooks/use-song.hook';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';

type AddSongProps = NativeStackScreenProps<RootStackParams, 'AddSong'>;

export const AddSongScreen: React.FC<AddSongProps> = ({
  navigation,
  route,
}: AddSongProps) => {
  const {dataSong, getListDataSong} = useSongHook();
  const {setAddSongToPlaylist} = usePlaylistHook();

  useEffect(() => {
    getListDataSong();
  }, []);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <AddSongContent
        playlist={route.params}
        listSongs={dataSong}
        onPressGoBack={onPressGoBack}
        setAddSongToPlaylist={setAddSongToPlaylist}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
