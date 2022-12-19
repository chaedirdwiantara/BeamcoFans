import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {mvs} from 'react-native-size-matters';

import {SquareImage} from '../../atom';
import {color, font} from '../../../theme';
import Typography from '../../../theme/Typography';
import {normalize, widthPercentage, widthResponsive} from '../../../utils';

interface ListProps {
  num: string;
  text: string;
  containerStyles?: ViewStyle;
  onPress?: () => void;
}

export const CreateNewCard: React.FC<ListProps> = ({
  num,
  text,
  containerStyles,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyles]}
      onPress={onPress}>
      <Text style={styles.numStyle}>{num}</Text>
      <SquareImage type="add" size={widthPercentage(44)} />
      <Text style={[Typography.Subtitle1, styles.labelStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: undefined,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  numStyle: {
    fontFamily: font.InterMedium,
    fontWeight: '600',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    width: widthResponsive(30),
    color: color.Dark[100],
  },
  labelStyle: {
    fontFamily: font.InterSemiBold,
    fontSize: normalize(14),
    color: color.Neutral[10],
    marginLeft: widthPercentage(10),
  },
});
