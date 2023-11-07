import React from 'react';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

import {ModalCustom} from './ModalCustom';
import {color, font} from '../../../theme';
import {width, widthPercentage} from '../../../utils';

interface ModalFreeBeerProps {
  modalVisible: boolean;
  onPressClose: () => void;
  onPressRedeem: () => void;
}

export const ModalFreeBeer: React.FC<ModalFreeBeerProps> = (
  props: ModalFreeBeerProps,
) => {
  const {t} = useTranslation();
  const {modalVisible, onPressClose, onPressRedeem} = props;

  const children = () => {
    return (
      <View style={styles.card}>
        <Image source={require('../../../assets/image/free-beer.png')} />
        <Text style={styles.title}>{t('Modal.FreeBeer.Title')}</Text>
        <Text style={styles.subtitle}>{t('Modal.FreeBeer.Subtitle')}</Text>
        <View style={styles.containerBtn}>
          <TouchableOpacity onPress={onPressClose}>
            <Text style={[styles.btn, {color: color.Neutral[10]}]}>
              {t('Modal.FreeBeer.Dismiss')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressRedeem}>
            <Text style={styles.btn}>{t('Modal.FreeBeer.Redeem')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return <ModalCustom modalVisible={modalVisible} children={children()} />;
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.8,
    backgroundColor: color.Dark[800],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingHorizontal: widthPercentage(20),
    paddingVertical: mvs(25),
  },
  title: {
    textAlign: 'center',
    fontFamily: font.InterSemiBold,
    fontSize: mvs(15),
    color: color.Neutral[10],
    marginTop: mvs(15),
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: font.InterMedium,
    fontSize: mvs(11),
    color: '#BDBDBD',
    marginTop: mvs(5),
  },
  containerBtn: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btn: {
    textAlign: 'center',
    fontFamily: font.InterMedium,
    fontSize: mvs(14),
    color: color.Pink[200],
    marginTop: mvs(25),
  },
});
