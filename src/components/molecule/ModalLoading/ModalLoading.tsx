import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Lottie from 'lottie-react-native';
import {height, heightResponsive, widthResponsive} from '../../../utils';

interface ModalLoadingProps {
  visible: boolean;
}

export const ModalLoading = (props: ModalLoadingProps) => {
  const {visible} = props;

  return (
    <>
      {visible && (
        <Modal
          deviceHeight={height}
          statusBarTranslucent
          isVisible={visible}
          style={styles.root}>
          <Lottie
            source={require('../../../assets/animation/loading-beamco-fans.json')}
            autoPlay
            loop
            style={
              Platform.OS === 'ios'
                ? {
                    padding: 0,
                    margin: 0,
                    width: widthResponsive(250),
                    height: heightResponsive(250),
                    aspectRatio: 1 / 1,
                  }
                : {}
            }
          />
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
    margin: 0,
  },
});
