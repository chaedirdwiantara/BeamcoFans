import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function Trash({
  width = widthPercentage(18),
  height = widthPercentage(18),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={width} height={height} viewBox="0 0 16 16" fill={fill}>
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.20003 1.6001C6.89701 1.6001 6.62 1.7713 6.48448 2.04233L5.9056 3.2001H3.20002C2.7582 3.2001 2.40002 3.55827 2.40002 4.0001C2.40002 4.44193 2.7582 4.8001 3.20002 4.8001L3.20002 12.8001C3.20002 13.6838 3.91637 14.4001 4.80002 14.4001H11.2C12.0837 14.4001 12.8 13.6838 12.8 12.8001V4.8001C13.2419 4.8001 13.6 4.44193 13.6 4.0001C13.6 3.55827 13.2419 3.2001 12.8 3.2001H10.0945L9.51557 2.04233C9.38005 1.7713 9.10304 1.6001 8.80003 1.6001H7.20003ZM5.60002 6.4001C5.60002 5.95827 5.9582 5.6001 6.40003 5.6001C6.84185 5.6001 7.20003 5.95827 7.20003 6.4001V11.2001C7.20003 11.6419 6.84185 12.0001 6.40003 12.0001C5.9582 12.0001 5.60002 11.6419 5.60002 11.2001V6.4001ZM9.60003 5.6001C9.1582 5.6001 8.80003 5.95827 8.80003 6.4001V11.2001C8.80003 11.6419 9.1582 12.0001 9.60003 12.0001C10.0419 12.0001 10.4 11.6419 10.4 11.2001V6.4001C10.4 5.95827 10.0419 5.6001 9.60003 5.6001Z"
          fill="#8794AD"
        />
      </Svg>
    </View>
  );
}

export default Trash;
