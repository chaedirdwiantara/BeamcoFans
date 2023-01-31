import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import {Button, Gap, SsuInput} from '../../atom';
import {GiftIcon} from '../../../assets/icon';
import {color, typography} from '../../../theme';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import ReferralImage from '../../../assets/image/Referral.image';
import {ReferralActivated} from '../ReferralContent/ReferralContent';
import {heightPercentage, width, widthPercentage} from '../../../utils';

interface ReferralProps {}

export const UseReferralContent: React.FC<ReferralProps> = ({}) => {
  const [refCode, setRefCode] = useState<string>('');
  const [mode, setMode] = useState<string>('');
  const {isValidReferral, errorMsg, applyReferralUser} = useProfileHook();

  useEffect(() => {
    if (isValidReferral) {
      setMode('success');
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
        {mode === 'success' ? (
          <View style={{marginTop: heightPercentage(60)}}>
            <Text style={[typography.Heading6, styles.text]}>
              {'Your 5% Comission for every transaction have been activated!'}
            </Text>
            <Gap height={heightPercentage(30)} />
            <ReferralActivated refCode={refCode} />
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
              {'Get 5% Sunny Side Up Credits every transaction'}
            </Text>

            <SsuInput.InputText
              value={refCode}
              placeholder={'Referral Code'}
              errorMsg={errorMsg}
              isError={errorMsg !== ''}
              leftIcon={<GiftIcon />}
              fontColor={color.Neutral[10]}
              borderColor={color.Pink.linear}
              onChangeText={(newText: string) => setRefCode(newText)}
              containerStyles={{marginTop: heightPercentage(20)}}
            />
            <Button
              label="Submit"
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
    backgroundColor: color.Pink[200],
    marginBottom: heightPercentage(20),
  },
});
