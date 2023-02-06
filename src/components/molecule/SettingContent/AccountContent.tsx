import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {ms, mvs} from 'react-native-size-matters';
import {yupResolver} from '@hookform/resolvers/yup';

import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {Dropdown} from '../DropDown';
import Color from '../../../theme/Color';
import {TopNavigation} from '../TopNavigation';
import {font, typography} from '../../../theme';
import {Button, Gap, SsuInput, SsuToast} from '../../atom';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import {dataGender, dataLocation} from '../../../data/Settings/account';
import {ProfileResponseType} from '../../../interface/profile.interface';
import {ArrowLeftIcon, ErrorIcon, TickCircleIcon} from '../../../assets/icon';

interface AccountProps {
  profile: ProfileResponseType;
  onPressGoBack: () => void;
}

interface InputProps {
  username: string;
  fullname: string;
  gender: string;
  locationCountry: string;
}

const validation = yup.object({
  username: yup
    .string()
    .required('Username can not be blank, set a username')
    .matches(
      /^.{4,9}[a-z0-9]$/,
      'Username should be between 5 to 10 alphanumeric characters',
    ),
  fullname: yup
    .string()
    .required('Full Name can not be blank, please input your Full Name')
    .matches(/^.{3,21}$/, 'Full Name should be between 3 to 21 characters'),
  gender: yup.string(),
  locationCountry: yup.string(),
});

export const AccountContent: React.FC<AccountProps> = ({
  profile,
  onPressGoBack,
}) => {
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const {updateProfilePreference, isError, isLoading, errorMsg, setIsError} =
    useProfileHook();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid, isValidating},
    getValues,
  } = useForm<InputProps>({
    resolver: yupResolver(validation),
    mode: 'onChange',
    defaultValues: {
      username: profile?.data.username || '',
      fullname: profile?.data.fullname || '',
      gender: profile?.data.gender || '',
      locationCountry: profile?.data.locationCountry || '',
    },
  });

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  useEffect(() => {
    if (isValid) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidating, isValid]);

  const onPressSave = async () => {
    await updateProfilePreference({
      username: getValues('username'),
      fullname: getValues('fullname'),
      gender: getValues('gender'),
      locationCountry: getValues('locationCountry'),
    });

    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit) {
      if (!isError && !isLoading) {
        setToastVisible(true);
      }
      setIsSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title="Account"
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{marginBottom: heightPercentage(15)}}
      />

      <Controller
        name="username"
        control={control}
        render={({field: {onChange, value}}) => (
          <SsuInput.InputLabel
            label="Username"
            value={value}
            onChangeText={text => {
              onChange(text.toLowerCase());
              setIsError(false);
            }}
            placeholder={'Add Username'}
            isError={errors?.username ? true : false}
            errorMsg={errors?.username?.message}
            containerStyles={{marginTop: heightPercentage(15)}}
          />
        )}
      />

      <Controller
        name="fullname"
        control={control}
        render={({field: {onChange, value}}) => (
          <SsuInput.InputLabel
            label="Full Name"
            value={value}
            onChangeText={text => {
              onChange(text);
              setIsError(false);
            }}
            placeholder={'Add Full Name'}
            isError={errors?.fullname ? true : false}
            errorMsg={errors?.fullname?.message}
            containerStyles={{marginTop: heightPercentage(15)}}
          />
        )}
      />

      <Controller
        name="gender"
        control={control}
        render={({field: {onChange, value}}) => (
          <Dropdown.Input
            initialValue={value}
            data={dataGender}
            placeHolder={'Select Gender'}
            dropdownLabel={'Gender'}
            textTyped={(newText: {label: string; value: string}) =>
              onChange(newText.value)
            }
            containerStyles={{marginTop: heightPercentage(15)}}
            isError={errors?.gender ? true : false}
            errorMsg={errors?.gender?.message}
          />
        )}
      />

      <Controller
        name="locationCountry"
        control={control}
        render={({field: {onChange, value}}) => (
          <Dropdown.Input
            initialValue={value}
            data={dataLocation}
            placeHolder={'Search Country'}
            dropdownLabel={'Location'}
            textTyped={(newText: {label: string; value: string}) =>
              onChange(newText.value)
            }
            containerStyles={{marginTop: heightPercentage(15)}}
            isError={errors?.locationCountry ? true : false}
            errorMsg={errors?.locationCountry?.message}
          />
        )}
      />

      {isError ? (
        <View style={styles.containerErrorMsg}>
          <ErrorIcon fill={Color.Error[400]} />
          <Gap width={ms(4)} />
          <Text style={styles.errorMsg}>{errorMsg}</Text>
        </View>
      ) : null}

      <Button
        label="SAVE"
        onPress={handleSubmit(onPressSave)}
        containerStyles={disabledButton ? styles.buttonDisabled : styles.button}
        disabled={disabledButton}
      />

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <TickCircleIcon
              width={widthResponsive(21)}
              height={heightPercentage(20)}
              stroke={Color.Neutral[10]}
            />
            <Gap width={widthResponsive(7)} />
            <Text
              style={[
                typography.Button2,
                {
                  color: Color.Neutral[10],
                },
              ]}>
              Your account have been updated!
            </Text>
          </View>
        }
        modalStyle={{marginHorizontal: widthResponsive(24)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    paddingHorizontal: widthPercentage(12),
  },
  button: {
    width: width * 0.9,
    aspectRatio: widthPercentage(327 / 36),
    marginTop: heightPercentage(25),
    alignSelf: 'center',
    backgroundColor: Color.Pink[200],
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: Color.Success[400],
    paddingHorizontal: widthResponsive(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  containerErrorMsg: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: mvs(4),
    alignItems: 'center',
  },
  errorMsg: {
    color: Color.Error[400],
    fontFamily: font.InterRegular,
    fontSize: normalize(10),
    lineHeight: mvs(12),
    maxWidth: '90%',
  },
  buttonDisabled: {
    width: '100%',
    aspectRatio: widthPercentage(327 / 36),
    marginTop: heightPercentage(25),
    alignSelf: 'center',
    backgroundColor: Color.Dark[50],
  },
});
