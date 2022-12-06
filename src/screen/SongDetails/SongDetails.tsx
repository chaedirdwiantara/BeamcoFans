import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Color from '../../theme/Color';
import {RootStackParams} from '../../App';
import {SongDetailsContent} from '../../components';

export const SongDetailsScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToAlbum = () => {
    navigation.navigate('Album');
  };

  const goToShowCredit = () => {
    navigation.navigate('ShowCredit');
  };

  return (
    <SafeAreaView style={styles.root}>
      <SongDetailsContent
        onPressGoBack={onPressGoBack}
        goToAlbum={goToAlbum}
        goToShowCredit={goToShowCredit}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
});
