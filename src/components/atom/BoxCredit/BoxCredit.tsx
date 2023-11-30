import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Color from '../../../theme/Color';
import {heightResponsive, widthResponsive} from '../../../utils';
import Typography from '../../../theme/Typography';
import {ChipMoneyNew} from '../ChipMoney/ChipMoneyNew';
import {ArrowRightIcon} from '../../../assets/icon';
import Gap from '../Gap/Gap';

interface BoxCreditProps {
  text: string;
  type: 'credit' | 'loyalty';
  balance: number;
  onClick: () => void;
}

export const BoxCredit: React.FC<BoxCreditProps> = (props: BoxCreditProps) => {
  const {text, type, balance, onClick} = props;
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        backgroundColor: Color.Dark[700],
        paddingHorizontal: widthResponsive(12),
        paddingVertical: heightResponsive(10),
        borderRadius: widthResponsive(4),
        flex: 1,
      }}>
      <View>
        <Text
          style={[
            Typography.Body4,
            {color: Color.Success[400], fontWeight: '500'},
          ]}>
          {text}
        </Text>
      </View>
      <Gap height={heightResponsive(4)} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{maxWidth: '80%'}}>
          <ChipMoneyNew balance={balance} type={type} />
        </View>

        <ArrowRightIcon />
      </View>
    </TouchableOpacity>
  );
};

export default BoxCredit;
