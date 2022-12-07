import React, {FC, useEffect} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import SsuSheet from '../components/atom/SsuSheet';
import {Button, Gap, SsuOTPInput, SsuOTPTimer} from '../components';
import {normalize} from '../utils';
import {color, font} from '../theme';
import {RootStackParams} from '../App';
import {useAuthHook} from '../hooks/use-auth.hook';
import {ModalLoading} from '../components/molecule/ModalLoading/ModalLoading';

const {width, height} = Dimensions.get('screen');

type OtpProps = NativeStackScreenProps<RootStackParams, 'Otp'>;

export const Otp: FC<OtpProps> = ({navigation, route}: OtpProps) => {
  const timer = 12;
  const {
    isError,
    errorMsg,
    isOtpValid,
    isLoading,
    loginResult,
    confirmEmailOtp,
    confirmSmsOtp,
    sendOtpEmail,
    sendOtpSms,
  } = useAuthHook();

  useEffect(() => {
    if (!isLoading && !isError && isOtpValid === true) {
      if (loginResult === 'preference') {
        navigation.replace('Preference');
      } else if (loginResult === 'home') {
        navigation.replace('MainTab');
      }
    } else if (!isLoading && isError && errorMsg !== '') {
      // TODO: display error message
    }
  }, [isError, errorMsg, isOtpValid, isLoading, loginResult]);

  const handleBack = () => {
    navigation.goBack();
  };

  const onCodeComplete = (code: string) => {
    if (route.params.type === 'email') {
      confirmEmailOtp(route.params.id, code);
    } else if (route.params.type === 'phoneNumber') {
      confirmSmsOtp(route.params.id, code);
    }
  };

  const onResendOTP = () => {
    if (route.params.type === 'email') {
      sendOtpEmail(route.params.id);
    } else if (route.params.type === 'phoneNumber') {
      sendOtpSms(route.params.id);
    }
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
          type={isError ? 'error' : 'default'}
          hideIcon
          onCodeFilled={(result, code) => {
            if (result) {
              onCodeComplete(code);
            }
          }}
        />
        {/* TODO: move out the props for success or error when resend otp */}
        <SsuOTPTimer action={onResendOTP} timer={timer} />
        <Gap height={4} />
        <Button
          type="border"
          label="Back"
          borderColor="transparent"
          textStyles={{fontSize: normalize(14), color: color.Pink.linear}}
          containerStyles={{width: '100%'}}
          onPress={handleBack}
        />
        <Gap height={30} />
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
      <ModalLoading visible={isLoading} />
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
