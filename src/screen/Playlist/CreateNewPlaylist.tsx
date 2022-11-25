import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../App';
import {CreateNewPlaylistContent} from '../../components';

export const CreateNewPlaylist: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToPlaylist = (params: string | undefined) => {
    navigation.navigate('Playlist', {...params});
  };

  return (
    <SafeAreaView style={styles.root}>
      <CreateNewPlaylistContent
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
