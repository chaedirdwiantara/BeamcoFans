import {View, Text} from 'react-native';
import React from 'react';
import {ms, mvs} from 'react-native-size-matters';

interface GapProps {
  height?: number;
  width?: number;
}

const Gap: React.FC<GapProps> = ({height, width}) => {
  return (
    <View style={{height: height && mvs(height), width: width && ms(width)}} />
  );
};

export default Gap;
