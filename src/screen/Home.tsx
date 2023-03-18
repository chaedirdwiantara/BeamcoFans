import React, {useEffect, useState} from 'react';
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
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useNavigation, useIsFocused} from '@react-navigation/native';

import {
  TopNavigation,
  SearchBar,
  TabFilter,
  Carousel,
  IconNotif,
  SsuStatusBar,
  BottomSheetGuest,
  SsuToast,
  Gap,
} from '../components';
import Color from '../theme/Color';
import TopSong from './ListCard/TopSong';
import {CheckCircle2Icon, SearchIcon} from '../assets/icon';
import PostList from './ListCard/PostList';
import {PostlistData} from '../data/postlist';
import {MainTabParams, RootStackParams} from '../navigations';
import TopMusician from './ListCard/TopMusician';
import {useFcmHook} from '../hooks/use-fcm.hook';
import {storage} from '../hooks/use-storage.hook';
import {useSongHook} from '../hooks/use-song.hook';
import {SongList} from '../interface/song.interface';
import * as FCMService from '../service/notification';
import {usePlayerHook} from '../hooks/use-player.hook';
import {useBannerHook} from '../hooks/use-banner.hook';
import {useSearchHook} from '../hooks/use-search.hook';
import {ParamsProps} from '../interface/base.interface';
import {useProfileHook} from '../hooks/use-profile.hook';
import {useMusicianHook} from '../hooks/use-musician.hook';
import {FollowMusicianPropsType} from '../interface/musician.interface';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {dropDownDataCategory, dropDownDataFilter} from '../data/dropdown';
import {ModalPlayMusic} from '../components/molecule/Modal/ModalPlayMusic';
import {heightPercentage, widthPercentage, widthResponsive} from '../utils';
import {defaultBanner} from '../data/home';
import {useNotificationHook} from '../hooks/use-notification.hook';
import {useCreditHook} from '../hooks/use-credit.hook';
import {useTranslation} from 'react-i18next';
import LoadingSpinner from '../components/atom/Loading/LoadingSpinner';
import RecomendedMusician from './ListCard/RecomendedMusician';
import FavoriteMusician from './ListCard/FavoriteMusician';
import NewSong from './ListCard/NewSong';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

type HomeProps = NativeStackScreenProps<MainTabParams, 'Home'>;

export const HomeScreen: React.FC<HomeProps> = ({route}: HomeProps) => {
  const {showToast} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {i18n} = useTranslation();
  const currentLanguage = i18n.language;
  const {
    dataMusician,
    dataFavoriteMusician,
    getListDataMusician,
    getListDataFavoriteMusician,
    setFollowMusician,
    setUnfollowMusician,
  } = useMusicianHook();

  const {isLoading, dataProfile, getProfileUser} = useProfileHook();
  const {dataSong, dataNewSong, getListDataSong, getListDataNewSong} =
    useSongHook();
  const {dataBanner, getListDataBanner} = useBannerHook();
  const {addFcmToken} = useFcmHook();
  const {
    isPlaying,
    visible: playerVisible,
    showPlayer,
    hidePlayer,
    addPlaylist,
  } = usePlayerHook();
  const {
    dataSearchMusicians,
    dataSearchSongs,
    dataPublicBanner,
    getSearchMusicians,
    getSearchSongs,
    getListDataBannerPublic,
  } = useSearchHook();
  const {counter, getCountNotification} = useNotificationHook();
  const {creditCount, getCreditCount} = useCreditHook();

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

  useEffect(() => {
    if (isLogin) {
      getListDataBanner();
      getListDataMusician({filterBy: 'top'});
      getListDataFavoriteMusician({fansUUID: uuid});
      getListDataSong({listType: 'top'});
      getListDataNewSong();
      getProfileUser();
      getCountNotification();
      getCreditCount();
    } else {
      getListDataBannerPublic();
      getSearchMusicians({keyword: '', filterBy: 'top'});
      getSearchSongs({keyword: '', filterBy: 'top'});
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [refreshing]);

  useEffect(() => {
    if (isFocused && isPlaying) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

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
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
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

  const goToScreen = (screen: 'MusicPlayer' | 'TopupCoin') => {
    navigation.navigate(screen);
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
    setSelectedIndexMusician(index);
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

  const onPressNotif = () => {
    isLogin ? navigation.navigate('Notification') : setModalGuestVisible(true);
  };

  const onPressCoin = () => {
    isLogin ? goToScreen('TopupCoin') : setModalGuestVisible(true);
  };

  useEffect(() => {
    if (dataProfile?.data.language !== currentLanguage) {
      i18n.changeLanguage(dataProfile?.data.language);
    }
  }, [dataProfile]);

  const listMusician = isLogin ? dataMusician : dataSearchMusicians;

  if (listMusician.length === 0 || listMusician === undefined) {
    return <View style={styles.root} />;
  }

  return (
    <View style={styles.root}>
      <SsuStatusBar type="black" />
      <TopNavigation.Type5
        name={dataProfile?.data?.fullname ?? ''}
        profileUri={dataProfile?.data?.images[1]?.image || ''}
        leftIconAction={() => null}
        rightIcon={rightIconComp()}
        rightIconAction={onPressNotif}
        maxLengthTitle={20}
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
            />
          ) : (
            <NewSong
              dataSong={isLogin ? dataNewSong : dataSearchSongs}
              onPress={onPressNewSong}
              type={'home'}
              loveIcon={isLogin}
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
              dataMusician={listMusician}
              setFollowMusician={(
                props?: FollowMusicianPropsType,
                params?: ParamsProps,
              ) => setFollowMusician(props, params)}
              setUnfollowMusician={(
                props?: FollowMusicianPropsType,
                params?: ParamsProps,
              ) => setUnfollowMusician(props, params)}
            />
          ) : filterMusician[selectedIndexMusician].filterName ===
            'Home.Tab.Recomended.Title' ? (
            <RecomendedMusician
              dataMusician={listMusician}
              setFollowMusician={(
                props?: FollowMusicianPropsType,
                params?: ParamsProps,
              ) => setFollowMusician(props, params)}
              setUnfollowMusician={(
                props?: FollowMusicianPropsType,
                params?: ParamsProps,
              ) => setUnfollowMusician(props, params)}
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
            />
          )}
        </View>
        {/* End of Tab Musician */}
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

      <ModalPlayMusic onPressModal={() => goToScreen('MusicPlayer')} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  containerContent: {
    marginTop: heightPercentage(10),
    marginBottom: heightPercentage(22),
    // paddingHorizontal: widthResponsive(24),
    width: '100%',
    // height: '100%',
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
});
