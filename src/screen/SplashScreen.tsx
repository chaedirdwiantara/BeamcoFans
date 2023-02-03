import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {SSULogo} from '../assets/logo';
import {ModalUpdate} from '../components/molecule/Modal/ModalUpdate';
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
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onUpdate = () => {
    null;
  };

  const onCancel = () => {
    setModalVisible(false);
    setTimeout(() => {
      navigation.replace(
        storage.getBoolean('isLogin') || storage.getBoolean('isGuest')
          ? 'MainTab'
          : storage.getBoolean('skipOnboard')
          ? 'SignInGuest'
          : 'Boarding',
      );
    }, 500);
  };

  useEffect(() => {
    //TODO: wiring after endpoint ready
    // setTimeout(() => {
    //   setModalVisible(true);
    // }, 2000);

    setTimeout(() => {
      navigation.replace(
        storage.getBoolean('isLogin') || storage.getBoolean('isGuest')
          ? 'MainTab'
          : storage.getBoolean('skipOnboard')
          ? 'SignInGuest'
          : 'Boarding',
      );
    }, 2000);
  }, []);

  return (
    <View style={styles.root}>
      <SSULogo width={mvs(120)} height={mvs(120)} />
      <ModalUpdate
        modalVisible={modalVisible}
        onPressOk={onUpdate}
        onPressClose={onCancel}
      />
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
