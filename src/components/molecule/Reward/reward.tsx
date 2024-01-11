import React from 'react';
import {
  Text,
  Image,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {color, font} from '../../../theme';
import {height, width, widthResponsive} from '../../../utils';
import {DataAvailableVoucher} from '../../../interface/reward.interface';

type Props = {
  data: any;
  onPressDetail: () => void;
  type?: string;
  containerStyle?: ViewStyle;
};

const VoucherReward: React.FC<Props> = ({
  data,
  onPressDetail,
  type,
  containerStyle,
}) => {
  const {t} = useTranslation();
  const details = type === 'self' ? data.voucher : data;
  const widthCard = type === 'self' ? width * 0.42 : width * 0.41;

  return (
    <TouchableOpacity
      style={[styles.container, {width: widthCard}, containerStyle]}
      onPress={onPressDetail}>
      <Image
        style={{width: '100%', height: mvs(100)}}
        source={
          details.imageUrl.length > 0
            ? {uri: details.imageUrl[2].image}
            : require('../../../assets/image/detail_voucher_default.png')
        }
        borderRadius={mvs(4)}
      />
      <Text
        style={[styles.voucherText, {color: color.Neutral[10]}]}
        numberOfLines={2}>
        {details.title}
      </Text>
      <Text style={styles.pointsText}>{`${details.claimPoint} ${t(
        'Rewards.AvailVoucher.PointTxt',
      )}`}</Text>
    </TouchableOpacity>
  );
};

export default VoucherReward;

const styles = StyleSheet.create({
  container: {
    height: height * 0.252,
    backgroundColor: '#1A2435',
    borderRadius: mvs(8),
    paddingHorizontal: widthResponsive(16),
    paddingVertical: widthResponsive(16),
    marginHorizontal: widthResponsive(10),
  },
  voucherText: {
    fontFamily: font.InterSemiBold,
    fontWeight: '600',
    fontSize: mvs(13),
    maxWidth: '80%',
    marginTop: mvs(12),
  },
  pointsText: {
    color: color.Pink[200],
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(11),
    marginTop: mvs(4),
  },
});
