import React from 'react';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

import {ModalCustom} from './ModalCustom';
import {color, font} from '../../../theme';
import {width, widthPercentage} from '../../../utils';

interface ModalConfirm2Props {
  modalVisible: boolean;
  title: string;
  subtitle: string;
  imgUri?: string;
  yesText?: string;
  onPressClose: () => void;
  onPressYes: () => void;
}

export const ModalConfirm2: React.FC<ModalConfirm2Props> = (
  props: ModalConfirm2Props,
) => {
  const {t} = useTranslation();
  const {
    modalVisible,
    imgUri,
    title,
    subtitle,
    yesText,
    onPressClose,
    onPressYes,
  } = props;

  const children = () => {
    return (
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={
            imgUri
              ? {uri: imgUri}
              : require('../../../assets/image/detail_voucher_default.png')
          }
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.containerBtn}>
          <TouchableOpacity onPress={onPressClose}>
            <Text style={styles.btn}>{t('General.No')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressYes}>
            <Text style={styles.btn}>
              {yesText ? yesText : t('General.Yes') + '!'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      {modalVisible && (
        <ModalCustom modalVisible={modalVisible} children={children()} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.7,
    backgroundColor: color.Dark[800],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingHorizontal: widthPercentage(20),
    paddingVertical: mvs(25),
  },
  image: {
    width: widthPercentage(120),
    height: widthPercentage(120),
    borderRadius: widthPercentage(60),
    marginVertical: mvs(5),
  },
  title: {
    textAlign: 'center',
    fontFamily: font.InterSemiBold,
    fontSize: mvs(15),
    fontWeight: '600',
    color: color.Neutral[10],
    marginTop: mvs(15),
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: font.InterMedium,
    fontSize: mvs(11),
    fontWeight: '500',
    color: '#BDBDBD',
    marginTop: mvs(10),
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
    fontWeight: '500',
    marginTop: mvs(25),
  },
});
