import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import React, {useEffect, useState} from 'react';
import {ms, mvs} from 'react-native-size-matters';
import DatePicker from 'react-native-date-picker';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Image} from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Text, View, StyleSheet, Platform, ScrollView} from 'react-native';

import {
  width,
  widthPercentage,
  widthResponsive,
  heightPercentage,
} from '../../../utils';
import {
  SaveIcon,
  ErrorIcon,
  ArrowLeftIcon,
  ChevronDownIcon,
} from '../../../assets/icon';
import {Gap, SsuInput} from '../../atom';
import Color from '../../../theme/Color';
import {Dropdown, ModalConfirm} from '../..';
import {TopNavigation} from '../TopNavigation';
import {font, typography} from '../../../theme';
import {ProfileHeader} from './components/Header';
import {MainTabParams} from '../../../navigations';
import Typography from '../../../theme/Typography';
import {dataProps} from '../DropDown/DropdownMulti';
import {MenuText} from '../../atom/MenuText/MenuText';
import {DataDropDownType} from '../../../data/dropdown';
import {dataGender} from '../../../data/Settings/account';
import {dateFormatBirth} from '../../../utils/date-format';
import {ModalImagePicker} from '../Modal/ModalImagePicker';
import {ParamsProps} from '../../../interface/base.interface';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import {formatValueName} from '../../../utils/formatValueName';
import {PreferenceList} from '../../../interface/setting.interface';
import {ListCountryType} from '../../../interface/location.interface';
import {useUploadImageHook} from '../../../hooks/use-uploadImage.hook';
import {profileStorage, storage} from '../../../hooks/use-storage.hook';
import {ProfileResponseData} from '../../../interface/profile.interface';

interface EditProfileProps {
  dataProfile: ProfileResponseData;
  dataAllCountry: ListCountryType[];
  moods: PreferenceList[];
  genres: PreferenceList[];
  dataCitiesOfCountry: DataDropDownType[];
  selectedCountry: number;
  setSelectedCountry: (value: number) => void;
  deleteValueProfile: (props?: ParamsProps) => void;
}

interface InputProps {
  username: string;
  fullname: string;
  about: string;
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
  about: yup.string(),
  gender: yup.string().required(),
  locationCountry: yup.number(),
  locationCity: yup.string(),
});

export const EditProfile: React.FC<EditProfileProps> = ({
  dataProfile,
  dataAllCountry,
  genres,
  moods,
  dataCitiesOfCountry,
  selectedCountry,
  setSelectedCountry,
  deleteValueProfile,
}) => {
  const {t} = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<MainTabParams>>();
  const {dataImage, setUploadImage} = useUploadImageHook();
  const {updateProfilePreference, isError, isLoading, errorMsg, setIsError} =
    useProfileHook();

  const [bio, setBio] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState({
    modalConfirm: false,
    modalImage: false,
  });
  const [uriType, setUriType] = useState<string>('');
  const [changes, setChanges] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [valueMoods, setValueMoods] = useState<number[]>([]);
  const [valueGenres, setValueGenres] = useState<number[]>([]);
  const [birthdate, setBirthDate] = useState<string>('');
  const [openPickerBirth, setOpenPickerBirth] = useState<boolean>(false);
  const [uploadImgActive, setUploadImgActive] = useState<boolean>(false);
  // image for use (before upload)
  const [avatarUri, setAvatarUri] = useState<Image>();
  const [backgroundUri, setBackgroundUri] = useState<Image>();
  // image for send to API Edit Profile (after upload)
  const [uploadedAvatar, setUploadedAvatar] = useState<string>('');
  const [uploadedBgUri, setUploadedBgUri] = useState<string>('');

  const {
    control,
    formState: {errors, isValid, isValidating},
    getValues,
    setError,
  } = useForm<InputProps>({
    resolver: yupResolver(validation),
    mode: 'onChange',
    defaultValues: {
      username: dataProfile?.username || '',
      fullname: dataProfile?.fullname || '',
      gender: dataProfile?.gender || '',
      locationCountry: dataProfile?.locationCountry?.id || 0,
      locationCity: dataProfile?.locationCity || '',
    },
  });

  const defaultImg = {
    path: '',
    size: 500,
    mime: 'image/jpeg',
    width: 500,
    height: 500,
  };

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
    if (dataProfile) {
      const md = getValue(formatValueName(dataProfile.moods));
      const gr = getValue(formatValueName(dataProfile.favoriteGenres));
      setValueMoods(md);
      setValueGenres(gr);
      setBirthDate(dataProfile.birthdate);
    }
  }, [dataProfile]);

  // save default image
  useEffect(() => {
    if (dataProfile) {
      const avatar =
        dataProfile.images?.length > 0 ? dataProfile.images[2].image : null;
      const banners =
        dataProfile.banners?.length > 0 ? dataProfile.banners[2].image : null;

      // default except path
      setAvatarUri({
        ...defaultImg,
        path: avatar || '',
      });
      setBackgroundUri({
        ...defaultImg,
        path: banners || '',
      });
      setBio(dataProfile?.about || '');
    }
  }, [dataProfile]);

  // send selected image to API, to get new response img
  useEffect(() => {
    if (uploadImgActive) {
      const img = uriType === 'avatarUri' ? avatarUri : backgroundUri;
      img !== undefined && setUploadImage(img);
    }
  }, [avatarUri, backgroundUri]);

  // save to new state img from response API
  useEffect(() => {
    if (uploadImgActive) {
      const setDataResponseImg =
        uriType === 'avatarUri' ? setUploadedAvatar : setUploadedBgUri;
      dataImage?.data !== undefined ? setDataResponseImg(dataImage.data) : null;
    }
  }, [dataImage]);

  const openModalConfirm = () => {
    setModalVisible({
      modalConfirm: true,
      modalImage: false,
    });
  };

  const openModalImage = (newType: string) => {
    setModalVisible({
      modalConfirm: false,
      modalImage: true,
    });
    setUriType(newType);
  };

  const resetImage = () => {
    // reset value of state
    if (uriType === 'avatarUri') {
      setAvatarUri(defaultImg);
      setUploadedAvatar('');
    } else {
      setBackgroundUri(defaultImg);
      setUploadedBgUri('');
    }
    // send the value of which images to delete
    const valueName = uriType === 'avatarUri' ? 'imageProfileUrl' : 'banner';
    // fetch delete profile value
    deleteValueProfile({
      context: valueName,
    });
    closeModal();
  };

  const closeModal = () => {
    setModalVisible({
      modalConfirm: false,
      modalImage: false,
    });
  };

  const sendUri = (val: Image) => {
    setUploadImgActive(true);
    uriType === 'avatarUri' ? setAvatarUri(val) : setBackgroundUri(val);
  };

  const onPressSuccess = () => {
    storage.set('editProfileSuccess', true);
    navigation.goBack();
  };

  const onPressConfirm = async () => {
    closeModal();
    try {
      const payload = {
        username: getValues('username'),
        fullname: getValues('fullname'),
        about: bio,
        gender: getValues('gender'),
        locationCountry: getValues('locationCountry'),
        locationCity: getValues('locationCity'),
        birthdate,
        moods: valueMoods as number[],
        favoriteGeneres: valueGenres as number[],
        imageProfileUrl: uploadedAvatar,
        banner: uploadedBgUri,
      };
      await updateProfilePreference(payload);

      storage.set(
        'profile',
        JSON.stringify({...profileStorage(), fullname: getValues('fullname')}),
      );
      setIsSubmit(true);
      setChanges(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSubmit) {
      if (!isError && !isLoading) {
        onPressSuccess();
      }
      setIsSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

  useEffect(() => {
    if (
      isValid &&
      birthdate &&
      getValues('locationCountry') > 0 &&
      getValues('locationCity') &&
      valueGenres.length > 0 &&
      valueMoods.length > 0
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isValidating,
    isValid,
    birthdate,
    selectedCountry,
    valueGenres,
    valueMoods,
  ]);

  // set error if the username does not comply with the rules
  useEffect(() => {
    if (getValues('username').length < 3 || getValues('username').length > 30) {
      setError('username', {
        type: 'value',
        message: 'Username should be between 3 to 30 alphanumeric characters',
      });
    }
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  // title modal when choose image
  const titleModalPicker =
    uriType === 'avatarUri'
      ? t('Profile.Edit.ProfilePicture')
      : t('Profile.Edit.HeaderPicture');
  // show delete menu in modal picker if any of this value exist
  const showDeleteImage =
    uriType === 'avatarUri'
      ? avatarUri?.path !== ''
      : backgroundUri?.path !== '';
  // new color for bio input if char is equal 110
  const newColor = bio?.length === 110 ? Color.Error[400] : Color.Neutral[10];

  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title={t('Profile.Edit.Title') || ''}
        rightIcon={<SaveIcon stroke={disabledButton ? '#646567' : '#fff'} />}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={goBack}
        rightIconAction={openModalConfirm}
        disabledRightIcon={disabledButton}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader
          type={'edit'}
          avatarUri={avatarUri?.path}
          backgroundUri={backgroundUri?.path}
          fullname={dataProfile?.fullname}
          username={dataProfile?.username}
          containerStyles={{height: heightPercentage(206)}}
          iconPress={openModalImage}
        />

        <View style={styles.containerContent}>
          <Text style={styles.titleMenu}>{'Profile'}</Text>
          <Text style={[Typography.Overline, styles.label]}>
            {t('Profile.Edit.Bio')}
          </Text>
          <SsuInput.InputLabel
            label=""
            value={bio}
            onChangeText={(newText: string) => setBio(newText)}
            placeholder={t('Profile.Edit.About') || ''}
            inputStyles={styles.inputBio}
            maxLength={110}
            multiline
            numberOfLines={3}
            containerStyles={{
              marginBottom: heightPercentage(4),
            }}
          />
          <Text
            style={[
              styles.length,
              {color: newColor},
            ]}>{`${bio.length}/110`}</Text>

          <Text style={styles.titleMenu}>{'Account Information'}</Text>
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
                isRequired={true}
                isError={errors?.username ? true : false}
                errorMsg={errors?.username?.message}
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

          <View style={{marginTop: heightPercentage(15)}}>
            <Text>
              <Text style={[typography.Overline, {color: Color.Neutral[50]}]}>
                {t('Setting.Account.Label.DateOfBirth')}
              </Text>
              <Text style={[typography.Overline, {color: Color.Pink[200]}]}>
                {' *' + t('General.Required')}
              </Text>
            </Text>
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
                placeHolder={t('Setting.Account.Placeholder.Gender')}
                dropdownLabel={t('Setting.Account.Label.Gender')}
                textTyped={(newText: {label: string; value: string}) => {
                  onChange(newText.value);
                  setChanges(true);
                }}
                containerStyles={{marginTop: heightPercentage(15)}}
                isRequired={true}
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
                  isRequired={true}
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
            containerStyles={{marginTop: mvs(15), marginBottom: mvs(5)}}
            initialValue={valueGenres}
            setValues={val => setValueGenres(val)}
            isRequired={true}
          />

          <Dropdown.Multi
            data={formatValueName(moods) ?? []}
            placeHolder={t('Setting.Preference.Placeholder.Mood')}
            dropdownLabel={t('Setting.Preference.Label.Mood')}
            textTyped={(_newText: string) => null}
            containerStyles={{marginTop: mvs(15), marginBottom: mvs(5)}}
            initialValue={valueMoods}
            setValues={val => setValueMoods(val)}
            isRequired={true}
          />

          {isError ? (
            <View style={styles.containerErrorMsg}>
              <ErrorIcon fill={Color.Error[400]} />
              <Gap width={widthResponsive(4)} />
              <Text style={styles.errorMsg}>{errorMsg}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>

      <ModalImagePicker
        title={titleModalPicker}
        modalVisible={isModalVisible.modalImage}
        sendUri={sendUri}
        onDeleteImage={resetImage}
        onPressClose={closeModal}
        showDeleteImage={showDeleteImage}
      />

      <ModalConfirm
        modalVisible={isModalVisible.modalConfirm}
        title={t('Setting.Account.Title') || ''}
        subtitle="Are you sure you want to update your account?"
        onPressClose={closeModal}
        onPressOk={onPressConfirm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  label: {
    fontSize: mvs(12),
    color: Color.Dark[50],
    lineHeight: heightPercentage(20),
    marginBottom: Platform.OS === 'ios' ? heightPercentage(5) : 0,
  },
  containerContent: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: heightPercentage(80),
  },
  titleMenu: {
    color: Color.Success[500],
    fontFamily: font.InterSemiBold,
    fontWeight: '700',
    fontSize: mvs(14),
    marginVertical: mvs(20),
  },
  textArea: {
    paddingHorizontal: 0,
  },
  inputBio: {
    width: width * 0.9,
    textAlignVertical: 'top',
    paddingHorizontal: widthPercentage(4),
    height: Platform.OS === 'ios' ? heightPercentage(80) : undefined,
  },
  length: {
    fontSize: mvs(11),
    marginTop: heightPercentage(5),
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
    fontSize: mvs(10),
    lineHeight: mvs(12),
    maxWidth: '90%',
  },
});
