import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {ms, mvs} from 'react-native-size-matters';
import {SvgProps} from '../../interface/svg.interface';

function NotificationIcon({
  width = ms(24),
  height = mvs(24),
  fill = 'none',
  stroke = '#657694',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 24 24'}>
        <Path
          d="M12.02 20.53c-2.33 0-4.66-.37-6.87-1.11-.84-.29-1.48-.88-1.76-1.65-.29-.77-.19-1.62.27-2.38l1.15-1.91c.24-.4.46-1.2.46-1.67V8.92c0-3.72 3.03-6.75 6.75-6.75s6.75 3.03 6.75 6.75v2.89c0 .46.22 1.27.46 1.68l1.14 1.9c.43.72.51 1.59.22 2.38a2.72 2.72 0 01-1.71 1.65c-2.2.74-4.53 1.11-6.86 1.11zm0-16.86c-2.89 0-5.25 2.35-5.25 5.25v2.89c0 .73-.3 1.81-.67 2.44l-1.15 1.91c-.22.37-.28.76-.15 1.09.12.34.42.6.83.74a20 20 0 0012.79 0c.36-.12.64-.39.77-.75s.1-.75-.1-1.08l-1.15-1.91c-.38-.65-.67-1.72-.67-2.45V8.92c0-2.9-2.35-5.25-5.25-5.25z"
          fill={stroke}
        />
        <Path
          d="M13.88 3.94c-.07 0-.14-.01-.21-.03-.29-.08-.57-.14-.84-.18-.85-.11-1.67-.05-2.44.18-.28.09-.58 0-.77-.21a.742.742 0 01-.14-.78 2.724 2.724 0 012.55-1.74c1.14 0 2.14.68 2.55 1.74.1.27.05.57-.14.78-.15.16-.36.24-.56.24zM12.02 22.81c-.99 0-1.95-.4-2.65-1.1-.7-.7-1.1-1.66-1.1-2.65h1.5c0 .59.24 1.17.66 1.59.42.42 1 .66 1.59.66 1.24 0 2.25-1.01 2.25-2.25h1.5c0 2.07-1.68 3.75-3.75 3.75z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default NotificationIcon;
