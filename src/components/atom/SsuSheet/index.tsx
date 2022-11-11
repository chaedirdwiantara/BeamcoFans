import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {Children, FC} from 'react';
import {color} from '../../../theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {ms, mvs} from 'react-native-size-matters';
import {
  heightPercentage,
  widthPercentage,
} from '../../../utils/dimensionFormat';

interface SheetProps {
  children?: React.ReactNode;
  topChild?: React.ReactNode;
  containerStyle?: ViewStyle;
}

const SsuSheet: FC<SheetProps> = (props: SheetProps) => {
  const {children, topChild, containerStyle} = props;

  return (
    <View style={[styles.container, containerStyle]}>
      {topChild}
      <View style={[styles.childrenContainer, containerStyle]}>{children}</View>
    </View>
  );
};

export default SsuSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
  },
  childrenContainer: {
    alignItems: 'center',
    backgroundColor: color.Dark[800],
    width: widthPercentageToDP('100%'),
    paddingHorizontal: widthPercentage(48),
    paddingTop: heightPercentage(32),
    paddingBottom: heightPercentage(24),
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
});
