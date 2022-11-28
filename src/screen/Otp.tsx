import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import SsuSheet from '../components/atom/SsuSheet';
import {Button, Gap, SsuOTPInput, SsuOTPTimer} from '../components';
import {normalize} from '../utils';
import {color, font} from '../theme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../App';
import {mvs} from 'react-native-size-matters';

const {width, height} = Dimensions.get('screen');

type OtpProps = NativeStackScreenProps<RootStackParams, 'Otp'>;

export const Otp: FC<OtpProps> = ({navigation, route}: OtpProps) => {
  const timer = 12;

  const handleOtpBack = () => {
    navigation.goBack();
  };
  const handleOnPressSignIn = () => {
    navigation.navigate('Login');
  };

  const children = () => {
    return (
      <>
        <View style={styles.otpTitleContainer}>
          <Text style={styles.titleStyle}>{route.params.title}</Text>
          <Gap height={8} />
          <Text style={styles.descStyle}>{route.params.subtitle}</Text>
        </View>

        <Gap height={16} />
        <SsuOTPInput
          type={'default'}
          hideIcon
          onCodeChanged={code => console.log(code)}
          onCodeFilled={(result, code) => {
            if (result) {
              console.log(code);
            }
          }}
        />
        {/* <Gap height={24} /> */}
        <SsuOTPTimer action={() => {}} timer={timer} />
        <Gap height={4} />
        <Button
          type="border"
          label="Back"
          borderColor="transparent"
          textStyles={{fontSize: normalize(14), color: color.Pink.linear}}
          containerStyles={{width: '100%'}}
          onPress={handleOtpBack}
        />
        <Gap height={30} />
        <Text style={styles.forgotPassStyle}>
          Already have an Account?{' '}
          <Text
            onPress={() => handleOnPressSignIn()}
            style={{
              fontFamily: font.InterRegular,
              fontWeight: '700',
              fontSize: normalize(12),
              lineHeight: mvs(16),
            }}>
            Sign In
          </Text>
        </Text>
      </>
    );
  };

  return (
    <View style={styles.root}>
      <Image
        source={require('../assets/background/signin-guest.png')}
        style={styles.image}
      />
      <SsuSheet children={children()} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    height: height,
    width: width,
    resizeMode: 'cover',
  },
  titleStyle: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: normalize(20),
    lineHeight: mvs(32),
    color: color.Neutral[10],
  },
  descStyle: {
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(12),
    lineHeight: mvs(14.5),
    color: color.Neutral[10],
    maxWidth: '100%',
  },
  forgotPassStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(12),
    lineHeight: mvs(12),
  },
  otpTitleContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
