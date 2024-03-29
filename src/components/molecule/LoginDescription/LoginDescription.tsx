import React from 'react';
import {Text, View, StyleSheet, ViewStyle} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';

import {width} from '../../../utils';
import Color from '../../../theme/Color';
import Typography from '../../../theme/Typography';
import {BeamcoLogo} from '../../../assets/logo';

interface LoginDescriptionProps {
  containerStyle?: ViewStyle;
}

export const LoginDescription: React.FC<LoginDescriptionProps> = ({
  containerStyle,
}) => {
  const {t} = useTranslation();
  const description = t('General.TopDescription');

  return (
    <View style={[styles.root, containerStyle]}>
      <BeamcoLogo />
      <Text style={[Typography.Subtitle3, styles.description]}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Color.Neutral[10],
    marginTop: mvs(15),
  },
  description: {
    color: Color.Neutral[10],
    textAlign: 'center',
    marginTop: mvs(15),
    maxWidth: width * 0.8,
  },
});
