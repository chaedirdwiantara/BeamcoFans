import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Color from '../theme/Color';
import {dataSlider} from '../data/home';
import {heightPercentage, widthResponsive} from '../utils';
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
import PostList from './ListCard/PostList';
import {PostlistData} from '../data/postlist';
import TopMusician from './ListCard/TopMusician';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {dropDownDataCategory, dropDownDataFilter} from '../data/dropdown';
import {ModalPlayMusic} from '../components/molecule/Modal/ModalPlayMusic';
import * as FCMService from '../service/notification';
import {profileStorage} from '../hooks/use-storage.hook';

export const HomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [modalVisible, setModalVisible] = useState(false);

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

  const goToSongDetails = () => {
    navigation.navigate('MusicPlayer');
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

  return (
    <SafeAreaView style={styles.root}>
      <SsuStatusBar type="black" />
      <TopNavigation.Type5
        name={profileStorage()?.fullname || ''}
        profileUri={
          'https://static.republika.co.id/uploads/member/images/news/5bgj1x0cea.jpg'
        }
        leftIconAction={() => console.log('Left Icon Pressed')}
        rightIcon={<IconNotif label={14} />}
        rightIconAction={() => navigation.navigate('Notification')}
        maxLengthTitle={20}
        itemStrokeColor={Color.Pink[100]}
        points={100000}
        containerStyles={{paddingHorizontal: widthResponsive(24)}}
      />
      <TouchableOpacity onPress={handleSearchButton}>
        <SearchBar
          containerStyle={{paddingHorizontal: widthResponsive(24)}}
          disabled={true}
          onTouchStart={handleSearchButton}
        />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
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
          onPressModal={goToSongDetails}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  containerContent: {
    marginTop: heightPercentage(20),
    paddingHorizontal: widthResponsive(24),
    width: '100%',
    height: '100%',
    marginBottom: heightPercentage(40),
  },
});
