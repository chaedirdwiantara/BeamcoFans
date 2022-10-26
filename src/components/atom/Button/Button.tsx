import React from 'react';
import {Text, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';

import Color from '../../../theme/Color';
import Font from '../../../theme/Font';

const {width} = Dimensions.get('screen');

interface ButtonProps {
  label: string;
  type?: string;
  buttonWidth?: number;
  labelColor?: string;
  borderColor?: string;
  fontSize?: number;
  backgroundColor?: string;
  onPress: () => void;
}

type TypeStyle = {
  root: any;
  labelStyle: any;
};

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const {
    type,
    label,
    buttonWidth,
    labelColor,
    borderColor,
    backgroundColor,
    fontSize,
    onPress,
  } = props;
  const size = buttonWidth ? buttonWidth : width * 0.8;
  const withBorder = type === 'border' && {
    borderWidth: 2,
    borderColor: borderColor ? borderColor : Color.Pink,
    backgroundColor: 'transparent',
  };

  return (
    <TouchableOpacity
      style={[styles.root(backgroundColor), withBorder, {width: size}]}
      onPress={onPress}>
      <Text style={styles.labelStyle(labelColor, fontSize)}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create<TypeStyle>({
  root: (backgroundColor = Color.Pink) => ({
    padding: 12,
    borderRadius: 5,
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  labelStyle: (color = '#FFF', fontSize = 16) => ({
    color: color,
    fontSize: fontSize,
    fontFamily: Font.InterMedium,
  }),
});
