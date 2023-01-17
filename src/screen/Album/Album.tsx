import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';

import Color from '../../theme/Color';
import {RootStackParams} from '../../navigations';
import {AlbumContent} from '../../components';
import {useSongHook} from '../../hooks/use-song.hook';

type AlbumProps = NativeStackScreenProps<RootStackParams, 'Album'>;

export const AlbumScreen: React.FC<AlbumProps> = ({
  navigation,
  route,
}: AlbumProps) => {
  const {dataSong, getListDataSong} = useSongHook();

  useFocusEffect(
    useCallback(() => {
      getListDataSong({albumID: route.params.id});
    }, []),
  );

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <AlbumContent
        detailAlbum={route.params}
        dataSong={dataSong}
        onPressGoBack={onPressGoBack}
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
