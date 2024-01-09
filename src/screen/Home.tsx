import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  RefreshControl,
  Platform,
  InteractionManager,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useMutation, useQuery} from 'react-query';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import {
  Gap,
  SsuToast,
  SearchBar,
  TabFilter,
  Carousel,
  IconNotif,
  SsuStatusBar,
  ListImageDesc,
  TopNavigation,
  ListPlaylistHome,
  BottomSheetGuest,
  ModalClaimCredits,
  ModalFreeBeer,
  ModalTopUp,
  Button,
} from '../components';
import {font} from '../theme';
import Color from '../theme/Color';
import TopSong from './ListCard/TopSong';
import NewSong from './ListCard/NewSong';
import {defaultBanner} from '../data/home';
import TopMusician from './ListCard/TopMusician';
import {useFcmHook} from '../hooks/use-fcm.hook';
import {useSongHook} from '../hooks/use-song.hook';
import {useHomeHook} from '../hooks/use-home.hook';
import {SongList} from '../interface/song.interface';
import * as FCMService from '../service/notification';
import {usePlayerHook} from '../hooks/use-player.hook';
import {useBannerHook} from '../hooks/use-banner.hook';
import {useCreditHook} from '../hooks/use-credit.hook';
import {useSearchHook} from '../hooks/use-search.hook';
import {ParamsProps} from '../interface/base.interface';
import {useProfileHook} from '../hooks/use-profile.hook';
import {useMusicianHook} from '../hooks/use-musician.hook';
import FavoriteMusician from './ListCard/FavoriteMusician';
import {CheckCircle2Icon, SearchIcon} from '../assets/icon';
import {MainTabParams, RootStackParams} from '../navigations';
import RecomendedMusician from './ListCard/RecomendedMusician';
import {storage} from '../hooks/use-storage.hook';
import {useNotificationHook} from '../hooks/use-notification.hook';
import LoadingSpinner from '../components/atom/Loading/LoadingSpinner';
import {FollowMusicianPropsType} from '../interface/musician.interface';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {ModalPlayMusic} from '../components/molecule/Modal/ModalPlayMusic';
import {
  bgColorTab,
  heightPercentage,
  heightResponsive,
  width,
  widthPercentage,
  widthResponsive,
} from '../utils';
import {randomString} from '../utils/randomString';
import {ProgressCard} from '../components/molecule/ListCard/ProgressCard';
import EventList from './ListCard/EventList';
import {useEventHook} from '../hooks/use-event.hook';
import {CrashInit} from '../service/crashReport';
import {GenerateEventVoucherReq} from '../interface/event.interface';
import {generateEventBasedVoucher} from '../api/event.api';
import {useRoute} from '@react-navigation/native';
import BoxCredit from '../components/atom/BoxCredit/BoxCredit';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

type HomeProps = NativeStackScreenProps<MainTabParams, 'Home'>;

export const HomeScreen: React.FC<HomeProps> = ({route}: HomeProps) => {
  const {t} = useTranslation();
  const currentScreen = useRoute();
  const {showToast} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const navigation2 = useNavigation<NativeStackNavigationProp<MainTabParams>>();
  const {i18n} = useTranslation();
  const currentLanguage = i18n.language;
  const {setFollowMusician, setUnfollowMusician, useGetListTopArtists} =
    useMusicianHook();
  const {
    dataDiveIn,
    dataAlbumComingSoon,
    getListDiveIn,
    getListComingSoon,
    setLastActive,
  } = useHomeHook();
  const {dataProfile, profileProgress, getProfileUser, getProfileProgress} =
    useProfileHook();
  const {
    dataSong,
    dataNewSong,
    isLoadingSong,
    getListDataSong,
    getListDataNewSong,
    getListDataNewSongGuest,
  } = useSongHook();
  // ? TICKET https://thebeamco.atlassian.net/browse/BEAM-1211 Hide Mood & Genre*/}
  // const {listGenre, listMood, getListMoodPublic, getListGenrePublic} =
  //   useSettingHook();
  const {dataBanner, getListDataBanner, isLoadingBanner} = useBannerHook();
  const {addFcmToken} = useFcmHook();
  const {
    isPlaying,
    visible: playerVisible,
    showPlayer,
    hidePlayer,
    addPlaylist,
  } = usePlayerHook();
  const {
    searchLoading,
    dataSearchSongs,
    dataPublicBanner,
    getSearchSongs,
    getListDataBannerPublic,
    getSearchPlaylists,
  } = useSearchHook();
  const {creditCount, getCreditCount} = useCreditHook();
  const {counter, getCountNotification} = useNotificationHook();
  const {
    useEventHome,
    useCheckAvailVoucher,
    useEventCheckGeneratedTopupVoucherHome,
  } = useEventHook();
  const isLogin = storage.getBoolean('isLogin');
  const {isLoading: isLoadingEvent, refetch: refetchEvent} = useEventHome(
    {},
    isLogin,
  );

  const [selectedTopArtist, setSelectedTopArtist] = useState<
    'lifetime' | 'trending'
  >('lifetime');
  const [selectedIndexSong, setSelectedIndexSong] = useState(-0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showModalClaim, setShowModalClaim] = useState<boolean>(false);
  const [showModalBeer, setShowModalBeer] = useState<boolean>(false);
  const [showModalTopup, setShowModalTopup] = useState<boolean>(false);
  const [generateVoucherPayload, setGenerateVoucherPayload] =
    useState<GenerateEventVoucherReq>();

  const JSONProfile = storage.getString('profile');
  let uuid: string = '';
  if (JSONProfile) {
    const profileObject = JSON.parse(JSONProfile);
    uuid = profileObject.uuid;
  }
  const isClaimedCredit = storage.getBoolean('claimCredits');

  const {data: dataPlaylist, refetch: refetchPlaylist} = useQuery(
    ['/search-playlist'],
    () => getSearchPlaylists({keyword: ''}),
  );

  const {data: dataCheckVoucher} = useCheckAvailVoucher('event_based');
  const {data: dataVoucher} = useEventCheckGeneratedTopupVoucherHome({
    userUUID: uuid ?? '',
    userType: 'fans',
    eventId: dataCheckVoucher?.data?.eventID ?? '',
  });

  const {
    data: dataTopArtists,
    refetch: refetchTopArtists,
    isLoading: isLoadingTopArtists,
  } = useGetListTopArtists(selectedTopArtist);

  useEffect(() => {
    // if the user has already redeemed the voucher, modal will not appear
    // if the user is a new user, it will appear when modal claim credit disappear
    const hideModalFreeBeer = storage.getBoolean('RedeemFreeBeer');
    if (currentScreen.name === 'Home') {
      if (!hideModalFreeBeer && !showModalClaim && isLogin) {
        if (dataCheckVoucher?.data) {
          // check end date of event voucher
          dayjs.extend(isSameOrBefore);
          const availDate = dayjs(dayjs().format('YYYY-MM-DD')).isSameOrBefore(
            dataCheckVoucher.data.endDate,
            'day',
          );

          // if voucher avail, show modal free beer
          // otherwise, show modal topup till end date event
          const isAvail = dataCheckVoucher.data.isAvailable;

          // if user has never topup, show modal popup topup
          const hideModalTopup =
            dataVoucher === undefined ? true : dataVoucher?.data;

          if (availDate) {
            setTimeout(() => {
              InteractionManager.runAfterInteractions(() =>
                isAvail
                  ? setShowModalBeer(true)
                  : setShowModalTopup(!hideModalTopup),
              );
            }, 500);
          }

          // payload for generate voucher when redeem free beer
          const payload = {
            userUUID: uuid,
            userType: 'fans',
            eventId: dataCheckVoucher.data.eventID,
            endDateEvent: dataCheckVoucher.data.endDate,
          };
          setGenerateVoucherPayload(payload);
          storage.set('eventId', dataCheckVoucher.data.eventID);
        }
      }
    }
  }, [dataCheckVoucher, isLogin, showModalClaim, uuid, dataVoucher]);

  const setGenerateEventVoucher = useMutation({
    mutationKey: ['generate-voucher'],
    mutationFn: generateEventBasedVoucher,
    onSuccess(res) {
      if (res?.code === 200) {
        navigation.navigate('ListVoucher', {
          id: generateVoucherPayload?.eventId || '',
        });
        setShowModalBeer(false);
        storage.set('RedeemFreeBeer', true);
      }
    },
  });

  useEffect(() => {
    // ? TICKET https://thebeamco.atlassian.net/browse/BEAM-1211 Hide Mood & Genre
    // listMood.length === 0 && getListMoodPublic();
    // listGenre.length === 0 && getListGenrePublic();
    dataDiveIn.length === 0 && getListDiveIn();
    refetchPlaylist();
    getListComingSoon();
    refetchEvent();
    if (isLogin) {
      getCountNotification();

      // first time register user, can claim 10 credits
      // for first time user, fetch get credit when click claim now on popup
      isClaimedCredit
        ? InteractionManager.runAfterInteractions(() => setShowModalClaim(true))
        : getCreditCount();
    }
  }, [refreshing]);

  // Doesn't trigger the banner when pull refresh
  useEffect(() => {
    if (isLogin) {
      getListDataBanner();
    } else {
      getListDataBannerPublic();
    }
  }, []);

  // Triggering isFollowing musician when go back from other screen
  useFocusEffect(
    useCallback(() => {
      // Triggering when go back from other screen
      getProfileProgress();
      getProfileUser();
      setLastActive();
      refetchTopArtists();

      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }, [refreshing, selectedTopArtist]),
  );

  // Triggering when click love on the same song in top & new song tab
  useFocusEffect(
    useCallback(() => {
      if (isLogin) {
        if (selectedIndexSong === 0) {
          getListDataSong({listType: 'top'});
        } else {
          getListDataNewSong();
        }
      } else {
        if (selectedIndexSong === 0) {
          getSearchSongs({keyword: '', filterBy: 'top'});
        } else {
          getListDataNewSongGuest();
        }
      }

      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }, [refreshing, selectedIndexSong]),
  );

  const [modalGuestVisible, setModalGuestVisible] = useState(false);
  const [scrollEffect, setScrollEffect] = useState(false);
  const [toastText, setToastText] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  useEffect(() => {
    if (showToast !== undefined) {
      setToastVisible(showToast);
      setToastText('Song have been added to playlist!');
    }
  }, [route.params]);

  useEffect(() => {
    const isRecoverSuccess = storage.getBoolean('recoverSuccess');
    setToastVisible(isRecoverSuccess || false);
    setToastText('Welcome back to Beamco!');
    storage.set('recoverSuccess', false);
    const uniqueId = storage.getString('uniqueId');
    if (uniqueId === undefined) {
      storage.set('uniqueId', Date.now() + randomString(10)); //unix timestamp + random string (10)
    }
  }, []);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 5000);
  }, [toastVisible]);

  useEffect(() => {
    FCMService.getTokenFCM({onGetToken: handleOnGetToken});
    FCMService.createNotificationListener({
      onRegister: token => {
        registerFcm(token);
      },
      onNotification: data => {
        onNotification(data);
      },
      onOpenNotification: data => console.log(data),
    });

    const onNotification = (data: FirebaseMessagingTypes.RemoteMessage) => {
      FCMService.showNotification({
        title: data.data?.title,
        message: data.data?.body,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerFcm = (token: string) => {
    addFcmToken(token);
  };

  const handleOnGetToken = (token: string) => {
    addFcmToken(token);
  };

  const [filterSong] = useState([
    {filterName: 'Home.Tab.TopSong.Title'},
    {filterName: 'Home.Tab.NewSong.Title'},
  ]);

  const filterDataSong = (item: any, index: any) => {
    setSelectedIndexSong(index);
  };

  const handleSearchButton = () => {
    navigation.navigate('SearchScreen');
  };

  const handleWebview = (title: string, url: string) => {
    navigation.navigate('Webview', {
      title: title,
      url: url,
    });
  };

  const rightIconComp = () => {
    return (
      <View style={styles.containerIcon}>
        {scrollEffect && (
          <TouchableOpacity onPress={handleSearchButton}>
            <SearchIcon
              stroke={Color.Dark[100]}
              style={{marginRight: widthPercentage(10)}}
            />
          </TouchableOpacity>
        )}
        <IconNotif label={isLogin ? counter : 0} />
      </View>
    );
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 20;
    setScrollEffect(scrolled);
  };

  const onPressTopSong = (val: SongList) => {
    addPlaylist({
      dataSong: isLogin ? dataSong : dataSearchSongs,
      playSongId: val.id,
      isPlay: true,
    });
    showPlayer();
  };

  const onPressNewSong = (val: SongList) => {
    addPlaylist({dataSong: dataNewSong, playSongId: val.id, isPlay: true});
    showPlayer();
  };

  const goToScreen = (
    screen: 'MusicPlayer' | 'TopUpCredit' | 'Notification',
  ) => {
    navigation.navigate(screen);
  };

  const onPressNotif = () => {
    isLogin ? goToScreen('Notification') : setModalGuestVisible(true);
  };

  const onPressProfile = () => {
    if (dataProfile) {
      navigation.navigate('Profile', {
        showToast: false,
        deletePlaylist: false,
      });
    }
  };

  const onPressCoin = () => {
    isLogin ? goToScreen('TopUpCredit') : setModalGuestVisible(true);
  };

  const onPressMoodGenre = (title: string, filterBy: string) => {
    navigation.navigate('ListImage', {title, filterBy});
  };

  const goToListMusic = (
    name: string,
    type: string,
    id?: number,
    filterBy?: string,
  ) => {
    navigation.navigate('ListMusic', {
      id,
      type,
      filterBy,
      title: name,
      fromMainTab: true,
    });
  };

  const goToDetailAlbum = (name: string, id: number) => {
    navigation.navigate('Album', {id, type: 'coming_soon'});
  };

  const goToMusicianPost = (name: string) => {
    isLogin || name === 'Trending'
      ? navigation.navigate('ListPost', {title: name})
      : setModalGuestVisible(true);
  };

  useEffect(() => {
    if (dataProfile?.data.language !== currentLanguage) {
      i18n.changeLanguage(dataProfile?.data.language);
    }
  }, [dataProfile]);

  useEffect(() => {
    if (isLogin && dataProfile?.data.email) {
      CrashInit();
    }
  }, [dataProfile, isLogin]);

  const handleMiniPlayerOnPress = () => {
    hidePlayer();
    goToScreen('MusicPlayer');
  };

  if (isLoadingBanner) {
    return <View style={styles.root} />;
  }

  const goToProfileProgress = () => {
    navigation.navigate('ProfileProgress');
  };

  const goToMusicianProfile = (uuid: string) => {
    navigation.navigate('MusicianProfile', {id: uuid});
  };

  return (
    <View style={styles.root}>
      <SsuStatusBar type="black" />
      <TopNavigation.Type5
        name={dataProfile?.data?.fullname ?? ''}
        profileUri={dataProfile?.data?.images[1]?.image || ''}
        leftIconAction={onPressProfile}
        rightIcon={rightIconComp()}
        rightIconAction={onPressNotif}
        maxLengthTitle={25}
        itemStrokeColor={Color.Pink[100]}
        points={isLogin && !isClaimedCredit ? creditCount : 0}
        containerStyles={{paddingHorizontal: widthResponsive(24)}}
        onPressCoin={onPressCoin}
        guest={!isLogin}
        activeOpacity={0}
        leftContainerStyles={{flex: 3}}
      />

      {Platform.OS === 'ios' && refreshing && (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingBottom: playerVisible
            ? heightPercentage(90)
            : heightPercentage(25),
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
            tintColor={'transparent'}
          />
        }
        onScroll={handleScroll}>
        <TouchableOpacity onPress={handleSearchButton}>
          <SearchBar
            containerStyle={{width: width * 0.9, alignSelf: 'center'}}
            disabled={true}
            onTouchStart={handleSearchButton}
          />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: widthResponsive(20),
            paddingTop: heightResponsive(20),
          }}>
          <BoxCredit
            balance={creditCount}
            type="credit"
            text={t('General.MyCredit')}
            onClick={onPressCoin}
          />
          <Gap width={widthResponsive(12)} />
          <BoxCredit
            balance={dataProfile?.data.availablePoint!}
            type="loyalty"
            text={t('General.LoyaltyPoints')}
            onClick={() => navigation2.navigate('Rewards')}
          />
        </View>

        <Carousel
          data={
            dataBanner?.length === 0
              ? defaultBanner
              : isLogin
              ? dataBanner
              : dataPublicBanner
          }
          onPressBanner={handleWebview}
        />

        {/* // ? TICKET https://thebeamco.atlassian.net/browse/BEAM-1211 Hide Mood & Genre*/}
        {/* Mood */}
        {/* <ListMoodGenre
          title={t('Home.ListMood.Title')}
          data={listMood}
          containerStyle={styles.containerList}
          onPress={() => onPressMoodGenre('Moods', 'mood')}
          onPressImage={(id, name) => goToListMusic(name, 'song', id, 'mood')}
        /> */}
        {/* End Of Mood */}
        {/* Genre */}
        {/* <ListMoodGenre
          title={t('Home.ListGenre.Title')}
          data={listGenre}
          containerStyle={styles.containerList}
          imageStyle={{
            width: widthPercentage(90),
            height: heightPercentage(80),
          }}
          onPress={() => onPressMoodGenre('Genre', 'genre')}
          onPressImage={(id, name) => goToListMusic(name, 'song', id, 'genre')}
        /> */}
        {/* End Of Genre */}
        {/* Tab Event */}
        <View style={[styles.containerContent, {marginTop: mvs(20)}]}>
          <TabFilter.Type3
            filterData={[{filterName: 'Event.Live'}]}
            onPress={() => null}
            selectedIndex={0}
            translation={true}
          />
          <EventList
            isLoading={isLoadingEvent}
            setModalGuestVisible={setModalGuestVisible}
            isLogin={isLogin ?? false}
          />
        </View>
        {/* End of Tab Event */}
        {/* Tab Musician */}
        <View style={[styles.containerContent]}>
          <TabFilter.Type3
            filterData={[{filterName: 'Home.Tab.TopMusician.Title'}]}
            onPress={() => null}
            selectedIndex={0}
            translation={true}
          />
          <View style={styles.containerTabArtist}>
            <Button
              label={t('Home.Tab.TopMusician.AllTime')}
              onPress={() => setSelectedTopArtist('lifetime')}
              containerStyles={{
                ...styles.tabArtist,
                backgroundColor: bgColorTab('lifetime', selectedTopArtist),
              }}
            />
            <Gap width={widthPercentage(10)} />
            <Button
              label={t('Home.Tab.TopMusician.Trending')}
              containerStyles={{
                ...styles.tabArtist,
                backgroundColor: bgColorTab('trending', selectedTopArtist),
              }}
              onPress={() => setSelectedTopArtist('trending')}
            />
          </View>
          <TopMusician
            dataMusician={dataTopArtists?.data || []}
            setFollowMusician={(
              props?: FollowMusicianPropsType,
              params?: ParamsProps,
            ) => setFollowMusician(props, params)}
            setUnfollowMusician={(
              props?: FollowMusicianPropsType,
              params?: ParamsProps,
            ) => setUnfollowMusician(props, params)}
            isLoading={isLoadingTopArtists}
            toDetailOnPress={goToMusicianProfile}
          />
        </View>
        {/* End of Tab Musician */}
        {/* Tab Song */}
        <View style={[styles.containerContent]}>
          <TabFilter.Type3
            filterData={filterSong}
            onPress={filterDataSong}
            selectedIndex={selectedIndexSong}
            translation={true}
          />
          {filterSong[selectedIndexSong].filterName ===
          'Home.Tab.TopSong.Title' ? (
            <TopSong
              dataSong={isLogin ? dataSong : dataSearchSongs}
              onPress={onPressTopSong}
              type={'home'}
              loveIcon={isLogin}
              fromMainTab={true}
              isLoading={isLoadingSong || searchLoading}
            />
          ) : (
            <NewSong
              dataSong={dataNewSong}
              onPress={onPressNewSong}
              type={'home'}
              loveIcon={isLogin}
              isLoading={isLoadingSong}
            />
          )}
        </View>
        {/* End of Tab Song */}

        {isLogin && profileProgress?.stepProgress !== '100%' ? (
          <ProgressCard
            percentage={profileProgress?.stepProgress}
            onPress={goToProfileProgress}
            containerStyle={{marginTop: mvs(20)}}
          />
        ) : null}

        {/* Dive In */}
        <View
          style={{
            marginTop: heightPercentage(20),
            marginBottom: heightPercentage(10),
            paddingLeft: widthPercentage(24),
          }}>
          <Text style={styles.diveInText}>{t('Home.DiveIn.Title')}</Text>
          <Text style={styles.diveInDesc}>{t('Home.DiveIn.Subtitle')}</Text>
        </View>
        <ListImageDesc
          title=""
          hideArrow={true}
          data={dataDiveIn}
          containerStyle={{
            marginTop: heightPercentage(10),
            marginBottom: heightPercentage(20),
          }}
          imageStyle={{
            width: widthPercentage(115),
            height: widthPercentage(115),
          }}
          onPress={() => null}
          onPressImage={goToMusicianPost}
        />
        {/* End Of Dive In */}
        {/* Playlist */}
        {dataPlaylist?.data && dataPlaylist?.data.length > 0 ? (
          <ListPlaylistHome
            title={t('Home.Playlist.Title')}
            data={dataPlaylist?.data}
            onPress={() => navigation.navigate('ListPlaylist')}
          />
        ) : null}
        {/* End of Playlist */}
        <Gap height={heightPercentage(10)} />
        {/* Coming Soon */}
        {dataAlbumComingSoon.length > 0 ? (
          <ListImageDesc
            title={t('Home.ComingSoon.Title')}
            data={dataAlbumComingSoon}
            containerStyle={styles.containerList}
            onPress={() => goToListMusic('Coming Soon', 'album')}
            onPressImage={(name, id) => goToDetailAlbum(name, id)}
          />
        ) : null}
        <Gap height={heightPercentage(40)} />
        {/* End Of Coming Soon */}
      </ScrollView>

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
      />

      <ModalPlayMusic onPressModal={handleMiniPlayerOnPress} />

      <ModalClaimCredits
        modalVisible={showModalClaim}
        onPressClose={() => setShowModalClaim(false)}
        onPressClaim={getCreditCount}
      />

      <ModalFreeBeer
        modalVisible={showModalBeer}
        onPressClose={() => setShowModalBeer(false)}
        onPressRedeem={() =>
          setGenerateEventVoucher.mutate({
            userUUID: generateVoucherPayload?.userUUID || uuid,
            userType: generateVoucherPayload?.userType || 'fans',
            eventId: generateVoucherPayload?.eventId || '',
            endDateEvent: generateVoucherPayload?.endDateEvent || '',
          })
        }
      />

      <ModalTopUp
        modalVisible={showModalTopup}
        onPressClose={() => setShowModalTopup(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  containerContent: {
    marginBottom: heightPercentage(26),
    width: '100%',
  },
  containerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: Color.Success[400],
    paddingHorizontal: widthPercentage(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: Color.Neutral[10],
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: heightPercentage(10),
  },
  diveInText: {
    color: Color.Neutral[10],
    fontFamily: font.InterSemiBold,
    fontSize: mvs(15),
  },
  diveInDesc: {
    color: Color.Dark[50],
    fontFamily: font.InterMedium,
    fontSize: mvs(13),
  },
  containerList: {
    marginTop: heightPercentage(10),
  },
  containerTabArtist: {
    flexDirection: 'row',
    paddingLeft: widthResponsive(24),
    marginTop: mvs(8),
    marginBottom: mvs(2),
  },
  tabArtist: {
    width: widthPercentage(72),
    aspectRatio: heightPercentage(72 / 24),
    borderRadius: mvs(30),
  },
});
