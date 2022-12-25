import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  TopNavigation,
  SearchBar,
  TabFilter,
  Carousel,
  IconNotif,
  SsuStatusBar,
  BottomSheetGuest,
} from '../components';
import Color from '../theme/Color';
import {RootStackParams} from '../navigations';
import {dataSlider} from '../data/home';
import TopSong from './ListCard/TopSong';
import {SearchIcon} from '../assets/icon';
import PostList from './ListCard/PostList';
import {PostlistData} from '../data/postlist';
import TopMusician from './ListCard/TopMusician';
import {storage} from '../hooks/use-storage.hook';
import * as FCMService from '../service/notification';
import {useBannerHook} from '../hooks/use-banner.hook';
import {profileStorage} from '../hooks/use-storage.hook';
import {useMusicianHook} from '../hooks/use-musician.hook';
import {dropDownDataCategory, dropDownDataFilter} from '../data/dropdown';
import {ModalPlayMusic} from '../components/molecule/Modal/ModalPlayMusic';
import {heightPercentage, widthPercentage, widthResponsive} from '../utils';
import {FollowMusicianPropsType} from '../interface/musician.interface';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {useFcmHook} from '../hooks/use-fcm.hook';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

export const HomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    isLoading,
    dataMusician,
    getListDataMusician,
    setFollowMusician,
    setUnfollowMusician,
  } = useMusicianHook();
  const {addFcmToken} = useFcmHook();

  const {isLoadingBanner, dataBanner, getListDataBanner} = useBannerHook();
  const isLogin = storage.getString('profile');

  useEffect(() => {
    getListDataMusician();
  }, [isLoading]);

  useEffect(() => {
    getListDataBanner();
  }, [isLoadingBanner]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalGuestVisible, setModalGuestVisible] = useState(false);
  const [scrollEffect, setScrollEffect] = useState(false);
  const [selectedSong, setSelectedSong] = useState({
    musicNum: '',
    musicTitle: '',
    singerName: '',
    imgUri: '',
  });

  useEffect(() => {
    FCMService.getTokenFCM({onGetToken: handleOnGetToken});
    FCMService.createNotificationListener({
      onRegister: token => registerFcm(token),
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

  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filter] = useState([
    {filterName: 'TOP MUSICIAN'},
    {filterName: 'TOP SONG'},
    {filterName: 'TOP POST'},
  ]);
  const filterData = (item: any, index: any) => {
    setSelectedIndex(index);
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
        <IconNotif label={isLogin ? 14 : 0} />
      </View>
    );
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 20;
    setScrollEffect(scrolled);
  };

  const onPressTopSong = (val: any) => {
    setSelectedSong(val);
    setModalVisible(true);
  };

  const onPressNotif = () => {
    isLogin ? navigation.navigate('Notification') : setModalGuestVisible(true);
  };

  const onPressCoin = () => {
    isLogin ? goToScreen('TopupCoin') : setModalGuestVisible(true);
  };

  return (
    <View style={styles.root}>
      <SsuStatusBar type="black" />
      <TopNavigation.Type5
        name={profileStorage()?.fullname || ''}
        profileUri={
          'https://static.republika.co.id/uploads/member/images/news/5bgj1x0cea.jpg'
        }
        leftIconAction={() => console.log('Left Icon Pressed')}
        rightIcon={rightIconComp()}
        rightIconAction={onPressNotif}
        maxLengthTitle={20}
        itemStrokeColor={Color.Pink[100]}
        points={isLogin ? 100000 : 0}
        containerStyles={{paddingHorizontal: widthResponsive(24)}}
        onPressCoin={onPressCoin}
        guest={isLogin === undefined}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}>
        <TouchableOpacity onPress={handleSearchButton}>
          <SearchBar
            containerStyle={{paddingHorizontal: widthResponsive(24)}}
            disabled={true}
            onTouchStart={handleSearchButton}
          />
        </TouchableOpacity>
        <Carousel
          data={isLogin && dataBanner?.length > 0 ? dataBanner : dataSlider}
          onPressBanner={handleWebview}
        />
        <View
          style={[
            styles.containerContent,
            {
              marginBottom: modalVisible
                ? heightPercentage(90)
                : heightPercentage(25),
            },
          ]}>
          <TabFilter.Type1
            filterData={filter}
            onPress={filterData}
            selectedIndex={selectedIndex}
          />
          {filter[selectedIndex].filterName === 'TOP MUSICIAN' ? (
            <TopMusician
              dataMusician={dataMusician ? dataMusician : []}
              setFollowMusician={(props?: FollowMusicianPropsType) =>
                setFollowMusician(props)
              }
              setUnfollowMusician={(props?: FollowMusicianPropsType) =>
                setUnfollowMusician(props)
              }
            />
          ) : filter[selectedIndex].filterName === 'TOP SONG' ? (
            <TopSong onPress={onPressTopSong} type={'home'} />
          ) : (
            <PostList
              dataRightDropdown={dropDownDataCategory}
              dataLeftDropdown={dropDownDataFilter}
              data={PostlistData}
            />
          )}
        </View>
      </ScrollView>

      <BottomSheetGuest
        modalVisible={modalGuestVisible}
        onPressClose={() => setModalGuestVisible(false)}
      />

      {modalVisible && (
        <ModalPlayMusic
          imgUri={selectedSong.imgUri || ''}
          musicTitle={selectedSong.musicTitle || ''}
          singerName={selectedSong.singerName || ''}
          onPressModal={() => goToScreen('MusicPlayer')}
        />
      )}
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
    paddingHorizontal: widthResponsive(24),
    width: '100%',
    height: '100%',
  },
  containerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
