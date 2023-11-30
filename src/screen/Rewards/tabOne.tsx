import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import VoucherReward from '../../components/molecule/Reward/reward';
import {widthResponsive} from '../../utils';
import {Button, EmptyState, Gap, ModalCustom} from '../../components';
import {color, font} from '../../theme';
import {mvs} from 'react-native-size-matters';
import {rewardMenu} from '../../data/reward';
import RedeemSuccessIcon from '../../assets/icon/RedeemSuccess.icon';
import {useRewardHook} from '../../hooks/use-reward.hook';
import {useFocusEffect} from '@react-navigation/native';
import {
  DataAvailableVoucher,
  DataMyVoucher,
  GetMyVoucher,
} from '../../interface/reward.interface';
import RewardMyVoucher from '../../components/molecule/Reward/rewardMyVoucher';
import {useTranslation} from 'react-i18next';

type Props = {
  refreshing: boolean;
  setRefreshing: (item: boolean) => void;
};

const TabOneReward: FC<Props> = ({refreshing, setRefreshing}) => {
  const {t} = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setactiveIndex] = useState<number>(0);
  const [availVoucher, setAvailVoucher] = useState<
    DataAvailableVoucher[] | undefined
  >([]);
  const [myVoucher, setMyVoucher] = useState<DataMyVoucher[] | undefined>([]);
  const [showMoreVoucher, setShowMoreVoucher] = useState<boolean>(false);
  const [voucherId, setVoucherId] = useState<number | undefined>();

  const {useGetAvailableVoucher, useGetMyVoucher, useClaimMyVoucher} =
    useRewardHook();

  const {
    data: dataAvailVoucher,
    refetch: refetchAvailVoucher,
    isLoading: isLoadingAvailVoucher,
    isRefetching: isRefetchingAvailVoucher,
  } = useGetAvailableVoucher();

  const {
    data: dataMyVoucher,
    refetch: refetchMyVoucher,
    isLoading: isLoadingMyVoucher,
    isRefetching: isRefetchingMyVoucherr,
  } = useGetMyVoucher();

  const {
    data: dataClaim,
    refetch: refetchClaim,
    isLoading: isLoadingClaim,
    isRefetching: isRefetchingClaim,
  } = useClaimMyVoucher(voucherId);

  const onPressMenu = (index: number) => {
    setactiveIndex(index);
  };

  useFocusEffect(
    useCallback(() => {
      refetchAvailVoucher();
      refetchMyVoucher();
    }, [refetchAvailVoucher, refetchMyVoucher]),
  );

  useEffect(() => {
    async function setRefreshingData() {
      if (refreshing) {
        await refetchAvailVoucher();
        await refetchMyVoucher();
        setRefreshing(false);
      }
    }

    setRefreshingData();
  }, [refreshing]);

  useEffect(() => {
    async function setClaimSelectedVoucher() {
      if (voucherId && voucherId !== undefined) {
        await refetchClaim();
        setVoucherId(undefined);
      }
    }

    setClaimSelectedVoucher();
  }, [voucherId]);

  useEffect(() => {
    setAvailVoucher(dataAvailVoucher?.data);
  }, [dataAvailVoucher]);

  useEffect(() => {
    setMyVoucher(dataMyVoucher?.data);
  }, [dataMyVoucher]);

  const onClaimVoucher = (item: DataAvailableVoucher) => {
    setVoucherId(item.id);
    setShowModal(true);
  };

  const handleShowMoreVoucher = () => {
    setShowMoreVoucher(true);
  };

  const handleModalOnClose = () => {
    setShowModal(false);
    setRefreshing(true);
  };

  return (
    <View style={styles().container}>
      <View style={styles().menuStyle}>
        {rewardMenu.map((data, index) => {
          return (
            <>
              <Button
                label={data.label}
                containerStyles={styles(activeIndex, index).btnClaim}
                textStyles={styles().textButton}
                onPress={() => onPressMenu(index)}
              />
              <Gap width={8} />
            </>
          );
        })}
      </View>

      <Gap height={16} />

      {activeIndex === 0 ? (
        <FlatList
          data={availVoucher}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: widthResponsive(16),
          }}
          renderItem={({item}) => (
            <VoucherReward
              data={item}
              onPress={() => onClaimVoucher(item)}
              containerStyle={styles().voucher}
            />
          )}
        />
      ) : (
        <FlatList
          data={myVoucher}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: widthResponsive(16),
          }}
          renderItem={({item}) => (
            <RewardMyVoucher
              data={item}
              onPress={() => {
                /*// TODO: BY BAMBANG NAVIGATE TO DETAIL */
              }}
              containerStyle={styles().voucher}
            />
          )}
        />
      )}
      {/* <Button
        label={'Show More'}
        containerStyles={styles().btnBorder}
        textStyles={styles().footerText}
        onPress={handleShowMoreVoucher}
      /> */}
      {/* FOR AVAILABLE VOCHER */}
      {activeIndex === 0 && availVoucher && availVoucher.length == 0 && (
        <EmptyState
          text={t('Rewards.AvailVoucher.EmptyState.Title')}
          subtitle={t('Rewards.AvailVoucher.EmptyState.Subtitle')}
          hideIcon
          containerStyle={{height: 300}}
        />
      )}
      {/* FOR MY VOCHER */}
      {activeIndex === 1 && myVoucher && myVoucher.length == 0 && (
        <EmptyState
          text={t('Rewards.MyVoucher.EmptyState.Title')}
          subtitle={t('Rewards.MyVoucher.EmptyState.Subtitle')}
          hideIcon
          containerStyle={{height: 300}}
        />
      )}
      <ModalCustom
        modalVisible={showModal}
        onPressClose={handleModalOnClose}
        children={
          <View style={styles().modalContainer}>
            <RedeemSuccessIcon />
            <Gap height={16} />
            <Text style={styles().modalTitle}>
              {t('Rewards.ModalRedeem.Title')}
            </Text>
            <Gap height={8} />
            <Text style={styles().modalCaption}>
              {t('Rewards.ModalRedeem.Subtitle')}
            </Text>
            <Gap height={20} />
            <Button
              label={t('Rewards.ModalRedeem.Button')}
              containerStyles={styles().btnClaimModal}
              textStyles={styles().textButtonModal}
              onPress={handleModalOnClose}
              type="border"
            />
          </View>
        }
      />
    </View>
  );
};

export default TabOneReward;

const styles = (activeIndex?: number, index?: number) =>
  StyleSheet.create({
    container: {
      // backgroundColor: 'brown',
    },
    voucher: {
      width: widthResponsive(156),
    },
    btnClaim: {
      aspectRatio: undefined,
      width: undefined,
      height: undefined,
      paddingVertical: widthResponsive(6),
      paddingHorizontal: widthResponsive(16),
      backgroundColor: activeIndex === index ? color.Pink[200] : '#1A2435',
      borderRadius: 30,
    },
    textButton: {
      fontFamily: font.InterRegular,
      fontSize: mvs(10),
      fontWeight: '500',
    },
    menuStyle: {
      flexDirection: 'row',
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
    modalTitle: {
      color: color.Neutral[10],
      textAlign: 'center',
      fontFamily: font.InterMedium,
      fontWeight: '600',
      fontSize: mvs(14),
    },
    modalCaption: {
      color: color.Secondary[10],
      textAlign: 'center',
      fontFamily: font.InterRegular,
      fontWeight: '400',
      fontSize: mvs(10),
    },
    modalContainer: {
      alignItems: 'center',
      backgroundColor: color.Dark[800],
      paddingTop: widthResponsive(32),
      paddingHorizontal: widthResponsive(16),
      paddingBottom: widthResponsive(16),
      width: widthResponsive(244),
      borderRadius: 16,
    },
    footerText: {
      fontFamily: font.InterSemiBold,
      color: color.Success[400],
      fontSize: mvs(13),
      fontWeight: '500',
    },
    btnBorder: {
      aspectRatio: undefined,
      width: '100%',
      backgroundColor: 'transparent',
      paddingVertical: widthResponsive(4),
      marginBottom: widthResponsive(16),
    },
  });
