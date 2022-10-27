import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import Color from '../../../theme/Color';
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
    width: ms(32),
    height: mvs(6),
    borderRadius: 4,
    backgroundColor: Color.Success[400],
  },
  nonActive: {
    width: ms(6),
    height: ms(6),
    borderRadius: 4,
    backgroundColor: Color.Success[700],
  },
});
