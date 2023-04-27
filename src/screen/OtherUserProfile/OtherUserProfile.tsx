import React, {FC, useCallback, useEffect, useState} from 'react';
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
import {RootStackParams} from '../../navigations';
import {storage} from '../../hooks/use-storage.hook';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {GuestContent, ProfileContent} from '../../components';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';

type OtherProfileProps = NativeStackScreenProps<
  RootStackParams,
  'OtherUserProfile'
>;

export const OtherUserProfile: FC<OtherProfileProps> = ({
  route,
}: OtherProfileProps) => {
  const data = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    dataProfile,
    getOtherProfileUser,
    dataCountLiked,
    getUserCountLikedSong,
  } = useProfileHook();
  const {dataPlaylist, getPlaylist} = usePlaylistHook();
  const isLogin = storage.getString('profile');
  const isFocused = useIsFocused();
  const {
    isPlaying,
    visible: playerVisible,
    showPlayer,
    hidePlayer,
  } = usePlayerHook();
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused && isPlaying) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      getPlaylist({uuid: data.id});
      getOtherProfileUser({id: data.id});
      getUserCountLikedSong({uuid: data.id});
    }, []),
  );

  const profile = {
    fullname: dataProfile?.data.fullname,
    username: '@' + dataProfile?.data.username,
    bio: dataProfile?.data.about,
    backgroundUri:
      dataProfile?.data?.banners.length !== 0
        ? dataProfile?.data?.banners[3].image
        : '',
    avatarUri:
      dataProfile?.data.images.length !== 0
        ? dataProfile?.data.images[1].image
        : '',
    totalFollowing: dataProfile?.data.following,
    totalPoint: dataProfile?.data.point.daily,
  };

  const goToPlaylist = (id: number, name: string) => {
    navigation.navigate('Playlist', {id, name, from: 'other'});
  };

  const goToFollowing = () => {
    navigation.navigate('Following', {uuid: data.id});
  };

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      {isLogin ? (
        <ProfileContent
          profile={profile}
          goToPlaylist={goToPlaylist}
          dataPlaylist={dataPlaylist}
          goToEditProfile={() => {}}
          onPressGoTo={goToFollowing}
          showCreateCard={false}
          toastVisible={toastVisible}
          setToastVisible={setToastVisible}
          toastText={''}
          playerVisible={playerVisible}
          totalCountlikedSong={dataCountLiked?.countLikedSong}
          refreshing={false}
          setRefreshing={() => {}}
          otherUserProfile={true}
          onPressGoBack={onPressGoBack}
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
