import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function RepeatOneIcon({
  width = widthPercentage(24),
  height = widthPercentage(24),
  fill = '#fff',
  stroke = '#48546A',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 24 24'}>
        <Path
          d="M3.91 17.18c-.19 0-.38-.07-.53-.22a7.244 7.244 0 0 1-2.13-5.13c0-4.01 3.25-7.27 7.25-7.27l6.07.02-1.09-1.04a.746.746 0 0 1-.02-1.06c.29-.3.76-.31 1.06-.02l2.44 2.34c.22.21.29.54.18.82-.11.28-.39.47-.7.47l-7.95-.02c-3.17 0-5.75 2.59-5.75 5.77 0 1.53.6 2.98 1.69 4.07.29.29.29.77 0 1.06-.14.14-.33.21-.52.21ZM10 21.75c-.19 0-.37-.07-.52-.21L7.04 19.2a.76.76 0 0 1-.18-.82c.11-.28.39-.47.7-.47l7.95.02c3.17 0 5.75-2.59 5.75-5.77 0-1.53-.6-2.98-1.69-4.07a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0a7.244 7.244 0 0 1 2.13 5.13c0 4.01-3.25 7.27-7.25 7.27l-6.07-.02 1.09 1.04c.3.29.31.76.02 1.06-.16.16-.35.24-.55.24Z"
          fill={fill}
        />
        <Path
          d="M12.25 15.42c-.41 0-.75-.34-.75-.75v-3.39l-.19.21c-.28.31-.75.33-1.06.06a.755.755 0 0 1-.06-1.06l1.5-1.67c.21-.23.54-.31.83-.2.29.11.48.39.48.7v5.35c0 .42-.34.75-.75.75Z"
          fill={fill}
        />
      </Svg>
    </View>
  );
}

export default RepeatOneIcon;
