import {StyleSheet, View} from 'react-native';
import React, {FC, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {color} from '../../theme';
import {MusicianDetail} from './MusicianDetail';
import {RootStackParams} from '../../navigations';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {useMusicianHook} from '../../hooks/use-musician.hook';
import {FollowMusicianPropsType} from '../../interface/musician.interface';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';

type PostDetailProps = NativeStackScreenProps<
  RootStackParams,
  'MusicianProfile'
>;

const MusicianProfile: FC<PostDetailProps> = ({route}: PostDetailProps) => {
  const uuid = route.params.id;
  const {dataCountProfile, getTotalCountProfile} = useProfileHook();

  const {
    isLoading,
    dataDetailMusician,
    dataAlbum,
    getAlbum,
    getDetailMusician,
    setFollowMusician,
    setUnfollowMusician,
  } = useMusicianHook();

  //  ? Get Detail Musician
  useFocusEffect(
    useCallback(() => {
      getDetailMusician({id: uuid});
      getTotalCountProfile({uuid});
    }, [uuid]),
  );

  //  ? Get Album Musician
  useFocusEffect(
    useCallback(() => {
      getAlbum({uuid: uuid});
    }, [uuid]),
  );

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
          setFollowMusician={(props?: FollowMusicianPropsType) =>
            setFollowMusician(props, {}, true)
          }
          setUnfollowMusician={(props?: FollowMusicianPropsType) =>
            setUnfollowMusician(props, {}, true)
          }
        />
      )}
      <ModalLoading visible={isLoading} />
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
