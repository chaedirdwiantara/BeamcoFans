import React from 'react';
import {Text, View, StyleSheet, ViewStyle} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';

import {SSULogo} from '../../../assets/logo';
import Color from '../../../theme/Color';
import Typography from '../../../theme/Typography';

interface LoginDescriptionProps {
  containerStyle?: ViewStyle;
}

export const LoginDescription: React.FC<LoginDescriptionProps> = ({
  containerStyle,
}) => {
  const title = 'Begin Today';
  const description =
    'Sign In or Register to explore full features and support the musician';

  return (
    <View style={[styles.root, containerStyle]}>
      <SSULogo />
      <Text style={[Typography.Heading4, styles.title]}>{title}</Text>
      <Text style={[Typography.Subtitle2, styles.description]}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  title: {
    color: Color.Neutral[10],
    marginTop: mvs(15),
  },
  description: {
    color: Color.Neutral[10],
    textAlign: 'center',
    marginTop: mvs(15),
    width: ms(293),
  },
});
