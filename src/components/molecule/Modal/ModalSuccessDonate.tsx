import React, {FC} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';

import {Button} from '../../atom';
import {color, typography} from '../../../theme';
import {CheckGradientIcon} from '../../../assets/icon';
import {heightResponsive, widthResponsive} from '../../../utils';

interface ModalSuccessProps {
  toggleModal: () => void;
  modalVisible: boolean;
  containerStyle?: ViewStyle;
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export const ModalSuccessDonate: FC<ModalSuccessProps> = (
  props: ModalSuccessProps,
) => {
  const {toggleModal, modalVisible, title, subtitle, buttonText} = props;
  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      style={styles.modalStyle}>
      <View style={styles.container}>
        <CheckGradientIcon style={styles.iconStyle} />
        <Text style={[typography.Subtitle1, styles.textStyles]}>
          {title ? title : 'Congratulations! Your Donation have been Sent!'}
        </Text>
        {subtitle && (
          <Text style={[typography.Button2, styles.textStyles]}>
            {subtitle}
          </Text>
        )}
        <Button
          label={buttonText ? buttonText : 'Dismiss'}
          containerStyles={styles.btnDonate}
          onPress={toggleModal}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    backgroundColor: color.Dark[800],
    alignItems: 'center',
    paddingHorizontal: widthResponsive(24),
    borderRadius: 4,
  },
  iconStyle: {
    marginTop: heightResponsive(32),
    marginBottom: heightResponsive(20),
  },
  textStyles: {
    color: color.Neutral[10],
    marginBottom: heightResponsive(20),
    textAlign: 'center',
  },
  btnDonate: {
    width: '100%',
    backgroundColor: color.Success[400],
    marginBottom: heightResponsive(32),
  },
});
