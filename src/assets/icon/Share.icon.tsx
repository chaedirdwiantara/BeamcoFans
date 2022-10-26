import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {normalize} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function ShareIcon({
  width = normalize(24),
  height = normalize(24),
  fill = 'none',
  stroke = '#8794AD',
  style,
}: SvgProps) {
  return (
    <View style={[{width: width, height: height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 24 24'}>
        <Path
          d="M18 8a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zM18 22a3 3 0 100-6 3 3 0 000 6zM8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"
          stroke={stroke}
          strokeWidth={1.1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export default ShareIcon;
