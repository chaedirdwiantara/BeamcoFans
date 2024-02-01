import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {SvgProps} from '../../interface/svg.interface';
import {heightPercentage, widthPercentage} from '../../utils';

function SpotifyIcon({
  width = widthPercentage(23),
  height = heightPercentage(23),
  fill = 'none',
  stroke = '#1ED760',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox="0 0 23 23">
        <Path
          d="M11.466.297C5.41.297.5 5.207.5 11.263.5 17.32 5.41 22.23 11.466 22.23c6.057 0 10.967-4.91 10.967-10.966 0-6.056-4.91-10.966-10.967-10.966zm5.03 15.816a.683.683 0 01-.94.227c-2.576-1.573-5.817-1.93-9.634-1.057a.684.684 0 01-.304-1.333c4.177-.955 7.76-.543 10.65 1.223a.683.683 0 01.227.94zm1.342-2.986a.855.855 0 01-1.176.282c-2.948-1.812-7.441-2.337-10.928-1.279a.856.856 0 01-.497-1.636c3.983-1.208 8.934-.623 12.32 1.458a.855.855 0 01.28 1.175zm.115-3.11C14.419 7.919 8.587 7.726 5.213 8.75a1.026 1.026 0 11-.596-1.963C8.491 5.611 14.931 5.838 19 8.253a1.025 1.025 0 11-1.047 1.765z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default SpotifyIcon;
