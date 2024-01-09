import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {FlashList} from '@shopify/flash-list';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {EmptyState} from '../../../components';
import {useRewardHook} from '../../../hooks/use-reward.hook';
import {MainTabParams, RootStackParams} from '../../../navigations';
import LoadingSpinner from '../../../components/atom/Loading/LoadingSpinner';
import RewardMyVoucher from '../../../components/molecule/Reward/rewardMyVoucher';

type Props = {};

export const VoucherAvailable: React.FC<Props> = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<MainTabParams>>();
  const navigation2 = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {useGetMyVoucher} = useRewardHook();
  const {
    data: dataMyVoucher,
    refetch: refetchMyVoucher,
    isLoading,
    isRefetching,
  } = useGetMyVoucher();

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
          <RewardMyVoucher
            data={item}
            onPress={() => goToDetailVoucher(item.codeGenerated)}
            containerStyle={{marginBottom: mvs(16)}}
          />
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

      {(isLoading || isRefetching) && (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
