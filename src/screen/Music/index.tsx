import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {color} from '../../theme';
import {SsuStatusBar} from '../../components';
import {heightResponsive, widthResponsive} from '../../utils';
import MusicControl from './MusicControl';
import TopNav from './TopNav';
import Footer from './Footer';
import TitleAndDonate from './TitleAndDonate';

export const MusicPlayer = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SsuStatusBar type="black" />
      <View style={styles.topNavStyle}>
        <TopNav />
      </View>
      <View style={styles.mainContainer}>
        {/* image */}
        <View style={styles.imageWrapper}>
          <Image
            source={require('../../assets/music/img/img1.jpg')}
            style={styles.musicImage}
          />
        </View>

        {/* slider */}

        {/* music controls */}
      </View>
      <TitleAndDonate />
      <View style={styles.musiControl}>
        <MusicControl />
      </View>
      <View style={styles.footerStyle}>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  topNavStyle: {
    paddingHorizontal: widthResponsive(24),
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: heightResponsive(48),
    paddingHorizontal: widthResponsive(24),
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
  musiControl: {
    width: '100%',
    height: heightResponsive(68),
    paddingHorizontal: widthResponsive(24),
  },
  footerStyle: {
    marginTop: heightResponsive(44),
    marginBottom: heightResponsive(32),
    paddingHorizontal: widthResponsive(24),
  },
});
