import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {width} from '../../../utils';
import Color from '../../../theme/Color';
import {CrackEggIcon} from '../../../assets/icon';
import Typography from '../../../theme/Typography';

interface Props {
  text?: string;
  containerStyle?: ViewStyle;
}

export const EmptyState: React.FC<Props> = (props: Props) => {
  const {text, containerStyle} = props;
  return (
    <View style={[styles.root, containerStyle]}>
      <CrackEggIcon />
      <Text style={[Typography.Button2, styles.text]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Color.Neutral[10],
    textAlign: 'center',
    maxWidth: width * 0.8,
  },
});
