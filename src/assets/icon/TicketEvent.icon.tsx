import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function TicketEventIcon({
  width = widthPercentage(16),
  height = widthPercentage(16),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 24 24'}>
        <Path
          d="M16.9987 20.75H6.99875C2.74875 20.75 1.35875 19.48 1.25875 15.52C1.25875 15.32 1.32875 15.12 1.46875 14.98C1.60875 14.84 1.79875 14.75 2.00875 14.75C3.51875 14.75 4.74875 13.51 4.74875 12C4.74875 10.49 3.51875 9.25 2.00875 9.25C1.80875 9.25 1.61875 9.17 1.46875 9.02C1.31875 8.87 1.24875 8.68 1.25875 8.48C1.35875 4.52 2.74875 3.25 6.99875 3.25H16.9987C21.4087 3.25 22.7488 4.59 22.7488 9V15C22.7488 19.41 21.4087 20.75 16.9987 20.75ZM2.78875 16.18C2.95875 18.72 3.81875 19.25 6.99875 19.25H16.9987C20.5788 19.25 21.2488 18.57 21.2488 15V9C21.2488 5.43 20.5788 4.75 16.9987 4.75H6.99875C3.81875 4.75 2.95875 5.29 2.78875 7.82C4.75875 8.2 6.24875 9.93 6.24875 12C6.24875 14.07 4.75875 15.8 2.78875 16.18Z"
          fill="white"
        />
        <Path
          d="M9 8.25C8.59 8.25 8.25 7.91 8.25 7.5V4C8.25 3.59 8.59 3.25 9 3.25C9.41 3.25 9.75 3.59 9.75 4V7.5C9.75 7.91 9.41 8.25 9 8.25Z"
          fill="white"
        />
        <Path
          d="M9 20.75C8.59 20.75 8.25 20.41 8.25 20V16.5C8.25 16.09 8.59 15.75 9 15.75C9.41 15.75 9.75 16.09 9.75 16.5V20C9.75 20.41 9.41 20.75 9 20.75Z"
          fill="white"
        />
        <Path
          d="M13.0401 15.6496C12.8001 15.6496 12.5601 15.5696 12.3601 15.4296C12.0001 15.1696 11.8201 14.7296 11.9001 14.2896L12.1101 13.0996L11.2401 12.2496C10.9201 11.9396 10.8101 11.4796 10.9401 11.0596C11.0801 10.6396 11.4401 10.3296 11.8801 10.2696L13.0801 10.0896L13.6201 8.99961C13.8201 8.59961 14.2201 8.34961 14.6601 8.34961C15.1101 8.34961 15.5101 8.59961 15.7001 8.99961L16.2401 10.0896L17.4401 10.2696C17.8801 10.3296 18.2401 10.6396 18.3801 11.0596C18.5201 11.4796 18.4001 11.9396 18.0801 12.2496L17.2101 13.0996L17.4201 14.2896C17.5001 14.7296 17.3201 15.1696 16.9601 15.4296C16.6001 15.6896 16.1301 15.7196 15.7401 15.5196L14.6701 14.9596L13.5901 15.5196C13.4201 15.6096 13.2301 15.6496 13.0401 15.6496ZM12.7701 11.6496L13.2801 12.1496C13.5601 12.4196 13.6801 12.7996 13.6201 13.1796L13.5001 13.8796L14.1301 13.5496C14.4701 13.3696 14.8701 13.3696 15.2101 13.5496L15.8401 13.8796L15.7201 13.1796C15.6601 12.7896 15.7801 12.4096 16.0601 12.1496L16.5701 11.6496L15.8701 11.5496C15.4901 11.4896 15.1601 11.2496 14.9901 10.9096L14.6801 10.2696L14.3701 10.9096C14.2001 11.2496 13.8701 11.4896 13.4901 11.5496L12.7701 11.6496Z"
          fill="white"
        />
      </Svg>
    </View>
  );
}

export default TicketEventIcon;