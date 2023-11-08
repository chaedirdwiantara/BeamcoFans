import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

import {Gap} from '../../atom';
import Color from '../../../theme/Color';
import {ModalCustom} from './ModalCustom';
import Typography from '../../../theme/Typography';
import {useIapHook} from '../../../hooks/use-iap.hook';
import {heightResponsive, widthResponsive} from '../../../utils';

interface ModalTopUpProps {
  modalVisible: boolean;
  onPressClose: () => void;
}

export const ModalTopUp: React.FC<ModalTopUpProps> = (
  props: ModalTopUpProps,
) => {
  const {t} = useTranslation();
  const {modalVisible, onPressClose} = props;

  const {
    getProductIap,
    endIap,
    purchaseProduct,
    loadIapListener,
    purchaseUpdateListener,
    purchaseErrorListener,
  } = useIapHook();

  useEffect(() => {
    getProductIap();
    loadIapListener();

    return () => {
      endIap();
      purchaseUpdateListener?.remove();
      purchaseErrorListener?.remove();
    };
  }, []);

  const onPressBuy = () => {
    purchaseProduct('credit_beamco_540');
    onPressClose();
  };

  const children = () => {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.imageModalContainer}>
          <Image source={require('../../../assets/image/topup.png')} />
          <Gap height={heightResponsive(6)} />
          <Text
            style={[
              Typography.Body4,
              {fontWeight: '500', color: '#FED843', textAlign: 'center'},
            ]}>
            540 {t('TopUp.Transaction.Detail.Credit')}
          </Text>
        </View>
        <Gap height={heightResponsive(16)} />
        <Text
          style={[
            Typography.Body2,
            {
              fontWeight: '700',
              color: '#FFF',
              textAlign: 'center',
              paddingHorizontal: widthResponsive(10),
            },
          ]}>
          {t('Event.Detail.Popup.Package1.Title')}
        </Text>
        <Gap height={heightResponsive(4)} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '100%',
          }}>
          <Text
            style={[Typography.Overline, {color: '#BDBDBD'}]}>{`\u2022`}</Text>
          <Gap width={widthResponsive(4)} />
          <Text
            style={[
              Typography.Overline,
              {color: '#BDBDBD', fontWeight: '600'},
            ]}>
            {t('Event.Detail.Popup.Package1.Subtitle1')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '100%',
          }}>
          <Text
            style={[Typography.Overline, {color: '#BDBDBD'}]}>{`\u2022`}</Text>
          <Gap width={widthResponsive(4)} />
          <Text
            style={[
              Typography.Overline,
              {color: '#BDBDBD', fontWeight: '600'},
            ]}>
            {t('Event.Detail.Popup.Package1.Subtitle2')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '100%',
          }}>
          <Text
            style={[Typography.Overline, {color: '#BDBDBD'}]}>{`\u2022`}</Text>
          <Gap width={widthResponsive(4)} />
          <Text
            style={[
              Typography.Overline,
              {color: '#BDBDBD', fontWeight: '600'},
            ]}>
            {t('Event.Detail.Popup.Package1.Subtitle3')}
          </Text>
        </View>

        <Gap height={heightResponsive(20)} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
          }}>
          <TouchableOpacity onPress={onPressClose}>
            <Text
              style={[Typography.Body2, {fontWeight: '600', color: '#FFF'}]}>
              {t('General.Dismiss')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressBuy}>
            <Text
              style={[
                Typography.Body2,
                {fontWeight: '600', color: Color.Pink.linear},
              ]}>
              {t('General.BuyNow')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return <ModalCustom modalVisible={modalVisible} children={children()} />;
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Color.Dark[800],
    width: '100%',
    maxWidth: widthResponsive(244),
    alignItems: 'center',
    borderRadius: widthResponsive(10),
    paddingHorizontal: widthResponsive(16),
    paddingBottom: heightResponsive(16),
    paddingTop: heightResponsive(32),
  },
  imageModalContainer: {
    backgroundColor: '#20242C',
    padding: widthResponsive(20),
    borderRadius: 100,
    width: widthResponsive(120),
    height: heightResponsive(120),
    alignItems: 'center',
  },
});
