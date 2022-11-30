import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {Button, Gap, SsuDivider, SsuInput} from '../components/atom';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useAuthHook} from '../hooks/use-auth.hook';
import {RegistrationType} from '../interface/profile.interface';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../App';
import {
  CheckCircleIcon,
  EmailIcon,
  FullNameIcon,
  LockIcon,
  UserIcon,
} from '../assets/icon';
import {color, font} from '../theme';
import {Dropdown, SsuStatusBar, TermAndConditions} from '../components';
import {countryData} from '../data/dropdown';
import {heightPercentage, normalize, widthPercentage} from '../utils';
import {AppleLogo, FacebookLogo, GoogleLogo} from '../assets/logo';
import {ms, mvs} from 'react-native-size-matters';
import ErrorCircleIcon from '../assets/icon/ErrorCircle.icon';
import {ModalLoading} from '../components/molecule/ModalLoading/ModalLoading';

interface RegisterInput {
  fullname: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  image: string;
  registrationType: RegistrationType;
  termsCondition: boolean;
}

const registerValidation = yup.object({
  registrationType: yup.string(),
  fullname: yup
    .string()
    .required('This field is required')
    .matches(/^.{3,21}$/, 'Fullname allowed 3 to 21 character'),
  email: yup.string().when('registrationType', {
    is: (val: RegistrationType) => val === 'email',
    then: yup
      .string()
      .required('This field is required')
      .email('Please use valid email'),
  }),
  username: yup
    .string()
    .required('This field is required')
    .matches(/^[a-z]{5,10}/, 'Only allowed 5 to 10 char lowercase'),
  image: yup.string().when('registrationType', {
    is: (val: RegistrationType) => val !== 'email',
    then: yup.string().required('Image not found'),
  }),
  password: yup
    .string()
    .required('This field is required')
    .matches(/^.{8,40}$/, 'Password should be between 8 to 40 characters'),
  confirmPassword: yup
    .string()
    .required('Field is required')
    .oneOf([yup.ref('password'), null], `Password didn't match`),
  termsCondition: yup.bool().oneOf([true], 'Please agree before continue.'),
});

const {width, height} = Dimensions.get('screen');

export const SignupScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    isLoading,
    isError,
    authResult,
    errorMsg,
    isValidUsername,
    onRegisterUser,
    checkUsernameAvailability,
  } = useAuthHook();
  const [focusInput, setFocusInput] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    setValue,
    watch,
  } = useForm<RegisterInput>({
    resolver: yupResolver(registerValidation),
    mode: 'onChange',
    defaultValues: {
      fullname: '',
      username: '',
      password: '',
      confirmPassword: '',
      registrationType: 'email',
      termsCondition: false,
    },
  });

  const handleRegisterUser: SubmitHandler<RegisterInput> = data => {
    if (isValidUsername === true) {
      onRegisterUser({
        fullname: data.fullname,
        username: data.username.toLowerCase(),
        password: data.password,
        registrationType: data.registrationType,
        email: data.email,
      });
    } else {
      setError('username', {
        type: 'value',
        message: errorMsg,
      });
    }
  };

  useEffect(() => {
    if (!isLoading && !isError && authResult !== null) {
      navigation.replace('Otp', {
        id: watch('email'),
        type: 'email',
        title: 'Email Verification Code',
        subtitle: `We have sent you six digits verification code on address ${watch(
          'email',
        )} check your inbox and enter verification code here`,
      });
    } else if (!isLoading && isError && isValidUsername !== null) {
      setError('termsCondition', {
        type: 'value',
        message: errorMsg,
      });
    }
  }, [isLoading, isError, authResult, isValidUsername]);

  useEffect(() => {
    if (
      isValidUsername === false &&
      watch('username').length > 0 &&
      isError &&
      errorMsg !== ''
    ) {
      setError('username', {
        type: 'value',
        message: errorMsg,
      });
    }
  }, [isValidUsername, watch('username'), isError, errorMsg]);

  const handleOnPressBack = () => {
    navigation.goBack();
  };

  const handleOnPressSignIn = () => {
    navigation.navigate('Login');
  };

  const handleChangeLoginType = (loginType: RegistrationType) => {
    setValue('registrationType', loginType);
    handleFocusInput(null);
  };

  const handleFocusInput = (focus: string | null) => {
    setFocusInput(focus);
  };

  const resultData = (dataResult: any) => {
    console.log(dataResult, 'dataResult Select Country');
  };

  return (
    <View style={styles.root}>
      <SsuStatusBar type="black" />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text style={styles.titleStyle}>Sign Up</Text>
        <Gap height={24} />
        <View style={styles.wrapperLoginType}>
          <Text
            style={
              watch('registrationType') === 'email'
                ? styles.loginTypeActive
                : styles.loginTypeInactive
            }
            onPress={() => handleChangeLoginType('email')}>
            Email
          </Text>
          <View style={styles.verticalSeparatorLoginType} />
          <Text
            style={
              watch('registrationType') === 'phone'
                ? styles.loginTypeActive
                : styles.loginTypeInactive
            }
            onPress={() => handleChangeLoginType('phone')}>
            Phone Number
          </Text>
        </View>
        <Gap height={16} />
        {watch('registrationType') === 'email' ? (
          <Controller
            name="email"
            control={control}
            render={({field: {onChange, value}}) => (
              <SsuInput.InputText
                value={value}
                onChangeText={onChange}
                placeholder={'Email'}
                leftIcon={<EmailIcon stroke={color.Dark[50]} />}
                onFocus={() => handleFocusInput('email')}
                onBlur={() => {
                  handleFocusInput(null);
                }}
                isError={errors?.email ? true : false}
                errorMsg={errors?.email?.message}
                isFocus={focusInput === 'email'}
              />
            )}
          />
        ) : (
          <Dropdown.Country
            countryData={countryData}
            numberTyped={resultData}
            onFocus={() => handleFocusInput('phone')}
          />
        )}
        <Gap height={8} />
        <Controller
          name="fullname"
          control={control}
          render={({field: {onChange, value}}) => (
            <SsuInput.InputText
              value={value}
              onChangeText={onChange}
              placeholder={'Full Name'}
              leftIcon={
                <FullNameIcon
                  stroke={color.Dark[50]}
                  style={{marginLeft: ms(-2), marginRight: ms(-3)}}
                />
              }
              onFocus={() => {
                handleFocusInput('fullname');
              }}
              onBlur={() => {
                handleFocusInput(null);
              }}
              isError={errors?.fullname ? true : false}
              errorMsg={errors?.fullname?.message}
              isFocus={focusInput === 'fullname'}
            />
          )}
        />
        <Gap height={8} />
        <Controller
          name="username"
          control={control}
          render={({field: {onChange, value}}) => (
            <SsuInput.InputText
              value={value}
              onChangeText={onChange}
              placeholder={'Username'}
              leftIcon={
                <UserIcon
                  stroke={color.Dark[50]}
                  style={{marginLeft: ms(-1), marginRight: ms(-4)}}
                />
              }
              onFocus={() => {
                handleFocusInput('username');
              }}
              onBlur={() => {
                handleFocusInput(null);
                if (value.length >= 5 && value.length <= 10) {
                  checkUsernameAvailability(value);
                }
              }}
              rightIcon={isValidUsername !== null}
              rightIconComponent={
                isValidUsername === true ? (
                  <CheckCircleIcon />
                ) : isValidUsername === false ? (
                  <ErrorCircleIcon />
                ) : null
              }
              isError={errors?.username ? true : false}
              errorMsg={errors?.username?.message}
              isFocus={focusInput === 'username'}
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
              onFocus={() => {
                handleFocusInput('password');
              }}
              onBlur={() => {
                handleFocusInput(null);
              }}
              isError={errors?.password ? true : false}
              errorMsg={errors?.password?.message}
              isFocus={focusInput === 'password'}
            />
          )}
        />
        <Gap height={8} />
        <Controller
          name="confirmPassword"
          control={control}
          render={({field: {onChange, value}}) => (
            <SsuInput.InputText
              value={value}
              onChangeText={onChange}
              placeholder={'Repeat'}
              leftIcon={<LockIcon stroke={color.Dark[50]} />}
              password
              onFocus={() => {
                handleFocusInput('confirmPassword');
              }}
              onBlur={() => {
                handleFocusInput(null);
              }}
              isError={errors?.confirmPassword ? true : false}
              errorMsg={errors?.confirmPassword?.message}
              isFocus={focusInput === 'confirmPassword'}
            />
          )}
        />

        <Gap height={14} />
        <Controller
          name="termsCondition"
          control={control}
          render={({field: {onChange, value}}) => (
            <TermAndConditions
              handleOnPress={() => onChange(!value)}
              active={value}
              errorMsg={errors?.termsCondition?.message}
            />
          )}
        />
        <Gap height={20} />
        <Button
          label="Submit"
          textStyles={{fontSize: normalize(14)}}
          containerStyles={{width: '100%'}}
          onPress={handleSubmit(handleRegisterUser)}
        />
        <Gap height={4} />
        <Button
          type="border"
          label="Back"
          borderColor="transparent"
          textStyles={{fontSize: normalize(14), color: color.Pink.linear}}
          containerStyles={{width: '100%'}}
          onPress={handleOnPressBack}
        />
        <Gap height={8} />
        <SsuDivider text={'or signup with'} />
        <Gap height={14} />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <GoogleLogo />
          <Gap width={24} />
          <FacebookLogo />
          <Gap width={24} />
          <AppleLogo />
        </View>
        <Gap height={24} />
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
      </KeyboardAvoidingView>
      <ModalLoading visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: color.Dark[800],
    paddingHorizontal: widthPercentage(48),
    paddingTop: heightPercentage(32),
    paddingBottom: heightPercentage(24),
  },
  container: {
    width: '100%',
    height: 100,
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
    textAlign: 'center',
    color: color.Neutral[10],
    marginTop: ms(64),
  },
  wrapperLoginType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-start',
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
    fontSize: normalize(12),
    color: color.Pink[2],
    lineHeight: mvs(14),
    fontWeight: '500',
  },
  loginTypeInactive: {
    fontFamily: font.InterRegular,
    fontSize: normalize(12),
    color: color.Neutral[10],
    lineHeight: mvs(14),
    fontWeight: '400',
  },
  forgotPassStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(12),
  },
});
