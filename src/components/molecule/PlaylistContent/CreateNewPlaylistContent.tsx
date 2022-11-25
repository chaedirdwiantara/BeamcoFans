import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {color} from '../../../theme';
import {PhotoPlaylist} from './PhotoPlaylist';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import {ModalImagePicker} from '../Modal/ModalImagePicker';
import {Button, ButtonGradient, SsuInput} from '../../atom';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import checkEmptyProperties from '../../../utils/checkEmptyProperties';

// note: title menggunakan text area dan dan description sebaliknya
// itu karena, menyesuaikan UI di figma dengan component yang sudah dibuat (border)

interface Props {
  goToPlaylist: (params: object) => void;
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
  const [isModalVisible, setModalVisible] = useState(false);
  const [uri, setUri] = useState({
    path: undefined,
  });

  const onChangeText = (key: string, value: string) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const resetImage = () => {
    setUri({path: undefined});
    setModalVisible(false);
  };

  const sendUri = (val: React.SetStateAction<{path: undefined}>) => {
    setUri(val);
  };

  const disabledButton = checkEmptyProperties({
    playlistName: state.playlistName,
  });
  const colorDisabled = [color.Dark[50], color.Dark[50]];
  const defaultGradient = ['#F98FD9', '#FF70D4'];

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
        uri={uri?.path}
        showIcon
        onPress={() => setModalVisible(true)}
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
          onPress={() => goToPlaylist({...state, uri})}
          gradientStyles={styles.btnContainer}
        />
      </View>
      <ModalImagePicker
        title="Edit Playlist Cover"
        modalVisible={isModalVisible}
        sendUri={sendUri}
        onDeleteImage={resetImage}
        onPressClose={() => setModalVisible(false)}
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
