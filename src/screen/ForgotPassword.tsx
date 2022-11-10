import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {color, font} from '../theme';
import {normalize} from '../utils';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../App';
import SsuSheet from '../components/atom/SsuSheet';
import {Button, Gap, SsuInput} from '../components';
import {EmailIcon} from '../assets/icon';

const {width, height} = Dimensions.get('screen');

export const ForgotPassword = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [email, setEmail] = useState('');

  const handleOnPressButton = () => {
    navigation.navigate('Preference');
  };
  const handleOnPressBack = () => {
    navigation.goBack();
  };
  const handleOnPressSignIn = () => {
    navigation.navigate('Login');
  };

  const children = () => {
    return (
      <>
        <Text style={styles.titleStyle}>Sign In</Text>
        <Gap height={8} />
        <Text style={styles.descStyle}>
          Input your email address to recover your password
        </Text>
        <Gap height={16} />
        <SsuInput.InputText
          value={email}
          onChangeText={(newText: any) => setEmail(newText)}
          placeholder={'Enter your email'}
          leftIcon={<EmailIcon stroke={color.Dark[50]} />}
        />
        <Gap height={24} />
        <Button
          label="Submit"
          textStyles={{fontSize: normalize(14)}}
          containerStyles={{width: '100%'}}
          onPress={handleOnPressButton}
        />
        <Gap height={4} />
        <Button
          type="border"
          label="Back"
          borderColor="transparent"
          textStyles={{fontSize: normalize(14), color: color.Pink.linear}}
          containerStyles={{width: '100%'}}
          onPress={handleOnPressBack}
        />
        <Gap height={30} />
        <Text style={styles.forgotPassStyle}>
          Already have an Account?{' '}
          <Text
            onPress={() => handleOnPressSignIn()}
            style={{
              fontFamily: font.InterRegular,
              fontWeight: '700',
              fontSize: normalize(12),
              lineHeight: mvs(16),
            }}>
            Sign In
          </Text>
        </Text>
      </>
    );
  };
  return (
    <View style={styles.root}>
      <Image
        source={require('../assets/background/signin-guest.png')}
        style={styles.image}
      />
      <SsuSheet children={children()} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    height: height,
    width: width,
    resizeMode: 'cover',
  },
  titleStyle: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: normalize(20),
    lineHeight: mvs(32),
    textAlign: 'center',
    color: color.Neutral[10],
  },
  descStyle: {
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(12),
    lineHeight: mvs(14.5),
    color: color.Neutral[10],
    maxWidth: '100%',
  },
  forgotPassStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(12),
    lineHeight: mvs(12),
  },
});
