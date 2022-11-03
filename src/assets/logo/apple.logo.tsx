import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {ms, mvs} from 'react-native-size-matters';
import {SvgProps} from '../../interface/svg.interface';

function AppleLogo({
  width = ms(40),
  height = mvs(40),
  fill = 'none',
  stroke = '#0A0A0A',
  style,
}: SvgProps) {
  return (
    <View style={[styles.root, {width, height}, style]}>
      <Svg width={ms(20)} height={mvs(20)} fill={fill} viewBox={'0 0 20 20'}>
        <Path
          d="M14.598 10.463c-.008-1.332.595-2.336 1.814-3.076-.681-.977-1.713-1.514-3.072-1.617-1.287-.102-2.695.75-3.211.75-.545 0-1.791-.715-2.772-.715-2.023.03-4.173 1.613-4.173 4.832 0 .95.173 1.933.521 2.945.465 1.332 2.14 4.596 3.889 4.543.914-.021 1.56-.648 2.75-.648 1.154 0 1.752.648 2.771.648 1.764-.025 3.28-2.992 3.72-4.328-2.364-1.115-2.237-3.266-2.237-3.334zm-2.053-5.957c.99-1.176.9-2.246.871-2.631-.875.05-1.887.596-2.463 1.266-.635.718-1.008 1.607-.928 2.609.946.072 1.809-.414 2.52-1.244z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    borderRadius: ms(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppleLogo;
