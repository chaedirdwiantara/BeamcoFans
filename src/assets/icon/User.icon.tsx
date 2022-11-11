import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {ms, mvs} from 'react-native-size-matters';
import {SvgProps} from '../../interface/svg.interface';

const UserIcon = ({
  width = ms(21),
  height = mvs(24),
  fill = 'none',
  stroke = '#292D32',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 24 24'}>
      <Path
        d="M13.3327 5.83333C13.3327 7.67428 11.8403 9.16667 9.99935 9.16667C8.1584 9.16667 6.66602 7.67428 6.66602 5.83333C6.66602 3.99238 8.1584 2.5 9.99935 2.5C11.8403 2.5 13.3327 3.99238 13.3327 5.83333Z"
        stroke="#8794AD"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M9.99935 11.6667C6.77769 11.6667 4.16602 14.2783 4.16602 17.5H15.8327C15.8327 14.2783 13.221 11.6667 9.99935 11.6667Z"
        stroke="#8794AD"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  </View>
);

export default UserIcon;
