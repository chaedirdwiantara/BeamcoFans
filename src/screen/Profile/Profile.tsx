import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import Color from '../../theme/Color';
import {storage} from '../../hooks/use-storage.hook';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {profileStorage} from '../../hooks/use-storage.hook';
import {GuestContent, ProfileContent} from '../../components';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';
import {RootStackParams} from '../../navigations';

type ProfileProps = NativeStackScreenProps<RootStackParams, 'Profile'>;

export const ProfileScreen: React.FC<ProfileProps> = ({
  route,
}: ProfileProps) => {
  const {showToast, deletePlaylist} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {t} = useTranslation();
  const {
    isLoading,
    dataProfile,
    dataCountLiked,
    getProfileUser,
    getUserCountLikedSong,
  } = useProfileHook();
  const {dataPlaylist, getPlaylist, getPlaylistPublic} = usePlaylistHook();
  const isLogin = storage.getString('profile');
  const {visible: playerVisible} = usePlayerHook();
  const [toastText, setToastText] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      const tabActive = storage.getBoolean('editProfileSuccess') || false;
      setToastVisible(tabActive);
      setToastText('Your Profile have been updated!');
      storage.delete('editProfileSuccess');
    }, []),
  );

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  useFocusEffect(
    useCallback(() => {
      getProfileUser();
    }, [refreshing]),
  );

  useEffect(() => {
    getUserCountLikedSong({uuid: profileStorage()?.uuid});
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    if (isLogin) {
      getPlaylist({uuid: profileStorage()?.uuid});
    } else {
      getPlaylistPublic({uuid: profileStorage()?.uuid});
    }
  }, [refreshing, showToast, deletePlaylist]);

  const goToSetting = () => {
    navigation.navigate('Setting');
  };

  const goToFollowing = () => {
    navigation.navigate('Following', {uuid: profileStorage()?.uuid});
  };

  const goToCreatePlaylist = () => {
    navigation.navigate('CreateNewPlaylist', {});
  };

  const goToEditProfile = () => {
    if (dataProfile !== undefined) {
      navigation.navigate('EditProfile');
    }
  };

  const goToPlaylist = (id: number, name: string) => {
    navigation.navigate('Playlist', {id, name});
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
    ...dataProfile?.data,
    fullname: dataProfile?.data.fullname,
    username: '@' + dataProfile?.data.username,
    bio: dataProfile?.data.about || t('Profile.Label.Description'),
    backgroundUri: banners,
    avatarUri: avatar,
    totalFollowing: dataProfile?.data.following,
    totalLikedSong: dataProfile?.data.songAdded,
    totalPoint: dataProfile?.data.point.daily,
    uuid: dataProfile?.data.uuid,
  };

  return (
    <View style={styles.root}>
      {isLogin ? (
        <>
          {dataProfile && (
            <ProfileContent
              profile={profile}
              goToPlaylist={goToPlaylist}
              dataPlaylist={dataPlaylist}
              goToEditProfile={goToEditProfile}
              showCreateCard
              toastVisible={toastVisible}
              setToastVisible={setToastVisible}
              toastText={toastText}
              playerVisible={playerVisible}
              totalCountlikedSong={dataCountLiked?.countLikedSong || 0}
              refreshing={refreshing}
              setRefreshing={() => setRefreshing(true)}
              goToSetting={goToSetting}
              goToFollowing={goToFollowing}
              goToCreatePlaylist={goToCreatePlaylist}
              qrType="myProfile"
            />
          )}
        </>
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
