import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import Color from '../../../theme/Color';
interface IndicatorProps {
  activeIndex?: boolean;
  type?: string;
}

export const Indicator: React.FC<IndicatorProps> = ({activeIndex, type}) => {
  const bgActvButton =
    type === 'preference' ? Color.Dark[100] : Color.Success[400];
  const bgNonActvButton =
    type === 'preference' ? Color.Dark[300] : Color.Success[400];

  return (
    <View>
      {activeIndex ? (
        <View style={[styles.active, {backgroundColor: bgActvButton}]} />
      ) : (
        <View style={[styles.nonActive, {backgroundColor: bgNonActvButton}]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  active: {
    width: ms(32),
    height: mvs(6),
    borderRadius: 4,
  },
  nonActive: {
    width: ms(6),
    height: ms(6),
    borderRadius: 4,
  },
});
