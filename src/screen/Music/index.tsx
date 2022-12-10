import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {color, font} from '../../theme';
import {ModalDonate, SsuStatusBar} from '../../components';
import {heightResponsive, widthResponsive} from '../../utils';
import MusicControl from './MusicControl';
import TopNav from './TopNav';
import Footer from './Footer';
import TitleAndDonate from './TitleAndDonate';
import {Slider} from '@miblanchard/react-native-slider';
import {mvs} from 'react-native-size-matters';
import {songs, SongsProps} from '../../data/music';

export const {width} = Dimensions.get('screen');

export const MusicPlayer = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState<number>(0);
  const [modalDonate, setModalDonate] = useState<boolean>(false);

  useEffect(() => {
    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
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

  const coinOnPress = () => {
    setModalDonate(true);
  };

  const modalButtonOnPress = () => {
    setModalDonate(false);
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
          coinOnPress={coinOnPress}
        />
      </View>
      {/* slider */}
      <View style={styles.sliderStyle}>
        <Slider
          value={10}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor={color.Success[400]}
          maximumTrackTintColor={color.Dark[400]}
          thumbTintColor={color.Success[400]}
          onSlidingComplete={() => {}}
          thumbStyle={{width: 8, height: 8}}
          containerStyle={{
            marginBottom: heightResponsive(-12),
            marginTop: heightResponsive(-25),
          }}
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

      {/* modal */}
      <ModalDonate
        totalCoin="1000"
        onPressClose={modalButtonOnPress}
        modalVisible={modalDonate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
    justifyContent: 'space-between',
  },
  topNavStyle: {paddingHorizontal: widthResponsive(24)},
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: heightResponsive(65),
    paddingBottom: heightResponsive(65),
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
    paddingBottom: heightResponsive(36),
    paddingHorizontal: widthResponsive(24),
  },
  sliderStyle: {
    width: '100%',
    paddingHorizontal: widthResponsive(24),
  },
  musiControl: {
    width: '100%',
    height: heightResponsive(68),
    marginTop: heightResponsive(35),
    paddingHorizontal: widthResponsive(24),
  },
  footerStyle: {
    marginTop: heightResponsive(39),
    paddingHorizontal: widthResponsive(24),
    marginBottom: heightResponsive(24),
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
