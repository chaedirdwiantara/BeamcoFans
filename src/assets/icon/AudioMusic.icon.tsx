import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function AudioMusic({
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
          fill={fill}
          d="M15 22.75H9c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h6c5.43 0 7.75 2.32 7.75 7.75v6c0 5.43-2.32 7.75-7.75 7.75zm-6-20C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25V9c0-4.61-1.64-6.25-6.25-6.25H9z"></Path>
        <Path
          fill={fill}
          d="M9.62 18.05c-1.58 0-2.87-1.29-2.87-2.87s1.29-2.87 2.87-2.87 2.87 1.29 2.87 2.87-1.29 2.87-2.87 2.87zm0-4.23c-.75 0-1.37.61-1.37 1.37 0 .75.61 1.37 1.37 1.37.75 0 1.37-.61 1.37-1.37 0-.76-.62-1.37-1.37-1.37z"></Path>
        <Path
          fill={fill}
          d="M11.742 15.93c-.41 0-.75-.34-.75-.75V7.77c0-.41.34-.75.75-.75s.75.34.75.75v7.41c0 .42-.34.75-.75.75z"></Path>
        <Path
          fill={fill}
          d="M15.522 11.43c-.21 0-.43-.04-.65-.11l-2.34-.78c-.88-.29-1.54-1.21-1.54-2.14v-.62c0-.63.26-1.18.72-1.51.46-.33 1.06-.41 1.66-.21l2.34.78c.88.29 1.54 1.21 1.54 2.14v.62c0 .63-.26 1.18-.72 1.51-.29.21-.64.32-1.01.32zm-2.81-3.98c-.05 0-.1.01-.13.03-.06.04-.1.15-.1.29v.62c0 .28.26.63.52.72l2.34.78c.13.04.25.04.31 0s.1-.15.1-.29v-.62c0-.28-.26-.63-.52-.72l-2.34-.78a.615.615 0 00-.18-.03z"></Path>
      </Svg>
    </View>
  );
}

export default AudioMusic;