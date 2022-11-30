import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {SsuInput} from '../../atom';
import {color} from '../../../theme';
import {PhotoPlaylist} from './PhotoPlaylist';
import {TopNavigation} from '../TopNavigation';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {ModalImagePicker} from '../Modal/ModalImagePicker';
import {ArrowLeftIcon, SaveIcon} from '../../../assets/icon';
import {heightPercentage, width, widthPercentage} from '../../../utils';

// note: title menggunakan text area dan dan description sebaliknya
// itu karena, menyesuaikan UI di figma dengan component yang sudah dibuat (border)

interface Playlist {
  playlistUri: string;
  playlistName: string;
  playlistDesc: string;
}

interface EditPlaylistProps {
  playlist: Playlist;
  goToPlaylist: (params: object) => void;
  onPressGoBack: () => void;
}

export const EditPlaylistContent: React.FC<EditPlaylistProps> = ({
  playlist,
  goToPlaylist,
  onPressGoBack,
}) => {
  const [state, setState] = useState({
    playlistName: playlist.playlistName || '',
    playlistDesc: playlist.playlistDesc || '',
  });
  const [isModalVisible, setModalVisible] = useState({
    modalConfirm: false,
    modalImage: false,
  });
  const [playlistUri, setPlaylistUri] = useState({
    path: playlist.playlistUri?.path || undefined,
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
    setModalVisible({
      modalConfirm: false,
      modalImage: false,
    });
  };

  const sendUri = (val: React.SetStateAction<{path: undefined}>) => {
    setPlaylistUri(val);
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

  const handleFocusInput = (focus: 'name' | 'description' | null) => {
    setFocusInput(focus);
  };

  const hideMenuDelete =
    playlistUri?.path !== undefined && playlistUri?.path !== '';

  return (
    <View style={styles.root}>
      <TopNavigation.Type4
        title="Edit Playlist"
        rightIcon={<SaveIcon />}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        rightIconAction={() => openModal('modalConfirm')}
        containerStyles={{paddingHorizontal: widthPercentage(20)}}
      />

      <View style={styles.containerContent}>
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
        subtitle="Are you sure you want to update your playlist?"
        onPressClose={closeModal}
        onPressOk={() => goToPlaylist({...state, playlistUri})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  containerContent: {
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
