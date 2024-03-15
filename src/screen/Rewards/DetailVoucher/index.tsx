import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
} from 'react-native';
import {Buffer} from 'buffer';
import {useMutation} from 'react-query';
import QRCode from 'react-native-qrcode-svg';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {
  Gap,
  Button,
  ModalCustom,
  TopNavigation,
  ModalConfirm2,
} from '../../../components';
import {
  ClockIcon,
  ChevronUp2,
  ChevronDown2,
  ArrowLeftIcon,
  TicketDefaultIcon,
} from '../../../assets/icon';
import {color, font} from '../../../theme';
import {
  DataVoucherListDetail,
  DataVoucherDetailBeforeClaim,
} from '../../../interface/reward.interface';
import {width, widthResponsive} from '../../../utils';
import {storage} from '../../../hooks/use-storage.hook';
import {dateFormatDaily} from '../../../utils/date-format';
import {claimAvailVoucherEp} from '../../../api/reward.api';
import {useRewardHook} from '../../../hooks/use-reward.hook';
import {MainTabParams, RootStackParams} from '../../../navigations';
import RedeemSuccessIcon from '../../../assets/icon/RedeemSuccess.icon';
import {ModalLoading} from '../../../components/molecule/ModalLoading/ModalLoading';

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
  // use id if it's before claim / not my voucher
  // use codeGenerated if it's my voucher
  const {id, codeGenerated} = route.params;

  const {t} = useTranslation();
  const navigation2 = useNavigation<NativeStackNavigationProp<MainTabParams>>();
  const {useVoucherDetailBeforeClaim, useMyVoucherDetail, useClaimMyVoucher} =
    useRewardHook();

  const [scrollEffect, setScrollEffect] = useState<boolean>(false);
  const [showQrPopUp, setShowQrPopUp] = useState<boolean>(false);
  const [valueEncode, setValueEncode] = useState<string>();
  const [voucherCode, setVoucherCode] = useState<string | undefined>(
    codeGenerated,
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [showTnC, setShowTnC] = useState<boolean>(false);
  const [idQR, setIdQR] = useState<number>(0);
  const [details, setDetails] = useState<
    DataVoucherDetailBeforeClaim | DataVoucherListDetail
  >();

  const handleBackAction = () => {
    navigation.goBack();
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 1;
    setScrollEffect(scrolled);
  };

  // Detail voucher use 2 different APIs
  // If before claim, use API get voucher detail before redeem & using id to fetch the API
  // If after claim, use get my voucher detail & using codeGenerated from list voucher to fetch the API
  const {
    data: dataDetailBefore,
    isLoading: isLoadingBefore,
    refetch: refetchDetailBefore,
  } = useVoucherDetailBeforeClaim(id);
  const {
    data: dataDetailAfter,
    isLoading: isLoadingAfter,
    refetch: refetchDetailAfter,
  } = useMyVoucherDetail(voucherCode);

  useFocusEffect(
    useCallback(() => {
      id && refetchDetailBefore();
    }, []),
  );

  useEffect(() => {
    async function setFetchDetail() {
      if (voucherCode && voucherCode !== undefined && idQR > 0) {
        await refetchDetailAfter();
        showQrOnPress();
      }
    }

    setFetchDetail();
  }, [voucherCode, idQR]);

  useEffect(() => {
    if (voucherCode !== undefined) {
      setDetails(dataDetailAfter?.data);
    } else {
      setDetails(dataDetailBefore?.data);
    }
  }, [dataDetailAfter?.data, dataDetailBefore?.data, voucherCode]);

  useEffect(() => {
    if (details) {
      const idQr = idQR === 0 ? dataDetailAfter?.data.id : idQR;
      const dataToEncode = `${idQr}|""`;
      setValueEncode(Buffer.from(dataToEncode).toString('base64'));
    }
  }, [details, idQR]);

  const setClaimVoucher = useMutation({
    mutationKey: ['generate-voucher'],
    mutationFn: claimAvailVoucherEp,
    onSuccess(res) {
      setShowModalConfirm(false);
      setIdQR(res.data.id);
      setVoucherCode(res.data.codeGenerated);
    },
    onError(e: any) {
      // show popup failed claim voucher
      setShowModalConfirm(false);
    },
  });

  const onClaimVoucher = () => {
    setClaimVoucher.mutate(id);
  };

  const showQrOnPress = () => {
    setShowQrPopUp(true);
  };

  const closeQrOnPress = () => {
    setShowQrPopUp(false);
    refetchDetailAfter();
  };

  const goToSendGift = () => {
    id !== undefined && navigation.navigate('GiftVoucher', {voucherid: id});
  };

  const handleModalOnClose = () => {
    setShowModal(false);
    handleBackAction();
  };

  // List Status Voucher
  // const expiredDate = new Date(dataDetailAfter?.data.expiredDate || '');
  // const today = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
  // const isExpired = today > expiredDate;
  const isExpired = details?.status?.text === 'Expired';
  const isRedeemed = details?.status?.text === 'Redeemed';
  const isSent = details?.status?.text === 'Sent';
  const isReceived = details?.status?.text === 'Show QR';
  const notEnoughPoints = !details?.isClaimable;
  const soldOut = details?.stock === 0;
  const limitReached = details?.isLimitedClaim;
  const enabledMainBtn =
    (voucherCode !== undefined && !details?.status?.buttonDisabled) ||
    (!soldOut && !limitReached && !isSent && !isRedeemed && !isExpired);
  const showBtnSendGift =
    id !== undefined &&
    !soldOut &&
    !limitReached &&
    !notEnoughPoints &&
    !voucherCode;

  const onPressMainBtn = () => {
    if (isReceived) {
      showQrOnPress();
    } else if (notEnoughPoints) {
      navigation2.navigate('Rewards');
      storage.set('tabActiveRewards', 1);
    } else {
      setShowModalConfirm(true);
    }
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
      <ScrollView
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}>
        {details && (
          <View style={styles.slide}>
            <ImageBackground
              style={{width: '100%', height: 400}}
              source={
                details.imageUrl.length > 0
                  ? {uri: details.imageUrl[2].image}
                  : require('../../../assets/image/detail_voucher_default.png')
              }>
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
                    <Text style={styles.vTitle}>{details?.title}</Text>
                    <Gap height={5} />
                    <Text style={styles.vSubTitle}>
                      {details?.claimPoint + ' Points'}
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
              {/* Stock */}
              {voucherCode === undefined ? (
                <>
                  <View style={styles.textIcon}>
                    <View style={{flexDirection: 'row'}}>
                      <TicketDefaultIcon
                        fill={color.Pink[200]}
                        width={mvs(17)}
                        height={mvs(17)}
                      />
                      <Gap width={8} />
                      <Text style={styles.normalTitle}>
                        {t('Rewards.DetailVoucher.Stock')}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.stockValue,
                        {
                          color:
                            details.stock === 0
                              ? '#FF0000'
                              : color.Success[400],
                        },
                      ]}>
                      {t('Rewards.DetailVoucher.StockLeft', {
                        stock: details?.stock,
                      })}
                    </Text>
                  </View>
                  <Gap height={mvs(5)} />
                </>
              ) : null}
              {/* Expired */}
              <View style={styles.textIcon}>
                <View style={{flexDirection: 'row'}}>
                  <ClockIcon
                    stroke={color.Pink[200]}
                    width={mvs(16)}
                    height={mvs(16)}
                  />
                  <Gap width={8} />
                  <Text style={styles.normalTitle}>
                    {t('Rewards.DetailVoucher.Expired')}
                  </Text>
                </View>
                <Text style={styles.stockValue}>
                  {voucherCode !== undefined
                    ? dateFormatDaily(details.endDate || details.expiredDate)
                    : details.expiredDays + ' Days After Claim'}
                </Text>
              </View>
            </View>
            {/* Descr!iption */}
            <View style={styles.containerContent}>
              <Text style={styles.descValue}>{details?.description}</Text>
            </View>
            {/* TnC */}
            <TouchableOpacity
              style={styles.containerContent}
              onPress={() => setShowTnC(!showTnC)}>
              <View style={styles.titleTnC}>
                <Text style={styles.normalTitle}>
                  {t('Event.DetailVoucher.Tnc')}
                </Text>
                {showTnC ? (
                  <ChevronUp2 fill={color.Neutral[10]} />
                ) : (
                  <ChevronDown2 fill={color.Neutral[10]} />
                )}
              </View>
              {showTnC && (
                <>
                  <Gap height={mvs(10)} />
                  {details?.termsCondition.value.map(
                    (val: string, i: number) => (
                      <View key={i} style={{flexDirection: 'row'}}>
                        <Text
                          style={[
                            styles.tncValue,
                            {flex: 1, textAlign: 'auto'},
                          ]}>
                          {val}
                        </Text>
                      </View>
                    ),
                  )}
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Button
          label={
            voucherCode !== undefined
              ? details?.status?.text || ''
              : soldOut
              ? 'Sold Out'
              : notEnoughPoints
              ? t('Rewards.DetailVoucher.Btn.NotEnoughPoints')
              : limitReached
              ? 'Limit Reached'
              : t('Rewards.DetailVoucher.Btn.Redeem')
          }
          containerStyles={{
            width: '100%',
            height: widthResponsive(40),
            aspectRatio: undefined,
            backgroundColor: enabledMainBtn ? color.Pink[10] : color.Dark[50],
          }}
          onPress={onPressMainBtn}
          disabled={!enabledMainBtn}
        />
        {showBtnSendGift && (
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
            <Text style={styles.modalTitle}>{t('Rewards.ModalQR.Title')}</Text>
            <Gap height={4} />
            <Text style={styles.modalCaption}>
              {t('Rewards.ModalQR.Subtitle')}
            </Text>
            <Gap height={20} />
            <Button
              label={t('General.Dismiss')}
              type="border"
              containerStyles={styles.buttonModalStyle}
              textStyles={{color: color.Pink[200]}}
              onPress={closeQrOnPress}
            />
          </View>
        }
      />

      {/* Modal Confirm Redeem */}
      <ModalConfirm2
        modalVisible={showModalConfirm}
        imgUri={details?.imageUrl[3]?.image || ''}
        title={'Redeem Voucher'}
        subtitle={`Are you sure you want to redeem ${details?.claimPoint} points?`}
        onPressClose={() => setShowModalConfirm(false)}
        onPressYes={onClaimVoucher}
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

      <ModalLoading visible={isLoadingBefore || isLoadingAfter} />
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
    color: color.Pink[10],
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
    fontSize: mvs(13.5),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  stockValue: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    fontWeight: '700',
    color: color.Success[400],
  },
  containerContent: {
    padding: widthResponsive(20),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: color.Dark[500],
  },
  descValue: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    fontWeight: '400',
    color: color.Neutral[35],
  },
  titleTnC: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    fontSize: mvs(15),
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
