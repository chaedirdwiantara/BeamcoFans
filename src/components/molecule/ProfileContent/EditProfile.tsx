import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {ModalConfirm} from '../..';
import {SsuInput} from '../../atom';
import Color from '../../../theme/Color';
import {TopNavigation} from '../TopNavigation';
import Typography from '../../../theme/Typography';
import {ModalImagePicker} from '../Modal/ModalImagePicker';
import {ArrowLeftIcon, SaveIcon} from '../../../assets/icon';
import {ProfileHeaderProps, ProfileHeader} from './components/Header';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';

interface EditProfileProps {
  profile: ProfileHeaderProps[];
  type: string;
  onPressGoBack: () => void;
  onPressSave: (params: object) => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({
  type,
  profile,
  onPressGoBack,
  onPressSave,
}) => {
  const [bio, setBio] = useState('');
  const [isModalVisible, setModalVisible] = useState({
    modalConfirm: false,
    modalImage: false,
  });
  const [uriType, setUriType] = useState('');
  const [uri, setUri] = useState({
    avatarUri: {path: null},
    backgroundUri: {path: null},
  });
  const [focusInput, setFocusInput] = useState(false);

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
    setUri({...uri, [uriType]: null});
    closeModal();
  };

  const closeModal = () => {
    setModalVisible({
      modalConfirm: false,
      modalImage: false,
    });
  };

  const sendUri = (val: {assets: string[]}) => {
    setUri({...uri, [uriType]: val});
  };

  const avatarUri = uri?.avatarUri?.path || profile.avatarUri || null;
  const backgroundUri =
    uri?.backgroundUri?.path || profile.backgroundUri || null;

  const titleModalPicker =
    uriType === 'avatarUri' ? 'Edit Display Profile' : 'Edit Header';
  const hideMenuDelete =
    uriType === 'avatarUri'
      ? avatarUri !== null && avatarUri !== ''
      : backgroundUri !== null && backgroundUri !== '';

  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title="Edit Profile"
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
        fullname={profile.fullname}
        username={profile.username}
        containerStyles={{height: heightPercentage(206)}}
        iconPress={openModalImage}
      />
      <View style={styles.textAreaContainer}>
        <Text style={[Typography.Overline, styles.label]}>Bio</Text>
        <SsuInput.InputText
          value={bio}
          onChangeText={(newText: string) => setBio(newText)}
          placeholder={'Type here...'}
          containerStyles={styles.textArea}
          maxLength={110}
          multiline
          numberOfLines={4}
          fontColor={Color.Neutral[10]}
          inputStyles={styles.inputBio}
          onFocus={() => setFocusInput(true)}
          onBlur={() => setFocusInput(false)}
          isFocus={focusInput}
        />
        <Text style={styles.length}>{`${bio.length}/110`}</Text>
      </View>

      <ModalImagePicker
        title={titleModalPicker}
        modalVisible={isModalVisible.modalImage}
        sendUri={sendUri}
        onDeleteImage={resetImage}
        onPressClose={closeModal}
        hideMenuDelete={hideMenuDelete}
      />

      <ModalConfirm
        modalVisible={isModalVisible.modalConfirm}
        title="Edit Profile"
        subtitle="Are you sure to finish edit profile?"
        onPressClose={closeModal}
        onPressOk={() => onPressSave({...uri, bio})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  label: {
    fontSize: normalize(12),
    color: Color.Dark[50],
    marginBottom: heightPercentage(5),
    marginTop: heightPercentage(20),
    lineHeight: heightPercentage(20),
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
    textAlignVertical: 'top',
    paddingHorizontal: widthPercentage(10),
  },
  length: {
    fontSize: normalize(12),
    color: Color.Neutral[10],
    marginTop: heightPercentage(5),
  },
});
