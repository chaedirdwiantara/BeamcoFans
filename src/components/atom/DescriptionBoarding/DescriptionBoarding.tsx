import React from 'react';
import {Text, StyleSheet, Dimensions, View} from 'react-native';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';

const {width} = Dimensions.get('screen');

interface Props {
  title?: string;
  subtitle?: string;
}

const DescriptionBoarding: React.FC<Props> = ({title, subtitle}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default DescriptionBoarding;

const styles = StyleSheet.create({
  root: {
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  title: {
    color: Color.Neutral[10],
    fontSize: 20,
    fontFamily: Font.MontserratSemiBold,
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    color: Color.Neutral[10],
    fontSize: 13,
    fontFamily: Font.MontserratLight,
    textAlign: 'center',
  },
});
