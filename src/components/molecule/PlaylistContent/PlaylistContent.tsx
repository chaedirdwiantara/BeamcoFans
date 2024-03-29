import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {
  heightPercentage,
  heightResponsive,
  normalize,
  width,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {
  ArrowLeftIcon,
  CheckCircle2Icon,
  DefaultImage,
  MusicSquareAddIcon,
} from '../../../assets/icon';
import {
  addOtherPlaylist,
  deletePlaylist,
  removeOtherPlaylist,
  removeSongFromPlaylist,
} from '../../../api/playlist.api';
import {Gap, SsuToast} from '../../atom';
import Color from '../../../theme/Color';
import {PhotoPlaylist} from './PhotoPlaylist';
import {TopNavigation} from '../TopNavigation';
import {ModalShare} from '../Modal/ModalShare';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {color, font, typography} from '../../../theme';
import {DataDropDownType} from '../../../data/dropdown';
import {storage} from '../../../hooks/use-storage.hook';
import {dateLongMonth} from '../../../utils/date-format';
import ListSongs from '../../../screen/ListCard/ListSongs';
import {SongList} from '../../../interface/song.interface';
import {SongTitlePlay} from '../SongTitlePlay/SongTitlePlay';
import {usePlayerHook} from '../../../hooks/use-player.hook';
import DropdownMore from '../V2/DropdownFilter/DropdownMore';
import {Playlist} from '../../../interface/playlist.interface';
import {BottomSheetGuest} from '../GuestComponent/BottomSheetGuest';
import {ListDataSearchSongs} from '../../../interface/search.interface';
import {useShareHook} from '../../../hooks/use-share.hook';
import Clipboard from '@react-native-clipboard/clipboard';

interface Props {
  goBackProfile: (showToast: boolean) => void;
  goToEditPlaylist: () => void;
  goToAddSong: () => void;
  dataDetail: Playlist;
  listSongs: SongList[];
  onPressSong: (param: SongList | null) => void;
  playerVisible: boolean;
  isPlaying: boolean;
  handlePlayPaused: () => void;
  playlistId: number;
  setFetchListSong: () => void;
  goToAlbum: (id: number) => void;
  goToDetailSong: (id: number, musicianId: string) => void;
  otherPlaylist: boolean;
  goToAddToPlaylist: (id: number) => void;
  goToProfile: (uuid: string, type: string) => void;
}

export const PlaylistContent: React.FC<Props> = ({
  goBackProfile,
  goToEditPlaylist,
  goToAddSong,
  dataDetail,
  listSongs,
  onPressSong,
  playerVisible,
  isPlaying,
  handlePlayPaused,
  playlistId,
  setFetchListSong,
  goToAlbum,
  goToDetailSong,
  goToAddToPlaylist,
  goToProfile,
}) => {
  const {t} = useTranslation();
  const {addSong} = usePlayerHook();
  const {shareLink, getShareLink, successGetLink} = useShareHook();
  const isLogin = storage.getBoolean('isLogin');
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>('');
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [modalShareTitle, setModalShareTitle] = useState<string>('');
  const [isAdded, setIsAdded] = useState<boolean>(
    dataDetail.isAddedToMyPlaylist,
  );
  const [modalGuestVisible, setModalGuestVisible] = useState<boolean>(false);

  const textAddToPlaylist = isAdded
    ? 'Remove from My Playlist'
    : 'Add to My Playlist';

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  const dataMore = [
    {label: t('Home.Tab.TopSong.Queue'), value: 'AddToQueue'},
    {label: t('Music.Playlist.Edit'), value: 'EditPlaylist'},
    {label: t('Music.Playlist.Share'), value: 'SharePlaylist'},
    {label: t('Music.Playlist.Delete'), value: 'DeletePlaylist'},
  ];

  const dataMoreOther = [
    {label: t('Home.Tab.TopSong.Queue'), value: 'AddToQueue'},
    {label: t('Music.Playlist.Share'), value: 'SharePlaylist'},
    {label: textAddToPlaylist, value: textAddToPlaylist},
  ];

  const songDataMore = [
    {label: t('Home.Tab.TopSong.Queue'), value: 'AddToQueue'},
    {label: t('Music.Playlist.ViewAlbum'), value: 'ViewAlbum'},
    {label: t('Music.Playlist.Remove'), value: 'RemoveFromPlaylist'},
    {label: t('Home.Tab.TopSong.Share'), value: 'ShareSong'},
    {label: t('Home.Tab.TopSong.Details'), value: 'ShowDetails'},
  ];

  const songDataMoreOther = [
    // {label: t('Home.Tab.TopSong.Playlist'), value: 'AddToPlaylist'},
    {label: t('Home.Tab.TopSong.Queue'), value: 'AddToQueue'},
    {label: t('Music.Playlist.ViewAlbum'), value: 'ViewAlbum'},
    {label: t('Home.Tab.TopSong.Share'), value: 'ShareSong'},
    {label: t('Home.Tab.TopSong.Details'), value: 'ShowDetails'},
  ];

  const onPressDelete = async () => {
    try {
      await deletePlaylist(dataDetail);
      goBackProfile(true);
    } catch (error) {
      console.log(error);
    }
  };

  const addToMyPlaylist = async () => {
    try {
      if (textAddToPlaylist === 'Add to My Playlist') {
        await addOtherPlaylist({playlistReferenceId: dataDetail.id});
        setToastVisible(true);
        setToastText('Playlist have been added to My Playlist!');
        setIsAdded(true);
      } else {
        await removeOtherPlaylist({playlistReferenceId: dataDetail.id});
        setToastVisible(true);
        setToastText('Playlist have been remove from My Playlist!');
        setIsAdded(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const resultDataMore = (dataResult: DataDropDownType) => {
    if (isLogin) {
      if (dataResult?.value === 'DeletePlaylist') {
        setModalVisible(true);
      } else if (dataResult?.value === 'EditPlaylist') {
        goToEditPlaylist();
      } else if (dataResult?.value === 'AddToQueue') {
        setToastVisible(true);
        setToastText('Playlist added to queue!');
        addSong(listSongs);
      } else if (dataResult?.value === textAddToPlaylist) {
        addToMyPlaylist();
      } else {
        setModalShare(true);
        setModalShareTitle(t('General.Share.Playlist') || '');
      }
    } else {
      setModalGuestVisible(true);
    }
  };

  const pressSongDataMore = (
    dataResult: DataDropDownType,
    item: SongList | ListDataSearchSongs,
  ) => {
    if (isLogin) {
      if (dataResult?.value === 'RemoveFromPlaylist') {
        onPressRemoveSong(item.id, item.title);
      } else if (dataResult?.value === 'ShowDetails') {
        goToDetailSong(item.id, item.musicianId);
      } else if (dataResult?.value === 'AddToQueue') {
        addSong(item);
        setToastVisible(true);
        setToastText('Song added to queue!');
      } else if (dataResult?.value === 'ViewAlbum') {
        goToAlbum(item.album.id);
      } else if (dataResult?.value === 'AddToPlaylist') {
        goToAddToPlaylist(item.id);
      } else {
        setModalShare(true);
        setModalShareTitle(t('Home.Tab.TopSong.Share') || '');
      }
    } else {
      setModalGuestVisible(true);
    }
  };

  const onPressRemoveSong = async (songId: number, songName: string) => {
    try {
      const payload = {
        playlistId,
        songId,
      };
      await removeSongFromPlaylist(payload);
      setFetchListSong();
      setToastVisible(true);
      setToastText(songName + ' have been removed!');
    } catch (error) {
      console.log(error);
    }
  };

  const onPressTextAddSong = () => {
    if (isLogin) {
      if (othersPlaylist) {
        addToMyPlaylist();
      } else {
        goToAddSong();
      }
    } else {
      setModalGuestVisible(true);
    }
  };

  const songIsExist = listSongs !== null && listSongs !== undefined;
  const firstSong = songIsExist ? listSongs[0] : null;
  const othersPlaylist = dataDetail.isOtherOwnerPlaylist;

  useEffect(() => {
    if (dataDetail) {
      getShareLink({
        scheme: `/playlist/${playlistId}`,
        image: dataDetail?.thumbnailUrl,
        title: t('ShareLink.Music.Title', {title: dataDetail?.name}),
        description: t('ShareLink.Music.Playlist', {
          owner: dataDetail?.playlistOwner?.fullname,
        }),
      });
    }
  }, [dataDetail]);

  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title={t('Home.Topbar.Search.Playlist') || ''}
        rightIcon={
          <DropdownMore
            dataFilter={othersPlaylist ? dataMoreOther : dataMore}
            selectedMenu={resultDataMore}
            compWitdth={widthResponsive(150)}
          />
        }
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={() => goBackProfile(false)}
        rightIconAction={() => null}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />

      <ScrollView
        style={{marginBottom: playerVisible ? heightPercentage(40) : 0}}>
        <View style={{paddingHorizontal: widthPercentage(10)}}>
          <View style={{alignSelf: 'center'}}>
            {dataDetail?.thumbnailUrl ? (
              <PhotoPlaylist uri={dataDetail?.thumbnailUrl} />
            ) : (
              <DefaultImage.PlaylistCover
                width={widthResponsive(148)}
                height={widthResponsive(148)}
                style={{
                  marginTop: heightResponsive(36),
                  marginBottom: heightResponsive(28),
                }}
              />
            )}
          </View>
          <SongTitlePlay
            title={dataDetail?.name}
            totalSong={dataDetail?.totalSong}
            createdDate={dateLongMonth(dataDetail.createdAt)}
            createdBy={dataDetail?.playlistOwner?.fullname}
            avatarUri={dataDetail?.playlistOwner?.image}
            showIconPlay={listSongs?.length > 0}
            isPlaying={isPlaying}
            handlePlayPaused={handlePlayPaused}
            onPressSong={() => onPressSong(firstSong)}
            goToMusicianProfile={() =>
              goToProfile(
                dataDetail.playlistOwner.UUID,
                dataDetail.playlistOwner.ownerType,
              )
            }
          />

          <TouchableOpacity
            style={styles.containerAddSong}
            onPress={onPressTextAddSong}>
            <MusicSquareAddIcon />
            <Gap width={widthPercentage(10)} />
            <Text style={styles.textAddSong}>
              {othersPlaylist ? textAddToPlaylist : t('Music.Label.AddSong')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <View style={styles.containerContent}>
          <View style={{marginBottom: heightPercentage(25)}}>
            <Text style={[typography.Subtitle1, {color: color.Success[500]}]}>
              Description
            </Text>
            <Text style={styles.description}>
              {dataDetail?.description
                ? dataDetail.description
                : t('General.NoDescription')}
            </Text>
          </View>

          <Text style={[typography.Subtitle1, {color: color.Success[500]}]}>
            {t('Music.Label.SongList')}
          </Text>
          <View>
            {listSongs === null || listSongs?.length === 0 ? (
              <Text style={styles.description}>{t('Music.Label.NoSong')}</Text>
            ) : (
              <ListSongs
                dataSong={listSongs}
                type={'home'}
                onPress={onPressSong}
                loveIcon={isLogin}
                newDataMore={othersPlaylist ? songDataMoreOther : songDataMore}
                newOnPressMore={pressSongDataMore}
              />
            )}
          </View>
        </View>
      </ScrollView>

      <ModalConfirm
        modalVisible={isModalVisible}
        title={t('Music.Playlist.Delete') || ''}
        subtitle={t('Modal.Playlist.Delete') || ''}
        onPressClose={() => setModalVisible(false)}
        onPressOk={onPressDelete}
      />

      <BottomSheetGuest
        modalVisible={modalGuestVisible}
        onPressClose={() => setModalGuestVisible(false)}
      />

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <CheckCircle2Icon />
            <Gap width={4} />
            <Text style={[styles.textStyle]} numberOfLines={2}>
              {toastText}
            </Text>
          </View>
        }
        modalStyle={styles.toast}
      />

      <ModalShare
        url={shareLink}
        modalVisible={modalShare}
        onPressClose={() => setModalShare(false)}
        titleModal={modalShareTitle}
        hideMusic={modalShareTitle === t('Home.Tab.TopSong.Share')}
        imgUri={dataDetail?.thumbnailUrl}
        type={'Playlist'}
        titleSong={dataDetail?.name}
        createdOn={dateLongMonth(dataDetail.createdAt)}
        artist={dataDetail?.playlistOwner?.fullname}
        onPressCopy={() => {
          InteractionManager.runAfterInteractions(() => {
            Clipboard.setString(shareLink);
            setToastVisible(true);
            setToastText(t('General.LinkCopied') || '');
          });
        }}
        disabled={!successGetLink}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  dropdownMore: {
    width: widthPercentage(123),
    marginLeft: widthPercentage(-113),
    marginTop: heightPercentage(-8),
  },
  containerAddSong: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthPercentage(12),
    marginTop: heightPercentage(12),
  },
  textAddSong: {
    fontSize: normalize(12),
    color: color.Dark[50],
    fontFamily: font.InterMedium,
  },
  separator: {
    width,
    height: 1,
    backgroundColor: color.Dark[500],
    marginTop: heightPercentage(15),
  },
  containerContent: {
    flex: 1,
    paddingHorizontal: widthPercentage(20),
    paddingTop: heightPercentage(20),
    marginBottom: heightPercentage(30),
  },
  description: {
    fontSize: mvs(13),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    paddingTop: heightPercentage(8),
  },
  modalContainer: {
    width: '90%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: widthResponsive(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(13),
  },
  toast: {
    maxWidth: '100%',
    marginHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
