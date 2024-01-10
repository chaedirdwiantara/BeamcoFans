import React from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import Color from '../../../theme/Color';
import {CrackEggIcon} from '../../../assets/icon';
import Typography from '../../../theme/Typography';
import {Button} from '../../atom';

interface Props {
  text: string;
  subtitle?: string;
  btnText?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  hideIcon?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export const EmptyState: React.FC<Props> = (props: Props) => {
  const {
    text,
    subtitle,
    containerStyle,
    icon,
    hideIcon,
    textStyle,
    btnText,
    onPress,
  } = props;
  return (
    <View style={[styles.root, containerStyle]}>
      {hideIcon ? <></> : icon ? icon : <CrackEggIcon />}
      <Text style={[Typography.Button2, styles.text, textStyle]}>{text}</Text>
      {subtitle && (
        <Text style={[Typography.Caption, styles.subtitle]}>{subtitle}</Text>
      )}
      {btnText && (
        <Button
          label={btnText}
          containerStyles={styles.buttonStyle}
          textStyles={{fontWeight: '600'}}
          onPress={onPress ?? onPress}
        />
      )}
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
    fontSize: mvs(15),
    fontFamily: 'Inter-Medium',
  },
  subtitle: {
    color: Color.Neutral[10],
    maxWidth: width * 0.8,
    textAlign: 'center',
    paddingTop: heightPercentage(4),
  },
  buttonStyle: {
    backgroundColor: Color.Pink[2],
    width: undefined,
    aspectRatio: undefined,
    paddingHorizontal: widthPercentage(16),
    paddingVertical: widthPercentage(8),
    marginTop: heightPercentage(20),
  },
});
