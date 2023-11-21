import React from 'react';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import SsuSheet from '../../atom/SsuSheet';
import {color, typography} from '../../../theme';
import {Button, ButtonGradient} from '../../atom';
import {RootStackParams} from '../../../navigations';
import {heightPercentage, normalize, width} from '../../../utils';

interface BottomSheetGuestProps {
  modalVisible: boolean;
  onPressClose: () => void;
}

export const BottomSheetGuest: React.FC<BottomSheetGuestProps> = ({
  modalVisible,
  onPressClose,
}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPress = (screen: 'Signup' | 'Login') => {
    navigation.navigate(screen);
    onPressClose();
  };

  const children = () => {
    return (
      <View>
        <View style={styles.containerTitle}>
          <Text
            style={[
              typography.Heading4,
              {color: color.Neutral[10], textAlign: 'center'},
            ]}>
            {t('Modal.Guest.Title')}
          </Text>
          <Text style={[typography.Body1, styles.subtitle]}>
            {t('Modal.Guest.Subtitle')}
          </Text>
        </View>
        <View style={{alignSelf: 'center'}}>
          <ButtonGradient
            label={t('Btn.SignUp')}
            textStyles={{fontSize: normalize(14)}}
            onPress={() => onPress('Signup')}
            gradientStyles={{width: width * 0.75}}
            colors={['#F98FD9', '#FF70D4']}
          />
          <Button
            type="border"
            label={t('Btn.SignIn')}
            textStyles={{fontSize: normalize(14), color: color.Pink.linear}}
            containerStyles={{marginVertical: mvs(6), width: width * 0.75}}
            onPress={() => onPress('Login')}
            borderColor={color.Pink.linear}
          />
          <Button
            type="border"
            label={t('Btn.MaybeLater')}
            borderColor="transparent"
            textStyles={{fontSize: normalize(14), color: color.Pink.linear}}
            containerStyles={{width: width * 0.75}}
            onPress={onPressClose}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      {modalVisible && (
        <Modal isVisible={modalVisible} style={{margin: 0}}>
          <TouchableWithoutFeedback onPress={onPressClose}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <SsuSheet children={children()} />
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  containerTitle: {
    marginBottom: heightPercentage(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    color: color.Neutral[10],
    textAlign: 'center',
    letterSpacing: 0,
    marginTop: heightPercentage(20),
  },
});
