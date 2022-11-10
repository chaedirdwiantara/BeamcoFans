import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {Children, FC} from 'react';
import {color} from '../../../theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {ms, mvs} from 'react-native-size-matters';
import {
  heightPercentage,
  widhtPercentage,
} from '../../../utils/dimensionFormat';

interface SheetProps {
  children?: React.ReactNode;
  containerStyle?: ViewStyle;
}

const SsuSheet: FC<SheetProps> = (props: SheetProps) => {
  const {children, containerStyle} = props;
  return <View style={[styles.container, containerStyle]}>{children}</View>;
};

export default SsuSheet;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: color.Dark[800],
    width: widthPercentageToDP('100%'),
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: widhtPercentage(48),
    paddingTop: heightPercentage(32),
    paddingBottom: heightPercentage(24),
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
});
