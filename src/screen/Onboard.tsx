import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../App';
import {useBaseHook} from '../hooks/use-base.hook';

export const OnboardScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {setError} = useBaseHook();

  const handeOnpressText = () => {
    navigation.push('Login');
    // example on calling action hook context
    setError({
      title: 'ini title',
      message: 'ini message',
    });
  };

  return (
    <View style={styles.root}>
      <Text onPress={handeOnpressText}>Onboard screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
