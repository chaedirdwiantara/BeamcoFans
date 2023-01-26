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
  const {dataProfile, getOtherProfileUser} = useProfileHook();
  const {dataPlaylist, getPlaylist} = usePlaylistHook();
  const isLogin = storage.getString('profile');
  const isFocused = useIsFocused();
  const {isPlaying, showPlayer, hidePlayer} = usePlayerHook();
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
      getPlaylist();
      getOtherProfileUser({id: data.id});
    }, []),
  );

  const profile = {
    fullname: dataProfile?.data.fullname,
    username: '@' + dataProfile?.data.username,
    bio: dataProfile?.data.about,
    backgroundUri: dataProfile?.data?.banner,
    avatarUri: dataProfile?.data.imageProfileUrl,
    totalFollowing: dataProfile?.data.following,
  };

  return (
    <View style={styles.root}>
      {isLogin ? (
        <ProfileContent
          profile={profile}
          goToPlaylist={() => {}}
          dataPlaylist={dataPlaylist}
          goToEditProfile={() => {}}
          onPressGoTo={() => {}}
          showCreateCard={false}
          toastVisible={toastVisible}
          setToastVisible={setToastVisible}
          toastText={''}
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
