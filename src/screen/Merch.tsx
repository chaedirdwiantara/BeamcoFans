import React, {useCallback, useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {GuestContent, SsuStatusBar} from '../components';
import Color from '../theme/Color';
import WebView from 'react-native-webview';
import {width} from '../utils';
import {profileStorage, storage} from '../hooks/use-storage.hook';
import {useFocusEffect} from '@react-navigation/native';
import {getBookyayToken} from '../service/refreshBookyayToken';
import {ModalLoading} from '../components/molecule/ModalLoading/ModalLoading';

export const MerchScreen: React.FC = () => {
  const isLogin = storage.getBoolean('isLogin');
  const [loading, setLoading] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      if (isLogin) {
        const token = async () => {
          setLoading(true);
          await getBookyayToken();
          setLoading(false);
        };

        token();
      }
    }, []),
  );

  const bookyayToken = profileStorage()?.bookyayToken;

  const merchantUrl = `https://m.bookyay.com/items/product?clause=product_2000009&token=${bookyayToken}`;

  return (
    <SafeAreaView style={styles.root}>
      <SsuStatusBar type="black" />
      {isLogin ? (
        <>
          <ModalLoading visible={loading} />
          {!loading && <WebView source={{uri: merchantUrl}} />}
        </>
      ) : (
        <GuestContent />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
  },
  header: {
    backgroundColor: Color.Dark[800],
    width: width,
    height: undefined,
    aspectRatio: 375 / 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Color.Dark[500],
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
});
