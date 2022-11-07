import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {ms, mvs} from 'react-native-size-matters';
import {color, font} from '../../../theme';
import {normalize} from '../../../utils';

interface DividerProps {
  text: string;
}

const SsuDivider: FC<DividerProps> = ({text}) => {
  return (
    <View style={styles.container}>
      <View style={styles.lineStyle} />
      <Text style={styles.textStyle}>{text}</Text>
      <View style={styles.lineStyle} />
    </View>
  );
};

export default SsuDivider;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  lineStyle: {
    flex: 1,
    height: mvs(1),
    backgroundColor: color.Dark[500],
  },
  textStyle: {
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(12),
    lineHeight: mvs(16),
    color: color.Neutral[10],
    paddingHorizontal: ms(8),
  },
});
