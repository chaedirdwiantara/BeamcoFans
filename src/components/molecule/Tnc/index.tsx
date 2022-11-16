import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color, font} from '../../../theme';
import {normalize} from '../../../utils';
import {ms, mvs} from 'react-native-size-matters';
import {CheckBox, Gap} from '../../atom';
import {CheckBoxProps} from '../../../interface/checkbox.interface';
import {ErrorIcon} from '../../../assets/icon';

const ErrorColor = color.Error[400];

const TermAndConditions: React.FC<CheckBoxProps> = ({
  handleOnPress,
  active,
  errorMsg,
}) => {
  return (
    <View>
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
      {errorMsg && (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingTop: mvs(4),
            alignItems: 'flex-end',
          }}>
          <ErrorIcon fill={ErrorColor} style={{marginBottom: mvs(-1)}} />
          <Gap width={4} />
          <Text
            style={{
              fontFamily: font.InterRegular,
              fontWeight: '400',
              fontSize: normalize(10),
              lineHeight: mvs(12),
              color: ErrorColor,
              maxWidth: '90%',
            }}>
            {errorMsg}
          </Text>
        </View>
      )}
    </View>
  );
};

export default TermAndConditions;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textStyle: {
    maxWidth: '90%',
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
