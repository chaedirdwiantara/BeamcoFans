import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {ms, mvs} from 'react-native-size-matters';
import {SvgProps} from '../../interface/svg.interface';

function FacebookLogo({
  width = ms(40),
  height = mvs(40),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[styles.root, {width, height}, style]}>
      <Svg width={ms(20)} height={mvs(20)} fill={fill} viewBox={'0 0 20 20'}>
        <Path
          d="M10 1.668A8.333 8.333 0 008.7 18.233V12.41H6.582V10H8.7V8.166c0-2.09 1.244-3.242 3.146-3.242.912 0 1.867.162 1.867.162v2.05H12.66c-1.034 0-1.357.643-1.357 1.302v1.562h2.31l-.37 2.41h-1.94v5.823a8.333 8.333 0 00-1.301-16.564z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#3B5999',
    borderRadius: ms(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FacebookLogo;
