import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {mvs} from 'react-native-size-matters';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';
import {Button} from '../../atom';
import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import SsuSheet from '../../atom/SsuSheet';

interface ModalEditProps {
  modalVisible: boolean;
  onPressClose: () => void;
  sendUri: (params: any) => void;
}

interface ImageOptionsProps {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  selectionLimit?: number;
  saveToPhotos?: boolean;
  mediaType: string;
  includeBase64: boolean;
}

export const ModalEdit: React.FC<ModalEditProps> = ({
  modalVisible,
  sendUri,
  onPressClose,
}) => {
  const onImageLibraryPress = () => {
    const options: ImageOptionsProps = {
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 0.9,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    };
    launchImageLibrary(options, val => val?.assets?.length > 0 && sendUri(val));
    onPressClose();
  };

  const onCameraPress = () => {
    const options: ImageOptionsProps = {
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 0.9,
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: true,
    };
    launchCamera(options, val => val?.assets?.length > 0 && sendUri(val));
    onPressClose();
  };

  const children = () => {
    return (
      <>
        <Text style={styles.titleStyle}>Edit Display Profile</Text>
        <View style={styles.separator} />
        <View>
          <TouchableOpacity>
            <Text style={styles.textMenu} onPress={onCameraPress}>
              Take Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginVertical: 10}}
            onPress={onImageLibraryPress}>
            <Text style={styles.textMenu}>Add photo from gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.textMenu}>Delete Photo</Text>
          </TouchableOpacity>
        </View>
        <Button
          type="border"
          label="Cancel"
          containerStyles={styles.btnContainer}
          textStyles={{color: Color.Pink.linear}}
          onPress={onPressClose}
        />
      </>
    );
  };

  return (
    <Modal isVisible={modalVisible} style={styles.modal}>
      <TouchableWithoutFeedback onPress={onPressClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <SsuSheet children={children()} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: Font.InterSemiBold,
    fontSize: normalize(18),
    lineHeight: mvs(28),
    textAlign: 'center',
    color: Color.Neutral[10],
  },
  modal: {justifyContent: 'center', alignItems: 'center'},
  separator: {
    backgroundColor: '#2B3240',
    width: width,
    height: mvs(1),
    marginVertical: heightPercentage(30),
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  btnContainer: {
    width: widthPercentage(327),
    aspectRatio: heightPercentage(327 / 40),
    marginTop: heightPercentage(20),
  },
  textMenu: {
    color: Color.Neutral[10],
    textAlign: 'center',
    fontFamily: Font.InterRegular,
    fontSize: normalize(14),
  },
});
