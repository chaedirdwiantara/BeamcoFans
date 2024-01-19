import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import VoucherReward from '../../components/molecule/Reward/reward';
import {width, widthResponsive} from '../../utils';
import {Button, EmptyState, Gap, ModalCustom} from '../../components';
import {color, font} from '../../theme';
import {mvs} from 'react-native-size-matters';
import {rewardMenu} from '../../data/reward';
import RedeemSuccessIcon from '../../assets/icon/RedeemSuccess.icon';
import {useRewardHook} from '../../hooks/use-reward.hook';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  DataAvailableVoucher,
  DataMyVoucher,
  GetMyVoucher,
} from '../../interface/reward.interface';
import RewardMyVoucher from '../../components/molecule/Reward/rewardMyVoucher';
import {useTranslation} from 'react-i18next';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {RewardCardSkeleton} from '../../skeleton/Rewards/RewardCard';
import {tabRewardStore} from '../../store/reward.store';

type Props = {
  refreshing: boolean;
  setRefreshing: (item: boolean) => void;
};

const TabOneReward: FC<Props> = ({refreshing, setRefreshing}) => {
  const {t} = useTranslation();
  const {metaReward, setAllowUpdateMeta} = tabRewardStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [showModal, setShowModal] = useState(false);
  const [availVoucher, setAvailVoucher] = useState<
    DataAvailableVoucher[] | undefined
  >([]);

  const {useGetAvailableVoucher} = useRewardHook();

  const {
    data: dataAvailVoucher,
    refetch: refetchAvailVoucher,
    isLoading: isLoadingAvailVoucher,
  } = useGetAvailableVoucher({
    page: metaReward.page,
    perPage: metaReward.perPage,
  });

  useFocusEffect(
    useCallback(() => {
      refetchAvailVoucher();
    }, []),
  );

  useEffect(() => {
    async function setRefreshingData() {
      if (refreshing) {
        await refetchAvailVoucher();
        setRefreshing(false);
      }
    }
    setRefreshingData();
  }, [refreshing]);

  useEffect(() => {
    refetchAvailVoucher();
    setTimeout(() => {
      availVoucher &&
      dataAvailVoucher?.meta &&
      availVoucher?.length < dataAvailVoucher?.meta?.TotalData
        ? setAllowUpdateMeta(true)
        : null;
    }, 1000);
  }, [metaReward]);

  useEffect(() => {
    if (metaReward.page === 1) {
      setAvailVoucher(dataAvailVoucher?.data);
    } else {
      if (availVoucher && dataAvailVoucher?.data) {
        const updatedVouchers = availVoucher.concat(dataAvailVoucher.data);
        setAvailVoucher(updatedVouchers);
      }
    }
  }, [dataAvailVoucher]);

  const handleModalOnClose = () => {
    setShowModal(false);
    setRefreshing(true);
  };

  const goToDetailVoucher = (id: number) => {
    navigation.navigate('DetailVoucherRewards', {
      id,
    });
  };

  return (
    <View style={styles().container}>
      {isLoadingAvailVoucher ? (
        <RewardCardSkeleton />
      ) : (
        <>
          <FlatList
            data={availVoucher}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{alignSelf: 'center'}}
            numColumns={2}
            scrollEnabled={false}
            renderItem={({item}) => (
              <VoucherReward
                data={item}
                onPressDetail={() => goToDetailVoucher(item.id)}
                containerStyle={styles().voucher}
              />
            )}
            ListEmptyComponent={
              <EmptyState
                text={t('Rewards.AvailVoucher.EmptyState.Title')}
                subtitle={t('Rewards.AvailVoucher.EmptyState.Subtitle')}
                hideIcon
                containerStyle={{height: 300}}
                textStyle={styles().textEmpty}
              />
            }
          />
        </>
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
      // width: widthResponsive(156),
      marginBottom: widthResponsive(16),
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
    listContainer: {
      alignItems: 'center',
    },
    textEmpty: {
      fontWeight: '600',
      marginBottom: mvs(5),
    },
  });
