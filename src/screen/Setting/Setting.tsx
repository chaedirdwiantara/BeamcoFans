import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../App';
import {SettingContent} from '../../components';

export const SettingScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const onPressGoTo = (screenName: any, params: any) => {
    navigation.navigate(screenName, {...params});
  };

  return (
    <SafeAreaView style={styles.root}>
      <SettingContent onPressGoBack={onPressGoBack} onPressGoTo={onPressGoTo} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
