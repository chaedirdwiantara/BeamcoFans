import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {normalize} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

const LoveIcon = ({
  width = normalize(13),
  height = normalize(10),
  fill = 'none',
  stroke = '#292D32',
  style,
}: SvgProps) => (
  <View style={[{width: width, height: height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 13 10'}>
      <Path
        fill={fill}
        stroke={stroke}
        d="M8.664 0C7.578 0 6.606.494 6 1.253 5.394.494 4.422 0 3.336 0 1.494 0 0 1.404 0 3.14 0 3.81.114 4.427.312 5c.948 2.809 3.87 4.489 5.316 4.95.204.067.54.067.744 0C7.818 9.488 10.74 7.808 11.688 5A5.65 5.65 0 0012 3.14C12 1.404 10.506 0 8.664 0z"
      />
    </Svg>
  </View>
);

export default LoveIcon;
