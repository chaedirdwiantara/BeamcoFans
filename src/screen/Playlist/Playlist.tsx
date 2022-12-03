import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../App';
import {PlaylistContent} from '../../components';

export const PlaylistScreen: React.FC = props => {
  const {params} = props?.route;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToEditPlaylist = () => {
    navigation.navigate('EditPlaylist', {...params});
  };

  const goBackProfile = (type: string) => {
    const newParams = type === 'delete' ? {} : params;
    navigation.navigate('Profile', {...newParams});
  };

  const goToAddSong = () => {
    navigation.navigate('AddSong');
  };

  return (
    <SafeAreaView style={styles.root}>
      <PlaylistContent
        playlist={params}
        onPressGoBack={onPressGoBack}
        goToEditPlaylist={goToEditPlaylist}
        goBackProfile={goBackProfile}
        goToAddSong={goToAddSong}
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
