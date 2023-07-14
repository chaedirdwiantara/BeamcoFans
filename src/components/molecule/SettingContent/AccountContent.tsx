import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, InteractionManager} from 'react-native';
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import DatePicker from 'react-native-date-picker';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ErrorIcon,
  TickCircleIcon,
} from '../../../assets/icon';
import {Dropdown} from '../DropDown';
import Color from '../../../theme/Color';
import {TopNavigation} from '../TopNavigation';
import {font, typography} from '../../../theme';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {dataProps} from '../DropDown/DropdownMulti';
import {MenuText} from '../../atom/MenuText/MenuText';
import {DataDropDownType} from '../../../data/dropdown';
import {dataGender} from '../../../data/Settings/account';
import {dateFormatBirth} from '../../../utils/date-format';
import {Button, Gap, SsuInput, SsuToast} from '../../atom';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import {formatValueName} from '../../../utils/formatValueName';
import {PreferenceList} from '../../../interface/setting.interface';
import {ListCountryType} from '../../../interface/location.interface';
import {profileStorage, storage} from '../../../hooks/use-storage.hook';
import {ProfileResponseType} from '../../../interface/profile.interface';

interface AccountProps {
  profile: ProfileResponseType;
  onPressGoBack: () => void;
  dataAllCountry: ListCountryType[];
  moods: PreferenceList[];
  genres: PreferenceList[];
  dataCitiesOfCountry: DataDropDownType[];
  setSelectedCountry: (value: number) => void;
  fromScreen: string;
}

interface InputProps {
  username: string;
  fullname: string;
  gender: string;
  locationCountry: number;
  locationCity: string;
}

const validation = yup.object({
  username: yup
    .string()
    .required('Username can not be blank, set a username')
    .matches(
      /^.{2,29}[a-z0-9]$/,
      'Username should be between 3 to 30 alphanumeric characters',
    ),
  fullname: yup
    .string()
    .strict(true)
    .trim('Full name cannot include leading and trailing spaces')
    .matches(/^.{3,50}$/, 'Fullname allowed 3 to 50 character'),
  gender: yup.string(),
  locationCountry: yup.number(),
  locationCity: yup.string(),
});

export const AccountContent: React.FC<AccountProps> = ({
  profile,
  onPressGoBack,
  dataAllCountry,
  genres,
  moods,
  dataCitiesOfCountry,
  setSelectedCountry,
  fromScreen,
}) => {
  const {t} = useTranslation();
  const [changes, setChanges] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [valueMoods, setValueMoods] = useState<number[]>([]);
  const [valueGenres, setValueGenres] = useState<number[]>([]);
  const [birthdate, setBirthDate] = useState<string>('');
  const [openPickerBirth, setOpenPickerBirth] = useState<boolean>(false);
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
      locationCountry: profile?.data.locationCountry?.id || 0,
      locationCity: profile?.data.locationCity || '',
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
      setBirthDate(profile.data.birthdate);
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
        locationCity: getValues('locationCity'),
        birthdate,
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
    if (
      isValid &&
      valueGenres.length > 0 &&
      getValues('locationCountry') &&
      getValues('locationCity') &&
      birthdate !== ''
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidating, isValid, valueGenres]);

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
              editable={fromScreen !== 'progress'}
              inputStyles={{
                color: fromScreen !== 'progress' ? '#fff' : 'gray',
              }}
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
              editable={fromScreen !== 'progress'}
              inputStyles={{
                color: fromScreen !== 'progress' ? '#fff' : 'gray',
              }}
            />
          )}
        />

        <View style={styles.containerBirth}>
          <Text style={[typography.Overline, {color: Color.Neutral[50]}]}>
            {t('Setting.Account.Label.DateOfBirth')}
          </Text>
          {fromScreen === 'progress' && (
            <Text style={[typography.Overline, {color: Color.Pink[200]}]}>
              {' *' + t('General.Required')}
            </Text>
          )}
        </View>
        <MenuText.RightIcon
          text={birthdate === '' ? 'YYYY-MM-DD' : birthdate}
          containerStyles={{marginTop: mvs(10), marginLeft: ms(4)}}
          icon={
            <ChevronDownIcon
              stroke="#7c7b7c"
              style={{
                width: widthPercentage(15),
                height: widthPercentage(15),
                marginRight: ms(10),
              }}
            />
          }
          onPress={() => setOpenPickerBirth(true)}
          onPressTooltip={() => setOpenPickerBirth(true)}
        />

        <DatePicker
          modal
          open={openPickerBirth}
          date={birthdate === '' ? new Date() : new Date(birthdate)}
          mode="date"
          theme="dark"
          textColor={Color.Pink[200]}
          onConfirm={date => {
            setOpenPickerBirth(false);
            setBirthDate(dateFormatBirth(date));
          }}
          onCancel={() => {
            setOpenPickerBirth(false);
          }}
        />

        <Controller
          name="gender"
          control={control}
          render={({field: {onChange, value}}) => (
            <Dropdown.Input
              initialValue={value}
              data={dataGender}
              isRequired={true && fromScreen === 'progress'}
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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: heightPercentage(4),
          }}>
          <Controller
            name="locationCountry"
            control={control}
            render={({field: {onChange, value}}) => (
              <Dropdown.Input
                type="location"
                isRequired={true && fromScreen === 'progress'}
                initialValue={value}
                data={dataAllCountry}
                placeHolder={t('Setting.Shipping.Placeholder.Country') || ''}
                dropdownLabel={t('Setting.Account.Label.Location') || ''}
                textTyped={(newText: {label: string; value: number}) => {
                  onChange(newText.value);
                  setSelectedCountry(newText.value);
                  setChanges(true);
                }}
                containerStyles={{
                  marginTop: heightPercentage(16),
                  width: '49%',
                }}
                isError={errors?.locationCountry ? true : false}
                errorMsg={errors?.locationCountry?.message}
              />
            )}
          />

          <Controller
            name="locationCity"
            control={control}
            render={({field: {onChange, value}}) => (
              <Dropdown.Input
                initialValue={value}
                data={dataCitiesOfCountry}
                showSearch={true}
                placeHolder={t('Setting.Shipping.Placeholder.City') || ''}
                dropdownLabel={''}
                textTyped={(newText: {label: string; value: string}) => {
                  onChange(newText.value);
                  setChanges(true);
                }}
                containerStyles={{
                  marginTop: heightPercentage(15),
                  width: '49%',
                }}
                isError={errors?.locationCity ? true : false}
                errorMsg={errors?.locationCity?.message}
              />
            )}
          />
        </View>

        <Dropdown.Multi
          data={formatValueName(genres) ?? []}
          placeHolder={t('Setting.Preference.Placeholder.Genre')}
          dropdownLabel={t('Setting.Preference.Label.Genre')}
          textTyped={(_newText: string) => null}
          containerStyles={{marginTop: heightPercentage(15)}}
          initialValue={valueGenres}
          isRequired={true && fromScreen === 'progress'}
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
  containerBirth: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPercentage(15),
  },
  titleBirthDate: {
    color: Color.Error[400],
    fontFamily: font.InterRegular,
    fontSize: normalize(10),
    lineHeight: mvs(12),
  },
});
