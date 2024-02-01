import * as React from 'react';
import {View} from 'react-native';
import Svg, {Rect, Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function EditCircleIcon({
  width = widthPercentage(30),
  height = widthPercentage(30),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 30 30'}>
        <Rect x={2} y={2} width={26} height={26} rx={13} fill="#FF69D2" />
        <Rect
          x={2}
          y={2}
          width={26}
          height={26}
          rx={13}
          stroke="#2C0E37"
          strokeWidth={4}
        />
        <Path
          d="M10.466 20.128c-.407 0-.78-.146-1.054-.413-.326-.327-.466-.8-.393-1.3l.287-2.007c.053-.386.306-.886.58-1.16l5.253-5.253c1.327-1.327 2.673-1.327 4 0 .727.727 1.053 1.467.987 2.207-.06.6-.38 1.186-.987 1.786l-5.253 5.254c-.274.273-.774.526-1.16.58l-2.007.286c-.087.02-.173.02-.253.02zm5.38-9.426l-5.254 5.253c-.126.127-.273.42-.3.593l-.286 2.007c-.027.193.013.353.113.453.1.1.26.14.453.114l2.007-.287c.173-.027.473-.173.593-.3l5.254-5.253c.433-.434.66-.82.693-1.18.04-.434-.187-.894-.693-1.407-1.067-1.067-1.8-.767-2.58.007z"
          fill="#fff"
        />
        <Path
          d="M18.033 14.888a.428.428 0 01-.134-.02 5.291 5.291 0 01-3.64-3.64.506.506 0 01.347-.62c.267-.073.54.08.614.347a4.283 4.283 0 002.946 2.947c.267.073.42.353.347.62a.49.49 0 01-.48.366z"
          fill="#fff"
        />
      </Svg>
    </View>
  );
}

export default EditCircleIcon;
