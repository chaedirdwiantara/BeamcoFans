import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {
  MusicianListExample,
  MusicListCardExample,
  PostListCardExample,
} from '../components/example';
import Color from '../theme/Color';
import {NotificationIcon} from '../assets/icon';
import {
  TopNavigation,
  SearchBar,
  ImageSlider,
  TabFilter,
  IconNotif,
} from '../components';
import {color, font} from '../theme';
import {normalize} from '../utils';

const dataSlider = [
  {
    id: 0,
    uri: 'https://img.lemde.fr/2022/06/09/0/411/5083/3389/1440/960/60/0/6870439_1654768589970-hole-in-your-soul-abba-voyage-photo-by-johan-persson-1.jpg',
    title: 'ABBA Concert',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adispicing elit',
  },
  {
    id: 1,
    uri: 'https://imageio.forbes.com/specials-images/imageserve/614af094b90e7b76aac40223/0x0.jpg?format=jpg&width=1200',
    title: 'Global Citizen Festival',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adispicing elit',
  },
  {
    id: 2,
    uri: 'https://assets.pikiran-rakyat.com/crop/0x54:1080x720/x/photo/2022/05/19/849530363.jpg',
    title: 'BTS Concert',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adispicing elit',
  },
  {
    id: 3,
    uri: 'https://stietribhakti.ac.id/wp-content/uploads/2018/08/austin-neill-247047-unsplash.jpg',
    title: 'Concert for Charity',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adispicing elit',
  },
  {
    id: 4,
    uri: 'https://www.billboard.com/wp-content/uploads/2021/08/concert-crowd-billboard-1548-1629382874.jpg?w=942&h=623&crop=1',
    title: 'Canceled Concert Due to COVID',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adispicing elit',
  },
  {
    id: 5,
    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Muse_in_Sydney.jpg/1200px-Muse_in_Sydney.jpg',
    title: 'Concert',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adispicing elit',
  },
];

export const HomeScreen: React.FC = () => {
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
    <View style={styles.root}>
      <View style={{paddingHorizontal: ms(12)}}>
        <TopNavigation.Type5
          name="Type 5"
          profileUri={
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp'
          }
          leftIconAction={() => console.log('Left Icon Pressed')}
          rightIcon={
            <IconNotif
              onPress={() => console.log('IconNotif Pressed')}
              label={12}
            />
          }
          rightIconAction={() => console.log('Right Icon Pressed')}
          maxLengthTitle={20}
          itemStrokeColor={Color.Pink[100]}
          points={100000}
        />
      </View>

      <SearchBar containerStyle={{paddingHorizontal: ms(12)}} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageSlider.Home data={dataSlider} />
        <View style={{marginTop: mvs(20), paddingHorizontal: ms(12)}}>
          <TabFilter.Type1
            filterData={filter}
            onPress={filterData}
            selectedIndex={selectedIndex}
          />
          {filter[selectedIndex].filterName === 'TOP MUSICIAN' ? (
            <MusicianListExample />
          ) : filter[selectedIndex].filterName === 'TOP SONG' ? (
            <MusicListCardExample />
          ) : (
            <PostListCardExample />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    // paddingHorizontal: ms(12),
  },
});
