import React from 'react';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import {Button} from '../../atom';
import Font from '../../../theme/Font';
import SsuSheet from '../../atom/SsuSheet';
import initialname from '../../../utils/initialname';
import {width, heightPercentage} from '../../../utils';
import {color, font, typography} from '../../../theme';
import {AvatarProfile} from '../AvatarProfile/AvatarProfile';
import {ListDataSearchFans} from '../../../interface/search.interface';

interface ModalSendGiftProps {
  modalVisible: boolean;
  selectedItem: ListDataSearchFans;
  onPressSendGift: () => void;
  onPressClose: () => void;
  onModalHide?: () => void;
}

export const ModalSendGift: React.FC<ModalSendGiftProps> = ({
  modalVisible,
  selectedItem,
  onPressSendGift,
  onPressClose,
  onModalHide,
}) => {
  const {t} = useTranslation();

  const children = () => {
    return (
      <>
        <Text style={styles.titleStyle}>
          {t('Rewards.DetailVoucher.BottomSheet.Title')}
        </Text>
        <View style={{marginTop: mvs(20), marginBottom: mvs(10)}}>
          <AvatarProfile
            initialName={initialname(selectedItem.fullname)}
            imgUri={
              selectedItem.imageProfileUrls.length > 0
                ? selectedItem.imageProfileUrls[0].image
                : ''
            }
          />
        </View>
        <Text style={[typography.Heading5, styles.fullname]}>
          {selectedItem.fullname}
        </Text>
        <Text style={styles.username}>{selectedItem.username}</Text>
        <Text style={styles.subtitle}>
          {t('Rewards.DetailVoucher.BottomSheet.Subtitle')}
        </Text>
        <Button
          label={t('Rewards.DetailVoucher.BottomSheet.SendVoucher')}
          containerStyles={styles.btnSend}
          onPress={onPressSendGift}
        />
        <Button
          type="border"
          label={t('Btn.Cancel')}
          containerStyles={styles.btnCancel}
          onPress={onPressClose}
        />
      </>
    );
  };

  return (
    <>
      {modalVisible && (
        <Modal
          isVisible={modalVisible}
          style={{margin: 0}}
          onModalHide={onModalHide}>
          <SsuSheet children={children()} />
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: Font.InterSemiBold,
    fontSize: mvs(16),
    textAlign: 'center',
    color: color.Neutral[10],
  },
  subtitle: {
    fontFamily: Font.InterRegular,
    fontSize: mvs(13),
    textAlign: 'center',
    color: color.Neutral[10],
    width: width * 0.9,
    marginTop: mvs(15),
  },
  fullname: {
    color: color.Neutral[10],
  },
  username: {
    fontSize: mvs(12),
    lineHeight: mvs(20),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  btnSend: {
    width: width * 0.9,
    aspectRatio: heightPercentage(327 / 38),
    marginTop: heightPercentage(25),
    backgroundColor: color.Pink[10],
  },
  btnCancel: {
    width: width * 0.9,
    aspectRatio: heightPercentage(327 / 38),
    marginTop: heightPercentage(10),
    borderColor: color.Pink[10],
  },
});
