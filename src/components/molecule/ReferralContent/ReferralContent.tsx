import React, {useState} from 'react';
import {
  Text,
  View,
  ViewStyle,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import styles from './styles';
import Color from '../../../theme/Color';
import Typography from '../../../theme/Typography';
import {Button, ButtonGradient, SsuInput} from '../../atom';
import {CheckCircleIcon, GiftIcon} from '../../../assets/icon';
import ReferralImage from '../../../assets/image/Referral.image';
import {heightPercentage, widthPercentage} from '../../../utils';

const {width} = Dimensions.get('window');

interface ReferralContentProps {
  containerStyle?: ViewStyle;
  onPress?: () => void;
}

interface ActivatedProps {
  refCode?: string;
}

const title1 = 'Do you have a referral code?';
const title2 = 'Referral Activated';
const description1 = 'Enter your code to jumpstart your Sunny Side Up Journey!';
const description2 =
  'Congratulations! Now you will get 5% credit every transaction!';
const friendReferral = "Your Friend's Referral Code";
const refCannotBeChanged = 'Referral code can not be changed';

const ReferralActivated: React.FC<ActivatedProps> = ({
  refCode = 'taylor88',
}) => {
  return (
    <View style={styles.containerActivated}>
      <View style={styles.containerReferralCode}>
        <Text style={[Typography.Subtitle2, styles.textFriendRef]}>
          {friendReferral}
        </Text>
        <View style={styles.containerCode}>
          <CheckCircleIcon />
          <Text style={[Typography.Heading6, styles.refCode]}>{refCode}</Text>
        </View>
      </View>
      <Text style={[Typography.Overline, styles.note]}>
        {refCannotBeChanged}
      </Text>
    </View>
  );
};

export const ReferralContent: React.FC<ReferralContentProps> = ({
  containerStyle,
  onPress,
}) => {
  const [refCode, setRefCode] = useState<string>('');
  const [type, setType] = useState<string>('input');
  const [error, setError] = useState<boolean>(false);
  const emptyString = refCode === '';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.root, containerStyle]}>
        <ReferralImage />

        <View style={styles.containerText}>
          <Text style={[Typography.Heading4, styles.title]}>
            {type === 'input' ? title1 : title2}
          </Text>
          <Text style={[Typography.Subtitle2, styles.description]}>
            {type === 'input' ? description1 : description2}
          </Text>
        </View>

        {type === 'input' ? (
          <View style={styles.containerInput}>
            <SsuInput.InputText
              value={refCode}
              isError={error}
              placeholder={'Referral Code'}
              errorMsg={'Referral code invalid'}
              leftIcon={<GiftIcon />}
              fontColor={Color.Neutral[10]}
              borderColor={Color.Pink.linear}
              onChangeText={(newText: any) => setRefCode(newText)}
            />
          </View>
        ) : (
          <ReferralActivated />
        )}

        {type === 'input' ? (
          <View style={styles.footer}>
            <Button
              type="border"
              label="Maybe Later"
              containerStyles={styles.btnContainer}
              textStyles={{color: Color.Pink.linear}}
              onPress={onPress}
            />
            <Button
              label="Submit"
              disabled={emptyString}
              containerStyles={{
                width: widthPercentage(155),
                aspectRatio: heightPercentage(155 / 40),
                backgroundColor: emptyString
                  ? Color.Dark[50]
                  : Color.Pink.linear,
              }}
              onPress={() => setType('')}
            />
          </View>
        ) : (
          <ButtonGradient
            label="Go To Home"
            onPress={onPress}
            gradientStyles={{width: width * 0.9}}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};
