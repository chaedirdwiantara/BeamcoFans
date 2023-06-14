import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParams} from '../../../navigations';
import {color, typography} from '../../../theme';
import {Button, ButtonGradient} from '../../atom';
import {heightPercentage, normalize, width} from '../../../utils';
import {ListContentType, listContentGuest} from '../../../data/guest';
import {useTranslation} from 'react-i18next';
import {usePlayerHook} from '../../../hooks/use-player.hook';
import {storage} from '../../../hooks/use-storage.hook';

interface GuestProps {
  containerStyle?: ViewStyle;
}

const ListContent: React.FC<ListContentType> = ({image, text}) => {
  return (
    <View style={styles.content}>
      {image}
      <Text style={[typography.Body2, styles.text]}>{text}</Text>
    </View>
  );
};

export const GuestContent: React.FC<GuestProps> = ({containerStyle}) => {
  const {t} = useTranslation();
  const {visible, hidePlayer, resetPlayer} = usePlayerHook();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleSignUp = () => {
    if (visible) {
      hidePlayer();
      resetPlayer();
      storage.set('resetPlayer', true);
    }
    navigation.navigate('Signup');
  };

  const handleLogin = () => {
    if (visible) {
      hidePlayer();
      resetPlayer();
      storage.set('resetPlayer', true);
    }
    storage.set('resetPlayer', true);
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.root, containerStyle]}>
      <View style={{width: '80%'}}>
        <Text style={[typography.Heading4, styles.text]}>
          {t('Guest.Title')}
        </Text>
        <Text
          style={[
            typography.Body1,
            styles.text,
            {marginTop: heightPercentage(12)},
          ]}>
          {t('Guest.Subtitle')}
        </Text>
      </View>
      <View style={styles.containerContent}>
        {listContentGuest.map((val, index) => (
          <ListContent key={index} image={val.image} text={t(val.text)} />
        ))}
      </View>
      <ButtonGradient
        label={t('Btn.SignUp')}
        textStyles={{fontSize: normalize(14)}}
        onPress={handleSignUp}
        gradientStyles={{width: width * 0.75}}
        colors={['#F98FD9', '#FF70D4']}
      />
      <Button
        type="border"
        label={t('Btn.SignIn')}
        textStyles={{fontSize: normalize(14), color: color.Pink.linear}}
        containerStyles={{
          marginVertical: heightPercentage(8),
          width: width * 0.75,
        }}
        onPress={handleLogin}
        borderColor={color.Pink.linear}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPercentage(15),
  },
  text: {
    color: color.Neutral[10],
    textAlign: 'center',
  },
  containerContent: {
    width,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPercentage(20),
    marginBottom: heightPercentage(40),
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPercentage(10),
    width: '40%',
  },
});
