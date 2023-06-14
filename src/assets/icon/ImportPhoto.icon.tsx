import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function ImportPhotoIcon({
  width = widthPercentage(20),
  height = widthPercentage(20),
  fill = 'none',
  stroke = '#8794AD',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 20 20'}>
        <Path
          fill={stroke}
          d="M7.5 8.958a2.29 2.29 0 01-2.292-2.291A2.29 2.29 0 017.5 4.375 2.29 2.29 0 019.79 6.667 2.29 2.29 0 017.5 8.958zm0-3.333a1.042 1.042 0 100 2.084 1.042 1.042 0 000-2.084z"></Path>
        <Path
          fill={stroke}
          d="M12.5 18.958h-5c-4.525 0-6.458-1.933-6.458-6.458v-5c0-4.525 1.933-6.458 6.458-6.458h3.334a.63.63 0 01.625.625.63.63 0 01-.625.625H7.5c-3.841 0-5.208 1.366-5.208 5.208v5c0 3.842 1.367 5.208 5.208 5.208h5c3.842 0 5.209-1.366 5.209-5.208V8.333a.63.63 0 01.625-.625.63.63 0 01.625.625V12.5c0 4.525-1.934 6.458-6.459 6.458z"></Path>
        <Path
          fill={stroke}
          d="M17.708 4.792h-4.583a.63.63 0 01-.625-.625.63.63 0 01.625-.625h4.583a.63.63 0 01.625.625.63.63 0 01-.625.625z"></Path>
        <Path
          fill={stroke}
          d="M15.417 7.083a.63.63 0 01-.625-.625V1.875a.63.63 0 01.625-.625.63.63 0 01.625.625v4.583a.63.63 0 01-.625.625zM2.225 16.417a.626.626 0 01-.35-1.142l4.109-2.758c.9-.6 2.141-.534 2.958.158l.275.242c.417.358 1.125.358 1.533 0l3.467-2.975c.892-.759 2.275-.759 3.167 0l1.358 1.166a.63.63 0 01.067.884.63.63 0 01-.884.066l-1.358-1.166c-.417-.359-1.125-.359-1.533 0l-3.467 2.975c-.883.758-2.275.758-3.167 0l-.275-.242c-.383-.325-1.016-.358-1.441-.067l-4.1 2.759a.73.73 0 01-.359.1z"></Path>
      </Svg>
    </View>
  );
}

export default ImportPhotoIcon;