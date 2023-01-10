import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Color from '../../../theme/Color';
import {EmailContent} from '../../../components';
import {RootStackParams} from '../../../navigations';
import {profileStorage} from '../../../hooks/use-storage.hook';

export const EmailScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToChangeEmail = () => {
    navigation.navigate('ChangeEmail');
  };

  return (
    <View style={styles.root}>
      <EmailContent
        email={profileStorage()?.email}
        onPressGoBack={onPressGoBack}
        goToChangeEmail={goToChangeEmail}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
