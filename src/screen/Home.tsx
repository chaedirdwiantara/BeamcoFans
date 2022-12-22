import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import {
  TopNavigation,
  SearchBar,
  TabFilter,
  Carousel,
  IconNotif,
  SsuStatusBar,
} from '../components';
import Color from '../theme/Color';
import {RootStackParams} from '../navigations';
import {dataSlider} from '../data/home';
import TopSong from './ListCard/TopSong';
import {SearchIcon} from '../assets/icon';
import PostList from './ListCard/PostList';
import {PostlistData} from '../data/postlist';
import TopMusician from './ListCard/TopMusician';
import * as FCMService from '../service/notification';
import {useNavigation} from '@react-navigation/native';
import {profileStorage} from '../hooks/use-storage.hook';
import {useMusicianHook} from '../hooks/use-musician.hook';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
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

  useEffect(() => {
    getListDataMusician();
  }, [isLoading]);

  const [modalVisible, setModalVisible] = useState(false);
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
        <IconNotif label={14} />
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
        rightIconAction={() => navigation.navigate('Notification')}
        maxLengthTitle={20}
        itemStrokeColor={Color.Pink[100]}
        points={100000}
        containerStyles={{paddingHorizontal: widthResponsive(24)}}
        onPressCoin={() => goToScreen('TopupCoin')}
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
        <Carousel data={dataSlider} />
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
