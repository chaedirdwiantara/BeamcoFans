import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {normalize} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

const ErrorIcon = ({
  width = normalize(14),
  height = normalize(12),
  fill = 'none',
  stroke = '#292D32',
  style,
}: SvgProps) => {
  return (
    <View style={[{width: width, height: height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 14 12'}>
        <Path
          fill={fill}
          d="M5.606 1.48a1.6 1.6 0 012.789 0l4.464 7.936a1.6 1.6 0 01-1.395 2.384H2.536A1.6 1.6 0 011.14 9.416L5.606 1.48zM7.8 9.4a.8.8 0 11-1.6 0 .8.8 0 011.6 0zM7 3a.8.8 0 00-.8.8v2.4a.8.8 0 001.6 0V3.8A.8.8 0 007 3z"
        />
      </Svg>
    </View>
  );
};

export default ErrorIcon;
