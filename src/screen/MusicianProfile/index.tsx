import {StyleSheet, View} from 'react-native';
import React, {FC, useCallback, useState} from 'react';
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
import {profileStorage, storage} from '../../hooks/use-storage.hook';

type PostDetailProps = NativeStackScreenProps<
  RootStackParams,
  'MusicianProfile'
>;

const MusicianProfile: FC<PostDetailProps> = ({route}: PostDetailProps) => {
  const uuid = route.params.id;
  const MyUuid = profileStorage()?.uuid;
  const isLogin = storage.getBoolean('isLogin');
  const {dataCountProfile, getTotalCountProfile} = useProfileHook();
  const {dataPlaylist, getPlaylist, getPlaylistPublic} = usePlaylistHook();
  const {
    isLoadingAlbum,
    isLoadingMusician,
    dataDetailMusician,
    dataAlbum,
    dataAppearsOn,
    getAlbum,
    getDetailMusician,
    getDetailMusicianGuest,
    setFollowMusician,
    setUnfollowMusician,
    getDataAppearsOn,
  } = useMusicianHook();
  const {dataExclusiveContent, getExclusiveContent} = useSettingHook();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [refetchBlock, setRefetchBlock] = useState<boolean>(false);

  //  ? Get Detail Musician
  useFocusEffect(
    useCallback(() => {
      isLogin
        ? getDetailMusician({id: uuid, myUUID: MyUuid})
        : getDetailMusicianGuest({id: uuid});
      getTotalCountProfile({uuid});
      getExclusiveContent({uuid: uuid});
      if (isLogin) {
        getPlaylist({uuid});
      } else {
        getPlaylistPublic({uuid});
      }

      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }, [uuid, refresh]),
  );

  //  ? Get Album Musician
  useFocusEffect(
    useCallback(() => {
      getAlbum({uuid: uuid});
      getDataAppearsOn({uuid});

      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }, [uuid, refresh]),
  );

  const handleRefreshing = () => {
    getDetailMusician({id: uuid, myUUID: MyUuid});
    setRefetchBlock(true);
  };

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
          dataAppearsOn={dataAppearsOn}
          dataPlaylist={musicianPlaylist}
          setFollowMusician={(props?: FollowMusicianPropsType) =>
            setFollowMusician(props, {}, true)
          }
          setUnfollowMusician={(props?: FollowMusicianPropsType) =>
            setUnfollowMusician(props, {}, true)
          }
          exclusiveContent={dataExclusiveContent ?? undefined}
          refresh={refresh}
          setRefresh={() => setRefresh(true)}
          setRefreshing={handleRefreshing}
          isLoading={isLoadingMusician || isLoadingAlbum}
        />
      )}
      <ModalLoading
        visible={
          (isLoadingMusician || isLoadingAlbum) && !refresh && !refetchBlock
        }
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
