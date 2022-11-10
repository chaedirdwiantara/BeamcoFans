import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {SsuInput} from '../components/atom';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useAuthHook} from '../hooks/use-auth.hook';
import {RegistrationType} from '../interface/profile.interface';

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

export const SignupScreen: React.FC = () => {
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

  return (
    <View style={styles.root}>
      <Text>Signup screen</Text>
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
      </TouchableOpacity>
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
});
