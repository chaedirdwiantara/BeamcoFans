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
import {ProfileContent} from '../../components';
import {RootStackParams} from '../../navigations';
import {profileStorage, storage} from '../../hooks/use-storage.hook';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {useProfileHook} from '../../hooks/use-profile.hook';
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
  const MyUuid = profileStorage()?.uuid;

  const {dataPlaylist, getPlaylist, getPlaylistPublic} = usePlaylistHook();
  const isLogin = storage.getBoolean('isLogin');
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
      getOtherProfileUser({id: data.id, myUUID: MyUuid});
      getUserCountLikedSong({uuid: data.id});
      if (isLogin) {
        getPlaylist({uuid: data.id});
      } else {
        getPlaylistPublic({uuid: data.id});
      }
    }, []),
  );

  const profile = {
    ...dataProfile?.data,
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
    isBlock: dataProfile?.data.isBlock,
    blockIs: dataProfile?.data.blockIs,
    uuid: dataProfile?.data.uuid,
  };

  const goToPlaylist = (id: number, name: string) => {
    navigation.push('Playlist', {id, name, from: 'other'});
  };

  const goToFollowing = () => {
    navigation.push('Following', {uuid: data.id});
  };

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const handleRefreshing = () => {
    getOtherProfileUser({id: data.id, myUUID: MyUuid});
  };

  return (
    <View style={styles.root}>
      <ProfileContent
        profile={profile}
        goToPlaylist={goToPlaylist}
        dataPlaylist={dataPlaylist?.filter(val => val.isPublic)}
        goToEditProfile={() => {}}
        goToFollowing={goToFollowing}
        showCreateCard={false}
        toastVisible={toastVisible}
        setToastVisible={setToastVisible}
        toastText={''}
        playerVisible={playerVisible}
        totalCountlikedSong={dataCountLiked?.countLikedSong}
        refreshing={false}
        setRefreshing={handleRefreshing}
        otherUserProfile={true}
        onPressGoBack={onPressGoBack}
        goToSetting={() => {}}
        goToCreatePlaylist={() => {}}
        qrType="fans"
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
