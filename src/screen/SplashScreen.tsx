import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {SSULogo} from '../assets/logo';
import {storage} from '../hooks/use-storage.hook';
import {RootStackParams} from '../navigations';
import Color from '../theme/Color';

type SplashScrennProps = NativeStackScreenProps<
  RootStackParams,
  'SplashScreen'
>;

export const SplashScreen: React.FC<SplashScrennProps> = ({
  navigation,
}: SplashScrennProps) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace(
        storage.getBoolean('isLogin') || storage.getBoolean('isGuest')
          ? 'MainTab'
          : storage.getBoolean('skipOnboard')
          ? 'SignInGuest'
          : 'Boarding',
      );
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.root}>
      <SSULogo width={mvs(120)} height={mvs(120)} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Dark[800],
  },
});
