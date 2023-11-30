import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Font from '../../../theme/Font';
import CoinIcon from '../../../assets/icon/Coin.icon';
import {normalize, toCurrency, widthResponsive} from '../../../utils';
import CupMiniIcon from '../../../assets/icon/CupMini.icon';
import {useTranslation} from 'react-i18next';

interface ChipMoneyProps {
  type: 'credit' | 'loyalty';
  balance: number;
}

export const ChipMoneyNew: React.FC<ChipMoneyProps> = (
  props: ChipMoneyProps,
) => {
  const {balance, type = 'credit'} = props;
  const {t} = useTranslation();

  return (
    <View style={[styles.root]}>
      {type === 'credit' ? <CoinIcon /> : <CupMiniIcon />}

      <Text style={styles.text}>
        {type === 'credit' && balance === 0
          ? t('General.Topup')
          : toCurrency(balance, {withFraction: false})}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: normalize(12),
    fontFamily: Font.InterSemiBold,
    paddingLeft: widthResponsive(8),
  },
});
