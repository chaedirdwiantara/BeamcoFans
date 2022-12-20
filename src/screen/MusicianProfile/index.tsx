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
    fullname: 'Kendal Jenner',
    username: '@kendaljenner',
    bio: "I'm here to support the musician",
    backgroundUri:
      'https://akcdn.detik.net.id/community/media/visual/2021/01/04/frank-lampard-chelsea_169.jpeg?w=700&q=90',
    avatarUri:
      'https://upload.wikimedia.org/wikipedia/commons/8/8c/Frank_Lampard_2019.jpg',
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
