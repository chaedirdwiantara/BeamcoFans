import React from 'react';
import {
  View,
  StyleSheet,
  ViewComponent,
  ViewProps,
  ViewStyle,
} from 'react-native';

type Props = {
  size: number;
  color: string;
  containerStyle?: ViewStyle;
};

const Circle: React.FC<Props> = ({size, color, containerStyle}) => {
  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        containerStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  circle: {},
});

export default Circle;
