import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {Button, Gap, SsuDivider, SsuInput} from '../components/atom';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useAuthHook} from '../hooks/use-auth.hook';
import {RegistrationType} from '../interface/profile.interface';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../App';
import SsuSheet from '../components/atom/SsuSheet';
import {EmailIcon, FullNameIcon, LockIcon, UserIcon} from '../assets/icon';
import {color, font} from '../theme';
import {Dropdown, TermAndConditions} from '../components';
import {countryData} from '../data/dropdown';
import {normalize} from '../utils';
import {AppleLogo, FacebookLogo, GoogleLogo} from '../assets/logo';
import {mvs} from 'react-native-size-matters';

interface RegisterInput {
  fullname: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  image: string;
  registrationType: RegistrationType;
}

const registerValidation = yup.object({
  fullname: yup.string().required('This field is required'),
  username: yup
    .string()
    .required('This field is required')
    .matches(/[a-z]{5,10}/, 'Only allowed 5 to 10 char lowercase'),
  registrationType: yup.string(),
  image: yup.string().when('registrationType', {
    is: (val: RegistrationType) => val !== 'email',
    then: yup.string().required('Image not found'),
  }),
  email: yup.string().required('This field is required'),
});

const {width, height} = Dimensions.get('screen');

export const SignupScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {onRegisterUser, isLoading, isError, authResult} = useAuthHook();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterInput>({
    resolver: yupResolver(registerValidation),
    defaultValues: {
      fullname: '',
      username: '',
      password: '',
      confirmPassword: '',
      registrationType: 'email',
    },
  });

  const handleRegisterUser: SubmitHandler<RegisterInput> = data => {
    onRegisterUser({
      fullname: data.fullname,
      username: data.username.toLowerCase(),
      password: data.password,
      registrationType: data.registrationType,
      email: data.email,
    });
  };

  useEffect(() => {
    if (!isLoading && !isError && authResult !== null) {
      // TODO: navigation.navigate(''); go to screen preference
    } else if (!isLoading && isError) {
      // TODO: show error message
    }
  }, [isLoading, isError, authResult]);

  const handleOnPressButton = () => {
    navigation.navigate('Preference');
  };
  const handleOnPressBack = () => {
    navigation.goBack();
  };
  const handleOnPressSignIn = () => {
    navigation.navigate('Login');
  };

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState(false);

  const resultData = (dataResult: any) => {
    console.log(dataResult, 'dataResult Select Country');
  };

  const [term, setTerm] = useState(false);
  const handleOnPressTnc = () => {
    setTerm(!term);
  };

  const children = () => {
    return (
      <>
        <Text style={styles.titleStyle}>Create Account</Text>
        <Gap height={20} />
        <SsuInput.InputText
          value={fullName}
          onChangeText={(newText: any) => setFullName(newText)}
          placeholder={'Full Name'}
          leftIcon={<FullNameIcon stroke={color.Dark[50]} />}
        />
        <Gap height={8} />
        <SsuInput.InputText
          value={email}
          onChangeText={(newText: any) => setEmail(newText)}
          placeholder={'Email'}
          leftIcon={<EmailIcon stroke={color.Dark[50]} />}
        />
        <Gap height={8} />
        <SsuInput.InputText
          value={userName}
          onChangeText={(newText: any) => setUserName(newText)}
          placeholder={'Username'}
          leftIcon={<UserIcon stroke={color.Dark[50]} />}
        />
        <Gap height={8} />
        <SsuInput.InputText
          value={password}
          onChangeText={(newText: any) => setPassword(newText)}
          placeholder={'Password'}
          isError={error}
          errorMsg={'Incorrect username or password'}
          leftIcon={<LockIcon stroke={color.Dark[50]} />}
          password
        />
        <Gap height={8} />
        <SsuInput.InputText
          value={repeat}
          onChangeText={(newText: any) => setRepeat(newText)}
          placeholder={'Repeat Password'}
          isError={error}
          errorMsg={'Incorrect username or password'}
          leftIcon={<LockIcon stroke={color.Dark[50]} />}
          password
        />
        <Gap height={12} />
        <SsuDivider text={'or'} />
        <Gap height={8} />
        <Dropdown.Country countryData={countryData} numberTyped={resultData} />
        <Gap height={14} />
        <TermAndConditions handleOnPress={handleOnPressTnc} active={term} />
        <Gap height={20} />
        <Button
          label="Submit"
          textStyles={{fontSize: normalize(14)}}
          containerStyles={{width: '100%'}}
          onPress={handleOnPressButton}
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
        <Text
          style={styles.forgotPassStyle}
          onPress={() => {
            console.log('forgot pass pressed');
          }}>
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
      {/* <Text>Signup screen</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <View style={styles.container}>
            <SsuInput.InputText
              value={value}
              onChangeText={onChange}
              errorMsg={errors.username?.message}
              isError={errors.username ? true : false}
            />
          </View>
        )}
        name="username"
      />
      <TouchableOpacity
        disabled={isLoading}
        onPress={handleSubmit(handleRegisterUser)}>
        <Text>Signup</Text>
      </TouchableOpacity> */}
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
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  forgotPassStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(12),
    lineHeight: mvs(12),
  },
});
