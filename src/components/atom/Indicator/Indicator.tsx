import React from 'react';
import {View, StyleSheet, Dimensions, Animated} from 'react-native';
import Color from '../../../theme/Color';

const {width} = Dimensions.get('screen');

interface IndicatorProps {
  activeIndex?: boolean;
}

export const Indicator: React.FC<IndicatorProps> = ({activeIndex}) => {
  return (
    <View>
      {activeIndex ? (
        <View style={styles.active} />
      ) : (
        <View style={styles.nonActive} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  active: {
    width: width * 0.1,
    height: 8,
    borderRadius: 4,
    backgroundColor: Color.Success[400],
  },
  nonActive: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: Color.Success[700],
  },
});
