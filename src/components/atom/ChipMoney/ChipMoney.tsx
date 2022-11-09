import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';

import Font from '../../../theme/Font';
import Color from '../../../theme/Color';
import CoinIcon from '../../../assets/icon/Coin.icon';
import {kFormatter, normalize} from '../../../utils';

import LinearGradient from 'react-native-linear-gradient';
import {color} from '../../../theme';

interface ChipMoneyProps {
  balance: number;
}

export const ChipMoney: React.FC<ChipMoneyProps> = (props: ChipMoneyProps) => {
  const {balance} = props;

  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[color.Pink.linear, color.Pink.linear2]}
        style={styles.root}>
        <CoinIcon />
        <Text style={styles.text}>{kFormatter(balance)}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Color.Pink.linear,
    borderRadius: 4,
    paddingHorizontal: ms(10),
    paddingVertical: mvs(5),
  },
  text: {
    color: '#FFF',
    fontSize: normalize(12),
    fontFamily: Font.InterSemiBold,
    paddingLeft: ms(6),
  },
  linearGradient: {
    // flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});
