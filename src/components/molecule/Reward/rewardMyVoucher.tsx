import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {Button, DottedLine, Gap} from '../../atom';
import {color, font} from '../../../theme';
import {widthResponsive} from '../../../utils';
import {mvs} from 'react-native-size-matters';
import {
  DrinkRewardIcon,
  MediaRewardIcon,
  TicketRewardIcon,
} from '../../../assets/icon';
import {DataMyVoucher} from '../../../interface/reward.interface';
import {useTranslation} from 'react-i18next';

type Props = {
  data: DataMyVoucher;
  onPress: () => void;
  containerStyle?: ViewStyle;
};

const RewardMyVoucher: React.FC<Props> = ({data, onPress, containerStyle}) => {
  const {t} = useTranslation();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      {/* Body */}
      <View style={styles.bodyContainer}>
        {data.voucher.iconType === 'drink' ? (
          <DrinkRewardIcon />
        ) : data.voucher.iconType === 'media' ? (
          <MediaRewardIcon />
        ) : data.voucher.iconType === 'ticket' ? (
          <TicketRewardIcon />
        ) : null}
        <Gap width={8} />
        <Text style={styles.voucherText} numberOfLines={1}>
          {data.voucher.title}
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <View style={styles.dottedContainer}>
          <DottedLine color={color.Dark[10]} />
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.pointsText}>{data.statusVoucher}</Text>

          <Button
            label={t('Rewards.MyVoucher.Btn')}
            containerStyles={styles.btnClaim}
            textStyles={styles.textButton}
            onPress={onPress}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RewardMyVoucher;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    width: '100%',
    backgroundColor: '#1A2435',
    borderRadius: 8,
    paddingHorizontal: widthResponsive(16),
    paddingTop: widthResponsive(16),
    paddingBottom: widthResponsive(11),
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    color: color.Dark[50],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(10),
  },
  voucherTitleText: {
    color: color.Pink[200],
    fontFamily: font.InterSemiBold,
    fontWeight: '600',
    fontSize: mvs(16),
    lineHeight: widthResponsive(22),
  },
  voucherTitleTextD: {
    color: color.Dark[200],
    fontFamily: font.InterSemiBold,
    fontWeight: '600',
    fontSize: mvs(16),
    lineHeight: widthResponsive(22),
  },
  voucherText: {
    color: color.Neutral[10],
    fontFamily: font.InterSemiBold,
    fontWeight: '600',
    fontSize: mvs(16),
  },
  voucherTextD: {
    color: color.Dark[200],
    fontFamily: font.InterSemiBold,
    fontWeight: '600',
    fontSize: mvs(16),
  },
  voucherDesc: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: mvs(12),
    lineHeight: widthResponsive(20),
  },
  footerContainer: {
    width: '100%',
    backgroundColor: '#1A2435',
    borderRadius: 8,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthResponsive(16),
    paddingVertical: widthResponsive(8),
  },
  footerText: {
    fontFamily: font.InterSemiBold,
    color: color.Dark[200],
    fontSize: mvs(12),
    fontWeight: '600',
  },
  dottedContainer: {
    width: '100%',
    paddingHorizontal: widthResponsive(5),
  },
  voucherLeft: {
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '500',
    textAlign: 'right',
    color: color.Pink[200],
  },
  btnClaim: {
    aspectRatio: undefined,
    width: undefined,
    backgroundColor: color.Pink[200],
    paddingVertical: widthResponsive(4),
    paddingHorizontal: widthResponsive(16),
  },
  btnBorder: {
    aspectRatio: undefined,
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: widthResponsive(4),
  },
  textButton: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '500',
  },
});
