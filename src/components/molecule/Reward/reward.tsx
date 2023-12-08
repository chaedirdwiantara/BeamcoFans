import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Button, Gap} from '../../atom';
import {color, font} from '../../../theme';
import {widthResponsive} from '../../../utils';
import {mvs} from 'react-native-size-matters';
import {
  DrinkRewardIcon,
  MediaRewardIcon,
  TicketRewardIcon,
} from '../../../assets/icon';
import {DataAvailableVoucher} from '../../../interface/reward.interface';
import {useTranslation} from 'react-i18next';
import DottedLineIos from '../../atom/DottedLine/dottedLineiOs';
import DottedLineAndroid from '../../atom/DottedLine/dottedLineAndroid';

type Props = {
  data: DataAvailableVoucher;
  onPress: () => void;
  onPressDetail: () => void;
  containerStyle?: ViewStyle;
};

const VoucherReward: React.FC<Props> = ({
  data,
  onPress,
  onPressDetail,
  containerStyle,
}) => {
  const {t} = useTranslation();

  return (
    <TouchableOpacity onPress={onPressDetail}>
      <View style={[styles.container, containerStyle]}>
        {/* Body */}
        <View style={styles.bodyContainer}>
          <View style={styles.bodyLeftSide}>
            {data.iconType === 'drink' ? (
              <DrinkRewardIcon />
            ) : data.iconType === 'media' ? (
              <MediaRewardIcon />
            ) : data.iconType === 'ticket' ? (
              <TicketRewardIcon />
            ) : null}

            <Gap width={8} />

            <Text
              style={[
                styles.voucherText,
                {color: data.isClaimable ? color.Neutral[10] : color.Dark[200]},
              ]}
              numberOfLines={3}>
              {data.title}
            </Text>
          </View>

          {data.generateQty > 1 && (
            <View style={styles.bodyRightSide}>
              <Text style={styles.voucherLeft}>{data.generateQty} Left</Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <View style={styles.dottedContainer}>
            {Platform.OS === 'ios' ? (
              <DottedLineIos color={color.Dark[10]} />
            ) : (
              <DottedLineAndroid color={color.Dark[10]} />
            )}
          </View>

          <View style={styles.bottomContainer}>
            <Text style={styles.pointsText}>{`${data.claimPoint} ${t(
              'Rewards.AvailVoucher.PointTxt',
            )}`}</Text>

            <View style={styles.footer}>
              {data.generateQty === 0 ? (
                <Button
                  label={'Redeemed'}
                  containerStyles={styles.btnBorder}
                  textStyles={styles.footerText}
                  disabled
                />
              ) : data.isClaimable ? (
                <Button
                  label={t('Rewards.AvailVoucher.BtnActive')}
                  containerStyles={styles.btnClaim}
                  textStyles={styles.textButton}
                  onPress={onPress}
                />
              ) : (
                <Button
                  label={t('Rewards.AvailVoucher.BtnDisabled')}
                  containerStyles={styles.btnBorder}
                  textStyles={styles.footerText}
                  disabled
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VoucherReward;

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
  bodyLeftSide: {flexDirection: 'row', alignItems: 'center', flex: 1},
  bodyRightSide: {
    backgroundColor: color.Dark[800],
    borderRadius: 4,
    paddingHorizontal: widthResponsive(6),
    paddingVertical: widthResponsive(2),
  },
  pointsText: {
    color: color.Pink[200],
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(11),
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
    fontFamily: font.InterSemiBold,
    fontWeight: '600',
    fontSize: mvs(14),
    maxWidth: '80%',
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
  footer: {
    paddingHorizontal: widthResponsive(8),
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
  },
  btnBorder: {
    aspectRatio: undefined,
    width: undefined,
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
