import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import Color from '../theme/Color';
import {dataSlider} from '../data/home';
import {heightPercentage, widthResponsive} from '../utils';
import {
  TopNavigation,
  SearchBar,
  TabFilter,
  Carousel,
  IconNotif,
} from '../components';
import PostList from './ListCard/PostList';
import TopMusician from './ListCard/TopMusician';
import TopSong from './ListCard/TopSong';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../App';
import {dropDownDataCategory, dropDownDataFilter} from '../data/dropdown';
import {PostlistData} from '../data/postlist';

export const HomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filter] = useState([
    {filterName: 'TOP MUSICIAN'},
    {filterName: 'TOP SONG'},
    {filterName: 'TOP POST'},
  ]);
  const filterData = (item: any, index: any) => {
    setSelectedIndex(index);
  };

  return (
    <SafeAreaView style={styles.root}>
      <TopNavigation.Type5
        name="Type 5"
        profileUri={
          'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp'
        }
        leftIconAction={() => console.log('Left Icon Pressed')}
        rightIcon={<IconNotif label={14} />}
        rightIconAction={() => navigation.navigate('Notification')}
        maxLengthTitle={20}
        itemStrokeColor={Color.Pink[100]}
        points={100000}
        containerStyles={{paddingHorizontal: widthResponsive(24)}}
      />
      <SearchBar containerStyle={{paddingHorizontal: widthResponsive(24)}} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Carousel data={dataSlider} />
        <View
          style={{
            marginTop: heightPercentage(20),
            paddingHorizontal: widthResponsive(24),
            width: '100%',
            height: '100%',
          }}>
          <TabFilter.Type1
            filterData={filter}
            onPress={filterData}
            selectedIndex={selectedIndex}
          />
          {filter[selectedIndex].filterName === 'TOP MUSICIAN' ? (
            <TopMusician />
          ) : filter[selectedIndex].filterName === 'TOP SONG' ? (
            <TopSong />
          ) : (
            <PostList
              dataRightDropdown={dropDownDataCategory}
              dataLeftDropdown={dropDownDataFilter}
              data={PostlistData}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
