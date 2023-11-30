import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import * as Progress from 'react-native-progress';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../atom';
import {useTranslation} from 'react-i18next';

type Props = {
  progress: number;
  total: number;
  currentLvl: string;
  containerStyle?: ViewStyle;
};

const PointProgress: FC<Props> = ({
  progress,
  total,
  currentLvl,
  containerStyle,
}) => {
  const {t} = useTranslation();
  const progressBar = progress / total;
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
          {`${t('Rewards.CurrentPrg.Exp')} ${progress}`}
          {/* <Text style={styles.scndTxt}>{`/${total}`}</Text> */}
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
