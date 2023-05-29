import {StyleSheet, View} from 'react-native';
import React, {FC, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {color} from '../../theme';
import {MusicianDetail} from './MusicianDetail';
import {RootStackParams} from '../../navigations';
import {useSettingHook} from '../../hooks/use-setting.hook';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {usePlaylistHook} from '../../hooks/use-playlist.hook';
import {useMusicianHook} from '../../hooks/use-musician.hook';
import {FollowMusicianPropsType} from '../../interface/musician.interface';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';
import {storage} from '../../hooks/use-storage.hook';

type PostDetailProps = NativeStackScreenProps<
  RootStackParams,
  'MusicianProfile'
>;

const MusicianProfile: FC<PostDetailProps> = ({route}: PostDetailProps) => {
  const uuid = route.params.id;
  const isLogin = storage.getBoolean('isLogin');
  const {dataCountProfile, getTotalCountProfile} = useProfileHook();
  const {dataPlaylist, getPlaylist, getPlaylistPublic} = usePlaylistHook();

  const {
    isLoadingMusician,
    dataDetailMusician,
    dataAlbum,
    getAlbum,
    getDetailMusician,
    getDetailMusicianGuest,
    setFollowMusician,
    setUnfollowMusician,
  } = useMusicianHook();
  const {dataExclusiveContent, getExclusiveContent} = useSettingHook();

  //  ? Get Detail Musician
  useFocusEffect(
    useCallback(() => {
      isLogin
        ? getDetailMusician({id: uuid})
        : getDetailMusicianGuest({id: uuid});
      getTotalCountProfile({uuid});
      getExclusiveContent({uuid: uuid});
      if (isLogin) {
        getPlaylist({uuid});
      } else {
        getPlaylistPublic({uuid});
      }
    }, [uuid]),
  );

  //  ? Get Album Musician
  useFocusEffect(
    useCallback(() => {
      getAlbum({uuid: uuid});
    }, [uuid]),
  );

  useEffect(() => {
    console.log({dataDetailMusician});
  }, [dataDetailMusician]);

  const musicianPlaylist =
    dataPlaylist !== undefined && dataPlaylist !== null
      ? dataPlaylist?.filter(val => !val.isDefaultPlaylist && val.isPublic)
      : [];

  return (
    <View style={styles.root}>
      {dataDetailMusician && (
        <MusicianDetail
          profile={{
            ...dataDetailMusician,
            totalRelease: dataCountProfile?.countAlbumReleased || 0,
            totalPlaylist: dataCountProfile?.countPlaylist || 0,
          }}
          uuid={uuid}
          dataAlbum={dataAlbum}
          dataPlaylist={musicianPlaylist}
          setFollowMusician={(props?: FollowMusicianPropsType) =>
            setFollowMusician(props, {}, true)
          }
          setUnfollowMusician={(props?: FollowMusicianPropsType) =>
            setUnfollowMusician(props, {}, true)
          }
          exclusiveContent={dataExclusiveContent ?? undefined}
        />
      )}
      <ModalLoading visible={isLoadingMusician} />
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
