import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {PlaylistContent} from '../../components';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';

interface PlaylistProps {
  props: {};
  route: any;
}

export const PlaylistScreen: React.FC<PlaylistProps> = (
  props: PlaylistProps,
) => {
  const {params} = props?.route;
  const {
    dataDetailPlaylist,
    dataSongsPlaylist,
    getDetailPlaylist,
    getListSongsPlaylist,
  } = usePlaylistHook();

  useEffect(() => {
    getDetailPlaylist({id: params.id});
    getListSongsPlaylist({id: params.id});
  }, []);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToEditPlaylist = () => {
    navigation.navigate('EditPlaylist', {...params});
  };

  const goBackProfile = (type: string) => {
    const newParams = type === 'delete' ? {} : {...params};
    navigation.navigate('Profile', newParams);
  };

  const goToAddSong = () => {
    navigation.navigate('AddSong');
  };

  return (
    <View style={styles.root}>
      {dataDetailPlaylist && (
        <PlaylistContent
          onPressGoBack={onPressGoBack}
          goToEditPlaylist={goToEditPlaylist}
          goBackProfile={goBackProfile}
          goToAddSong={goToAddSong}
          dataDetail={dataDetailPlaylist}
          listSongs={dataSongsPlaylist}
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
