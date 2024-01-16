import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {Image} from 'react-native-image-crop-picker';

import {ModalConfirm} from '../..';
import {SsuInput} from '../../atom';
import Color from '../../../theme/Color';
import {TopNavigation} from '../TopNavigation';
import {ProfileHeader} from './components/Header';
import Typography from '../../../theme/Typography';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {ModalImagePicker} from '../Modal/ModalImagePicker';
import {ArrowLeftIcon, SaveIcon} from '../../../assets/icon';
import {ParamsProps} from '../../../interface/base.interface';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {useTranslation} from 'react-i18next';
import {ProfileResponseData} from '../../../interface/profile.interface';
import {useUploadImageHook} from '../../../hooks/use-uploadImage.hook';

interface EditProfileProps {
  profile: any;
  dataProfile: ProfileResponseData | undefined;
  type: string;
  onPressGoBack: () => void;
  onPressSave: (params: {bio: string}) => void;
  setUploadImage: (image: Image, type: string) => void;
  imageLoading: boolean;
  deleteValueProfile: (props?: ParamsProps) => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({
  type,
  dataProfile,
  profile,
  onPressGoBack,
  onPressSave,
  // setUploadImage,
  imageLoading,
  deleteValueProfile,
}) => {
  const {t} = useTranslation();
  const {isLoadingImage, dataImage, setUploadImage} = useUploadImageHook();

  const [bio, setBio] = useState(dataProfile?.bio || '');
  const [isModalVisible, setModalVisible] = useState({
    modalConfirm: false,
    modalImage: false,
  });
  const [uriType, setUriType] = useState('');
  const [uri, setUri] = useState({
    avatarUri: {path: profile.avatarUri || null},
    backgroundUri: {path: profile.backgroundUri || null},
  });
  const [uploadImgActive, setUploadImgActive] = useState<boolean>(false);
  // image for use (before upload)
  const [avatarUri, setAvatarUri] = useState<Image>();
  const [backgroundUri, setBackgroundUri] = useState<Image>();
  // image for send to API Edit Profile (after upload)
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);
  const [uploadedBgUri, setUploadedBgUri] = useState<string | null>(null);

  useEffect(() => {
    if (dataProfile) {
      const avatar =
        dataProfile.images?.length > 0 ? dataProfile.images[2].image : null;
      const banners =
        dataProfile.banners?.length > 0 ? dataProfile.banners[2].image : null;
      setAvatarUri(avatar);
      setBackgroundUri(banners);
    }
  }, [dataProfile]);

  useEffect(() => {
    if (uploadImgActive) {
      const img = uriType === 'avatarUri' ? avatarUri : backgroundUri;
      setUploadImage(avatarUri);
    }
  }, [avatarUri, backgroundUri]);

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
    uriType === 'avatarUri' ? setAvatarUri(null) : setBackgroundUri(null);
    // send the value of which image was deleted
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
    setUploadImage(val, uriType);
    setUri({...uri, [uriType]: val});
  };

  const titleModalPicker =
    uriType === 'avatarUri'
      ? t('Profile.Edit.ProfilePicture')
      : t('Profile.Edit.HeaderPicture');
  const showDeleteImage =
    uriType === 'avatarUri' ? avatarUri !== null : backgroundUri !== null;
  const newColor = bio.length === 110 ? Color.Error[400] : Color.Neutral[10];

  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title={t('Profile.Edit.Title') || ''}
        rightIcon={<SaveIcon />}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={Color.Neutral[10]}
        leftIconAction={onPressGoBack}
        rightIconAction={openModalConfirm}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />
      <ProfileHeader
        type={type}
        avatarUri={avatarUri}
        backgroundUri={backgroundUri}
        fullname={dataProfile?.fullname}
        username={dataProfile?.username}
        containerStyles={{height: heightPercentage(206)}}
        iconPress={openModalImage}
      />
      <View style={styles.textAreaContainer}>
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
      </View>

      <ModalLoading visible={imageLoading} />

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
        title={t('Modal.EditProfile.Title') || ''}
        subtitle={t('Modal.EditProfile.Subtitle') || ''}
        onPressClose={closeModal}
        onPressOk={() => {
          onPressSave({bio});
          setTimeout(() => {
            closeModal();
          }, 500);
        }}
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
    marginTop: heightPercentage(20),
    lineHeight: heightPercentage(20),
    marginBottom: Platform.OS === 'ios' ? heightPercentage(5) : 0,
  },
  textAreaContainer: {
    width: '90%',
    alignSelf: 'center',
    flex: 1,
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
});
