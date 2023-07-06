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
} from 'react-native';
import {
  useNavigation,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import {useQuery} from 'react-query';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {
  Gap,
  SsuToast,
  SearchBar,
  TabFilter,
  Carousel,
  IconNotif,
  SsuStatusBar,
  ListMoodGenre,
  ListImageDesc,
  EmptyStateHome,
  TopNavigation,
  ListPlaylistHome,
  BottomSheetGuest,
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
import {useSettingHook} from '../hooks/use-setting.hook';
import {useProfileHook} from '../hooks/use-profile.hook';
import {useMusicianHook} from '../hooks/use-musician.hook';
import FavoriteMusician from './ListCard/FavoriteMusician';
import {CheckCircle2Icon, SearchIcon} from '../assets/icon';
import {MainTabParams, RootStackParams} from '../navigations';
import RecomendedMusician from './ListCard/RecomendedMusician';
import {profileStorage, storage} from '../hooks/use-storage.hook';
import {useNotificationHook} from '../hooks/use-notification.hook';
import LoadingSpinner from '../components/atom/Loading/LoadingSpinner';
import {FollowMusicianPropsType} from '../interface/musician.interface';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {ModalPlayMusic} from '../components/molecule/Modal/ModalPlayMusic';
import {heightPercentage, widthPercentage, widthResponsive} from '../utils';
import {randomString} from '../utils/randomString';
import {ProgressCard} from '../components/molecule/ListCard/ProgressCard';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

type HomeProps = NativeStackScreenProps<MainTabParams, 'Home'>;

export const HomeScreen: React.FC<HomeProps> = ({route}: HomeProps) => {
  const {t} = useTranslation();
  const {showToast} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {i18n} = useTranslation();
  const currentLanguage = i18n.language;
  const {
    isLoadingMusician,
    dataMusician,
    dataFavoriteMusician,
    dataRecommendedMusician,
    getListDataMusician,
    getListDataFavoriteMusician,
    getListDataRecommendedMusician,
    setFollowMusician,
    setUnfollowMusician,
  } = useMusicianHook();
  const {dataDiveIn, dataAlbumComingSoon, getListDiveIn, getListComingSoon} =
    useHomeHook();
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
  const {listGenre, listMood, getListMoodPublic, getListGenrePublic} =
    useSettingHook();
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
    dataSearchMusicians,
    dataSearchSongs,
    dataPublicBanner,
    getSearchMusicians,
    getSearchSongs,
    getListDataBannerPublic,
    getSearchPlaylists,
  } = useSearchHook();
  const {creditCount, getCreditCount} = useCreditHook();
  const {counter, getCountNotification} = useNotificationHook();

  const isLogin = storage.getBoolean('isLogin');
  const isFocused = useIsFocused();
  const [selectedIndexMusician, setSelectedIndexMusician] = useState(-0);
  const [selectedIndexSong, setSelectedIndexSong] = useState(-0);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const JSONProfile = storage.getString('profile');
  let uuid: string = '';
  if (JSONProfile) {
    const profileObject = JSON.parse(JSONProfile);
    uuid = profileObject.uuid;
  }

  const {data: dataPlaylist, refetch: refetchPlaylist} = useQuery(
    ['/search-playlist'],
    () => getSearchPlaylists({keyword: ''}),
  );

  useEffect(() => {
    getListMoodPublic();
    getListGenrePublic();
    refetchPlaylist();
    getListDiveIn();
    getListComingSoon();
    if (isLogin) {
      getListDataBanner();
      getProfileUser();
      getCountNotification();
      getCreditCount();
    } else {
      getListDataBannerPublic();
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [refreshing]);

  // Triggering isFollowing musician when go back from other screen
  useFocusEffect(
    useCallback(() => {
      if (isLogin) {
        // Auto update when progress change
        getProfileProgress();

        if (selectedIndexMusician === 0) {
          getListDataMusician({filterBy: 'top'});
        } else if (selectedIndexMusician === 1) {
          getListDataRecommendedMusician();
        } else {
          getListDataFavoriteMusician({fansUUID: uuid});
        }
      } else {
        getSearchMusicians({keyword: '', filterBy: 'top'});
      }

      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }, [refreshing, selectedIndexMusician]),
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

  const [filterMusician] = useState([
    {filterName: 'Home.Tab.TopMusician.Title'},
    {filterName: 'Home.Tab.Recomended.Title'},
    {filterName: 'Home.Tab.Favorite.Title'},
  ]);

  const [filterMusicianGuest] = useState([
    {filterName: 'Home.Tab.TopMusician.Title'},
    {filterName: 'Home.Tab.Recomended.Title'},
  ]);

  const [filterSong] = useState([
    {filterName: 'Home.Tab.TopSong.Title'},
    {filterName: 'Home.Tab.NewSong.Title'},
  ]);

  const filterDataMusician = (item: any, index: any) => {
    if (!isLogin && index === 1) {
      setModalGuestVisible(true);
    } else {
      setSelectedIndexMusician(index);
    }
  };

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

  const goToScreen = (screen: 'MusicPlayer' | 'TopupCoin' | 'Notification') => {
    navigation.navigate(screen);
  };

  const onPressNotif = () => {
    isLogin ? goToScreen('Notification') : setModalGuestVisible(true);
  };

  const onPressCoin = () => {
    isLogin ? goToScreen('TopupCoin') : setModalGuestVisible(true);
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

  const handleMiniPlayerOnPress = () => {
    hidePlayer();
    goToScreen('MusicPlayer');
  };

  if (isLoadingBanner || isLoadingMusician || searchLoading) {
    return <View style={styles.root} />;
  }

  const goToProfileProgress = () => {
    navigation.navigate('ProfileProgress');
  };

  return (
    <View style={styles.root}>
      <SsuStatusBar type="black" />
      <TopNavigation.Type5
        name={profileStorage()?.fullname ?? ''}
        profileUri={dataProfile?.data?.images[1]?.image || ''}
        leftIconAction={() => null}
        rightIcon={rightIconComp()}
        rightIconAction={onPressNotif}
        maxLengthTitle={14}
        itemStrokeColor={Color.Pink[100]}
        points={isLogin ? creditCount : 0}
        containerStyles={{paddingHorizontal: widthResponsive(24)}}
        onPressCoin={onPressCoin}
        guest={!isLogin}
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
            containerStyle={{paddingHorizontal: widthResponsive(24)}}
            disabled={true}
            onTouchStart={handleSearchButton}
          />
        </TouchableOpacity>
        {isLogin && profileProgress?.stepProgress !== '100%' ? (
          <ProgressCard
            percentage={profileProgress?.stepProgress}
            onPress={goToProfileProgress}
            containerStyle={{marginTop: mvs(20)}}
          />
        ) : null}
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

        {/* Mood */}
        <ListMoodGenre
          title={t('Home.ListMood.Title')}
          data={listMood}
          containerStyle={styles.containerList}
          onPress={() => onPressMoodGenre('Moods', 'mood')}
          onPressImage={(id, name) => goToListMusic(name, 'song', id, 'mood')}
        />
        {/* End Of Mood */}
        {/* Genre */}
        <ListMoodGenre
          title={t('Home.ListGenre.Title')}
          data={listGenre}
          containerStyle={styles.containerList}
          imageStyle={{
            width: widthPercentage(90),
            height: heightPercentage(80),
          }}
          onPress={() => onPressMoodGenre('Genre', 'genre')}
          onPressImage={(id, name) => goToListMusic(name, 'song', id, 'genre')}
        />
        {/* End Of Genre */}
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
        {/* Tab Musician */}
        <View style={[styles.containerContent]}>
          <TabFilter.Type3
            filterData={!isLogin ? filterMusicianGuest : filterMusician}
            onPress={filterDataMusician}
            selectedIndex={selectedIndexMusician}
            translation={true}
          />
          {filterMusician[selectedIndexMusician].filterName ===
          'Home.Tab.TopMusician.Title' ? (
            <TopMusician
              dataMusician={isLogin ? dataMusician : dataSearchMusicians}
              setFollowMusician={(
                props?: FollowMusicianPropsType,
                params?: ParamsProps,
              ) => setFollowMusician(props, params)}
              setUnfollowMusician={(
                props?: FollowMusicianPropsType,
                params?: ParamsProps,
              ) => setUnfollowMusician(props, params)}
              isLoading={isLoadingMusician || searchLoading}
            />
          ) : filterMusician[selectedIndexMusician].filterName ===
            'Home.Tab.Recomended.Title' ? (
            <RecomendedMusician
              dataMusician={dataRecommendedMusician}
              setFollowMusician={(
                props?: FollowMusicianPropsType,
                params?: ParamsProps,
              ) => setFollowMusician(props, params)}
              setUnfollowMusician={(
                props?: FollowMusicianPropsType,
                params?: ParamsProps,
              ) => setUnfollowMusician(props, params)}
              isLoading={isLoadingMusician}
            />
          ) : (
            <FavoriteMusician
              dataMusician={isLogin ? dataFavoriteMusician : []}
              setFollowMusician={(
                props?: FollowMusicianPropsType,
                params?: ParamsProps,
              ) => setFollowMusician(props, params)}
              setUnfollowMusician={(
                props?: FollowMusicianPropsType,
                params?: ParamsProps,
              ) => setUnfollowMusician(props, params)}
              isLoading={isLoadingMusician}
            />
          )}
        </View>
        {/* End of Tab Musician */}
        {/* Playlist */}
        <ListPlaylistHome
          title={t('Home.Playlist.Title')}
          data={dataPlaylist?.data}
          onPress={() => navigation.navigate('ListPlaylist')}
        />
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
        ) : (
          <EmptyStateHome
            title={t('Home.ComingSoon.Title')}
            onPress={() => goToListMusic('Coming Soon', 'album')}
          />
        )}
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
});
