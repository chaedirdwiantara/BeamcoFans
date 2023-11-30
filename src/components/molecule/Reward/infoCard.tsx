import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../atom';
import {widthResponsive} from '../../../utils';
import {
  BadgeBronzeIcon,
  BadgeDiamondIcon,
  BadgeGoldIcon,
  BadgePlatinumIcon,
  BadgeSilverIcon,
} from '../../../assets/icon';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';

type Props = {
  startPoint: number;
  endPoint: number;
  angle?: number;
  containerStyle?: ViewStyle;
  titleTxtStyle?: ViewStyle;
  captionTxtStyle?: ViewStyle;
  currentLvl: string;
};

const InfoCard: FC<Props> = ({
  startPoint,
  endPoint,
  angle,
  containerStyle,
  titleTxtStyle,
  captionTxtStyle,
  currentLvl,
}) => {
  const {t} = useTranslation();
  const whatNextLvl =
    currentLvl === 'Bronze'
      ? 'Silver'
      : currentLvl === 'Silver'
      ? 'Gold'
      : currentLvl === 'Gold'
      ? 'Platinum'
      : 'Diamond';
  const bgColor =
    whatNextLvl === 'Silver'
      ? ['#A29E97', '#6C6E6F']
      : whatNextLvl === 'Gold'
      ? ['#DBB65E', '#A48334']
      : whatNextLvl === 'Platinum'
      ? ['#80A4AA', '#406368']
      : ['#9E7BD6', '#6D4AA8'];
  const pointNeeded = endPoint - startPoint;

  return (
    <LinearGradient
      useAngle
      colors={bgColor}
      angle={angle}
      style={[styles.container, containerStyle]}>
      {whatNextLvl === 'Silver' ? (
        <BadgeSilverIcon />
      ) : whatNextLvl === 'Gold' ? (
        <BadgeGoldIcon />
      ) : whatNextLvl === 'Platinum' ? (
        <BadgePlatinumIcon />
      ) : (
        <BadgeDiamondIcon />
      )}
      <Gap width={16} />
      <View style={styles.txtContainer}>
        {whatNextLvl !== 'Diamond' ? (
          <Text style={[styles.titleStyle, titleTxtStyle]}>
            {t('Rewards.InfoCard.NextLvl', {
              whatNextLvl: whatNextLvl,
            })}
          </Text>
        ) : (
          <Text style={[styles.titleStyle, titleTxtStyle]}>
            {t('Rewards.InfoCard.LvlMax')}
          </Text>
        )}
        {whatNextLvl !== 'Diamond' ? (
          <Text style={[styles.captionStyle, captionTxtStyle]}>
            {t('Rewards.InfoCard.Desc', {
              pointNeeded: pointNeeded,
              whatNextLvl: whatNextLvl,
            })}
          </Text>
        ) : (
          <Text style={[styles.captionStyle, captionTxtStyle]}>
            {t('Rewards.InfoCard.MaxLvlDesc')}
          </Text>
        )}
      </View>
    </LinearGradient>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: widthResponsive(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtContainer: {flex: 1},
  titleStyle: {
    fontFamily: font.InterSemiBold,
    fontSize: mvs(12),
    fontWeight: '600',
    color: color.Neutral[10],
  },
  captionStyle: {
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '600',
    color: color.Neutral[10],
  },
});
