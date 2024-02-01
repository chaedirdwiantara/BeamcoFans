import * as React from 'react';
import {View} from 'react-native';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
import {SvgProps} from '../../interface/svg.interface';
import {heightPercentage, widthPercentage} from '../../utils';

function YoutubeIcon({
  width = widthPercentage(23),
  height = heightPercentage(23),
  fill = 'none',
  stroke = '#FF0302',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox="0 0 23 23">
        <G clipPath="url(#clip0_2278_6045)">
          <Path
            d="M21.561 5.967a2.765 2.765 0 00-1.945-1.958c-1.72-.462-8.595-.462-8.595-.462s-6.875 0-8.595.462A2.765 2.765 0 00.481 5.967c-.46 1.727-.46 5.33-.46 5.33s0 3.602.46 5.33a2.765 2.765 0 001.945 1.957c1.72.463 8.595.463 8.595.463s6.875 0 8.595-.463a2.765 2.765 0 001.945-1.957c.46-1.728.46-5.33.46-5.33s0-3.603-.46-5.33z"
            fill={stroke}
          />
          <Path d="M8.771 14.568V8.026l5.75 3.27-5.75 3.272z" fill="#FEFEFE" />
        </G>
        <Defs>
          <ClipPath id="clip0_2278_6045">
            <Path fill="#fff" transform="translate(0 .297)" d="M0 0H22V22H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}

export default YoutubeIcon;
