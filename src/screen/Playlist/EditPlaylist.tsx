import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../App';
import {EditPlaylistContent} from '../../components';

export const EditPlaylist: React.FC = props => {
  const {params} = props?.route;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToPlaylist = (param: string | undefined) => {
    navigation.navigate('Playlist', {...param});
  };

  return (
    <SafeAreaView style={styles.root}>
      <EditPlaylistContent
        playlist={params}
        onPressGoBack={onPressGoBack}
        goToPlaylist={goToPlaylist}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
