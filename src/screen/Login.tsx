import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
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
import {normalize} from '../utils';
import {ms, mvs} from 'react-native-size-matters';
import {Button, Dropdown, Gap, SsuDivider, SsuInput} from '../components';
import {LockIcon, UserIcon} from '../assets/icon';
import {countryData} from '../data/dropdown';
import {AppleLogo, FacebookLogo, GoogleLogo, SSULogo} from '../assets/logo';

const {width, height} = Dimensions.get('screen');

interface LoginInput {
  user: string;
  password: string;
}

const loginValidation = yup.object({
  user: yup.string().required('This field is required'),
  password: yup.string().required('This field is required'),
});

export const LoginScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {onLoginUser, isLoading, isError, loginResult, errorMsg} =
    useAuthHook();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<LoginInput>({
    resolver: yupResolver(loginValidation),
    defaultValues: {
      user: '',
      password: '',
    },
  });

  const [focusInput, setFocusInput] = useState<'email' | 'phone' | null>(null);

  const handleOnLogin: SubmitHandler<LoginInput> = data => {
    onLoginUser({
      user: data.user,
      password: data.password,
    });
  };

  useEffect(() => {
    if (!isLoading && !isError && loginResult !== null) {
      navigation.replace('Preference');
    } else if (!isLoading && isError) {
      setError('password', {
        type: 'value',
        message: errorMsg,
      });
    }
  }, [isLoading, isError, loginResult]);

  const handleOnPressBack = () => {
    if (focusInput === null) {
      navigation.goBack();
    } else {
      handleFocusInput(null);
    }
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

  const handleFocusInput = (focus: 'email' | 'phone' | null) => {
    setFocusInput(focus);
  };

  const children = () => {
    return (
      <>
        <Text style={styles.titleStyle}>Sign In</Text>
        <Gap height={20} />
        {(focusInput === 'email' || focusInput === null) && (
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
                  isError={errors?.user ? true : false}
                  errorMsg={errors?.user?.message}
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
                />
              )}
            />
            <Gap height={12} />
          </View>
        )}
        {focusInput === null && <SsuDivider text={'Or'} />}
        {(focusInput === 'phone' || focusInput === null) && (
          <View>
            <Gap height={8} />
            <Dropdown.Country
              countryData={countryData}
              numberTyped={resultData}
              onFocus={() => handleFocusInput('phone')}
            />
          </View>
        )}
        <Gap height={20} />
        <Button
          label="Submit"
          textStyles={{fontSize: normalize(14)}}
          containerStyles={{width: '100%'}}
          onPress={handleSubmit(handleOnLogin)}
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
        <SsuDivider text={'Or'} />
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
          Dont Have an Account?{' '}
          <Text
            onPress={() => handleOnPressSignUp()}
            style={{
              fontFamily: font.InterRegular,
              fontWeight: '700',
              fontSize: normalize(12),
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
        {Platform.OS === 'ios' ? (
          <>
            <Text style={styles.titleStyle}>Begin Today</Text>
            <Gap height={12} />
            <Text style={styles.descStyle}>
              Sign in or Register to explore full features and support the
              musician
            </Text>
            <Gap height={30} />
          </>
        ) : (
          <Gap height={35} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <Image
        source={require('../assets/background/signin-guest.png')}
        style={styles.image}
      />

      <SsuSheet children={children()} topChild={topChild()} />
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
    textAlign: 'center',
    color: color.Neutral[10],
  },
  forgotPassStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(12),
  },
  descStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: normalize(12),
    maxWidth: '80%',
    textAlign: 'center',
  },
});
