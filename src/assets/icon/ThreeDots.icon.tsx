import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {SvgProps} from '../../interface/svg.interface';

const ThreeDotsIcon = ({
  width = 24,
  height = 24,
  fill = 'none',
  stroke = '#292D32',
  style,
}: SvgProps) => (
  <View style={[{width: width, height: height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill}>
      <Path
        fill={fill}
        d="M11 12c0-.56.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.44-1-1zM11 16c0-.56.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.44-1-1zM11 8c0-.56.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.44-1-1z"></Path>
    </Svg>
  </View>
);

export default ThreeDotsIcon;
