import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../App';
import {useBaseHook} from '../hooks/use-base.hook';

import Color from '../theme/Color';
import ImageSlider from '../components/molecule/ImageSlider/ImageSlider.boarding';

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

  const data = [
    {
      id: 0,
      uri: require('../assets/background/onboard-1.png'),
      title: "Let's the fans grow\nwith their musician",
      subtitle:
        'Lorem ipsum dolor sit amet, consectetur adispicing elit. Vestibulum porta ipsum Lorem ipsum dolor sit amet.',
    },
    {
      id: 1,
      uri: require('../assets/background/onboard-2.png'),
      title: "Let's the fans grow\nwith their musician",
      subtitle:
        'Lorem ipsum dolor sit amet, consectetur adispicing elit. Vestibulum porta ipsum Lorem ipsum dolor sit amet.',
    },
    {
      id: 2,
      uri: require('../assets/background/onboard-3.png'),
      title: "Let's the fans grow\nwith their musician",
      subtitle:
        'Lorem ipsum dolor sit amet, consectetur adispicing elit. Vestibulum porta ipsum Lorem ipsum dolor sit amet.',
    },
  ];

  return (
    <View style={styles.root}>
      <ImageSlider data={data} onPress={handeOnpressText} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    justifyContent: 'center',
    alignItems: 'center',
  },
});
