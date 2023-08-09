import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';

import Color from '../../../theme/Color';
import {DataOnboardType} from '../../../data/onboard';
import {Button, ButtonGradient, Indicator} from '../../../components';
import {PreferenceList} from '../../../interface/setting.interface';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import DescriptionBoarding from '../../atom/DescriptionBoarding/DescriptionBoarding';

interface FooterContentProps {
  type?: string;
  activeIndexSlide: number;
  data:
    | {title: string; subtitle: string; list: PreferenceList[]}[]
    | DataOnboardType[];
  onPressBack?: () => void;
  onPressGoTo?: () => void;
  onPressNext: () => void;
}

export const FooterContent: React.FC<FooterContentProps> = ({
  type,
  activeIndexSlide,
  data,
  onPressBack,
  onPressGoTo,
  onPressNext,
}) => {
  const {t} = useTranslation();
  const activeColor =
    type === 'Preference' ? Color.Dark[100] : Color.Success[400];
  const inActiveColor =
    type === 'Preference' ? Color.Dark[300] : Color.Success[700];
  return (
    <View
      style={[
        styles.containerFooterContent,
        {
          height:
            type === 'Preference'
              ? '15%'
              : Platform.OS === 'ios'
              ? '38%'
              : '42%',
        },
      ]}>
      {type !== 'Preference' &&
        data.map((item, index) => {
          if (index === activeIndexSlide && 'uri' in item) {
            return (
              <DescriptionBoarding
                key={index}
                title={t(item.title) || ''}
                subtitle={t(item.subtitle as string) || ''}
              />
            );
          }
        })}
      {type === 'Preference' ? (
        <>
          <View style={styles.footer}>
            {activeIndexSlide === 0 ? (
              <ButtonGradient
                label={t('Btn.Next')}
                onPress={onPressNext}
                gradientStyles={styles.btnFull}
              />
            ) : (
              <>
                <Button
                  type="border"
                  label={t('Btn.Back')}
                  containerStyles={styles.btnContainer}
                  textStyles={{color: Color.Success[400]}}
                  onPress={onPressBack}
                />
                <ButtonGradient
                  label={t('Btn.Next')}
                  onPress={onPressNext}
                  gradientStyles={styles.btnContainer}
                />
              </>
            )}
          </View>
        </>
      ) : (
        <View>
          <View>
            <Indicator
              activeIndex={activeIndexSlide}
              totalIndex={data.length}
              activeColor={activeColor}
              inActiveColor={inActiveColor}
            />
          </View>
          <ButtonGradient
            label={t('Btn.Next')}
            onPress={onPressNext}
            containerStyles={
              (styles.btnContainer, {paddingTop: heightPercentage(20)})
            }
          />
          <Button
            type="border"
            label={t('Btn.Skip')}
            borderColor="transparent"
            textStyles={{color: Color.Success[400]}}
            onPress={onPressGoTo}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerFooterContent: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? heightPercentage(30) : heightPercentage(10),
    left: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    width,
    flex: 1,
  },
  footer: {
    width: widthPercentage(327),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: heightPercentage(20),
  },
  btnContainer: {
    width: widthPercentage(155),
    aspectRatio: heightPercentage(155 / 46),
    borderColor: Color.Success[400],
  },
  btnFull: {
    width: '100%',
  },
});
