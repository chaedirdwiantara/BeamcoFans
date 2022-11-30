import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import Modal from 'react-native-modal';
import {color} from '../../theme';
import FastImage from 'react-native-fast-image';
import {heightPercentage, heightResponsive, widthResponsive} from '../../utils';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {CloseCircleIcon, CloseIcon} from '../../assets/icon';

interface ModalImageProps {
  toggleModal: () => void;
  modalVisible: boolean;
  name: string;
}

const CommentInputModal: FC<ModalImageProps> = (props: ModalImageProps) => {
  const {toggleModal, modalVisible, name} = props;

  return (
    <Modal
      isVisible={modalVisible}
      backdropOpacity={0.2}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}>
      <View style={styles.container}>
        <Text style={{color: 'white'}}>hai</Text>
      </View>
    </Modal>
  );
};

export default CommentInputModal;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  scrollView: {
    alignItems: 'center',
  },
  imageStyle: {
    height: heightResponsive(375, 812),
    width: widthPercentageToDP('100%'),
    marginTop: heightPercentage(-12),
  },
});
