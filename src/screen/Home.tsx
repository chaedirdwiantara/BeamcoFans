import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import Color from '../theme/Color';
import {dataSlider} from '../data/home';
import {heightPercentage, widthPercentage, widthResponsive} from '../utils';
import {
  TopNavigation,
  SearchBar,
  TabFilter,
  Carousel,
  IconNotif,
  SsuStatusBar,
} from '../components';
import {RootStackParams} from '../App';
import TopSong from './ListCard/TopSong';
import {SearchIcon} from '../assets/icon';
import PostList from './ListCard/PostList';
import {PostlistData} from '../data/postlist';
import TopMusician from './ListCard/TopMusician';
import * as FCMService from '../service/notification';
import {useNavigation} from '@react-navigation/native';
import {profileStorage} from '../hooks/use-storage.hook';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {dropDownDataCategory, dropDownDataFilter} from '../data/dropdown';
import {ModalPlayMusic} from '../components/molecule/Modal/ModalPlayMusic';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

export const HomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [modalVisible, setModalVisible] = useState(false);
  const [scrollEffect, setScrollEffect] = useState(false);

  useEffect(() => {
    FCMService.getTokenFCM({onGetToken: handleOnGetToken});
    FCMService.createNotificationListener({
      onRegister: token => registerFcm(token),
      onNotification: data => console.log(data),
      onOpenNotification: data => console.log(data),
    });
  }, []);

  const registerFcm = (token: string) => {
    console.log(token);
  };

  const handleOnGetToken = (tokenFCM: string) => {
    console.log(tokenFCM);
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
        <View style={styles.containerContent}>
          <TabFilter.Type1
            filterData={filter}
            onPress={filterData}
            selectedIndex={selectedIndex}
          />
          {filter[selectedIndex].filterName === 'TOP MUSICIAN' ? (
            <TopMusician />
          ) : filter[selectedIndex].filterName === 'TOP SONG' ? (
            <TopSong onPress={() => setModalVisible(true)} />
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
          imgUri={
            'https://cdns-images.dzcdn.net/images/cover/7f7aae26b50cb046c872238b6a2a10c2/264x264.jpg'
          }
          musicTitle={'Thunder'}
          singerName={'Imagine Dragons, The Wekeend'}
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
    marginBottom: heightPercentage(40),
  },
  containerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
