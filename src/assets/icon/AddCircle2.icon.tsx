import * as React from 'react';
import {View} from 'react-native';
import Svg, {Rect, Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function AddCircle2Icon({
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
          d="M19.5 15.563h-9A.567.567 0 019.937 15c0-.307.256-.563.563-.563h9c.308 0 .563.256.563.563a.567.567 0 01-.563.563z"
          fill="#fff"
        />
        <Path
          d="M15 20.063a.567.567 0 01-.563-.563v-9c0-.307.256-.563.563-.563.307 0 .563.256.563.563v9a.567.567 0 01-.563.563z"
          fill="#fff"
        />
      </Svg>
    </View>
  );
}

export default AddCircle2Icon;
