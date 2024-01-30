import * as React from 'react';
import {View} from 'react-native';
import Svg, {Rect, Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

const CheckCircle3Icon = ({
  width = widthPercentage(30),
  height = widthPercentage(30),
  fill = 'none',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 30 30'}>
      <Rect x={2} y={2} width={26} height={26} rx={13} fill="#1ED760" />
      <Rect
        x={2}
        y={2}
        width={26}
        height={26}
        rx={13}
        stroke="#2C0E37"
        strokeWidth={4}
      />
      <Path
        d="M21.502 10.748a.844.844 0 010 1.192l-8.156 8.156a.844.844 0 01-1.193 0L8.497 16.44a.845.845 0 011.192-1.193l3.06 3.06 7.56-7.56a.844.844 0 011.193 0z"
        fill="#fff"
      />
    </Svg>
  </View>
);

export default CheckCircle3Icon;
