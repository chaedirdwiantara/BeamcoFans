import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  NativeModules,
  Platform,
  Dimensions,
  Text,
  FlatList,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {color, font} from '../../theme';
import {SsuStatusBar} from '../../components';
import {heightResponsive, widthResponsive} from '../../utils';
import MusicControl from './MusicControl';
import TopNav from './TopNav';
import Footer from './Footer';
import TitleAndDonate from './TitleAndDonate';
import Slider from '@react-native-community/slider';
import {mvs} from 'react-native-size-matters';
import {songs, SongsProps} from '../../data/music';

export const {width} = Dimensions.get('screen');

export const MusicPlayer = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState<number>(0);

  useEffect(() => {
    scrollX.addListener(({value}) => {
      // console.log(value, 'value');
      // console.log(width, 'width');
      const index = Math.round(value / width);
      // console.log(index, 'index');
      setSongIndex(index);
    });
  }, []);

  const RenderSongs = (item: SongsProps, index: number) => {
    return (
      <Animated.View style={styles.mainImageWrapper}>
        <View style={styles.imageWrapper}>
          {/* @ts-ignore */}
          <Image source={item.artwork} style={styles.musicImage} />
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <SsuStatusBar type="black" />
      <View style={styles.topNavStyle}>
        <TopNav />
      </View>
      <View style={styles.mainContainer}>
        {/* image */}
        <Animated.FlatList
          data={songs}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          renderItem={({item, index}) => RenderSongs(item, index)}
        />
      </View>
      {/* Title  */}
      <View style={styles.titleStyle}>
        <TitleAndDonate
          title={songs[songIndex].title}
          artist={songs[songIndex].artist}
        />
      </View>
      {/* slider */}
      <View style={styles.sliderStyle}>
        <Slider
          style={{width: '100%'}}
          value={10}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor={color.Success[400]}
          maximumTrackTintColor={color.Dark[400]}
          thumbTintColor={color.Success[400]}
          onSlidingComplete={() => {}}
        />
        <View style={styles.progresTextContainer}>
          <Text style={styles.progresText}>00:00</Text>
          <Text style={styles.progresText}>00:00</Text>
        </View>
      </View>
      <View style={styles.musiControl}>
        <MusicControl />
      </View>
      <View style={styles.footerStyle}>
        <Footer />
      </View>
    </View>
  );
};

// height responsive hasil - status bar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  topNavStyle: {paddingHorizontal: widthResponsive(24)},
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: heightResponsive(68),
    paddingBottom: heightResponsive(68),
  },
  mainImageWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: widthResponsive(280),
    height: heightResponsive(320),
  },
  musicImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  titleStyle: {
    backgroundColor: 'blue',
    paddingBottom: heightResponsive(36),
    paddingHorizontal: widthResponsive(24),
  },
  sliderStyle: {
    width: '100%',
    backgroundColor: 'grey',
    paddingHorizontal: widthResponsive(24),
  },
  musiControl: {
    width: '100%',
    height: heightResponsive(68),
    marginTop: heightResponsive(36),
    paddingHorizontal: widthResponsive(24),
    backgroundColor: 'blue',
  },
  footerStyle: {
    marginTop: heightResponsive(44),
    paddingHorizontal: widthResponsive(24),
    // marginBottom: heightResponsive(32),
  },
  progresTextContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progresText: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(10),
    color: color.Neutral[10],
  },
});
