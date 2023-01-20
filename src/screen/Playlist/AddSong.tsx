import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {AddSongContent} from '../../components';
import {RootStackParams} from '../../navigations';
import {useSongHook} from '../../hooks/use-song.hook';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';
import {AddSongPropsType} from '../../interface/playlist.interface';

type AddSongProps = NativeStackScreenProps<RootStackParams, 'AddSong'>;

export const AddSongScreen: React.FC<AddSongProps> = ({
  navigation,
  route,
}: AddSongProps) => {
  const [search, setSearch] = useState<string>('');
  const [trigger, setTrigger] = useState<boolean>(false);
  const {dataSong, getListDataSong} = useSongHook();
  const {setAddSongToPlaylist} = usePlaylistHook();

  useEffect(() => {
    getListDataSong({playlistID: route.params.id, keyword: search});
  }, [trigger, search]);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const onPressAddSong = (props?: AddSongPropsType) => {
    setAddSongToPlaylist(props);
    setTrigger(!trigger);
  };

  return (
    <View style={styles.root}>
      <AddSongContent
        search={search}
        setSearch={setSearch}
        playlist={route.params}
        listSongs={dataSong.filter(val => !val.isAddedToThisPlaylist)}
        onPressGoBack={onPressGoBack}
        setAddSongToPlaylist={onPressAddSong}
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
