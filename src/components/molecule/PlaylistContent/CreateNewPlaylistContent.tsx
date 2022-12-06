import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {color} from '../../../theme';
import {PhotoPlaylist} from './PhotoPlaylist';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {ModalImagePicker} from '../Modal/ModalImagePicker';
import {Button, ButtonGradient, SsuInput} from '../../atom';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import checkEmptyProperties from '../../../utils/checkEmptyProperties';

// note: title menggunakan text area dan dan description sebaliknya
// itu karena, menyesuaikan UI di figma dengan component yang sudah dibuat (border)

interface Props {
  goToPlaylist: (params: any) => void;
  onPressGoBack: () => void;
}

export const CreateNewPlaylistContent: React.FC<Props> = ({
  goToPlaylist,
  onPressGoBack,
}) => {
  const [state, setState] = useState({
    playlistName: '',
    playlistDesc: '',
  });
  const [isModalVisible, setModalVisible] = useState({
    modalConfirm: false,
    modalImage: false,
  });
  const [playlistUri, setPlaylistUri] = useState({
    path: undefined,
  });
  const [focusInput, setFocusInput] = useState<'name' | 'description' | null>(
    null,
  );

  const onChangeText = (key: string, value: string) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const resetImage = () => {
    setPlaylistUri({path: undefined});
    closeModal();
  };

  const sendUri = (val: React.SetStateAction<{path: undefined}>) => {
    setPlaylistUri(val);
  };

  const handleFocusInput = (focus: 'name' | 'description' | null) => {
    setFocusInput(focus);
  };

  const openModal = (type: string) => {
    setModalVisible({
      ...isModalVisible,
      [type]: true,
    });
  };

  const closeModal = () => {
    setModalVisible({
      modalConfirm: false,
      modalImage: false,
    });
  };

  const onPressConfirm = () => {
    goToPlaylist({...state, playlistUri});
    closeModal();
  };

  const disabledButton = checkEmptyProperties({
    playlistName: state.playlistName,
  });
  const colorDisabled = [color.Dark[50], color.Dark[50]];
  const defaultGradient = ['#F98FD9', '#FF70D4'];

  const hideMenuDelete =
    playlistUri?.path !== undefined && playlistUri?.path !== '';

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title="New Playlist"
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{paddingHorizontal: widthPercentage(12)}}
      />

      <PhotoPlaylist
        uri={playlistUri?.path}
        showIcon
        onPress={() => openModal('modalImage')}
      />

      <SsuInput.TextArea
        value={state.playlistName}
        onChangeText={(newText: string) =>
          onChangeText('playlistName', newText)
        }
        placeholder={'Playlist Name'}
        containerStyles={styles.textInput}
        textAlign={'center'}
        numberOfLines={1}
        multiline={false}
        onFocus={() => {
          handleFocusInput('name');
        }}
        onBlur={() => {
          handleFocusInput(null);
        }}
        isFocus={focusInput === 'name'}
      />

      <SsuInput.InputText
        value={state.playlistDesc}
        onChangeText={(newText: string) =>
          onChangeText('playlistDesc', newText)
        }
        placeholder={'Playlist Description'}
        containerStyles={styles.textArea}
        multiline
        numberOfLines={5}
        fontColor={color.Neutral[10]}
        borderColor={color.Pink.linear}
        inputStyles={styles.inputDesc}
        onFocus={() => {
          handleFocusInput('description');
        }}
        onBlur={() => {
          handleFocusInput(null);
        }}
        isFocus={focusInput === 'description'}
      />

      <View style={styles.footer}>
        <Button
          type="border"
          label="Cancel"
          containerStyles={styles.btnContainer}
          textStyles={{color: color.Pink.linear}}
          onPress={() => null}
        />
        <ButtonGradient
          label={'Create'}
          disabled={disabledButton}
          colors={disabledButton ? colorDisabled : defaultGradient}
          onPress={() => openModal('modalConfirm')}
          gradientStyles={styles.btnContainer}
        />
      </View>

      <ModalImagePicker
        title="Edit Playlist Cover"
        modalVisible={isModalVisible.modalImage}
        sendUri={sendUri}
        onDeleteImage={resetImage}
        onPressClose={closeModal}
        hideMenuDelete={hideMenuDelete}
      />
      <ModalConfirm
        modalVisible={isModalVisible.modalConfirm}
        title="Save"
        subtitle="Are you sure you want to save your new playlist?"
        onPressClose={closeModal}
        onPressOk={onPressConfirm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    paddingHorizontal: widthPercentage(12),
    alignItems: 'center',
  },
  containerInput: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: heightPercentage(15),
  },
  textInput: {
    marginTop: heightPercentage(10),
  },
  textArea: {
    paddingHorizontal: 0,
    marginVertical: heightPercentage(10),
    marginTop: heightPercentage(15),
  },
  footer: {
    width: widthPercentage(327),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: heightPercentage(40),
  },
  btnContainer: {
    width: widthPercentage(150),
    aspectRatio: heightPercentage(150 / 36),
  },
  inputDesc: {
    textAlignVertical: 'top',
    paddingHorizontal: widthPercentage(10),
  },
});
