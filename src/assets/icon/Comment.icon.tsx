import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {SvgProps} from '../../interface/svg.interface';
const CommentIcon = ({
  width = 24,
  height = 24,
  fill = 'none',
  stroke = '#292D32',
  style,
}: SvgProps) => (
  <View style={[{width: width, height: height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill}>
      <Path
        fillRule="evenodd"
        d="M2.58 2.58A6.25 6.25 0 017 .75 6.257 6.257 0 0113.25 7v6.25H7A6.25 6.25 0 012.58 2.58z"
        clipRule="evenodd"></Path>
      <Path
        fill="#657694"
        stroke={stroke}
        d="M7 .75l.001-1H7v1zm4.417 1.833l-.707.707.707-.707zM13.25 7h1v-.001l-1 .001zm0 6.25v1h1v-1h-1zm-6.25 0v1-1zm-4.42-1.83l.708-.708-.707.707zM7-.25a7.25 7.25 0 00-5.127 2.123l1.415 1.415A5.25 5.25 0 017 1.75v-2zm5.124 2.125A7.256 7.256 0 007.001-.25L7 1.75a5.257 5.257 0 013.711 1.54l1.414-1.415zM14.25 7a7.257 7.257 0 00-2.126-5.124L10.71 3.29A5.257 5.257 0 0112.25 7l2-.002zm0 6.251V7h-2v6.25h2zm-7.25 1h6.25v-2H7v2zm-5.127-2.123A7.25 7.25 0 007 14.25v-2a5.25 5.25 0 01-3.712-1.538l-1.415 1.415zM-.25 7a7.25 7.25 0 002.123 5.127l1.415-1.415A5.25 5.25 0 011.75 7h-2zm2.123-5.127A7.25 7.25 0 00-.25 7h2a5.25 5.25 0 011.538-3.712L1.873 1.873z"
        mask="url(#path-1-inside-1_541_40666)"></Path>
    </Svg>
  </View>
);

export default CommentIcon;
