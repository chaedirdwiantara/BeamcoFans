import React, {FC, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Animated,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {Slider} from '@miblanchard/react-native-slider';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  BottomSheetGuest,
  ModalDonate,
  ModalSuccessDonate,
  SsuStatusBar,
} from '../../components';
import Footer from './Footer';
import TopNav from './TopNav';
import {color, font} from '../../theme';
import MusicControl from './MusicControl';
import TitleAndDonate from './TitleAndDonate';
import {RootStackParams} from '../../navigations';
import {songs, SongsProps} from '../../data/music';
import {storage} from '../../hooks/use-storage.hook';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {heightResponsive, widthResponsive} from '../../utils';

export const {width} = Dimensions.get('screen');

type MusicProps = NativeStackScreenProps<RootStackParams, 'MusicPlayer'>;

export const MusicPlayer: FC<MusicProps> = ({navigation}: MusicProps) => {
  const isLogin = storage.getBoolean('isLogin');
  const scrollX = useRef(new Animated.Value(0)).current;
  const {playerProgress, currentTrack, seekPlayer} = usePlayerHook();
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);
  const [modalGuestVisible, setModalGuestVisible] = useState<boolean>(false);
  // const [songIndex, setSongIndex] = useState<number>(0);

  // TODO: will gonna use it when swipe on the song is applied
  // useEffect(() => {
  //   scrollX.addListener(({value}) => {
  //     const index = Math.round(value / width);
  //     setSongIndex(index);
  //   });
  // }, []);

  const {showMiniPlayerOnly} = usePlayerHook();

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
    isLogin ? setModalDonate(true) : setModalGuestVisible(true);
  };

  const onPressCloseModalDonate = () => {
    setModalDonate(false);
  };

  const onPressDonate = () => {
    setModalDonate(false);
    setTrigger2ndModal(true);
  };

  const onPressSuccess = () => {
    setModalSuccessDonate(false);
  };

  const artistOnPress = () => {
    showMiniPlayerOnly();
    navigation.navigate('MusicianProfile', {id: currentTrack?.musicianId});
  };

  const handleTopLeftIcon = () => {
    showMiniPlayerOnly();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <SsuStatusBar type="black" />
      <View style={styles.topNavStyle}>
        <TopNav
          songId={currentTrack?.id}
          musicianId={currentTrack?.musicianId}
          leftIconAction={handleTopLeftIcon}
        />
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
          title={currentTrack?.title ?? ''}
          artist={currentTrack?.artist ?? ''}
          coinOnPress={coinOnPress}
          artistOnPress={artistOnPress}
        />
      </View>
      {/* slider */}
      <View style={styles.sliderStyle}>
        <Slider
          value={playerProgress.position}
          minimumValue={0}
          maximumValue={playerProgress.duration}
          minimumTrackTintColor={color.Success[400]}
          maximumTrackTintColor={color.Dark[400]}
          thumbTintColor={color.Success[400]}
          onSlidingComplete={e => {
            const seekDuration = e as number[];
            seekPlayer(seekDuration[0]);
          }}
          thumbStyle={{width: 8, height: 8}}
          containerStyle={{
            marginBottom: heightResponsive(-12),
            marginTop: heightResponsive(-25),
          }}
        />
        <View style={styles.progresTextContainer}>
          <Text style={styles.progresText}>
            {new Date((playerProgress.position + 1) * 1000)
              .toISOString()
              .slice(14, 19)}
          </Text>
          <Text style={styles.progresText}>
            {new Date(playerProgress.duration * 1000)
              .toISOString()
              .slice(14, 19)}
          </Text>
        </View>
      </View>
      <View style={styles.musiControl}>
        <MusicControl />
      </View>
      <View style={styles.footerStyle}>
        <Footer />
      </View>

      <BottomSheetGuest
        modalVisible={modalGuestVisible}
        onPressClose={() => setModalGuestVisible(false)}
      />

      {/* modal */}
      <ModalDonate
        userId={currentTrack?.musicianId}
        onPressClose={onPressCloseModalDonate}
        onPressDonate={onPressDonate}
        modalVisible={modalDonate}
        onModalHide={() => setModalSuccessDonate(true)}
      />

      <ModalSuccessDonate
        modalVisible={modalSuccessDonate && trigger2ndModal ? true : false}
        toggleModal={onPressSuccess}
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
