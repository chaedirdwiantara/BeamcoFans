import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {Buffer} from 'buffer';
import QRCode from 'react-native-qrcode-svg';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {useFocusEffect} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {color, font} from '../../../theme';
import {width, widthResponsive} from '../../../utils';
import {RootStackParams} from '../../../navigations';
import {dateFormatDaily} from '../../../utils/date-format';
import {useRewardHook} from '../../../hooks/use-reward.hook';
import {ArrowLeftIcon, ClockIcon} from '../../../assets/icon';
import RedeemSuccessIcon from '../../../assets/icon/RedeemSuccess.icon';
import {Button, Gap, ModalCustom, TopNavigation} from '../../../components';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;
type ListVoucherProps = NativeStackScreenProps<
  RootStackParams,
  'DetailVoucherRewards'
>;

const DetailVoucherRewards: FC<ListVoucherProps> = ({
  route,
  navigation,
}: ListVoucherProps) => {
  // voucher sent from other, status = 'Gift Voucher'
  // self voucher, status = 'Ready to Redeem'
  const {id, status, dataDetailAvailVoucher} = route.params;

  const {t} = useTranslation();
  const {useEventVoucherDetail, useClaimMyVoucher} = useRewardHook();

  const [scrollEffect, setScrollEffect] = useState<boolean>(false);
  const [showQrPopUp, setShowQrPopUp] = useState<boolean>(false);
  const [valueEncode, setValueEncode] = useState<string>();
  const [voucherId, setVoucherId] = useState<number | undefined>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleBackAction = () => {
    navigation.goBack();
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 1;
    setScrollEffect(scrolled);
  };

  const {data: dataDetail, refetch: refetchDetail} = useEventVoucherDetail(id);
  const {data: dataClaim, refetch: refetchClaim} = useClaimMyVoucher(voucherId);
  const details = id ? dataDetail?.data : dataDetailAvailVoucher.data;

  useFocusEffect(
    useCallback(() => {
      id && refetchDetail();
    }, []),
  );

  useEffect(() => {
    if (dataDetail?.data) {
      let dataToEncode = `${dataDetail?.data.id}|""`;
      setValueEncode(Buffer.from(dataToEncode).toString('base64'));
    }
  }, [dataDetail?.data]);

  useEffect(() => {
    async function setClaimSelectedVoucher() {
      if (voucherId && voucherId !== undefined) {
        await refetchClaim();
        setVoucherId(undefined);
      }
    }

    setClaimSelectedVoucher();
  }, [voucherId]);

  const showQrOnPress = () => {
    setShowQrPopUp(true);
  };

  const closeQrOnPress = () => {
    setShowQrPopUp(false);
    refetchDetail();
  };

  const goToSendGift = () => {
    id !== undefined && navigation.navigate('GiftVoucher', {id});
  };

  const onClaimVoucher = () => {
    setVoucherId(details?.id);
    setShowModal(true);
  };

  const handleModalOnClose = () => {
    setShowModal(false);
    handleBackAction();
  };

  const expiredDate = new Date(details?.expiredDate || '');
  const today = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
  const isExpired = today > expiredDate;

  const statusAvailVoucher = status === 'Available Voucher';
  const notEnoughPoints = statusAvailVoucher && !details.isAvailable;
  
  return (
    <View style={styles.root}>
      {scrollEffect && (
        <TopNavigation.Type1
          title={t('Event.DetailVoucher.Title')}
          maxLengthTitle={20}
          itemStrokeColor={'white'}
          leftIcon={<ArrowLeftIcon />}
          leftIconAction={handleBackAction}
          containerStyles={styles.topNavStyle}
          rightIconAction={() => {}}
        />
      )}
      <ScrollView onScroll={handleScroll} showsVerticalScrollIndicator={false}>
        {details && (
          <View style={styles.slide}>
            <ImageBackground
              style={{width: '100%', height: 400}}
              source={require('../../../assets/image/detail_voucher_default.png')}>
              <LinearGradient
                colors={['#00000000', color.Dark[800]]}
                style={{height: '100%', width: '100%'}}>
                <View style={styles.headerContent}>
                  {!scrollEffect ? (
                    <TopNavigation.Type1
                      title={t('Event.DetailVoucher.Title')}
                      maxLengthTitle={20}
                      itemStrokeColor={'white'}
                      leftIcon={<ArrowLeftIcon />}
                      leftIconAction={handleBackAction}
                      rightIconAction={() => {}}
                      containerStyles={{
                        borderBottomColor: 'transparent',
                        paddingHorizontal: widthResponsive(24),
                      }}
                    />
                  ) : (
                    <View />
                  )}

                  <View style={styles.titleContainer}>
                    <Text style={styles.vTitle}>
                      {dataDetail?.data?.voucher.title}
                    </Text>
                    <Gap height={5} />
                    <Text style={styles.vSubTitle}>
                      {dataDetail?.data?.voucher.subTitle}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>
        )}

        {details && (
          <View style={styles.content}>
            <View style={styles.expired}>
              <View style={styles.textIcon}>
                <View style={{flexDirection: 'row'}}>
                  <ClockIcon
                    stroke={color.Pink[200]}
                    width={mvs(16)}
                    height={mvs(16)}
                  />
                  <Gap width={8} />
                  <Text style={styles.normalTitle}>
                    {t('Event.DetailVoucher.Expired')}
                  </Text>
                </View>
                <Text style={[styles.normalTitle, {color: color.Success[400]}]}>
                  {dateFormatDaily(details?.expiredDate)}
                </Text>
              </View>
            </View>
            <View style={styles.tnc}>
              <Text style={styles.normalTitle}>
                {t('Event.DetailVoucher.Tnc')}
              </Text>
              <Gap height={4} />
              {details?.voucher.termsCondition.value.map(
                (val: string, i: number) => (
                  <View key={i} style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        width: widthResponsive(20),
                      }}>
                      <Text style={styles.tncValue}>{i + 1}.</Text>
                    </View>
                    <Text
                      style={[styles.tncValue, {flex: 1, textAlign: 'auto'}]}>
                      {val}
                    </Text>
                  </View>
                ),
              )}
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Button
          label={
            isExpired
              ? t('Rewards.DetailVoucher.Btn.Expired')
              : details?.isRedeemed
              ? t('Rewards.DetailVoucher.Btn.Redeemed')
              : notEnoughPoints
              ? t('Rewards.DetailVoucher.Btn.NotEnoughPoints')
              : statusAvailVoucher
              ? t('Rewards.DetailVoucher.Btn.Redeem')
              : t('Rewards.DetailVoucher.Btn.ShowQR')
          }
          containerStyles={{
            width: '100%',
            height: widthResponsive(40),
            aspectRatio: undefined,
            backgroundColor:
              !isExpired && !details?.isRedeemed && !notEnoughPoints
                ? color.Pink[10]
                : color.Dark[50],
          }}
          onPress={statusAvailVoucher ? onClaimVoucher : showQrOnPress}
          disabled={isExpired || details?.isRedeemed || notEnoughPoints}
        />
        {status === 'Ready to Redeem' && !isExpired && !details?.isRedeemed && (
          <Button
            label={t('Rewards.DetailVoucher.SendGift')}
            type={'border'}
            borderColor={'#FF68D6'}
            containerStyles={{
              width: '100%',
              height: widthResponsive(40),
              aspectRatio: undefined,
              backgroundColor: 'transparent',
              marginTop: mvs(10),
            }}
            onPress={goToSendGift}
          />
        )}
      </View>

      {/* Modal Show QR */}
      <ModalCustom
        modalVisible={showQrPopUp}
        onPressClose={closeQrOnPress}
        children={
          <View style={styles.modalContainer}>
            <View style={styles.qrCodeStyle}>
              <QRCode value={valueEncode} size={widthResponsive(200)} />
            </View>
            <Gap height={16} />
            <Text style={styles.modalTitle}>
              {t('Event.DetailVoucher.PopUp.Title')}
            </Text>
            <Gap height={4} />
            <Text style={styles.modalCaption}>
              {t('Event.DetailVoucher.PopUp.Desc')}
            </Text>
            <Gap height={20} />
            <Button
              label={t('Event.DetailVoucher.PopUp.ButtonTitle')}
              type="border"
              containerStyles={styles.buttonModalStyle}
              textStyles={{color: color.Pink[200]}}
              onPress={closeQrOnPress}
            />
          </View>
        }
      />

      {/* Modal Success Redeem */}
      <ModalCustom
        modalVisible={showModal}
        onPressClose={handleModalOnClose}
        children={
          <View style={styles.modalContainer}>
            <RedeemSuccessIcon />
            <Gap height={16} />
            <Text style={styles.modalTitle}>
              {t('Rewards.ModalRedeem.Title')}
            </Text>
            <Gap height={8} />
            <Text style={styles.modalCaption}>
              {t('Rewards.ModalRedeem.Subtitle')}
            </Text>
            <Gap height={20} />
            <Button
              label={t('Rewards.ModalRedeem.Button')}
              containerStyles={styles.btnClaimModal}
              textStyles={styles.textButtonModal}
              onPress={handleModalOnClose}
              type="border"
            />
          </View>
        }
      />
    </View>
  );
};

export default DetailVoucherRewards;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    position: 'relative',
  },
  slide: {
    position: 'relative',
    width: '100%',
  },
  topNavStyle: {
    paddingHorizontal: widthResponsive(20),
  },
  headerContent: {
    height: '100%',
    justifyContent: 'space-between',
  },
  titleContainer: {
    paddingBottom: widthResponsive(20),
    paddingHorizontal: widthResponsive(20),
  },
  vTitle: {
    fontFamily: font.InterRegular,
    fontSize: mvs(20),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  vSubTitle: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '500',
    color: color.Success[400],
  },
  content: {},
  expired: {
    padding: widthResponsive(20),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: color.Dark[500],
    justifyContent: 'space-between',
  },
  textIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  normalTitle: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  tnc: {
    padding: widthResponsive(20),
  },
  tncValue: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '400',
    color: color.Neutral[35],
  },
  bottomContainer: {
    paddingHorizontal: widthResponsive(20),
    paddingBottom: widthResponsive(25),
    paddingTop: widthResponsive(15),
    width: '100%',
  },
  buttonStyle: {
    width: '100%',
    height: widthResponsive(40),
    aspectRatio: undefined,
    backgroundColor: color.Pink[10],
  },
  modalContainer: {
    backgroundColor: color.Dark[800],
    paddingHorizontal: widthResponsive(16),
    paddingTop: widthResponsive(32),
    paddingBottom: widthResponsive(16),
    alignItems: 'center',
    borderRadius: 16,
  },
  qrCodeStyle: {
    width: widthResponsive(254),
    height: widthResponsive(254),
    backgroundColor: color.Neutral[10],
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    color: color.Neutral[10],
    textAlign: 'center',
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(16),
    maxWidth: width * 0.7,
  },
  modalCaption: {
    color: color.Neutral[35],
    textAlign: 'center',
    fontFamily: font.InterRegular,
    fontWeight: '500',
    maxWidth: '80%',
    fontSize: mvs(10),
  },
  buttonModalStyle: {
    width: undefined,
    aspectRatio: undefined,
    paddingHorizontal: widthResponsive(15),
    paddingVertical: widthResponsive(5),
    borderColor: 'transparent',
  },
  btnClaimModal: {
    aspectRatio: undefined,
    width: undefined,
    height: undefined,
    paddingHorizontal: 3,
    borderWidth: 0,
  },
  textButtonModal: {
    fontFamily: font.InterMedium,
    fontSize: mvs(14),
    fontWeight: '500',
    color: color.Pink[200],
  },
});
