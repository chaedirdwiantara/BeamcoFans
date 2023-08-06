import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  InteractionManager,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  SongTitlePlay,
  ListenersAndDonate,
  ModalDonate,
  ModalShare,
  ModalSuccessDonate,
  BottomSheetGuest,
  MusicSection,
  ModalReport,
  SuccessToast,
} from '../';
import {
  heightPercentage,
  heightResponsive,
  width,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {
  ArrowLeftIcon,
  DefaultImage,
  TickCircleIcon,
} from '../../../assets/icon';
import Color from '../../../theme/Color';
import {Gap, SsuToast} from '../../atom';
import {
  DataDetailAlbum,
  SongComingSoon,
  SongList,
} from '../../../interface/song.interface';
import {TopNavigation} from '../TopNavigation';
import {RootStackParams} from '../../../navigations';
import {color, font, typography} from '../../../theme';
import {profileStorage, storage} from '../../../hooks/use-storage.hook';
import {dateLongMonth} from '../../../utils/date-format';
import ListSongs from '../../../screen/ListCard/ListSongs';
import {usePlayerHook} from '../../../hooks/use-player.hook';
import DropdownMore from '../V2/DropdownFilter/DropdownMore';
import {PhotoPlaylist} from '../PlaylistContent/PhotoPlaylist';
import LoadingSpinner from '../../atom/Loading/LoadingSpinner';
import {ListDataSearchSongs} from '../../../interface/search.interface';
import {
  DataDropDownType,
  albumReport,
  albumReportSent,
  dropDownHeaderAlbum,
} from '../../../data/dropdown';
import {useShareHook} from '../../../hooks/use-share.hook';
import Clipboard from '@react-native-clipboard/clipboard';
import {reportingMenu} from '../../../data/report';
import {ReportParamsProps} from '../../../interface/report.interface';
import {useReportHook} from '../../../hooks/use-report.hook';
import {mediaReportRecorded} from '../../../store/idReported';

interface Props {
  dataSong: SongList[] | ListDataSearchSongs[];
  dataSongComingSoon: SongComingSoon[];
  detailAlbum: DataDetailAlbum;
  onPressGoBack: () => void;
  isLoading: boolean;
  comingSoon?: boolean;
}

export const AlbumContent: React.FC<Props> = ({
  detailAlbum,
  dataSong,
  onPressGoBack,
  comingSoon,
  isLoading,
  dataSongComingSoon,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const isLogin = storage.getBoolean('isLogin');
  const MyUuid = profileStorage()?.uuid;

  const {
    isPlaying,
    visible: playerVisible,
    showPlayer,
    hidePlayer,
    addPlaylist,
  } = usePlayerHook();

  const {
    dataReport,
    reportIsLoading,
    reportIsError,
    setDataReport,
    setPostReport,
  } = useReportHook();

  const {idReported, setIdReported} = mediaReportRecorded();

  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const {addSong} = usePlayerHook();
  const {shareLink, getShareLink, successGetLink} = useShareHook();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastText, setToastText] = useState<string>('');
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);
  const [songIdList, setSongIdList] = useState<number[]>([]);
  const [modalGuestVisible, setModalGuestVisible] = useState<boolean>(false);
  const [reportToast, setReportToast] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [reason, setReason] = useState<string>('');

  useEffect(() => {
    if (isFocused && isPlaying) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
  }, [isFocused, isPlaying]);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  useEffect(() => {
    modalSuccessDonate &&
      setTimeout(() => {
        setModalSuccessDonate(false);
      }, 3000);
  }, [modalSuccessDonate, trigger2ndModal]);

  useEffect(() => {
    if (dataSong !== null) {
      let Xter = [];
      for (let i = 1; i <= dataSong.length; i++) {
        Xter.push(dataSong[i]?.id);
      }
      setSongIdList(Xter);
    }
  }, [dataSong]);

  //? set status disable after report sent to make sure the status report is updated
  useEffect(() => {
    if (dataReport && detailAlbum?.id) {
      if (!idReported.includes(detailAlbum.id)) {
        setIdReported([...idReported, detailAlbum.id]);
      }
    }
  }, [dataReport]);

  const resultDataMore = (dataResult: DataDropDownType) => {
    if (isLogin) {
      if (dataResult.value === '1') {
        if (dataSong !== null) {
          setToastVisible(true);
          setToastText('Playlist added to queue!');
          addSong(dataSong);
        }
      } else if (dataResult.value === '22') {
        setReportToast(true);
      } else {
        setModalShare(true);
      }
    } else {
      setModalGuestVisible(true);
    }
  };

  const sendOnPress = () => {
    const reportBody: ReportParamsProps = {
      reportType: 'album',
      reportTypeId: detailAlbum.id ?? 0,
      reporterUuid: MyUuid ?? '',
      reportedUuid: detailAlbum.musician.uuid ?? '',
      reportCategory: t(selectedCategory ?? ''),
      reportReason: reason ?? '',
    };
    setPostReport(reportBody);
  };

  const closeModalSuccess = () => {
    setDataReport(false);
  };

  const onPressCoin = () => {
    isLogin ? setModalDonate(true) : setModalGuestVisible(true);
  };

  const onPressDonate = () => {
    setModalDonate(false);
    setTrigger2ndModal(true);
  };

  const onPressSuccess = () => {
    setModalSuccessDonate(false);
  };

  const onPressSong = (val: SongList) => {
    addPlaylist({
      dataSong: dataSong ? dataSong : [],
      playSongId: val?.id,
      isPlay: true,
    });
    showPlayer();
  };

  const goToMusicianProfile = () => {
    navigation.push('MusicianProfile', {id: detailAlbum.musician.uuid});
  };

  const createdDate = comingSoon
    ? dateLongMonth(detailAlbum.releaseDateScheduled)
    : dateLongMonth(detailAlbum.publishedDate);

  const checkImageAlbum = detailAlbum && detailAlbum.imageUrl.length > 0;
  const totalSong = comingSoon ? dataSongComingSoon.length : dataSong.length;

  useEffect(() => {
    if (detailAlbum) {
      getShareLink({
        scheme: `/album/${detailAlbum?.id}`,
        image: detailAlbum?.imageUrl[1].image,
        title: t('ShareLink.Music.Title', {title: detailAlbum?.title}),
        description: t('ShareLink.Music.Album', {
          owner: detailAlbum.musician.name,
        }),
      });
    }
  }, [detailAlbum]);

  const dropDownAlbumReport = !idReported.includes(detailAlbum?.id)
    ? albumReport
    : albumReportSent;

  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title={t('Musician.Label.Album')}
        rightIcon={
          comingSoon ? (
            <></>
          ) : (
            <DropdownMore
              dataFilter={
                detailAlbum?.musician.uuid === MyUuid
                  ? dropDownHeaderAlbum
                  : dropDownAlbumReport
              }
              selectedMenu={resultDataMore}
            />
          )
        }
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        rightIconAction={() => null}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />

      <ScrollView>
        <View style={{paddingHorizontal: widthPercentage(10)}}>
          <View style={{alignSelf: 'center'}}>
            {checkImageAlbum ? (
              <PhotoPlaylist uri={detailAlbum?.imageUrl[1].image} />
            ) : (
              <View style={styles.undefinedImg}>
                <DefaultImage.PlaylistCover
                  width={widthResponsive(148)}
                  height={widthResponsive(148)}
                />
              </View>
            )}
          </View>
          <SongTitlePlay
            title={detailAlbum.title}
            totalSong={totalSong || 0}
            createdDate={createdDate}
            createdBy={
              detailAlbum?.musician?.name !== undefined
                ? detailAlbum?.musician.name
                : ''
            }
            avatarUri={detailAlbum?.musician.imageProfile || ''}
            showIconPlay={false}
            isPlaying={false}
            handlePlayPaused={() => {}}
            onPressSong={() => {}}
            goToMusicianProfile={goToMusicianProfile}
            comingSoon={comingSoon}
          />
          {!comingSoon && (
            <ListenersAndDonate
              totalListener={
                detailAlbum?.totalCountListener
                  ? detailAlbum?.totalCountListener
                  : 0
              }
              onPress={onPressCoin}
            />
          )}
        </View>

        <View style={styles.separator} />

        <View style={styles.containerContent}>
          <View style={{marginBottom: heightPercentage(15)}}>
            <Text style={[typography.Subtitle1, {color: color.Success[500]}]}>
              {t('Event.Description')}
            </Text>
            <Text style={styles.description}>
              {detailAlbum.description
                ? detailAlbum.description
                : 'No Description Given'}
            </Text>
          </View>

          <Text style={[typography.Subtitle1, {color: color.Success[500]}]}>
            {t('Music.Label.SongList')}
          </Text>
          <View style={{marginBottom: heightPercentage(30)}}>
            {isLoading ? (
              <View style={styles.loadingSpinner}>
                <LoadingSpinner />
              </View>
            ) : comingSoon ? (
              dataSongComingSoon.map((item, index) => (
                <MusicSection
                  imgUri={checkImageAlbum ? detailAlbum?.imageUrl[1].image : ''}
                  musicTitle={item.title}
                  musicNum={index + 1}
                  singerId={item.musician.uuid}
                  singerName={item.musician.name}
                  songId={item.id}
                  onPressAddToQueue={() => null}
                  key={index}
                  containerStyles={{marginTop: mvs(20), marginLeft: ms(5)}}
                  disabled={comingSoon}
                  hideDropdownMore={true}
                />
              ))
            ) : (
              <ListSongs
                onPress={onPressSong}
                dataSong={dataSong}
                type="home"
                loveIcon={true}
              />
            )}
          </View>
        </View>
      </ScrollView>

      <ModalDonate
        userId={detailAlbum.musician.uuid}
        onPressDonate={onPressDonate}
        modalVisible={modalDonate}
        onModalHide={() => setModalSuccessDonate(true)}
        onPressClose={() => setModalDonate(false)}
      />

      <ModalSuccessDonate
        modalVisible={modalSuccessDonate && trigger2ndModal ? true : false}
        toggleModal={onPressSuccess}
      />

      <BottomSheetGuest
        modalVisible={modalGuestVisible}
        onPressClose={() => setModalGuestVisible(false)}
      />

      <ModalShare
        url={shareLink}
        modalVisible={modalShare}
        onPressClose={() => setModalShare(false)}
        titleModal={t('General.Share.Album')}
        imgUri={
          detailAlbum.imageUrl.length !== 0 ? detailAlbum.imageUrl[0].image : ''
        }
        type={'Album'}
        titleSong={detailAlbum.title}
        createdOn={detailAlbum.productionYear}
        artist={detailAlbum.musician.name}
        onPressCopy={() =>
          InteractionManager.runAfterInteractions(() => {
            Clipboard.setString(shareLink);
            setToastText(t('General.LinkCopied') || '');
            setToastVisible(true);
          })
        }
        disabled={!successGetLink}
      />

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <TickCircleIcon
              width={widthPercentage(21)}
              height={heightPercentage(20)}
              stroke={color.Neutral[10]}
            />
            <Gap width={widthPercentage(7)} />
            <Text style={[typography.Button2, styles.textStyle]}>
              {toastText}
            </Text>
          </View>
        }
        modalStyle={{marginHorizontal: widthPercentage(24)}}
      />

      <ModalReport
        modalVisible={reportToast}
        onPressClose={() => setReportToast(false)}
        title={`${t('ModalComponent.Report.Type.Album.FirstTitle')}`}
        secondTitle={`${t('ModalComponent.Report.Type.Album.SecondTitle')}`}
        dataReport={reportingMenu}
        onPressOk={sendOnPress}
        category={setSelectedCategory}
        reportReason={setReason}
      />
      {/* //? When report succesfully */}
      <SuccessToast
        toastVisible={dataReport}
        onBackPressed={closeModalSuccess}
        caption={t('ModalComponent.Report.ReportSuccess')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  dropDownMore: {
    width: widthPercentage(123),
    marginLeft: widthPercentage(-113),
    marginTop: heightPercentage(-8),
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
    paddingTop: heightPercentage(15),
  },
  description: {
    fontSize: mvs(13),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    paddingTop: heightPercentage(8),
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: widthPercentage(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: color.Neutral[10],
  },
  undefinedImg: {
    marginTop: heightResponsive(36),
    marginBottom: heightResponsive(28),
  },
  loadingSpinner: {
    alignItems: 'center',
    paddingVertical: mvs(20),
  },
});
