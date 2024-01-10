import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  bgColorTab,
  widthPercentage,
  widthResponsive,
  heightPercentage,
} from '../../../utils';
import {color} from '../../../theme';
import {VoucherHistory} from './VoucherHistory';
import {ArrowLeftIcon} from '../../../assets/icon';
import {MainTabParams} from '../../../navigations';
import {VoucherAvailable} from './VoucherAvailable';
import {Button, Gap, TopNavigation} from '../../../components';

export const MyVoucherScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<MainTabParams>>();

  const [selectedTab, setSelectedTab] = useState<'available' | 'history'>(
    'available',
  );

  const onPressGoBack = () => {
    navigation.navigate('Rewards');
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Rewards.MyVoucher.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{
          marginBottom: heightPercentage(10),
          paddingHorizontal: widthResponsive(15),
        }}
      />

      {/* // Tab Voucher */}
      <View style={styles.containerTabVoucher}>
        <Button
          label={t('Rewards.MyVoucher.Tab1')}
          onPress={() => setSelectedTab('available')}
          containerStyles={{
            ...styles.tabVoucher,
            backgroundColor: bgColorTab('available', selectedTab),
          }}
        />
        <Gap width={widthPercentage(10)} />
        <Button
          label={t('Rewards.MyVoucher.Tab2')}
          containerStyles={{
            ...styles.tabVoucher,
            backgroundColor: bgColorTab('history', selectedTab),
          }}
          onPress={() => setSelectedTab('history')}
        />
      </View>

      {selectedTab === 'available' ? (
        // List Available Voucher
        <VoucherAvailable />
      ) : (
        // List Voucher History
        <VoucherHistory />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  containerTabVoucher: {
    flexDirection: 'row',
    paddingLeft: widthResponsive(20),
    marginTop: mvs(8),
    marginBottom: mvs(20),
  },
  tabVoucher: {
    aspectRatio: undefined,
    width: undefined,
    height: undefined,
    paddingVertical: widthResponsive(6),
    paddingHorizontal: widthResponsive(12),
    borderRadius: mvs(30),
  },
});
