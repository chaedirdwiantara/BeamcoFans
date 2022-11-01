import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {color, font} from '../../../theme';
import {normalize} from '../../../utils';
import {ms, mvs} from 'react-native-size-matters';
import {CheckBox} from '../../atom';
import {CheckBoxProps} from '../../../interface/checkbox.interface';

const TermAndConditions: React.FC<CheckBoxProps> = ({
  handleOnPress,
  active,
}) => {
  return (
    <View style={styles.container}>
      <CheckBox handleOnPress={handleOnPress} active={active} />
      <Text style={styles.textStyle}>
        I Agree with SunnySideUp Terms{' '}
        <Text
          style={[styles.textStyle, {color: color.Success[400]}]}
          onPress={() => console.log('tnc pressed')}>
          Conditions{' '}
        </Text>
        and{' '}
        <Text
          style={[styles.textStyle, {color: color.Success[400]}]}
          onPress={() => console.log('privacy policy pressed')}>
          Privacy Policy
        </Text>
      </Text>
    </View>
  );
};

export default TermAndConditions;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    maxWidth: '100%',
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    color: color.Neutral[10],
    marginLeft: ms(8),
  },
  checkbox: {
    width: ms(20),
    height: mvs(20),
    borderWidth: 1,
    borderColor: color.Dark[500],
    borderRadius: 6,
  },
});
