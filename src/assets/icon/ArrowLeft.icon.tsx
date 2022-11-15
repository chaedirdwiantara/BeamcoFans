import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {ms, mvs} from 'react-native-size-matters';
import {SvgProps} from '../../interface/svg.interface';

function ArrowRightIcon({
  width = ms(20),
  height = mvs(20),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 20 20'}>
        <Path
          fill={stroke}
          d="M8 17.67c-.19 0-.38-.07-.53-.22L.95 10.93a2.74 2.74 0 010-3.86L7.47.55c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L2.01 8.13c-.48.48-.48 1.26 0 1.74l6.52 6.52c.29.29.29.77 0 1.06-.15.14-.34.22-.53.22z"></Path>
      </Svg>
    </View>
  );
}

export default ArrowRightIcon;
