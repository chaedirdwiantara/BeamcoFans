import {Button, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import Modal from 'react-native-modal';

interface ModalImageProps {
  toggleModal: () => void;
  modalVisible: boolean;
}

const ImageModal: FC<ModalImageProps> = (props: ModalImageProps) => {
  //   const [modalVisible, setModalVisible] = useState(true);

  //   const toggleModal = () => {
  //     setModalVisible(!modalVisible);
  //   };
  const {toggleModal, modalVisible} = props;
  return (
    <View style={{flex: 1}}>
      <Button title="Show modal" onPress={toggleModal} />

      <Modal isVisible={modalVisible}>
        <View style={{flex: 1}}>
          <Text style={{color: 'white'}}>Hello!</Text>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

export default ImageModal;

const styles = StyleSheet.create({});
