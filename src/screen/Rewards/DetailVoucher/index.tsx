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

import {
  ArrowLeftIcon,
  ClockIcon,
  TicketDefaultIcon,
} from '../../../assets/icon';
import {color, font} from '../../../theme';
import {widthResponsive} from '../../../utils';
import {RootStackParams} from '../../../navigations';
import {useRewardHook} from '../../../hooks/use-reward.hook';
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
  const id = route.params.id;

  // voucher sent from other = 'Gift Voucher'
  // self voucher = 'Ready to Redeem'
  const status = route.params.status;

  const {t} = useTranslation();
  const {useEventVoucherDetail} = useRewardHook();

  const [scrollEffect, setScrollEffect] = useState<boolean>(false);
  const [showQrPopUp, setShowQrPopUp] = useState<boolean>(false);
  const [valueEncode, setValueEncode] = useState<string>();

  const handleBackAction = () => {
    navigation.goBack();
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 1;
    setScrollEffect(scrolled);
  };

  const {data: dataDetail, refetch: refetchDetail} = useEventVoucherDetail(id);
  useFocusEffect(
    useCallback(() => {
      refetchDetail();
    }, []),
  );

  useEffect(() => {
    if (dataDetail?.data) {
      let dataToEncode = `qrreward_${dataDetail?.data.voucher.code}`;
      setValueEncode(Buffer.from(dataToEncode).toString('base64'));
    }
  }, [dataDetail?.data]);

  const showQrOnPress = () => {
    setShowQrPopUp(true);
  };

  const closeQrOnPress = () => {
    setShowQrPopUp(false);
    refetchDetail();
  };

  const goToSendGift = () => {
    navigation.navigate('GiftVoucher', {id});
  };

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
        {dataDetail?.data && (
          <View style={styles.slide}>
            <ImageBackground
              style={{width: '100%', height: 400}}
              source={{
                uri: dataDetail?.data?.voucher.imageUrl[3]?.image,
              }}>
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
                      {dataDetail.data?.voucher.title}
                    </Text>
                    <Gap height={5} />
                    <Text style={styles.vSubTitle}>
                      {dataDetail.data?.voucher.subTitle}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>
        )}

        {dataDetail?.data && (
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
                  {dataDetail.data?.expiredDate}
                </Text>
              </View>
              {/* <Gap height={mvs(5)} /> */}
              {/* <View style={styles.textIcon}>
                <View style={{flexDirection: 'row'}}>
                  <TicketDefaultIcon
                    fill={color.Pink[200]}
                    width={mvs(16)}
                    height={mvs(16)}
                  />
                  <Gap width={8} />
                  <Text style={styles.normalTitle}>
                    {t('Rewards.DetailVoucher.QuotaLeft')}
                  </Text>
                </View>
                <Text style={[styles.normalTitle, {color: color.Success[400]}]}>
                  {`${dataDetail.data?.voucher.quotaLeft} ${t('Rewards.DetailVoucher.Voucher')}`}
                </Text>
              </View> */}
            </View>
            <View style={styles.tnc}>
              <Text style={styles.normalTitle}>
                {t('Event.DetailVoucher.Tnc')}
              </Text>
              <Gap height={4} />
              {dataDetail.data?.voucher.termsCondition.value.map((val, i) => (
                <View key={i} style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      width: widthResponsive(20),
                    }}>
                    <Text style={styles.tncValue}>{i + 1}.</Text>
                  </View>
                  <Text style={[styles.tncValue, {flex: 1, textAlign: 'auto'}]}>
                    {val}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Button
          label={
            !dataDetail?.data.isAvailable
              ? t('Rewards.DetailVoucher.Btn.SoldOut')
              : dataDetail?.data.isRedeemed
              ? t('Rewards.DetailVoucher.Btn.Redeemed')
              : t('Rewards.DetailVoucher.Btn.ShowQR')
          }
          containerStyles={{
            width: '100%',
            height: widthResponsive(40),
            aspectRatio: undefined,
            backgroundColor:
              dataDetail?.data.isAvailable && !dataDetail?.data.isRedeemed
                ? color.Pink[10]
                : color.Dark[50],
          }}
          onPress={showQrOnPress}
          disabled={
            !dataDetail?.data.isAvailable || dataDetail?.data.isRedeemed
          }
        />
        {status === 'Ready to Redeem' &&
          dataDetail?.data.isAvailable &&
          !dataDetail?.data.isRedeemed && (
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
});
