import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import * as Progress from 'react-native-progress';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../atom';
import {useTranslation} from 'react-i18next';

type Props = {
  startPoint: number;
  endPoint: number;
  currentLvl: string;
  lifeTimePoint: number;
  containerStyle?: ViewStyle;
};

const PointProgress: FC<Props> = ({
  startPoint,
  endPoint,
  currentLvl,
  lifeTimePoint,
  containerStyle,
}) => {
  const {t} = useTranslation();
  //? lifeTimePoint is total point user have
  //? progress is minimum point on user current level
  //? total is maximum point on user current level
  const progressStart = lifeTimePoint - startPoint;
  const progressBar = progressStart / endPoint;
  const whatNextLvl =
    currentLvl === 'Bronze'
      ? '1. Silver'
      : currentLvl === 'Silver'
      ? '3. Gold'
      : currentLvl === 'Gold'
      ? '4. Platinum'
      : currentLvl === 'Platinum'
      ? '5. Diamond'
      : 'Lvl. Maxed';

  return (
    <View style={styles.container}>
      <Text style={styles.primerTxt}>{t('Rewards.CurrentPrg.Title')}</Text>
      <Gap height={8} />
      <Progress.Bar
        progress={progressBar}
        width={null}
        height={widthResponsive(8)}
        borderWidth={0}
        color={color.Pink[11]}
        unfilledColor={color.Dark[300]}
        borderRadius={4}
        animated={true}
        animationType={'timing'}
      />
      <Gap height={8} />
      <View style={styles.descStyle}>
        <Text style={styles.primerTxt}>
          {`${t('Rewards.CurrentPrg.Exp')} ${progressStart}`}
          <Text style={styles.scndTxt}>{`/${endPoint}`}</Text>
        </Text>
        <Text style={styles.primerTxt}>
          {whatNextLvl !== 'Lvl. Maxed'
            ? t('Rewards.CurrentPrg.NextLvl')
            : whatNextLvl}{' '}
          {whatNextLvl !== 'Lvl. Maxed' && (
            <Text style={styles.scndTxt}>{whatNextLvl}</Text>
          )}
        </Text>
      </View>
    </View>
  );
};

export default PointProgress;

const styles = StyleSheet.create({
  container: {},
  descStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primerTxt: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '700',
  },
  scndTxt: {
    color: color.Dark[100],
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '600',
  },
});
