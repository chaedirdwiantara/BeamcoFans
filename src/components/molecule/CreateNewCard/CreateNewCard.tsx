import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {SquareImage} from '../../atom';
import {normalize, widthPercentage} from '../../../utils';
import {color, font} from '../../../theme';
import Typography from '../../../theme/Typography';

interface ListProps {
  num: string;
  text: string;
  containerStyles?: ViewStyle;
}

const CreateNewCard: React.FC<ListProps> = ({num, text, containerStyles}) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={styles.numStyle}>{num}</Text>
      <SquareImage type="add" size={widthPercentage(44)} />
      <Text style={[Typography.Subtitle1, styles.labelStyle]}>{text}</Text>
    </View>
  );
};

export {CreateNewCard};

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
    marginRight: ms(10),
    color: color.Neutral[10],
  },
  labelStyle: {
    fontFamily: font.InterSemiBold,
    color: color.Neutral[10],
    marginLeft: widthPercentage(10),
  },
});
