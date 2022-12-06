import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Color from '../../theme/Color';
import {RootStackParams} from '../../App';
import {ProfileContent} from '../../components';

interface ProfileProps {
  props: {};
  route: any;
}

export const ProfileScreen: React.FC<ProfileProps> = (props: ProfileProps) => {
  const {params} = props?.route;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressGoTo = (
    screenName: 'Setting' | 'Following' | 'CreateNewPlaylist',
  ) => {
    navigation.navigate(screenName);
  };

  const goToEditProfile = () => {
    navigation.navigate('EditProfile', {...params});
  };

  const goToPlaylist = () => {
    navigation.navigate('Playlist', {...params});
  };

  const profile = {
    fullname: 'Kendal Jenner',
    username: '@kendaljenner',
    bio: params?.bio || "I'm here to support the musician",
    backgroundUri: params?.backgroundUri?.path || null,
    avatarUri: params?.avatarUri?.path,
  };

  return (
    <View style={styles.root}>
      <ProfileContent
        profile={profile}
        playlist={params}
        onPressGoTo={screenName => onPressGoTo(screenName)}
        goToEditProfile={goToEditProfile}
        goToPlaylist={goToPlaylist}
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
