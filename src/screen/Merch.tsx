import React from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import {SsuStatusBar} from '../components';
import Color from '../theme/Color';
import WebView from 'react-native-webview';
import {heightPercentage, width} from '../utils';
import {FriedEggIcon} from '../assets/icon';
import {color, typography} from '../theme';

export const MerchScreen: React.FC = () => {
  const merchantUrl =
    'https://m.bookyay.com/items/product?clause=product_5000001';
  return (
    <SafeAreaView style={styles.root}>
      <SsuStatusBar type="black" />
      <View style={styles.wrapperContent}>
        <FriedEggIcon />
        <Text style={[typography.Button2, styles.title]}>
          {'Coming Soon\nStay tuned for the big reveal!'}
        </Text>
      </View>
      {/* 
      // TODO: will gonna activate after ready for production
      <WebView source={{uri: merchantUrl}} /> 
      */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  header: {
    backgroundColor: Color.Dark[800],
    width: width,
    height: undefined,
    aspectRatio: 375 / 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Color.Dark[500],
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  wrapperContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: color.Neutral[10],
    textAlign: 'center',
    marginTop: heightPercentage(8),
  },
});
