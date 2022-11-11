import {View, Text} from 'react-native';
import React from 'react';
import {ms, mvs} from 'react-native-size-matters';
import {
  heightPercentage,
  widthPercentage,
} from '../../../utils/dimensionFormat';

interface GapProps {
  height?: number;
  width?: number;
}

const Gap: React.FC<GapProps> = ({height, width}) => {
  return (
    <View
      style={{
        height: height && heightPercentage(height),
        width: width && widthPercentage(width),
      }}
    />
  );
};

export default Gap;
