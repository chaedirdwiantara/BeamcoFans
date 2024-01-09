import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {color, font} from '../../../theme';
import {Avatar, EmptyState} from '../../../components';
import {dateFormatVoucher} from '../../../utils/date-format';
import {useRewardHook} from '../../../hooks/use-reward.hook';
import {elipsisText, width, widthPercentage} from '../../../utils';
import {MainTabParams, RootStackParams} from '../../../navigations';
import LoadingSpinner from '../../../components/atom/Loading/LoadingSpinner';

type Props = {};

export const VoucherHistory: React.FC<Props> = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<MainTabParams>>();
  const navigation2 =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {useGetHistoryVoucher} = useRewardHook();
  const {
    data: dataMyVoucher,
    refetch: refetchMyVoucher,
    isLoading: isLoadingHistory,
    isRefetching: isRefetchHistory,
  } = useGetHistoryVoucher();

  useFocusEffect(
    useCallback(() => {
      refetchMyVoucher();
    }, []),
  );

  const goToDetailVoucher = (codeGenerated: string) => {
    navigation2.navigate('DetailVoucherRewards', {
      codeGenerated,
    });
  };

  return (
    <>
      <FlashList
        data={dataMyVoucher?.data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{marginBottom: mvs(16)}}
            onPress={() => goToDetailVoucher(item.codeGenerated)}>
            <View style={styles.root}>
              <View style={styles.containerBody}>
                <Image
                  source={
                    item.voucher.imageUrl.length > 0
                      ? {uri: item.voucher.imageUrl[2].image}
                      : require('../../../assets/image/detail_voucher_default.png')
                  }
                  style={styles.image}
                  resizeMode="contain"
                />
                <View style={styles.containerTitle}>
                  <Text style={styles.voucherName}>
                    {elipsisText(item.voucher.title, 35)}
                  </Text>
                  <Text style={styles.points}>
                    {item.voucher.claimPoint} Points
                  </Text>
                </View>
              </View>
              <View style={styles.footer}>
                <View style={styles.containerStatus}>
                  <Text style={styles.status}>{item.statusVoucher}</Text>
                  {item.transferLog.isTransfer && (
                    <View style={styles.transfer}>
                      <Avatar imgUri={item.transferLog.image} size={mvs(20)} />
                      <Text style={styles.name}>
                        {item.transferLog.fullname}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={styles.date}>{dateFormatVoucher(item.date)}</Text>
              </View>
            </View>
            <View style={styles.separator} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <EmptyState
            hideIcon={true}
            text={t('Rewards.MyVoucher.EmptyState.TitleVoucherHistory') || ''}
            subtitle={
              t('Rewards.MyVoucher.EmptyState.SubtitleVoucherHistory') || ''
            }
            containerStyle={styles.containerEmpty}
            textStyle={styles.textEmpty}
            btnText={t('Rewards.MyVoucher.EmptyState.Btn') || ''}
            onPress={() => navigation.navigate('Rewards')}
          />
        }
        estimatedItemSize={150}
      />

      {(isLoadingHistory || isRefetchHistory) && (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    width: width * 0.9,
    alignSelf: 'center',
  },
  containerBody: {
    flexDirection: 'row',
    backgroundColor: '#1A2435',
    paddingVertical: mvs(10),
  },
  image: {
    width: widthPercentage(40),
    height: widthPercentage(40),
    borderRadius: mvs(4),
    marginHorizontal: widthPercentage(10),
  },
  containerTitle: {
    justifyContent: 'center',
  },
  voucherName: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '700',
    color: color.Neutral[10],
    marginBottom: mvs(2),
  },
  points: {
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '600',
    color: color.Pink[200],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: mvs(14),
  },
  containerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '500',
    color: '#FF63CA',
  },
  transfer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: widthPercentage(9),
  },
  name: {
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '500',
    color: color.Neutral[10],
    marginLeft: widthPercentage(9),
  },
  date: {
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  separator: {
    width,
    height: mvs(1),
    backgroundColor: color.Dark[500],
    marginBottom: mvs(5),
  },
  textEmpty: {
    fontWeight: '600',
    marginBottom: mvs(5),
  },
  containerEmpty: {
    height: mvs(500),
    alignSelf: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingTop: mvs(20),
  },
});
