import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import Modal from 'react-native-modal';
import {heightPercentage, heightResponsive, widthResponsive} from '../../utils';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Avatar, Gap, SsuInput} from '../../components';
import {color, font} from '../../theme';
import {ms} from 'react-native-size-matters';

interface ModalImageProps {
  toggleModal: () => void;
  modalVisible: boolean;
  name: string;
}

const CommentInputModal: FC<ModalImageProps> = (props: ModalImageProps) => {
  const {toggleModal, modalVisible, name} = props;
  const [state, setState] = useState<string>('');

  return (
    <Modal
      isVisible={modalVisible}
      backdropOpacity={0}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Avatar
            imgUri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxwjjgqL0vLByyI1sXSGF3Q08PXEmPTUbL6w&usqp=CAU"
            size={42}
          />
          {/* <Gap width={12} /> */}
          <SsuInput.InputText
            value={state}
            onChangeText={(newText: any) => setState(newText)}
            placeholder={'Reply as your name'}
            containerStyles={{
              width: widthResponsive(209),
              backgroundColor: 'transparent',
              paddingLeft: 0,
              flexShrink: 1,
              maxWidth: widthResponsive(209),
            }}
            multiline={true}
          />
          <Gap width={24} />
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CommentInputModal;

const styles = StyleSheet.create({
  container: {
    marginTop: heightPercentageToDP('90%'),
    height: heightPercentage(88),
    width: '100%',
    backgroundColor: color.Dark[800],
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    // backgroundColor: 'grey',
    // height: heightPercentage(64),
  },
  buttonStyle: {
    backgroundColor: color.Dark[50],
    borderRadius: 4,
    paddingVertical: ms(6),
    // paddingHorizontal: ms(16),
    width: widthResponsive(62),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: 11,
  },
});
