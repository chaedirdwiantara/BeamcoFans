import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import CoinIcon from '../../../assets/icon/Coin.icon';
import Color from '../../../theme/Color';
import Font from '../../../theme/Font';
import {kFormatter} from '../../../utils';

interface ChipMoneyProps {
  balance: number;
}

export const ChipMoney: React.FC<ChipMoneyProps> = (props: ChipMoneyProps) => {
  const {balance} = props;

  return (
    <View style={[styles.root]}>
      <CoinIcon />
      <Text style={styles.text}>{kFormatter(balance)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.Pink[300],
    borderRadius: 5,
    padding: 5,
  },
  text: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: Font.InterBold,
    padding: 5,
  },
});
