import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useTranslation} from 'react-i18next';

import {GiftIcon} from '../../../assets/icon';
import {Button, Gap, SsuInput} from '../../atom';
import {color, typography} from '../../../theme';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import ReferralImage from '../../../assets/image/Referral.image';
import {ReferralActivated} from '../ReferralContent/ReferralContent';
import {heightPercentage, width, widthPercentage} from '../../../utils';

interface ReferralProps {
  referralFrom: null | string;
  refCode: string;
  setRefCode: (param: string) => void;
  modeUseReferral: string;
  setModeUseReferral: (param: string) => void;
}

export const UseReferralContent: React.FC<ReferralProps> = ({
  refCode,
  setRefCode,
  referralFrom,
  modeUseReferral,
  setModeUseReferral,
}) => {
  const {t} = useTranslation();
  const {isValidReferral, errorMsg, applyReferralUser} = useProfileHook();

  useEffect(() => {
    if (isValidReferral) {
      setModeUseReferral('success');
    }
  }, [isValidReferral]);

  const onApplyReferral = () => {
    applyReferralUser(refCode);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.root}>
        {referralFrom !== null || modeUseReferral === 'success' ? (
          <View style={{marginTop: heightPercentage(60)}}>
            <Text style={[typography.Heading6, styles.text]}>
              {'Your 5% Comission for every transaction have been activated!'}
            </Text>
            <Gap height={heightPercentage(30)} />
            <ReferralActivated refCode={referralFrom || refCode} />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{alignItems: 'center'}}>
            <ReferralImage
              width={widthPercentage(220)}
              height={widthPercentage(220)}
              style={{marginTop: heightPercentage(40)}}
            />
            <Text style={[typography.Heading5, styles.text]}>
              {t('Setting.Referral.UseRefer.Text1')}
            </Text>

            <SsuInput.InputText
              value={refCode}
              placeholder={t('Setting.Referral.UseRefer.Text2') || ''}
              errorMsg={errorMsg}
              isError={errorMsg !== ''}
              leftIcon={<GiftIcon />}
              fontColor={color.Neutral[10]}
              borderColor={color.Pink.linear}
              onChangeText={(newText: string) => setRefCode(newText)}
              containerStyles={{marginTop: heightPercentage(20)}}
            />
            <Button
              label={t('Btn.Submit')}
              onPress={onApplyReferral}
              containerStyles={styles.button}
            />
          </ScrollView>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: color.Dark[800],
    alignItems: 'center',
  },
  text: {
    maxWidth: width * 0.9,
    color: color.Neutral[10],
    textAlign: 'center',
  },
  button: {
    width: width * 0.9,
    aspectRatio: widthPercentage(327 / 36),
    marginTop: heightPercentage(30),
    alignSelf: 'center',
    marginBottom: heightPercentage(20),
  },
});
