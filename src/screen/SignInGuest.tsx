import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../theme/Color';
import {normalize} from '../utils';
import {RootStackParams} from '../App';
import {Button, LoginDescription} from '../components';
import Typography from '../theme/Typography';

export const SignInGuestScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handeOnpressText = () => {
    navigation.push('Login');
  };

  const handleOnpressSignUp = () => {
    navigation.push('Signup');
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('../assets/background/signin-guest.png')}
        resizeMode="cover"
        style={styles.image}>
        <LoginDescription />
      </ImageBackground>
      <Text style={[Typography.Heading4, styles.title]}>
        {"Let's the fans grow with\ntheir musician"}
      </Text>
      <View style={styles.footer}>
        <Button
          label="Sign In"
          textStyles={{fontSize: normalize(14)}}
          containerStyles={{width: ms(279)}}
          onPress={handeOnpressText}
        />
        <Button
          type="border"
          label="Sign Up"
          textStyles={{fontSize: normalize(14)}}
          containerStyles={{width: ms(279), marginVertical: mvs(8)}}
          onPress={handleOnpressSignUp}
        />
        <Button
          type="border"
          label="Explore As Guest"
          borderColor="transparent"
          textStyles={{fontSize: normalize(14), color: Color.Pink.linear}}
          containerStyles={{width: ms(279)}}
          onPress={handeOnpressText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  image: {
    justifyContent: 'center',
    width: ms(355),
    height: mvs(412),
  },
  title: {
    color: Color.Neutral[10],
    textAlign: 'center',
    marginVertical: mvs(30),
  },
  footer: {
    alignSelf: 'center',
  },
});
