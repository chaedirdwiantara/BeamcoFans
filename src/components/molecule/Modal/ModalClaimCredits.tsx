import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

import {ModalCustom} from './ModalCustom';
import {color, font} from '../../../theme';
import {width, widthPercentage} from '../../../utils';
import {storage} from '../../../hooks/use-storage.hook';

interface ModalClaimCreditsProps {
  modalVisible: boolean;
  onPressClose: () => void;
  onPressClaim: () => void;
}

export const ModalClaimCredits: React.FC<ModalClaimCreditsProps> = (
  props: ModalClaimCreditsProps,
) => {
  const {t} = useTranslation();
  const {modalVisible, onPressClose, onPressClaim} = props;
  const [isClaimed, setIsClaimed] = useState<boolean>(false);

  const titleText = isClaimed
    ? 'Modal.ClaimCredits.TitleClaim'
    : 'Modal.ClaimCredits.Title';
  const subtitleText = isClaimed
    ? 'Modal.ClaimCredits.SubtitleClaim'
    : 'Modal.ClaimCredits.Subtitle';
  const btnText = isClaimed ? 'Btn.Dismiss' : 'Modal.ClaimCredits.ClaimNow';

  const onPress = () => {
    if (isClaimed) {
      onPressClose();
    } else {
      // set to false claim credits &
      // fetch get credit when click claim now
      onPressClaim();
      storage.set('claimCredits', false);
      setIsClaimed(true);
    }
  };

  const children = () => {
    return (
      <View style={styles.card}>
        {isClaimed ? (
          <Image source={require('../../../assets/image/gift-claimed.png')} />
        ) : (
          <Image source={require('../../../assets/image/gift.png')} />
        )}
        <Text style={styles.title}>{t(titleText)}</Text>
        <Text style={styles.subtitle}>{t(subtitleText)}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.btn}>{t(btnText)}</Text>
        </TouchableOpacity>
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
  btn: {
    textAlign: 'center',
    fontFamily: font.InterMedium,
    fontSize: mvs(14),
    color: color.Pink[200],
    marginTop: mvs(25),
  },
});
