import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function CameraIcon({
  width = widthPercentage(24),
  height = widthPercentage(24),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 24 24'}>
        <Path
          d="M17.242 22.75H6.762c-2.8 0-4.58-1.67-4.74-4.46l-.52-8.25a4.44 4.44 0 011.21-3.36c.85-.91 2.05-1.43 3.29-1.43.32 0 .63-.19.78-.49l.72-1.43c.59-1.17 2.07-2.08 3.36-2.08h2.29c1.29 0 2.76.91 3.35 2.07l.72 1.46c.15.28.45.47.78.47 1.24 0 2.44.52 3.29 1.43.86.92 1.29 2.11 1.21 3.36l-.52 8.26c-.18 2.83-1.91 4.45-4.74 4.45zm-6.38-20c-.74 0-1.68.58-2.02 1.25l-.72 1.44c-.42.81-1.23 1.31-2.12 1.31-.84 0-1.62.34-2.2.95-.57.61-.86 1.41-.8 2.24l.52 8.26c.12 2.02 1.21 3.05 3.24 3.05h10.48c2.02 0 3.11-1.03 3.24-3.05l.52-8.26a2.99 2.99 0 00-.8-2.24c-.58-.61-1.36-.95-2.2-.95-.89 0-1.7-.5-2.12-1.29L15.152 4c-.33-.66-1.27-1.24-2.01-1.24h-2.28v-.01z"
          fill={stroke}
        />
        <Path
          d="M13.5 8.75h-3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3c.41 0 .75.34.75.75s-.34.75-.75.75zM12 18.75c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6.5a2.5 2.5 0 000 5 2.5 2.5 0 000-5z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default CameraIcon;
