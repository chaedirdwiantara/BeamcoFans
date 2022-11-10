import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../App';
import SsuSheet from '../components/atom/SsuSheet';
import {color, font} from '../theme';
import {normalize} from '../utils';
import {mvs} from 'react-native-size-matters';
import {
  Avatar,
  Button,
  Dropdown,
  Gap,
  SsuDivider,
  SsuInput,
  TermAndConditions,
} from '../components';
import {UserIcon} from '../assets/icon';
import {countryData} from '../data/dropdown';
import {AppleLogo, FacebookLogo, GoogleLogo} from '../assets/logo';

const {width, height} = Dimensions.get('screen');

export const LoginScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handeOnpressText = () => {
    navigation.navigate('Preference');
  };

  const [state, setState] = useState('');
  const [error, setError] = useState(false);

  const resultData = (dataResult: any) => {
    console.log(dataResult, 'dataResult Select Country');
  };

  const [term, setTerm] = useState(false);
  const handleOnPress = () => {
    setTerm(!term);
  };

  const children = () => {
    return (
      <>
        <Text style={styles.titleStyle}>Sign In</Text>
        <Gap height={20} />
        <SsuInput.InputText
          value={state}
          onChangeText={(newText: any) => setState(newText)}
          placeholder={'Email or Username'}
          leftIcon={<UserIcon stroke={color.Dark[50]} />}
        />
        <Gap height={8} />
        <SsuInput.InputText
          value={state}
          onChangeText={(newText: any) => setState(newText)}
          placeholder={'Password'}
          isError={error}
          errorMsg={'Incorrect username or password'}
          leftIcon={<UserIcon stroke={color.Dark[50]} />}
          password
        />
        <Gap height={12} />
        <SsuDivider text={'or'} />
        <Gap height={8} />
        <Dropdown.Country countryData={countryData} numberTyped={resultData} />
        <Gap height={14} />
        <TermAndConditions handleOnPress={handleOnPress} active={term} />
        <Gap height={20} />
        <Button
          label="Submit"
          textStyles={{fontSize: normalize(14)}}
          containerStyles={{width: '100%'}}
          onPress={handeOnpressText}
        />
        <Gap height={4} />
        <Button
          type="border"
          label="Back"
          borderColor="transparent"
          textStyles={{fontSize: normalize(14), color: color.Pink.linear}}
          containerStyles={{width: '100%'}}
          onPress={handeOnpressText}
        />
        <Gap height={8} />
        <SsuDivider text={'or signup with'} />
        <Gap height={14} />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <GoogleLogo />
          <Gap width={24} />
          <FacebookLogo />
          <Gap width={24} />
          <AppleLogo />
        </View>
        <Gap height={24} />
        <Text
          style={styles.forgotPassStyle}
          onPress={() => {
            console.log('forgot pass pressed');
          }}>
          I forgot my Password
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
  forgotPassStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: normalize(12),
    lineHeight: mvs(12),
  },
});
