import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, InteractionManager} from 'react-native';
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {Controller, useForm} from 'react-hook-form';
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
import {ModalConfirm} from '../Modal/ModalConfirm';
import {dataProps} from '../DropDown/DropdownMulti';
import {DataDropDownType} from '../../../data/dropdown';
import {dataGender} from '../../../data/Settings/account';
import {Button, Gap, SsuInput, SsuToast} from '../../atom';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import {formatValueName} from '../../../utils/formatValueName';
import {PreferenceList} from '../../../interface/setting.interface';
import {profileStorage, storage} from '../../../hooks/use-storage.hook';
import {ProfileResponseType} from '../../../interface/profile.interface';
import {ArrowLeftIcon, ErrorIcon, TickCircleIcon} from '../../../assets/icon';

interface AccountProps {
  profile: ProfileResponseType;
  onPressGoBack: () => void;
  dataAllCountry: DataDropDownType[];
  moods: PreferenceList[];
  genres: PreferenceList[];
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
      // /^.{4,9}[a-z0-9]$/,
      // 'Username should be between 5 to 10 alphanumeric characters',
      /^.{2,29}[a-z0-9]$/,
      'Username should be between 3 to 30 alphanumeric characters',
    ),
  fullname: yup
    .string()
    .strict(true)
    .trim('Full name cannot include leading and trailing spaces')
    .matches(/^.{3,50}$/, 'Fullname allowed 3 to 50 character'),
  gender: yup.string(),
  locationCountry: yup.string(),
});

export const AccountContent: React.FC<AccountProps> = ({
  profile,
  onPressGoBack,
  dataAllCountry,
  genres,
  moods,
}) => {
  const {t} = useTranslation();
  const [changes, setChanges] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [valueMoods, setValueMoods] = useState<(number | undefined)[]>([]);
  const [valueGenres, setValueGenres] = useState<(number | undefined)[]>([]);
  const {updateProfilePreference, isError, isLoading, errorMsg, setIsError} =
    useProfileHook();

  const {
    control,
    formState: {errors, isValid, isValidating},
    getValues,
    setError,
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

  const getValue = (data: dataProps[]) => {
    if (data) {
      return data?.map((item: dataProps) => {
        return item['value'];
      });
    } else {
      return [];
    }
  };

  useEffect(() => {
    if (profile) {
      const md = getValue(formatValueName(profile.data?.moods));
      const gr = getValue(formatValueName(profile.data?.favoriteGenres));
      setValueMoods(md);
      setValueGenres(gr);
    }
  }, [profile]);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  const onPressSave = () => {
    changes ? setShowModal(true) : onPressConfirm();
  };

  const onPressConfirm = async () => {
    setShowModal(false);
    try {
      await updateProfilePreference({
        username: getValues('username'),
        fullname: getValues('fullname'),
        gender: getValues('gender'),
        locationCountry: getValues('locationCountry'),
        moods: valueMoods as number[],
        favoriteGeneres: valueGenres as number[],
      });
      storage.set(
        'profile',
        JSON.stringify({...profileStorage(), fullname: getValues('fullname')}),
      );
      storage.set('fetchingProfile', true);
      setIsSubmit(true);
      setChanges(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSubmit) {
      if (!isError && !isLoading) {
        InteractionManager.runAfterInteractions(() => setToastVisible(true));
      }
      setIsSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

  useEffect(() => {
    if (isValid && valueMoods.length > 0 && valueGenres.length > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidating, isValid, valueMoods, valueGenres]);

  useEffect(() => {
    if (getValues('username').length < 3 || getValues('username').length > 30) {
      setError('username', {
        type: 'value',
        message: 'Username should be between 3 to 30 alphanumeric characters',
      });
    }
  }, []);

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.Account.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{
          marginBottom: heightPercentage(10),
          paddingHorizontal: widthResponsive(15),
        }}
      />

      <View
        style={{
          paddingHorizontal: widthResponsive(20),
        }}>
        <Controller
          name="username"
          control={control}
          render={({field: {onChange, value}}) => (
            <SsuInput.InputLabel
              label={t('Setting.Account.Label.Username') || ''}
              value={value}
              onChangeText={text => {
                onChange(text.toLowerCase());
                setIsError(false);
                setChanges(true);
              }}
              placeholder={t('Setting.Account.Placeholder.Username') || ''}
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
              label={t('Setting.Account.Label.Fullname') || ''}
              value={value}
              onChangeText={text => {
                onChange(text);
                setIsError(false);
                setChanges(true);
              }}
              placeholder={t('Setting.Account.Placeholder.Fullname') || ''}
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
              placeHolder={t('Setting.Account.Placeholder.Gender')}
              dropdownLabel={t('Setting.Account.Label.Gender')}
              textTyped={(newText: {label: string; value: string}) => {
                onChange(newText.value);
                setChanges(true);
              }}
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
              type="location"
              initialValue={value}
              data={dataAllCountry}
              placeHolder={'Search Country'}
              dropdownLabel={t('Setting.Account.Label.Location')}
              textTyped={(newText: {label: string; value: string}) => {
                onChange(newText.value);
                setChanges(true);
              }}
              containerStyles={{marginTop: heightPercentage(15)}}
              isError={errors?.locationCountry ? true : false}
              errorMsg={errors?.locationCountry?.message}
              searchText="Search country"
            />
          )}
        />

        <Dropdown.Multi
          data={formatValueName(genres) ?? []}
          placeHolder={t('Setting.Preference.Placeholder.Genre')}
          dropdownLabel={t('Setting.Preference.Label.Genre')}
          textTyped={(_newText: string) => null}
          containerStyles={{marginTop: heightPercentage(15)}}
          initialValue={valueGenres}
          setValues={val => setValueGenres(val)}
        />

        <Dropdown.Multi
          data={formatValueName(moods) ?? []}
          placeHolder={t('Setting.Preference.Placeholder.Mood')}
          dropdownLabel={t('Setting.Preference.Label.Mood')}
          textTyped={(_newText: string) => null}
          containerStyles={{marginTop: heightPercentage(15)}}
          initialValue={valueMoods}
          setValues={val => setValueMoods(val)}
        />

        {isError ? (
          <View style={styles.containerErrorMsg}>
            <ErrorIcon fill={Color.Error[400]} />
            <Gap width={ms(4)} />
            <Text style={styles.errorMsg}>{errorMsg}</Text>
          </View>
        ) : null}

        <Button
          label={t('Btn.Save') || ''}
          onPress={onPressSave}
          textStyles={{fontSize: mvs(13)}}
          containerStyles={
            disabledButton ? styles.buttonDisabled : styles.button
          }
          disabled={disabledButton}
        />
      </View>

      <ModalConfirm
        modalVisible={showModal}
        title={t('Setting.Account.Title') || ''}
        subtitle="Are you sure you want to update your account?"
        onPressClose={() => setShowModal(false)}
        onPressOk={onPressConfirm}
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
  },
  button: {
    width: width * 0.9,
    aspectRatio: widthPercentage(327 / 38),
    marginTop: heightPercentage(25),
    alignSelf: 'center',
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
