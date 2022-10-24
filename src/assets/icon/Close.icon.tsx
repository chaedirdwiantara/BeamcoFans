import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {SvgProps} from '../../interface/svg.interface';

const CloseIcon = ({
  width = 12,
  height = 12,
  fill = 'none',
  stroke = '#292D32',
  style,
}: SvgProps) => (
  <View style={[{width: width, height: height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill}>
      <Path
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M1 11L11 1M1 1l10 10"
      />
    </Svg>
  </View>
);

export default CloseIcon;
