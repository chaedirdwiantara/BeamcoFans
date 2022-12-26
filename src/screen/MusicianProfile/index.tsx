import {StyleSheet, View} from 'react-native';
import React from 'react';
import {ProfileContent} from './MusicianProfile';
import {color} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';

interface ProfileProps {
  props: {};
  route: any;
}

const MusicianProfile = (props: ProfileProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const profile = {
    fullname: 'Black Pink',
    username: '@blackpink',
    bio: 'Black Pink in Your Area',
    backgroundUri:
      'https://img.imageimg.net/artist/blackpink/img/product_1034746.png',
    avatarUri:
      'https://yt3.ggpht.com/hZDUwjoeQqigphL4A1tkg9c6hVp5yXmbboBR7PYFUSFj5PIJSA483NB5v7b0XVoTN9GCku3tqQ=s900-c-k-c0x00ffffff-no-rj',
  };

  const onPressGoTo = (
    screenName: 'Setting' | 'Following' | 'CreateNewPlaylist',
  ) => {
    navigation.navigate(screenName);
  };

  const goToEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const goToPlaylist = () => {
    navigation.navigate('Playlist');
  };

  return (
    <View style={styles.root}>
      <ProfileContent
        profile={profile}
        playlist={undefined}
        onPressGoTo={screenName => onPressGoTo(screenName)}
        goToEditProfile={goToEditProfile}
        goToPlaylist={goToPlaylist}
      />
    </View>
  );
};

export default MusicianProfile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  imageBg: {
    flex: 1,
    justifyContent: 'center',
  },
});
