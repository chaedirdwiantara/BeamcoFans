import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {storage} from '../../hooks/use-storage.hook';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {profileStorage} from '../../hooks/use-storage.hook';
import {GuestContent, ProfileContent} from '../../components';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';
import {MainTabParams, RootStackParams} from '../../navigations';

type ProfileProps = NativeStackScreenProps<MainTabParams, 'Profile'>;

export const ProfileScreen: React.FC<ProfileProps> = ({
  route,
}: ProfileProps) => {
  const {showToast, deletePlaylist} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {isLoading, dataProfile, getProfileUser} = useProfileHook();
  const {playlistLoading, dataPlaylist, getPlaylist} = usePlaylistHook();
  const isLogin = storage.getString('profile');
  const isFocused = useIsFocused();
  const {isPlaying, showPlayer, hidePlayer} = usePlayerHook();
  const [toastText, setToastText] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  useEffect(() => {
    if (showToast !== undefined && !deletePlaylist) {
      setToastVisible(showToast);
      setToastText('Your Profile have been updated!');
    } else if (deletePlaylist !== undefined) {
      setToastVisible(deletePlaylist);
      setToastText('Playlist have been deleted!');
    }
  }, [route.params]);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  useEffect(() => {
    if (isFocused && isPlaying) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      getProfileUser();
      getPlaylist({uuid: profileStorage()?.uuid});
    }, []),
  );

  const onPressGoTo = (
    screenName: 'Setting' | 'Following' | 'CreateNewPlaylist',
  ) => {
    navigation.navigate(screenName);
  };

  const goToEditProfile = () => {
    if (dataProfile !== undefined) {
      navigation.navigate('EditProfile', {...dataProfile?.data});
    }
  };

  const goToPlaylist = (id: number) => {
    navigation.navigate('Playlist', {id});
  };

  const banners =
    dataProfile?.data !== undefined && dataProfile?.data.banners?.length > 0
      ? dataProfile?.data.banners[2].image
      : null;

  const avatar =
    dataProfile?.data !== undefined && dataProfile?.data.images?.length > 0
      ? dataProfile?.data.images[2].image
      : null;

  const profile = {
    fullname: dataProfile?.data.fullname,
    username: '@' + dataProfile?.data.username,
    bio: dataProfile?.data.about || "I'm here to support the musician",
    backgroundUri: banners,
    avatarUri: avatar,
    totalFollowing: dataProfile?.data.following,
  };

  return (
    <View style={styles.root}>
      {isLogin ? (
        <ProfileContent
          profile={profile}
          goToPlaylist={goToPlaylist}
          dataPlaylist={dataPlaylist}
          goToEditProfile={goToEditProfile}
          onPressGoTo={screenName => onPressGoTo(screenName)}
          showCreateCard
          toastVisible={toastVisible}
          setToastVisible={setToastVisible}
          toastText={toastText}
          isLoading={isLoading || playlistLoading}
        />
      ) : (
        <GuestContent />
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
