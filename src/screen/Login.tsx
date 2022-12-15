import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useAuthHook} from '../hooks/use-auth.hook';
import {RootStackParams} from '../App';
import SsuSheet from '../components/atom/SsuSheet';
import {color, font} from '../theme';
import {ms, mvs} from 'react-native-size-matters';
import {Button, Dropdown, Gap, SsuDivider, SsuInput} from '../components';
import {LockIcon, UserIcon} from '../assets/icon';
import {countryData} from '../data/dropdown';
import {AppleLogo, FacebookLogo, GoogleLogo, SSULogo} from '../assets/logo';
import type {RegistrationType} from '../interface/profile.interface';
import {ModalLoading} from '../components/molecule/ModalLoading/ModalLoading';
import {storage} from '../hooks/use-storage.hook';
import {heightResponsive} from '../utils';

const {width, height} = Dimensions.get('screen');

interface LoginInput {
  user: string;
  password: string;
  phone: string;
}

const loginValidation = yup.object({
  user: yup.string().required('This field is required'),
  password: yup.string().required('This field is required'),
  phone: yup.string().when('registrationType', {
    is: (val: RegistrationType) => val === 'phone',
    then: yup
      .string()
      .required('This field is required')
      .matches(/^[0-9]{0,15}$/, 'Only allowed 15 numerical characters'),
  }),
});

export const LoginScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {
    onLoginUser,
    onLoginGoogle,
    onLoginFacebook,
    onLoginApple,
    isLoading,
    isError,
    loginResult,
    errorMsg,
    errorCode,
    errorData,
  } = useAuthHook();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    reset,
  } = useForm<LoginInput>({
    resolver: yupResolver(loginValidation),
    defaultValues: {
      user: '',
      password: '',
    },
  });
  const [loginType, setLoginType] = useState<RegistrationType>('email');
  const [focusInput, setFocusInput] = useState<
    'email' | 'password' | 'phone' | null
  >(null);

  const handleOnLogin: SubmitHandler<LoginInput> = data => {
    onLoginUser({
      user: data.user,
      password: data.password,
    });
  };

  useEffect(() => {
    if (!isLoading && !isError && loginResult !== null) {
      storage.set('isLogin', true);
      if (loginResult === 'preference') {
        navigation.replace('Preference');
      } else {
        navigation.replace('MainTab');
      }
    } else if (!isLoading && isError) {
      if (errorCode === 1016) {
        navigation.navigate('Otp', {
          id: errorData,
          type: errorData.includes('@') ? 'email' : 'phoneNumber',
          title: 'Email Verification Code',
          subtitle: `We have sent you six digits verification code on address ${errorData} check your inbox and enter verification code here`,
        });
      } else {
        setError('password', {
          type: 'value',
          message: errorMsg,
        });
      }
    }
  }, [isLoading, isError, loginResult, errorCode]);

  const handleOnPressBack = () => {
    navigation.goBack();
  };

  const handleOnPressSignUp = () => {
    navigation.navigate('Signup');
  };

  const handleOnPressForgotPass = () => {
    navigation.navigate('ForgotPassword');
  };

  const resultData = (dataResult: any) => {
    // setPhoneNum(dataResult);
  };

  const handleChangeLoginType = (type: RegistrationType) => {
    setLoginType(type);
    handleFocusInput(null);
    loginType !== type ? reset() : null;
  };

  const handleFocusInput = (focus: 'email' | 'password' | 'phone' | null) => {
    setFocusInput(focus);
  };

  const children = () => {
    return (
      <>
        <Text style={styles.titleStyle}>Sign In</Text>
        <Gap height={16} />
        <View style={styles.wrapperLoginType}>
          <Text
            style={
              loginType === 'email'
                ? styles.loginTypeActive
                : styles.loginTypeInactive
            }
            onPress={() => handleChangeLoginType('email')}>
            Email
          </Text>
          <View style={styles.verticalSeparatorLoginType} />
          <Text
            style={
              loginType === 'phone'
                ? styles.loginTypeActive
                : styles.loginTypeInactive
            }
            onPress={() => handleChangeLoginType('phone')}>
            Phone Number
          </Text>
        </View>
        {loginType === 'email' && (
          <View>
            <Controller
              name="user"
              control={control}
              render={({field: {onChange, value}}) => (
                <SsuInput.InputText
                  value={value}
                  onChangeText={onChange}
                  placeholder={'Email or Username'}
                  leftIcon={
                    <UserIcon
                      stroke={color.Dark[50]}
                      style={{marginLeft: ms(-1), marginRight: ms(-5)}}
                    />
                  }
                  onFocus={() => {
                    handleFocusInput('email');
                  }}
                  onBlur={() => {
                    handleFocusInput(null);
                  }}
                  isError={errors?.user ? true : false}
                  errorMsg={errors?.user?.message}
                  isFocus={focusInput === 'email'}
                />
              )}
            />
            <Gap height={8} />
            <Controller
              name="password"
              control={control}
              render={({field: {onChange, value}}) => (
                <SsuInput.InputText
                  value={value}
                  onChangeText={onChange}
                  placeholder={'Password'}
                  leftIcon={<LockIcon stroke={color.Dark[50]} />}
                  password
                  isError={errors?.password ? true : false}
                  errorMsg={errors?.password?.message}
                  onFocus={() => {
                    handleFocusInput('password');
                  }}
                  onBlur={() => {
                    handleFocusInput(null);
                  }}
                  isFocus={focusInput === 'password'}
                />
              )}
            />
            <Gap height={12} />
          </View>
        )}
        {loginType === 'phone' && (
          <View>
            <Gap height={8} />
            <Controller
              name="phone"
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown.Country
                  value={value}
                  onChangeText={onChange}
                  countryData={countryData}
                  numberTyped={resultData}
                  onFocus={() => handleFocusInput('phone')}
                  isError={errors?.phone ? true : false}
                  errorMsg={errors?.phone?.message}
                  isFocus={focusInput === 'phone'}
                />
              )}
            />
          </View>
        )}
        <Gap height={20} />
        <Button
          label="Submit"
          textStyles={{fontSize: mvs(14)}}
          containerStyles={{width: '100%'}}
          onPress={handleSubmit(handleOnLogin)}
        />
        <Gap height={4} />
        <Button
          type="border"
          label="Back"
          borderColor="transparent"
          textStyles={{fontSize: mvs(14), color: color.Pink.linear}}
          containerStyles={{width: '100%'}}
          onPress={handleOnPressBack}
        />
        <Gap height={8} />
        <SsuDivider text={'Or'} />
        <Gap height={14} />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onLoginGoogle}>
            <GoogleLogo />
          </TouchableOpacity>
          <Gap width={24} />
          <TouchableOpacity onPress={onLoginFacebook}>
            <FacebookLogo />
          </TouchableOpacity>
          {Platform.OS === 'ios' ? <Gap width={24} /> : null}
          {Platform.OS === 'ios' ? (
            <TouchableOpacity onPress={onLoginApple}>
              <AppleLogo />
            </TouchableOpacity>
          ) : null}
        </View>
        <Gap height={24} />
        <Text style={styles.forgotPassStyle}>
          Dont Have an Account?{' '}
          <Text
            onPress={() => handleOnPressSignUp()}
            style={{
              fontFamily: font.InterRegular,
              fontWeight: '700',
              fontSize: mvs(12),
              lineHeight: mvs(16),
            }}>
            Sign Up
          </Text>
        </Text>
        <Gap height={8} />
        <Text style={styles.forgotPassStyle} onPress={handleOnPressForgotPass}>
          I forgot my Password
        </Text>
      </>
    );
  };

  const topChild = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SSULogo />
        <Text style={styles.titleStyle}>Begin Today</Text>
        <Gap height={12} />
        <Text style={styles.descStyle}>
          Sign in or Register to explore full features and support the musician
        </Text>
        {height >= 800 ? <Gap height={82} /> : <Gap height={40} />}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.root}>
        <Image
          source={require('../assets/background/signin-guest.png')}
          style={styles.image}
        />
        <SsuSheet children={children()} topChild={topChild()} />
        <ModalLoading visible={isLoading} />
      </View>
    </KeyboardAvoidingView>
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
    fontSize: mvs(20),
    textAlign: 'center',
    color: color.Neutral[10],
  },
  wrapperLoginType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: heightResponsive(16),
  },
  verticalSeparatorLoginType: {
    width: ms(1),
    height: mvs(12),
    backgroundColor: color.Dark[500],
    marginLeft: ms(12),
    marginRight: ms(12),
  },
  loginTypeActive: {
    fontFamily: font.InterMedium,
    fontSize: mvs(12),
    color: color.Pink[2],
    fontWeight: '500',
  },
  loginTypeInactive: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    color: color.Neutral[10],
    fontWeight: '400',
  },
  forgotPassStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(12),
  },
  descStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(12),
    maxWidth: '80%',
    textAlign: 'center',
  },
});
