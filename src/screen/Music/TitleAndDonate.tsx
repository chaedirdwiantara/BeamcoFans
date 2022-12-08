import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color, font} from '../../theme';
import {heightResponsive, normalize, widthResponsive} from '../../utils';
import {CoinCIcon} from '../../assets/icon';

const TitleAndDonate = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Dull Knives</Text>
        <Text style={styles.subTitle}>Imagine Dragon, The Weekend</Text>
      </View>
      <View style={styles.iconStyle}>
        <CoinCIcon />
      </View>
    </View>
  );
};

export default TitleAndDonate;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: heightResponsive(36),
    paddingHorizontal: widthResponsive(24),
  },
  title: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: normalize(20),
    color: color.Neutral[10],
  },
  subTitle: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(15),
    color: color.Dark[50],
  },
  iconStyle: {
    justifyContent: 'center',
  },
});
