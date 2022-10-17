import {View, Text} from 'react-native';
import React from 'react';

interface GapProps {
  height?: number;
  width?: number;
}

const Gap: React.FC<GapProps> = ({height, width}) => {
  return <View style={{height: height, width: width}} />;
};

export default Gap;
