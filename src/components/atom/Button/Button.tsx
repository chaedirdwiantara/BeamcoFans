import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';

import Color from '../../../theme/Color';
import Font from '../../../theme/Font';
import {normalize} from '../../../utils';

interface ButtonProps {
  label: string;
  type?: string;
  borderColor?: string;
  containerStyles?: ViewStyle;
  textStyles?: TextStyle;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const {type, label, borderColor, containerStyles, textStyles, onPress} =
    props;

  const withBorder = type === 'border' && {
    borderWidth: ms(2),
    borderColor: borderColor ? borderColor : Color.Pink.linear,
    backgroundColor: 'transparent',
  };

  return (
    <TouchableOpacity
      style={[styles.root, withBorder, containerStyles]}
      onPress={onPress}>
      <Text style={[styles.labelStyle, textStyles]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: ms(253),
    height: mvs(40),
    borderRadius: 4,
    backgroundColor: Color.Pink.linear,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    color: '#FFF',
    fontSize: normalize(12),
    fontFamily: Font.InterMedium,
  },
});
